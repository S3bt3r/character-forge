// @vitest-environment happy-dom
/* Status badge of a question: kinds, labels, icons. */
import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { rated } from '../support/fixtures';
import { readStyles } from '../support/styles';
import {
  root,
  setupAppDom,
  mount,
  click,
  fieldset,
  option,
  statusBadge,
  statusOf,
  statusText,
  weight,
} from '../support/ui-helpers';

setupAppDom();

describe('Status of a question', () => {
  const badge = (id: string) => statusBadge(fieldset(id));

  it('the status tooltip explains why and how strongly a question counts', async () => {
    await mount();
    expect(statusText('role')).toBe('');
    for (const o of QUESTIONS.find((q) => q.id === 'role')!.options) await click(option('role', o.id));
    expect(statusText('role')).toBe(EN.statusAllChosen);
    await click(option('leveling-style', 'quests'));
    expect(statusText('leveling-style')).toBe(EN.statusUnrated);
    await click(weight('distance', 'dontCare'));
    expect(statusText('distance')).toBe(EN.statusDontCare);
    await click(option('defense', 'stand'));
    await click(weight('defense', 'high'));
    expect(statusText('defense')).toBe(EN.statusHigh);
    const strict = rated(QUESTIONS).find((q) => q.multi && q.mode === 'all')!;
    await click(option(strict.id, strict.options[0]!.id));
    expect(statusText(strict.id)).toBe('');
    await click(option(strict.id, strict.options[1]!.id));
    expect(statusText(strict.id)).toBe(EN.statusRequirements.replace('{count}', '2'));
    const wide = rated(QUESTIONS).find((q) => q.multi && q.mode === 'all' && q.options.length >= 3)!;
    for (const o of wide.options.slice(0, 3)) await click(option(wide.id, o.id));
    expect(statusText(wide.id)).toBe(EN.statusRequirements.replace('{count}', '3'));
  });

  it('order when several statuses apply; opening questions and unanswered questions stay empty', async () => {
    await mount();
    // If the question does not count at all, "Important" is meaningless; "doesn't count" takes precedence.
    await click(option('role', 'tank'));
    await click(weight('role', 'high'));
    for (const o of QUESTIONS.find((q) => q.id === 'role')!.options.slice(1)) await click(option('role', o.id));
    expect(statusText('role')).toBe(EN.statusAllChosen);
    await click(option('leveling-style', 'dungeons'));
    expect(statusText('leveling-style')).toBe('');
    await click(weight('leveling-style', 'high'));
    await click(option('leveling-style', 'quests'));
    expect(statusText('leveling-style')).toBe(EN.statusUnrated);
    const strict = rated(QUESTIONS).find((q) => q.multi && q.mode === 'all')!;
    await click(option(strict.id, strict.options[0]!.id));
    await click(option(strict.id, strict.options[1]!.id));
    await click(weight(strict.id, 'high'));
    expect(statusText(strict.id)).toBe(EN.statusHigh);
    // Opening question options have no effect but are not "not rated": they control the chapter.
    for (const o of QUESTIONS.find((q) => q.id === 'pvp-interest')!.options) {
      await click(option('pvp-interest', o.id));
      expect(statusText('pvp-interest'), o.id).toBe('');
    }
  });

  it('in a switched-off chapter every question says it does not count, whatever its weight', async () => {
    await mount();
    await click(option('pvp-interest', 'no'));
    await click(weight('world-pvp', 'dontCare'));
    expect(statusOf(fieldset('world-pvp'))).toBe('notCounting');
    await click(option('world-pvp', 'escape'));
    await click(weight('world-pvp', 'high'));
    expect(statusOf(fieldset('world-pvp'))).toBe('notCounting');
    expect(statusText('world-pvp')).toBe('Doesn\'t count: "Not at all" is picked for PvP.');
  });

  it('every status has its own icon with a short name and tooltip, no sentence announcement', async () => {
    await mount();
    expect(root.querySelectorAll('fieldset [aria-live]')).toHaveLength(0);
    expect(root.querySelector('fieldset p.status')).toBeNull();
    for (const o of QUESTIONS.find((q) => q.id === 'role')!.options) await click(option('role', o.id));
    await click(option('leveling-style', 'quests'));
    await click(weight('distance', 'dontCare'));
    await click(option('defense', 'stand'));
    await click(weight('defense', 'high'));
    const strict = rated(QUESTIONS).find((q) => q.multi && q.mode === 'all' && q.options.length >= 3)!;
    for (const o of strict.options.slice(0, 3)) await click(option(strict.id, o.id));
    await click(option('pet', 'none'));
    const expected: [string, string, string, string][] = [
      ['role', 'allChosen', EN.statusLabel_allChosen, EN.statusAllChosen],
      ['leveling-style', 'unrated', EN.statusLabel_unrated, EN.statusUnrated],
      ['distance', 'dontCare', EN.statusLabel_dontCare, EN.statusDontCare],
      ['defense', 'high', EN.statusLabel_high, EN.statusHigh],
      [
        strict.id,
        'requirements',
        EN.statusLabel_requirements.replace('{count}', '3'),
        EN.statusRequirements.replace('{count}', '3'),
      ],
      ['pet', 'answered', EN.statusLabel_answered, EN.statusAnswered],
    ];
    const icons = new Set<string>();
    // The status class must have a rule in the stylesheet, so a renamed class cannot lose its style unnoticed.
    const css = readStyles();
    for (const [id, kind, label, tip] of expected) {
      const b = badge(id)!;
      expect(b.dataset['status'], id).toBe(kind);
      expect(b.getAttribute('aria-label'), id).toBe(label);
      expect(root.querySelector(`#${b.getAttribute('aria-describedby')}`)!.textContent, id).toBe(tip);
      icons.add(b.querySelector('.status-icon')!.innerHTML);
      const modifier = [...b.classList].find((c) => c.startsWith('status-') && c !== 'status-badge')!;
      expect(css, id).toContain(`.${modifier}`);
    }
    expect(icons.size).toBe(expected.length);
    expect(badge(strict.id)!.querySelector('.status-icon')!.textContent).toContain('3');
  });

  it('a question with an unmet answer condition says so in its status, answered or not, with its own icon', async () => {
    await mount();
    await click(option('leveling-style', 'quests'));
    await click(option('role', 'melee'));
    const b = badge('healing-style')!;
    expect(b.dataset['status']).toBe('notCounting');
    expect(b.getAttribute('aria-label')).toBe(EN.statusLabel_notCounting);
    expect(statusText('healing-style')).toBe('Counts only with Group role: Heal (healer).');
    expect(readStyles()).toContain('.status-not-counting');
    expect(b.querySelector('.status-icon')!.innerHTML).not.toBe(
      badge('leveling-style')!.querySelector('.status-icon')!.innerHTML,
    );
    await click(option('healing-style', 'group'));
    expect(statusOf(fieldset('healing-style'))).toBe('notCounting');
    await click(option('role', 'healer'));
    expect(statusOf(fieldset('healing-style'))).toBe('answered');
  });

  it('the status is in the header of the question, not in the footer', async () => {
    await mount();
    await click(option('role', 'tank'));
    expect(fieldset('role').querySelector('.question-meta .status-badge')).not.toBeNull();
    expect(fieldset('role').querySelector('.question-foot .status-badge')).toBeNull();
  });
});

// A fixed case for the precedence of the two reasons, in addition to the generated ones.
describe('Status with "all picked" and an unrated option', () => {
  it('if all options are picked and one of them is unrated, "all picked" applies', async () => {
    const q = rated(QUESTIONS).find(
      (x) => x.multi && x.mode === 'any' && x.options.some((o) => o.effects.length === 0),
    )!;
    expect(q, 'question with an unrated option').toBeDefined();
    await mount();
    for (const o of q.options) await click(option(q.id, o.id));
    expect(statusOf(fieldset(q.id))).toBe('allChosen');
  });
});
