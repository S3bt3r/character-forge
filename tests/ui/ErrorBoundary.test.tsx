// @vitest-environment happy-dom
/* Rendering errors stay in their area and leave a way out. */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'preact';
import { act } from 'preact/test-utils';
import { within } from '@testing-library/preact';
import { ErrorBoundary } from '../../src/ui/ErrorBoundary';
import { EN_UI as EN } from '../../src/ui/texts';
import { root, setupAppDom, mount, button, click, openSheetButton } from '../support/ui-helpers';

// A broken character sheet: the app must still let the user leave it.
vi.mock('../../src/ui/CharacterSheet', () => ({
  CharacterSheet: () => {
    throw new Error('broken sheet');
  },
}));
// The ranking breaks only when a test asks for it, so the sheet tests can still open the sheet from it.
const broken = vi.hoisted(() => ({ ranking: false }));
vi.mock('../../src/ui/Ranking', async (original) => {
  const { Ranking } = await original<typeof import('../../src/ui/Ranking')>();
  return {
    Ranking: (props: Parameters<typeof Ranking>[0]) => {
      if (broken.ranking) throw new Error('broken ranking');
      return Ranking(props);
    },
  };
});

setupAppDom();

let failing = true;
function Fragile() {
  if (failing) throw new Error('broken');
  return <p class="fine">fine</p>;
}

const silenceConsole = () => vi.spyOn(console, 'error').mockImplementation(() => {});
afterEach(() => {
  vi.restoreAllMocks();
  failing = true;
  broken.ranking = false;
});

describe('Error boundary', () => {
  it('shows a notice instead of the broken area, logs the error, and a retry renders the area again', async () => {
    const log = silenceConsole();
    await act(() => render(<p class="outside">outside</p>, root));
    const host = root.appendChild(document.createElement('div'));
    await act(() =>
      render(
        <ErrorBoundary>
          <Fragile />
        </ErrorBoundary>,
        host,
      ),
    );
    expect(within(host).getByRole('alert').textContent).toContain(EN.renderError);
    expect(root.querySelector('.outside')).not.toBeNull();
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ message: 'broken' }));

    failing = false;
    await click(button(EN.renderRetry, host));
    expect(host.querySelector('.fine')).not.toBeNull();
    expect(within(host).queryByRole('alert')).toBeNull();
    render(null, host);
  });

  it('a given way out replaces the retry', async () => {
    silenceConsole();
    const onRecover = vi.fn();
    await act(() =>
      render(
        <ErrorBoundary recover={{ label: EN.renderReload, onRecover }}>
          <Fragile />
        </ErrorBoundary>,
        root,
      ),
    );
    const way = within(within(root).getByRole('alert')).getByRole('button');
    expect(way.textContent).toBe(EN.renderReload);
    await click(way);
    expect(onRecover).toHaveBeenCalledTimes(1);
  });

  it('a broken character sheet can be closed, and the page is usable again', async () => {
    silenceConsole();
    await mount();
    await click(openSheetButton());
    const close = button(EN.closeSheet, within(root).getByRole('alert'));
    expect(root.querySelector('.questions-col')!.hasAttribute('inert')).toBe(true);
    await click(close);
    expect(within(root).queryByRole('alert')).toBeNull();
    expect(root.querySelector('.questions-col')!.hasAttribute('inert')).toBe(false);
  });

  it('a broken ranking leaves the questionnaire usable', async () => {
    silenceConsole();
    broken.ranking = true;
    await mount();
    const sidebar = within(root).getByRole('complementary', { name: EN.rankingTitle });
    expect(within(sidebar).getByRole('alert').textContent).toContain(EN.renderError);
    expect(root.querySelector('.questions-col fieldset')).not.toBeNull();
    expect(root.querySelector('.questions-col')!.hasAttribute('inert')).toBe(false);
  });
});
