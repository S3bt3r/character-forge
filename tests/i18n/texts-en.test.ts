import { describe, it, expect } from 'vitest';
import { DE } from '../../src/i18n/de';
import { EN_UI as EN } from '../../src/ui/texts';
import { DE_DATA, EN_DATA } from '../support/flat-views';
import { GLOSSARY, GLOSSARY_EXCEPTIONS } from '../support/glossary';

/*
 * Text rules for English, checked directly on the catalogs: key → text.
 */
const en: [string, string][] = Object.entries({ ...EN, ...EN_DATA });
const de: Readonly<Record<string, string>> = { ...DE, ...DE_DATA };

/** Questionnaire texts: chapters, questions, short names, help texts, options and explanations (without deal-breaker reasons). */
const questionnaire = en.filter(
  ([key]) => /^(chapter|question)\./.test(key) || (/^option\./.test(key) && !key.includes('.reason.')),
);
const notes = en.filter(([key]) => key.startsWith('evidence.'));

// Class names come from the catalog itself, abilities from the German list of ability names via the glossary (Sühne = Penance).
const CLASS_NAMES = en.filter(([key]) => /^class\.\w+\.name$/.test(key)).map(([, name]) => name.toLowerCase());
const FORBIDDEN_EN = [
  ...CLASS_NAMES,
  'penance',
  'polymorph',
  'ice block',
  'feign death',
  'vanish',
  'ghost wolf',
  'travel form',
  'portal',
  'totem',
  'soul shard',
  'divine shield',
  'lone wolf',
  'demonic sacrifice',
  'power word',
  'consecration',
  'victory rush',
  'sap',
  'earth shock',
  'frost nova',
  'atonement',
  'lay on hands',
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Pattern of an English glossary term: as a whole word with the glossary's spelling, plus plural
 * (Night Elf → Night Elves, Dwarf → Dwarves). Case matters: glossary terms are proper names, so
 * "no stealth" (mechanic) does not count as "Stealth" (ability).
 */
const englishPattern = (en: string) => {
  const t = escape(en);
  return new RegExp(
    `(?<![A-Za-z])(?:${[t, t.replace(/f$/, 'ves'), t.replace(/y$/, 'ies')].join('|')})(?:s|es)?(?![a-z])`,
    'g',
  );
};

/** Pattern of the German term: as a whole word, only with an inflection ending, unless the glossary gives its own. */
const germanPattern = (g: (typeof GLOSSARY)[number]) =>
  new RegExp(g.dePattern?.source ?? `(?<![a-zäöüß])${escape(g.de)}(?:e|en|er|ern|es|n|s)?(?![a-zäöüß])`, 'i');

/** Entries per English term; several German terms for one English term are equivalent translations. */
const BY_ENGLISH = new Map<string, (typeof GLOSSARY)[number][]>();
for (const g of GLOSSARY) BY_ENGLISH.set(g.en, [...(BY_ENGLISH.get(g.en) ?? []), g]);
const ENGLISH_LONGEST_FIRST = [...BY_ENGLISH.keys()].sort((a, b) => b.length - a.length);

/** Glossary terms in an English text; longer ones first, their match hides shorter ones ("Seed of Corruption" not also "Corruption"). */
function englishTermsIn(text: string): string[] {
  let rest = text;
  const found: string[] = [];
  for (const term of ENGLISH_LONGEST_FIRST) {
    const next = rest.replace(englishPattern(term), (m) => ' '.repeat(m.length));
    if (next !== rest) found.push(term);
    rest = next;
  }
  return found;
}

/** Matches per English text, computed once (otherwise over 400 terms × 1,800 texts × 400 patterns). */
const TERMS_BY_KEY = new Map(en.map(([key, text]) => [key, englishTermsIn(text)]));
const USED_TERMS = new Set([...TERMS_BY_KEY.values()].flat());
const EXCEPTIONS = new Set(GLOSSARY_EXCEPTIONS.map((x) => `${x.key}|${x.en}`));
/** As a whole word, also in the plural ("Rogues", "Totems"); "mage" does not count in "damage". */
const word = (term: string) => new RegExp(`(?<![a-z])${escape(term.toLowerCase())}(?:s|es)?(?![a-z])`);

describe('English question texts', () => {
  it('no class names and no specific abilities', () => {
    for (const [key, text] of questionnaire) {
      const lower = text.toLowerCase();
      for (const term of FORBIDDEN_EN) expect(word(term).test(lower), `${key}: "${term}" in "${text}"`).toBe(false);
    }
  });

  it('options with a short explanation and a concise title, unique short names up to 24 characters', () => {
    for (const [key, text] of questionnaire) {
      if (key.endsWith('.hint')) {
        expect(text.trim().length, key).toBeGreaterThan(10);
        expect(text.length, key).toBeLessThanOrEqual(160);
      }
      if (key.startsWith('option.') && key.endsWith('.label')) expect(text.length, key).toBeLessThanOrEqual(60);
      if (key.endsWith('.short')) expect(text.length, key).toBeLessThanOrEqual(24);
    }
    const shorts = questionnaire.filter(([key]) => key.endsWith('.short')).map(([, text]) => text.toLowerCase());
    expect(new Set(shorts).size).toBe(shorts.length);
  });
});

describe('English language', () => {
  it('no dashes and no "editorial"', () => {
    for (const [key, text] of en) {
      // Dashes and their substitutes; "–" is only allowed as a range dash between numbers ("1–12").
      expect(/\s(?:-{1,2}|[–—―‒])\s|[—―‒]|(?<!\d)–|–(?!\d)/.test(text), `${key}: "${text}"`).toBe(false);
      expect(/editorial/i.test(text), `${key}: "${text}"`).toBe(false);
      // Untranslated leftovers: umlauts and ß do not occur in English.
      expect(/[äöüÄÖÜß]/.test(text), `${key}: "${text}"`).toBe(false);
    }
  });

  it('the English UI uses US English', () => {
    if (EN.locale !== undefined) expect(EN.locale).toBe('en-US');
    // British spellings; "Judgement" is the official spell name and therefore not in the list.
    const BRITISH =
      /\b(\w*(?:armour|colour|favour|honour|behaviour|flavour|neighbour|labour|rumour)\w*|grey|centre|defence|offence|licence|catalogue|programme|manoeuvre|whilst|learnt|(?:travel|level|cancel|label|model|signal|fuel)l(?:ed|ing|er)|analys(?:e|ed|ing)|realis(?:e|ed|ing)|organis(?:e|ed|ing)|recognis(?:e|ed|ing)|practis(?:e|ed|ing))\b/i;
    for (const [key, text] of en) expect(text.match(BRITISH)?.[0], `${key}: "${text}"`).toBeUndefined();
  });

  it('provenance notes do not repeat the provenance', () => {
    for (const [key, text] of notes) {
      expect(
        /\b(?:as|like|just like|same as|identical to|unchanged from|carried over from)(?: it was)?(?: in)? (?:wow |the )?(?:classic|vanilla|original game)\b/i.test(
          text,
        ),
        `${key}: "${text}"`,
      ).toBe(false);
      expect(
        /\b(?:not (?:yet |specifically |explicitly )?(?:been )?confirmed (?:for|in) forever|unconfirmed for forever|not mentioned in (?:the )?forever sources?)\b/i.test(
          text,
        ),
        `${key}: "${text}"`,
      ).toBe(false);
    }
  });
});

describe('Glossary', () => {
  const SOURCE =
    /^(article:\d+|devnotes|podcast-[1-5]|wowhead-forever:[a-z]+=\d+|wowhead-classic:[a-z]+=\d+|maintainer)$/;

  it('the glossary is unique and every entry has a source and is used', () => {
    const keys = GLOSSARY.map((g) => g.de.toLowerCase());
    expect(new Set(keys).size).toBe(keys.length);
    for (const g of GLOSSARY) {
      expect(g.de.trim(), g.de).not.toBe('');
      expect(g.en.trim(), g.de).not.toBe('');
      expect(g.source, g.de).toMatch(SOURCE);
      // The English term must occur in an English text, otherwise the entry is dead.
      expect(USED_TERMS.has(g.en), `${g.en} does not occur in any English text`).toBe(true);
    }
    // Every exception must still be needed and justified.
    for (const x of GLOSSARY_EXCEPTIONS) {
      expect(TERMS_BY_KEY.get(x.key) ?? [], `${x.key}: exception for "${x.en}" is not needed`).toContain(x.en);
      // Needed means: without the exception the check would fail, because the German text lacks the term.
      const german = de[x.key] ?? '';
      expect(
        BY_ENGLISH.get(x.en)!.some((g) => germanPattern(g).test(german)),
        `${x.key}: exception for "${x.en}" is not needed`,
      ).toBe(false);
      expect(x.reason.trim(), x.key).not.toBe('');
    }
  });

  it('if a glossary term is in the English text, the German one is in the German text at the same place', () => {
    for (const [key, text] of en) {
      const german = de[key];
      if (german === undefined) continue;
      for (const term of TERMS_BY_KEY.get(key) ?? []) {
        if (EXCEPTIONS.has(`${key}|${term}`)) continue;
        const entries = BY_ENGLISH.get(term)!;
        const ok = entries.some((g) => germanPattern(g).test(german));
        expect(
          ok,
          `${key}: "${term}" → "${entries.map((g) => g.de).join('" or "')}" in "${german}" (English: "${text}")`,
        ).toBe(true);
      }
    }
  });
});

/* Notes for the player (docs/DATA.md, "Texts"): the rules below hold for every note. */

// Class, spec and race names as well as schools, resources, stats and armor types are no ability names.
const catalogNames = (pattern: RegExp) => en.filter(([key]) => pattern.test(key)).map(([, name]) => name);
const NOT_ABILITY_NAMES = new Set([
  // Race names such as "Skyborne (Windshaper)" also count without the parenthesized variant.
  ...catalogNames(/^(?:class|spec|race)\.[\w-]+\.name$/).flatMap((name) => [name, name.replace(/ \(.*\)$/, '')]),
  ...['Arcane', 'Nature', 'Fire', 'Frost', 'Shadow', 'Holy', 'Fel', 'Defense', 'Intellect', 'Strength', 'Agility'],
  ...['Stamina', 'Spirit', 'Energy', 'Rage', 'Mana', 'Armor', 'Health', 'Dodge', 'Leather', 'Mail', 'Plate', 'Cloth'],
  ...['Alliance', 'Horde', 'Legacy', 'Stealth', 'Bleed', 'Curse', 'Poison', 'Disease', 'Magic'],
]);
/** Names of abilities, talents and forms in a note: glossary proper names that are none of the above. */
const abilityNames = (text: string) =>
  englishTermsIn(text).filter((term) => /^[A-Z]/.test(term) && !NOT_ABILITY_NAMES.has(term));

const SCALE_TALK_EN =
  /\b(?:of the scale|mid-?scale|(?:well|far|slightly|just) (?:above|below)|level with|of the three specs|rated for|not quite 1)\b/i;
const SCALE_TALK_DE =
  /(?:der Skala|(?:weit|deutlich|knapp) (?:über|unter) |gleichauf mit|der drei Specs|bewertet für)/i;

describe('Notes for the player', () => {
  it('at most three names of abilities, talents and forms per note', () => {
    for (const [key, text] of notes)
      expect(abilityNames(text).length, `${key}: ${abilityNames(text).join(', ')}`).toBeLessThanOrEqual(3);
  });

  it('no placement on the scale, no guide named by site, no bare short note', () => {
    for (const [key, text] of notes) {
      const german = de[key] ?? '';
      expect(SCALE_TALK_EN.test(text), `${key}: "${text}"`).toBe(false);
      expect(SCALE_TALK_DE.test(german), `${key}: "${german}"`).toBe(false);
      expect(/wowhead/i.test(text + german), `${key}: "${text}" / "${german}"`).toBe(false);
      expect(text, key).not.toBe('Theme distant.');
      expect(german, key).not.toBe('Thema fern.');
    }
  });
});

describe('Time units as in the game client', () => {
  it('"sec" and "min" in English, "Sek." and "Min." in German', () => {
    for (const [key, text] of en)
      expect(text.match(/\d ?(?:s|seconds?|minutes?)\b/)?.[0], `${key}: "${text}"`).toBeUndefined();
    for (const [key, text] of Object.entries(de))
      expect(
        text.match(/\d ?(?:s|Sek|min|Min)\b(?!\.)|\d ?(?:Sekunden?|Minuten?)\b/)?.[0],
        `${key}: "${text}"`,
      ).toBeUndefined();
  });
});
