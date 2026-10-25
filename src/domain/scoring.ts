/*
 * Second step of the workflow: scores a trait profile against the evaluated answers and deducts what deal-breakers
 * cost. The class, race, profession and Legacy rankings build on it.
 */
import type { ComboProfile, RaceProfile, SpecProfile, TraitValue } from './catalog';
import type { OptionId, QuestionId } from './ids';
import {
  isPreferenceFor,
  type AnswerOption,
  type DealbreakerEffect,
  type DealbreakerScope,
  type Effect,
  type PreferenceEffect,
  type RatedQuestion,
  type Severity,
  type TraitScope,
} from './questions';
import { chosenEffects, type CountedQuestion } from './evaluation';

/** Penalty in percentage points per violated deal-breaker. */
export const SEVERITY_PENALTY: Record<Severity, number> = { heavy: 25, light: 10 };

const MATCH_THRESHOLD = 0.7;
const CONFLICT_THRESHOLD = 0.4;
export const MAX_FACTORS = 3;

/** A score in [0, 100]; only `clampScore` builds one. */
export type Percent = number & { readonly brand: 'Percent' };

/** The value as a score, cut off at 0 and 100 (deal-breaker deductions, bonuses). NaN is a bug and rejected. */
export const clampScore = (value: number): Percent => {
  if (Number.isNaN(value)) throw new RangeError('Score is NaN');
  return Math.min(100, Math.max(0, value)) as Percent;
};

/** A match that lies in [0, 100] by construction; anything else is a bug in the data or the scoring. */
function matchPercent(value: number): Percent {
  if (!(value >= 0 && value <= 100)) throw new RangeError(`Match ${value} is outside [0, 100]`);
  return value as Percent;
}

/** The score of a profile that no answer rates. */
export const NEUTRAL_SCORE = clampScore(50);

/** Whether `list` contains `id`; false if either is undefined. */
export const includesId = <I extends string>(list: readonly I[] | undefined, id: I | undefined): boolean =>
  id !== undefined && (list?.includes(id) ?? false);

/** A value with its weight in a weighted mean. */
interface Weighted {
  value: number;
  weight: number;
}

/** Weighted mean of the values; null without any weight. */
function weightedMean(items: Weighted[]): number | null {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  return total > 0 ? items.reduce((sum, item) => sum + item.weight * item.value, 0) / total : null;
}

/** Ranking order: highest score first, ties alphabetically by ID, so equal scores never depend on the input order. */
export const byRank =
  <T>(score: (item: T) => number, id: (item: T) => string) =>
  (a: T, b: T): number =>
    score(b) - score(a) || id(a).localeCompare(id(b));

/**
 * Results ranked by their total before the cap, ties by ID. Bonuses can push several results to the capped 100; their
 * order then follows the uncapped totals instead of the alphabet, while each result keeps its capped score.
 */
export function rankedByTotal<T>(items: { result: T; total: number }[], id: (result: T) => string): T[] {
  return [...items]
    .sort(
      byRank(
        (x) => x.total,
        (x) => id(x.result),
      ),
    )
    .map((x) => x.result);
}

/** `byRank` for results that carry their score. */
export const byScoreThenId = <T extends { score: number }>(id: (item: T) => string) =>
  byRank((item: T) => item.score, id);

/** Trait values of a spec or race profile. */
type Traits = Record<string, TraitValue>;

export interface ScoringInput {
  specs: SpecProfile[];
  races: RaceProfile[];
  combos: ComboProfile[];
}

/** Contribution of a chosen option to the score: 1 = exact match, 0 = opposite. */
export interface Factor {
  questionId: QuestionId;
  optionId: OptionId;
  scope: TraitScope;
  /** The traits the match is computed from: the option's preferences of this scope the profile has a value for, each once. */
  traits: string[];
  match: number;
  weight: number;
}

export interface Penalty {
  questionId: QuestionId;
  optionId: OptionId;
  scope: DealbreakerScope;
  trait: string;
  points: number;
}

/** How well a profile matches the answers of its scope before penalties; unrated if no counted question concerns it. */
export type Match = { kind: 'unrated' } | { kind: 'rated'; percent: Percent };

export const isRated = (match: Match): match is Extract<Match, { kind: 'rated' }> => match.kind === 'rated';

/** The match in percent; an unrated profile counts as `neutral`. */
export const percentOr = (match: Match, neutral: Percent): Percent => (isRated(match) ? match.percent : neutral);

export interface ScoredProfile {
  /** Final value after penalties. */
  score: Percent;
  match: Match;
  /** All pros (match ≥ `MATCH_THRESHOLD`), sorted by influence on the percentage; `topMatches` gives the most important. */
  matches: Factor[];
  /** All cons (match ≤ `CONFLICT_THRESHOLD`), sorted by influence on the percentage; `topConflicts` gives the most important. */
  conflicts: Factor[];
  penalties: Penalty[];
}

/** Match of an option with a profile and the traits it comes from; null if the option does not concern this scope. */
function optionMatch(traits: Traits, option: AnswerOption, scope: TraitScope): OptionMatch | null {
  const rated = option.effects.filter(
    (e): e is PreferenceEffect => isPreferenceFor(e, scope) && traits[e.trait] !== undefined,
  );
  const match = weightedMean(rated.map((e) => ({ value: closeness(traits[e.trait]!, e.target), weight: e.weight })));
  return match === null ? null : { option, match, traits: [...new Set(rated.map((e) => e.trait))] };
}

/** 1 if the value hits the target, 0 if it is as far away as possible. */
const closeness = (value: number, target: number): number => 1 - Math.abs(value - target);

const isDealbreakerFor = (effect: Effect, scope: DealbreakerScope): effect is DealbreakerEffect =>
  effect.kind === 'dealbreaker' && effect.scope === scope;

function violates(traits: Traits, effect: DealbreakerEffect): boolean {
  const value = traits[effect.trait];
  if (value === undefined) return false;
  return effect.op === 'min' ? value < effect.threshold : value > effect.threshold;
}

function penaltiesFor(traits: Traits, counted: CountedQuestion[], scope: DealbreakerScope): Penalty[] {
  return chosenEffects(counted).flatMap(({ question, option, effect }) =>
    isDealbreakerFor(effect, scope) && violates(traits, effect)
      ? [
          {
            questionId: question.id,
            optionId: option.id,
            scope,
            trait: effect.trait,
            points: SEVERITY_PENALTY[effect.severity],
          },
        ]
      : [],
  );
}

/** Influence of a pro on the percentage. */
const pull = (f: Factor): number => f.weight * f.match;
/** Influence of a con on the percentage. */
const drag = (f: Factor): number => f.weight * (1 - f.match);
/** Sorts factors by influence, ties by question ID. */
const byInfluence =
  (influence: (f: Factor) => number) =>
  (a: Factor, b: Factor): number =>
    influence(b) - influence(a) || a.questionId.localeCompare(b.questionId);

/** All pros, most important first. */
function rankedMatches(factors: Factor[]): Factor[] {
  return factors.filter((f) => f.match >= MATCH_THRESHOLD).sort(byInfluence(pull));
}

/** The `MAX_FACTORS` most important pros. */
export function topMatches(factors: Factor[]): Factor[] {
  return rankedMatches(factors).slice(0, MAX_FACTORS);
}

/** All cons, most important first. */
function rankedConflicts(factors: Factor[]): Factor[] {
  return factors.filter((f) => f.match <= CONFLICT_THRESHOLD).sort(byInfluence(drag));
}

/** The `MAX_FACTORS` most important cons. */
export function topConflicts(factors: Factor[]): Factor[] {
  return rankedConflicts(factors).slice(0, MAX_FACTORS);
}

type TraitScore = Omit<ScoredProfile, 'penalties' | 'score'>;

interface OptionMatch {
  option: AnswerOption;
  match: number;
  traits: string[];
}

/** The options that concern this scope, with their match. */
function optionMatches(traits: Traits, options: AnswerOption[], scope: TraitScope): OptionMatch[] {
  return options.flatMap((option) => optionMatch(traits, option, scope) ?? []);
}

/** How well one question matches a profile, and the factors that explain it. */
interface QuestionScore {
  match: number;
  factors: Factor[];
}

/** Match of one question and its factors: `any` counts the best option, `all` the average, each option with its share of the weight. */
function questionMatch(
  question: RatedQuestion,
  matches: OptionMatch[],
  weight: number,
  scope: TraitScope,
): QuestionScore {
  const factor = (m: OptionMatch, share: number): Factor => ({
    questionId: question.id,
    optionId: m.option.id,
    scope,
    traits: m.traits,
    match: m.match,
    weight: share,
  });
  if (question.mode === 'any') {
    const best = matches.reduce((a, b) => (b.match > a.match ? b : a));
    return { match: best.match, factors: [factor(best, weight)] };
  }
  return {
    match: matches.reduce((sum, m) => sum + m.match, 0) / matches.length,
    factors: matches.map((m) => factor(m, weight / matches.length)),
  };
}

/**
 * Scores a trait profile against all counted questions of a scope.
 * `any` questions count their best option, `all` questions the average of the options (see QuestionMode).
 */
export function scoreTraits(traits: Traits, counted: CountedQuestion[], scope: TraitScope): TraitScore {
  const scored = counted.flatMap(({ question, options, weight }) => {
    const matches = optionMatches(traits, options, scope);
    return matches.length === 0 ? [] : [{ weight, ...questionMatch(question, matches, weight, scope) }];
  });
  const mean = weightedMean(scored.map((q) => ({ value: q.match, weight: q.weight })));
  const factors = scored.flatMap((q) => q.factors);
  const match: Match = mean === null ? { kind: 'unrated' } : { kind: 'rated', percent: matchPercent(mean * 100) };
  return { match, matches: rankedMatches(factors), conflicts: rankedConflicts(factors) };
}

function withPenalties(base: TraitScore, penalties: Penalty[]): ScoredProfile {
  const deducted = percentOr(base.match, NEUTRAL_SCORE) - penalties.reduce((sum, p) => sum + p.points, 0);
  return { ...base, penalties, score: clampScore(deducted) };
}

/** Score after deal-breaker penalties of a spec or race profile. */
export const scoreProfile = (traits: Traits, counted: CountedQuestion[], scope: DealbreakerScope): ScoredProfile =>
  withPenalties(scoreTraits(traits, counted, scope), penaltiesFor(traits, counted, scope));
