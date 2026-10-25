import type { ClassId, PerkId, ProfessionId, RaceId, SpecId } from './ids';

/*
 * The profiles the questionnaire rates against: specs, races, combinations, professions and Legacy perks with their
 * trait values. Names, descriptions and provenance are not part of the rating.
 */
export type Faction = 'alliance' | 'horde';

/** A trait value in [0, 1]; only `traitValue` builds one, and it rejects anything else. */
export type TraitValue = number & { readonly brand: 'TraitValue' };

/** `label` names the trait in the error, so a wrong value in the data is easy to find. */
export function traitValue(value: number, label = 'Trait value'): TraitValue {
  if (!(value >= 0 && value <= 1)) throw new RangeError(`${label} ${value} is outside [0, 1]`);
  return value as TraitValue;
}

/** Values per trait; the trait catalog describes the semantics of each trait. */
type TraitProfile<T extends string> = Record<T, TraitValue>;

/** A profile from plain numbers, each checked by `traitValue`. */
export function traitProfile<T extends string>(values: Record<T, number>): TraitProfile<T> {
  return Object.fromEntries(
    Object.entries<number>(values).map(([trait, value]) => [trait, traitValue(value, `Trait ${trait}`)]),
  ) as TraitProfile<T>;
}

export interface SpecProfile<T extends string = string> {
  id: SpecId;
  classId: ClassId;
  traits: TraitProfile<T>;
}

export interface RaceProfile<T extends string = string> {
  id: RaceId;
  faction: Faction;
  traits: TraitProfile<T>;
}

export interface ComboProfile {
  raceId: RaceId;
  classId: ClassId;
  /** New race-class combination in Forever (incl. Skyborne). */
  isNew: boolean;
}

type ProfessionKind = 'gathering' | 'crafting' | 'secondary';

export interface ProfessionProfile<T extends string = string> {
  id: ProfessionId;
  kind: ProfessionKind;
  traits: TraitProfile<T>;
  /** Classes that benefit especially from the profession (e.g. Tailoring → cloth wearers). */
  classSynergy?: ClassId[];
  raceSynergy?: RaceId[];
  /** Professions that supply or consume materials. */
  partners?: ProfessionId[];
}

export type LegacyTree = 'professions' | 'adventure' | 'resourcefulness';

export interface LegacyPerkProfile<T extends string = string> {
  id: PerkId;
  tree: LegacyTree;
  traits: TraitProfile<T>;
  /** Classes the perk especially benefits. */
  classSynergy?: ClassId[];
}
