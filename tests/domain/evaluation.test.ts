import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { evaluate, hasPreferenceFor, uncountedReason } from '../../src/domain/evaluation';
import { classScore, rankClasses, classCriteriaCount } from '../../src/domain/class-scoring';
import { rankRaces } from '../../src/domain/race-scoring';
import type { Effect, Question } from '../../src/domain/questions';
import type { Answers } from '../../src/domain/answers';
import {
  answersOf,
  input,
  pick,
  pref,
  question,
  race,
  spec,
  pickHigh,
  type TestInput,
  DONT_CARE,
  gateQuestion,
} from '../support/fixtures';
import { classId } from '../../src/domain/ids';
import { scenarioArb, specProfile, unit } from '../support/arbitraries';

/* Evaluating the answers once: what counts, gates, weights by tier and importance, factions. */

describe('Weights and counting', () => {
  it('options without effects and unanswered questions change nothing', () => {
    fc.assert(
      fc.property(scenarioArb, ({ data, answers }) => {
        const extended: TestInput = {
          ...data,
          questions: [...data.questions, question('empty', [[], []]), question('unasked', [[pref('spec', 'a', 1)]])],
        };
        expect(
          rankClasses(extended, evaluate(extended.questions, answersOf({ ...answers, empty: pick('o0', 'o1') }))),
        ).toEqual(rankClasses(data, evaluate(data.questions, answers)));
      }),
    );
  });

  it('importance "high" counts a question twice, whatever its tier', () => {
    fc.assert(
      fc.property(
        specProfile,
        unit,
        unit,
        fc.constantFrom('pillar' as const, 'core' as const, 'dynamic' as const, 'fine' as const),
        (traits, t1, t2, tier) => {
          // Metamorphic: a question asked once with "high" weighs like the same question asked twice.
          const q = question('q', [[pref('spec', 'a', t1)]], { tier });
          const twin = question('twin', [[pref('spec', 'a', t1)]], { tier });
          const other = question('o', [[pref('spec', 'b', t2)]], { tier });
          const once = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [q, other]);
          const twice = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [q, twin, other]);
          const high = classScore(
            rankClasses(once, evaluate(once.questions, answersOf({ q: pickHigh('o0'), o: pick('o0') })))[0]!,
          );
          const doubled = classScore(
            rankClasses(
              twice,
              evaluate(twice.questions, answersOf({ q: pick('o0'), twin: pick('o0'), o: pick('o0') })),
            )[0]!,
          );
          expect(high).toBeCloseTo(doubled, 9);
        },
      ),
    );
  });

  it('tier weights pillar 40, core 20, dynamic 8, fine-tuning 3', () => {
    const tiers = [
      ['pillar', 40],
      ['core', 20],
      ['dynamic', 8],
      ['fine', 3],
    ] as const;
    for (const [t1, w1] of tiers) {
      for (const [t2, w2] of tiers) {
        const data = input(
          [spec('s', 'c', { a: 1, b: 0 })],
          [race('r', 'horde', {})],
          [
            question('p', [[pref('spec', 'a', 1)]], { tier: t1 }),
            question('q', [[pref('spec', 'b', 1)]], { tier: t2 }),
          ],
        );
        expect(
          classScore(rankClasses(data, evaluate(data.questions, answersOf({ p: pick('o0'), q: pick('o0') })))[0]!),
        ).toBeCloseTo((100 * w1) / (w1 + w2), 9);
      }
    }
  });
});

describe('Unknown answers', () => {
  it('ignores unknown questions and options', () => {
    const data = input([spec('s', 'c', { a: 1 })], [race('r', 'horde', {})], [question('q', [[pref('spec', 'a', 1)]])]);
    expect(rankClasses(data, evaluate(data.questions, answersOf({ nope: pick('o0'), q: pick('zzz') })))).toEqual(
      rankClasses(data, evaluate(data.questions, {})),
    );
  });
});

describe('Preferences per scope', () => {
  it('hasPreferenceFor detects preferences per scope', () => {
    const qs = [question('l', [[pref('legacy', 'gold', 1)], [pref('spec', 'a', 1)]])];
    expect(hasPreferenceFor(evaluate(qs, {}), 'legacy')).toBe(false);
    expect(hasPreferenceFor(evaluate(qs, answersOf({ l: pick('o1') })), 'legacy')).toBe(false);
    expect(hasPreferenceFor(evaluate(qs, answersOf({ l: pick('o0') })), 'legacy')).toBe(true);
  });
});

describe('Answers without a counted option', () => {
  it('a gate answered with "Don\'t care" or another option neither switches off nor boosts its chapter', () => {
    const gate = gateQuestion('g', 3, { mute: ['o0'], boost: ['o1'] }, 'foundation');
    for (const answers of [{}, answersOf({ g: DONT_CARE }), answersOf({ g: pick('o2') })] as Answers[]) {
      expect(evaluate([gate], answers).muted.size).toBe(0);
      expect(evaluate([gate], answers).boosted.size).toBe(0);
    }
    expect(evaluate([gate], answersOf({ g: pick('o0') })).muted).toEqual(new Set(['foundation']));
    expect(evaluate([gate], answersOf({ g: pick('o1') })).boosted).toEqual(new Set(['foundation']));
  });

  it('one muting or boosting option among several is enough, and muting wins over boosting', () => {
    const gate = gateQuestion('g', 3, { mute: ['o0'], boost: ['o1'] }, 'foundation');
    expect(evaluate([gate], answersOf({ g: pick('o2', 'o1') })).boosted).toEqual(new Set(['foundation']));
    const both = evaluate([gate], answersOf({ g: pick('o1', 'o0') }));
    expect(both.muted).toEqual(new Set(['foundation']));
    expect(both.boosted.size).toBe(0);
  });

  it('an answer with only unknown options or "Don\'t care" is not an answered question', () => {
    const q = question('q', [[pref('spec', 't', 1)], [pref('spec', 't', 0)]]);
    expect(evaluate([q], answersOf({ q: pick('unknown') })).counted).toEqual([]);
    expect(evaluate([q], answersOf({ q: DONT_CARE })).counted).toEqual([]);
    expect(evaluate([q], answersOf({ q: pick('o0') })).counted).toHaveLength(1);
  });
});

describe('All options picked and unrated options', () => {
  it('fixed examples: all picked takes precedence over not rated, a single choice is never all picked, AND questions always count', () => {
    const any = question('q', [[pref('spec', 'a', 1)], []], { mode: 'any' });
    expect(uncountedReason(any, any.options)).toBe('allChosen');
    expect(uncountedReason(any, [any.options[1]!])).toBe('unrated');
    expect(uncountedReason(any, [any.options[0]!])).toBeUndefined();
    const single = question('q', [[pref('spec', 'a', 1)], [pref('spec', 'a', 0)]], { mode: 'any', multi: false });
    expect(uncountedReason(single, single.options)).toBeUndefined();
    const all = question('q', [[pref('spec', 'a', 1)], []], { mode: 'all' });
    expect(uncountedReason(all, all.options)).toBeUndefined();
  });

  it('a question counts exactly when uncountedReason gives no reason (all picked before not rated)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 5 }),
        fc.constantFrom('any' as const, 'all' as const),
        fc.boolean(),
        fc.array(fc.boolean(), { minLength: 5, maxLength: 5 }),
        (unrated, mode, multi, chosenMask) => {
          const q = question(
            'q',
            unrated.map((n) => (n ? [] : [pref('spec', 'a', 0.5)])),
            { mode, multi },
          );
          const chosen = q.options.filter((_, i) => chosenMask[i]);
          if (chosen.length === 0) return;
          const reason = uncountedReason(q, chosen);
          const counted = evaluate([q], answersOf({ q: pick(...chosen.map((o) => o.id)) })).counted.length === 1;
          expect(counted).toBe(reason === undefined);
          const all = multi && q.options.length > 1 && chosen.length === q.options.length;
          const anyUnrated = chosen.some((o) => o.effects.length === 0);
          expect(reason).toBe(mode !== 'any' ? undefined : all ? 'allChosen' : anyUnrated ? 'unrated' : undefined);
        },
      ),
    );
  });

  it('an OR question with all options picked acts as unanswered', () => {
    fc.assert(
      fc.property(
        fc.record({ a: unit, b: unit }),
        fc.array(fc.tuple(fc.constantFrom('a', 'b'), unit), { minLength: 2, maxLength: 4 }),
        unit,
        (traits, opts, t) => {
          const q = question(
            'q',
            opts.map(([tr, v]) => [pref('spec', tr, v)]),
            { mode: 'any' },
          );
          const other = question('o', [[pref('spec', 'a', t)]]);
          const data = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [q, other]);
          const all = rankClasses(
            data,
            evaluate(data.questions, answersOf({ q: pick(...q.options.map((o) => o.id)), o: pick('o0') })),
          );
          const none = rankClasses(data, evaluate(data.questions, answersOf({ o: pick('o0') })));
          expect(classScore(all[0]!)).toBeCloseTo(classScore(none[0]!), 9);
        },
      ),
    );
  });

  it('an OR selection with an unrated option acts as unanswered', () => {
    fc.assert(
      fc.property(fc.record({ a: unit, b: unit }), unit, unit, unit, (traits, t1, t2, t3) => {
        const q = question('q', [[pref('spec', 'a', t1)], [pref('spec', 'b', t2)], []], { mode: 'any' });
        const other = question('o', [[pref('spec', 'a', t3)]]);
        const data = input([spec('s', 'c', traits)], [race('r', 'horde', {})], [q, other]);
        const withNeutral = classScore(
          rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0', 'o2'), o: pick('o0') })))[0]!,
        );
        const unanswered = classScore(rankClasses(data, evaluate(data.questions, answersOf({ o: pick('o0') })))[0]!);
        expect(withNeutral).toBeCloseTo(unanswered, 9);
      }),
    );
  });

  it('with AND questions all picked options still count', () => {
    const q = question('q', [[pref('spec', 'a', 1)], [pref('spec', 'b', 1)]], { mode: 'all' });
    const data = input([spec('s', 'c', { a: 1, b: 0 })], [race('r', 'horde', {})], [q]);
    expect(classScore(rankClasses(data, evaluate(data.questions, answersOf({ q: pick('o0', 'o1') })))[0]!)).toBeCloseTo(
      50,
      9,
    );
  });
});

describe('Gates', () => {
  const gate = (chapter: Question['chapter']): Question =>
    gateQuestion('gate', 3, { mute: ['o2'], boost: ['o0'] }, chapter);
  const inChapter = (id: string, chapter: Question['chapter'], effects: Effect[]): Question => ({
    ...question(id, [effects]),
    chapter: chapter,
  });

  it('"not at all" mutes the chapter\'s other questions, "very" doubles their weight', () => {
    fc.assert(
      fc.property(unit, unit, unit, (sv, t1, t2) => {
        const qs = [
          gate('pvp'),
          inChapter('p', 'pvp', [pref('spec', 'a', t1)]),
          inChapter('b', 'foundation', [pref('spec', 'a', t2)]),
        ];
        const data = input([spec('s', 'c', { a: sv })], [race('r', 'horde', {})], qs);
        const base = answersOf({ p: pick('o0'), b: pick('o0') });
        const off = classScore(
          rankClasses(data, evaluate(data.questions, answersOf({ ...base, gate: pick('o2') })))[0]!,
        );
        const onlyBasics = classScore(rankClasses(data, evaluate(data.questions, answersOf({ b: pick('o0') })))[0]!);
        expect(off).toBeCloseTo(onlyBasics, 9);
        const boosted = classScore(
          rankClasses(data, evaluate(data.questions, answersOf({ ...base, gate: pick('o0') })))[0]!,
        );
        const viaImportance = classScore(
          rankClasses(data, evaluate(data.questions, answersOf({ b: pick('o0'), p: pickHigh('o0') })))[0]!,
        );
        expect(boosted).toBeCloseTo(viaImportance, 9);
        const normal = classScore(
          rankClasses(data, evaluate(data.questions, answersOf({ ...base, gate: pick('o1') })))[0]!,
        );
        expect(normal).toBeCloseTo(classScore(rankClasses(data, evaluate(data.questions, base))[0]!), 9);
      }),
    );
  });

  it('gate "very" and "Important" multiply (×4)', () => {
    const qs = [
      gate('pvp'),
      inChapter('p', 'pvp', [pref('spec', 'a', 1)]),
      inChapter('b', 'foundation', [pref('spec', 'a', 0)]),
    ];
    const data = input([spec('s', 'c', { a: 1 })], [race('r', 'horde', {})], qs);
    const both = classScore(
      rankClasses(
        data,
        evaluate(data.questions, answersOf({ gate: pick('o0'), p: pickHigh('o0'), b: pick('o0') })),
      )[0]!,
    );
    // p counts 20 × 2 × 2 = 80, b counts 20: (80·1 + 20·0) / 100
    expect(both).toBeCloseTo(80, 9);
  });

  it('gates also affect race questions of their chapter', () => {
    const qs = [gate('race'), inChapter('v', 'race', [pref('race', 'x', 1)])];
    const data = input([spec('s', 'c', {})], [race('r', 'horde', { x: 0 })], qs);
    expect(
      rankRaces(data, evaluate(data.questions, answersOf({ v: pick('o0'), gate: pick('o2') })), classId('c'))[0]!.match,
    ).toEqual({ kind: 'unrated' });
  });
});

describe('Questions that apply only for certain answers elsewhere', () => {
  // `role` has the options o0 and o1; `style` only applies to players who pick o0 there.
  const role = question('role', [[pref('spec', 'a', 1)], [pref('spec', 'a', 0)]]);
  const style = {
    ...question('style', [[pref('spec', 'b', 1)]]),
    appliesIf: { question: role.id, options: [role.options[0]!.id] },
  };
  const qs: Question[] = [role, style];
  const counts = (answers: Answers) => evaluate(qs, answers).counted.some((c) => c.question.id === style.id);

  it('counts the question unless the required question is answered without a required option', () => {
    const cases: [string, Answers, boolean][] = [
      ['required question unanswered', answersOf({ style: pick('o0') }), true],
      ['required question "Don\'t care"', answersOf({ role: DONT_CARE, style: pick('o0') }), true],
      ['required option picked', answersOf({ role: pick('o0'), style: pick('o0') }), true],
      ['required option among others', answersOf({ role: pick('o0', 'o1'), style: pick('o0') }), true],
      ['required option not picked first', answersOf({ role: pick('o1', 'o0'), style: pick('o0') }), true],
      ['only unknown options picked', answersOf({ role: pick('o9'), style: pick('o0') }), true],
      ['only another option picked', answersOf({ role: pick('o1'), style: pick('o0') }), false],
      ['another option picked as important', answersOf({ role: pickHigh('o1'), style: pick('o0') }), false],
    ];
    for (const [name, answers, expected] of cases) {
      expect(counts(answers), name).toBe(expected);
      expect(evaluate(qs, answers).ruledOut.has(style.id), name).toBe(!expected);
    }
  });
});

describe("Don't care", () => {
  it('"Don\'t care" changes no result and does not count as a class criterion', () => {
    fc.assert(
      fc.property(scenarioArb, ({ data }) => {
        const answers: Answers = Object.fromEntries(data.questions.map((q) => [q.id, DONT_CARE]));
        expect(rankClasses(data, evaluate(data.questions, answers))).toEqual(
          rankClasses(data, evaluate(data.questions, {})),
        );
        expect(classCriteriaCount(evaluate(data.questions, answers))).toBe(0);
      }),
    );
  });
});
