/*
 * Shared helpers for the UI tests (happy-dom). Each test file calls `setupAppDom()` once;
 * after that, `root` is a fresh container in every test.
 */
import { beforeEach, afterEach, vi } from 'vitest';
import { render } from 'preact';
import { act } from 'preact/test-utils';
import { within } from '@testing-library/preact';
import { t } from '../../src/ui/t';
import { App } from '../../src/ui/App';
import { QUESTIONS } from '../../src/data/questions';
import { CLASSES } from '../../src/data/classes';
import { rated } from './fixtures';

export let root: HTMLElement;

/** Fresh container, empty storage and empty URL fragment per test; cleans up afterwards. */
export function setupAppDom() {
  beforeEach(() => {
    localStorage.clear();
    history.replaceState(null, '', '/');
    root = document.createElement('div');
    document.body.appendChild(root);
  });
  afterEach(() => {
    render(null, root);
    root.remove();
    vi.unstubAllGlobals();
  });
}

export async function mount() {
  await act(() => render(<App />, root));
}

/** The button with exactly this accessible name, as a screen reader announces it. */
export function button(name: string, scope: HTMLElement = root): HTMLButtonElement {
  return within(scope).getByRole<HTMLButtonElement>('button', { name });
}

export async function click(el: HTMLElement) {
  await act(() => el.click());
}

/** Finds questions and options by their stable IDs, so the tests stay independent of the wording. */
export function fieldset(questionId: string): HTMLFieldSetElement {
  const found = root.querySelector<HTMLFieldSetElement>(`fieldset[data-question="${questionId}"]`);
  if (!found) throw new Error(`Question "${questionId}" not found`);
  return found;
}

export function option(questionId: string, optionId: string): HTMLButtonElement {
  const found = fieldset(questionId).querySelector<HTMLButtonElement>(`button[data-option="${optionId}"]`);
  if (!found) throw new Error(`Option "${questionId}/${optionId}" not found`);
  return found;
}

export const isChecked = (el: Element) => el.getAttribute('aria-checked') === 'true';

export const statusBadge = (card: HTMLElement) => card.querySelector<HTMLElement>('.status-badge');

/** Status kind of a question card (`data-status`); undefined without a badge. */
export const statusOf = (card: HTMLElement) => statusBadge(card)?.dataset['status'];

/** Tooltip of a question's status icon; empty when there is no special case (unanswered or simply answered). */
export function statusText(questionId: string): string {
  const badge = statusBadge(fieldset(questionId));
  if (!badge || badge.dataset['status'] === 'answered') return '';
  return root.querySelector(`#${badge.getAttribute('aria-describedby')}`)!.textContent!;
}

export function weight(questionId: string, value: 'dontCare' | 'normal' | 'high' | 'count'): HTMLButtonElement {
  const found = fieldset(questionId).querySelector<HTMLButtonElement>(`button[data-weight="${value}"]`);
  if (!found) throw new Error(`Weight "${questionId}/${value}" not found`);
  return found;
}

export const tiles = (questionId: string) => [
  ...fieldset(questionId).querySelectorAll<HTMLButtonElement>('button[data-option]'),
];

export async function key(el: HTMLElement, k: string) {
  await act(() => {
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
  });
}

export const esc = (target: EventTarget = document) =>
  act(() => {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  });

/** Tab or Shift+Tab on the focused element; returns the event so `defaultPrevented` can be checked. */
export async function pressTab(shift = false) {
  const target = document.activeElement as HTMLElement;
  const ev = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: shift, bubbles: true, cancelable: true });
  await act(() => {
    target.dispatchEvent(ev);
  });
  return ev;
}

export async function typeInto(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  await act(() => {
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

/** Waits until `check` stops throwing, flushing Preact's updates in between: for results of asynchronous work (codes, clipboard). */
export async function waitUntil(check: () => void) {
  // The default of one second is too short for compressing a share code while the machine is busy (e.g. a parallel
  // mutation run); the test timeout in vite.config.ts stays the upper bound.
  await vi.waitFor(
    async () => {
      await act(async () => {});
      check();
    },
    { timeout: 5000 },
  );
}

/** A fixed window for asynchronous work; only for checking that something does not happen, where waiting for a condition would pass too early. */
export async function settle() {
  for (let i = 0; i < 20; i++) await act(() => new Promise((r) => setTimeout(r, 5)));
}

/** Text of the app-wide notice (import results, storage problems); empty if there is none. */
export const appNotice = () => root.querySelector('div.notice[role="status"]')?.textContent ?? '';

/** The saved draft (answers), empty if there is none. */
export const draft = () => JSON.parse(localStorage.getItem('wfc.draft.v1') ?? '{}');

export const ranking = () => [...root.querySelectorAll('.ranking .ranking-item')];
/** The character sheet: the dialog that is not the ranking drawer (both are dialogs on narrow screens). */
export const sheet = () =>
  within(root).queryAllByRole<HTMLElement>('dialog', { name: (name) => name !== t('rankingTitle') })[0] ?? null;
export const openItem = () => root.querySelector('.ranking-item.open')!;
/** The mobile bar, by its fixed name; the top three are its description. */
export const mobileBar = () => within(root).getByRole<HTMLButtonElement>('button', { name: t('showRanking') });
export const openSheetButton = () =>
  within(openItem() as HTMLElement).getByRole<HTMLButtonElement>('button', { name: t('openSheet') });

/** Ranking entry of a class, found by its English name. */
export const classItem = (name: string) =>
  ranking().find((i) => i.querySelector('.class-name')?.textContent?.trim() === name)!;

export const scoreOf = (className: string) =>
  Number(classItem(className)?.querySelector('.score-value')?.textContent?.replace(/\D/g, ''));

/** Opens a class's widget and returns it. */
export async function openClass(classId: string) {
  await click(
    classItem(CLASSES.find((c) => c.id === classId)!.name.en).querySelector<HTMLButtonElement>('button.ranking-head')!,
  );
  return openItem();
}

/** Many answers (the first option of each question) so classes have many pros and cons; optionally all deal-breakers. */
export async function answerMany({ dealbreakers = false } = {}) {
  for (const q of rated(QUESTIONS).filter((x) => x.chapter !== 'dealbreakers'))
    await click(option(q.id, q.options[0]!.id));
  if (dealbreakers)
    for (const o of QUESTIONS.find((q) => q.id === 'deal-breakers')!.options)
      await click(option('deal-breakers', o.id));
}
