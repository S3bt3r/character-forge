import { hasChosenEffect, type Evaluation } from './evaluation';
import {
  byRank,
  byScoreThenId,
  isRated,
  scoreProfile,
  type Percent,
  type ScoredProfile,
  type ScoringInput,
} from './scoring';
import { isPreferenceFor, type Effect } from './questions';
import { playableRacesFor } from './race-scoring';
import type { ClassId, SpecId } from './ids';

/** Items grouped by key, groups and items in input order; a group always has at least one item. */
function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Map<K, [T, ...T[]]> {
  const groups = new Map<K, [T, ...T[]]>();
  for (const item of items) {
    const group = groups.get(key(item));
    groups.set(key(item), group ? [...group, item] : [item]);
  }
  return groups;
}

export interface SpecResult extends ScoredProfile {
  specId: SpecId;
  classId: ClassId;
}

/** A class with its specs, best first; everything else about the class follows from them. */
export interface ClassResult {
  classId: ClassId;
  specs: [SpecResult, ...SpecResult[]];
}

export const bestSpec = (result: ClassResult): SpecResult => result.specs[0];
/** Suggestion for the Dual Specialization (from level 40). */
export const dualSpec = (result: ClassResult): SpecResult | undefined => result.specs[1];
/** A class scores as its best spec. */
export const classScore = (result: ClassResult): Percent => bestSpec(result).score;
/** No answer rates any spec of the class: all stand at 50 % minus deal-breaker deductions. */
export const isUnrated = (result: ClassResult): boolean => !result.specs.some((s) => isRated(s.match));

const affectsClassRanking = (effect: Effect): boolean =>
  effect.kind === 'dealbreaker' || isPreferenceFor(effect, 'spec');

/** Number of counted questions that affect the class ranking (race, professions, Legacy do not count). */
export function classCriteriaCount({ counted }: Evaluation): number {
  return counted.filter((a) => hasChosenEffect(a, affectsClassRanking)).length;
}

function classResult(classId: ClassId, specs: [SpecResult, ...SpecResult[]]): ClassResult {
  // Sorting keeps the length, so the sorted list is as non-empty as the input.
  return { classId, specs: [...specs].sort(byScoreThenId((s) => s.specId)) as [SpecResult, ...SpecResult[]] };
}

/** Class ranking. Races are deliberately left out (see rankRaces); the faction only filters playable classes. */
export function rankClasses(input: ScoringInput, { counted, factions }: Evaluation): ClassResult[] {
  const racesById = new Map(input.races.map((r) => [r.id, r]));
  const isPlayable = (classId: ClassId) => playableRacesFor(input, racesById, classId, factions).length > 0;
  const specs: SpecResult[] = input.specs.map((spec) => ({
    specId: spec.id,
    classId: spec.classId,
    ...scoreProfile(spec.traits, counted, 'spec'),
  }));
  return [...groupBy(specs, (s) => s.classId)]
    .filter(([classId]) => isPlayable(classId))
    .map(([classId, classSpecs]) => classResult(classId, classSpecs))
    .sort(byRank(classScore, (c) => c.classId));
}
