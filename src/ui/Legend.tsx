import { SEVERITY_PENALTY } from '../domain/scoring';
import { t } from './t';
import { Icon } from './Icon';
import { PROVENANCES, ProvenanceIcon } from './ProvenanceBadge';

/** Explains the provenance and deduction badges; shown below the ranking and at the end of the character sheet. */
export function Legend() {
  return (
    <div class="legend">
      <h3>{t('legendTitle')}</h3>
      <ul>
        {PROVENANCES.map((p) => (
          <li key={p.id}>
            <span class={`provenance-badge provenance-badge-${p.id}`} aria-hidden="true">
              <ProvenanceIcon provenance={p.id} />
            </span>{' '}
            <strong>{t(p.label)}:</strong> {t(p.legend)}
          </li>
        ))}
        <li>
          <span class="penalty-badge" aria-hidden="true">
            <Icon name="warning" size={13} />
          </span>{' '}
          {t('legend_penalty', SEVERITY_PENALTY)}
        </li>
      </ul>
    </div>
  );
}
