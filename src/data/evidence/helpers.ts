import type { Evidence, Provenance } from '../display';
import type { SourceId } from '../sources';

/** Timestamp per podcast source, as shown in the video, at which the statement is made. */
type Timestamps = Partial<Record<SourceId, string>>;
/** Evidence entry with checked source IDs; assignable to the domain's general `Evidence`. */
export type DataEvidence = Omit<Evidence, 'sources' | 'at'> & { sources?: SourceId[]; at?: Timestamps };
/** Evidence entry that carries its kind in its type. */
type EvidenceOf<P extends Provenance> = DataEvidence & { provenance: P };
/** Evidence entry with an English note whose German translation is still missing; `GermanNotes` uses this to require it. */
type Noted<P extends Provenance> = EvidenceOf<P> & { note: { en: string } };
/** Evidence entry whose note already exists in both languages (shared note). */
type Translated = { note: { en: string; de: string } };

/*
 * The English note sits right next to the evidence entry: it justifies the rating and changes with it. Confirmed,
 * unconfirmed, community and `estimate(note)` entries require it by signature; `CLASSIC` and `ESTIMATE` carry none.
 * The German translation lives under `src/i18n/de/` in the same structure; `GermanNotes` requires it exactly for
 * the entries with an English note, like a foreign key in a translation table. Entries with a shared note
 * (`SHARED_EVIDENCE`) are already translated and get none.
 */

/** Kind of translation per evidence entry; `absent` also for keys TypeScript adds as `?: undefined` when unifying lists. */
type GermanKind<V> = [NonNullable<V>] extends [never]
  ? 'absent'
  : NonNullable<V> extends Translated
    ? 'absent'
    : NonNullable<V> extends { note: { en: string } }
      ? 'required'
      : 'absent';
type GermanMap<T> = { [K in keyof T as GermanKind<T[K]> extends 'required' ? K : never]-?: string };
/**
 * If no entry of a group requires a translation, the type would be `{}`, and TypeScript does not check `{}` for
 * excess keys. `Record<string, never>` turns every German note there into an error.
 */
type GermanNotes<T> = [keyof GermanMap<T>] extends [never] ? Record<string, never> : GermanMap<T>;
/** German notes for the evidence entries of an item (race, profession): required once an entry requires one; else none. */
export type GermanEvidenceNotes<B> = B extends { evidence: infer E }
  ? {} extends GermanNotes<E>
    ? { evidence?: GermanNotes<E> }
    : { evidence: GermanNotes<E> }
  : unknown;
export type GermanClassNotes<E extends { shared: object; specs: object }> = {
  shared: GermanNotes<E['shared']>;
  specs: { [S in keyof E['specs']]: GermanNotes<E['specs'][S]> };
};
/** Notes of a trait group at runtime, whichever class or spec. */
export type NoteTexts = Partial<Record<string, string>>;
/** Notes of a class at runtime: shared and per spec. */
export interface ClassNoteTexts {
  shared: NoteTexts;
  specs: Partial<Record<string, NoteTexts>>;
}

/** Mentioned in a Forever source (Blizzard article, Development Notes, developer podcast). */
export const confirmed = (sources: SourceId[], note: string, at?: Timestamps): Noted<'confirmed'> => ({
  provenance: 'confirmed',
  sources,
  ...(at && { at }),
  note: { en: note },
});

/** As in WoW Classic, not specifically confirmed for Forever, without a note. */
export const CLASSIC: EvidenceOf<'classic'> = { provenance: 'classic', sources: ['classic'] };

/** Like `CLASSIC`, with a detail. The note names only the detail, never the provenance. */
export const classic = (note: string): Noted<'classic'> => ({ ...CLASSIC, note: { en: note } });

/** Sources contradict each other or Blizzard explicitly calls it still open. */
export const unconfirmed = (sources: SourceId[], note: string, at?: Timestamps): Noted<'unconfirmed'> => ({
  provenance: 'unconfirmed',
  sources,
  ...(at && { at }),
  note: { en: note },
});

/** Assessment from a community guide (Wowhead); its rank below the Blizzard sources is in docs/DATA.md. */
export const community = (sources: SourceId[], note: string, at?: Timestamps): Noted<'community'> => ({
  provenance: 'community',
  sources,
  ...(at && { at }),
  note: { en: note },
});

/** Estimate without a direct source and without a note; the badge alone says it is estimated. */
export const ESTIMATE: EvidenceOf<'estimate'> = { provenance: 'estimate' };

/** Estimate without a direct source; the note justifies it. */
export const estimate = (note: string): Noted<'estimate'> => ({ provenance: 'estimate', note: { en: note } });

/** Adds the German translation of every note that the German texts list for this group. */
export function withGerman<T extends Partial<Record<string, DataEvidence>>>(evidence: T, de: NoteTexts): T {
  return Object.fromEntries(
    Object.entries(evidence).map(([trait, e]) => {
      const german = de[trait];
      if (german === undefined) return [trait, e];
      // The types prevent this; without type checking (dev server, vitest, Stryker) it fails here with a clear message.
      const en = e?.note?.en;
      if (en === undefined) throw new Error(`German note for "${trait}" without an English note`);
      return [trait, { ...e, note: { en, de: german } }];
    }),
  ) as T;
}

/** Like `withGerman` for the shared evidence entries, which must all be translated; the type records that they are. */
export function withSharedGerman<T extends Record<string, Noted<Provenance>>>(
  evidence: T,
  de: Record<keyof T, string>,
): { [K in keyof T]: T[K] & Translated } {
  return Object.fromEntries(
    Object.entries(evidence).map(([id, e]) => [id, { ...e, note: { en: e.note.en, de: de[id as keyof T] } }]),
  ) as {
    [K in keyof T]: T[K] & Translated;
  };
}
