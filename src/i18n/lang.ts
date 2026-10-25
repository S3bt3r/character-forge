/** English is the reference and comes first; German is a translation. */
const LANGS = ['en', 'de'] as const;
export type Lang = (typeof LANGS)[number];

/*
 * Every language in LANGS is offered. A translation is complete by construction: the compiler requires a German text
 * for every English one, and `npm test` and `npm run build` run the type check. Without it (dev server,
 * Stryker) a missing German text falls back to English in `t()` and `loc()` (`src/ui/t.ts`).
 */
export const availableLanguages = (): Lang[] => [...LANGS];

/** A language tag like `de`, `de-AT` or `DE`. */
const isGerman = (tag: string | undefined): boolean => tag?.toLowerCase().startsWith('de') ?? false;

/**
 * Language at startup: a stored choice wins if it is offered. Otherwise the first browser language
 * decides (`de*` → German, anything else → English), falling back to English if that language is not offered.
 */
export function pickLanguage(stored: string | null, browser: readonly string[], available: readonly Lang[]): Lang {
  if (available.includes(stored as Lang)) return stored as Lang;
  const wanted: Lang = isGerman(browser[0]) ? 'de' : 'en';
  return available.includes(wanted) ? wanted : 'en';
}
