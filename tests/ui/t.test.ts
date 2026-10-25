import { describe, it, expect, afterEach, vi } from 'vitest';

// Partially translated German UI catalog: checks that gaps of a translation fall back to English one by one.
// Data texts are fully translated by type and come from the real files.
vi.mock('../../src/i18n/de', () => ({
  DE: { appTitle: 'Charakterschmiede', percent: '{n} %' },
}));
// tests/support/setup.ts has already loaded the real catalogs; reload them so the substitute catalog takes effect.
vi.resetModules();

const { EN_UI: EN } = await import('../../src/ui/texts');
const { activeLanguage, loc, setLanguage, t } = await import('../../src/ui/t');
const { QUESTIONS } = await import('../../src/data/questions');

afterEach(() => setLanguage('en'));

const role = QUESTIONS.find((q) => q.id === 'role')!;
const distance = QUESTIONS.find((q) => q.id === 'distance')!;

describe('Path of a partially translated language', () => {
  it('English applies before the language is chosen at start', () => {
    expect(activeLanguage()).toBe('en');
    expect(t('appTitle')).toBe(EN.appTitle);
  });

  it('the active language applies to UI and data, gaps fall back to English one by one', () => {
    expect(role.text.de).toBeDefined();
    expect(role.text.de).not.toBe(role.text.en);
    setLanguage('de');
    expect(activeLanguage()).toBe('de');
    expect(t('appTitle')).toBe('Charakterschmiede');
    expect(t('restart')).toBe(EN.restart);
    expect(loc(role.text)).toBe(role.text.de);
    expect(loc({ en: distance.text.en })).toBe(distance.text.en);
    setLanguage('en');
    expect(t('appTitle')).toBe(EN.appTitle);
    expect(loc(role.text)).toBe(role.text.en);
  });
});

describe('Placeholders in texts', () => {
  it('placeholders are replaced, a missing value stays visible as {name}', () => {
    expect(t('questionNumber', { n: 7 })).toBe('Question 7');
    expect(t('questionNumber', { n: 0 })).toBe('Question 0');
    expect(t('questionNumber')).toBe('Question {n}');
    expect(t('questionNumber', { count: 3 })).toBe('Question {n}');
  });
});
