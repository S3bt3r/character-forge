// @vitest-environment happy-dom
/* Pros, cons and deal-breaker penalties as the ranking and the sheet list them. */
import { describe, it, expect } from 'vitest';
import { within } from '@testing-library/preact';
import { render } from 'preact';
import { FactorList } from '../../src/ui/FactorList';
import { specTraitEvidence } from '../../src/ui/catalog';
import { answersOf, pick, rated } from '../support/fixtures';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { CLASSES } from '../../src/data/classes';
import { SEVERITY_PENALTY } from '../../src/domain/scoring';
import { bestSpec, classScore } from '../../src/domain/class-scoring';
import { recommend } from '../../src/app/recommendation';
import { groupCons, groupFactors } from '../../src/ui/factor-groups';
import {
  root,
  setupAppDom,
  mount,
  click,
  option,
  draft,
  ranking,
  sheet,
  openItem,
  openSheetButton,
  classItem,
  openClass,
  answerMany,
} from '../support/ui-helpers';

setupAppDom();

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Accessible name of the expand toggle in either state: "Show n more" for any n, or "Show less". */
const moreToggleName = new RegExp(
  `^(${EN.showMoreFactors.split('{count}').map(escapeRegExp).join('\\d+')}|${escapeRegExp(EN.showFewerFactors)})$`,
);
const moreToggle = (scope: Element) => within(scope as HTMLElement).queryByRole('button', { name: moreToggleName });

describe('Pros and cons', () => {
  const expectedTop = () => bestSpec(recommend(draft()).ranking[0]!);

  it('the character sheet lists all pros and cons', async () => {
    await mount();
    await answerMany();
    const best = expectedTop();
    // Points that rest on the same note form one entry.
    const good = groupFactors(best.matches, best.specId);
    const bad = groupCons(best.conflicts, best.penalties, best.specId);
    expect(good.length).toBeGreaterThan(3);
    await click(openSheetButton());
    expect(sheet()!.querySelectorAll('.sheet-summary .factors.good li')).toHaveLength(good.length);
    // deductions are listed below the conflicts in "Missing".
    expect(sheet()!.querySelectorAll('.sheet-summary .factors.bad li:not(.ok)')).toHaveLength(
      bad.conflicts.length + bad.penalties.length,
    );
    expect(sheet()!.querySelectorAll('.sheet-summary .factors.bad li.penalty')).toHaveLength(best.penalties.length);
    expect(moreToggle(sheet()!)).toBeNull();
  });

  it('the live ranking shows the three most important ones, "show more" expands and collapses the rest', async () => {
    await mount();
    await answerMany();
    const best = expectedTop();
    const entries = groupFactors(best.matches, best.specId).length;
    const good = () => root.querySelector('.ranking-item.open .factors.good')!;
    expect(good().querySelectorAll('li')).toHaveLength(3);
    const more = moreToggle(good())!;
    expect(more.textContent).toBe(EN.showMoreFactors.replace('{count}', String(entries - 3)));
    expect(more.getAttribute('aria-expanded')).toBe('false');
    await click(more);
    expect(good().querySelectorAll('li')).toHaveLength(entries);
    expect(more.getAttribute('aria-expanded')).toBe('true');
    expect(more.textContent).toBe(EN.showFewerFactors);
    await click(more);
    expect(good().querySelectorAll('li')).toHaveLength(3);
  });

  it('without further points there is no expand button', async () => {
    await mount();
    await click(option('role', 'tank'));
    const best = expectedTop();
    expect(best.matches.length).toBeLessThanOrEqual(3);
    expect(moreToggle(root.querySelector('.ranking-item.open .factors.good')!)).toBeNull();
  });

  it('"show n more" counts only conflict entries, deductions are always listed in full', async () => {
    await mount();
    await answerMany({ dealbreakers: true });
    const cons = (r: (typeof ranked)[number]) =>
      groupCons(bestSpec(r).conflicts, bestSpec(r).penalties, bestSpec(r).specId);
    const ranked = recommend(draft()).ranking;
    const many = ranked.find((r) => cons(r).conflicts.length > 3 && bestSpec(r).penalties.length > 0)!;
    expect(many, 'scenario with more than three conflict entries and a deduction').toBeDefined();
    const open = await openClass(many.classId);
    const more = moreToggle(open.querySelector('.factors.bad')!)!;
    expect(more.textContent).toBe(EN.showMoreFactors.replace('{count}', String(cons(many).conflicts.length - 3)));
    expect(open.querySelectorAll('.factors.bad li.penalty')).toHaveLength(bestSpec(many).penalties.length);
  });
});

describe('Deal-breaker deductions', () => {
  it('one entry in the widget per violated deal-breaker, the costs add up to the total', async () => {
    await mount();
    for (const o of QUESTIONS.find((q) => q.id === 'deal-breakers')!.options)
      await click(option('deal-breakers', o.id));
    const expected = recommend(draft()).ranking;
    let some = false;
    for (const name of ranking().map((i) => i.querySelector('.class-name')!.textContent!)) {
      const item = classItem(name);
      await click(item.querySelector<HTMLButtonElement>('button.ranking-head')!);
      const cls = CLASSES.find((c) => c.name.en === name)!;
      const penalties = bestSpec(expected.find((r) => r.classId === cls.id)!).penalties;
      const costs = [...root.querySelectorAll('.ranking-item.open .factors.bad .penalty-cost')].map((c) =>
        Number(c.textContent!.match(/\d+/)![0]),
      );
      expect(costs.length, cls.id).toBe(penalties.length);
      expect(
        costs.reduce((n, c) => n + c, 0),
        cls.id,
      ).toBe(penalties.reduce((n, p) => n + p.points, 0));
      some ||= penalties.length > 0;
    }
    expect(some).toBe(true);
    expect(expected.some((r) => bestSpec(r).penalties.length > 1)).toBe(true);
  });

  it('deal-breaker deduction and reason are on the same line as with the other points', async () => {
    await mount();
    await click(option('deal-breakers', 'totems'));
    const shaman = classItem('Shaman');
    await click(shaman.querySelector<HTMLButtonElement>('button.ranking-head')!);
    const penalties = root.querySelectorAll('.ranking-item.open .factors.bad li.penalty');
    expect(penalties.length).toBeGreaterThan(0);
    for (const li of penalties) {
      const line = li.querySelector(':scope > .factor-line')!;
      expect(line).not.toBeNull();
      // warning icon and reason on one line, the cost below, no severity word.
      expect(line.querySelector('svg')).not.toBeNull();
      expect(line.textContent).not.toMatch(/\b(light|heavy)\b/i);
      expect(li.querySelector(':scope > .penalty-cost')!.textContent).toBe(
        EN.penaltyCost.replace('{points}', String(SEVERITY_PENALTY.heavy)),
      );
      expect(li.querySelectorAll(':scope > .sign')).toHaveLength(0);
    }
  });

  it('deductions show the provenance badge of the trait, in the sheet with a tooltip', async () => {
    await mount();
    await click(option('deal-breakers', 'reagents'));
    const warlock = classItem('Warlock');
    await click(warlock.querySelector<HTMLButtonElement>('button.ranking-head')!);
    const inRanking = root.querySelector('.ranking-item.open .factors.bad li.penalty')!;
    expect(inRanking.querySelector('.provenance-badge')).not.toBeNull();
    expect(within(inRanking as HTMLElement).queryAllByRole('tooltip', { hidden: true }).length).toBeGreaterThan(0);
    await click(openSheetButton());
    const penalty = sheet()!.querySelector('.factors.bad li.penalty')!;
    const badge = penalty.querySelector('.provenance-badge')!;
    expect(badge.className).toMatch(/provenance-badge-(confirmed|classic|unconfirmed|estimate|community)/);
    expect(within(penalty as HTMLElement).queryAllByRole('tooltip', { hidden: true }).length).toBeGreaterThan(0);
  });

  it('no separate deal-breaker column, in the ranking as in the sheet only Fits and Missing', async () => {
    await mount();
    await click(option('role', 'tank'));
    expect(root.querySelector('.factors.nogo')).toBeNull();
    expect(openItem().querySelectorAll('.factor-grid > .factors')).toHaveLength(2);
    await click(openSheetButton());
    expect(sheet()!.querySelector('.factors.nogo')).toBeNull();
    expect(sheet()!.querySelectorAll('.factor-grid > .factors')).toHaveLength(2);
  });

  it('deductions are listed in full below the conflicts and are distinguishable from them', async () => {
    await mount();
    for (const o of QUESTIONS.find((q) => q.id === 'deal-breakers')!.options)
      await click(option('deal-breakers', o.id));
    const expected = recommend(draft()).ranking;
    const shaman = bestSpec(expected.find((r) => r.classId === 'shaman')!);
    expect(shaman.penalties.length).toBeGreaterThan(0);
    await click(classItem('Shaman').querySelector<HTMLButtonElement>('button.ranking-head')!);
    const items = [...openItem().querySelectorAll('.factors.bad > ul > li')];
    const firstPenalty = items.findIndex((li) => li.classList.contains('penalty'));
    expect(items.filter((li) => li.classList.contains('penalty'))).toHaveLength(shaman.penalties.length);
    expect(items.slice(firstPenalty).every((li) => li.classList.contains('penalty'))).toBe(true);
    for (const li of items) {
      if (li.classList.contains('penalty')) {
        expect(li.querySelector('.factor-line svg')).not.toBeNull();
        expect(li.querySelector('.penalty-cost')).not.toBeNull();
      } else {
        expect(li.querySelector('.sign')!.textContent).toBe('−');
        expect(li.querySelector('.penalty-cost')).toBeNull();
      }
    }
  });

  it('percentages with a deduction carry no separate mark, in the ranking as in the sheet; the warning icon appears only at the deduction in "Missing"', async () => {
    await mount();
    await click(option('deal-breakers', 'totems'));
    const result = recommend(draft()).ranking.find((r) => r.classId === 'shaman')!;
    expect(bestSpec(result).penalties.reduce((n, p) => n + p.points, 0)).toBeGreaterThan(0);
    const item = classItem('Shaman');
    expect(item.querySelector('.ranking-head svg, .penalty-badge')).toBeNull();
    expect(item.querySelector('.score-value')!.textContent).toBe(`${Math.round(classScore(result))}%`);
    const open = await openClass('shaman');
    expect(open.querySelector('.ranking-head .penalty-badge')).toBeNull();
    expect(open.querySelector('.ranking-head')!.textContent).not.toMatch(/⚠|−\d|\(−/);
    expect(open.querySelector('.factors.bad li.penalty .factor-line svg')).not.toBeNull();
    await click(openSheetButton());
    expect(sheet()!.querySelector('.sheet-head .penalty-badge, .spec-cards .penalty-badge')).toBeNull();
    expect(sheet()!.querySelector('.sheet-score')!.textContent).toBe(`${Math.round(classScore(result))}%`);
    expect(sheet()!.querySelector('.spec-cards .spec-score')!.textContent).toBe(
      `${Math.round(bestSpec(result).score)}%`,
    );
  });

  it('deductions name their cost, without a severity word', async () => {
    await mount();
    await click(option('deal-breakers', 'reagents'));
    const item = classItem('Warlock');
    await click(item.querySelector<HTMLButtonElement>('button.ranking-head')!);
    const li = root.querySelector('.ranking-item.open .factors.bad li.penalty')!;
    expect(li.querySelector('.factor-line')!.textContent).not.toMatch(/\b(light|heavy)\b/i);
    expect(li.querySelector('.penalty-cost')!.textContent).toBe(
      EN.penaltyCost.replace('{points}', String(SEVERITY_PENALTY.light)),
    );
  });

  it('with conflicts and deductions: deductions are below the conflicts, conflicts carry "−", deductions ⚠ and "costs N%"', async () => {
    await mount();
    await answerMany({ dealbreakers: true });
    const both = recommend(draft()).ranking.find(
      (r) => bestSpec(r).conflicts.length > 0 && bestSpec(r).penalties.length > 0,
    )!;
    expect(both, 'scenario with a conflict and a deduction').toBeDefined();
    const items = [...(await openClass(both.classId)).querySelectorAll('.factors.bad > ul > li')];
    const kinds = items.map((li) => (li.classList.contains('penalty') ? 'P' : 'C')).join('');
    expect(kinds).toMatch(/^C+P+$/);
    expect(kinds.replace(/C/g, '')).toHaveLength(bestSpec(both).penalties.length);
    for (const li of items) {
      if (li.classList.contains('penalty')) {
        expect(li.querySelector('.factor-line svg')).not.toBeNull();
        expect(li.querySelector('.factor-line')!.textContent).not.toMatch(/−\d/);
        // The cost is below the line with icon and reason.
        expect(
          li.querySelector('.factor-line')!.compareDocumentPosition(li.querySelector('.penalty-cost')!) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(li.querySelector('.penalty-cost')!.textContent).toMatch(/^costs \d+%$/);
      } else {
        expect(li.querySelector('.sign')!.textContent).toBe('−');
        expect(li.querySelector('.factor-line svg')).toBeNull();
      }
    }
  });

  it('"No conflicts with your answers." exactly when there are neither conflicts nor deductions', async () => {
    await mount();
    await click(option('role', 'tank'));
    const results = recommend(draft()).ranking;
    const clean = results.find((r) => bestSpec(r).conflicts.length === 0 && bestSpec(r).penalties.length === 0)!;
    const withConflict = results.find((r) => bestSpec(r).conflicts.length > 0)!;
    expect(clean && withConflict, 'both cases in the scenario').toBeTruthy();
    expect((await openClass(clean.classId)).querySelector('.factors.bad li.ok')!.textContent).toBe(EN.noConflicts);
    expect((await openClass(withConflict.classId)).querySelector('.factors.bad li.ok')).toBeNull();
  });

  it('a deduction shows the provenance note like the other points, without repeating it in the tooltip', async () => {
    await mount();
    await click(option('deal-breakers', 'reagents'));
    const li = (await openClass('warlock')).querySelector('.factors.bad li.penalty')!;
    const note = li.querySelector('.note')!.textContent!;
    expect(note.length).toBeGreaterThan(0);
    const badge = li.querySelector('.provenance-badge')!;
    expect(root.querySelector(`#${badge.getAttribute('aria-describedby')}`)!.textContent).not.toContain(note);
  });

  it('the legend explains the deduction in the percentage and the severity, without "Weight"', async () => {
    await mount();
    const legend = root.querySelector('.legend')!.textContent!;
    expect(legend).toContain('the percentage already includes the deduction');
    expect(legend).toContain('severity');
    expect(legend).not.toContain(EN.weightLabel);
  });
});

describe('Points on the same note', () => {
  it('a point that rests on a deduction\'s note is listed below the deduction as "also", with the note once', async () => {
    await mount();
    await click(option('social', 'group'));
    await click(option('deal-breakers', 'no-group'));
    const result = recommend(draft()).ranking.find((r) =>
      bestSpec(r).penalties.some((p) => p.trait === 'groupDemand'),
    )!;
    expect(result, 'a class whose best spec is rarely in demand for groups').toBeDefined();
    const note = specTraitEvidence(bestSpec(result).specId, 'groupDemand')!.note!.en;
    const bad = (await openClass(result.classId)).querySelector('.factors.bad')!;
    const penalty = bad.querySelector('li.penalty')!;
    const social = QUESTIONS.find((q) => q.id === 'social')!;
    const group = social.options.find((o) => o.id === 'group')!;
    expect(penalty.querySelector('.penalty-also')!.textContent).toBe(
      EN.alsoFactors.replace('{items}', `${social.short.en}: ${group.label.en}`),
    );
    expect([...bad.querySelectorAll('.note')].filter((n) => n.textContent === note)).toHaveLength(1);
    expect(penalty.querySelector('.note')!.textContent).toBe(note);
    expect([...bad.querySelectorAll('li:not(.penalty)')].some((li) => li.textContent!.includes(group.label.en))).toBe(
      false,
    );
  });
});

describe('Evidence per factor', () => {
  it('a point shows each distinct evidence of its traits once, as its own note and badge group', () => {
    // Every pick of an option with two or more spec preferences, for every spec it gives a pro or con.
    const cases = rated(QUESTIONS).flatMap((q) =>
      q.options
        .filter((o) => o.effects.filter((e) => e.kind === 'pref' && e.scope === 'spec').length > 1)
        .flatMap((o) =>
          recommend(answersOf({ [q.id]: pick(o.id) })).ranking.flatMap((c) =>
            c.specs.flatMap((s) => {
              const factor = [...s.matches, ...s.conflicts].find((f) => f.optionId === o.id);
              if (!factor || factor.traits.length < 2) return [];
              const all = factor.traits.flatMap((trait) => specTraitEvidence(s.specId, trait) ?? []);
              const distinct = [...new Map(all.map((e) => [JSON.stringify(e), e])).values()];
              return [{ specId: s.specId, factor, all, distinct }];
            }),
          ),
        ),
    );
    // The cases this rule exists for: equal entries on two traits, and entries with and without a note side by side.
    expect(cases.some((c) => c.distinct.length < c.all.length)).toBe(true);
    expect(cases.some((c) => c.distinct.some((e) => !e.note) && c.distinct.some((e) => e.note))).toBe(true);
    for (const { specId, factor, distinct } of cases) {
      const host = document.createElement('div');
      render(<FactorList matches={[factor]} conflicts={[]} penalties={[]} specId={specId} />, host);
      const groups = [...host.querySelectorAll('.factors.good .factor-evidence')];
      expect(groups, specId).toHaveLength(distinct.length);
      groups.forEach((g, i) => {
        expect(
          [...g.querySelectorAll('.note')].map((n) => n.textContent),
          specId,
        ).toEqual(distinct[i]!.note ? [distinct[i]!.note.en] : []);
        expect(g.querySelectorAll('.provenance-badge'), specId).toHaveLength(1);
      });
      render(null, host);
    }
  });
});
