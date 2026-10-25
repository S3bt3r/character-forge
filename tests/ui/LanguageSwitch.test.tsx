// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from 'preact';
import { within } from '@testing-library/preact';
import { LanguageSwitch } from '../../src/ui/LanguageSwitch';
import { EN_UI as EN } from '../../src/ui/texts';

let root: HTMLDivElement;
beforeEach(() => {
  root = document.createElement('div');
  document.body.append(root);
});
afterEach(() => {
  render(null, root);
  root.remove();
});

describe('Language switcher', () => {
  it('the switcher shows every offered language, marks the active one and reports the choice', () => {
    const onChoose = vi.fn();
    render(<LanguageSwitch available={['de', 'en']} current="de" onChoose={onChoose} />, root);
    const group = within(root).getByRole('group');
    expect(group.getAttribute('aria-label')).toBe(EN.languageLabel);
    const buttons = within(group).getAllByRole('button');
    expect(buttons.map((b) => b.getAttribute('lang'))).toEqual(['de', 'en']);
    // Visible are the codes; a screen reader hears each language named in itself, not "D E".
    expect(buttons.map((b) => b.textContent)).toEqual(['DE', 'EN']);
    expect(within(group).getByRole('button', { name: 'Deutsch' })).toBe(buttons[0]);
    expect(within(group).getByRole('button', { name: 'English' })).toBe(buttons[1]);
    expect(buttons.map((b) => b.getAttribute('aria-pressed'))).toEqual(['true', 'false']);
    buttons[1]!.click();
    expect(onChoose).toHaveBeenCalledWith('en');
    buttons[0]!.click();
    expect(onChoose).toHaveBeenCalledTimes(1);
  });
});
