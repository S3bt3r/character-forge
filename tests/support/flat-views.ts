/*
 * Flat views of all data texts per language, with keys such as `option.role.tank.label` or `evidence.<spec>.<trait>`.
 * The app does not need them: the compiler binds the German texts to the data. The tests use them so that text,
 * glossary and parity checks treat all data texts and both languages the same way. English is collected from the
 * data itself, German from the files under `src/i18n/de/`.
 */
import { CLASSES } from '../../src/data/classes';
import { CLASS_EVIDENCE } from './class-evidence';
import type { ClassNoteTexts, NoteTexts } from '../../src/data/evidence/helpers';
import { SHARED_EVIDENCE } from '../../src/data/evidence/shared';
import { LEGACY_PERKS, LEGACY_TRAITS } from '../../src/data/legacy';
import { PROFESSIONS, PROFESSION_TRAITS } from '../../src/data/professions';
import { CHAPTERS, QUESTIONS } from '../../src/data/questions';
import type { FoundationDrafts } from '../../src/data/questions/foundation';
import type { CombatFeelDrafts } from '../../src/data/questions/combat-feel';
import type { DealbreakersDrafts } from '../../src/data/questions/dealbreakers';
import type { SettingDrafts } from '../../src/data/questions/setting';
import type { ChapterTextsRuntime, GermanChapter } from '../../src/data/questions/helpers';
import type { LegacyDrafts } from '../../src/data/questions/legacy';
import type { LevelingDrafts } from '../../src/data/questions/leveling';
import type { RaceDrafts } from '../../src/data/questions/race';
import type { ToolkitDrafts } from '../../src/data/questions/toolkit';
import type { ProfessionsDrafts } from '../../src/data/questions/professions';
import type { PveDrafts } from '../../src/data/questions/pve';
import type { PvpDrafts } from '../../src/data/questions/pvp';
import { RACES } from '../../src/data/races';
import { SOURCES } from '../../src/data/sources';
import { SPECS } from '../../src/data/specs';
import { RACE_TRAITS, SPEC_TRAITS } from '../../src/data/traits';
import type { Evidence, LocalizedText } from '../../src/data/display';
import { CLASS_TEXTS } from '../../src/i18n/de/entities/classes';
import { PERK_TEXTS } from '../../src/i18n/de/entities/legacy';
import { PROFESSION_TEXTS } from '../../src/i18n/de/entities/professions';
import { RACE_TEXTS } from '../../src/i18n/de/entities/races';
import { SPEC_TEXTS } from '../../src/i18n/de/entities/specs';
import { TRAIT_TEXTS } from '../../src/i18n/de/entities/traits';
import { DE_CLASS_NOTES } from '../../src/i18n/de/evidence';
import { SHARED_NOTES } from '../../src/i18n/de/evidence/shared';
import { FOUNDATION_CHAPTER_TEXTS } from '../../src/i18n/de/questions/foundation';
import { CHAPTER_TEXTS } from '../../src/i18n/de/questions/chapters';
import { COMBAT_FEEL_CHAPTER_TEXTS } from '../../src/i18n/de/questions/combat-feel';
import { DEALBREAKERS_CHAPTER_TEXTS } from '../../src/i18n/de/questions/dealbreakers';
import { SETTING_CHAPTER_TEXTS } from '../../src/i18n/de/questions/setting';
import { LEGACY_CHAPTER_TEXTS } from '../../src/i18n/de/questions/legacy';
import { LEVELING_CHAPTER_TEXTS } from '../../src/i18n/de/questions/leveling';
import { RACE_CHAPTER_TEXTS } from '../../src/i18n/de/questions/race';
import { TOOLKIT_CHAPTER_TEXTS } from '../../src/i18n/de/questions/toolkit';
import { PROFESSIONS_CHAPTER_TEXTS } from '../../src/i18n/de/questions/professions';
import { PVE_CHAPTER_TEXTS } from '../../src/i18n/de/questions/pve';
import { PVP_CHAPTER_TEXTS } from '../../src/i18n/de/questions/pvp';
import { SOURCE_TEXTS } from '../../src/i18n/de/sources';

/** Notes per class and spec: `evidence.<class>.<trait>`, `evidence.<spec>.<trait>`. */
function flattenClassNotes(byClass: Readonly<Record<string, ClassNoteTexts>>): Record<string, string> {
  const groups = Object.entries(byClass).flatMap(([classId, notes]) => [
    [classId, notes.shared] as const,
    ...Object.entries(notes.specs).map(([specId, own]) => [specId, own ?? {}] as const),
  ]);
  return Object.fromEntries(
    groups.flatMap(([prefix, notes]) =>
      Object.entries(notes).map(([trait, note]) => [`evidence.${prefix}.${trait}`, note!]),
    ),
  );
}

/** Questionnaire: `chapter.<id>.*`, `question.<id>.*`, `option.<question>.<option>.*` and `….reason.<trait>`. */
function flattenQuestionTexts(
  chapters: readonly ChapterTextsRuntime[],
  chapterTitles: Readonly<Record<string, { title: string; intro: string }>>,
): Record<string, string> {
  const entries: [string, string][] = Object.entries(chapterTitles).flatMap(([id, c]) => [
    [`chapter.${id}.title`, c.title],
    [`chapter.${id}.intro`, c.intro],
  ]);
  for (const chapter of chapters) {
    for (const [q, texts] of Object.entries(chapter)) {
      const { text, short, help, options } = texts!;
      entries.push([`question.${q}.text`, text], [`question.${q}.short`, short]);
      if (help !== undefined) entries.push([`question.${q}.help`, help]);
      for (const [o, option] of Object.entries(options)) {
        const { label, hint, reasons = {} } = option!;
        entries.push([`option.${q}.${o}.label`, label]);
        if (hint !== undefined) entries.push([`option.${q}.${o}.hint`, hint]);
        for (const [trait, reason] of Object.entries(reasons))
          entries.push([`option.${q}.${o}.reason.${trait}`, reason!]);
      }
    }
  }
  return Object.fromEntries(entries);
}

/** Text fields per entry: `<prefix>.<id>.<field>`. Nested notes (`evidence`) belong to the provenance view. */
function flattenEntityTexts(prefix: string, byId: Readonly<Record<string, object>>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(byId).flatMap(([id, fields]) =>
      Object.entries(fields)
        .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
        .map(([field, value]) => [`${prefix}.${id}.${field}`, value]),
    ),
  );
}

/** Provenance notes for races and professions: `evidence.<prefix>.<id>.<trait>`. */
function flattenEntityNotes(
  prefix: string,
  byId: Readonly<Record<string, { [field: string]: string | NoteTexts | undefined; evidence?: NoteTexts }>>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(byId).flatMap(([id, { evidence = {} }]) =>
      Object.entries(evidence).map(([trait, note]) => [`evidence.${prefix}.${id}.${trait}`, note!]),
    ),
  );
}

// German, from the translation files.

/** Every chapter exactly once and in order, each against its own drafts, so none is forgotten or swapped. */
const GERMAN_CHAPTERS = [
  SETTING_CHAPTER_TEXTS,
  FOUNDATION_CHAPTER_TEXTS,
  COMBAT_FEEL_CHAPTER_TEXTS,
  TOOLKIT_CHAPTER_TEXTS,
  LEVELING_CHAPTER_TEXTS,
  PVE_CHAPTER_TEXTS,
  PVP_CHAPTER_TEXTS,
  RACE_CHAPTER_TEXTS,
  DEALBREAKERS_CHAPTER_TEXTS,
  PROFESSIONS_CHAPTER_TEXTS,
  LEGACY_CHAPTER_TEXTS,
] as const satisfies readonly [
  GermanChapter<SettingDrafts>,
  GermanChapter<FoundationDrafts>,
  GermanChapter<CombatFeelDrafts>,
  GermanChapter<ToolkitDrafts>,
  GermanChapter<LevelingDrafts>,
  GermanChapter<PveDrafts>,
  GermanChapter<PvpDrafts>,
  GermanChapter<RaceDrafts>,
  GermanChapter<DealbreakersDrafts>,
  GermanChapter<ProfessionsDrafts>,
  GermanChapter<LegacyDrafts>,
];

export const DE_QUESTIONS: Readonly<Record<string, string>> = flattenQuestionTexts(GERMAN_CHAPTERS, CHAPTER_TEXTS);

export const DE_ENTITIES: Readonly<Record<string, string>> = {
  ...flattenEntityTexts('class', CLASS_TEXTS),
  ...flattenEntityTexts('spec', SPEC_TEXTS),
  ...flattenEntityTexts('race', RACE_TEXTS),
  ...flattenEntityTexts('profession', PROFESSION_TEXTS),
  ...flattenEntityTexts('perk', PERK_TEXTS),
  ...flattenEntityTexts('specTrait', TRAIT_TEXTS.spec),
  ...flattenEntityTexts('raceTrait', TRAIT_TEXTS.race),
  ...flattenEntityTexts('professionTrait', TRAIT_TEXTS.profession),
  ...flattenEntityTexts('legacyTrait', TRAIT_TEXTS.legacy),
};

export const DE_EVIDENCE: Readonly<Record<string, string>> = {
  ...Object.fromEntries(Object.entries(SHARED_NOTES).map(([id, note]) => [`evidence.${id}`, note])),
  ...flattenClassNotes(DE_CLASS_NOTES),
  ...flattenEntityNotes('race', RACE_TEXTS),
  ...flattenEntityNotes('profession', PROFESSION_TEXTS),
};

export const DE_SOURCES: Readonly<Record<string, string>> = flattenEntityTexts('source', SOURCE_TEXTS);

export const DE_DATA: Readonly<Record<string, string>> = {
  ...DE_QUESTIONS,
  ...DE_ENTITIES,
  ...DE_EVIDENCE,
  ...DE_SOURCES,
};

// English, collected from the data.

const questionTexts: ChapterTextsRuntime = Object.fromEntries(
  QUESTIONS.map((q) => [
    q.id,
    {
      text: q.text.en,
      short: q.short.en,
      ...(q.help ? { help: q.help.en } : {}),
      options: Object.fromEntries(
        q.options.map((o) => [
          o.id,
          {
            label: o.label.en,
            ...(o.hint ? { hint: o.hint.en } : {}),
            reasons: Object.fromEntries(
              o.effects.flatMap((e) => (e.kind === 'dealbreaker' ? [[e.trait, e.reason.en]] : [])),
            ),
          },
        ]),
      ),
    },
  ]),
);

const EN_QUESTIONS: Readonly<Record<string, string>> = flattenQuestionTexts(
  [questionTexts],
  Object.fromEntries(CHAPTERS.map((c) => [c.id, { title: c.title.en, intro: c.intro.en }])),
);

const english = <F extends string>(
  entries: readonly ({ id: string } & Record<F, LocalizedText>)[],
  fields: readonly F[],
) => Object.fromEntries(entries.map((e) => [e.id, Object.fromEntries(fields.map((f) => [f, e[f].en]))]));
const traits = (table: Readonly<Record<string, { label: LocalizedText; scale: LocalizedText }>>) =>
  english(
    Object.entries(table).map(([id, t]) => ({ id, ...t })),
    ['label', 'scale'],
  );

const EN_ENTITIES: Readonly<Record<string, string>> = {
  ...flattenEntityTexts('class', english(CLASSES, ['name', 'resources', 'summary'])),
  ...flattenEntityTexts('spec', english(SPECS, ['name'])),
  ...flattenEntityTexts('race', english(RACES, ['name', 'lore', 'racials'])),
  ...flattenEntityTexts('profession', english(PROFESSIONS, ['name', 'summary'])),
  ...flattenEntityTexts('perk', english(LEGACY_PERKS, ['name', 'summary'])),
  ...flattenEntityTexts('specTrait', traits(SPEC_TRAITS)),
  ...flattenEntityTexts('raceTrait', traits(RACE_TRAITS)),
  ...flattenEntityTexts('professionTrait', traits(PROFESSION_TRAITS)),
  ...flattenEntityTexts('legacyTrait', traits(LEGACY_TRAITS)),
};

type Group = Partial<Record<string, Evidence>>;
// Shared notes are recognized by their note object, which a copy of the entry (`{ ...SHARED_EVIDENCE.x }`) keeps.
const sharedNotes = new Set<unknown>(Object.values(SHARED_EVIDENCE).map((e) => e.note));
/** English notes of a group that belong to their position, i.e. without the shared ones. */
const notesOf = (group: object): Record<string, string> =>
  Object.fromEntries(
    Object.entries(group as Group).flatMap(([trait, e]) =>
      e?.note && !sharedNotes.has(e.note) ? [[trait, e.note.en]] : [],
    ),
  );
const positional = (prefix: string, entries: { id: string; evidence?: object }[]): [string, string][] =>
  entries.flatMap(({ id, evidence = {} }) =>
    Object.entries(notesOf(evidence)).map(
      ([trait, note]) => [`evidence.${prefix}.${id}.${trait}`, note] as [string, string],
    ),
  );

const EN_EVIDENCE: Readonly<Record<string, string>> = {
  ...Object.fromEntries(Object.entries(SHARED_EVIDENCE).map(([id, e]) => [`evidence.${id}`, e.note.en])),
  ...flattenClassNotes(
    Object.fromEntries(
      Object.entries(CLASS_EVIDENCE).map(([classId, c]) => [
        classId,
        {
          shared: notesOf(c.shared),
          specs: Object.fromEntries(Object.entries(c.specs).map(([specId, own]) => [specId, notesOf(own as object)])),
        },
      ]),
    ),
  ),
  ...Object.fromEntries(positional('race', RACES)),
  ...Object.fromEntries(positional('profession', PROFESSIONS)),
};

const EN_SOURCES: Readonly<Record<string, string>> = flattenEntityTexts(
  'source',
  Object.fromEntries(Object.entries(SOURCES).map(([id, source]) => [id, { title: source.title.en }])),
);

export const EN_DATA: Readonly<Record<string, string>> = {
  ...EN_QUESTIONS,
  ...EN_ENTITIES,
  ...EN_EVIDENCE,
  ...EN_SOURCES,
};
