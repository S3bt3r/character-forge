/*
 * Identifiers of the domain. At runtime each is a plain string; the brand keeps the kinds apart at compile time, so a
 * class ID cannot stand where a race ID belongs. A branded ID is built only where it is known to be valid: in the
 * catalog builders under src/data and, for outside data, at the persistence boundary after the catalog lookup.
 */
declare const brand: unique symbol;
type Id<Kind extends string> = string & { readonly [brand]: Kind };

export type QuestionId = Id<'QuestionId'>;
export type OptionId = Id<'OptionId'>;

export const questionId = (id: string): QuestionId => id as QuestionId;
export const optionId = (id: string): OptionId => id as OptionId;

export type ClassId = Id<'ClassId'>;
export type SpecId = Id<'SpecId'>;
export type RaceId = Id<'RaceId'>;
export type ProfessionId = Id<'ProfessionId'>;
export type PerkId = Id<'PerkId'>;

export const classId = (id: string): ClassId => id as ClassId;
export const specId = (id: string): SpecId => id as SpecId;
export const raceId = (id: string): RaceId => id as RaceId;
export const professionId = (id: string): ProfessionId => id as ProfessionId;
export const perkId = (id: string): PerkId => id as PerkId;
