import type { Answer, Answers } from '../domain/answers';
import type { QuestionId } from '../domain/ids';

/*
 * The rules of the actions that change the answers, as pure functions: what the new answers are and whether an action
 * needs the user's consent first. Storage, dialogs and texts stay with the caller in the UI.
 */

/** The answers with `answer` for the question, or without the question for `undefined`; `answers` stays unchanged. */
export function withAnswer(answers: Answers, questionId: QuestionId, answer: Answer | undefined): Answers {
  const next = { ...answers };
  if (answer) next[questionId] = answer;
  else delete next[questionId];
  return next;
}

/** An import replaces the answers, so it needs the user's consent once there are any. */
export const importNeedsConsent = (current: Answers): boolean => Object.keys(current).length > 0;
