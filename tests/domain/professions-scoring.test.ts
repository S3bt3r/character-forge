import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  rankProfessionPairs,
  CLASS_SYNERGY_BONUS,
  PARTNER_BONUS,
  RACE_SYNERGY_BONUS,
  rankSecondaryProfessions,
} from '../../src/domain/professions-scoring';
import type { ProfessionContext } from '../../src/domain/professions-scoring';
import { PROFESSION_TRAITS } from '../../src/data/professions';
import { traitProfile, type ProfessionProfile } from '../../src/domain/catalog';
import type { Question } from '../../src/domain/questions';
import type { Answers } from '../../src/domain/answers';
import { answersOf, pick, pref, question, pickHigh } from '../support/fixtures';
import { evaluate } from '../../src/domain/evaluation';
import { classId, professionId, raceId } from '../../src/domain/ids';

const TRAIT_IDS = Object.keys(PROFESSION_TRAITS);

const unit = fc.double({ min: 0, max: 1, noNaN: true });

const scenarioArb = fc
  .record({
    prefs: fc.array(
      fc.record({
        trait: fc.constantFrom(...TRAIT_IDS),
        target: unit,
        weight: fc.double({ min: 0.1, max: 5, noNaN: true }),
      }),
      { maxLength: 6 },
    ),
    classId: fc.option(fc.constantFrom('druid', 'warrior', 'mage', 'rogue').map(classId), { nil: undefined }),
    raceId: fc.option(fc.constantFrom('tauren', 'gnome').map(raceId), { nil: undefined }),
  })
  .map(({ prefs, classId, raceId }) => {
    // One option with the preference and one unrated option per question, as in the questionnaire.
    const questions: Question[] = prefs.map((p, i) =>
      question(`pq${i}`, [[pref('profession', p.trait, p.target, p.weight)], []]),
    );
    const answers: Answers = Object.fromEntries(questions.map((q) => [q.id, pick('o0')]));
    return { questions, answers, context: { classId, raceId } };
  });

/** Every profession trait at 0.5, so only the overridden traits and synergies make a difference. */
const MID_TRAITS = Object.fromEntries(Object.keys(PROFESSION_TRAITS).map((k) => [k, 0.5]));

/** A synthetic profession; its traits are written as plain numbers like in the data. */
const prof = (
  id: string,
  {
    traits = MID_TRAITS,
    ...extra
  }: Omit<Partial<ProfessionProfile>, 'traits'> & { traits?: Record<string, number> } = {},
): ProfessionProfile => ({
  id: professionId(id),
  kind: 'crafting',
  traits: traitProfile(traits),
  ...extra,
});

const TRAIT_VALUES = (seed: number) =>
  Object.fromEntries(Object.keys(PROFESSION_TRAITS).map((k, i) => [k, ((seed + i) % 5) / 4]));
/** A small synthetic catalog: primary and secondary professions with varied traits, synergies and a partner. */
const CATALOG: ProfessionProfile[] = [
  prof('herb', {
    traits: TRAIT_VALUES(0),
    classSynergy: ['druid'].map(classId),
    raceSynergy: ['tauren'].map(raceId),
    partners: ['alch'].map(professionId),
  }),
  prof('alch', { traits: TRAIT_VALUES(1) }),
  prof('mine', { traits: TRAIT_VALUES(2), partners: ['smith'].map(professionId) }),
  prof('smith', { traits: TRAIT_VALUES(3), classSynergy: ['warrior'].map(classId) }),
  prof('tailor', { traits: TRAIT_VALUES(4), classSynergy: ['mage'].map(classId) }),
  prof('cook', { kind: 'secondary', traits: TRAIT_VALUES(1) }),
  prof('aid', { kind: 'secondary', traits: TRAIT_VALUES(2), classSynergy: ['warrior'].map(classId) }),
];

describe('rankProfessionPairs', () => {
  it('pair scores lie in [0, 100]', () => {
    fc.assert(
      fc.property(scenarioArb, ({ questions, answers, context }) => {
        for (const pair of rankProfessionPairs(CATALOG, evaluate(questions, answers), context)) {
          expect(pair.score).toBeGreaterThanOrEqual(0);
          expect(pair.score).toBeLessThanOrEqual(100);
        }
      }),
    );
  });

  it('only pairs of two different primary professions', () => {
    fc.assert(
      fc.property(scenarioArb, ({ questions, answers, context }) => {
        const primary = new Set(CATALOG.filter((p) => p.kind !== 'secondary').map((p) => p.id));
        const pairs = rankProfessionPairs(CATALOG, evaluate(questions, answers), context);
        expect(pairs.length).toBeGreaterThan(0);
        for (const pair of pairs) {
          expect(pair.professionIds).toHaveLength(2);
          expect(pair.professionIds[0]).not.toBe(pair.professionIds[1]);
          for (const id of pair.professionIds) expect(primary.has(id), id).toBe(true);
        }
        const keys = pairs.map((p) => [...p.professionIds].sort().join('+'));
        expect(new Set(keys).size).toBe(keys.length);
      }),
    );
  });

  it('class/race synergy never lowers a pair score', () => {
    fc.assert(
      fc.property(scenarioArb, ({ questions, answers, context }) => {
        const key = (ids: readonly string[]) => [...ids].sort().join('+');
        const without = new Map(
          rankProfessionPairs(CATALOG, evaluate(questions, answers), {}).map((p) => [key(p.professionIds), p.score]),
        );
        for (const pair of rankProfessionPairs(CATALOG, evaluate(questions, answers), context)) {
          expect(pair.score).toBeGreaterThanOrEqual(without.get(key(pair.professionIds))! - 1e-9);
        }
      }),
    );
  });

  it('a matching class synergy is shown on every pair with that profession', () => {
    const pairs = rankProfessionPairs(CATALOG, evaluate([], {}), { classId: classId('mage') });
    for (const pair of pairs.filter((p) => p.professionIds.includes(professionId('tailor')))) {
      expect(pair.synergies).toContainEqual({ kind: 'class', professionId: 'tailor' });
    }
  });
});

describe('Profession pairs', () => {
  it('class, race and partner synergy raise the pair score below the cap', () => {
    const profs = [
      prof('a', {
        classSynergy: ['k'].map(classId),
        raceSynergy: ['v'].map(raceId),
        partners: ['b'].map(professionId),
      }),
      prof('b'),
      prof('c'),
    ];
    const score = (ctx: ProfessionContext, ids: string) =>
      rankProfessionPairs(profs, evaluate([], {}), ctx).find((p) => p.professionIds.join('+') === ids)!.score;
    expect(score({}, 'a+c')).toBe(50);
    expect(score({ classId: classId('k') }, 'a+c')).toBeGreaterThan(score({}, 'a+c'));
    expect(score({ raceId: raceId('v') }, 'a+c')).toBeGreaterThan(score({}, 'a+c'));
    expect(score({}, 'a+b')).toBeGreaterThan(score({}, 'a+c'));
  });

  it('pairs are sorted descending, secondary professions are rated separately', () => {
    const pairs = rankProfessionPairs(CATALOG, evaluate([], {}), { classId: classId('mage') });
    const scores = pairs.map((p) => p.score);
    expect(scores).toEqual([...scores].sort((x, y) => y - x));
    const secondary = rankSecondaryProfessions(CATALOG, evaluate([], {}), { classId: classId('warrior') });
    const ids = new Set(CATALOG.filter((p) => p.kind === 'secondary').map((p) => p.id));
    expect(secondary.map((s) => s.professionId).sort()).toEqual([...ids].sort());
    for (const s of secondary) {
      expect(s.score).toBeGreaterThanOrEqual(0);
      expect(s.score).toBeLessThanOrEqual(100);
    }
  });

  it('importance also affects profession questions', () => {
    const profs = [
      prof('a', { traits: { ...MID_TRAITS, timeCost: 0 } }),
      prof('b', { traits: { ...MID_TRAITS, timeCost: 1 } }),
      prof('c'),
    ];
    const qs: Question[] = [
      question('q', [[pref('profession', 'timeCost', 0)]]),
      question('r', [[pref('profession', 'goldIncome', 0)]]),
    ];
    const s = (high: boolean) =>
      rankProfessionPairs(
        profs,
        evaluate(qs, answersOf({ q: high ? pickHigh('o0') : pick('o0'), r: pick('o0') })),
        {},
      ).find((p) => p.professionIds.join('+') === 'a+c')!.score;
    expect(s(true)).not.toBeCloseTo(s(false), 6);
  });
});

describe('Pair scores, synergies and secondary professions', () => {
  const findPair = (
    profs: ProfessionProfile[],
    ctx: ProfessionContext,
    ids: string,
    qs = [] as ReturnType<typeof question>[],
    answers = {},
  ) => rankProfessionPairs(profs, evaluate(qs, answers), ctx).find((p) => p.professionIds.join('+') === ids)!;

  it('race synergy only for professions with a matching raceSynergy', () => {
    const profs = [prof('a'), prof('b'), prof('c', { raceSynergy: ['v'].map(raceId) })];
    expect(findPair(profs, { raceId: raceId('v') }, 'a+b').synergies).toHaveLength(0);
    expect(findPair(profs, { raceId: raceId('v') }, 'a+c').synergies).toEqual([{ kind: 'race', professionId: 'c' }]);
  });

  it('synergies of both professions in a pair count', () => {
    const profs = [
      prof('a', { classSynergy: ['k'].map(classId) }),
      prof('b', { classSynergy: ['k'].map(classId) }),
      prof('c'),
    ];
    expect(findPair(profs, { classId: classId('k') }, 'a+b').score).toBeGreaterThan(
      findPair(profs, { classId: classId('k') }, 'a+c').score,
    );
  });

  it('the pair base is the mean of both professions', () => {
    const profs = [
      prof('a', { traits: { ...MID_TRAITS, timeCost: 0 } }),
      prof('b', { traits: { ...MID_TRAITS, timeCost: 1 } }),
    ];
    const q = question('t', [[pref('profession', 'timeCost', 0)]]);
    expect(findPair(profs, {}, 'a+b', [q], answersOf({ t: pick('o0') })).score).toBeCloseTo(50, 9);
  });

  it('pairs explain their factors', () => {
    const profs = [
      prof('a', { traits: { ...MID_TRAITS, timeCost: 0 } }),
      prof('b', { traits: { ...MID_TRAITS, timeCost: 1 } }),
    ];
    const q = question('t', [[pref('profession', 'timeCost', 0)]]);
    const p = findPair(profs, {}, 'a+b', [q], answersOf({ t: pick('o0') }));
    expect(p.matches.length).toBeGreaterThan(0);
    expect(p.conflicts.length).toBeGreaterThan(0);
  });

  it('secondary professions: neutral 50, sorted descending', () => {
    const sec = (id: string, extra: Parameters<typeof prof>[1] = {}) => prof(id, { kind: 'secondary', ...extra });
    expect(rankSecondaryProfessions([sec('a')], evaluate([], {}), {})[0]!.score).toBe(50);
    const q = question('t', [[pref('profession', 'timeCost', 0)]]);
    const ranked = rankSecondaryProfessions(
      [
        sec('slow', { traits: { ...MID_TRAITS, timeCost: 1 } }),
        sec('fast', {
          traits: { ...MID_TRAITS, timeCost: 0 },
          classSynergy: ['k'].map(classId),
          raceSynergy: ['v'].map(raceId),
        }),
      ],
      evaluate([q], answersOf({ t: pick('o0') })),
      { classId: classId('k'), raceId: raceId('v') },
    );
    expect(ranked.map((r) => r.professionId)).toEqual(['fast', 'slow']);
  });

  it('partner synergy also counts when only the second profession names the first; class synergy raises a secondary profession', () => {
    const pairs = rankProfessionPairs(
      [prof('a'), prof('b', { partners: ['a'].map(professionId) }), prof('c')],
      evaluate([], {}),
      {},
    );
    const score = (k: string) => pairs.find((x) => x.professionIds.join('+') === k)!.score;
    expect(score('a+b')).toBeGreaterThan(score('a+c'));

    const withSyn = rankSecondaryProfessions(CATALOG, evaluate([], {}), { classId: classId('warrior') }).find(
      (x) => x.professionId === 'aid',
    )!;
    const without = rankSecondaryProfessions(CATALOG, evaluate([], {}), {}).find((x) => x.professionId === 'aid')!;
    expect(withSyn.score).toBeGreaterThan(without.score);
    expect(withSyn.synergies.map((x) => x.kind)).toContain('class');
  });

  it('a pair names every question option at most once per side, even if both professions rate it', () => {
    // Two questions that both professions of every pair rate.
    const questions = [
      question('time', [[pref('profession', 'timeCost', 0)]]),
      question('gold', [[pref('profession', 'goldIncome', 1)]]),
    ];
    const pairs = rankProfessionPairs(
      CATALOG,
      evaluate(questions, answersOf({ time: pick('o0'), gold: pick('o0') })),
      {},
    );
    // Several different options per side must survive the deduplication.
    expect(pairs.some((p) => p.matches.length > 1 || p.conflicts.length > 1)).toBe(true);
    for (const p of pairs) {
      for (const list of [p.matches, p.conflicts]) {
        const keys = list.map((f) => `${f.questionId}/${f.optionId}`);
        expect(new Set(keys).size, p.professionIds.join('+')).toBe(keys.length);
      }
    }
  });
});

describe('Synergy bonuses and alphabetical order', () => {
  it('each synergy type gives exactly its own bonus, several add up', () => {
    const profs = [
      prof('a', {
        classSynergy: ['k'].map(classId),
        raceSynergy: ['v'].map(raceId),
        partners: ['b'].map(professionId),
      }),
      prof('b'),
      prof('c'),
    ];
    const score = (ctx: ProfessionContext, ids: string) =>
      rankProfessionPairs(profs, evaluate([], {}), ctx).find((p) => p.professionIds.join('+') === ids)!.score;
    expect(new Set([PARTNER_BONUS, CLASS_SYNERGY_BONUS, RACE_SYNERGY_BONUS]).size).toBe(3);
    expect(score({}, 'a+b')).toBe(50 + PARTNER_BONUS);
    expect(score({ classId: classId('k') }, 'a+c')).toBe(50 + CLASS_SYNERGY_BONUS);
    expect(score({ raceId: raceId('v') }, 'a+c')).toBe(50 + RACE_SYNERGY_BONUS);
    expect(score({ classId: classId('k'), raceId: raceId('v') }, 'a+b')).toBe(
      50 + PARTNER_BONUS + CLASS_SYNERGY_BONUS + RACE_SYNERGY_BONUS,
    );
  });
});

describe('Capped scores', () => {
  // Every trait at 1 against a question that wants 1: a perfect match of 100 before any bonus.
  const TOP = Object.fromEntries(TRAIT_IDS.map((t) => [t, 1]));
  const q = question('p', [[pref('profession', TRAIT_IDS[0]!, 1)]]);
  const perfect = evaluate([q], answersOf({ p: pick('o0') }));

  it('pairs that both reach the cap keep the order of their uncapped totals, not of their IDs', () => {
    const profs = [
      prof('a', { traits: TOP }),
      prof('b', { traits: TOP }),
      prof('y', { traits: TOP, partners: ['z'].map(professionId) }),
      prof('z', { traits: TOP }),
    ];
    const pairs = rankProfessionPairs(profs, perfect, {});
    expect(pairs[0]!.professionIds.join('+')).toBe('y+z');
    expect(pairs[0]!.score).toBe(100);
    expect(pairs[1]!.score).toBe(100);
  });

  it('secondary professions that both reach the cap keep the order of their uncapped totals', () => {
    const secondary = [
      prof('alpha', { kind: 'secondary', traits: TOP }),
      prof('zeta', { kind: 'secondary', traits: TOP, classSynergy: ['warrior'].map(classId) }),
    ];
    const ranked = rankSecondaryProfessions(secondary, perfect, { classId: classId('warrior') });
    expect(ranked.map((p) => p.professionId)).toEqual(['zeta', 'alpha']);
    expect(ranked.map((p) => p.score)).toEqual([100, 100]);
  });
});

describe('Ties', () => {
  const none = evaluate([], {});
  const shuffledOf = <T>(items: T[]) => fc.shuffledSubarray(items, { minLength: items.length });

  it('pairs with equal scores are ordered by their IDs, whatever the order of the catalog', () => {
    const professions = [prof('zeta'), prof('alpha'), prof('mu')];
    fc.assert(
      fc.property(shuffledOf(professions), (shuffled) => {
        const pairs = rankProfessionPairs(shuffled, none, {}).map((p) => [...p.professionIds].sort().join('+'));
        expect(pairs).toEqual(['alpha+mu', 'alpha+zeta', 'mu+zeta']);
      }),
    );
  });

  it('secondary professions with equal scores are ordered by ID, whatever the order of the catalog', () => {
    const secondary = [
      prof('zeta', { kind: 'secondary' }),
      prof('alpha', { kind: 'secondary' }),
      prof('mu', { kind: 'secondary' }),
    ];
    fc.assert(
      fc.property(shuffledOf(secondary), (shuffled) => {
        expect(rankSecondaryProfessions(shuffled, none, {}).map((p) => p.professionId)).toEqual([
          'alpha',
          'mu',
          'zeta',
        ]);
      }),
    );
  });
});
