import { uncountedReason } from '../domain/evaluation';
import type { Question } from '../domain/questions';
import type { Answer } from '../domain/answers';
import type { MessageKey } from './texts';
import { t } from './t';
import { isRequirement, readAnswer } from './answerState';
import { Icon, type IconName } from './Icon';
import { Tooltip } from './Tooltip';
import { cssModifier } from './format';

/** Status of a question: answered, not counting, or a special case that affects how it counts. */
type StatusKind = 'answered' | 'allChosen' | 'unrated' | 'dontCare' | 'high' | 'requirements' | 'notCounting';

const STATUS: Record<StatusKind, { label: MessageKey; text: MessageKey }> = {
  answered: { label: 'statusLabel_answered', text: 'statusAnswered' },
  allChosen: { label: 'statusLabel_allChosen', text: 'statusAllChosen' },
  unrated: { label: 'statusLabel_unrated', text: 'statusUnrated' },
  dontCare: { label: 'statusLabel_dontCare', text: 'statusDontCare' },
  high: { label: 'statusLabel_high', text: 'statusHigh' },
  requirements: { label: 'statusLabel_requirements', text: 'statusRequirements' },
  // The tooltip text is the reason handed in (see StatusBadge); this key only stands in.
  notCounting: { label: 'statusLabel_notCounting', text: 'statusLabel_notCounting' },
};

const STATUS_ICON: Record<Exclude<StatusKind, 'high'>, IconName> = {
  answered: 'check',
  allChosen: 'checkDouble',
  unrated: 'unrated',
  dontCare: 'dontCare',
  requirements: 'filter',
  notCounting: 'locked',
};

/** A separate icon per status; the explanation is in the tooltip. */
function statusIconContent(kind: StatusKind, count: number) {
  if (kind === 'high') return <span class="status-text">×2</span>;
  const icon = <Icon name={STATUS_ICON[kind]} />;
  return kind === 'requirements' ? (
    <>
      {icon}
      <span class="status-text">{count}</span>
    </>
  ) : (
    icon
  );
}

/** Precedence when several cases apply; without an answer only `notCounting` gives a status. */
function statusOf(question: Question, answer: Answer | undefined, notCounting: boolean): StatusKind | undefined {
  // Why a question does not count (switched-off chapter, unmet answer condition) outranks every other status, answered or not.
  if (notCounting) return 'notCounting';
  if (!answer) return undefined;
  const { dontCare, selected, high } = readAnswer(answer);
  if (dontCare) return 'dontCare';
  // Opening question options control the chapter, so "all picked" or "not rated" says nothing there.
  const chosen = question.options.filter((o) => selected.has(o.id));
  const uncounted = question.kind === 'gate' ? undefined : uncountedReason(question, chosen);
  if (uncounted) return uncounted;
  if (high) return 'high';
  if (isRequirement(question) && chosen.length >= 2) return 'requirements';
  return 'answered';
}

/** Status icon in a question's header row, with a short name for screen readers and an explanation in the tooltip. */
export function StatusBadge({
  question,
  answer,
  notCountingReason,
}: {
  question: Question;
  answer: Answer | undefined;
  /** Set while the question does not count: why, as a sentence for the tooltip. */
  notCountingReason?: string;
}) {
  const status = statusOf(question, answer, notCountingReason !== undefined);
  if (!status) return null;
  const count = question.options.filter((o) => readAnswer(answer).selected.has(o.id)).length;
  return (
    <Tooltip
      class={`status-badge status-${cssModifier(status)}`}
      label={t(STATUS[status].label, { count })}
      text={notCountingReason ?? t(STATUS[status].text, { count })}
      dataAttributes={{ status }}
    >
      <span class="status-icon" aria-hidden="true">
        {statusIconContent(status, count)}
      </span>
    </Tooltip>
  );
}
