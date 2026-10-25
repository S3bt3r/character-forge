import { useState } from 'preact/hooks';
import type { Answers } from '../domain/answers';
import { t } from './t';
import type { ProfileStore, SavedProfile } from '../persistence/storage';
import { STORAGE_ERROR_MESSAGE } from './storageMessages';

/** Saved profiles: list, load, delete, reset storage. */
export function useProfiles(store: ProfileStore, setAnswers: (a: Answers) => void, setNotices: (n: string[]) => void) {
  const [list, setList] = useState(() => store.list());
  const refresh = () => setList(store.list());

  /** A profile holds answers, not results: they are rated against today's values, without a notice (docs/DATA.md). */
  function load(profile: SavedProfile) {
    setAnswers(profile.answers);
    setNotices([]);
  }

  function remove(profile: SavedProfile) {
    const result = store.remove(profile.id);
    if (!result.ok) setNotices([t(STORAGE_ERROR_MESSAGE[result.error])]);
    refresh();
  }

  function reset() {
    const result = store.reset();
    if (!result.ok) setNotices([t(STORAGE_ERROR_MESSAGE[result.error])]);
    refresh();
  }

  return { list, refresh, load, remove, reset };
}
