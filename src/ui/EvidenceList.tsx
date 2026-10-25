import type { Evidence, TraitDefinition } from '../data/display';
import { loc } from './t';
import { ProvenanceBadge } from './ProvenanceBadge';

interface Props {
  /** Evidence entry per trait; traits without an entry do not appear. */
  evidence: Partial<Record<string, Evidence>> | undefined;
  /** Names of the traits (trait catalog of the race or profession). */
  traits: Record<string, TraitDefinition>;
}

/** Evidence entries of a race or profession in the character sheet (name, note, badges with sources). */
export function EvidenceList({ evidence, traits }: Props) {
  const entries = Object.entries(evidence ?? {}).flatMap(([trait, e]) => (e ? [{ trait, e }] : []));
  if (entries.length === 0) return null;
  return (
    <ul class="evidence-list">
      {entries.map(({ trait, e }) => (
        <li key={trait}>
          <span class="evidence-trait">{traits[trait] ? loc(traits[trait].label) : trait}:</span>{' '}
          {e.note && loc(e.note)} <ProvenanceBadge evidence={e} noteShown={Boolean(e.note)} />
        </li>
      ))}
    </ul>
  );
}
