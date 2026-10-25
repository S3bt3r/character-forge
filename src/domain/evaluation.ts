/*
 * First step of the workflow: evaluates the answers once. Which questions count, with which weight, how the gates
 * set their chapters and which factions are picked; the rankings in scoring.ts and next to it work on the result.
 */
import type { Faction } from './catalog';
import {
  isPreferenceFor,
  type AnswerOption,
  type ChapterId,
  type Effect,
  type Question,
  type QuestionTier,
  type RatedQuestion,
  type AnswerCondition,
  type TraitScope,
} from './questions';
import type { Answer, Answers, PickedAnswer } from './answers';
import type { OptionId, QuestionId } from './ids';

const HIGH_IMPORTANCE_FACTOR = 2;
/** A gate answered with "very" multiplies the weight of the other questions of its chapter. */
const GATE_BOOST_FACTOR = 2;
/** Weight per question tier: a pillar weighs five times as much as a dynamic question. */
const TIER_WEIGHT: Record<QuestionTier, number> = { pillar: 40, core: 20, dynamic: 8, fine: 3 };

export interface CountedQuestion {
  question: RatedQuestion;
  options: AnswerOption[];
  weight: number;
}

interface GateState {
  /** Chapters a gate switches off: their other questions stay shown but do not count. */
  muted: ReadonlySet<ChapterId>;
  /** Chapters whose gate is set to "very": their other questions count double. */
  boosted: ReadonlySet<ChapterId>;
}

/** The answers as the rankings see them: what counts, how the gates are set and which factions are picked. */
export interface Evaluation extends GateState {
  /** Questions that count, in catalog order, with their picked options and weight. */
  counted: CountedQuestion[];
  /** Picked factions; empty means no filter. */
  factions: ReadonlySet<Faction>;
  /** Questions whose condition the answers rule out: they stay shown but do not count (see AnswerCondition). */
  ruledOut: ReadonlySet<QuestionId>;
}

/** Evaluates the answers once; every ranking and summary works on the result. */
export function evaluate(questions: Question[], answers: Answers): Evaluation {
  const gates = gateState(questions, answers);
  const ruledOut = ruledOutQuestions(questions, answers);
  const counted = countedQuestions(questions, answers, gates, ruledOut);
  return { ...gates, counted, factions: factionsOf(counted), ruledOut };
}

const picksAnyOf = (chosen: readonly OptionId[], optionIds: readonly OptionId[]): boolean =>
  chosen.some((id) => optionIds.includes(id));

type GateEffect = 'mute' | 'boost';

/** What the answer to a gate does to its chapter; muting wins if both kinds of option are picked. */
function gateEffect(question: Question, answers: Answers): GateEffect | undefined {
  const answer = answers[question.id];
  if (question.kind !== 'gate' || answer?.kind !== 'picked') return undefined;
  if (picksAnyOf(answer.optionIds, question.gate.mute)) return 'mute';
  if (picksAnyOf(answer.optionIds, question.gate.boost)) return 'boost';
  return undefined;
}

function gateState(questions: Question[], answers: Answers): GateState {
  const chaptersWith = (effect: GateEffect) =>
    new Set(questions.filter((q) => gateEffect(q, answers) === effect).map((q) => q.chapter));
  return { muted: chaptersWith('mute'), boosted: chaptersWith('boost') };
}

/** The question's options the answer picks; an answer with only unknown options picks none and counts as unanswered. */
const pickedOptions = (question: Question, answer: PickedAnswer): AnswerOption[] =>
  question.options.filter((o) => answer.optionIds.includes(o.id));

/** The condition's question is answered with known options, none of them a required one. */
function rulesOut({ question, options }: AnswerCondition, questions: Question[], answers: Answers): boolean {
  const target = questions.find((q) => q.id === question);
  const answer = answers[question];
  if (!target || answer?.kind !== 'picked') return false;
  return pickedOptions(target, answer).length > 0 && !picksAnyOf(answer.optionIds, options);
}

function ruledOutQuestions(questions: Question[], answers: Answers): Set<QuestionId> {
  return new Set(
    questions
      .filter((q) => q.kind === 'rated' && q.appliesIf && rulesOut(q.appliesIf, questions, answers))
      .map((q) => q.id),
  );
}

/** Unscored option: affects no result (e.g. "Quests in the world"). */
export const isUnratedOption = (option: AnswerOption): boolean => option.effects.length === 0;

type UncountedReason = 'allChosen' | 'unrated';

/** A multiple choice with every one of its (at least two) options picked. */
const choseAllOptions = (question: RatedQuestion, chosen: AnswerOption[]): boolean =>
  question.multi === true && question.options.length > 1 && chosen.length === question.options.length;

/**
 * Why an answered `any` question does not count despite a selection: all options chosen or an unrated
 * option among them; both mean "anything is fine". `all` questions always count. Returns `undefined` if it counts.
 */
export function uncountedReason(question: RatedQuestion, chosen: AnswerOption[]): UncountedReason | undefined {
  if (question.mode !== 'any') return undefined;
  if (choseAllOptions(question, chosen)) return 'allChosen';
  if (chosen.some(isUnratedOption)) return 'unrated';
  return undefined;
}

/** A rated question in one of the given chapters; gates themselves are never muted or boosted. */
const inGatedChapter = (question: RatedQuestion, chapters: ReadonlySet<ChapterId>): boolean =>
  chapters.has(question.chapter);

function questionWeight(question: RatedQuestion, answer: PickedAnswer, boosted: ReadonlySet<ChapterId>): number {
  const importance = answer.importance === 'high' ? HIGH_IMPORTANCE_FACTOR : 1;
  const gateBoost = inGatedChapter(question, boosted) ? GATE_BOOST_FACTOR : 1;
  return TIER_WEIGHT[question.tier] * importance * gateBoost;
}

/**
 * Questions that count, in catalog order, so nothing depends on the order of the answers. "Don't care", muted
 * chapters, ruled-out questions and an `any` question with all options chosen or with an unrated option ("anything
 * is fine") do not count; the last would otherwise score one-sidedly.
 */
function countedQuestions(
  questions: Question[],
  answers: Answers,
  gates: GateState,
  ruledOut: ReadonlySet<QuestionId>,
): CountedQuestion[] {
  return questions.flatMap((question) =>
    ruledOut.has(question.id) ? [] : (toCounted(question, answers[question.id], gates) ?? []),
  );
}

function factionsOf(counted: CountedQuestion[]): Set<Faction> {
  return new Set(chosenEffects(counted).flatMap(({ effect }) => (effect.kind === 'faction' ? [effect.faction] : [])));
}

/** The question as it counts; undefined if unanswered, muted, without a known option or "anything is fine". */
function toCounted(
  question: Question,
  answer: Answer | undefined,
  { muted, boosted }: GateState,
): CountedQuestion | undefined {
  // A gate only steers its chapter; it never counts itself.
  if (question.kind === 'gate' || answer?.kind !== 'picked' || inGatedChapter(question, muted)) return undefined;
  const options = pickedOptions(question, answer);
  if (options.length === 0 || uncountedReason(question, options)) return undefined;
  return { question, options, weight: questionWeight(question, answer, boosted) };
}

/** An effect of a picked option, with the question and option it comes from. */
interface ChosenEffect {
  question: RatedQuestion;
  option: AnswerOption;
  effect: Effect;
}

/** Every effect of every picked option of the counted questions. */
export function chosenEffects(counted: CountedQuestion[]): ChosenEffect[] {
  return counted.flatMap(({ question, options }) =>
    options.flatMap((option) => option.effects.map((effect) => ({ question, option, effect }))),
  );
}

/** Does a picked option of this counted question carry an effect that passes `test`? */
export const hasChosenEffect = ({ options }: CountedQuestion, test: (effect: Effect) => boolean): boolean =>
  options.some((o) => o.effects.some(test));

/** Is there a counted preference for this scope? Without one all candidates are neutral (50 %). */
export function hasPreferenceFor({ counted }: Evaluation, scope: TraitScope): boolean {
  return counted.some((a) => hasChosenEffect(a, (e) => isPreferenceFor(e, scope)));
}
