import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { evaluate, hasPreferenceFor } from '../../src/domain/evaluation';
import { NEUTRAL_SCORE } from '../../src/domain/scoring';
import {
  isUnrated,
  dualSpec,
  bestSpec,
  classScore,
  rankClasses,
  classCriteriaCount,
} from '../../src/domain/class-scoring';
import { answersOf, deal, input, pick, pref, question, race, spec, type TestInput } from '../support/fixtures';
import { prefArb, scenarioArb, specProfile, unit } from '../support/arbitraries';

/* Class ranking: each class by its best spec, the dual spec, unrated classes and ties. */

describe('Class ranking', () => {
  it('without answers: all classes neutral', () => {
    const data = input(
      [spec('s1', 'c1', { a: 1 }), spec('s2', 'c2', { a: 0 })],
      [race('r', 'horde', {})],
      [question('q', [[pref('spec', 'a', 1)]])],
    );
    const result = rankClasses(data, evaluate(data.questions, {}));
    expect(result.map((c) => c.classId).sort()).toEqual(['c1', 'c2']);
    for (const c of result) {
      expect(classScore(c)).toBe(NEUTRAL_SCORE);
      expect(isUnrated(c)).toBe(true);
    }
  });
  it('class and spec scores do not depend on race answers', () => {
    fc.assert(
      fc.property(
        scenarioArb,
        fc.array(fc.array(prefArb('race'), { minLength: 1, maxLength: 3 }), { minLength: 1, maxLength: 3 }),
        ({ data, answers }, raceOpts) => {
          const rq = question('raceQ', raceOpts);
          const extended: TestInput = { ...data, questions: [...data.questions, rq] };
          expect(
            rankClasses(
              extended,
              evaluate(extended.questions, answersOf({ ...answers, raceQ: pick(...rq.options.map((o) => o.id)) })),
            ),
          ).toEqual(rankClasses(data, evaluate(data.questions, answers)));
        },
      ),
    );
  });

  it('best and second-best spec per class', () => {
    fc.assert(
      fc.property(fc.array(specProfile, { minLength: 2, maxLength: 3 }), unit, (profiles, target) => {
        const data = input(
          profiles.map((t, i) => spec(`s${i}`, 'c', t)),
          [race('r', 'horde', {})],
          [question('q', [[pref('spec', 'a', target)]])],
        );
        const [c] = rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })));
        const sorted = [...c!.specs].sort((x, y) => y.score - x.score);
        expect(bestSpec(c!).score).toBe(sorted[0]!.score);
        expect(dualSpec(c!)!.score).toBe(sorted[1]!.score);
        expect(classScore(c!)).toBe(bestSpec(c!).score);
      }),
    );
  });

  it('sorts classes descending by score', () => {
    fc.assert(
      fc.property(scenarioArb, ({ data, answers }) => {
        const scores = rankClasses(data, evaluate(data.questions, answers)).map(classScore);
        expect(scores).toEqual([...scores].sort((x, y) => y - x));
      }),
    );
  });
});

describe('Rated classes and class criteria', () => {
  it('a class is unrated only without class-relevant answers', () => {
    const data = input(
      [spec('s', 'c', { a: 1 })],
      [race('r', 'horde', { x: 0 })],
      [question('spec', [[pref('spec', 'a', 1)]]), question('race', [[pref('race', 'x', 1)]])],
    );
    expect(isUnrated(rankClasses(data, evaluate(data.questions, answersOf({ race: pick('o0') })))[0]!)).toBe(true);
    expect(isUnrated(rankClasses(data, evaluate(data.questions, answersOf({ spec: pick('o0') })))[0]!)).toBe(false);
  });

  it('classCriteriaCount counts only spec preferences and deal-breakers', () => {
    const qs = [
      question('spec', [[pref('spec', 'a', 1)], [pref('race', 'x', 1)], [pref('spec', 'a', 0)]]),
      question('deal', [[deal('spec', 'a', 'min', 0.5)]]),
      question('race', [[pref('race', 'x', 1)]]),
      question('prof', [[pref('profession', 'timeCost', 1)]]),
      question('legacy', [[pref('legacy', 'gold', 1)]]),
      question('empty', [[]]),
    ];
    const all = Object.fromEntries(qs.map((q) => [q.id, pick('o0')]));
    expect(classCriteriaCount(evaluate(qs, all))).toBe(2);
    expect(classCriteriaCount(evaluate(qs, answersOf({ spec: pick('o1') })))).toBe(0);
    expect(classCriteriaCount(evaluate(qs, answersOf({ spec: pick('o0', 'o1') })))).toBe(1);
  });

  it('mixed options count for the class ranking as soon as one effect concerns the spec', () => {
    const mixed = question('m', [[pref('race', 'x', 1), pref('spec', 'a', 1)]]);
    const split = question('s', [[pref('race', 'x', 1)], [pref('spec', 'a', 1)], [pref('spec', 'b', 1)]]);
    expect(classCriteriaCount(evaluate([mixed], answersOf({ m: pick('o0') })))).toBe(1);
    expect(classCriteriaCount(evaluate([split], answersOf({ s: pick('o0', 'o1') })))).toBe(1);
    expect(hasPreferenceFor(evaluate([mixed], answersOf({ m: pick('o0') })), 'spec')).toBe(true);
    expect(hasPreferenceFor(evaluate([split], answersOf({ s: pick('o0', 'o1') })), 'spec')).toBe(true);
  });

  it('a class counts as rated as soon as one of its specs is rated', () => {
    const data = input(
      [spec('unrated', 'c', {}), spec('rated', 'c', { a: 0.5 })],
      [race('r', 'horde', {})],
      [question('q', [[pref('spec', 'a', 1)]])],
    );
    expect(isUnrated(rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))[0]!)).toBe(false);
  });
});

describe('Ties', () => {
  // Without answers every spec and class scores the same, so only the IDs can decide the order.
  const specs = [
    spec('z-spec-b', 'z', { a: 0.2 }),
    spec('a-spec', 'a', { a: 0.9 }),
    spec('z-spec-a', 'z', { a: 0.5 }),
    spec('m-spec', 'm', { a: 0.1 }),
  ];
  const races = [race('r', 'horde', {})];

  it('equal scores are ordered by class and spec ID, whatever the order of the catalog', () => {
    fc.assert(
      fc.property(fc.shuffledSubarray(specs, { minLength: specs.length }), (shuffled) => {
        const data = input(shuffled, races, []);
        const ranking = rankClasses(data, evaluate(data.questions, {}));
        expect(ranking.map((c) => c.classId)).toEqual(['a', 'm', 'z']);
        expect(ranking[2]!.specs.map((s) => s.specId)).toEqual(['z-spec-a', 'z-spec-b']);
      }),
    );
  });
});
