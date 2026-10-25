// @vitest-environment happy-dom
/* The mobile ranking drawer: dialog, keys, focus, scroll lock and width. */
import { describe, it, expect, vi } from 'vitest';
import { act } from 'preact/test-utils';
import { screen } from '@testing-library/preact';
import { readStyles } from '../support/styles';
import { EN_UI as EN } from '../../src/ui/texts';
import { root, setupAppDom, mount, button, click, option, ranking, mobileBar } from '../support/ui-helpers';

setupAppDom();

const drawer = () => screen.queryByRole('dialog', { name: EN.rankingTitle });
const sidebar = () => screen.getByRole('complementary', { name: EN.rankingTitle });

describe('Mobile drawer', () => {
  it('is a dialog and closes with Escape', async () => {
    await mount();
    await click(mobileBar());
    const panel = drawer()!;
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement?.classList.contains('drawer-close')).toBe(true);
    await act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(panel.getAttribute('role')).toBe('complementary');
    expect(sidebar()).toBe(panel);
  });

  it('status announcement is outside the sidebar (hidden on mobile)', async () => {
    await mount();
    const status = root.querySelector('.ranking-status[role="status"]')!;
    expect(status).not.toBeNull();
    expect(status.closest('.sidebar')).toBeNull();
    await click(option('role', 'tank'));
    const top = ranking()[0]!;
    expect(status.textContent).toBe(
      EN.rankingTop
        .replace('{name}', top.querySelector('.class-name')!.textContent!)
        .replace('{score}', top.querySelector('.score-value')!.textContent!),
    );
  });

  it('open drawer locks the rest of the page content, restores focus and scrolling on close', async () => {
    await mount();
    const bar = mobileBar();
    await click(bar);
    for (const sel of ['.app-head', '.questions-col', 'footer.app-foot', 'button.mobile-bar']) {
      expect((root.querySelector(sel) as HTMLElement & { inert?: boolean }).inert, sel).toBe(true);
    }
    expect(document.body.style.overflow).toBe('hidden');
    await click(button(EN.closeRanking));
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(mobileBar());
    expect((root.querySelector('.app-head') as HTMLElement & { inert?: boolean }).inert).toBe(false);
  });

  it('closes the drawer when the width switches to desktop, at the breakpoint the stylesheet uses', async () => {
    const listeners: ((e: { matches: boolean }) => void)[] = [];
    const queries: string[] = [];
    vi.stubGlobal(
      'matchMedia',
      (query: string) => (
        queries.push(query),
        {
          matches: false,
          addEventListener: (_: string, l: (e: { matches: boolean }) => void) => listeners.push(l),
          removeEventListener: () => undefined,
        }
      ),
    );
    await mount();
    await click(mobileBar());
    const panel = drawer()!;
    expect(panel.getAttribute('role')).toBe('dialog');
    await act(() => listeners.forEach((l) => l({ matches: true })));
    expect(panel.getAttribute('role')).toBe('complementary');
    expect(sidebar()).toBe(panel);
    expect(queries.length).toBeGreaterThan(0);
    for (const q of queries) expect(readStyles(), q).toContain(q);
  });
});

describe('Mobile drawer: keys, focus and width', () => {
  const isOpen = () => {
    if (drawer()) return true;
    // Closed still requires the ranking to be there, as the named complementary region instead of the dialog.
    sidebar();
    return false;
  };
  const press = (key: string) =>
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key }));
    });

  it('only Escape closes the drawer, no other key', async () => {
    await mount();
    await click(mobileBar());
    await press('a');
    await press('Enter');
    expect(isOpen()).toBe(true);
    await press('Escape');
    expect(isOpen()).toBe(false);
  });

  it('at start the focus does not jump to the bar', async () => {
    await mount();
    expect(document.activeElement).not.toBe(mobileBar());
  });

  it('a width change that stays below desktop keeps the drawer open', async () => {
    const listeners: ((e: { matches: boolean }) => void)[] = [];
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: (_: string, l: (e: { matches: boolean }) => void) => listeners.push(l),
      removeEventListener: () => undefined,
    }));
    await mount();
    await click(mobileBar());
    await act(() => listeners.forEach((l) => l({ matches: false })));
    expect(isOpen()).toBe(true);
  });

  it('works in a browser without matchMedia', async () => {
    vi.stubGlobal('matchMedia', undefined);
    await mount();
    await click(mobileBar());
    expect(isOpen()).toBe(true);
    await press('Escape');
    expect(isOpen()).toBe(false);
  });
});
