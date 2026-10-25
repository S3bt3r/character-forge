import { describe, it, expect } from 'vitest';
import { toggledSelection } from '../../src/ui/answerState';
import { question } from '../support/fixtures';
import { optionId } from '../../src/domain/ids';

describe('Selecting options', () => {
  const ids = (...list: string[]) => new Set(list.map(optionId));
  const single = question('s', [[], [], []], { multi: false });
  const multi = question('m', [[], [], []]);

  it('a single choice picks the clicked option alone and clears it on a second click', () => {
    for (const { id } of single.options) {
      expect(toggledSelection(single, ids(), id)).toEqual([id]);
      expect(toggledSelection(single, ids(...['o0', 'o1', 'o2'].filter((o) => o !== id)), id)).toEqual([id]);
      expect(toggledSelection(single, new Set([id]), id)).toEqual([]);
    }
  });

  it('a multiple choice adds or removes the clicked option and keeps catalog order', () => {
    expect(toggledSelection(multi, ids('o2'), optionId('o0'))).toEqual(['o0', 'o2']);
    expect(toggledSelection(multi, ids('o2', 'o0', 'o1'), optionId('o1'))).toEqual(['o0', 'o2']);
    expect(toggledSelection(multi, ids('o1'), optionId('o1'))).toEqual([]);
  });
});
