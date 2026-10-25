import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { availableLanguages, pickLanguage, type Lang } from '../../src/i18n/lang';

const LANGS = availableLanguages();
const langArb = fc.constantFrom<Lang>(...LANGS);
const browserArb = fc.array(
  fc.oneof(fc.constantFrom('de', 'de-DE', 'de-AT', 'en-US', 'en', 'fr-FR', 'es', 'ja'), fc.string()),
  { maxLength: 4 },
);
const availableArb = fc.subarray([...LANGS]).map((ls) => (ls.includes('en') ? ls : [...ls, 'en' as Lang]));

describe('Language choice', () => {
  it('a saved, offered language takes precedence over the browser language', () => {
    fc.assert(
      fc.property(langArb, browserArb, availableArb, (stored, browser, available) => {
        const result = pickLanguage(stored, browser, available);
        expect(result).toBe(available.includes(stored) ? stored : pickLanguage(null, browser, available));
      }),
    );
  });

  it('without a saved choice: de* yields German, any other browser language English, if offered', () => {
    fc.assert(
      fc.property(browserArb, availableArb, (browser, available) => {
        const first = browser[0]?.toLowerCase() ?? '';
        const wanted: Lang = first.startsWith('de') ? 'de' : 'en';
        expect(pickLanguage(null, browser, available)).toBe(available.includes(wanted) ? wanted : 'en');
      }),
    );
    expect(pickLanguage(null, ['fr-FR'], ['de', 'en'])).toBe('en');
    expect(pickLanguage(null, ['de-AT'], ['en'])).toBe('en');
    expect(pickLanguage(null, ['de-AT', 'en'], ['de', 'en'])).toBe('de');
    expect(pickLanguage(null, [], ['de', 'en'])).toBe('en');
    // de* means: the language code starts with de, case-insensitive; en-DE is English.
    expect(pickLanguage(null, ['en-DE'], ['de', 'en'])).toBe('en');
    expect(pickLanguage(null, ['DE-de'], ['de', 'en'])).toBe('de');
  });

  it('invalid saved values count as no choice; the result is always offered', () => {
    fc.assert(
      fc.property(fc.oneof(fc.constant(null), fc.string()), browserArb, availableArb, (stored, browser, available) => {
        const result = pickLanguage(stored, browser, available);
        expect(available).toContain(result);
        if (!available.includes(stored as Lang)) expect(result).toBe(pickLanguage(null, browser, available));
      }),
    );
  });
});
