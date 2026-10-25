// @vitest-environment happy-dom
/* Importing a share code through the app: from the field or the address, with consent, and each failure with its own message. */
import { describe, it, expect, vi } from 'vitest';
import { MAX_CODE_LENGTH, encodeShareCode } from '../../src/persistence/share-code';
import { screen } from '@testing-library/preact';
import { EN_UI as EN } from '../../src/ui/texts';
import {
  root,
  setupAppDom,
  mount,
  button,
  click,
  typeInto,
  waitUntil,
  option,
  isChecked,
  settle,
  ranking,
  draft,
  appNotice,
} from '../support/ui-helpers';
import { answersOf, pick } from '../support/fixtures';
import { rawCode } from '../support/persistence';
import { DATA_VERSION } from '../../src/data/sources';

setupAppDom();

const importField = () => screen.getByRole<HTMLTextAreaElement>('textbox', { name: EN.importTitle });

async function importCode(code: string) {
  await mount();
  await click(button(EN.saveTitle));
  await typeInto(importField(), code);
  await click(button(EN.import));
  await waitUntil(() => expect(appNotice()).not.toBe(''));
  return appNotice();
}

describe('Import errors, each with its own message', () => {
  it('text that is no share code', async () => {
    expect(await importCode('broken')).toBe(EN.importInvalid);
  });

  it('a code longer than any share code can be', async () => {
    expect(await importCode('1.' + 'A'.repeat(MAX_CODE_LENGTH))).toBe(EN.importTooLong);
  });

  it('a browser without decompression', async () => {
    vi.stubGlobal('DecompressionStream', undefined);
    expect(await importCode('1.AAAA')).toBe(EN.shareUnsupported);
  });
});

describe('Importing through the app', () => {
  it('without a code in the address no import notice appears at start', async () => {
    await mount();
    // No import must appear later either, so a fixed window instead of waiting for a condition.
    await settle();
    expect(appNotice()).toBe('');
    expect(root.textContent).not.toContain(EN.importInvalid);
  });

  it('a code from another data version imports its known answers without a notice', async () => {
    const code = await rawCode(
      JSON.stringify({
        v: 1,
        d: 'old-1',
        a: [
          ['role', ['healer']],
          ['does-not-exist', ['x']],
          ['role-2', ['y']],
        ],
      }),
    );
    await mount();
    await click(button(EN.saveTitle));
    await typeInto(importField(), code);
    await click(button(EN.import));
    await waitUntil(() => expect(appNotice()).toContain(EN.importOk));
    expect(appNotice()).toBe(EN.importOk);
    expect(isChecked(option('role', 'healer'))).toBe(true);
    // The draft is saved in an effect after rendering, so it can trail the notice.
    await waitUntil(() => expect(Object.keys(draft())).toEqual(['role']));
    expect(importField().value).toBe('');
  });

  it('a clean code with the current data version reports only the import', async () => {
    await mount();
    await click(button(EN.saveTitle));
    await typeInto(importField(), await encodeShareCode(answersOf({ role: pick('healer') }), DATA_VERSION));
    await click(button(EN.import));
    await waitUntil(() => expect(appNotice()).toBe(EN.importOk));
  });

  it('declining the overwrite keeps the answers, and old notices disappear', async () => {
    localStorage.setItem('wfc.draft.v1', JSON.stringify(answersOf({ role: pick('tank') })));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => false),
    );
    await mount();
    await click(button(EN.saveTitle));
    await typeInto(importField(), 'broken');
    await click(button(EN.import));
    await waitUntil(() => expect(root.textContent).toContain(EN.importInvalid));
    // An invalid code stays in the field so it can be corrected.
    expect(importField().value).toBe('broken');
    await typeInto(importField(), await encodeShareCode(answersOf({ role: pick('healer') }), DATA_VERSION));
    await click(button(EN.import));
    await waitUntil(() => expect(root.textContent).not.toContain(EN.importInvalid));
    expect(root.querySelector('.notice[role="status"]')).toBeNull();
    // Declined, so the code stays in the field for a second try.
    expect(importField().value).not.toBe('');
    expect(isChecked(option('role', 'tank'))).toBe(true);
  });

  it('imports a code from the URL fragment', async () => {
    const code = await encodeShareCode(
      answersOf({ resource: pick('energy'), tactical: pick('stealth') }),
      DATA_VERSION,
    );
    history.replaceState(null, '', `/#s=${code}`);
    await mount();
    await waitUntil(() => expect(root.textContent).toContain(EN.importOk));
    expect(ranking()[0]!.querySelector('.class-name')!.textContent).toContain('Rogue');
    expect(location.hash).toBe('');
  });

  it('survives a badly encoded URL fragment without crashing', async () => {
    history.replaceState(null, '', '/#s=%E0%A4%A');
    await mount();
    await waitUntil(() => expect(root.textContent).toContain(EN.importInvalid));
    expect(ranking()).toHaveLength(9);
  });

  it('asks before an import overwrites existing answers', async () => {
    localStorage.setItem('wfc.draft.v1', JSON.stringify(answersOf({ role: pick('tank') })));
    const code = await encodeShareCode(answersOf({ role: pick('healer') }), DATA_VERSION);
    history.replaceState(null, '', `/#s=${code}`);
    const confirm = vi.fn(() => false);
    vi.stubGlobal('confirm', confirm);
    await mount();
    await waitUntil(() => expect(confirm).toHaveBeenCalled());
    expect(draft()).toEqual(answersOf({ role: pick('tank') }));
  });

  it('creates a share code, reports invalid codes and keeps the code on cancel', async () => {
    localStorage.setItem('wfc.draft.v1', JSON.stringify(answersOf({ role: pick('tank') })));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => false),
    );
    await mount();
    await click(button(EN.saveTitle));
    await click(button(EN.createCode));
    await waitUntil(() =>
      expect(screen.getByRole<HTMLTextAreaElement>('textbox', { name: EN.shareCode }).value.startsWith('1.')).toBe(
        true,
      ),
    );

    const input = importField();
    await typeInto(input, 'broken');
    await click(button(EN.import));
    await waitUntil(() => expect(root.textContent).toContain(EN.importInvalid));

    const code = await encodeShareCode(answersOf({ role: pick('healer') }), DATA_VERSION);
    await typeInto(importField(), code);
    await click(button(EN.import));
    // The field holds the code before the import runs, so wait for the declined confirmation first.
    await waitUntil(() => expect(confirm).toHaveBeenCalled());
    await settle();
    expect(importField().value).toBe(code);
  });
});
