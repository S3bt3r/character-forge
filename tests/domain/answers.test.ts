import { describe, it, expect } from 'vitest';
import { pickedAnswer } from '../../src/domain/answers';
import { optionId } from '../../src/domain/ids';

describe('Picked answers', () => {
  it('an answer picks at least one option; without any there is no answer', () => {
    expect(pickedAnswer([], false)).toBeUndefined();
    expect(pickedAnswer([], true)).toBeUndefined();
  });

  it('keeps the options in order and carries the importance', () => {
    const ids = [optionId('b'), optionId('a')];
    expect(pickedAnswer(ids, false)).toEqual({ kind: 'picked', optionIds: ids, importance: 'normal' });
    expect(pickedAnswer(ids, true)).toEqual({ kind: 'picked', optionIds: ids, importance: 'high' });
  });
});
