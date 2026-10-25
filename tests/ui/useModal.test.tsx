// @vitest-environment happy-dom
/* The modal dialog behavior of useModal, observed on the character sheet. */
import { describe, it, expect } from 'vitest';
import { act } from 'preact/test-utils';
import { setupAppDom, mount, click, pressTab, sheet, openSheetButton } from '../support/ui-helpers';

setupAppDom();

describe('Focus trap of a modal dialog (the character sheet)', () => {
  it('the focus trap acts only at the edges: Tab inside the sheet and other keys keep their normal behavior', async () => {
    await mount();
    await click(openSheetButton());
    const focusables = [...sheet()!.querySelectorAll<HTMLElement>('button, summary, a[href]')];
    expect(focusables.length).toBeGreaterThan(2);
    const [first, second] = focusables as [HTMLElement, HTMLElement];
    const last = focusables[focusables.length - 1]!;

    // Forward from the first and backward from the last element: the browser moves on, the trap stays out.
    first.focus();
    expect((await pressTab()).defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(first);
    last.focus();
    expect((await pressTab(true)).defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(last);
    // In the middle neither direction wraps.
    second.focus();
    expect((await pressTab()).defaultPrevented).toBe(false);
    expect((await pressTab(true)).defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(second);
    // Another key on the last element does not jump to the first.
    last.focus();
    const other = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
    await act(() => {
      last.dispatchEvent(other);
    });
    expect(other.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(last);
  });
});
