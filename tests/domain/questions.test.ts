import { describe, it, expect } from 'vitest';
import { isWeighable } from '../../src/domain/questions';
import { deal, pref, question, gateQuestion } from '../support/fixtures';

describe('Weightable questions', () => {
  it('a question is weightable if it has at least one preference, even alongside other effects', () => {
    expect(isWeighable(question('mixed', [[deal('spec', 'a', 'min', 0.5), pref('spec', 'a', 1)], []]))).toBe(true);
    expect(isWeighable(question('unrated', [[], []]))).toBe(false);
    expect(isWeighable(question('nogo', [[deal('spec', 'a', 'min', 0.5)], []]))).toBe(false);
  });

  it('a gate is never weightable, whatever its options carry', () => {
    const gate = gateQuestion('g', 2, { mute: ['o0'], boost: [] }, 'pve');
    expect(
      isWeighable({ ...gate, options: gate.options.map((o) => ({ ...o, effects: [pref('spec', 'a', 1)] })) }),
    ).toBe(false);
  });
});
