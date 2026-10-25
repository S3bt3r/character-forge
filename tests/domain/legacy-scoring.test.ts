import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import type { Question } from '../../src/domain/questions';
import type { Answers } from '../../src/domain/answers';
import { answersOf, pick, pref, question } from '../support/fixtures';
import { LEGACY_CLASS_SYNERGY_BONUS, rankLegacyPerks } from '../../src/domain/legacy-scoring';
import { evaluate } from '../../src/domain/evaluation';
import { NEUTRAL_SCORE } from '../../src/domain/scoring';
import { classId, perkId } from '../../src/domain/ids';
import { traitProfile, type LegacyPerkProfile } from '../../src/domain/catalog';

/* Ranking the Legacy perks on synthetic perks: focus, class bonus, cap and ties. */

const TRAITS = ['leveling', 'gold', 'pvp'] as const;

/** A synthetic perk; its traits are written as plain numbers like in the data. */
const perk = (id: string, traits: Record<string, number> = {}, classSynergy?: string[]): LegacyPerkProfile => ({
  id: perkId(id),
  tree: 'adventure',
  traits: traitProfile(traits),
  ...(classSynergy ? { classSynergy: classSynergy.map(classId) } : {}),
});

const unit = fc.double({ min: 0, max: 1, noNaN: true });
const perksArb = fc
  .uniqueArray(
    fc.record({
      id: fc.stringMatching(/^[a-z]{1,6}$/),
      traits: fc.record({ leveling: unit, gold: unit, pvp: unit }),
      synergy: fc.option(fc.constantFrom('mage', 'rogue'), { nil: undefined }),
    }),
    { minLength: 1, maxLength: 6, selector: (p) => p.id },
  )
  .map((ps) => ps.map((p) => perk(p.id, p.traits, p.synergy && [p.synergy])));
const scenarioArb = fc.record({
  perks: perksArb,
  prefs: fc.array(fc.record({ trait: fc.constantFrom(...TRAITS), target: unit }), { maxLength: 4 }),
  classId: fc.option(fc.constantFrom('mage', 'rogue', 'warrior').map(classId), { nil: undefined }),
});
const ask = (prefs: { trait: string; target: number }[]): { questions: Question[]; answers: Answers } => {
  const questions = prefs.map((p, i) => question(`l${i}`, [[pref('legacy', p.trait, p.target)]]));
  return { questions, answers: Object.fromEntries(questions.map((q) => [q.id, pick('o0')])) };
};

describe('Legacy perks', () => {
  it('ranks every perk once, best first, with a score in [0, 100]', () => {
    fc.assert(
      fc.property(scenarioArb, ({ perks, prefs, classId }) => {
        const { questions, answers } = ask(prefs);
        const ranked = rankLegacyPerks(perks, evaluate(questions, answers), { classId });
        expect(ranked.map((r) => r.perkId).sort()).toEqual(perks.map((p) => p.id).sort());
        const scores = ranked.map((r) => r.score);
        expect(scores).toEqual([...scores].sort((a, b) => b - a));
        for (const score of scores) expect(score >= 0 && score <= 100).toBe(true);
      }),
    );
  });

  it('a focus ranks the perks by how well they serve it', () => {
    const perks = [perk('none', { leveling: 0 }), perk('full', { leveling: 1 }), perk('half', { leveling: 0.5 })];
    const q = question('l', [[pref('legacy', 'leveling', 1)]]);
    expect(rankLegacyPerks(perks, evaluate([q], answersOf({ l: pick('o0') })), {}).map((r) => r.perkId)).toEqual([
      'full',
      'half',
      'none',
    ]);
  });

  it('without a focus every perk is neutral, and only a perk linked to the chosen class gets the bonus', () => {
    const perks = [perk('mage-perk', {}, ['mage']), perk('rogue-perk', {}, ['rogue']), perk('plain')];
    const ranked = rankLegacyPerks(perks, evaluate([], {}), { classId: classId('mage') });
    expect(Object.fromEntries(ranked.map((r) => [r.perkId, r.score]))).toEqual({
      'mage-perk': NEUTRAL_SCORE + LEGACY_CLASS_SYNERGY_BONUS,
      'rogue-perk': NEUTRAL_SCORE,
      plain: NEUTRAL_SCORE,
    });
  });

  it('perks that both reach the cap keep the order of their uncapped totals, not of their IDs', () => {
    const q = question('l', [[pref('legacy', 'leveling', 1)]]);
    const ranked = rankLegacyPerks(
      [perk('alpha', { leveling: 1 }), perk('zeta', { leveling: 1 }, ['mage'])],
      evaluate([q], answersOf({ l: pick('o0') })),
      { classId: classId('mage') },
    );
    expect(ranked.map((p) => p.perkId)).toEqual(['zeta', 'alpha']);
    expect(ranked.map((p) => p.score)).toEqual([100, 100]);
  });

  it('perks with equal scores are ordered by ID, whatever the order of the catalog', () => {
    const perks = [perk('zeta', { leveling: 1 }), perk('alpha'), perk('mu', { leveling: 0.3 })];
    fc.assert(
      fc.property(fc.shuffledSubarray(perks, { minLength: perks.length }), (shuffled) => {
        expect(rankLegacyPerks(shuffled, evaluate([], {}), {}).map((p) => p.perkId)).toEqual(['alpha', 'mu', 'zeta']);
      }),
    );
  });
});
