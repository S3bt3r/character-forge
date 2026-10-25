// @vitest-environment happy-dom
/* The questionnaire: chapter navigation, the names screen readers give the questions, progress and switched-off chapters. */
import { describe, it, expect, vi } from 'vitest';
import { act } from 'preact/test-utils';
import { screen, within } from '@testing-library/preact';
import { CHAPTERS, QUESTIONS } from '../../src/ui/catalog';
import { EN_UI as EN } from '../../src/ui/texts';
import { root, setupAppDom, mount, click, fieldset, option, ranking, statusOf } from '../support/ui-helpers';
import { gates, rated } from '../support/fixtures';

setupAppDom();

const nav = () => screen.getByRole('navigation', { name: EN.chaptersNav });
const chapterLinks = () => within(nav()).getAllByRole<HTMLAnchorElement>('link');
const current = () =>
  within(nav())
    .queryAllByRole('link', { current: 'location' })
    .map((a) => a.getAttribute('href'));

describe('Chapter navigation', () => {
  it('is a named navigation whose first chapter is the current location at start', async () => {
    await mount();
    expect(nav().getAttribute('aria-label')).toBe(EN.chaptersNav);
    expect(current()).toEqual([`#${root.querySelector('[id^="chapter-"]')!.id}`]);
  });

  it('the topmost visible chapter becomes the current location; chapters out of view do not count', async () => {
    let report: (
      entries: { isIntersecting: boolean; target: Element; boundingClientRect: { top: number } }[],
    ) => void = () => {};
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: typeof report) {
          report = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    await mount();
    const anchors = CHAPTERS.map((c) => document.getElementById(`chapter-${c.id}`)!);
    const [, second, third, fourth] = anchors;
    await act(() =>
      report([
        { isIntersecting: true, target: fourth!, boundingClientRect: { top: 300 } },
        { isIntersecting: false, target: second!, boundingClientRect: { top: 10 } },
        { isIntersecting: true, target: third!, boundingClientRect: { top: 120 } },
      ]),
    );
    expect(current()).toEqual([`#${third!.id}`]);
  });
});

describe('Names of the questions', () => {
  it('every question and its option group are named by the question text', async () => {
    await mount();
    for (const fieldset of root.querySelectorAll<HTMLFieldSetElement>('fieldset[data-question]')) {
      const question = QUESTIONS.find((q) => q.id === fieldset.dataset['question'])!;
      const name = document.getElementById(fieldset.getAttribute('aria-labelledby')!)!.textContent;
      expect(name, question.id).toBe(question.text.en);
      const group = fieldset.querySelector('[aria-labelledby]:not(fieldset)');
      expect(group?.getAttribute('aria-labelledby'), question.id).toBe(fieldset.getAttribute('aria-labelledby'));
    }
  });
});

describe('Chapters and progress', () => {
  it('all chapters are on one page, with jump links and counters', async () => {
    await mount();
    const links = chapterLinks();
    expect(links.length).toBe(11);
    for (const link of links) {
      const target = root.querySelector(link.getAttribute('href')!);
      expect(target, link.textContent!).not.toBeNull();
      expect(target!.querySelectorAll('fieldset').length).toBeGreaterThan(0);
    }
    expect(fieldset('resource')).toBeTruthy();
    expect(fieldset('legacy-focus')).toBeTruthy();
    const basics = links.find((l) => l.textContent?.includes('Foundation'))!;
    expect(basics.querySelector('.count')!.textContent).toMatch(/^0\/\d+$/);
    await click(option('role', 'tank'));
    expect(basics.querySelector('.count')!.textContent).toMatch(/^1\/\d+$/);
  });

  it('the progress counts all questions except the opening questions', async () => {
    await mount();
    const counted = rated(QUESTIONS).length;
    expect(root.querySelector('.progress-text')!.textContent).toBe(`0 of ${counted} questions answered`);
    await click(option('pve-interest', 'some'));
    expect(root.querySelector('.progress-text')!.textContent).toBe(`0 of ${counted} questions answered`);
    // Healer rules out no question, so only the answer itself counts (ruled-out questions: see below).
    await click(option('role', 'healer'));
    expect(root.querySelector('.progress-text')!.textContent).toBe(`1 of ${counted} questions answered`);
  });

  it('the progress ring is not read out additionally', async () => {
    await mount();
    const ring = root.querySelector('svg.progress-ring')!;
    expect(ring.getAttribute('aria-hidden')).toBe('true');
    expect(ring.hasAttribute('role')).toBe(false);
    expect(ring.hasAttribute('aria-label')).toBe(false);
  });
});

describe('Questions that apply only for certain answers', () => {
  const card = () => fieldset('healing-style');

  it('once the role rules out healing, the healing style stays shown, toned down and marked in its status', async () => {
    await mount();
    expect(card().classList.contains('muted')).toBe(false);
    expect(statusOf(card())).toBeUndefined();
    await click(option('role', 'melee'));
    expect(card().classList.contains('muted')).toBe(true);
    expect(statusOf(card())).toBe('notCounting');
    // The reason sits in the status only; the weight selection stays as for questions of a switched-off chapter.
    expect(card().querySelector('.question-foot [role="radiogroup"]')).not.toBeNull();
    await click(option('role', 'healer'));
    expect(card().classList.contains('muted')).toBe(false);
    expect(statusOf(card())).toBeUndefined();
  });

  it('an answer that does not count stays stored and counts again once the Healer role is picked', async () => {
    await mount();
    const total = rated(QUESTIONS).length;
    await click(option('healing-style', 'group'));
    await click(option('role', 'melee'));
    await click(option('role', 'healer'));
    expect(option('healing-style', 'group').getAttribute('aria-checked')).toBe('true');
    expect(root.querySelector('.progress-text')!.textContent).toBe(`2 of ${total} questions answered`);
  });

  it('a ruled-out question counts as done in the progress, so the progress can still be completed', async () => {
    await mount();
    const total = rated(QUESTIONS).length;
    await click(option('role', 'melee'));
    expect(root.querySelector('.progress-text')!.textContent).toBe(`2 of ${total} questions answered`);
    const feel = chapterLinks().find((l) => l.textContent?.includes('Combat Feel'))!;
    expect(feel.querySelector('.count')!.textContent).toMatch(/^1\/\d+$/);
  });
});

describe('Gates and switched-off chapters', () => {
  const pvpCards = () =>
    rated(QUESTIONS)
      .filter((q) => q.chapter === 'pvp')
      .map((q) => fieldset(q.id));

  it('"Not at all" keeps the PvP questions shown, toned down and marked as not counting; only its own chapter', async () => {
    await mount();
    const link = (id: string) => chapterLinks().find((l) => l.getAttribute('href') === `#chapter-${id}`)!;
    expect(link('pvp').classList.contains('muted')).toBe(false);
    const totalBefore = Number(root.querySelector('.progress-text')!.textContent!.match(/of (\d+)/)![1]);
    await click(option('pvp-interest', 'no'));
    const pvpQuestions = pvpCards().length;
    for (const card of pvpCards()) {
      expect(card.classList.contains('muted'), card.dataset['question']).toBe(true);
      expect(statusOf(card), card.dataset['question']).toBe('notCounting');
    }
    expect(fieldset('pvp-interest').classList.contains('muted')).toBe(false);
    // Only its own chapter is switched off.
    expect(fieldset('pvp-type').closest('#chapter-pvp')).not.toBeNull();
    expect(root.querySelector('#chapter-pve fieldset.muted')).toBeNull();
    expect(link('pve').classList.contains('muted')).toBe(false);
    expect(root.querySelector('#chapter-pve .gate-badge')).toBeNull();
    for (const c of ['foundation', 'combat-feel', 'leveling'])
      expect(root.querySelector(`#chapter-${c} .gate-badge`), c).toBeNull();
    // Questions of a switched-off chapter count as done; the total stays.
    const [, answeredAfter, totalAfter] = root
      .querySelector('.progress-text')!
      .textContent!.match(/^(\d+) of (\d+)/)!
      .map(Number);
    expect(totalAfter).toBe(totalBefore);
    expect(answeredAfter).toBe(pvpQuestions);
    expect(link('pvp').classList.contains('muted')).toBe(true);
    expect(link('pvp').querySelector('.count')!.textContent).toBe(`${pvpQuestions}/${pvpQuestions}`);
    expect(link('pvp').querySelector('.gate-marker')!.textContent).toBe(EN.gateMarkerMuted);
    expect(root.querySelector('#chapter-pvp .gate-badge')!.textContent).toBe(EN.gateBadgeMuted);
    await click(option('pvp-interest', 'some'));
    expect(link('pvp').querySelector('.gate-marker')).toBeNull();
    expect(root.querySelector('#chapter-pvp .gate-badge')!.textContent).toBe(EN.gateBadgeNormal);
    for (const card of pvpCards()) {
      expect(card.classList.contains('muted'), card.dataset['question']).toBe(false);
      expect(statusOf(card), card.dataset['question']).toBeUndefined();
    }
    await click(option('pvp-interest', 'very'));
    expect(link('pvp').querySelector('.gate-marker')!.textContent).toBe(EN.gateMarkerBoosted);
    expect(root.querySelector('#chapter-pvp .gate-badge')!.textContent).toBe(EN.gateBadgeBoosted);
  });

  it('opening questions have no weight selection: picking an option already decides how the chapter counts', async () => {
    await mount();
    const weights = (id: string) => fieldset(id).querySelector('.question-foot [role="radiogroup"]');
    for (const q of gates(QUESTIONS)) expect(weights(q.id), q.id).toBeNull();
    // Other questions without importance keep "Don't care | Counts".
    expect(weights('faction')).not.toBeNull();
  });

  it('answers in a switched-off chapter stay stored but do not count, and count again once it is switched on', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(option('pvp-interest', 'no'));
    const before = ranking().map((r) => r.textContent);
    await click(option('pvp-type', 'bg'));
    expect(ranking().map((r) => r.textContent)).toEqual(before);
    expect(statusOf(fieldset('pvp-type'))).toBe('notCounting');
    await click(option('pvp-interest', 'some'));
    expect(option('pvp-type', 'bg').getAttribute('aria-checked')).toBe('true');
    expect(ranking().map((r) => r.textContent)).not.toEqual(before);
  });
});
