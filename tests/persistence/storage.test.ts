import { describe, it, expect, vi, afterEach } from 'vitest';
import { browserStorage, createProfileStore, type StorageLike } from '../../src/persistence/storage';
import { QUESTIONS } from '../../src/data/questions';
import { answersOf, pick, pickHigh, DONT_CARE } from '../support/fixtures';
import { MemoryStorage } from '../support/persistence';

describe('ID limit at exactly 64 characters', () => {
  it('saved profiles with a 64-character ID are kept, 65 are dropped', () => {
    const storage = new MemoryStorage();
    const profile = (id: string) => ({ id, name: id.slice(0, 3), savedAt: '2026-10-18T00:00:00.000Z', answers: {} });
    storage.setItem('wfc.profiles.v1', JSON.stringify([profile('a'.repeat(64)), profile('b'.repeat(65))]));
    const list = createProfileStore(() => storage, QUESTIONS).list();
    expect(list.ok && list.value.map((p) => p.id)).toEqual(['a'.repeat(64)]);
  });
});

describe('Failure modes of every operation', () => {
  const PROFILES = 'wfc.profiles.v1';
  const DRAFT = 'wfc.draft.v1';
  const throwing = (): never => {
    throw new Error('blocked');
  };
  /** A storage whose reads or writes fail; the rest works like MemoryStorage. */
  const failing = (fail: 'read' | 'write') => {
    const storage = new MemoryStorage();
    if (fail === 'read') storage.getItem = throwing;
    else storage.setItem = throwing;
    return storage;
  };

  it('without a usable storage every profile operation reports unavailable instead of an empty list', () => {
    const sources: [string, () => StorageLike | null][] = [
      ['no storage', () => null],
      ['the factory throws', throwing],
      ['reading throws', () => failing('read')],
    ];
    for (const [what, getStorage] of sources) {
      const store = createProfileStore(getStorage, QUESTIONS);
      expect(store.list(), what).toEqual({ ok: false, error: 'unavailable' });
      expect(store.save('x', {}), what).toEqual({ ok: false, error: 'unavailable' });
      expect(store.remove('x'), what).toEqual({ ok: false, error: 'unavailable' });
    }
  });

  it('a damaged list is reported by save and remove too, and stays untouched instead of being overwritten', () => {
    for (const raw of ['not json', '{}', 'null']) {
      const storage = new MemoryStorage();
      storage.setItem(PROFILES, raw);
      const store = createProfileStore(() => storage, QUESTIONS);
      expect(store.save('x', {}), raw).toEqual({ ok: false, error: 'corrupt' });
      expect(store.remove('x'), raw).toEqual({ ok: false, error: 'corrupt' });
      expect(storage.getItem(PROFILES), raw).toBe(raw);
    }
  });

  it('the draft is a convenience: a damaged, unreadable or unwritable storage never throws, and loading yields no answers', () => {
    const damaged = new MemoryStorage();
    damaged.setItem(DRAFT, 'not json');
    expect(createProfileStore(() => damaged, QUESTIONS).loadDraft()).toEqual({});
    expect(createProfileStore(() => failing('read'), QUESTIONS).loadDraft()).toEqual({});
    expect(createProfileStore(() => null, QUESTIONS).loadDraft()).toEqual({});
    expect(() =>
      createProfileStore(() => failing('write'), QUESTIONS).saveDraft(answersOf({ role: pick('tank') })),
    ).not.toThrow();
    expect(() => createProfileStore(throwing, QUESTIONS).saveDraft({})).not.toThrow();
  });
});

describe('Storage input checks', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('a write error with readable storage yields write-failed', () => {
    const storage = new MemoryStorage();
    storage.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    const store = createProfileStore(() => storage, QUESTIONS);
    expect(store.save('x', {})).toEqual({ ok: false, error: 'write-failed' });
    expect(store.remove('x')).toEqual({ ok: false, error: 'write-failed' });
  });

  it('valid JSON that is not an array counts as damaged; reset restores the ability to save', () => {
    const storage = new MemoryStorage();
    const store = createProfileStore(() => storage, QUESTIONS);
    for (const raw of ['{}', 'null', '42']) {
      storage.setItem('wfc.profiles.v1', raw);
      expect(store.list()).toEqual({ ok: false, error: 'corrupt' });
    }
    expect(store.reset().ok).toBe(true);
    expect(store.save('new', {}).ok).toBe(true);
    expect(store.list().ok).toBe(true);
  });

  it('profiles with an invalid date or overlong IDs are dropped', () => {
    const storage = new MemoryStorage();
    storage.setItem(
      'wfc.profiles.v1',
      JSON.stringify([
        { id: 'ok', name: 'A', savedAt: '2026-10-18T00:00:00.000Z', dataVersion: 'v', answers: {} },
        { id: 'bad-date', name: 'B', savedAt: 'no date', dataVersion: 'v', answers: {} },
        { id: 'x'.repeat(200), name: 'C', savedAt: '2026-10-18T00:00:00.000Z', dataVersion: 'v', answers: {} },
      ]),
    );
    const list = createProfileStore(() => storage, QUESTIONS).list();
    expect(list.ok && list.value.map((p) => p.id)).toEqual(['ok']);
  });

  it('browserStorage returns null if accessing localStorage throws', () => {
    vi.stubGlobal('localStorage', undefined);
    expect(browserStorage()).toBeNull();
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('SecurityError');
      },
    });
    try {
      expect(browserStorage()).toBeNull();
    } finally {
      if (original) Object.defineProperty(globalThis, 'localStorage', original);
      else delete (globalThis as Record<string, unknown>)['localStorage'];
    }
  });
});

describe('Profile store: reset, validation and storage lookup', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reset reports unavailable storage and write errors', () => {
    expect(createProfileStore(() => null, QUESTIONS).reset()).toEqual({
      ok: false,
      error: 'unavailable',
    });
    const failing: StorageLike = {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => {
        throw new Error('denied');
      },
    };
    expect(createProfileStore(() => failing, QUESTIONS).reset()).toEqual({
      ok: false,
      error: 'write-failed',
    });
  });

  it('profiles: only real ISO timestamps, name as text, non-empty ID; newest first', () => {
    const storage = new MemoryStorage();
    const data = storage.data;
    const ok = (id: string, savedAt: string) => ({ id, name: id, savedAt, dataVersion: 'v', answers: {} });
    data.set(
      'wfc.profiles.v1',
      JSON.stringify([
        ok('old', '2026-01-01T00:00:00.000Z'),
        ok('new', '2026-10-18T00:00:00.000Z'),
        ok('number', '1'),
        ok('text', 'Mar 5'),
        { ...ok('name', '2026-05-01T00:00:00.000Z'), name: 42 },
        ok('', '2026-05-01T00:00:00.000Z'),
      ]),
    );
    const list = createProfileStore(() => storage, QUESTIONS).list();
    expect(list.ok && list.value.map((p) => p.id)).toEqual(['new', 'old']);
  });

  it('the store asks for the storage once, so profiles saved earlier stay visible', () => {
    // A factory that hands out a fresh, empty storage on every call: only resolving it once keeps the saved profile.
    let calls = 0;
    const store = createProfileStore(() => {
      calls++;
      return new MemoryStorage();
    }, QUESTIONS);
    expect(store.save('kept', {}).ok).toBe(true);
    const listed = store.list();
    expect(listed.ok && listed.value.map((p) => p.name)).toEqual(['kept']);
    expect(calls).toBe(1);
  });
});

describe('Profile entries and names', () => {
  const profile = (over: Record<string, unknown> = {}) => ({
    id: 'p1',
    name: 'Test',
    savedAt: '2026-10-19T10:00:00.000Z',
    dataVersion: 'v',
    answers: answersOf({ role: pick('tank') }),
    ...over,
  });
  const storeWith = (stored: unknown) => {
    const storage = new MemoryStorage();
    storage.setItem('wfc.profiles.v1', JSON.stringify(stored));
    return createProfileStore(() => storage, QUESTIONS);
  };

  it('entries that are not objects and date values that are not text are skipped', () => {
    const list = storeWith([null, 5, 'x', profile({ savedAt: 1760868000000 }), profile({ id: 'ok' })]).list();
    expect(list.ok && list.value.map((p) => p.id)).toEqual(['ok']);
  });

  it('profile names are truncated to 80 characters when reading and saving, without surrounding whitespace when saving', () => {
    const read = storeWith([profile({ name: 'x'.repeat(100) })]).list();
    expect(read.ok && read.value[0]!.name).toBe('x'.repeat(80));
    const store = storeWith([]);
    expect(store.save('  My profile  ', {}).ok).toBe(true);
    expect(store.save('y'.repeat(100), {}).ok).toBe(true);
    const saved = store.list();
    expect(saved.ok && saved.value.map((p) => p.name).sort()).toEqual(['My profile', 'y'.repeat(80)]);
  });

  it('when saving, the stored name is already truncated, not just the list that is read', () => {
    const storage = new MemoryStorage();
    const result = createProfileStore(() => storage, QUESTIONS).save('z'.repeat(100), {});
    expect(result.ok && result.value.name).toBe('z'.repeat(80));
    const stored = JSON.parse(storage.getItem('wfc.profiles.v1')!) as { name: string }[];
    expect(stored.map((p) => p.name)).toEqual(['z'.repeat(80)]);
  });
});

describe('Stored entries outlive other saves', () => {
  const PROFILES = 'wfc.profiles.v1';

  it('saving or deleting a profile leaves every other stored entry exactly as it was', () => {
    // Answers to a question a later release removed, and an entry this version cannot read at all.
    const older = {
      id: 'older',
      name: 'Older',
      savedAt: '2026-01-01T00:00:00.000Z',
      answers: { role: { kind: 'picked', optionIds: ['tank'], importance: 'high' }, gone: { kind: 'dontCare' } },
    };
    const unreadable = { id: 'x'.repeat(200), note: 'from a future version' };
    const storage = new MemoryStorage();
    storage.setItem(PROFILES, JSON.stringify([older, unreadable]));
    const store = createProfileStore(() => storage, QUESTIONS);

    const saved = store.save('New', answersOf({ role: pick('healer') }));
    expect(saved.ok).toBe(true);
    if (!saved.ok) return;
    expect(store.remove(saved.value.id).ok).toBe(true);
    expect(JSON.parse(storage.getItem(PROFILES)!)).toEqual([older, unreadable]);

    const listed = store.list();
    expect(listed.ok && listed.value.map((p) => [p.id, p.answers])).toEqual([
      ['older', answersOf({ role: pickHigh('tank') })],
    ]);
  });

  it('a profile without a data version, or with any value in it, is read', () => {
    const base = { name: 'P', savedAt: '2026-01-01T00:00:00.000Z', answers: {} };
    const storage = new MemoryStorage();
    storage.setItem(
      PROFILES,
      JSON.stringify([
        { ...base, id: 'none' },
        { ...base, id: 'long', dataVersion: 'v'.repeat(65) },
      ]),
    );
    const list = createProfileStore(() => storage, QUESTIONS).list();
    expect(list.ok && list.value.map((p) => p.id).sort()).toEqual(['long', 'none']);
  });

  it('the draft keeps the stored form older versions wrote, so a saved draft reads back the same', () => {
    const storage = new MemoryStorage();
    const store = createProfileStore(() => storage, QUESTIONS);
    const answers = answersOf({ role: pickHigh('tank', 'healer'), faction: DONT_CARE, social: pick('solo') });
    store.saveDraft(answers);
    expect(JSON.parse(storage.getItem('wfc.draft.v1')!)).toEqual({
      role: { kind: 'picked', optionIds: ['tank', 'healer'], importance: 'high' },
      faction: { kind: 'dontCare' },
      social: { kind: 'picked', optionIds: ['solo'], importance: 'normal' },
    });
    expect(store.loadDraft()).toEqual(answers);
  });
});

describe('Profile ID on saving', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('saving uses crypto.randomUUID where it exists', () => {
    vi.stubGlobal('crypto', { randomUUID: () => 'uuid-from-crypto' });
    const saved = createProfileStore(() => new MemoryStorage(), QUESTIONS).save('a', {});
    expect(saved.ok && saved.value.id).toBe('uuid-from-crypto');
  });

  it('saving works without crypto.randomUUID and gives every profile its own valid ID', () => {
    // Plain HTTP hosting has no crypto.randomUUID; saving must not throw there.
    vi.stubGlobal('crypto', {});
    const storage = new MemoryStorage();
    const store = createProfileStore(() => storage, QUESTIONS);
    const first = store.save('a', {});
    const second = store.save('b', {});
    expect(first.ok && second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(first.value.id).not.toBe(second.value.id);
    // Reading back validates the IDs; an invalid one would be dropped.
    const list = createProfileStore(() => storage, QUESTIONS).list();
    expect(list.ok && list.value.map((p) => p.id).sort()).toEqual([first.value.id, second.value.id].sort());
  });
});
