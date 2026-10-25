// @vitest-environment happy-dom
/* Profession pairs and secondary professions in the sheet. */
import { describe, it, expect } from 'vitest';
import { within } from '@testing-library/preact';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { setupAppDom, mount, click, option, sheet, openSheetButton } from '../support/ui-helpers';

setupAppDom();

describe('Reasons of the profession pairs', () => {
  const professionShorts = new Set(QUESTIONS.filter((q) => q.chapter === 'professions').map((q) => q.short.en));
  const pairs = () => [...sheet()!.querySelectorAll('.professions .pair')];

  it('every recommended pair names at most three pros and cons from the profession questions', async () => {
    await mount();
    // The second option of every profession question yields pros and cons and more than three candidate reasons.
    for (const q of QUESTIONS.filter((x) => x.chapter === 'professions')) await click(option(q.id, q.options[1]!.id));
    await click(openSheetButton());
    expect(pairs().length).toBeGreaterThan(1);
    expect(pairs().some((pair) => pair.querySelectorAll('.factors.bad li:not(.ok)').length > 0)).toBe(true);
    expect(pairs().some((pair) => pair.querySelectorAll('.factors.good li:not(.ok)').length === 3)).toBe(true);
    for (const pair of pairs()) {
      // The reasons sit one heading level below the section "Primary professions".
      expect(
        within(pair as HTMLElement)
          .getAllByRole('heading', { level: 4 })
          .map((h) => h.textContent),
      ).toEqual([EN.whyGood, EN.whyBad]);
      expect(within(pair as HTMLElement).queryAllByRole('heading', { level: 3 })).toHaveLength(0);
      const good = [...pair.querySelectorAll('.factors.good li:not(.ok)')];
      const bad = [...pair.querySelectorAll('.factors.bad li:not(.ok)')];
      expect(good.length + bad.length).toBeGreaterThan(0);
      expect(good.length).toBeLessThanOrEqual(3);
      expect(bad.length).toBeLessThanOrEqual(3);
      for (const li of [...good, ...bad]) {
        const text = li.querySelector('.factor-line')!.textContent!;
        expect(
          [...professionShorts].some((short) => text.includes(`${short}: `)),
          text,
        ).toBe(true);
      }
    }
  });

  it('without answered profession questions the pairs show no reasons', async () => {
    await mount();
    await click(openSheetButton());
    expect(pairs().length).toBeGreaterThan(0);
    for (const pair of pairs()) expect(pair.querySelector('.factors')).toBeNull();
  });
});
