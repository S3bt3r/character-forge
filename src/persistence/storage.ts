import type { Question } from '../domain/questions';
import type { Answers } from '../domain/answers';
import { isValidId, sanitizeAnswerObject, storedAnswers } from './answers-sanitizer';
import { parseJson } from './json';

export type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export interface SavedProfile {
  id: string;
  name: string;
  savedAt: string;
  answers: Answers;
}

export type StorageError = 'unavailable' | 'corrupt' | 'write-failed';
export type StoreResult<T> = { ok: true; value: T } | { ok: false; error: StorageError };

const PROFILES_KEY = 'wfc.profiles.v1';
const DRAFT_KEY = 'wfc.draft.v1';
export const MAX_NAME_LENGTH = 80;

/** Accessing `window.localStorage` can throw in private windows or with blocked site data. */
export function browserStorage(): StorageLike | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

// Only values produced exactly by `toISOString`: they format without errors and sort chronologically as strings.
const isIsoTimestamp = (v: unknown): v is string => {
  if (typeof v !== 'string') return false;
  const ms = Date.parse(v);
  return Number.isFinite(ms) && new Date(ms).toISOString() === v;
};

/** A stored profile before its answers are checked against the catalog. */
type ProfileShape = Omit<SavedProfile, 'answers'> & { answers: unknown };

function isProfileShape(v: unknown): v is ProfileShape {
  // Rejects null and other falsy values; remaining primitives fail at isValidId(p.id).
  if (!v) return false;
  const p = v as Record<string, unknown>;
  return isValidId(p['id']) && typeof p['name'] === 'string' && isIsoTimestamp(p['savedAt']);
}

const byNewestFirst = (a: SavedProfile, b: SavedProfile): number => b.savedAt.localeCompare(a.savedAt);

/** `crypto.randomUUID` exists only in secure contexts (HTTPS, localhost); plain HTTP hosting gets a random fallback. */
function newProfileId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36)}`;
}

/**
 * Saved profiles and the draft in the browser storage. `getStorage` is called once, on first use; if it throws or
 * returns null, the storage counts as unavailable. Profile operations never throw: they report `unavailable`,
 * `corrupt` (the stored list is no JSON array) or `write-failed` in their result. Stored answers pass `questions`
 * through the sanitizer when reading, so unknown questions and options are left out of what `list` and `loadDraft`
 * return. Saving and deleting a profile keep every other stored entry as it is, also one this version cannot read,
 * so a later version can still use what this one ignores; such an entry stays invisible here, and only `reset` removes it.
 */
export function createProfileStore(getStorage: () => StorageLike | null, questions: Question[]) {
  let cachedStorage: StorageLike | null | undefined;
  function storage(): StorageLike | null {
    if (cachedStorage === undefined) {
      try {
        cachedStorage = getStorage();
      } catch {
        cachedStorage = null;
      }
    }
    return cachedStorage;
  }

  /** The stored list as it is, before any check of its entries. */
  function readRaw(): StoreResult<unknown[]> {
    const s = storage();
    if (!s) return { ok: false, error: 'unavailable' };
    let text: string | null;
    try {
      text = s.getItem(PROFILES_KEY);
    } catch {
      return { ok: false, error: 'unavailable' };
    }
    if (text === null) return { ok: true, value: [] };
    const parsed = parseJson(text);
    if (!Array.isArray(parsed)) return { ok: false, error: 'corrupt' };
    return { ok: true, value: parsed };
  }

  function sanitizedProfile(p: ProfileShape): SavedProfile {
    return {
      id: p.id,
      name: p.name.slice(0, MAX_NAME_LENGTH),
      savedAt: p.savedAt,
      answers: sanitizeAnswerObject(p.answers, questions),
    };
  }

  /** Runs a change on the storage; reports a missing storage or a failed write instead of throwing. */
  function tryWrite(change: (s: StorageLike) => void): StoreResult<void> {
    const s = storage();
    if (!s) return { ok: false, error: 'unavailable' };
    try {
      change(s);
      return { ok: true, value: undefined };
    } catch {
      return { ok: false, error: 'write-failed' };
    }
  }

  const write = (profiles: unknown[]): StoreResult<void> =>
    tryWrite((s) => s.setItem(PROFILES_KEY, JSON.stringify(profiles)));

  return {
    list(): StoreResult<SavedProfile[]> {
      const result = readRaw();
      if (!result.ok) return result;
      return { ok: true, value: result.value.filter(isProfileShape).map(sanitizedProfile).sort(byNewestFirst) };
    },

    save(name: string, answers: Answers): StoreResult<SavedProfile> {
      const existing = readRaw();
      if (!existing.ok) return existing;
      const profile: SavedProfile = {
        id: newProfileId(),
        name: name.trim().slice(0, MAX_NAME_LENGTH),
        savedAt: new Date().toISOString(),
        answers,
      };
      const written = write([...existing.value, { ...profile, answers: storedAnswers(answers) }]);
      return written.ok ? { ok: true, value: profile } : written;
    },

    remove(id: string): StoreResult<void> {
      const existing = readRaw();
      if (!existing.ok) return existing;
      return write(existing.value.filter((p) => !isProfileShape(p) || p.id !== id));
    },

    /** Discards all saved profiles; a way out if storage is corrupted. */
    reset(): StoreResult<void> {
      return tryWrite((s) => s.removeItem(PROFILES_KEY));
    },

    /**
     * The draft is purely a convenience: errors are deliberately swallowed, the app keeps running without it. Unlike
     * profiles it is rewritten from the sanitized answers, so it keeps no answers to questions that no longer exist.
     */
    loadDraft(): Answers {
      try {
        const text = storage()?.getItem(DRAFT_KEY);
        return text ? sanitizeAnswerObject(JSON.parse(text), questions) : {};
      } catch {
        return {};
      }
    },

    saveDraft(answers: Answers): void {
      try {
        storage()?.setItem(DRAFT_KEY, JSON.stringify(storedAnswers(answers)));
      } catch {
        // see loadDraft
      }
    },
  };
}

export type ProfileStore = ReturnType<typeof createProfileStore>;
