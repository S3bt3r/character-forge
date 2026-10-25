import fc from 'fast-check';
import type { Effect } from '../../src/domain/questions';
import type { Answers } from '../../src/domain/answers';
import { input, pick, pickHigh, pref, question, race, spec } from './fixtures';

/*
 * Generators for property tests on synthetic data: a few spec and race traits, random preferences, questions and
 * answer sets. Shared by the domain tests that rank or evaluate random scenarios.
 */

export const SPEC_TRAITS = ['a', 'b', 'c'] as const;

const RACE_TRAITS = ['x', 'y'] as const;

export const unit = fc.double({ min: 0, max: 1, noNaN: true });

export const specProfile = fc.record({ a: unit, b: unit, c: unit });

const raceProfile = fc.record({ x: unit, y: unit });

export const prefArb = (scope: 'spec' | 'race') =>
  fc
    .record({
      trait: scope === 'spec' ? fc.constantFrom(...SPEC_TRAITS) : fc.constantFrom(...RACE_TRAITS),
      target: unit,
      weight: fc.double({ min: 0.1, max: 5, noNaN: true }),
    })
    .map((p): Effect => pref(scope, p.trait, p.target, p.weight));

const optionArb = fc.array(fc.oneof(prefArb('spec'), prefArb('race')), { minLength: 0, maxLength: 3 });

const questionArb = (id: string) =>
  fc
    .record({
      options: fc.array(optionArb, { minLength: 1, maxLength: 4 }),
      mode: fc.constantFrom('any' as const, 'all' as const),
      tier: fc.constantFrom('pillar' as const, 'core' as const, 'dynamic' as const, 'fine' as const),
    })
    .map(({ options, mode, tier }) => question(id, options, { mode, tier }));

/** Random, valid data set including answers (arbitrary subsets of the options). */
export const scenarioArb = fc
  .record({
    specs: fc.array(specProfile, { minLength: 1, maxLength: 5 }),
    races: fc.array(fc.record({ traits: raceProfile, horde: fc.boolean() }), { minLength: 1, maxLength: 3 }),
    questions: fc
      .integer({ min: 0, max: 5 })
      .chain((n) => fc.tuple(...Array.from({ length: n }, (_, i) => questionArb(`q${i}`)))),
    picks: fc.array(fc.array(fc.boolean(), { minLength: 4, maxLength: 4 }), { minLength: 5, maxLength: 5 }),
    high: fc.array(fc.boolean(), { minLength: 5, maxLength: 5 }),
  })
  .map(({ specs, races, questions, picks, high }) => {
    const data = input(
      specs.map((t, i) => spec(`s${i}`, `c${i % 2}`, t)),
      races.map((r, i) => race(`r${i}`, r.horde ? 'horde' : 'alliance', r.traits)),
      questions,
    );
    const answers: Answers = {};
    questions.forEach((q, i) => {
      const ids = q.options.filter((_, j) => picks[i]![j]).map((o) => o.id);
      if (ids.length > 0) answers[q.id] = high[i] ? pickHigh(...ids) : pick(...ids);
    });
    return { data, answers };
  });
