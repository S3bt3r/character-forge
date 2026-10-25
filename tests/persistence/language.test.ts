import { describe, it, expect } from 'vitest';
import { readStoredLanguage, saveLanguage } from '../../src/persistence/language';
import type { StorageLike } from '../../src/persistence/storage';
import { MemoryStorage } from '../support/persistence';

describe('Saved language choice', () => {
  it('without usable storage the choice is not stored and nothing throws', () => {
    const broken: StorageLike = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('full');
      },
      removeItem: () => undefined,
    };
    expect(readStoredLanguage(null)).toBeNull();
    expect(readStoredLanguage(broken)).toBeNull();
    // false makes the app show the notice instead of reloading.
    expect(saveLanguage(null, 'de')).toBe(false);
    expect(saveLanguage(broken, 'de')).toBe(false);
  });
});

describe('Saved language choice with storage', () => {
  it('a saved choice is read back; without one there is none', () => {
    const storage = new MemoryStorage();
    expect(readStoredLanguage(storage)).toBeNull();
    expect(saveLanguage(storage, 'de')).toBe(true);
    expect(readStoredLanguage(storage)).toBe('de');
  });
});
