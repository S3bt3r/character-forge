import type { CountedQuestion, Evaluation } from './evaluation';
import {
  clampScore,
  includesId,
  NEUTRAL_SCORE,
  percentOr,
  rankedByTotal,
  scoreTraits,
  topConflicts,
  topMatches,
  type Factor,
  type Match,
  type Percent,
} from './scoring';
import type { ProfessionProfile } from './catalog';
import type { ClassId, ProfessionId, RaceId } from './ids';

/*
 * Synergies are bonuses in percentage points on the average of both professions: they should move a pair
 * ahead when the fit is similar, but not mask a poor fit.
 */
export const PARTNER_BONUS = 10;
export const CLASS_SYNERGY_BONUS = 8;
export const RACE_SYNERGY_BONUS = 5;

export interface ProfessionContext {
  classId?: ClassId | undefined;
  raceId?: RaceId | undefined;
}

export interface Synergy {
  kind: 'partner' | 'class' | 'race';
  /** Profession that brings the synergy; for `partner` the second profession of the pair (the UI does not show it). */
  professionId: ProfessionId;
}

export interface ProfessionPairResult {
  professionIds: [ProfessionId, ProfessionId];
  score: Percent;
  synergies: Synergy[];
  matches: Factor[];
  conflicts: Factor[];
}

export interface ProfessionResult {
  professionId: ProfessionId;
  score: Percent;
  synergies: Synergy[];
}

const SYNERGY_BONUS: Record<Synergy['kind'], number> = {
  partner: PARTNER_BONUS,
  class: CLASS_SYNERGY_BONUS,
  race: RACE_SYNERGY_BONUS,
};

/** Class synergy, then race synergy of a profession, as far as the chosen class and race have them. */
function contextSynergies(profession: ProfessionProfile, context: ProfessionContext): Synergy[] {
  const synergy = (kind: 'class' | 'race'): Synergy[] => [{ kind, professionId: profession.id }];
  return [
    ...(includesId(profession.classSynergy, context.classId) ? synergy('class') : []),
    ...(includesId(profession.raceSynergy, context.raceId) ? synergy('race') : []),
  ];
}

/** Match of one profession before synergies, and its pros and cons. */
interface ProfessionScore {
  match: Match;
  factors: Factor[];
}

function scoreProfession(profession: ProfessionProfile, counted: CountedQuestion[]): ProfessionScore {
  const scored = scoreTraits(profession.traits, counted, 'profession');
  return { match: scored.match, factors: [...scored.matches, ...scored.conflicts] };
}

function bonusOf(synergies: Synergy[]): number {
  return synergies.reduce((sum, s) => sum + SYNERGY_BONUS[s.kind], 0);
}

/** Either profession names the other as its partner. */
const arePartners = (a: ProfessionProfile, b: ProfessionProfile): boolean =>
  includesId(a.partners, b.id) || includesId(b.partners, a.id);

/**
 * One factor per question option and side: if both professions of a pair rate the same option, the pros keep
 * the better and the cons the worse of the two, instead of listing the option twice.
 */
function onePerOption(factors: Factor[], pick: (a: number, b: number) => number): Factor[] {
  const byOption = new Map<string, Factor>();
  for (const f of factors) {
    const key = `${f.questionId}/${f.optionId}`;
    const seen = byOption.get(key);
    if (!seen || pick(f.match, seen.match) !== seen.match) byOption.set(key, f);
  }
  return [...byOption.values()];
}

/** A primary profession with its score, ready to be paired. */
interface ScoredProfession extends ProfessionScore {
  profession: ProfessionProfile;
}

/** Every unordered pair of distinct items, each once, in list order. */
const uniquePairs = <T>(items: T[]): [T, T][] => items.flatMap((a, i) => items.slice(i + 1).map((b): [T, T] => [a, b]));

/** Partner synergy first, then class and race synergies of both professions. */
function pairSynergies(a: ProfessionProfile, b: ProfessionProfile, context: ProfessionContext): Synergy[] {
  const partner: Synergy[] = arePartners(a, b) ? [{ kind: 'partner', professionId: b.id }] : [];
  return [...partner, ...contextSynergies(a, context), ...contextSynergies(b, context)];
}

/** A pair with its total before the cap (see rankedByTotal). */
function scorePair(
  a: ScoredProfession,
  b: ScoredProfession,
  context: ProfessionContext,
): { result: ProfessionPairResult; total: number } {
  const synergies = pairSynergies(a.profession, b.profession, context);
  const base = (percentOr(a.match, NEUTRAL_SCORE) + percentOr(b.match, NEUTRAL_SCORE)) / 2;
  const factors = [...a.factors, ...b.factors];
  const total = base + bonusOf(synergies);
  return {
    result: {
      professionIds: [a.profession.id, b.profession.id],
      score: clampScore(total),
      synergies,
      matches: topMatches(onePerOption(factors, Math.max)),
      conflicts: topConflicts(onePerOption(factors, Math.min)),
    },
    total,
  };
}

/**
 * Every pair of two distinct primary professions (secondary ones are never paired), best first by the total before the cap (see rankedByTotal), ties by ID. A pair
 * scores the mean of its two matches, each `NEUTRAL_SCORE` if unrated, plus the bonuses of its synergies (partners,
 * chosen class, chosen race), capped at 100; it keeps its strongest pros and cons, one entry per option.
 */
export function rankProfessionPairs(
  professions: ProfessionProfile[],
  { counted }: Evaluation,
  context: ProfessionContext,
): ProfessionPairResult[] {
  const primary = professions.filter((p) => p.kind !== 'secondary');
  const scored = primary.map((p) => ({ profession: p, ...scoreProfession(p, counted) }));
  return rankedByTotal(
    uniquePairs(scored).map(([a, b]) => scorePair(a, b, context)),
    // Sorted IDs: the order within a pair follows the catalog, a tie must not.
    (p) => [...p.professionIds].sort().join(),
  );
}

/**
 * The secondary professions alone, best first by the total before the cap (see rankedByTotal), ties by ID: the match (`NEUTRAL_SCORE` if unrated) plus the bonuses of
 * class and race synergy, capped at 100.
 */
export function rankSecondaryProfessions(
  professions: ProfessionProfile[],
  { counted }: Evaluation,
  context: ProfessionContext,
): ProfessionResult[] {
  const scored = professions
    .filter((p) => p.kind === 'secondary')
    .map((p) => {
      const synergies = contextSynergies(p, context);
      const total = percentOr(scoreProfession(p, counted).match, NEUTRAL_SCORE) + bonusOf(synergies);
      return { result: { professionId: p.id, score: clampScore(total), synergies }, total };
    });
  return rankedByTotal(scored, (r) => r.professionId);
}
