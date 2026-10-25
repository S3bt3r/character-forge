import { useEffect } from 'preact/hooks';
import { importNeedsConsent } from '../app/commands';
import type { Answers } from '../domain/answers';
import type { MessageKey } from './texts';
import { t } from './t';
import { codeFromHash, decodeShareCode } from '../persistence/share-code';
import { QUESTIONS } from './catalog';

const IMPORT_ERROR: Record<'invalid' | 'too-long' | 'unsupported', MessageKey> = {
  invalid: 'importInvalid',
  'too-long': 'importTooLong',
  unsupported: 'shareUnsupported',
};

/**
 * Import of a share code (input field or URL fragment at load). Asks before existing answers
 * are overwritten, and reports the result.
 * `answers` is the current state; the fragment import at load sees the state of the first render, i.e. the loaded draft.
 */
export function useShareImport(answers: Answers, setAnswers: (a: Answers) => void, setNotices: (n: string[]) => void) {
  /** Returns true if the answers were replaced. */
  async function importCode(code: string): Promise<boolean> {
    const result = await decodeShareCode(code, QUESTIONS);
    if (!result.ok) {
      setNotices([t(IMPORT_ERROR[result.error])]);
      return false;
    }
    if (importNeedsConsent(answers) && !confirm(t('importOverwriteConfirm'))) {
      setNotices([]);
      return false;
    }
    // A code holds answers, not results: they are rated against today's values, and answers to questions or options
    // that no longer exist were already left out while decoding. Neither is worth a notice (docs/DATA.md).
    setNotices([t('importOk')]);
    setAnswers(result.answers);
    return true;
  }

  useEffect(() => {
    const code = codeFromHash(location.hash);
    if (code === undefined) return;
    // Deliberately only at load and synchronously before the import: the fragment disappears from the address immediately.
    history.replaceState(null, '', location.pathname + location.search);
    void importCode(code);
    // Only once at load, on purpose: the import sees the loaded draft; listing importCode would import again on every answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return importCode;
}
