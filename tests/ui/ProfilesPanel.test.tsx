// @vitest-environment happy-dom
/* Saved profiles in the panel: loading, deleting, damaged storage. */
import { describe, it, expect, vi } from 'vitest';
import { answersOf, pick } from '../support/fixtures';
import { EN_UI as EN } from '../../src/ui/texts';
import { root, setupAppDom, mount, button, click, option, isChecked, appNotice } from '../support/ui-helpers';

setupAppDom();

/**
 * Storage wrapper, installed before the start (the app remembers the storage on first access);
 * `failWrites()` then makes writing and deleting fail, reading stays possible.
 */
const controllableStorage = () => {
  const real = localStorage;
  let failing = false;
  const guard = <T,>(fn: () => T): T => {
    if (failing) throw new Error('storage locked');
    return fn();
  };
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => real.getItem(k),
    setItem: (k: string, v: string) => guard(() => real.setItem(k, v)),
    removeItem: (k: string) => guard(() => real.removeItem(k)),
  });
  return { failWrites: () => (failing = true) };
};

describe('Saved profiles in the app', () => {
  it('loading a profile from older data sets its answers, without a notice about the data version', async () => {
    const profile = (id: string, name: string, dataVersion: string, roleId: string) => ({
      id,
      name,
      savedAt: '2026-10-18T10:00:00.000Z',
      dataVersion,
      answers: answersOf({ role: pick(roleId) }),
    });
    localStorage.setItem('wfc.profiles.v1', JSON.stringify([profile('a', 'Old', 'old-1', 'healer')]));
    await mount();
    await click(button(EN.saveTitle));
    await click(button(EN.loadProfile.replace('{name}', 'Old')));
    expect(isChecked(option('role', 'healer'))).toBe(true);
    expect(appNotice()).toBe('');
  });

  it('deleting removes exactly the chosen profile; if writing fails, there is a notice', async () => {
    const profile = (id: string, name: string) => ({
      id,
      name,
      savedAt: '2026-10-18T10:00:00.000Z',
      dataVersion: 'x',
      answers: {},
    });
    localStorage.setItem('wfc.profiles.v1', JSON.stringify([profile('a', 'First'), profile('b', 'Second')]));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true),
    );
    const storage = controllableStorage();
    await mount();
    await click(button(EN.saveTitle));
    const rowOf = (name: string) =>
      [...root.querySelectorAll<HTMLElement>('.save-panel li')].find((li) => li.textContent!.includes(name))!;
    // The button names the profile it deletes, so a screen reader does not hear the same "Delete" in every row.
    expect(rowOf('First').querySelector('button.danger')!.textContent!.trim()).toBe(EN.delete);
    await click(button(EN.deleteProfile.replace('{name}', 'First'), rowOf('First')));
    expect(root.querySelector('.save-panel')!.textContent).not.toContain('First');
    expect(root.querySelector('.save-panel')!.textContent).toContain('Second');
    expect(JSON.parse(localStorage.getItem('wfc.profiles.v1')!).map((p: { id: string }) => p.id)).toEqual(['b']);

    storage.failWrites();
    await click(button(EN.deleteProfile.replace('{name}', 'Second'), rowOf('Second')));
    expect(appNotice()).toContain(EN.storageWriteFailed);
    expect(root.querySelector('.save-panel')!.textContent).toContain('Second');
  });

  it('if discarding damaged profiles fails, there is a notice', async () => {
    localStorage.setItem('wfc.profiles.v1', '{kaputt');
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true),
    );
    const storage = controllableStorage();
    await mount();
    await click(button(EN.saveTitle));
    storage.failWrites();
    await click(button(EN.resetProfiles));
    expect(appNotice()).toContain(EN.storageWriteFailed);
  });

  it('offers discarding when the profile storage is damaged', async () => {
    localStorage.setItem('wfc.profiles.v1', '{kaputt');
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true),
    );
    await mount();
    await click(button(EN.saveTitle));
    expect(root.textContent).toContain('damaged');
    await click(button(EN.resetProfiles));
    expect(root.textContent).toContain(EN.noProfiles);
  });

  it('a profile with an invalid date is left out of the list instead of breaking the panel', async () => {
    localStorage.setItem(
      'wfc.profiles.v1',
      JSON.stringify([
        { id: 'a', name: 'Broken', savedAt: 'broken', dataVersion: 'v', answers: {} },
        { id: 'b', name: 'Fine', savedAt: '2026-10-18T00:00:00.000Z', dataVersion: 'v', answers: {} },
      ]),
    );
    await mount();
    await click(button(EN.saveTitle));
    expect([...root.querySelectorAll('ul.profiles > li')].map((li) => li.textContent)).toEqual([
      expect.stringContaining('Fine'),
    ]);
  });
});
