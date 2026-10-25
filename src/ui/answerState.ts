import type { OptionId } from '../domain/ids';
import { isMultipleChoice, type Question } from '../domain/questions';
import type { Answer } from '../domain/answers';

/** Shared reading of an answer for tiles, weight selection and status. */
export function readAnswer(answer: Answer | undefined) {
  const dontCare = answer?.kind === 'dontCare';
  const picked = answer?.kind === 'picked' ? answer : undefined;
  return { dontCare, selected: new Set(picked?.optionIds), high: picked?.importance === 'high' };
}

/** Selection after clicking an option: a single choice toggles it alone, a multiple choice adds or removes it, in catalog order. */
export function toggledSelection(question: Question, selected: ReadonlySet<OptionId>, optionId: OptionId): OptionId[] {
  if (!isMultipleChoice(question)) return selected.has(optionId) ? [] : [optionId];
  return question.options.map((o) => o.id).filter((id) => (id === optionId ? !selected.has(id) : selected.has(id)));
}

/** Weight levels of the weight selection: "Normal" for weightable questions, "Counts" for the others. */
export type WeightChoice = 'dontCare' | 'normal' | 'high' | 'count';

/** Selected weight level; undefined without an answer. */
export function currentWeight(answer: Answer | undefined, weighable: boolean): WeightChoice | undefined {
  const { dontCare, high } = readAnswer(answer);
  if (dontCare) return 'dontCare';
  if (high) return 'high';
  if (!answer) return undefined;
  return weighable ? 'normal' : 'count';
}

/** Multiple choice scored as a requirement (`all`): the class should bring every chosen option. */
export const isRequirement = (question: Question): boolean =>
  question.kind === 'rated' && question.multi && question.mode === 'all';
