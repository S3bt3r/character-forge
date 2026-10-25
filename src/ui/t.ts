import type { LocalizedText } from '../data/display';
import { DE } from '../i18n/de';
import { EN_UI as EN, type MessageKey } from './texts';
import type { Lang } from '../i18n/lang';

/*
 * Deliberately without an i18n library: one catalog per language with the same keys. The active language is set by
 * language-init.ts (first import in main.tsx) before the first render; a switch reloads the page so that
 * precomputed texts are correct. English is the reference language.
 */
const MESSAGES: Record<Lang, Partial<Record<MessageKey, string>>> = { de: DE, en: EN };
let active: Lang = 'en';

export function setLanguage(lang: Lang): void {
  active = lang;
}

export const activeLanguage = (): Lang => active;

/**
 * The UI text in the active language, with `{name}` placeholders filled from `params`; a placeholder without a param
 * stays as it is. A missing translation falls back to English; the compiler requires complete translations, so this only
 * matters where code runs without type checking (dev server).
 */
export function t(key: MessageKey, params: Record<string, string | number> = {}): string {
  const template = MESSAGES[active][key] ?? EN[key];
  return template.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
}

/** A data text in the active language, or its English original if it has no translation. */
export function loc(text: LocalizedText): string {
  return text[active] ?? text.en;
}
