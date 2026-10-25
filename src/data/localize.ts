import type { LocalizedText, TraitDefinition } from './display';
import type { GermanEvidenceNotes } from './evidence/helpers';

/*
 * The English texts live in the data, the German translation under `src/i18n/de/` in the same structure,
 * typed against the data's IDs; these helpers merge both languages into `LocalizedText`.
 */

/** Fields of an item with English texts and their German translation, e.g. `localize(mage, DE.mage, ['name', 'summary'])`. */
export function localize<F extends string>(
  en: Record<F, string>,
  de: Record<F, string>,
  fields: readonly F[],
): Record<F, LocalizedText> {
  return Object.fromEntries(fields.map((field) => [field, { en: en[field], de: de[field] }])) as Record<
    F,
    LocalizedText
  >;
}

/** Name and scale of a trait in one language. */
export interface TraitTexts {
  label: string;
  /** Describes what 0 and 1 mean (maintenance aid for data authors). */
  scale: string;
}

/** Trait catalog from the English texts per ID and their German translation. */
export function traitCatalog<K extends string>(
  en: Record<K, TraitTexts>,
  de: Record<K, TraitTexts>,
): Record<K, TraitDefinition> {
  return Object.fromEntries(
    (Object.keys(en) as K[]).map((id) => [id, localize(en[id], de[id], ['label', 'scale'])]),
  ) as Record<K, TraitDefinition>;
}

/**
 * Binding the texts needs IDs as literal types. If an ID is widened to `string`, a text type would require no
 * text at all; `LiteralIds` then turns it into `never`, and every `satisfies` fails loudly.
 */
export type LiteralIds<Id extends string, T> = string extends Id ? never : T;

/** Texts per item of a list (race, profession): the fields `F` and the German notes its evidence entries require. */
export type GermanEntityTexts<B extends { id: string }, F extends string> = LiteralIds<
  B['id'],
  { [E in B as E['id']]: Record<F, string> & GermanEvidenceNotes<E> }
>;
