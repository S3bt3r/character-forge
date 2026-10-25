import { useEffect, useState } from 'preact/hooks';
import type { Evaluation } from '../domain/evaluation';
import type { AnswerCondition, ChapterId, Question } from '../domain/questions';
import type { Answer, Answers } from '../domain/answers';
import type { OptionId, QuestionId } from '../domain/ids';
import type { MessageKey } from './texts';
import { loc, t } from './t';
import { CHAPTERS, QUESTIONS, questionById } from './catalog';
import { classNames } from './format';
import { doneCount, PROGRESS_QUESTIONS, progressQuestionsIn } from './selectors';
import { QuestionCard } from './QuestionCard';

interface Props {
  answers: Answers;
  /** The evaluated answers, computed once in App: switched-off and boosted chapters, ruled-out questions. */
  evaluation: Evaluation;
  onAnswer: (questionId: QuestionId, answer: Answer | undefined) => void;
}

const CHAPTER_ANCHOR_PREFIX = 'chapter-';
const chapterAnchorId = (chapter: ChapterId) => `${CHAPTER_ANCHOR_PREFIX}${chapter}`;

/** Running number "Question N"; opening questions do not count (as in the progress). */
const NUMBER = new Map(PROGRESS_QUESTIONS.map((q, i) => [q.id, i + 1]));

/** Each chapter's opening question. */
const GATES = new Map(QUESTIONS.flatMap((q) => (q.kind === 'gate' ? [[q.chapter, q] as const] : [])));

/**
 * Why a switched-off chapter does not count: its gate and the picked muting option. Only for chapters the evaluation
 * mutes, which happens only through a muting option of their gate.
 */
function chapterOffReason(chapter: ChapterId, answers: Answers): string {
  const gate = GATES.get(chapter)!;
  const answer = answers[gate.id];
  const picked: readonly OptionId[] = answer?.kind === 'picked' ? answer.optionIds : [];
  const option = gate.options.find((o) => picked.includes(o.id) && gate.gate.mute.includes(o.id))!;
  return t('chapterOff', { question: loc(gate.short), option: loc(option.label) });
}

/** The answers the question depends on, none of which is picked. */
function conditionReason({ question: targetId, options }: AnswerCondition): string {
  const target = questionById.get(targetId)!;
  const labels = target.options.filter((o) => options.includes(o.id)).map((o) => loc(o.label));
  return t('conditionUnmet', { question: loc(target.short), options: labels.join(', ') });
}

/** Why a question does not count right now, as shown in its status; undefined while it counts. */
function notCountingReason(question: Question, answers: Answers, evaluation: Evaluation): string | undefined {
  if (question.kind !== 'rated') return undefined;
  if (evaluation.muted.has(question.chapter)) return chapterOffReason(question.chapter, answers);
  if (evaluation.ruledOut.has(question.id) && question.appliesIf) return conditionReason(question.appliesIf);
  return undefined;
}

type GateLevel = 'boosted' | 'normal' | 'muted';

const GATE_BADGE: Record<GateLevel, MessageKey> = {
  boosted: 'gateBadgeBoosted',
  normal: 'gateBadgeNormal',
  muted: 'gateBadgeMuted',
};

/** State of a chapter's opening question; undefined as long as there is none or it is unanswered. */
function gateLevel(
  chapter: ChapterId,
  answers: Answers,
  muted: ReadonlySet<ChapterId>,
  boosted: ReadonlySet<ChapterId>,
): GateLevel | undefined {
  const gate = GATES.get(chapter);
  if (!gate || !answers[gate.id]) return undefined;
  if (muted.has(chapter)) return 'muted';
  if (boosted.has(chapter)) return 'boosted';
  return 'normal';
}

/** Share of done questions in percent; an empty chapter counts as 0. */
const progressPercent = (done: number, total: number): number => (total ? (done / total) * 100 : 0);

/** Line, diamond and line below the chapter name. */
function Ornament() {
  return (
    <svg class="ornament" width="220" height="14" viewBox="0 0 220 14" aria-hidden="true">
      <path d="M0 7 H96 M124 7 H220" stroke="currentColor" stroke-opacity="0.5" />
      <path d="M110 1 L116 7 L110 13 L104 7 Z" fill="none" stroke="currentColor" />
      <circle cx="110" cy="7" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Highlights, in the jump-link bar, the chapter currently in the upper screen area. */
function useActiveChapter(): ChapterId {
  const [active, setActive] = useState<ChapterId>(CHAPTERS[0]!.id);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id.slice(CHAPTER_ANCHOR_PREFIX.length);
        if (id) setActive(id as ChapterId);
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(chapterAnchorId(c.id));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Questionnaire({ answers, evaluation, onAnswer }: Props) {
  const active = useActiveChapter();
  const { muted, boosted } = evaluation;
  return (
    <section class="questionnaire">
      <nav class="chapter-nav" aria-label={t('chaptersNav')}>
        <p class="chapter-nav-title" aria-hidden="true">
          {t('chaptersNav')}
        </p>
        {CHAPTERS.map((c) => {
          const qs = progressQuestionsIn(c.id);
          const done = doneCount(qs, answers, evaluation);
          const gate = gateLevel(c.id, answers, muted, boosted);
          const current = c.id === active;
          const chipClass = classNames(
            'chapter-chip',
            current && 'current',
            gate === 'muted' && 'muted',
            done === qs.length && 'complete',
          );
          return (
            <a
              key={c.id}
              href={`#${chapterAnchorId(c.id)}`}
              class={chipClass}
              aria-current={current ? 'location' : undefined}
            >
              <span class="chapter-chip-row">
                <span class="chapter-chip-name">{loc(c.title)}</span>
                {gate === 'boosted' && <span class="gate-marker boosted">{t('gateMarkerBoosted')}</span>}
                {gate === 'muted' && <span class="gate-marker muted">{t('gateMarkerMuted')}</span>}
                <span class="count">{`${done}/${qs.length}`}</span>
              </span>
              <span class="chapter-chip-bar" aria-hidden="true">
                <span style={{ width: `${progressPercent(done, qs.length)}%` }} />
              </span>
            </a>
          );
        })}
      </nav>

      <div class="chapters">
        {CHAPTERS.map((c) => {
          const gate = gateLevel(c.id, answers, muted, boosted);
          return (
            <section key={c.id} id={chapterAnchorId(c.id)} class="chapter">
              <header class="chapter-head">
                <h2>{loc(c.title)}</h2>
                <Ornament />
                <p>{loc(c.intro)}</p>
                {gate && <span class={`gate-badge ${gate}`}>{t(GATE_BADGE[gate])}</span>}
              </header>
              {QUESTIONS.filter((q) => q.chapter === c.id).map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  answer={answers[q.id]}
                  onChange={(a) => onAnswer(q.id, a)}
                  number={NUMBER.get(q.id)}
                  notCountingReason={notCountingReason(q, answers, evaluation)}
                />
              ))}
            </section>
          );
        })}
      </div>
    </section>
  );
}
