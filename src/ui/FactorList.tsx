import { useState } from 'preact/hooks';
import type { Factor, Penalty } from '../domain/scoring';
import { loc, t } from './t';
import { optionLabel, penaltyReason, questionById } from './catalog';
import { Icon } from './Icon';
import { ProvenanceBadge } from './ProvenanceBadge';
import type { SpecId } from '../domain/ids';
import type { Evidence } from '../data/display';
import { groupCons, groupFactors, type FactorGroup } from './factor-groups';

/** "Question: answer" of a point. */
function factorText(f: Factor): string {
  const label = optionLabel(f.questionId, f.optionId);
  const question = questionById.get(f.questionId);
  return `${question ? `${loc(question.short)}: ` : ''}${label ? loc(label) : f.optionId}`;
}

const factorsText = (factors: Factor[]) => factors.map(factorText).join(' · ');

/** Note and provenance badge per evidence entry, each as its own group; without any entry the badge alone marks the value as unrated. */
function FactorEvidence({ evidence }: { evidence: Evidence[] }) {
  if (evidence.length === 0) return <ProvenanceBadge evidence={undefined} noteShown={false} />;
  return (
    <>
      {evidence.map((e, i) => (
        <span key={i} class="factor-evidence">
          {e.note && <small class="note">{loc(e.note)}</small>}
          <ProvenanceBadge evidence={e} noteShown={Boolean(e.note)} />
        </span>
      ))}
    </>
  );
}

interface Props {
  /** Complete, sorted pro points (`matches` of a result). */
  matches: Factor[];
  /** Complete, sorted con points (`conflicts` of a result). */
  conflicts: Factor[];
  penalties: Penalty[];
  /** Shows only the first `limit` points per side and offers "Show n more" (live ranking). */
  limit?: number;
  specId?: SpecId | undefined;
  /** Heading level of the two columns; one below the surrounding section (`h4` inside a profession pair). */
  headingLevel?: 'h3' | 'h4';
}

/** Expand button for the points beyond the short list; appears only if there are any. */
function MoreToggle({ hidden, open, onToggle }: { hidden: number; open: boolean; onToggle: () => void }) {
  if (hidden <= 0) return null;
  return (
    <button type="button" class="link more-factors" aria-expanded={open} onClick={onToggle}>
      {open ? t('showFewerFactors') : t('showMoreFactors', { count: hidden })}
    </button>
  );
}

export function FactorList({ matches, conflicts, penalties, specId, limit, headingLevel: Heading = 'h3' }: Props) {
  const [openGood, setOpenGood] = useState(false);
  const [openBad, setOpenBad] = useState(false);
  // Points that rest on the same note are one entry, so the short list and "Show n more" count entries.
  const good = groupFactors(matches, specId);
  const bad = groupCons(conflicts, penalties, specId);
  const shown = (list: FactorGroup[], open: boolean) => (limit === undefined || open ? list : list.slice(0, limit));
  const hidden = (list: FactorGroup[]) => (limit === undefined ? 0 : list.length - limit);
  const item = (g: FactorGroup, tone: 'good' | 'bad') => {
    const first = g.factors[0]!;
    return (
      <li key={`${first.questionId}/${first.optionId}`}>
        <span class="factor-line">
          <span class="sign" aria-hidden="true">
            {tone === 'good' ? '+' : '−'}
          </span>
          <span>{factorsText(g.factors)}</span>
        </span>
        {specId && first.scope === 'spec' && <FactorEvidence evidence={g.evidence} />}
      </li>
    );
  };
  return (
    <div class="factor-grid">
      <div class="factors good">
        <Heading>{t('whyGood')}</Heading>
        <ul>{shown(good, openGood).map((g) => item(g, 'good'))}</ul>
        <MoreToggle hidden={hidden(good)} open={openGood} onToggle={() => setOpenGood(!openGood)} />
      </div>
      <div class="factors bad">
        <Heading>{t('whyBad')}</Heading>
        <ul>
          {shown(bad.conflicts, openBad).map((g) => item(g, 'bad'))}
          {bad.penalties.map(({ penalty: p, also, evidence }) => (
            <li key={`${p.questionId}/${p.optionId}/${p.scope}/${p.trait}`} class="penalty">
              <span class="factor-line">
                <span class="sign">
                  <Icon name="warning" size={13} />
                </span>
                <span>{loc(penaltyReason(p))}</span>
              </span>
              <small class="penalty-cost">{t('penaltyCost', { points: p.points })}</small>
              {also.length > 0 && <small class="penalty-also">{t('alsoFactors', { items: factorsText(also) })}</small>}
              {evidence.length > 0 && <FactorEvidence evidence={evidence} />}
            </li>
          ))}
          {conflicts.length === 0 && penalties.length === 0 && <li class="ok">{t('noConflicts')}</li>}
        </ul>
        <MoreToggle hidden={hidden(bad.conflicts)} open={openBad} onToggle={() => setOpenBad(!openBad)} />
      </div>
    </div>
  );
}
