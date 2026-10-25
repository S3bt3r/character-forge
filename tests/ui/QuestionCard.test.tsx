// @vitest-environment happy-dom
/* The question card: hints, influence, numbering, answer tiles, status badge and the keyboard in the tiles. */
import { describe, it, expect } from 'vitest';
import { act } from 'preact/test-utils';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { pickHigh, rated, gates } from '../support/fixtures';
import { isMultipleChoice } from '../../src/domain/questions';
import {
  root,
  setupAppDom,
  mount,
  click,
  fieldset,
  option,
  isChecked,
  weight,
  tiles,
  key,
  draft,
} from '../support/ui-helpers';

setupAppDom();

const LEVEL = { pillar: 4, core: 3, dynamic: 2, fine: 1 } as const;

const weighable = (q: (typeof QUESTIONS)[number]) =>
  q.kind === 'rated' && q.options.some((o) => o.effects.some((e) => e.kind === 'pref'));

describe('Question card', () => {
  it('no scoring hint texts; "not rated" and "The more, the stricter" only where they apply', async () => {
    await mount();
    expect(root.querySelector('.mode-hint')).toBeNull();
    for (const q of QUESTIONS) {
      expect(Boolean(fieldset(q.id).querySelector('.strict-badge')), q.id).toBe(
        q.kind === 'rated' && q.multi && q.mode === 'all',
      );
      for (const o of q.options) {
        const badge = option(q.id, o.id).querySelector('.unrated');
        expect(Boolean(badge), `${q.id}/${o.id}`).toBe(isMultipleChoice(q) && o.effects.length === 0);
      }
    }
  });

  it('influence diamonds per tier, only on weightable questions', async () => {
    await mount();
    for (const q of QUESTIONS) {
      const pill = fieldset(q.id).querySelector('.influence');
      expect(Boolean(pill), q.id).toBe(weighable(q));
      if (!pill || q.kind !== 'rated') continue;
      expect(pill.getAttribute('aria-label'), q.id).toBe(`Influence ${LEVEL[q.tier]} of 4`);
      expect(pill.querySelectorAll('.diamond.filled').length, q.id).toBe(LEVEL[q.tier]);
      expect(pill.querySelectorAll('.diamond').length, q.id).toBe(4);
    }
  });

  it('"Question N" counts without opening questions, opening questions are labeled "Opening question"', async () => {
    await mount();
    const counted = rated(QUESTIONS);
    counted.forEach((q, i) =>
      expect(fieldset(q.id).querySelector('.question-number')!.textContent, q.id).toBe(`Question ${i + 1}`),
    );
    for (const q of gates(QUESTIONS))
      expect(fieldset(q.id).querySelector('.question-number')!.textContent).toBe(EN.gateLabel);
  });

  it('answer tiles: radio or checkbox roles with indicators, faction crests, compact deal-breakers', async () => {
    await mount();
    for (const q of QUESTIONS) {
      expect(fieldset(q.id).querySelector('.options')!.getAttribute('role'), q.id).toBe(
        isMultipleChoice(q) ? 'group' : 'radiogroup',
      );
      for (const o of q.options) {
        expect(option(q.id, o.id).getAttribute('role'), q.id).toBe(isMultipleChoice(q) ? 'checkbox' : 'radio');
        expect(
          option(q.id, o.id).querySelector(isMultipleChoice(q) ? '.indicator.box' : '.indicator.circle'),
          q.id,
        ).not.toBeNull();
      }
      expect(fieldset(q.id).querySelector('.options')!.classList.contains('compact'), q.id).toBe(
        q.chapter === 'dealbreakers',
      );
    }
    expect(option('faction', 'horde').querySelector('.crest.faction-horde')).not.toBeNull();
    expect(option('faction', 'alliance').querySelector('.crest.faction-alliance')).not.toBeNull();
    expect(root.querySelectorAll('.crest').length).toBe(2);
  });

  it('an answered question shows the status badge with name and explanation', async () => {
    await mount();
    expect(fieldset('role').querySelector('.status-badge')).toBeNull();
    await click(option('role', 'tank'));
    const badge = fieldset('role').querySelector<HTMLElement>('.status-badge')!;
    expect(badge.dataset['status']).toBe('answered');
    expect(badge.getAttribute('aria-label')).toBe(EN.statusLabel_answered);
    expect(root.querySelector(`#${badge.getAttribute('aria-describedby')}`)!.textContent).toBe(EN.statusAnswered);
    expect(fieldset('role').querySelector('.answered-badge')).toBeNull();
  });
});

describe('Keyboard in the answer tiles', () => {
  const single = () =>
    rated(QUESTIONS).find(
      (q) => !q.multi && q.options.length >= 3 && q.options.some((o) => o.effects.some((e) => e.kind === 'pref')),
    )!;

  it('single-choice tiles: arrow keys pick the neighbor, only one tile is a tab stop', async () => {
    await mount();
    const firstSingle = rated(QUESTIONS).find((q) => !q.multi && q.options.length >= 3)!;
    let t = tiles(firstSingle.id);
    expect(t.map((b) => b.tabIndex)).toEqual(t.map((_, i) => (i === 0 ? 0 : -1)));
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    await act(() => {
      t[0]!.dispatchEvent(ev);
    });
    expect(ev.defaultPrevented).toBe(true);
    t = tiles(firstSingle.id);
    expect(isChecked(t[1]!)).toBe(true);
    expect(document.activeElement).toBe(t[1]);
    expect(t.map((b) => b.tabIndex)).toEqual(t.map((_, i) => (i === 1 ? 0 : -1)));
    await key(t[1]!, 'ArrowDown');
    expect(isChecked(tiles(firstSingle.id)[2]!)).toBe(true);
    await key(tiles(firstSingle.id)[2]!, 'ArrowUp');
    expect(isChecked(tiles(firstSingle.id)[1]!)).toBe(true);
    // Wrap-around: from the first to the left goes to the last.
    await key(tiles(firstSingle.id)[1]!, 'ArrowLeft');
    await key(tiles(firstSingle.id)[0]!, 'ArrowLeft');
    const last = tiles(firstSingle.id)[firstSingle.options.length - 1]!;
    expect(isChecked(last)).toBe(true);
    expect(document.activeElement).toBe(last);
  });

  it('multiple-choice tiles stay individually reachable via Tab and do not react to arrow keys', async () => {
    await mount();
    const t = tiles('role');
    expect(t.every((b) => b.tabIndex === 0)).toBe(true);
    await key(t[0]!, 'ArrowRight');
    expect(t.some((b) => isChecked(b))).toBe(false);
  });

  it('an arrow key in single choice keeps "Important"', async () => {
    await mount();
    const q = single();
    await click(tiles(q.id)[0]!);
    await click(weight(q.id, 'high'));
    await key(tiles(q.id)[0]!, 'ArrowRight');
    expect(isChecked(tiles(q.id)[1]!)).toBe(true);
    expect(draft()[q.id]).toEqual(pickHigh(q.options[1]!.id));
  });

  it('an arrow key starts at the focused tile, even if it is not picked', async () => {
    await mount();
    const q = single();
    await click(tiles(q.id)[1]!);
    await click(tiles(q.id)[1]!); // deselected again, focus stays there
    tiles(q.id)[1]!.focus();
    await key(tiles(q.id)[1]!, 'ArrowRight');
    expect(isChecked(tiles(q.id)[2]!)).toBe(true);
  });

  it('arrow keys with Alt, Ctrl, Meta or Shift are left to the browser', async () => {
    await mount();
    const q = single();
    for (const mod of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'] as const) {
      for (const target of [tiles(q.id)[0]!, weight('role', 'normal')]) {
        const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true, [mod]: true });
        await act(() => {
          target.dispatchEvent(ev);
        });
        expect(ev.defaultPrevented, mod).toBe(false);
      }
    }
    expect(tiles(q.id).some((b) => isChecked(b))).toBe(false);
    expect([...fieldset('role').querySelectorAll('.weight [aria-checked="true"]')]).toHaveLength(0);
  });
});
