import { MAX_FACTORS, type Percent } from '../domain/scoring';
import { bestSpec, classScore, type ClassResult } from '../domain/class-scoring';
import type { Faction } from '../domain/catalog';
import type { RankingNotice } from '../app/recommendation';
import { useState } from 'preact/hooks';
import type { MessageKey } from './texts';
import { loc, t } from './t';
import { classById, specById } from './catalog';
import { FactorList } from './FactorList';
import { factionLabel, nameColor, textColorOn, pct, topCardSurface } from './format';
import { Ring } from './Ring';
import type { ClassId } from '../domain/ids';

/** The app names the notice; which text shows it is the UI's business. */
const NOTICE_TEXT: Record<RankingNotice, MessageKey> = { noRating: 'noRating', fewAnswers: 'fewAnswers' };

interface Props {
  ranking: ClassResult[];
  /** Chosen faction; undefined while no faction is chosen. */
  faction: Faction | undefined;
  /** Notice above the ranking while the percentages (still) say little. */
  notice?: RankingNotice;
  /** Opens the character sheet; `trigger` gets the focus back afterwards. */
  onOpenSheet: (classId: ClassId, trigger: HTMLElement) => void;
}

function ScoreRing({ score, color }: { score: Percent; color: string }) {
  return (
    <span class="score-ring-wrap">
      <Ring class="score-ring" size={66} radius={27} fraction={score / 100} color={color} />
      <span class="score-value">{pct(score)}</span>
    </span>
  );
}

export function Ranking({ ranking, faction, notice, onOpenSheet }: Props) {
  // Accordion: exactly one rank is open as a widget. Without an own choice (or if the class drops out), it is rank 1.
  const [chosenClassId, setChosenClassId] = useState<ClassId | undefined>(undefined);
  const openClassId = ranking.some((r) => r.classId === chosenClassId) ? chosenClassId : ranking[0]?.classId;
  return (
    <section class="ranking">
      <header class="ranking-header">
        <div>
          <h2>{t('rankingTitle')}</h2>
        </div>
        <span class={`faction-badge faction-${faction ?? 'any'}`}>
          {faction ? factionLabel(faction) : t('factionAny')}
        </span>
      </header>
      {notice && <p class="notice">{t(NOTICE_TEXT[notice])}</p>}
      {ranking.length === 0 && <p class="notice">{t('noResults')}</p>}
      <ol>
        {ranking.map((r, i) => (
          <RankingItem
            key={r.classId}
            result={r}
            place={i + 1}
            open={r.classId === openClassId}
            onOpen={() => setChosenClassId(r.classId)}
            onOpenSheet={onOpenSheet}
          />
        ))}
      </ol>
    </section>
  );
}

interface ItemProps {
  result: ClassResult;
  place: number;
  open: boolean;
  onOpen: () => void;
  onOpenSheet: Props['onOpenSheet'];
}

/**
 * One rank in the accordion. The header is the same button in both states (same position in the tree),
 * so that focus is kept on expanding.
 */
function RankingItem({ result, place, open, onOpen, onOpenSheet }: ItemProps) {
  const cls = classById.get(result.classId)!;
  const best = bestSpec(result);
  const spec = specById.get(best.specId)!;
  const color = open ? nameColor(cls.color, topCardSurface(cls.color)) : nameColor(cls.color);
  return (
    <li class={`ranking-item${open ? ' open' : ''}`} style={{ '--class-color': cls.color }}>
      <button type="button" class="ranking-head" aria-expanded={open} onClick={onOpen}>
        {open ? (
          <span class="rank-diamond">
            <span class="rank">{place}</span>
          </span>
        ) : (
          <span class="rank">{place}</span>
        )}
        <span class="class-diamond" style={{ backgroundColor: cls.color }} />
        <span class="class-title">
          <span class="class-name" style={{ color }}>
            {loc(cls.name)}
          </span>
          <span class="spec-name">{loc(spec.name)}</span>
        </span>
        {open ? (
          <ScoreRing score={classScore(result)} color={cls.color} />
        ) : (
          <span class="score-value">{pct(classScore(result))}</span>
        )}
      </button>
      {open && (
        <div class="ranking-body">
          <p class="class-summary">{loc(cls.summary)}</p>
          <FactorList
            matches={best.matches}
            conflicts={best.conflicts}
            limit={MAX_FACTORS}
            penalties={best.penalties}
            specId={best.specId}
          />
          <button
            type="button"
            class="open-sheet"
            style={{ backgroundColor: cls.color, color: textColorOn(cls.color) }}
            aria-haspopup="dialog"
            onClick={(e) => onOpenSheet(result.classId, e.currentTarget)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="3" width="16" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="2" />
              <path d="M8 8 H16 M8 12 H16 M8 16 H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            {t('openSheet')}
          </button>
        </div>
      )}
    </li>
  );
}
