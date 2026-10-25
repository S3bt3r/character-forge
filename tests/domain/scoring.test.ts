import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { evaluate } from '../../src/domain/evaluation';
import { clampScore, SEVERITY_PENALTY, topMatches, topConflicts, type Factor } from '../../src/domain/scoring';
import { classScore, rankClasses } from '../../src/domain/class-scoring';
import { rankRaces } from '../../src/domain/race-scoring';
import type { Effect } from '../../src/domain/questions';
import type { Answers, Answer } from '../../src/domain/answers';
import { answersOf, deal, input, pick, pref, question, race, spec, type TestInput, rated } from '../support/fixtures';
import { QUESTIONS } from '../../src/data/questions';
import { recommend } from '../../src/app/recommendation';
import { classId, optionId, questionId } from '../../src/domain/ids';
import { scenarioArb, SPEC_TRAITS, specProfile, unit } from '../support/arbitraries';

/* Scoring a profile against the counted answers: matches, pros and cons, penalties, limits and ties. */

const allScores = (data: TestInput, answers: Answers) => {
  const classes = rankClasses(data, evaluate(data.questions, answers));
  const scores = classes.flatMap((c) => [classScore(c), ...c.specs.map((s) => s.score)]);
  for (const c of classes)
    scores.push(...rankRaces(data, evaluate(data.questions, answers), c.classId).map((r) => r.score));
  return scores;
};

/** Random answer sets from the real catalog: one picked option per question. */
const answersArb = fc
  .subarray(rated(QUESTIONS), { minLength: 1 })
  .chain((qs) =>
    fc.tuple(
      ...qs.map((q) => fc.constantFrom(...q.options.map((o) => o.id)).map((id): [string, Answer] => [q.id, pick(id)])),
    ),
  )
  .map((entries): Answers => Object.fromEntries(entries));

const pro = (f: Factor) => f.weight * f.match;

const contra = (f: Factor) => f.weight * (1 - f.match);

const descending = (list: Factor[], key: (f: Factor) => number) =>
  list.every((f, i) => i === 0 || key(list[i - 1]!) >= key(f));

describe('Scoring properties', () => {
  it('every class, spec and race score lies in [0, 100]', () => {
    fc.assert(
      fc.property(scenarioArb, ({ data, answers }) => {
        for (const s of allScores(data, answers)) {
          expect(s).toBeGreaterThanOrEqual(0);
          expect(s).toBeLessThanOrEqual(100);
        }
      }),
    );
  });

  it('deterministic and independent of the order of the answers', () => {
    fc.assert(
      fc.property(scenarioArb, ({ data, answers }) => {
        const reversed: Answers = Object.fromEntries(Object.entries(answers).reverse());
        expect(rankClasses(data, evaluate(data.questions, reversed))).toEqual(
          rankClasses(data, evaluate(data.questions, answers)),
        );
        for (const c of rankClasses(data, evaluate(data.questions, answers)))
          expect(rankRaces(data, evaluate(data.questions, reversed), c.classId)).toEqual(
            rankRaces(data, evaluate(data.questions, answers), c.classId),
          );
      }),
    );
  });

  it('a target closer to the spec value does not lower the spec score', () => {
    fc.assert(
      fc.property(specProfile, fc.constantFrom(...SPEC_TRAITS), unit, unit, (traits, trait, target, step) => {
        const closer = target + (traits[trait] - target) * step;
        const score = (t: number) => {
          const qs = [question('q', [[pref('spec', trait, t)]])];
          return rankClasses(
            input([spec('s', 'c', traits)], [race('r', 'horde', {})], qs),
            evaluate(qs, answersOf({ q: pick('o0') })),
          )[0]!.specs[0]!.score;
        };
        expect(score(closer)).toBeGreaterThanOrEqual(score(target) - 1e-9);
      }),
    );
  });

  it('penalties add up per severity for exactly the violated deal-breakers and keep the score in [0, 100]', () => {
    fc.assert(
      fc.property(
        specProfile,
        fc.array(
          fc.record({
            trait: fc.constantFrom(...SPEC_TRAITS),
            op: fc.constantFrom('min' as const, 'max' as const),
            threshold: unit,
            heavy: fc.boolean(),
          }),
          { minLength: 1, maxLength: 4 },
        ),
        unit,
        (traits, deals, target) => {
          const base = question('p', [[pref('spec', 'a', target)]]);
          const dq = question(
            'd',
            deals.map((d) => [deal('spec', d.trait, d.op, d.threshold, d.heavy ? 'heavy' : 'light')]),
            { mode: 'all' },
          );
          const data = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [base, dq]);
          const without = rankClasses(data, evaluate(data.questions, answersOf({ p: pick('o0') })))[0]!.specs[0]!;
          const withDeals = rankClasses(
            data,
            evaluate(data.questions, answersOf({ p: pick('o0'), d: pick(...dq.options.map((o) => o.id)) })),
          )[0]!.specs[0]!;
          const expected = deals
            .filter((d) => (d.op === 'min' ? traits[d.trait] < d.threshold : traits[d.trait] > d.threshold))
            .reduce((sum, d) => sum + SEVERITY_PENALTY[d.heavy ? 'heavy' : 'light'], 0);
          expect(withDeals.penalties.reduce((s, p) => s + p.points, 0)).toBe(expected);
          expect(withDeals.score).toBeCloseTo(Math.max(0, without.score - expected), 9);
        },
      ),
    );
  });

  it('factors refer to question and option', () => {
    const data = input(
      [spec('s', 'c', { a: 1, b: 0 })],
      [race('r', 'horde', {})],
      [question('likesA', [[pref('spec', 'a', 1)]]), question('likesB', [[pref('spec', 'b', 1)]])],
    );
    const s = rankClasses(data, evaluate(data.questions, answersOf({ likesA: pick('o0'), likesB: pick('o0') })))[0]!
      .specs[0]!;
    expect(s.matches).toContainEqual(expect.objectContaining({ questionId: 'likesA', optionId: 'o0' }));
    expect(s.conflicts).toContainEqual(expect.objectContaining({ questionId: 'likesB', optionId: 'o0' }));
  });
});

describe('OR/AND and tiers', () => {
  // Picking all options means "anything is fine", so the tolerance rule is checked on proper subsets.
  it('with "any" the best match counts; additional options never lower it (proper subsets)', () => {
    fc.assert(
      fc.property(
        specProfile,
        fc.array(fc.tuple(fc.constantFrom(...SPEC_TRAITS), unit), { minLength: 3, maxLength: 5 }),
        fc.integer({ min: 1, max: 3 }),
        (traits, opts, k) => {
          const q = question(
            'q',
            opts.map(([t, v]) => [pref('spec', t, v)]),
            { mode: 'any' },
          );
          const data = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [q]);
          const score = (ids: string[]) =>
            rankClasses(data, evaluate(data.questions, answersOf({ q: pick(...ids) })))[0]!.specs[0]!.score;
          const ids = q.options.map((o) => o.id).slice(0, -1);
          const single = ids.map((id) => score([id]));
          expect(score(ids)).toBeCloseTo(Math.max(...single), 9);
          const subset = ids.slice(0, Math.min(k, ids.length));
          expect(score(ids)).toBeGreaterThanOrEqual(score(subset) - 1e-9);
        },
      ),
    );
  });

  it('with "all" the mean counts; weakly met options appear as missing', () => {
    fc.assert(
      fc.property(
        specProfile,
        fc.array(fc.tuple(fc.constantFrom(...SPEC_TRAITS), unit), { minLength: 2, maxLength: 4 }),
        (traits, opts) => {
          const q = question(
            'q',
            opts.map(([t, v]) => [pref('spec', t, v)]),
            { mode: 'all' },
          );
          const data = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [q]);
          const score = (ids: string[]) =>
            rankClasses(data, evaluate(data.questions, answersOf({ q: pick(...ids) })))[0]!.specs[0]!.score;
          const ids = q.options.map((o) => o.id);
          const mean = ids.map((id) => score([id])).reduce((a, b) => a + b, 0) / ids.length;
          expect(score(ids)).toBeCloseTo(mean, 9);
        },
      ),
    );
    const tools = question('tools', [[pref('spec', 'kick', 1)], [pref('spec', 'stun', 1)]], { mode: 'all' });
    const data = input([spec('hunter', 'h', { kick: 0, stun: 1 })], [race('r', 'horde', {})], [tools]);
    const s = rankClasses(data, evaluate(data.questions, answersOf({ tools: pick('o0', 'o1') })))[0]!.specs[0]!;
    expect(s.score).toBeCloseTo(50, 9);
    expect(s.conflicts.map((f) => f.optionId)).toContain('o0');
    expect(s.matches.map((f) => f.optionId)).toContain('o1');
  });
});

describe('Scoring basics', () => {
  it('without answers the score is exactly 50', () => {
    const r = rankClasses(input([spec('s', 'c', { a: 0.3 })], [race('r', 'horde', { x: 0.2 })], []), evaluate([], {}));
    expect(classScore(r[0]!)).toBe(50);
    expect(
      rankRaces(input([spec('s', 'c', {})], [race('r', 'horde', { x: 0.2 })], []), evaluate([], {}), classId('c'))[0]!
        .score,
    ).toBe(50);
  });

  it('deal-breakers with min and max, for spec and race; equality is not a violation', () => {
    fc.assert(
      fc.property(
        unit,
        unit,
        fc.constantFrom('min' as const, 'max' as const),
        fc.constantFrom('spec' as const, 'race' as const),
        (value, threshold, op, scope) => {
          const traits = { a: value };
          const data = input(
            [spec('s', 'c', traits)],
            [race('r', 'horde', traits)],
            [question('d', [[deal(scope, 'a', op, threshold)]])],
          );
          const violated = op === 'min' ? value < threshold : value > threshold;
          const penalties =
            scope === 'spec'
              ? rankClasses(data, evaluate(data.questions, answersOf({ d: pick('o0') })))[0]!.specs[0]!.penalties
              : rankRaces(data, evaluate(data.questions, answersOf({ d: pick('o0') })), classId('c'))[0]!.penalties;
          expect(penalties.length > 0).toBe(violated);
        },
      ),
    );
    const atThreshold = input(
      [spec('s', 'c', { a: 0.5 })],
      [race('r', 'horde', {})],
      [question('d', [[deal('spec', 'a', 'max', 0.5)]])],
    );
    expect(
      rankClasses(atThreshold, evaluate(atThreshold.questions, answersOf({ d: pick('o0') })))[0]!.specs[0]!.penalties,
    ).toHaveLength(0);
  });

  it('spec and race preferences stay separate, even with the same trait name', () => {
    const data = input(
      [spec('s', 'c', { themeLight: 1 })],
      [race('r', 'horde', { themeLight: 0 })],
      [question('q', [[pref('race', 'themeLight', 0)]])],
    );
    expect(rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))[0]!.specs[0]!.match).toEqual({
      kind: 'unrated',
    });
    expect(rankRaces(data, evaluate(data.questions, answersOf({ q: pick('o0') })), classId('c'))[0]!.score).toBe(100);
  });

  it('explanation factors: at most 3 per direction, never the same option in both', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ v: unit, t: unit }), { minLength: 1, maxLength: 8 }),
        fc.constantFrom('any' as const, 'all' as const),
        (pairs, mode) => {
          const traits = Object.fromEntries(pairs.map((p, i) => [`t${i}`, p.v]));
          const qs = pairs.map((p, i) => question(`q${i}`, [[pref('spec', `t${i}`, p.t)]], { mode }));
          const answers: Answers = Object.fromEntries(qs.map((q) => [q.id, pick('o0')]));
          const s = rankClasses(
            input([spec('s', 'c', traits)], [race('r', 'horde', {})], qs),
            evaluate(qs, answers),
          )[0]!.specs[0]!;
          expect(topMatches(s.matches).length).toBeLessThanOrEqual(3);
          expect(topConflicts(s.conflicts).length).toBeLessThanOrEqual(3);
          for (const f of s.matches) expect(f.match).toBeGreaterThan(0.5);
          for (const f of s.conflicts) expect(f.match).toBeLessThan(0.5);
          const keys = new Set(s.matches.map((f) => `${f.questionId}/${f.optionId}`));
          for (const f of s.conflicts) expect(keys.has(`${f.questionId}/${f.optionId}`)).toBe(false);
          if (pairs.some((p) => p.v === p.t)) expect(s.matches.length).toBeGreaterThan(0);
        },
      ),
    );
  });
});

describe('Deal-breaker thresholds and scopes', () => {
  it('equality at the min threshold is not a violation', () => {
    const data = input(
      [spec('s', 'c', { a: 0.5 })],
      [race('r', 'horde', { a: 0.5 })],
      [question('d', [[deal('spec', 'a', 'min', 0.5)]])],
    );
    expect(
      rankClasses(data, evaluate(data.questions, answersOf({ d: pick('o0') })))[0]!.specs[0]!.penalties,
    ).toHaveLength(0);
  });

  it('scopes separated in both directions, also for deal-breakers', () => {
    const data = (effects: Effect[]) =>
      input([spec('s', 'c', { themeLight: 1 })], [race('r', 'horde', { themeLight: 0 })], [question('q', [effects])]);
    const specOnly = data([pref('spec', 'themeLight', 1)]);
    expect(
      rankRaces(specOnly, evaluate(specOnly.questions, answersOf({ q: pick('o0') })), classId('c'))[0]!.match,
    ).toEqual({ kind: 'unrated' });
    expect(classScore(rankClasses(specOnly, evaluate(specOnly.questions, answersOf({ q: pick('o0') })))[0]!)).toBe(100);

    const specMin = data([deal('spec', 'themeLight', 'min', 0.5)]);
    const raceMax = data([deal('race', 'themeLight', 'max', 0.5)]);
    const raceMin = data([deal('race', 'themeLight', 'min', 0.5)]);
    const picked = (d: ReturnType<typeof data>) => evaluate(d.questions, answersOf({ q: pick('o0') }));
    expect(rankClasses(specMin, picked(specMin))[0]!.specs[0]!.penalties).toHaveLength(0);
    expect(rankRaces(specMin, picked(specMin), classId('c'))[0]!.penalties).toHaveLength(0);
    expect(rankRaces(raceMax, picked(raceMax), classId('c'))[0]!.penalties).toHaveLength(0);
    expect(rankRaces(raceMin, picked(raceMin), classId('c'))[0]!.penalties).toHaveLength(1);
    expect(rankClasses(raceMin, picked(raceMin))[0]!.specs[0]!.penalties).toHaveLength(0);
  });
});

describe('Factors and weights within a question', () => {
  it('weights within an option take effect', () => {
    const data = input(
      [spec('s', 'c', { a: 1, b: 0 })],
      [race('r', 'horde', {})],
      [question('q', [[pref('spec', 'a', 1, 3), pref('spec', 'b', 1, 1)]])],
    );
    expect(classScore(rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))[0]!)).toBeCloseTo(
      75,
      9,
    );
  });

  it('a factor names the traits its match comes from: preferences of its scope the profile has a value for', () => {
    const data = input(
      [spec('s', 'c', { a: 1, b: 1 })],
      [race('r', 'horde', { x: 1 })],
      [question('q', [[pref('spec', 'a', 1), pref('race', 'x', 1), pref('spec', 'b', 1), pref('spec', 'z', 1)]])],
    );
    const s = rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))[0]!.specs[0]!;
    expect([...s.matches, ...s.conflicts].map((f) => f.traits)).toEqual([['a', 'b']]);
  });

  it('the match of a factor is the weighted closeness over exactly its traits', () => {
    fc.assert(
      fc.property(
        specProfile,
        fc.array(
          fc.record({ trait: fc.constantFrom(...SPEC_TRAITS), target: unit, weight: fc.integer({ min: 1, max: 3 }) }),
          {
            minLength: 1,
            maxLength: 4,
          },
        ),
        (traits, prefs) => {
          const data = input(
            [spec('s', 'c', traits)],
            [race('r', 'horde', {})],
            [question('q', [prefs.map((p) => pref('spec', p.trait, p.target, p.weight))])],
          );
          const s = rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))[0]!.specs[0]!;
          const factor = [...s.matches, ...s.conflicts][0];
          // A middling match is neither pro nor con and has no factor to inspect.
          if (!factor) return;
          expect([...factor.traits].sort()).toEqual([...new Set(prefs.map((p) => p.trait))].sort());
          const used = prefs.filter((p) => factor.traits.includes(p.trait));
          const weight = used.reduce((sum, p) => sum + p.weight, 0);
          const mean = used.reduce((sum, p) => sum + p.weight * (1 - Math.abs(traits[p.trait] - p.target)), 0) / weight;
          expect(factor.match).toBeCloseTo(mean, 9);
        },
      ),
    );
  });

  it('with "any" the factor names the option with the best match', () => {
    const data = input(
      [spec('s', 'c', { a: 0, b: 1 })],
      [race('r', 'horde', {})],
      [question('q', [[pref('spec', 'a', 1)], [pref('spec', 'b', 1)], [pref('spec', 'a', 0.5)]], { mode: 'any' })],
    );
    const s = rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0', 'o1') })))[0]!.specs[0]!;
    expect(s.matches.map((f) => f.optionId)).toEqual(['o1']);
    expect(s.conflicts).toHaveLength(0);
  });

  it('with "all" only options that concern the scope count', () => {
    const data = input(
      [spec('s', 'c', { a: 1 })],
      [race('r', 'horde', { x: 0 })],
      [question('q', [[pref('spec', 'a', 1)], [pref('race', 'x', 1)], []], { mode: 'all' })],
    );
    expect(classScore(rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0', 'o1', 'o2') })))[0]!)).toBe(
      100,
    );
  });

  it('explanations show the weightiest factors first, at most three', () => {
    const qs = [
      question('q1', [[pref('spec', 'a', 0)]], { tier: 'fine' }),
      question('q2', [[pref('spec', 'a', 0)]], { tier: 'pillar' }),
      question('q3', [[pref('spec', 'a', 0)]], { tier: 'dynamic' }),
      question('q4', [[pref('spec', 'a', 0)]], { tier: 'core' }),
      question('q5', [[pref('spec', 'a', 0)]], { tier: 'fine' }),
    ];
    const answers = Object.fromEntries(qs.map((q) => [q.id, pick('o0')]));
    const s = rankClasses(input([spec('s', 'c', { a: 1 })], [race('r', 'horde', {})], qs), evaluate(qs, answers))[0]!
      .specs[0]!;
    expect(topConflicts(s.conflicts).map((f) => f.questionId)).toEqual(['q2', 'q4', 'q3']);
  });

  it('penalties name question and option', () => {
    const data = input(
      [spec('s', 'c', { a: 0 })],
      [race('r', 'horde', {})],
      [question('d', [[], [deal('spec', 'a', 'min', 0.5)]], { mode: 'all' })],
    );
    const [p] = rankClasses(data, evaluate(data.questions, answersOf({ d: pick('o1') })))[0]!.specs[0]!.penalties;
    expect(p).toMatchObject({ questionId: 'd', optionId: 'o1', points: 25 });
  });
});

describe('Score floor and match order', () => {
  it('penalties stop the score at 0, not below', () => {
    const data = input(
      [spec('s', 'c', { a: 0 })],
      [race('r', 'horde', {})],
      [question('p', [[pref('spec', 'a', 1)]]), question('d', [[deal('spec', 'a', 'min', 0.5, 'heavy')]])],
    );
    expect(
      classScore(rankClasses(data, evaluate(data.questions, answersOf({ p: pick('o0'), d: pick('o0') })))[0]!),
    ).toBe(0);
  });

  it('matches are sorted by weight', () => {
    const qs = [
      question('fine', [[pref('spec', 'a', 1)]], { tier: 'fine' }),
      question('pillar', [[pref('spec', 'a', 1)]], { tier: 'pillar' }),
      question('dynamic', [[pref('spec', 'a', 1)]], { tier: 'dynamic' }),
    ];
    const answers = Object.fromEntries(qs.map((q) => [q.id, pick('o0')]));
    const s = rankClasses(input([spec('s', 'c', { a: 1 })], [race('r', 'horde', {})], qs), evaluate(qs, answers))[0]!
      .specs[0]!;
    expect(s.matches.map((f) => f.questionId)).toEqual(['pillar', 'dynamic', 'fine']);
  });
});

describe('Factor thresholds, missing traits and shared weights', () => {
  const factor = (id: string, match: number, weight = 1): Factor => ({
    questionId: questionId(id),
    optionId: optionId('o0'),
    scope: 'spec',
    traits: [],
    match,
    weight,
  });

  it('a match counts from 0.7, a conflict up to and including 0.4', () => {
    expect(topMatches([factor('a', 0.7), factor('b', 0.69)]).map((f) => f.questionId)).toEqual(['a']);
    expect(topConflicts([factor('a', 0.4), factor('b', 0.41)]).map((f) => f.questionId)).toEqual(['a']);
  });

  it('topMatches and topConflicts return at most three', () => {
    const many = ['a', 'b', 'c', 'd', 'e'];
    expect(topMatches(many.map((q) => factor(q, 1)))).toHaveLength(3);
    expect(topConflicts(many.map((q) => factor(q, 0)))).toHaveLength(3);
  });

  it('a deal-breaker on a trait the spec does not have deducts nothing', () => {
    const data = input(
      [spec('s', 'c', { a: 0.5 })],
      [race('r', 'horde', {})],
      [question('d', [[deal('spec', 'missing', 'min', 0.9)]])],
    );
    expect(rankClasses(data, evaluate(data.questions, answersOf({ d: pick('o0') })))[0]!.specs[0]!.penalties).toEqual(
      [],
    );
  });

  it('a preference on a trait the spec does not have is left out of the match', () => {
    const data = input(
      [spec('s', 'c', { a: 1 })],
      [race('r', 'horde', {})],
      [
        question('q', [[pref('spec', 'a', 1), pref('spec', 'missing', 0)]]),
        question('m', [[pref('spec', 'missing', 1)]]),
      ],
    );
    expect(rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))[0]!.specs[0]!.match).toEqual({
      kind: 'rated',
      percent: 100,
    });
    expect(rankClasses(data, evaluate(data.questions, answersOf({ m: pick('o0') })))[0]!.specs[0]!.match).toEqual({
      kind: 'unrated',
    });
  });

  it('with "any" and an equal match the factor names the first option', () => {
    const data = input(
      [spec('s', 'c', { a: 1, b: 1 })],
      [race('r', 'horde', {})],
      [question('q', [[pref('spec', 'a', 1)], [pref('spec', 'b', 1)], [pref('spec', 'c', 1)]])],
    );
    // Three options: whoever picks all of them is fine with anything, and the question does not count.
    const factors = rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0', 'o1') })))[0]!.specs[0]!
      .matches;
    expect(factors.map((f) => f.optionId)).toEqual(['o0']);
  });

  it('with "all" the options share the weight of the question', () => {
    const options = [[pref('spec', 'a', 1)], [pref('spec', 'b', 1)], [pref('spec', 'c', 1)]];
    const traits = { a: 1, b: 1 };
    const anyQs = [question('q', options)];
    const allQs = [question('q', options, { mode: 'all' })];
    const any = rankClasses(
      input([spec('s', 'c', traits)], [race('r', 'horde', {})], anyQs),
      evaluate(anyQs, answersOf({ q: pick('o0') })),
    )[0]!.specs[0]!.matches;
    const all = rankClasses(
      input([spec('s', 'c', traits)], [race('r', 'horde', {})], allQs),
      evaluate(allQs, answersOf({ q: pick('o0', 'o1') })),
    )[0]!.specs[0]!.matches;
    expect(all).toHaveLength(2);
    for (const f of all) expect(f.weight).toBeCloseTo(any[0]!.weight / 2, 10);
  });
});

describe('Complete pro and con lists', () => {
  it('the short list is the first three of the complete list; thresholds and sorting apply to both (property)', () => {
    fc.assert(
      fc.property(answersArb, (answers) => {
        for (const c of recommend(answers).ranking) {
          for (const s of c.specs) {
            expect(topMatches(s.matches)).toEqual(s.matches.slice(0, 3));
            expect(topConflicts(s.conflicts)).toEqual(s.conflicts.slice(0, 3));
            expect(s.matches.every((f) => f.match >= 0.7)).toBe(true);
            expect(s.conflicts.every((f) => f.match <= 0.4)).toBe(true);
            expect(descending(s.matches, pro)).toBe(true);
            expect(descending(s.conflicts, contra)).toBe(true);
          }
        }
      }),
      { numRuns: 60 },
    );
  });
});

describe('Scores fail fast', () => {
  it('a score that is not a number is a bug, not 0 or 100', () => {
    expect(() => clampScore(Number.NaN)).toThrow(new RangeError('Score is NaN'));
    expect(clampScore(-5)).toBe(0);
    expect(clampScore(105)).toBe(100);
  });

  it('a match outside [0, 100], here from a negative option weight, is reported instead of cut off', () => {
    const q = question('q', [[pref('spec', 'a', 1, 2), pref('spec', 'b', 0, -1)]]);
    const data = input([spec('s', 'c', { a: 1, b: 1 })], [race('r', 'horde', {})], [q]);
    expect(() => rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0') })))).toThrow(
      'Match 200 is outside [0, 100]',
    );
    const below = input([spec('s', 'c', { a: 0, b: 0 })], [race('r', 'horde', {})], [q]);
    expect(() => rankClasses(below, evaluate(below.questions, answersOf({ q: pick('o0') })))).toThrow(
      'Match -100 is outside [0, 100]',
    );
  });
});
