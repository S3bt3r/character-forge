import type { Faction, TraitValue } from './catalog';
import type { OptionId, QuestionId } from './ids';

/** What a preference is scored against: spec, race, profession or Legacy perk. */
export type TraitScope = 'spec' | 'race' | 'profession' | 'legacy';
export type DealbreakerScope = 'spec' | 'race';

/** Wish: the trait should be as close to the target value as possible. `weight` weights within the option. */
export interface PreferenceEffect {
  kind: 'pref';
  scope: TraitScope;
  trait: string;
  target: TraitValue;
  weight: number;
}

export type Severity = 'heavy' | 'light';

/** Deal-breaker: if a spec or race violates the threshold, there is a penalty depending on severity. */
export interface DealbreakerEffect {
  kind: 'dealbreaker';
  scope: DealbreakerScope;
  trait: string;
  op: 'min' | 'max';
  threshold: TraitValue;
  severity: Severity;
}

/** Hard filter on the races' faction. */
export interface FactionEffect {
  kind: 'faction';
  faction: Faction;
}

export type Effect = PreferenceEffect | DealbreakerEffect | FactionEffect;

export interface AnswerOption {
  id: OptionId;
  /** Empty list: the option does not affect the result (e.g. "Quests in the world"). */
  effects: Effect[];
}

export type ChapterId =
  | 'setting'
  | 'foundation'
  | 'toolkit'
  | 'leveling'
  | 'pve'
  | 'pvp'
  | 'race'
  | 'combat-feel'
  | 'dealbreakers'
  | 'professions'
  | 'legacy';

/**
 * How several chosen options of a question combine:
 * - any (tolerance, "what are you comfortable with?"): the best match counts; more checkmarks never hurt.
 * - all (requirement, "what do you need?"): average; every chosen but missing trait lowers the score.
 */
export type QuestionMode = 'any' | 'all';

/** Weight tier of a question: pillar, core, dynamic, fine-tuning. */
export type QuestionTier = 'pillar' | 'core' | 'dynamic' | 'fine';

/** How a gate's options act on its chapter: `mute` switches it off, `boost` doubles the weight of its other questions. */
interface Gate {
  mute: OptionId[];
  boost: OptionId[];
}

/** `O` lets callers keep a richer option type through the same question shape. */
interface QuestionBase<O extends AnswerOption> {
  id: QuestionId;
  chapter: ChapterId;
  options: O[];
}

/** Opening question of a chapter: a single choice that awards no points but decides how its chapter counts. */
export interface GateQuestion<O extends AnswerOption = AnswerOption> extends QuestionBase<O> {
  kind: 'gate';
  gate: Gate;
}

/**
 * When a question applies: it does not count (it stays shown, marked as not counting) once `question` is answered
 * with known options, none of them in `options`. Unanswered or "Don't care" leaves it in place, and a stored answer counts again once one of
 * `options` is picked.
 */
export interface AnswerCondition {
  question: QuestionId;
  options: OptionId[];
}

/** A question that scores the answers against the profiles. */
export interface RatedQuestion<O extends AnswerOption = AnswerOption> extends QuestionBase<O> {
  kind: 'rated';
  /** false: single choice (options are mutually exclusive). */
  multi: boolean;
  mode: QuestionMode;
  tier: QuestionTier;
  appliesIf?: AnswerCondition;
}

export type Question<O extends AnswerOption = AnswerOption> = GateQuestion<O> | RatedQuestion<O>;

export const isPreferenceFor = (effect: Effect, scope: TraitScope): effect is PreferenceEffect =>
  effect.kind === 'pref' && effect.scope === scope;

/** Several options may be picked; a gate is always a single choice. */
export const isMultipleChoice = (question: Question): boolean => question.kind === 'rated' && question.multi;

const hasPreference = (option: AnswerOption): boolean => option.effects.some((e) => e.kind === 'pref');

/** Importance only multiplies preferences; factions and deal-breakers only know "Don't care" or "Counts". */
export const isWeighable = (question: Question): boolean =>
  question.kind === 'rated' && question.options.some(hasPreference);
