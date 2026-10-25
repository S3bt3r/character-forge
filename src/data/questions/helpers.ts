import { traitValue, type Faction } from '../../domain/catalog';
import type {
  AnswerCondition,
  DealbreakerEffect,
  FactionEffect,
  PreferenceEffect,
  ChapterId,
  QuestionMode,
  QuestionTier,
  Severity,
  TraitScope,
} from '../../domain/questions';
import type { EffectDef, OptionDef, QuestionDef } from '../display';
import { optionId, questionId } from '../../domain/ids';
import { knownId } from '../known';
import type { LegacyTraitId } from '../legacy';
import type { LiteralIds } from '../localize';
import type { ProfessionTraitId } from '../professions';
import type { RaceTraitId, SpecTraitId } from '../traits';

/*
 * Building blocks for the questionnaire. Weights within an option are relative (1 = normal, 2 = defining);
 * the question's own weight comes from its tier (`tier`).
 * The chapters describe questions as drafts with literal IDs and English texts. The German translation lives
 * in `src/i18n/de/questions/<chapter>.ts`; `GermanChapter` binds it to the drafts like a foreign key,
 * `buildQuestions` merges the two.
 */

/** Deal-breaker with an English reason; the German one lives in the option's texts under `reasons.<trait>`. */
type DealbreakerDraft<T extends string = string> = Omit<DealbreakerEffect, 'trait' | 'threshold'> & {
  trait: T;
  threshold: number;
  reason: string;
};
type DraftEffect = PreferenceEffect | FactionEffect | DealbreakerDraft;

/** Texts of an option: label and optionally a hint below it. */
interface OptionTexts {
  label: string;
  hint?: string;
}

interface DraftOption<
  Id extends string = string,
  T extends OptionTexts = OptionTexts,
  E extends readonly DraftEffect[] = readonly DraftEffect[],
> {
  id: Id;
  texts: T;
  effects: E;
}

/** Preference builder for one scope; the type parameter restricts the traits to those of the scope. */
const preference =
  <T extends string>(scope: TraitScope) =>
  (trait: T, target: number, weight = 1): PreferenceEffect => ({
    kind: 'pref',
    scope,
    trait,
    target: traitValue(target),
    weight,
  });

export const spec = preference<SpecTraitId>('spec');
/** `newCombo` is a property of the race-class combination and is added during the race ranking. */
export const race = preference<RaceTraitId | 'newCombo'>('race');
export const profession = preference<ProfessionTraitId>('profession');
export const legacy = preference<LegacyTraitId>('legacy');

/** Deal-breaker builder for a lower (`min`) or upper (`max`) limit of a spec trait. */
const specLimit =
  (op: DealbreakerEffect['op']) =>
  <const T extends SpecTraitId>(
    trait: T,
    threshold: number,
    severity: Severity,
    reason: string,
  ): DealbreakerDraft<T> => ({
    kind: 'dealbreaker',
    scope: 'spec',
    trait,
    op,
    threshold,
    severity,
    reason,
  });

export const specMin = specLimit('min');
export const specMax = specLimit('max');

export const faction = (f: Faction): FactionEffect => ({ kind: 'faction', faction: f });

export const opt = <const Id extends string, const T extends OptionTexts, const E extends readonly DraftEffect[]>(
  id: Id,
  texts: T,
  effects: E,
): DraftOption<Id, T, E> => ({
  id,
  texts,
  effects,
});

interface TextSettings {
  text: string;
  /** Short name for explanations in the ranking and character sheet. */
  short: string;
  help?: string;
}

interface RatedSettings extends TextSettings {
  mode: QuestionMode;
  tier: QuestionTier;
  /** The question does not count once this question is answered without any of these options (see AnswerCondition). */
  appliesIf?: { question: string; options: string[] };
  /** Default: multiple choice. Single choice only if the options are mutually exclusive. */
  single?: boolean;
}

/** A gate is always a single choice and awards no points, so it has neither mode nor tier. */
interface GateSettings extends TextSettings {
  /** Option IDs of the draft whose pick switches the chapter off (`mute`) or doubles it (`boost`). */
  gate: { mute: string[]; boost: string[] };
}

type QuestionSettings = RatedSettings | GateSettings;

interface QuestionDraft<
  Id extends string = string,
  S extends QuestionSettings = QuestionSettings,
  O extends readonly DraftOption[] = readonly DraftOption[],
> {
  id: Id;
  chapter: ChapterId;
  settings: S;
  options: O;
}

/** Draft of a question; without a selection it stays neutral (no "don't care" needed). */
export const question = <
  const Id extends string,
  const S extends QuestionSettings,
  const O extends readonly DraftOption[],
>(
  id: Id,
  chapter: ChapterId,
  settings: S,
  options: O,
): QuestionDraft<Id, S, O> => ({ id, chapter, settings, options });

/** Traits for which an option sets deal-breakers; each needs a German reason. */
type ReasonTraits<O> =
  O extends DraftOption<string, OptionTexts, infer E> ? Extract<E[number], { kind: 'dealbreaker' }>['trait'] : never;
/** A German text whenever the English field exists, even as an optional field of a widened type (fail closed). */
type IfPresent<T, K extends string> = K extends keyof T ? Record<K, string> : unknown;
type GermanOption<O extends DraftOption> = { label: string } & IfPresent<O['texts'], 'hint'> &
  ([ReasonTraits<O>] extends [never] ? unknown : { reasons: Record<ReasonTraits<O>, string> });
type GermanQuestion<Q extends QuestionDraft> = { text: string; short: string } & IfPresent<Q['settings'], 'help'> & {
    options: LiteralIds<Q['options'][number]['id'], { [O in Q['options'][number] as O['id']]: GermanOption<O> }>;
  };
/** German texts of a chapter: per question and option exactly those for which English ones exist. */
export type GermanChapter<D extends readonly QuestionDraft[]> = LiteralIds<
  D[number]['id'],
  { [Q in D[number] as Q['id']]: GermanQuestion<Q> }
>;

/** German texts of an option at runtime. */
interface OptionTextsRuntime {
  label: string;
  hint?: string;
  reasons?: Partial<Record<string, string>>;
}
/** German texts of a question at runtime. */
interface QuestionTextsRuntime {
  text: string;
  short: string;
  help?: string;
  options: Partial<Record<string, OptionTextsRuntime>>;
}
/** German texts of a chapter at runtime, whichever chapter. */
export type ChapterTextsRuntime = Partial<Record<string, QuestionTextsRuntime>>;

/** A deal-breaker gets its German reason; other effects stay as they are. */
const localizedEffect = (effect: DraftEffect, de: OptionTextsRuntime): EffectDef =>
  effect.kind === 'dealbreaker'
    ? {
        ...effect,
        threshold: traitValue(effect.threshold),
        reason: { en: effect.reason, de: de.reasons![effect.trait]! },
      }
    : effect;

/**
 * The ranking finds a penalty's reason by question, option, scope and trait; two deal-breakers of one option on the same
 * scope and trait would make that ambiguous, so they fail when the data loads.
 */
function checkUniqueDealbreakers(option: DraftOption): void {
  const keys = option.effects.flatMap((e) => (e.kind === 'dealbreaker' ? [`${e.scope}/${e.trait}`] : []));
  const twice = keys.find((key, i) => keys.indexOf(key) !== i);
  if (twice !== undefined) throw new Error(`Option ${option.id}: two deal-breakers on ${twice}`);
}

function buildOption(option: DraftOption, de: OptionTextsRuntime): OptionDef {
  checkUniqueDealbreakers(option);
  return {
    id: optionId(option.id),
    label: { en: option.texts.label, de: de.label },
    ...(option.texts.hint !== undefined ? { hint: { en: option.texts.hint, de: de.hint } } : {}),
    effects: option.effects.map((e) => localizedEffect(e, de)),
  };
}

function buildQuestion({ id, chapter, settings, options }: QuestionDraft, de: QuestionTextsRuntime): QuestionDef {
  const base = {
    id: questionId(id),
    chapter,
    text: { en: settings.text, de: de.text },
    short: { en: settings.short, de: de.short },
    ...(settings.help !== undefined ? { help: { en: settings.help, de: de.help } } : {}),
    options: options.map((o) => buildOption(o, de.options[o.id]!)),
  };
  if ('gate' in settings) {
    // A gate option must be one of the question's options; a typo fails when the data loads.
    const gateOption = (option: string) =>
      knownId(
        base.options.map((o) => o.id),
        option,
        `Gate ${id}`,
      );
    return {
      ...base,
      kind: 'gate',
      gate: { mute: settings.gate.mute.map(gateOption), boost: settings.gate.boost.map(gateOption) },
    };
  }
  const appliesIf = settings.appliesIf && {
    question: questionId(settings.appliesIf.question),
    options: settings.appliesIf.options.map(optionId),
  };
  return {
    ...base,
    kind: 'rated',
    multi: !settings.single,
    mode: settings.mode,
    tier: settings.tier,
    ...(appliesIf ? { appliesIf } : {}),
  };
}

const conditionOf = (question: QuestionDef): AnswerCondition | undefined =>
  question.kind === 'rated' ? question.appliesIf : undefined;

const hasGate = (chapter: ChapterId, questions: QuestionDef[]): boolean =>
  questions.some((q) => q.kind === 'gate' && q.chapter === chapter);

/**
 * An answer condition must name another, unconditional question outside chapters with a gate, and options of it.
 * A target that does not count would otherwise keep ruling questions out through its stored answer. Fails when the
 * data loads.
 */
export function checkConditions(questions: QuestionDef[]): QuestionDef[] {
  for (const q of questions) {
    const condition = conditionOf(q);
    if (condition) checkCondition(q.id, condition, questions);
  }
  return questions;
}

function checkCondition(id: string, { question, options }: AnswerCondition, questions: QuestionDef[]): void {
  const target = questions.find((x) => x.id === question);
  if (!target) throw new Error(`Question ${id}: condition on unknown question ${question}`);
  if (conditionOf(target)) throw new Error(`Question ${id}: ${target.id} itself has a condition`);
  if (hasGate(target.chapter, questions)) throw new Error(`Question ${id}: ${target.id} is in a chapter with a gate`);
  if (options.length === 0) throw new Error(`Question ${id}: condition with no option`);
  const known = target.options.map((o) => o.id);
  for (const option of options) knownId(known, option, `Question ${id}, condition on ${target.id}`);
}

/** Merges drafts and German texts; the type requires the texts of exactly these drafts, not those of another chapter. */
export function buildQuestions<const D extends readonly QuestionDraft[]>(
  drafts: D,
  deTexts: GermanChapter<D>,
): QuestionDef[] {
  const de = deTexts as ChapterTextsRuntime;
  return drafts.map((draft) => buildQuestion(draft, de[draft.id]!));
}
