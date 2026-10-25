// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act } from 'preact/test-utils';
import { render } from 'preact';

/*
 * Start path and switcher in the app. Both languages are always offered; German comes from a substitute
 * catalog with recognizable texts ("DE appTitle"), so a test can tell which catalog is active. Each scenario reloads
 * the modules.
 */
const substituteGerman = async () => {
  const { EN_UI } = await vi.importActual<typeof import('../src/ui/texts')>('../src/ui/texts');
  // `locale` must be a valid language tag, otherwise Intl fails when loading the profiles.
  return { DE: { ...Object.fromEntries(Object.keys(EN_UI).map((k) => [k, `DE ${k}`])), locale: 'de-DE' } };
};

// The browser languages as happy-dom provides them, restored after every test.
const original = {
  languages: Object.getOwnPropertyDescriptor(navigator, 'languages'),
  language: Object.getOwnPropertyDescriptor(navigator, 'language'),
};
const setBrowser = (languages: string[] | undefined, language = 'en-US') => {
  Object.defineProperty(navigator, 'languages', { value: languages, configurable: true });
  Object.defineProperty(navigator, 'language', { value: language, configurable: true });
};

async function start({
  stored,
  browser,
  navigatorLanguage,
}: {
  stored?: string;
  browser: string[] | undefined;
  navigatorLanguage?: string;
}) {
  vi.resetModules();
  vi.doUnmock('../src/i18n/de');
  // Recognizable German texts, so the assertions can tell the languages apart.
  vi.doMock('../src/i18n/de', substituteGerman);
  localStorage.clear();
  if (stored) localStorage.setItem('wfc.lang.v1', stored);
  setBrowser(browser, navigatorLanguage);
  await import('../src/language-init');
  const { activeLanguage } = await import('../src/ui/t');
  return activeLanguage();
}

let root: HTMLElement;
beforeEach(() => {
  root = document.createElement('div');
  document.body.append(root);
});
afterEach(() => {
  render(null, root);
  root.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  for (const key of ['languages', 'language'] as const) {
    if (original[key]) Object.defineProperty(navigator, key, original[key]);
    else delete (navigator as unknown as Record<string, unknown>)[key];
  }
});

describe('Language at start', () => {
  it('saved choice before browser language, only offered languages, html lang and page title follow', async () => {
    expect(await start({ stored: 'de', browser: ['en-US'] })).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(document.title).toBe('DE appEyebrow DE appTitle');
    expect(await start({ browser: ['de-AT'] })).toBe('de');
    expect(await start({ browser: ['fr-FR'] })).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('WoW Forever Character Forge');
    expect(await start({ stored: 'xx', browser: ['de-DE'] })).toBe('de');
  });

  it("without the browser's language list, its single language decides", async () => {
    expect(await start({ browser: undefined, navigatorLanguage: 'de-CH' })).toBe('de');
    expect(await start({ browser: undefined, navigatorLanguage: 'en-GB' })).toBe('en');
  });
});

// The whole way from the start language to switching in the app; the switcher on its own is in tests/ui/LanguageSwitch.test.tsx.
describe('Switching in the app after the start', () => {
  async function mountApp(stored?: string) {
    await start({ stored, browser: ['de-DE'] });
    const { App } = await import('../src/ui/App');
    await act(() => render(<App />, root));
  }
  const switchButton = (lang: string) =>
    root.querySelector<HTMLButtonElement>(`.language-switch button[lang="${lang}"]`)!;

  it('a choice in the switcher is saved, then the page reloads', async () => {
    await mountApp();
    const reload = vi.spyOn(window.location, 'reload').mockImplementation(() => undefined);
    expect(switchButton('de').getAttribute('aria-pressed')).toBe('true');
    await act(() => switchButton('en').click());
    expect(localStorage.getItem('wfc.lang.v1')).toBe('en');
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('the switcher marks the language chosen at start', async () => {
    await mountApp('en');
    expect(switchButton('en').getAttribute('aria-pressed')).toBe('true');
    expect(switchButton('de').getAttribute('aria-pressed')).toBe('false');
  });

  it('if the choice cannot be saved, a notice appears and the page stays', async () => {
    await mountApp();
    const { DE } = await import('../src/i18n/de');
    const reload = vi.spyOn(window.location, 'reload').mockImplementation(() => undefined);
    // A spy on Storage.prototype has no effect in happy-dom; storage is read anew on every access.
    const real = localStorage;
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => real.getItem(k),
      setItem: () => {
        throw new Error('storage locked');
      },
      removeItem: (k: string) => real.removeItem(k),
    });
    await act(() => switchButton('en').click());
    expect(reload).not.toHaveBeenCalled();
    expect(root.querySelector('div.notice[role="status"]')?.textContent).toContain(DE.languageNotSaved);
  });
});
