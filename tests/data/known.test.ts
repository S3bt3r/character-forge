import { describe, it, expect } from 'vitest';
import { knownId } from '../../src/data/known';

describe('References in the data', () => {
  it('a known ID comes back as the entry it names, an unknown one fails with the place it was named', () => {
    expect(knownId(['a', 'b'], 'b', 'Partner profession')).toBe('b');
    expect(() => knownId(['a', 'b'], 'c', 'Partner profession')).toThrow('Partner profession: unknown ID c');
    expect(() => knownId([], 'a', 'Gate g')).toThrow('Gate g: unknown ID a');
  });
});
