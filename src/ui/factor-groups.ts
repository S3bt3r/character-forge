import type { Factor, Penalty } from '../domain/scoring';
import type { TraitScope } from '../domain/questions';
import type { SpecId } from '../domain/ids';
import type { Evidence } from '../data/display';
import { specTraitEvidence } from './catalog';

/** Evidence keyed by content: traits often carry the same statement ("No pet." for both pet traits) in separate objects. */
const evidenceByContent = (evidence: Evidence[]) => new Map(evidence.map((e) => [JSON.stringify(e), e]));

/** The spec's evidence for the given traits; points and deductions of another scope rest on no spec note. */
const traitEvidence = (traits: string[], scope: TraitScope, specId: SpecId | undefined): Evidence[] =>
  specId && scope === 'spec'
    ? traits.map((t) => specTraitEvidence(specId, t)).filter((e): e is Evidence => e !== undefined)
    : [];

/** Points of one column that rest on shared evidence, shown as one entry; `evidence` holds each note once. */
export interface FactorGroup {
  factors: Factor[];
  evidence: Evidence[];
}

/** A deduction with the points of its column that rest on the same evidence ("also: …"). */
interface PenaltyGroup {
  penalty: Penalty;
  also: Factor[];
  evidence: Evidence[];
}

interface Draft {
  factors: Factor[];
  evidence: Map<string, Evidence>;
  penalty?: Penalty;
}

const factorDraft = (factor: Factor, specId: SpecId | undefined): Draft => ({
  factors: [factor],
  evidence: evidenceByContent(traitEvidence(factor.traits, factor.scope, specId)),
});

const penaltyDraft = (penalty: Penalty, specId: SpecId | undefined): Draft => ({
  factors: [],
  evidence: evidenceByContent(traitEvidence([penalty.trait], penalty.scope, specId)),
  penalty,
});

const shares = (a: Draft, b: Draft) => [...a.evidence.keys()].some((k) => b.evidence.has(k));

function absorb(target: Draft, other: Draft) {
  target.factors.push(...other.factors);
  for (const [k, e] of other.evidence) target.evidence.set(k, e);
}

/** Merges every entry that shares a note with `target` into it, also through notes it gains on the way. */
function mergeConnected(target: Draft, drafts: Draft[]): Draft[] {
  const connected = drafts.find((d) => d !== target && shares(d, target));
  if (!connected) return drafts;
  absorb(target, connected);
  return mergeConnected(
    target,
    drafts.filter((d) => d !== connected),
  );
}

/** The notes of `evidence` no earlier entry has shown; marks them as shown. */
function takeUnshown(evidence: Map<string, Evidence>, shown: Set<string>): Evidence[] {
  const fresh = [...evidence].filter(([k]) => !shown.has(k));
  for (const [k] of fresh) shown.add(k);
  return fresh.map(([, e]) => e);
}

/**
 * Groups the points of a column, the column's deductions first: a point joins the first deduction, else the first
 * entry, it shares a note with; entries a point connects merge. Deductions never merge with each other, since each
 * carries its own cost. Without a spec there is no evidence to compare, so every point stays on its own.
 */
function group(factors: Factor[], penalties: Penalty[], specId: SpecId | undefined) {
  const order = new Map(factors.map((f, i) => [f, i]));
  const penaltyDrafts = penalties.map((p) => penaltyDraft(p, specId));
  let drafts: Draft[] = [];
  for (const factor of factors) {
    const own = factorDraft(factor, specId);
    const target = penaltyDrafts.find((d) => shares(own, d)) ?? drafts.find((d) => shares(own, d));
    if (!target) {
      drafts.push(own);
      continue;
    }
    absorb(target, own);
    drafts = mergeConnected(target, drafts);
    target.factors.sort((a, b) => order.get(a)! - order.get(b)!);
  }
  // In display order (points, then deductions) each note appears only at its first entry.
  const shown = new Set<string>();
  const unshown = (d: Draft) => takeUnshown(d.evidence, shown);
  return {
    conflicts: drafts.map((d): FactorGroup => ({ factors: d.factors, evidence: unshown(d) })),
    penalties: penaltyDrafts.map((d): PenaltyGroup => ({ penalty: d.penalty!, also: d.factors, evidence: unshown(d) })),
  };
}

/** Pros grouped by shared evidence, in the order of each entry's strongest point. */
export const groupFactors = (factors: Factor[], specId: SpecId | undefined): FactorGroup[] =>
  group(factors, [], specId).conflicts;

/** Cons and deductions grouped by shared evidence; points that rest on a deduction's note join the deduction. */
export const groupCons = (conflicts: Factor[], penalties: Penalty[], specId: SpecId | undefined) =>
  group(conflicts, penalties, specId);
