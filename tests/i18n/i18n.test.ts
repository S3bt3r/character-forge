import { describe, it, expect } from 'vitest';
import { availableLanguages, type Lang } from '../../src/i18n/lang';
import { DE } from '../../src/i18n/de';
import { EN_UI as EN } from '../../src/ui/texts';
import { DE_DATA, DE_ENTITIES, DE_EVIDENCE, DE_QUESTIONS, DE_SOURCES, EN_DATA } from '../support/flat-views';
import { SOURCES, sourceUrl, type SourceId } from '../../src/data/sources';
import { CLASSES } from '../../src/data/classes';
import { COMBOS } from '../../src/data/combos';
import { SHARED_EVIDENCE } from '../../src/data/evidence/shared';
import { LEGACY_PERKS, LEGACY_TRAITS } from '../../src/data/legacy';
import { PROFESSIONS, PROFESSION_TRAITS } from '../../src/data/professions';
import { RACES } from '../../src/data/races';
import { SPECS } from '../../src/data/specs';
import { RACE_TRAITS, SPEC_TRAITS } from '../../src/data/traits';
import { CHAPTERS } from '../../src/data/questions';
import { QUESTIONS } from '../../src/ui/catalog';
import type { Evidence, LocalizedText } from '../../src/data/display';
import { CLASS_EVIDENCE } from '../support/class-evidence';

const LANGS = availableLanguages();

describe('Translation parity', () => {
  const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
  const numbers = (text: string) => [...text.matchAll(/\d+(?:[.,]\d+)?/g)].map((m) => m[0].replace(',', '.')).sort();

  it('every German UI text has exactly the placeholders of its English original', () => {
    for (const [key, text] of Object.entries(EN))
      expect(placeholders(DE[key as keyof typeof DE]), key).toEqual(placeholders(text));
  });

  it('every German UI text has the same numbers as its English original', () => {
    for (const [key, text] of Object.entries(EN))
      expect(numbers(DE[key as keyof typeof DE]), key).toEqual(numbers(text));
  });

  it('every German data text has the same numbers as its English original', () => {
    // Catches a translation attached to the wrong entry and numbers lost in translation (levels, percentages, seconds).
    for (const [key, text] of Object.entries(EN_DATA)) expect(numbers(DE_DATA[key] ?? ''), key).toEqual(numbers(text));
  });
});

describe('Completeness of the catalogs', () => {
  it('German is complete: every English UI and data text has a non-empty German one, none without an English one', () => {
    // The compiler guarantees most of this; empty texts it does not see, and vitest alone runs without type checking.
    for (const key of Object.keys(EN)) expect((DE[key as keyof typeof DE] ?? '').trim(), key).not.toBe('');
    for (const key of Object.keys(EN_DATA)) expect((DE_DATA[key] ?? '').trim(), key).not.toBe('');
    expect(Object.keys(DE).filter((key) => !(key in EN))).toEqual([]);
    expect(Object.keys(DE_DATA).filter((key) => !(key in EN_DATA))).toEqual([]);
  });

  it('every language is offered, English first', () => {
    expect(availableLanguages()).toEqual(['en', 'de']);
  });

  it('the English reference has no empty texts', () => {
    for (const [key, value] of [...Object.entries(EN), ...Object.entries(EN_DATA)])
      expect(value.trim(), key).not.toBe('');
  });

  it('every questionnaire text is in both languages under its key in the flat view', () => {
    const expected: [string, LocalizedText | undefined][] = CHAPTERS.flatMap((c) => [
      [`chapter.${c.id}.title`, c.title],
      [`chapter.${c.id}.intro`, c.intro],
    ]);
    for (const q of QUESTIONS) {
      expected.push(
        [`question.${q.id}.text`, q.text],
        [`question.${q.id}.short`, q.short],
        [`question.${q.id}.help`, q.help],
      );
      for (const o of q.options) {
        expected.push([`option.${q.id}.${o.id}.label`, o.label], [`option.${q.id}.${o.id}.hint`, o.hint]);
        for (const e of o.effects)
          if (e.kind === 'dealbreaker') expected.push([`option.${q.id}.${o.id}.reason.${e.trait}`, e.reason]);
      }
    }
    for (const [key, text] of expected) {
      expect(DE_DATA[key], key).toBe(text?.de);
    }
    // Conversely: no questionnaire key without text in the data.
    const keys = new Set(expected.filter(([, text]) => text).map(([key]) => key));
    expect(Object.keys(DE_QUESTIONS).filter((key) => !keys.has(key))).toEqual([]);
  });

  it('every other data text is in both languages under its key in the flat view, the data shows exactly it', () => {
    const expected: [string, LocalizedText | undefined][] = [];
    const fields = (prefix: string, id: string, texts: Record<string, LocalizedText | undefined>) => {
      for (const [field, text] of Object.entries(texts)) expected.push([`${prefix}.${id}.${field}`, text]);
    };
    for (const c of CLASSES) fields('class', c.id, { name: c.name, resources: c.resources, summary: c.summary });
    for (const s of SPECS) fields('spec', s.id, { name: s.name });
    for (const r of RACES) fields('race', r.id, { name: r.name, lore: r.lore, racials: r.racials });
    for (const p of PROFESSIONS) fields('profession', p.id, { name: p.name, summary: p.summary });
    for (const p of LEGACY_PERKS) fields('perk', p.id, { name: p.name, summary: p.summary });
    const tables = {
      specTrait: SPEC_TRAITS,
      raceTrait: RACE_TRAITS,
      professionTrait: PROFESSION_TRAITS,
      legacyTrait: LEGACY_TRAITS,
    };
    for (const [prefix, table] of Object.entries(tables))
      for (const [id, t] of Object.entries(table)) fields(prefix, id, { label: t.label, scale: t.scale });
    for (const [id, source] of Object.entries(SOURCES)) fields('source', id, { title: source.title });

    // Notes: shared ones under `evidence.<id>`, otherwise under the position of their evidence entry.
    const sharedKey = (e: Evidence) => Object.entries(SHARED_EVIDENCE).find(([, shared]) => shared === e)?.[0];
    const note = (positional: string, e: Evidence) => {
      const shared = sharedKey(e);
      expected.push([shared ? `evidence.${shared}` : positional, e.note]);
    };
    for (const s of SPECS) {
      const own = CLASS_EVIDENCE[s.classId]!.specs[s.id] ?? {};
      for (const [trait, e] of Object.entries((s.evidence ?? {}) as Record<string, Evidence>)) {
        note(trait in own ? `evidence.${s.id}.${trait}` : `evidence.${s.classId}.${trait}`, e);
      }
    }
    for (const r of RACES)
      for (const [trait, e] of Object.entries((r.evidence ?? {}) as Record<string, Evidence>))
        note(`evidence.race.${r.id}.${trait}`, e);
    for (const p of PROFESSIONS)
      for (const [trait, e] of Object.entries((p.evidence ?? {}) as Record<string, Evidence>))
        note(`evidence.profession.${p.id}.${trait}`, e);
    for (const c of COMBOS) note(`evidence.combo.${c.raceId}.${c.classId}`, c.evidence);

    for (const [key, text] of expected) {
      expect(DE_DATA[key], key).toBe(text?.de);
    }
    // Conversely: no flat view key without text in the data.
    const keys = new Set(expected.filter(([, text]) => text).map(([key]) => key));
    const flat = [...Object.keys(DE_ENTITIES), ...Object.keys(DE_EVIDENCE), ...Object.keys(DE_SOURCES)];
    expect(flat.filter((key) => !keys.has(key))).toEqual([]);
  });

  it('German is translated: every longer data text differs from its English original', () => {
    // The English flat view comes from the data itself; a German text ending up there, or an English text left in the
    // German catalog, shows as an identical pair. Short texts (names, terms like "Paladin", "PvP") may be identical.
    const same = Object.keys(EN_DATA).filter((key) => EN_DATA[key]!.length >= 20 && DE_DATA[key] === EN_DATA[key]);
    expect(same).toEqual([]);
    expect(Object.keys(EN_DATA).filter((key) => EN_DATA[key]!.length >= 20).length).toBeGreaterThan(1000);
  });
});

describe('Sources per language', () => {
  const ids = Object.keys(SOURCES) as SourceId[];

  it('a source link uses the version in the language, otherwise the available one', () => {
    for (const id of ids) {
      const urls: Partial<Record<Lang, string>> = SOURCES[id].url ?? {};
      for (const lang of LANGS) {
        const other = LANGS.find((l) => l !== lang)!;
        expect(sourceUrl(SOURCES[id], lang), `${id}/${lang}`).toBe(urls[lang] ?? urls[other]);
      }
    }
  });

  it('Blizzard articles: German version under de-de, English under en-us, same article ID', () => {
    const blizzard = ids.filter((id) =>
      Object.values(SOURCES[id].url ?? {}).some((u) => u.includes('worldofwarcraft.blizzard.com')),
    );
    expect(blizzard.length).toBeGreaterThan(0);
    for (const id of blizzard) {
      const { de, en } = SOURCES[id].url!;
      expect(de, id).toMatch(/^https:\/\/worldofwarcraft\.blizzard\.com\/de-de\/news\/\d+$/);
      expect(en, id).toMatch(/^https:\/\/worldofwarcraft\.blizzard\.com\/en-us\/news\/\d+$/);
      expect(en!.match(/news\/(\d+)/)![1], id).toBe(de!.match(/news\/(\d+)/)![1]);
    }
  });

  it('every source except Classic has a web address', () => {
    for (const id of ids) {
      const urls = Object.values(SOURCES[id].url ?? {});
      if (id === 'classic') expect(urls, id).toEqual([]);
      else expect(urls.length, id).toBeGreaterThan(0);
    }
  });

  it('sources with a web address have only https addresses and every language gets a link', () => {
    for (const id of ids) {
      const urls = Object.values(SOURCES[id].url ?? {});
      for (const url of urls) expect(url, id).toMatch(/^https:\/\//);
      if (urls.length > 0)
        for (const lang of LANGS) expect(sourceUrl(SOURCES[id], lang), `${id}/${lang}`).toBeDefined();
    }
  });
});
