import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { estimate } from '../../src/data/evidence/helpers';
import { rated, splitPairs, unrated } from '../../src/data/rated';

const unit = fc.double({ min: 0, max: 1, noNaN: true });

describe('Pairs of value and evidence', () => {
  it('splitting keeps every value and the evidence of exactly the rated pairs', () => {
    fc.assert(
      fc.property(fc.dictionary(fc.string({ minLength: 1 }), fc.tuple(unit, fc.boolean())), (spec) => {
        const ev = estimate('note');
        const pairs = Object.fromEntries(
          Object.entries(spec).map(([k, [v, isRated]]) => [k, isRated ? rated(v, ev) : unrated(v)]),
        );
        const { values, evidence } = splitPairs(pairs);
        expect(values).toEqual(Object.fromEntries(Object.entries(spec).map(([k, [v]]) => [k, v])));
        expect(evidence).toEqual(
          Object.fromEntries(Object.entries(spec).flatMap(([k, [, isRated]]) => (isRated ? [[k, ev]] : []))),
        );
      }),
    );
  });
});
