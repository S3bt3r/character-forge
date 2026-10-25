import type { ProfessionPairResult, ProfessionResult, Synergy } from '../domain/professions-scoring';
import type { ClassRecommendation } from '../app/recommendation';
import type { ProfessionId } from '../domain/ids';
import type { MessageKey } from './texts';
import { loc, t } from './t';
import { PROFESSION_TRAITS, professionById } from './catalog';
import { EvidenceList } from './EvidenceList';
import { FactorList } from './FactorList';
import { pct } from './format';

const SYNERGY_LABEL: Record<Synergy['kind'], MessageKey> = {
  partner: 'synergyPartner',
  class: 'synergyClass',
  race: 'synergyRace',
};

const nameOf = (id: ProfessionId) => loc(professionById.get(id)!.name);

const ProfessionEvidence = ({ id }: { id: ProfessionId }) => (
  <div class="profession-evidence" data-profession={id}>
    <EvidenceList evidence={professionById.get(id)!.evidence} traits={PROFESSION_TRAITS} />
  </div>
);

function Pair({ pair }: { pair: ProfessionPairResult }) {
  return (
    <div class="pair">
      <div class="pair-head">
        <strong>{pair.professionIds.map(nameOf).join(' + ')}</strong>
        <span class="pair-score">{pct(pair.score)}</span>
      </div>
      <ul class="tags">
        {pair.synergies.map((s) => (
          <li key={`${s.kind}-${s.professionId}`} class="tag">
            {t(SYNERGY_LABEL[s.kind])}
            {s.kind !== 'partner' && `: ${nameOf(s.professionId)}`}
          </li>
        ))}
      </ul>
      {/* Reasons only once a profession question is answered. */}
      {(pair.matches.length > 0 || pair.conflicts.length > 0) && (
        <FactorList matches={pair.matches} conflicts={pair.conflicts} penalties={[]} headingLevel="h4" />
      )}
      {pair.professionIds.map((id) => (
        <div key={id}>
          <p class="help">
            <strong>{nameOf(id)}:</strong> {loc(professionById.get(id)!.summary)}
          </p>
          <ProfessionEvidence id={id} />
        </div>
      ))}
    </div>
  );
}

/** The recommended pair of primary professions; the next best pairs as alternatives. */
export function PrimaryProfessions({ pairs }: { pairs: ClassRecommendation['professionPairs'] }) {
  const best = pairs?.best;
  const alternatives = pairs?.alternatives ?? [];
  return (
    <section class="professions">
      <h3>{t('professionsPair')}</h3>
      {best && <Pair pair={best} />}
      {alternatives.length > 0 && (
        <details>
          <summary>{t('alternatives')}</summary>
          {alternatives.map((p) => (
            <Pair key={p.professionIds.join('+')} pair={p} />
          ))}
        </details>
      )}
    </section>
  );
}

/** All secondary professions, best first. */
export function SecondaryProfessions({ professions: secondary }: { professions: ProfessionResult[] }) {
  return (
    <section class="professions-secondary">
      <h3>{t('professionsSecondary')}</h3>
      <ul class="secondary-list">
        {secondary.map((p) => (
          <li key={p.professionId}>
            <span class="secondary-profession-head">
              <strong>{nameOf(p.professionId)}</strong> <span class="secondary-profession-score">{pct(p.score)}</span>
            </span>
            <span class="help">{loc(professionById.get(p.professionId)!.summary)}</span>
            <ProfessionEvidence id={p.professionId} />
          </li>
        ))}
      </ul>
    </section>
  );
}
