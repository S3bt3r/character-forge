import type { OptionId, QuestionId, SpecId } from '../domain/ids';
import type { Penalty } from '../domain/scoring';
import { CLASSES } from '../data/classes';
import { LEGACY_PERKS, LEGACY_POINTS_PER_CHARACTER } from '../data/legacy';
import { PROFESSIONS, PROFESSION_TRAITS } from '../data/professions';
import { CHAPTERS, QUESTIONS } from '../data/questions';
import { RACES } from '../data/races';
import { DATA_VERSION, SOURCES, sourceUrl, type SourceDef } from '../data/sources';
import { SPECS } from '../data/specs';
import { RACE_TRAITS } from '../data/traits';
import type { DealbreakerDef, Evidence, LocalizedText, OptionDef } from '../data/display';

/*
 * The only place where the UI reads the data at runtime; components take the catalog from here, so a change in the
 * data layout touches this file instead of every component. Display types (`src/data/display.ts`) are imported directly.
 */
export {
  CHAPTERS,
  DATA_VERSION,
  LEGACY_POINTS_PER_CHARACTER,
  PROFESSION_TRAITS,
  QUESTIONS,
  RACE_TRAITS,
  SOURCES,
  sourceUrl,
  type SourceDef,
};

/** Lookup tables by ID for the display. */
export const classById = new Map(CLASSES.map((c) => [c.id, c]));
export const specById = new Map(SPECS.map((s) => [s.id, s]));
export const raceById = new Map(RACES.map((r) => [r.id, r]));
export const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));
export const professionById = new Map(PROFESSIONS.map((p) => [p.id, p]));
export const perkById = new Map(LEGACY_PERKS.map((p) => [p.id, p]));

export function specTraitEvidence(specId: SpecId, trait: string): Evidence | undefined {
  const evidence: Partial<Record<string, Evidence>> | undefined = specById.get(specId)?.evidence;
  return evidence?.[trait];
}

/**
 * Reason the ranking shows for a deal-breaker penalty. Unique, since an option has one deal-breaker per scope and trait
 * (checked when the data loads) and question and option IDs are unique (data test).
 */
export function penaltyReason({ questionId, optionId, scope, trait }: Penalty): LocalizedText {
  const dealbreaker = optionById(questionId, optionId)?.effects.find(
    (e): e is DealbreakerDef => e.kind === 'dealbreaker' && e.scope === scope && e.trait === trait,
  );
  if (!dealbreaker) throw new Error(`No deal-breaker ${questionId}/${optionId} on ${scope}/${trait}`);
  return dealbreaker.reason;
}

const optionById = (questionId: QuestionId, optionId: OptionId): OptionDef | undefined =>
  questionById.get(questionId)?.options.find((o) => o.id === optionId);

/** Label of an option, e.g. for "Good fit because …" explanations. */
export function optionLabel(questionId: QuestionId, optionId: OptionId): LocalizedText | undefined {
  return optionById(questionId, optionId)?.label;
}
