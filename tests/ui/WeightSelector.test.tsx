// @vitest-environment happy-dom
/* Weight selection of a question: levels, keyboard, influence. */
import { describe, it, expect } from 'vitest';
import { act } from 'preact/test-utils';
import { within } from '@testing-library/preact';
import { EN_UI as EN } from '../../src/ui/texts';
import { answersOf, DONT_CARE, pick, pickHigh } from '../support/fixtures';
import { readStyles } from '../support/styles';
import {
  root,
  setupAppDom,
  mount,
  click,
  fieldset,
  option,
  isChecked,
  weight,
  key,
  draft,
  scoreOf,
} from '../support/ui-helpers';

setupAppDom();

describe('Weight selection', () => {
  it('weight "Don\'t care" is exclusive, counts as answered and does not change the ranking', async () => {
    await mount();
    // Without an answer nothing is picked, not even "Normal".
    expect([...fieldset('role').querySelectorAll('.weight [aria-checked="true"]')]).toHaveLength(0);
    await click(option('role', 'tank'));
    expect(isChecked(weight('role', 'normal'))).toBe(true);
    await click(weight('role', 'dontCare'));
    expect(isChecked(weight('role', 'dontCare'))).toBe(true);
    expect(isChecked(option('role', 'tank'))).toBe(false);
    expect(scoreOf('Warrior')).toBe(50);
    expect(draft()).toEqual(answersOf({ role: DONT_CARE }));
    expect(root.querySelector('.progress-text')!.textContent).toMatch(/^1 of \d+ questions answered$/);
    await click(option('role', 'healer'));
    expect(isChecked(weight('role', 'dontCare'))).toBe(false);
    expect(isChecked(weight('role', 'normal'))).toBe(true);
    await click(weight('role', 'dontCare'));
    await click(weight('role', 'normal'));
    expect(JSON.parse(localStorage.getItem('wfc.draft.v1')!)).toEqual({});
  });

  it('faction and deal-breakers only have "Don\'t care | Counts"', async () => {
    await mount();
    for (const id of ['faction', 'deal-breakers']) {
      expect(fieldset(id).querySelector('button[data-weight="count"]'), id).not.toBeNull();
      expect(fieldset(id).querySelector('button[data-weight="high"]'), id).toBeNull();
      expect(fieldset(id).querySelector('button[data-weight="normal"]'), id).toBeNull();
    }
  });

  it('every weight level has its own style rule', async () => {
    await mount();
    const css = readStyles();
    const classes = new Set([...root.querySelectorAll('.weight button')].map((b) => b.className));
    expect([...classes].sort()).toEqual(['weight-count', 'weight-dont-care', 'weight-high', 'weight-normal']);
    for (const c of classes) expect(css, c).toMatch(new RegExp(`\\.${c}\\[aria-checked=["']true["']\\]`));
  });

  it('the weight selection can be operated with arrow keys', async () => {
    await mount();
    const group = within(fieldset('role')).queryByRole('radiogroup', { name: EN.weightLabel });
    expect(group).not.toBeNull();
    expect(weight('role', 'normal').tabIndex).toBe(0);
    expect(weight('role', 'dontCare').tabIndex).toBe(-1);
    await key(weight('role', 'normal'), 'ArrowLeft');
    expect(isChecked(weight('role', 'dontCare'))).toBe(true);
    expect(document.activeElement).toBe(weight('role', 'dontCare'));
    await key(weight('role', 'dontCare'), 'ArrowDown');
    // Normal ends "Don't care"; without an answer nothing is marked afterwards, the focus stays on Normal.
    expect(isChecked(weight('role', 'dontCare'))).toBe(false);
    expect(document.activeElement).toBe(weight('role', 'normal'));
    expect(weight('role', 'normal').tabIndex).toBe(0);
    // Without an answer "Important" is disabled and skipped: right of Normal goes back to Don't care.
    await key(weight('role', 'normal'), 'ArrowRight');
    expect(isChecked(weight('role', 'dontCare'))).toBe(true);
    await key(weight('role', 'dontCare'), 'ArrowUp');
    expect(isChecked(weight('role', 'dontCare'))).toBe(false);
    expect(document.activeElement).toBe(weight('role', 'normal'));
    // With an answer: three entries, direction and wrap-around at the end.
    await click(option('role', 'tank'));
    await key(weight('role', 'normal'), 'ArrowRight');
    expect(isChecked(weight('role', 'high'))).toBe(true);
    expect(document.activeElement).toBe(weight('role', 'high'));
    await key(weight('role', 'high'), 'ArrowLeft');
    expect(isChecked(weight('role', 'normal'))).toBe(true);
    await key(weight('role', 'normal'), 'ArrowRight');
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    await act(() => {
      weight('role', 'high').dispatchEvent(ev);
    });
    expect(ev.defaultPrevented).toBe(true);
    expect(isChecked(weight('role', 'dontCare'))).toBe(true);
  });

  it('"Important" is disabled without an answer and doubles the weight afterwards', async () => {
    await mount();
    expect(weight('role', 'high').disabled).toBe(true);
    await click(option('role', 'tank'));
    await click(option('distance', 'melee'));
    const before = scoreOf('Mage');
    await click(weight('role', 'high'));
    expect(isChecked(weight('role', 'high'))).toBe(true);
    expect(draft().role).toEqual(pickHigh('tank'));
    expect(scoreOf('Mage')).not.toBe(before);
    await click(option('role', 'healer'));
    expect(draft().role.importance).toBe('high');
    await click(weight('role', 'normal'));
    expect(draft().role).toEqual(pick('tank', 'healer'));
  });

  it('the tab stop of the weight selection is the picked level', async () => {
    await mount();
    await click(weight('role', 'dontCare'));
    expect(weight('role', 'dontCare').tabIndex).toBe(0);
    expect(weight('role', 'normal').tabIndex).toBe(-1);
    await click(option('role', 'tank'));
    await click(weight('role', 'high'));
    expect(weight('role', 'high').tabIndex).toBe(0);
    expect(weight('role', 'normal').tabIndex).toBe(-1);
  });

  it('weight switch without a visible label, group name literally "Weight" for screen readers', async () => {
    await mount();
    const groups = [...root.querySelectorAll('.question .weight[role="radiogroup"]')];
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.getAttribute('aria-label')).toBe(EN.weightLabel);
      const fieldsetEl = group.closest('fieldset')!;
      expect(fieldsetEl.querySelector('.weight-label')).toBeNull();
      expect(fieldsetEl.querySelector('.question-foot')!.textContent).not.toContain(EN.weightLabel);
    }
    expect(root.querySelectorAll('.question .weight[role="radiogroup"]').length).toBeGreaterThan(0);
  });
});
