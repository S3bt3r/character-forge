import { CLASS_SPECS } from '../../src/data/specs';
import type { DataEvidence } from '../../src/data/evidence/helpers';

type TraitEvidence = Partial<Record<string, DataEvidence>>;

const evidenceOf = (pairs: object): TraitEvidence =>
  Object.fromEntries(
    Object.entries(pairs as Record<string, { evidence: DataEvidence }>).map(([trait, pair]) => [trait, pair.evidence]),
  );

/**
 * The evidence of every class in the shape of the German notes: class-wide entries under `shared`, a spec's own entries
 * under `specs`. Typed loosely so that tests can index by plain strings.
 */
export const CLASS_EVIDENCE: Record<string, { shared: TraitEvidence; specs: Record<string, TraitEvidence> }> =
  Object.fromEntries(
    Object.entries(CLASS_SPECS).map(([cls, data]) => [
      cls,
      {
        shared: evidenceOf(data.traits),
        specs: Object.fromEntries(
          Object.entries(data.specs as Record<string, { traits: object }>).map(([spec, own]) => [
            spec,
            evidenceOf(own.traits),
          ]),
        ),
      },
    ]),
  );
