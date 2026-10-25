import { useState } from 'preact/hooks';
import type { Answers } from '../domain/answers';
import { t } from './t';
import { encodeShareCode, canCreateShareCodes, shareLinkFor } from '../persistence/share-code';
import { MAX_NAME_LENGTH, type ProfileStore } from '../persistence/storage';
import { DATA_VERSION } from './catalog';
import { STORAGE_ERROR_MESSAGE } from './storageMessages';

interface Props {
  answers: Answers;
  store: ProfileStore;
  onSaved: () => void;
  /** Returns true if something was imported; only then is the input field cleared. */
  onImport: (code: string) => Promise<boolean>;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function SharePanel({ answers, store, onSaved, onImport }: Props) {
  const [name, setName] = useState('');
  const [shareCode, setShareCode] = useState('');
  const [importInput, setImportInput] = useState('');
  const [message, setMessage] = useState('');

  function save() {
    const result = store.save(name.trim() || t('defaultProfileName'), answers);
    setMessage(result.ok ? t('saved') : t(STORAGE_ERROR_MESSAGE[result.error]));
    if (result.ok) onSaved();
  }

  async function createShareCode() {
    setMessage('');
    // Only a missing browser feature is an expected failure; anything else is a bug and must not pass as "unsupported".
    if (!canCreateShareCodes()) {
      setMessage(t('shareUnsupported'));
      return;
    }
    setShareCode(await encodeShareCode(answers, DATA_VERSION));
  }

  async function importFromField() {
    if (await onImport(importInput)) setImportInput('');
  }

  async function copy(text: string) {
    setMessage((await copyText(text)) ? t('copied') : t('copyFailed'));
  }

  const shareLink = shareCode ? shareLinkFor(`${location.origin}${location.pathname}`, shareCode) : '';

  return (
    <section class="panel">
      <h2>{t('saveTitle')}</h2>
      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <input
          type="text"
          maxLength={MAX_NAME_LENGTH}
          placeholder={t('profileName')}
          aria-label={t('profileName')}
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <button type="submit">{t('save')}</button>
      </form>

      <div class="row">
        <button type="button" onClick={() => void createShareCode()}>
          {t('createCode')}
        </button>
      </div>
      {shareCode && (
        <div class="share">
          <label>
            {t('shareCode')}
            <textarea readOnly rows={3} value={shareCode} onFocus={(e) => e.currentTarget.select()} />
          </label>
          <div class="row">
            <button type="button" onClick={() => void copy(shareCode)}>
              {t('copy')}
            </button>
            <button type="button" onClick={() => void copy(shareLink)}>
              {t('copyLink')}
            </button>
          </div>
        </div>
      )}

      <form
        class="import"
        onSubmit={(e) => {
          e.preventDefault();
          void importFromField();
        }}
      >
        <label>
          {t('importTitle')}
          <textarea
            rows={2}
            placeholder={t('importPlaceholder')}
            value={importInput}
            onInput={(e) => setImportInput(e.currentTarget.value)}
          />
        </label>
        <button type="submit" disabled={!importInput.trim()}>
          {t('import')}
        </button>
      </form>
      {message && (
        <p class="notice" role="status">
          {message}
        </p>
      )}
    </section>
  );
}
