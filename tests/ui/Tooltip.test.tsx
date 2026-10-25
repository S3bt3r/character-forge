// @vitest-environment happy-dom
/* The tooltip on its own, with a controlled clock: a tap fires focus and click right after each other. */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'preact';
import { act } from 'preact/test-utils';
import { within } from '@testing-library/preact';
import { Tooltip } from '../../src/ui/Tooltip';
import { root, setupAppDom, button, click, mount, fieldset, key } from '../support/ui-helpers';
import { EN_UI as EN } from '../../src/ui/texts';

setupAppDom();
afterEach(() => vi.useRealTimers());

/** The influence pill of a question; its name says the level ("Influence n of 4"), which differs per question. */
const influenceName = new RegExp(`^${EN.influenceLabel.replace('{level}', '\\d+')}$`);
const influencePill = (questionId: string) =>
  within(fieldset(questionId)).getByRole<HTMLButtonElement>('button', { name: influenceName });

async function tooltip() {
  await act(() =>
    render(
      <Tooltip text="Tip" class="trigger">
        x
      </Tooltip>,
      root,
    ),
  );
  const trigger = button('x');
  // Closed, the tooltip carries `hidden`.
  const tip = within(root).getByRole('tooltip', { hidden: true });
  return { trigger, tip };
}

describe('Tooltip gesture window', () => {
  it('a click within 400 ms of opening belongs to the same gesture and keeps it open; a later click closes it', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    const { trigger, tip } = await tooltip();
    vi.setSystemTime(10_000);
    await act(() => {
      trigger.dispatchEvent(new FocusEvent('focus'));
    });
    vi.setSystemTime(10_400);
    await click(trigger);
    expect(tip.hidden).toBe(false);

    vi.setSystemTime(20_000);
    await act(() => {
      trigger.closest('.tip')!.dispatchEvent(new MouseEvent('mouseenter'));
    });
    vi.setSystemTime(20_401);
    await click(trigger);
    expect(tip.hidden).toBe(true);
  });

  it('a click on a closed tooltip opens it, whenever it comes', async () => {
    const { trigger, tip } = await tooltip();
    expect(tip.hidden).toBe(true);
    await click(trigger);
    expect(tip.hidden).toBe(false);
  });
});

describe('Tooltips', () => {
  it('tooltip appears on focus and tap and closes with Esc', async () => {
    await mount();
    const pill = influencePill('role');
    const tip = root.querySelector<HTMLElement>(`#${pill.getAttribute('aria-describedby')}`)!;
    expect(tip.getAttribute('role')).toBe('tooltip');
    expect(tip.textContent).toBe(EN.influence_4);
    expect(tip.hidden).toBe(true);
    await act(() => {
      pill.dispatchEvent(new FocusEvent('focus'));
    });
    expect(tip.hidden).toBe(false);
    await key(pill, 'Escape');
    expect(tip.hidden).toBe(true);
    await click(pill);
    expect(tip.hidden).toBe(false);
    await click(pill);
    expect(tip.hidden).toBe(true);
  });

  it('tooltip opens on hover, closes on leave and blur; tapping (focus + click) leaves it open', async () => {
    // A frozen clock: focus and click of a tap count as one gesture however slow the test machine is.
    vi.useFakeTimers({ toFake: ['Date'] });
    await mount();
    const pill = influencePill('role');
    const tip = root.querySelector<HTMLElement>(`#${pill.getAttribute('aria-describedby')}`)!;
    // Hover is attached to the container (trigger + tooltip) so the mouse can move into the tooltip.
    const fire = (type: string) =>
      act(() => {
        if (type === 'focus' || type === 'blur') pill.dispatchEvent(new FocusEvent(type));
        else pill.closest('.tip')!.dispatchEvent(new MouseEvent(type));
      });
    await fire('mouseenter');
    expect(tip.hidden).toBe(false);
    await fire('mouseleave');
    expect(tip.hidden).toBe(true);
    await fire('focus');
    await fire('blur');
    expect(tip.hidden).toBe(true);
    // Tapping on a phone fires focus and click right after each other; that is one gesture, not open-and-close.
    await fire('focus');
    await click(pill);
    expect(tip.hidden).toBe(false);
    await fire('blur');
    await fire('mouseenter');
    await click(pill);
    expect(tip.hidden).toBe(false);
  });

  it('Esc and a tap outside close it even without focus; inside the tooltip itself it stays open', async () => {
    await mount();
    const pill = influencePill('role');
    const wrap = pill.closest('.tip')!;
    const tip = root.querySelector<HTMLElement>(`#${pill.getAttribute('aria-describedby')}`)!;
    const open = () =>
      act(() => {
        wrap.dispatchEvent(new MouseEvent('mouseenter'));
      });
    await open();
    await act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(tip.hidden).toBe(true);
    await open();
    await act(() => {
      tip.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    });
    expect(tip.hidden).toBe(false);
    await act(() => {
      document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    });
    expect(tip.hidden).toBe(true);
  });

  it('tapping the trigger of an open tooltip does not close it beforehand', async () => {
    await mount();
    const pill = influencePill('role');
    const tip = root.querySelector<HTMLElement>(`#${pill.getAttribute('aria-describedby')}`)!;
    await act(() => {
      pill.closest('.tip')!.dispatchEvent(new MouseEvent('mouseenter'));
    });
    await act(() => {
      pill.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    });
    expect(tip.hidden).toBe(false);
  });

  it('at most one tooltip is open at a time', async () => {
    await mount();
    const a = influencePill('role');
    const b = influencePill('distance');
    const tipOf = (btn: HTMLElement) => root.querySelector<HTMLElement>(`#${btn.getAttribute('aria-describedby')}`)!;
    await act(() => {
      a.closest('.tip')!.dispatchEvent(new MouseEvent('mouseenter'));
    });
    await act(() => {
      b.dispatchEvent(new FocusEvent('focus'));
    });
    expect(tipOf(a).hidden).toBe(true);
    expect(tipOf(b).hidden).toBe(false);
  });
});
