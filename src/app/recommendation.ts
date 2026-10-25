/*
 * Application workflow: what the app recommends for a set of answers. It runs the domain steps (evaluation,
 * rankings) on the real catalog and decides how they connect; the components only display the result.
 */
import { COMBOS } from '../data/combos';
import { LEGACY_PERKS } from '../data/legacy';
import { PROFESSIONS } from '../data/professions';
import { QUESTIONS } from '../data/questions';
import { RACES } from '../data/races';
import { SPECS } from '../data/specs';
import type { Faction } from '../domain/catalog';
import type { Answers } from '../domain/answers';
import { evaluate, hasPreferenceFor, type Evaluation } from '../domain/evaluation';
import type { ScoringInput } from '../domain/scoring';
import { classCriteriaCount, isUnrated, rankClasses, type ClassResult } from '../domain/class-scoring';
import { rankRaces, uniqueTopRaceId, type RaceResult } from '../domain/race-scoring';
import {
  rankProfessionPairs,
  rankSecondaryProfessions,
  type ProfessionPairResult,
  type ProfessionResult,
} from '../domain/professions-scoring';
import { rankLegacyPerks, type LegacyPerkResult } from '../domain/legacy-scoring';
import type { ClassId, RaceId } from '../domain/ids';

/** The real catalog as scoring input. */
const SCORING_INPUT: ScoringInput = { specs: SPECS, races: RACES, combos: COMBOS };

/** Below this many answered class criteria (`classCriteriaCount`), percentages are more chance than recommendation. */
const MIN_CLASS_CRITERIA = 8;
/** Display limits of the character sheet: races and alternative profession pairs shown, Legacy perks shown. */
const SHOWN_RACES = 3;
const SHOWN_ALTERNATIVE_PAIRS = 2;
const SHOWN_LEGACY_PERKS = 5;

/** Notice above the ranking: no rating at all yet, or only a few class-relevant answers. */
export type RankingNotice = 'noRating' | 'fewAnswers';

interface Recommendation {
  evaluation: Evaluation;
  ranking: ClassResult[];
  notice: RankingNotice | undefined;
  /** The chosen faction if exactly one is chosen. */
  faction: Faction | undefined;
}

export function recommend(answers: Answers): Recommendation {
  const evaluation = evaluate(QUESTIONS, answers);
  const ranking = rankClasses(SCORING_INPUT, evaluation);
  return { evaluation, ranking, notice: rankingNotice(ranking, evaluation), faction: chosenFaction(evaluation) };
}

/** The chosen faction if exactly one is chosen, otherwise undefined. */
function chosenFaction({ factions }: Evaluation): Faction | undefined {
  return factions.size === 1 ? [...factions][0] : undefined;
}

/** First "no rating yet", then "only a few answers", after that none. */
function rankingNotice(ranking: ClassResult[], evaluation: Evaluation): RankingNotice | undefined {
  // Unrated is the same for all classes: without a rated playstyle, all are at 50 % minus deal-breaker deductions.
  const [top] = ranking;
  if (top && isUnrated(top)) return 'noRating';
  return classCriteriaCount(evaluation) < MIN_CLASS_CRITERIA ? 'fewAnswers' : undefined;
}

export interface ClassRecommendation {
  /** The best races, at most `SHOWN_RACES`. */
  races: RaceResult[];
  /** Whether any answer rates races; without one, all races are neutral and get no score. */
  racesRated: boolean;
  /** The race whose profession synergies count: only an unambiguous leader, never one decided by name alone. */
  topRaceId: RaceId | undefined;
  /** The recommended pair of primary professions and the next best pairs; no pair without professions. */
  professionPairs: { best: ProfessionPairResult; alternatives: ProfessionPairResult[] } | undefined;
  /** Every secondary profession, best first: there are few, so all are shown. */
  secondaryProfessions: ProfessionResult[];
  /** The best Legacy perks, at most `SHOWN_LEGACY_PERKS`. */
  legacyPerks: LegacyPerkResult[];
  /** Whether any answer rates Legacy perks. */
  legacyRated: boolean;
}

/** Everything the character sheet recommends for one class: races, professions for the leading race, Legacy perks. */
export function recommendForClass(evaluation: Evaluation, classId: ClassId): ClassRecommendation {
  const races = rankRaces(SCORING_INPUT, evaluation, classId);
  const topRaceId = uniqueTopRaceId(races);
  const context = { classId, raceId: topRaceId };
  const [best, ...rest] = rankProfessionPairs(PROFESSIONS, evaluation, context);
  return {
    races: races.slice(0, SHOWN_RACES),
    racesRated: hasPreferenceFor(evaluation, 'race'),
    topRaceId,
    professionPairs: best && { best, alternatives: rest.slice(0, SHOWN_ALTERNATIVE_PAIRS) },
    secondaryProfessions: rankSecondaryProfessions(PROFESSIONS, evaluation, context),
    legacyPerks: rankLegacyPerks(LEGACY_PERKS, evaluation, { classId }).slice(0, SHOWN_LEGACY_PERKS),
    legacyRated: hasPreferenceFor(evaluation, 'legacy'),
  };
}
