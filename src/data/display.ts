import type { ComboProfile, LegacyPerkProfile, ProfessionProfile, RaceProfile, SpecProfile } from '../domain/catalog';
import type { ClassId } from '../domain/ids';
import type { AnswerOption, DealbreakerEffect, Effect, Question } from '../domain/questions';

/*
 * The display view of the catalog: each entry is its domain profile plus names, descriptions and provenance. Both views
 * are the same objects from the same data files; the rating sees them through the narrow profile types, the UI through
 * these.
 */

/** Text in the reference language English and optionally its translations. */
export interface LocalizedText {
  en: string;
  de?: string;
}

/** Provenance of a data entry; the rules for each kind are in docs/DATA.md, section "Provenance". */
export type Provenance = 'confirmed' | 'classic' | 'unconfirmed' | 'estimate' | 'community';

export interface Evidence {
  provenance: Provenance;
  sources?: string[];
  note?: LocalizedText;
  /** Timestamp per podcast source (`m:ss` or `h:mm:ss`, as shown in the video) at which the statement is made. */
  at?: Record<string, string>;
}

export interface TraitDefinition {
  label: LocalizedText;
  /** Describes what 0 and 1 mean; a maintenance aid for data authors. */
  scale: LocalizedText;
}

export interface ClassDef {
  id: ClassId;
  name: LocalizedText;
  /** Class color (hex) for the ranking and character sheet. */
  color: string;
  resources: LocalizedText;
  summary: LocalizedText;
}

export interface SpecDef<T extends string = string> extends SpecProfile<T> {
  name: LocalizedText;
  /** Evidence per trait. For specs every trait is rated explicitly, next to its value (`src/data/specs`). */
  evidence?: Partial<Record<T, Evidence>>;
}

export interface RaceDef<T extends string = string> extends RaceProfile<T> {
  name: LocalizedText;
  lore: LocalizedText;
  racials: LocalizedText;
  evidence?: Partial<Record<T, Evidence>>;
}

export interface ComboDef extends ComboProfile {
  evidence: Evidence;
}

export interface ProfessionDef<T extends string = string> extends ProfessionProfile<T> {
  name: LocalizedText;
  summary: LocalizedText;
  evidence?: Partial<Record<T, Evidence>>;
}

export interface LegacyPerkDef<T extends string = string> extends LegacyPerkProfile<T> {
  name: LocalizedText;
  summary: LocalizedText;
  evidence: Evidence;
}

/** A deal-breaker with the reason the ranking shows next to its penalty. */
export interface DealbreakerDef extends DealbreakerEffect {
  reason: LocalizedText;
}

export type EffectDef = Exclude<Effect, DealbreakerEffect> | DealbreakerDef;

export interface OptionDef extends AnswerOption {
  label: LocalizedText;
  hint?: LocalizedText;
  effects: EffectDef[];
}

/** A question with its texts; the union keeps narrowing by `kind`. */
export type QuestionDef = Question<OptionDef> & {
  text: LocalizedText;
  /** Short name for explanations ("Survival: Take the hits"), at most 24 characters. */
  short: LocalizedText;
  help?: LocalizedText;
};
