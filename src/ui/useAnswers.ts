import { useEffect, useMemo, useState } from 'preact/hooks';
import { withAnswer } from '../app/commands';
import type { Answer, Answers } from '../domain/answers';
import type { QuestionId } from '../domain/ids';
import { browserStorage, createProfileStore } from '../persistence/storage';
import { QUESTIONS } from './catalog';

/** Answers with a draft in storage: loaded at startup, saved after every change. */
export function useAnswers() {
  const store = useMemo(() => createProfileStore(browserStorage, QUESTIONS), []);
  const [answers, setAnswers] = useState<Answers>(() => store.loadDraft());
  useEffect(() => store.saveDraft(answers), [store, answers]);

  /** Sets or removes (`undefined`) the answer to a question. */
  function setAnswer(questionId: QuestionId, answer: Answer | undefined) {
    setAnswers((prev) => withAnswer(prev, questionId, answer));
  }

  return { store, answers, setAnswers, setAnswer };
}
