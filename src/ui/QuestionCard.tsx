import { useId } from 'preact/hooks';
import { isUnratedOption } from '../domain/evaluation';
import { isMultipleChoice, isWeighable, type QuestionTier } from '../domain/questions';
import type { OptionDef, QuestionDef } from '../data/display';
import type { Faction } from '../domain/catalog';
import type { OptionId } from '../domain/ids';
import { pickedAnswer, type Answer } from '../domain/answers';
import { loc, t } from './t';
import { isRequirement, readAnswer, toggledSelection } from './answerState';
import { classNames } from './format';
import { Icon } from './Icon';
import { arrowStep, neighbor } from './keyboard';
import { StatusBadge } from './StatusBadge';
import { Tooltip } from './Tooltip';
import { WeightSelector } from './WeightSelector';

interface Props {
  question: QuestionDef;
  answer: Answer | undefined;
  onChange: (answer: Answer | undefined) => void;
  /** Running number excluding opening questions; absent for opening questions. */
  number?: number;
  /** Set while the question does not count (switched-off chapter, unmet answer condition): why, for its status. */
  notCountingReason?: string;
}

/** Number of influence diamonds per tier. */
const INFLUENCE: Record<QuestionTier, 1 | 2 | 3 | 4> = { pillar: 4, core: 3, dynamic: 2, fine: 1 };

/** Tile width: deal-breakers compact, faction wide, many options somewhat narrower. */
function tileMin(question: QuestionDef): string {
  if (question.chapter === 'dealbreakers') return '230px';
  if (question.id === 'faction') return '260px';
  return question.options.length >= 5 ? '200px' : '210px';
}

/** The faction an option picks, if it is a faction option; it decides the crest. */
const factionOf = (option: OptionDef): Faction | undefined => option.effects.find((e) => e.kind === 'faction')?.faction;

function Crest({ faction }: { faction: Faction }) {
  const horde = faction === 'horde';
  return (
    <svg class={`crest faction-${faction}`} width="34" height="40" viewBox="0 0 40 46" aria-hidden="true">
      <path d="M20 2 L37 8 V22 C37 33 29 40 20 44 C11 40 3 33 3 22 V8 Z" stroke-width="2" />
      <path
        d={horde ? 'M11 14 L20 34 L29 14 M15 22 H25' : 'M20 11 V35 M12 19 H28'}
        fill="none"
        stroke-width="2.2"
        stroke-linecap="round"
      />
    </svg>
  );
}

export function QuestionCard({ question, answer, onChange, number, notCountingReason }: Props) {
  const titleId = useId();
  const { dontCare, selected, high } = readAnswer(answer);
  const isGate = question.kind === 'gate';
  const multi = isMultipleChoice(question);
  // Only weightable questions show their influence; a gate awards no points itself.
  const level = question.kind === 'rated' && isWeighable(question) ? INFLUENCE[question.tier] : undefined;
  const requirement = isRequirement(question);

  function toggle(optionId: OptionId) {
    onChange(pickedAnswer(toggledSelection(question, selected, optionId), high));
  }

  // Single choice follows the same pattern; multiple-choice tiles are checkboxes and stay individually reachable via Tab.
  const tileStop = question.options.find((o) => selected.has(o.id))?.id ?? question.options[0]?.id;

  function onTileKey(e: KeyboardEvent) {
    if (multi) return;
    const step = arrowStep(e);
    if (!step) return;
    e.preventDefault();
    const ids = question.options.map((o) => o.id);
    // The DOM only holds a string; the option ID comes from the question itself.
    const focused = (e.target as HTMLElement).closest<HTMLElement>('[data-option]')?.dataset['option'];
    const from = question.options.find((o) => o.id === focused)?.id ?? tileStop;
    const next = neighbor(ids, from, step);
    onChange(pickedAnswer([next], high));
    (e.currentTarget as HTMLElement).querySelector<HTMLElement>(`[data-option="${next}"]`)?.focus();
  }

  const classes = classNames(
    'question',
    isGate && 'gate',
    dontCare && 'dont-care',
    notCountingReason !== undefined && 'muted',
  );

  return (
    <fieldset class={classes} data-question={question.id} aria-labelledby={titleId}>
      <div class="question-head">
        <div class="question-meta">
          <span class="question-number">{isGate ? t('gateLabel') : t('questionNumber', { n: number ?? 0 })}</span>
          {level !== undefined && (
            <Tooltip class="influence" label={t('influenceLabel', { level })} text={t(`influence_${level}`)}>
              {[1, 2, 3, 4].map((i) => (
                <span key={i} class={`diamond${i <= level ? ' filled' : ''}`} />
              ))}
            </Tooltip>
          )}
          {requirement && (
            <Tooltip class="strict-badge" text={t('strictTip')}>
              <Icon name="filter" size={12} />
              {t('strictBadge')}
            </Tooltip>
          )}
          <StatusBadge question={question} answer={answer} notCountingReason={notCountingReason} />
          {answer && (
            <button type="button" class="link reset" onClick={() => onChange(undefined)}>
              {t('reset')}
            </button>
          )}
        </div>
        <h3 id={titleId}>{loc(question.text)}</h3>
        {question.help && <p class="help">{loc(question.help)}</p>}
      </div>

      <div
        class={`options${question.chapter === 'dealbreakers' ? ' compact' : ''}`}
        role={multi ? 'group' : 'radiogroup'}
        aria-labelledby={titleId}
        style={{ '--tile-min': tileMin(question) }}
        onKeyDown={onTileKey}
      >
        {question.options.map((option) => {
          const on = selected.has(option.id);
          const crestFaction = factionOf(option);
          return (
            <button
              key={option.id}
              type="button"
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={on}
              tabIndex={multi || option.id === tileStop ? 0 : -1}
              class={`option${on ? ' selected' : ''}`}
              data-option={option.id}
              onClick={() => toggle(option.id)}
            >
              {crestFaction && <Crest faction={crestFaction} />}
              <span class="option-text">
                <span class="option-head">
                  <span class="option-label">{loc(option.label)}</span>
                  <span class={`indicator ${multi ? 'box' : 'circle'}`} aria-hidden="true">
                    {on && (multi ? <Icon name="check" size={13} stroke={3.4} /> : <span class="dot" />)}
                  </span>
                </span>
                {option.hint && <small>{loc(option.hint)}</small>}
                {multi && !isGate && isUnratedOption(option) && <span class="unrated">{t('unratedBadge')}</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* An opening question needs no weight: its options already decide how the chapter counts. */}
      {!isGate && (
        <div class="question-foot">
          <div class="weight-wrap">
            <WeightSelector question={question} answer={answer} onChange={onChange} />
          </div>
        </div>
      )}
    </fieldset>
  );
}
