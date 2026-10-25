import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { traitProfile, traitValue } from '../../src/domain/catalog';

describe('Trait values', () => {
  it('accept every value in [0, 1] unchanged', () => {
    fc.assert(
      fc.property(fc.double({ min: 0, max: 1, noNaN: true }), (v) => {
        expect(traitValue(v)).toBe(v);
      }),
    );
    expect(traitValue(0)).toBe(0);
    expect(traitValue(1)).toBe(1);
  });

  it('reject values outside [0, 1] and NaN', () => {
    for (const v of [-0.01, 1.01, -1, 2, Number.NaN, Number.POSITIVE_INFINITY])
      expect(() => traitValue(v), String(v)).toThrow(RangeError);
    expect(() => traitValue(2)).toThrow('Trait value 2 is outside [0, 1]');
  });

  it('a profile keeps its traits and rejects any value outside [0, 1]', () => {
    expect(traitProfile({ a: 0, b: 0.5, c: 1 })).toEqual({ a: 0, b: 0.5, c: 1 });
    expect(() => traitProfile({ a: 0.5, b: 1.5 })).toThrow('Trait b 1.5 is outside [0, 1]');
  });
});
