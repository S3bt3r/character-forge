import { pickedAnswer, type Answer, type Answers, type PickedAnswer } from '../domain/answers';
import { isMultipleChoice, isWeighable, type Question } from '../domain/questions';
import type { OptionId } from '../domain/ids';

/** Maximum length for IDs and version identifiers from an external source (share code, storage); single place. */
const MAX_ID_LENGTH = 64;

/** Non-empty identifier up to `MAX_ID_LENGTH` characters. */
export const isValidId = (v: unknown): v is string =>
  typeof v === 'string' && v.length > 0 && v.length <= MAX_ID_LENGTH;

/** List of valid identifiers. */
export const isIdList = (v: unknown): v is string[] => Array.isArray(v) && v.every(isValidId);

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Options an answer keeps: every known option of a multiple choice once, the first of a single choice; IDs as the catalog has them. */
function keptOptions(question: Question, optionIds: string[]): OptionId[] {
  const known = [...new Set(optionIds)].flatMap((id) => question.options.find((o) => o.id === id)?.id ?? []);
  return isMultipleChoice(question) ? known : known.slice(0, 1);
}

/** An answer as it arrives from outside, already in shape: "Don't care" or picked option IDs. */
export type RawChoice = 'dontCare' | { optionIds: string[]; high: boolean };

/** An entry from outside: the question ID and its choice; no choice if the entry is not an answer at all. */
type RawEntry = [questionId: string, choice: RawChoice | undefined];

/**
 * Checks answers from an external source (share code, localStorage) against the current catalog.
 * Unknown IDs are discarded instead of rejected so that codes from older data versions keep working.
 */
export function sanitizeAnswers(entries: RawEntry[], questions: Question[]): Answers {
  const byId = new Map<string, Question>(questions.map((q) => [q.id, q]));
  const answers: Answers = {};
  for (const [questionId, choice] of entries) {
    const question = byId.get(questionId);
    // Unknown and repeated questions and entries that are no answer are dropped as a whole.
    if (!question || !choice || answers[question.id]) continue;
    const answer = sanitizeChoice(question, choice);
    if (answer) answers[question.id] = answer;
  }
  return answers;
}

/** The answer a choice yields for its question; undefined if no known option is left, also when its list was empty. */
function sanitizeChoice(question: Question, choice: RawChoice): Answer | undefined {
  // A gate offers no "Don't care"; a stored one counts as no answer, which leaves its chapter as it is.
  if (choice === 'dontCare') return question.kind === 'gate' ? undefined : { kind: 'dontCare' };
  // Importance exists only where the weight selection offers it.
  return pickedAnswer(keptOptions(question, choice.optionIds), choice.high && isWeighable(question));
}

/** Reads the object format (`Answers`) from an unknown source; invalid entries are discarded. */
export function sanitizeAnswerObject(raw: unknown, questions: Question[]): Answers {
  const entries = isRecord(raw)
    ? Object.entries(raw).map(([questionId, value]): RawEntry => [questionId, rawChoice(value)])
    : [];
  return sanitizeAnswers(entries, questions);
}

/**
 * The stored form of answers (draft and profiles), written explicitly so that a change of the domain type cannot
 * silently change it; `rawChoice` reads exactly this form back.
 */
export function storedAnswers(answers: Answers): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(answers).flatMap(([id, answer]) =>
      answer ? [[id, answer.kind === 'dontCare' ? { kind: 'dontCare' } : storedPick(answer)]] : [],
    ),
  );
}

const storedPick = (answer: PickedAnswer) => ({
  kind: 'picked',
  optionIds: answer.optionIds,
  importance: answer.importance,
});

/** The stored form of an `Answer` (see `storedAnswers`), or undefined for anything else. */
function rawChoice(value: unknown): RawChoice | undefined {
  if (!isRecord(value)) return undefined;
  if (value['kind'] === 'dontCare') return 'dontCare';
  if (value['kind'] !== 'picked' || !isIdList(value['optionIds'])) return undefined;
  return { optionIds: value['optionIds'], high: value['importance'] === 'high' };
}
