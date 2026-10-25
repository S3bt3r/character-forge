import { isWeighable, type Question } from '../domain/questions';
import { pickedAnswer, type Answer } from '../domain/answers';
import { t } from './t';
import { currentWeight, readAnswer, type WeightChoice } from './answerState';
import { arrowStep, neighbor } from './keyboard';
import { cssModifier } from './format';

interface Props {
  question: Question;
  answer: Answer | undefined;
  onChange: (answer: Answer | undefined) => void;
}

/** Weight selection of a question: "Don't care | Normal | Important", for non-weightable questions "Don't care | Counts". */
export function WeightSelector({ question, answer, onChange }: Props) {
  const { dontCare, selected, high } = readAnswer(answer);
  const weighable = isWeighable(question);
  const weights: WeightChoice[] = weighable ? ['dontCare', 'normal', 'high'] : ['dontCare', 'count'];
  const base: WeightChoice = weighable ? 'normal' : 'count';
  // Without an answer, no weight level is selected; the group's tab stop is then "Normal" or "Counts".
  const current = currentWeight(answer, weighable);
  const tabbable: WeightChoice = current ?? base;

  function setWeight(weight: WeightChoice) {
    if (weight === 'dontCare') onChange({ kind: 'dontCare' });
    else if (weight === 'high') {
      if (selected.size > 0) onChange(pickedAnswer([...selected], true));
    } else if (dontCare) onChange(undefined);
    else if (high) onChange(pickedAnswer([...selected], false));
  }

  const enabled = (w: WeightChoice) => w !== 'high' || selected.size > 0;

  /** Radio group per the ARIA pattern: arrow keys select the neighbor (with wrap-around) and move focus there. */
  function onKey(e: KeyboardEvent) {
    const step = arrowStep(e);
    if (!step) return;
    e.preventDefault();
    const usable = weights.filter(enabled);
    const from = ((e.target as HTMLElement).dataset['weight'] as WeightChoice | undefined) ?? tabbable;
    const next = neighbor(usable, from, step);
    setWeight(next);
    (e.currentTarget as HTMLElement).querySelector<HTMLElement>(`[data-weight="${next}"]`)?.focus();
  }

  return (
    <div class="weight" role="radiogroup" aria-label={t('weightLabel')} onKeyDown={onKey}>
      {weights.map((w) => (
        <button
          key={w}
          type="button"
          role="radio"
          aria-checked={w === current}
          tabIndex={w === tabbable ? 0 : -1}
          disabled={!enabled(w)}
          class={`weight-${cssModifier(w)}`}
          data-weight={w}
          onClick={() => setWeight(w)}
        >
          {t(`weight_${w}`)}
        </button>
      ))}
    </div>
  );
}
