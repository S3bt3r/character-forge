// @vitest-environment happy-dom
/* Saving and sharing in the panel, on its own: names, messages, the share code and the clipboard. */
import { describe, it, expect, vi } from 'vitest';
import { render } from 'preact';
import { act } from 'preact/test-utils';
import { within } from '@testing-library/preact';
import { SharePanel } from '../../src/ui/SharePanel';
import { createProfileStore } from '../../src/persistence/storage';
import { QUESTIONS } from '../../src/ui/catalog';
import { EN_UI as EN } from '../../src/ui/texts';
import { answersOf, pick } from '../support/fixtures';
import { MemoryStorage } from '../support/persistence';
import { root, setupAppDom, button, click, typeInto, settle, waitUntil } from '../support/ui-helpers';

setupAppDom();

const answers = answersOf({ role: pick('tank') });
/** The panel's message; rendered on its own, the panel is the only status region. */
const message = () => within(root).queryByRole('status')?.textContent;
const nameField = () => within(root).getByRole<HTMLInputElement>('textbox', { name: EN.profileName });
const shareField = () => within(root).queryByRole<HTMLTextAreaElement>('textbox', { name: EN.shareCode });

async function panel(storage = new MemoryStorage(), onImport: (code: string) => Promise<boolean> = async () => true) {
  const store = createProfileStore(() => storage, QUESTIONS);
  const onSaved = vi.fn();
  await act(() => render(<SharePanel answers={answers} store={store} onSaved={onSaved} onImport={onImport} />, root));
  return { store, onSaved, onImport };
}

describe('Saving a profile', () => {
  it('an empty or blank name saves under the default name; a name is saved trimmed', async () => {
    const { store, onSaved } = await panel();
    await typeInto(nameField(), '   ');
    await click(button(EN.save));
    await typeInto(nameField(), '  Tank  ');
    await click(button(EN.save));
    const list = store.list();
    expect(list.ok && list.value.map((p) => p.name).sort()).toEqual([EN.defaultProfileName, 'Tank'].sort());
    expect(message()).toBe(EN.saved);
    expect(onSaved).toHaveBeenCalledTimes(2);
  });

  it('a failed write says so and does not report the profile as saved', async () => {
    const storage = new MemoryStorage();
    storage.setItem = () => {
      throw new Error('full');
    };
    const { onSaved } = await panel(storage);
    await click(button(EN.save));
    expect(message()).toBe(EN.storageWriteFailed);
    expect(onSaved).not.toHaveBeenCalled();
  });
});

describe('Sharing', () => {
  it('copying the code or the link reports success, and the link carries the code in its fragment', async () => {
    const writeText = vi.fn(async (_text: string) => undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    await panel();
    await click(button(EN.createCode));
    await waitUntil(() => expect(shareField()).not.toBeNull());
    const code = shareField()!.value;
    expect(code).not.toBe('');
    await click(button(EN.copy));
    await waitUntil(() => expect(writeText).toHaveBeenLastCalledWith(code));
    expect(message()).toBe(EN.copied);
    await click(button(EN.copyLink));
    await waitUntil(() =>
      expect(writeText.mock.lastCall![0]).toMatch(new RegExp(`#s=${code.replace(/[.]/g, '\\.')}$`)),
    );
  });

  it('a clipboard that refuses reports the failure', async () => {
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText: async () => Promise.reject(new Error('denied')) },
    });
    await panel();
    await click(button(EN.createCode));
    await waitUntil(() => expect(shareField()).not.toBeNull());
    await click(button(EN.copy));
    await waitUntil(() => expect(message()).toBe(EN.copyFailed));
  });

  it('without compression in the browser there is a notice instead of a code', async () => {
    vi.stubGlobal('CompressionStream', undefined);
    await panel();
    await click(button(EN.createCode));
    await waitUntil(() => expect(message()).toBe(EN.shareUnsupported));
    expect(root.querySelector('.share')).toBeNull();
  });
});

describe('Importing', () => {
  it('the import button stays disabled until there is a code, and the field is cleared only after a successful import', async () => {
    const onImport = vi.fn(async (code: string) => code === 'good');
    await panel(undefined, onImport);
    const field = within(root).getByRole<HTMLTextAreaElement>('textbox', { name: EN.importTitle });
    expect(button(EN.import).disabled).toBe(true);
    await typeInto(field, '   ');
    expect(button(EN.import).disabled).toBe(true);
    await typeInto(field, 'bad');
    await click(button(EN.import));
    // Nothing may clear the field afterwards, so a fixed window instead of waiting for a condition.
    await settle();
    expect(field.value).toBe('bad');
    await typeInto(field, 'good');
    await click(button(EN.import));
    await waitUntil(() => expect(field.value).toBe(''));
    expect(onImport).toHaveBeenLastCalledWith('good');
  });
});
