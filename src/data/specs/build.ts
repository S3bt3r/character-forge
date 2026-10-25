import { traitProfile } from '../../domain/catalog';
import type { SpecDef } from '../display';
import { classId, specId } from '../../domain/ids';
import { withGerman, type ClassNoteTexts, type DataEvidence } from '../evidence/helpers';
import type { ClassSpecs, Graded, Rated } from '../rated';
import type { ClassKey, SpecKeyOf } from '../ids';
import type { SpecTraitId } from '../traits';

const isGraded = (pair: Rated | Graded<string>): pair is Graded<string> => 'values' in pair;

/**
 * The specs of a class from its pairs: a spec's own pair wins, otherwise the class pair applies with its value or, if
 * graded, with the value it lists for the spec. A graded entry that misses an inheriting spec or lists a spec with its
 * own pair is a mistake in the data and fails when the data loads, as do a graded value for an unknown spec and a class
 * pair that every spec replaces. A trait without any value already fails to compile (`CompleteClassSpecs`); the check
 * here also covers data built without the literal types.
 */
export function buildSpecs<C extends ClassKey>(
  cls: C,
  data: ClassSpecs<C>,
  traits: readonly SpecTraitId[],
  german: { notes: ClassNoteTexts; names: Record<SpecKeyOf<C>, { name: string }> },
): SpecDef<SpecTraitId>[] {
  const specs = Object.keys(data.specs) as SpecKeyOf<C>[];
  for (const [trait, classPair] of Object.entries(data.traits) as [SpecTraitId, Rated | Graded<string>][]) {
    if (specs.every((spec) => data.specs[spec].traits[trait]))
      throw new Error(`${cls}/${trait}: class pair that every spec replaces`);
    if (!isGraded(classPair)) continue;
    const unknown = Object.keys(classPair.values).find((key) => !specs.includes(key as SpecKeyOf<C>));
    if (unknown !== undefined) throw new Error(`${cls}/${trait}: graded value for unknown spec ${unknown}`);
  }
  return specs.map((spec) => {
    const specPairs = data.specs[spec];
    const values = {} as Record<SpecTraitId, number>;
    const classEvidence: Partial<Record<SpecTraitId, DataEvidence>> = {};
    const specEvidence: Partial<Record<SpecTraitId, DataEvidence>> = {};
    for (const trait of traits) {
      const pair = specPairs.traits[trait];
      const classPair = data.traits[trait];
      if (pair) {
        if (classPair && isGraded(classPair) && spec in classPair.values)
          throw new Error(`${spec}/${trait}: graded value for a spec with its own pair`);
        values[trait] = pair.value;
        specEvidence[trait] = pair.evidence;
        continue;
      }
      if (!classPair) throw new Error(`${spec}/${trait}: no value`);
      const value = isGraded(classPair) ? classPair.values[spec] : classPair.value;
      if (value === undefined) throw new Error(`${spec}/${trait}: graded entry without a value for this spec`);
      values[trait] = value;
      classEvidence[trait] = classPair.evidence;
    }
    return {
      id: specId(spec),
      classId: classId(cls),
      name: { en: specPairs.name, de: german.names[spec].name },
      traits: traitProfile(values),
      evidence: {
        ...withGerman(classEvidence, german.notes.shared),
        ...withGerman(specEvidence, german.notes.specs[spec] ?? {}),
      },
    };
  });
}
