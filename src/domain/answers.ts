import type { OptionId, QuestionId } from './ids';

export type Importance = 'normal' | 'high';

/** The picked options of a question (at least one) and how much the question matters. */
export interface PickedAnswer {
  kind: 'picked';
  optionIds: [OptionId, ...OptionId[]];
  importance: Importance;
}

/** "Don't care" counts as answered but scores nothing; picked options score with their importance. */
export type Answer = { kind: 'dontCare' } | PickedAnswer;

/** Answers per question; a question without an entry is unanswered. */
export type Answers = Partial<Record<QuestionId, Answer>>;

/** Picked options as an answer; undefined without options, because an answer always picks at least one. */
export function pickedAnswer(optionIds: OptionId[], high: boolean): PickedAnswer | undefined {
  const [first, ...rest] = optionIds;
  if (first === undefined) return undefined;
  return { kind: 'picked', optionIds: [first, ...rest], importance: high ? 'high' : 'normal' };
}
