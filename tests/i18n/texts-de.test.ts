import { describe, it, expect } from 'vitest';
import { CHAPTERS, QUESTIONS } from '../../src/data/questions';
import { CLASSES } from '../../src/data/classes';
import { RACES } from '../../src/data/races';
import { PROFESSIONS } from '../../src/data/professions';
import { LEGACY_PERKS } from '../../src/data/legacy';
import { SPECS } from '../../src/data/specs';
import { DE } from '../../src/i18n/de';
import { DE_DATA } from '../support/flat-views';

/*
 * Question texts should not steer anyone toward a class and should be understandable without prior WoW knowledge.
 * That is why there are no class names and no specific ability names in questions, help texts, options and explanations.
 */
const FORBIDDEN = [
  // classes (word stems cover plurals and compounds)
  'krieger',
  'paladin',
  'jäger',
  'schurke',
  'priester',
  'schamane',
  'magier',
  'hexenmeister',
  'hexer',
  'druide',
  // specific abilities and class-specific mechanics
  'verwandlung',
  'eisblock',
  'totstell',
  'verschwinden',
  'geisterwolf',
  'reisegestalt',
  'portal',
  'totem',
  'seelensplitter',
  'gottesschild',
  'einsamer wolf',
  'dämonische opferung',
  'machtwort',
  'weihe',
  'siegesrausch',
  'kopfnuss',
  'erdschock',
  'frostnova',
  'sühne',
  'handauflegung',
];

/** Home-made German renderings for which WoW players use other, established terms (stems cover inflection). */
const INVENTED = [
  'verlies',
  'schlachtzug',
  'schlachtzüg',
  'auftrag',
  'aufträg',
  'aufsteig',
  'aufstieg',
  'stufe',
  'gruppenabenteuer',
  'herbeihol',
  'rangliste',
  'zweikampf',
  'zweikämpf',
  'ansehen',
  'angesehen',
  'schlachtfeld',
  'stärkung',
  'computergesteuert',
];

function texts(): { where: string; text: string }[] {
  const result = CHAPTERS.flatMap((c) => [
    { where: `chapter ${c.id}`, text: c.title.de! },
    { where: `chapter ${c.id} intro`, text: c.intro.de! },
  ]);
  for (const q of QUESTIONS) {
    result.push({ where: `${q.id} text`, text: q.text.de! });
    result.push({ where: `${q.id} short`, text: q.short.de! });
    if (q.help) result.push({ where: `${q.id} help`, text: q.help.de! });
    for (const o of q.options) {
      result.push({ where: `${q.id}/${o.id} label`, text: o.label.de! });
      if (o.hint) result.push({ where: `${q.id}/${o.id} hint`, text: o.hint.de! });
    }
  }
  return result;
}

describe('Question texts', () => {
  it('no class names and no specific ability names', () => {
    for (const { where, text } of texts()) {
      const lower = text.toLowerCase();
      for (const word of FORBIDDEN) expect(lower.includes(word), `${where}: "${word}" in "${text}"`).toBe(false);
    }
  });

  it('common WoW terms instead of invented German renderings', () => {
    for (const { where, text } of texts()) {
      const lower = text.toLowerCase();
      for (const word of INVENTED) expect(lower.includes(word), `${where}: "${word}" in "${text}"`).toBe(false);
    }
  });

  it('every option has a short explanation', () => {
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        const where = `${q.id}/${o.id}`;
        expect(o.hint?.de?.trim().length ?? 0, where).toBeGreaterThan(10);
        expect(o.hint!.de!.length, where).toBeLessThanOrEqual(160);
        expect(o.label.de!.length, where).toBeLessThanOrEqual(60);
      }
    }
  });
});

describe('Short names of the questions', () => {
  it('every question has a unique short name with at most 24 characters', () => {
    const shorts = QUESTIONS.map((q) => q.short.de!);
    for (const q of QUESTIONS) {
      expect(q.short.de!.trim().length, q.id).toBeGreaterThan(0);
      expect(q.short.de!.length, q.id).toBeLessThanOrEqual(24);
    }
    expect(new Set(shorts).size).toBe(shorts.length);
  });
});

/** All visible German texts: the question catalog plus classes, races, professions, Legacy perks, provenance notes and UI. */
function allVisibleTexts(): { where: string; text: string }[] {
  const out = texts();
  for (const c of CLASSES)
    out.push(
      { where: `class ${c.id}`, text: c.summary.de! },
      { where: `class ${c.id} resources`, text: c.resources.de! },
    );
  for (const r of RACES)
    out.push({ where: `race ${r.id} lore`, text: r.lore.de! }, { where: `race ${r.id} racials`, text: r.racials.de! });
  for (const p of PROFESSIONS) out.push({ where: `prof ${p.id}`, text: p.summary.de! });
  for (const p of LEGACY_PERKS) out.push({ where: `perk ${p.id}`, text: p.summary.de! });
  for (const s of SPECS)
    for (const [trait, e] of Object.entries(s.evidence ?? {}))
      if (e?.note) out.push({ where: `spec ${s.id}/${trait} note`, text: e.note.de! });
  for (const r of RACES)
    for (const [trait, e] of Object.entries(r.evidence ?? {}))
      if (e?.note) out.push({ where: `race ${r.id}/${trait} note`, text: e.note.de! });
  for (const p of PROFESSIONS)
    for (const [trait, e] of Object.entries(p.evidence ?? {}))
      if (e?.note) out.push({ where: `prof ${p.id}/${trait} note`, text: e.note.de! });
  for (const [key, value] of Object.entries(DE)) out.push({ where: `DE ${key}`, text: value });
  return out;
}

/** WoW-specific jargon that cannot be understood without WoW knowledge (in explanation texts; proper names and provenance notes excluded). */
const WOW_ONLY = [
  'versammlungsstein',
  'siegesrausch',
  'gottesschild',
  'geisterlauf',
  'kürzlich bandagiert',
  'verstohlenheitsaufdeckung',
  'hybrid-steuer',
  'tote zone',
  'nicht-trivial',
];

describe('Language for MMORPG players', () => {
  it('no dashes in any German text, the same rule as in English', () => {
    // Dashes and their substitutes; "–" is only allowed as a range dash between numbers ("1–12").
    for (const [key, text] of Object.entries({ ...DE, ...DE_DATA })) {
      if (text !== undefined)
        expect(/\s(?:-{1,2}|[–—―‒])\s|[—―‒]|(?<!\d)–|–(?!\d)/.test(text), `${key}: "${text}"`).toBe(false);
    }
  });

  it('no WoW-specific jargon without explanation', () => {
    for (const { where, text } of allVisibleTexts().filter((t) => !t.where.endsWith(' note'))) {
      const lower = text.toLowerCase();
      for (const word of WOW_ONLY) expect(lower.includes(word), `${where}: "${word}" in "${text}"`).toBe(false);
    }
  });

  it('provenance notes also use no invented German renderings', () => {
    // Only at the start of a word: "Verstärkung" is a spec name, not a German rendering of "buff".
    for (const { where, text } of allVisibleTexts().filter((t) => t.where.endsWith(' note'))) {
      const lower = text.toLowerCase();
      for (const word of INVENTED)
        expect(new RegExp(`(?<![a-zäöüß])${word}`).test(lower), `${where}: "${word}" in "${text}"`).toBe(false);
    }
  });

  it('no "redaktionell" in visible texts', () => {
    for (const { where, text } of allVisibleTexts())
      expect(/redaktionell/i.test(text), `${where}: "${text}"`).toBe(false);
  });

  it('Classic notes do not repeat the provenance', () => {
    const all = [...SPECS, ...RACES, ...PROFESSIONS] as {
      id: string;
      evidence?: Partial<Record<string, { provenance: string; note?: { de: string } }>>;
    }[];
    for (const x of all) {
      for (const [trait, e] of Object.entries(x.evidence ?? {})) {
        if (!e?.note) continue;
        expect(/wie in (WoW )?Classic/i.test(e.note.de!), `${x.id}/${trait}: "${e.note.de!}"`).toBe(false);
        if (e.provenance === 'classic')
          expect(
            /nicht eigens bestätigt|Forever-Quellen nicht erwähnt/i.test(e.note.de!),
            `${x.id}/${trait}: "${e.note.de!}"`,
          ).toBe(false);
      }
    }
  });

  it('every racial ability carries an explanation in parentheses', () => {
    for (const r of RACES) {
      const parts = r.racials.de!.replace(/\.$/, '').split(/,\s(?![^()]*\))/);
      for (const part of parts) expect(part, `${r.id}: "${part}"`).toMatch(/\(.+\)/);
    }
  });
});
