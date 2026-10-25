import type { Evaluation } from './evaluation';
import { clampScore, includesId, NEUTRAL_SCORE, percentOr, rankedByTotal, scoreTraits, type Percent } from './scoring';
import type { LegacyPerkProfile } from './catalog';
import type { ClassId, PerkId } from './ids';

/** Bonus for perks that fit the chosen class (e.g. Reagent Economy for purchasable class reagents). */
export const LEGACY_CLASS_SYNERGY_BONUS = 10;

/** The chosen class, if any; perks that fit it get a bonus. */
interface LegacyContext {
  classId?: ClassId | undefined;
}

export interface LegacyPerkResult {
  perkId: PerkId;
  score: Percent;
}

/**
 * Every perk, best first by the total before the cap (see rankedByTotal), ties by ID. A perk no counted Legacy question rates scores `NEUTRAL_SCORE`; a perk that fits
 * the chosen class gets `LEGACY_CLASS_SYNERGY_BONUS` on top, capped at 100.
 */
export function rankLegacyPerks(
  perks: LegacyPerkProfile[],
  { counted }: Evaluation,
  context: LegacyContext,
): LegacyPerkResult[] {
  const scored = perks.map((perk) => {
    const base = percentOr(scoreTraits(perk.traits, counted, 'legacy').match, NEUTRAL_SCORE);
    const total = base + (includesId(perk.classSynergy, context.classId) ? LEGACY_CLASS_SYNERGY_BONUS : 0);
    return { result: { perkId: perk.id, score: clampScore(total) }, total };
  });
  return rankedByTotal(scored, (r) => r.perkId);
}
