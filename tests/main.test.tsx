// @vitest-environment happy-dom
/* The entry point: an error in the app itself shows a way out instead of an empty page. */
import { describe, it, expect, vi } from 'vitest';
import { act } from 'preact/test-utils';
import { screen, within } from '@testing-library/preact';
import { EN_UI as EN } from '../src/ui/texts';

vi.mock('../src/ui/App', () => ({
  App: () => {
    throw new Error('broken app');
  },
}));

describe('Entry point', () => {
  it('a broken app offers to reload the page, which starts again from the saved draft', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const reload = vi.fn();
    vi.stubGlobal('location', { ...location, reload });
    document.body.innerHTML = '<div id="app"></div>';
    await act(async () => {
      await import('../src/main');
    });
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toContain(EN.renderError);
    const way = within(alert).getByRole('button');
    expect(way.textContent).toBe(EN.renderReload);
    await act(() => way.click());
    expect(reload).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
});
