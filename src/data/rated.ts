import type { DataEvidence } from './evidence/helpers';
import type { ClassKey, SpecKeyOf } from './ids';
import type { SpecTraitId } from './traits';

/*
 * The pair format of the data: every trait value stands next to the evidence that justifies exactly this value, so
 * a value cannot change without its note (docs/DATA.md, section "Data model").
 */

/** A trait value with its evidence; `undefined` evidence means the sources do not rate it (races, professions). */
export interface Rated<E extends DataEvidence | undefined = DataEvidence | undefined> {
  value: number;
  evidence: E;
}

export const rated = <const E extends DataEvidence>(value: number, evidence: E): Rated<E> => ({ value, evidence });

/** A value no source rates. */
export const unrated = (value: number): Rated<undefined> => ({ value, evidence: undefined });

/** One class-wide evidence that justifies a different value per spec; it lists every spec that inherits it. */
export interface Graded<S extends string, E extends DataEvidence = DataEvidence> {
  values: Partial<Record<S, number>>;
  evidence: E;
}

export const graded = <S extends string, const E extends DataEvidence>(
  values: Partial<Record<S, number>>,
  evidence: E,
): Graded<S, E> => ({ values, evidence });

/** A spec's own pairs; they replace the class pair of the same trait completely. */
interface SpecPairs {
  name: string;
  traits: Partial<Record<SpecTraitId, Rated<DataEvidence>>>;
}

/** The specs of a class with their values and evidence: class pairs for all specs, own pairs per spec. */
export interface ClassSpecs<C extends ClassKey> {
  traits: Partial<Record<SpecTraitId, Rated<DataEvidence> | Graded<SpecKeyOf<C>>>>;
  specs: Record<SpecKeyOf<C>, SpecPairs>;
}

/** Traits some spec of the class data gets no value for: neither a class pair nor a pair of its own. */
type MissingTraits<D extends { traits: object; specs: Record<string, { traits: object }> }> = {
  [S in keyof D['specs']]: Exclude<SpecTraitId, keyof D['traits'] | keyof D['specs'][S]['traits']>;
}[keyof D['specs']];

/**
 * Class data in which every spec gets a value for every trait. The compiler rejects data with a gap and names the
 * missing traits; a graded class pair still has to list each inheriting spec, which `buildSpecs` checks when the
 * data loads.
 */
export type CompleteClassSpecs<C extends ClassKey, D extends ClassSpecs<C>> = [MissingTraits<D>] extends [never]
  ? D
  : { missingTraits: MissingTraits<D> };

/** The evidence of each pair of a map; an unrated pair contributes `undefined`. */
type EvidenceOfPairs<T> = { [K in keyof T]: T[K] extends { evidence: infer E } ? E : never };

/** The evidence of each pair, in the shape the German notes bind to (`GermanClassNotes`). */
export type EvidenceView<D extends { traits: object; specs: object }> = {
  shared: EvidenceOfPairs<D['traits']>;
  specs: { [S in keyof D['specs']]: D['specs'][S] extends { traits: infer T } ? EvidenceOfPairs<T> : never };
};

/** An entry (race, profession) with the evidence of its pairs next to them, in the shape `GermanEvidenceNotes` binds to. */
export type WithEvidence<B extends { traits: object }> = B extends unknown
  ? B & { evidence: EvidenceOfPairs<B['traits']> }
  : never;

/** Splits a map of pairs into the values and the evidence of the rated ones. */
export function splitPairs<T extends string>(
  pairs: Record<T, Rated>,
): { values: Record<T, number>; evidence: Partial<Record<T, DataEvidence>> } {
  const entries = Object.entries(pairs) as [T, Rated][];
  return {
    values: Object.fromEntries(entries.map(([trait, pair]) => [trait, pair.value])) as Record<T, number>,
    evidence: Object.fromEntries(
      entries.flatMap(([trait, pair]) => (pair.evidence ? [[trait, pair.evidence]] : [])),
    ) as Partial<Record<T, DataEvidence>>,
  };
}
