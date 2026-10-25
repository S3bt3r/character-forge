import type { StorageLike } from './storage';

const LANGUAGE_KEY = 'wfc.lang.v1';

/** Stored language choice as a raw value; `pickLanguage` decides whether it applies. null without usable storage. */
export function readStoredLanguage(storage: StorageLike | null): string | null {
  try {
    return storage?.getItem(LANGUAGE_KEY) ?? null;
  } catch {
    return null;
  }
}

/** Remembers the language choice; false if storage is missing or writing fails. */
export function saveLanguage(storage: StorageLike | null, lang: string): boolean {
  if (!storage) return false;
  try {
    storage.setItem(LANGUAGE_KEY, lang);
    return true;
  } catch {
    return false;
  }
}
