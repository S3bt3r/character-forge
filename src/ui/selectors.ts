import type { Question, ChapterId } from '../domain/questions';
import type { QuestionDef } from '../data/display';
import type { Answers } from '../domain/answers';
import type { Evaluation } from '../domain/evaluation';
import { QUESTIONS } from './catalog';

/** Opening questions only control how a chapter counts; they do not count in the progress. */
const countsForProgress = (q: Question): boolean => q.kind === 'rated';

/** What takes questions out of the count: switched-off chapters and answer conditions other answers rule out. */
type NotCounting = Pick<Evaluation, 'muted' | 'ruledOut'>;

/**
 * A question is done if it has an answer (including "Don't care"), is in a switched-off chapter or has a ruled-out
 * answer condition, because nothing is left to do there.
 */
const isDone = (q: Question, answers: Answers, { muted, ruledOut }: NotCounting): boolean =>
  Boolean(answers[q.id]) || muted.has(q.chapter) || ruledOut.has(q.id);

/** Questions that count in the progress (without opening questions), in catalog order. */
export const PROGRESS_QUESTIONS = QUESTIONS.filter(countsForProgress);

export const progressQuestionsIn = (chapter: ChapterId): QuestionDef[] =>
  PROGRESS_QUESTIONS.filter((q) => q.chapter === chapter);

/** Number of done questions (see `isDone`). */
export const doneCount = (questions: Question[], answers: Answers, notCounting: NotCounting): number =>
  questions.filter((q) => isDone(q, answers, notCounting)).length;
