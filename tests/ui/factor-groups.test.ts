/* Pros, cons and deductions that rest on the same evidence are shown as one entry, so no note repeats in a column. */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { groupFactors, groupCons, type FactorGroup } from '../../src/ui/factor-groups';
import { specTraitEvidence } from '../../src/ui/catalog';
import { answersOf, pick, rated } from '../support/fixtures';
import { QUESTIONS } from '../../src/data/questions';
import { recommend } from '../../src/app/recommendation';
import type { Answers } from '../../src/domain/answers';
import type { Factor, Penalty } from '../../src/domain/scoring';
import type { SpecResult } from '../../src/domain/class-scoring';
import type { Evidence } from '../../src/data/display';
import type { SpecId } from '../../src/domain/ids';

const key = (e: Evidence) => JSON.stringify(e);
const keys = (es: Evidence[]) => new Set(es.map(key));
const factorId = (f: Factor) => `${f.questionId}/${f.optionId}`;
const factorEvidence = (f: Factor, specId: SpecId) =>
  f.traits.map((t) => specTraitEvidence(specId, t)).filter((e) => e !== undefined);
const penaltyEvidence = (p: Penalty, specId: SpecId) =>
  p.scope === 'spec' ? [specTraitEvidence(specId, p.trait)].filter((e) => e !== undefined) : [];

const DEALBREAKERS = QUESTIONS.find((q) => q.id === 'deal-breakers')!;
const withAllDealbreakers = (answers: Record<string, ReturnType<typeof pick>>) =>
  answersOf({ ...answers, 'deal-breakers': pick(...DEALBREAKERS.options.map((o) => o.id)) });
const everyQuestion = (choose: (count: number) => number) =>
  Object.fromEntries(
    rated(QUESTIONS)
      .filter((q) => q.chapter !== 'dealbreakers')
      .map((q) => [q.id, pick(q.options[choose(q.options.length)]!.id)]),
  );

const allSpecs = (answers: Answers): SpecResult[] => recommend(answers).ranking.flatMap((c) => c.specs);

/** Members' evidence of a group in a column: every factor's evidence plus the deduction's. */
const memberKeys = (g: FactorGroup, specId: SpecId, penalty?: Penalty) =>
  keys([...g.factors.flatMap((f) => factorEvidence(f, specId)), ...(penalty ? penaltyEvidence(penalty, specId) : [])]);

const penaltyMemberKeys = (p: PenaltyGroup, specId: SpecId) =>
  memberKeys({ factors: p.also, evidence: [] }, specId, p.penalty);

type PenaltyGroup = ReturnType<typeof groupCons>['penalties'][number];

/** One column of a spec: its points and deductions and how they are grouped. */
interface Column {
  specId: SpecId;
  factors: Factor[];
  penalties: Penalty[];
  groups: FactorGroup[];
  penaltyGroups: PenaltyGroup[];
}

function columnsOf({ specId, matches, conflicts, penalties }: SpecResult): Column[] {
  const cons = groupCons(conflicts, penalties, specId);
  return [
    { specId, factors: matches, penalties: [], groups: groupFactors(matches, specId), penaltyGroups: [] },
    { specId, factors: conflicts, penalties, groups: cons.conflicts, penaltyGroups: cons.penalties },
  ];
}

/** Every point lands in exactly one entry, every deduction keeps its own entry in order. */
function expectNothingLostOrDoubled({ specId, factors, penalties, groups, penaltyGroups }: Column) {
  const placed = [...groups.flatMap((g) => g.factors), ...penaltyGroups.flatMap((p) => p.also)].map(factorId);
  expect([...placed].sort(), specId).toEqual(factors.map(factorId).sort());
  expect(
    penaltyGroups.map((p) => p.penalty),
    specId,
  ).toEqual(penalties);
}

/** Entries keep the order of their strongest point. */
function expectStrongestFirst({ specId, factors, groups }: Column) {
  const firsts = groups.map((g) => factors.indexOf(g.factors[0]!));
  expect(firsts, specId).toEqual([...firsts].sort((a, b) => a - b));
  for (const g of groups) {
    const positions = g.factors.map((f) => factors.indexOf(f));
    expect(positions, specId).toEqual([...positions].sort((a, b) => a - b));
  }
}

/** Every note of the column appears exactly once, and only at an entry whose points rest on it. */
function expectEachNoteOnce({ specId, factors, penalties, groups, penaltyGroups }: Column) {
  const shown = [...groups.map((g) => g.evidence), ...penaltyGroups.map((p) => p.evidence)].flat().map(key);
  expect(new Set(shown).size, specId).toBe(shown.length);
  const all = keys([
    ...factors.flatMap((f) => factorEvidence(f, specId)),
    ...penalties.flatMap((p) => penaltyEvidence(p, specId)),
  ]);
  expect(new Set(shown), specId).toEqual(all);
  for (const g of groups) for (const e of g.evidence) expect(memberKeys(g, specId).has(key(e)), specId).toBe(true);
  for (const p of penaltyGroups)
    for (const e of p.evidence) expect(penaltyMemberKeys(p, specId).has(key(e)), specId).toBe(true);
}

/**
 * Entries are merged as far as they share evidence: points of different entries never rest on the same note, except
 * two deductions, which always keep entries of their own.
 */
function expectMergedOnlyOnSharedEvidence({ specId, groups, penaltyGroups }: Column) {
  const members = [
    ...groups.map((g) => ({ isPenalty: false, keys: memberKeys(g, specId) })),
    ...penaltyGroups.map((p) => ({ isPenalty: true, keys: penaltyMemberKeys(p, specId) })),
  ];
  members.forEach((a, i) =>
    members
      .slice(i + 1)
      .filter((b) => !(a.isPenalty && b.isPenalty))
      .forEach((b) =>
        expect(
          [...a.keys].filter((k) => b.keys.has(k)),
          specId,
        ).toEqual([]),
      ),
  );
}

function checkAllColumns(answers: Answers) {
  for (const column of allSpecs(answers).flatMap(columnsOf)) {
    expectNothingLostOrDoubled(column);
    expectStrongestFirst(column);
    expectEachNoteOnce(column);
    expectMergedOnlyOnSharedEvidence(column);
  }
}

/** Answers from one random number per question: an option index, for the deal-breakers a bit mask. */
const answersFromChoices = (questions: ReturnType<typeof rated>, choice: number[]): Answers =>
  answersOf(
    Object.fromEntries(
      questions.flatMap((q, i) => {
        if (q.id !== 'deal-breakers') return [[q.id, pick(q.options[choice[i]! % q.options.length]!.id)]];
        const chosen = q.options.filter((_, j) => (choice[i]! >> j) & 1).map((o) => o.id);
        return chosen.length > 0 ? [[q.id, pick(...chosen)]] : [];
      }),
    ),
  );

describe('Grouping by evidence', () => {
  const scenarios: [string, Answers][] = [
    ['first option everywhere, all deal-breakers', withAllDealbreakers(everyQuestion(() => 0))],
    ['last option everywhere, all deal-breakers', withAllDealbreakers(everyQuestion((n) => n - 1))],
    ['first option everywhere', answersOf(everyQuestion(() => 0))],
  ];

  it.each(scenarios)('%s: every note once per column, no point lost, merged only on shared evidence', (_, answers) => {
    checkAllColumns(answers);
  });

  it('the same holds for random answers', () => {
    const questions = rated(QUESTIONS);
    fc.assert(
      fc.property(fc.array(fc.nat(), { minLength: questions.length, maxLength: questions.length }), (choice) =>
        checkAllColumns(answersFromChoices(questions, choice)),
      ),
      { seed: 20261025, numRuns: 25 },
    );
  });

  it('the scenarios contain merges at all, also below a deduction', () => {
    const specs = scenarios.flatMap(([, answers]) => allSpecs(answers));
    expect(specs.some((s) => groupFactors(s.matches, s.specId).some((g) => g.factors.length > 1))).toBe(true);
    expect(
      specs.some((s) => groupCons(s.conflicts, s.penalties, s.specId).penalties.some((p) => p.also.length > 0)),
    ).toBe(true);
  });

  it('"With others" lands below the deal-breaker "Hard to find a group" for a spec rarely in demand', () => {
    const answers = answersOf({ social: pick('group'), 'deal-breakers': pick('no-group') });
    const hit = allSpecs(answers).filter((s) => s.penalties.some((p) => p.trait === 'groupDemand'));
    expect(hit.length, 'a spec below the threshold').toBeGreaterThan(0);
    for (const spec of hit) {
      const { conflicts, penalties } = groupCons(spec.conflicts, spec.penalties, spec.specId);
      expect(
        conflicts.flatMap((g) => g.factors).some((f) => f.questionId === 'social'),
        spec.specId,
      ).toBe(false);
      expect(penalties[0]!.also.map(factorId), spec.specId).toEqual(['social/group']);
      expect(penalties[0]!.evidence, spec.specId).toEqual([specTraitEvidence(spec.specId, 'groupDemand')]);
    }
  });

  it('without a spec there is no evidence to compare, so every point stays on its own', () => {
    const spec = allSpecs(withAllDealbreakers(everyQuestion(() => 0)))[0]!;
    expect(groupFactors(spec.matches, undefined).map((g) => g.factors)).toEqual(spec.matches.map((f) => [f]));
    const cons = groupCons(spec.conflicts, spec.penalties, undefined);
    expect(cons.conflicts.map((g) => g.factors)).toEqual(spec.conflicts.map((f) => [f]));
    expect(cons.penalties.every((p) => p.also.length === 0 && p.evidence.length === 0)).toBe(true);
  });
});
