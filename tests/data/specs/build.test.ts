import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { buildSpecs } from '../../../src/data/specs/build';
import { SPECS } from '../../../src/data/specs';
import { estimate } from '../../../src/data/evidence/helpers';
import { graded, rated, type ClassSpecs, type CompleteClassSpecs } from '../../../src/data/rated';
import { MAGE_SPECS } from '../../../src/data/specs/mage';
import type { SpecTraitId } from '../../../src/data/traits';
import type { SpecKeyOf } from '../../../src/data/ids';
import { CLASS_EVIDENCE } from '../../support/class-evidence';
import { DE_DATA } from '../../support/flat-views';

const unit = fc.double({ min: 0, max: 1, noNaN: true });

// A synthetic class with two specs and two traits; the casts stand in for the literal types of real class data.
const TRAITS = ['apm', 'cc'] as SpecTraitId[];
const NAMES = { a: { name: 'A' }, b: { name: 'B' } };
const NO_NOTES = {
  notes: { shared: {}, specs: {} },
  names: NAMES as unknown as Record<SpecKeyOf<'mage'>, { name: string }>,
};
const build = (data: { traits: object; specs: object }) =>
  buildSpecs('mage', data as ClassSpecs<'mage'>, TRAITS, NO_NOTES);
const spec = (traits: object = {}) => ({ name: 'S', traits });
const valuesOf = (built: ReturnType<typeof build>) => Object.fromEntries(built.map((s) => [s.id, s.traits]));

describe('Spec builder and provenance', () => {
  it('a spec takes its own pair, otherwise the class pair or its graded value', () => {
    fc.assert(
      fc.property(unit, unit, unit, unit, (classApm, ownApm, gradedA, gradedB) => {
        const built = build({
          traits: {
            apm: rated(classApm, estimate('class')),
            cc: graded({ a: gradedA, b: gradedB }, estimate('graded')),
          },
          specs: { a: spec(), b: spec({ apm: rated(ownApm, estimate('own')) }) },
        });
        expect(valuesOf(built)).toEqual({ a: { apm: classApm, cc: gradedA }, b: { apm: ownApm, cc: gradedB } });
        expect(built[0]!.evidence).toMatchObject({ apm: { note: { en: 'class' } }, cc: { note: { en: 'graded' } } });
        expect(built[1]!.evidence).toMatchObject({ apm: { note: { en: 'own' } }, cc: { note: { en: 'graded' } } });
      }),
    );
  });

  it('the compiler rejects class data in which a spec gets no value for a trait and names the trait', () => {
    // Checked by `npm run typecheck`, which runs before the tests: a wrong type here fails the type check.
    type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
    type WithoutArmor = Omit<typeof MAGE_SPECS, 'traits'> & { traits: Omit<(typeof MAGE_SPECS)['traits'], 'armor'> };
    const complete: Equal<CompleteClassSpecs<'mage', typeof MAGE_SPECS>, typeof MAGE_SPECS> = true;
    const gap: Equal<CompleteClassSpecs<'mage', WithoutArmor>, { missingTraits: 'armor' }> = true;
    expect([complete, gap]).toEqual([true, true]);
  });

  it('a trait without a value is an error, not a silent default', () => {
    const data = {
      traits: { apm: rated(0.5, estimate('class')) },
      specs: { a: spec(), b: spec({ cc: rated(0.5, estimate('own')) }) },
    };
    expect(() => build(data)).toThrow('a/cc: no value');
  });

  it('a graded entry must give a value to every spec that inherits it and none to a spec with its own pair', () => {
    const own = { apm: rated(0.5, estimate('class')), cc: rated(0.5, estimate('own')) };
    expect(() =>
      build({ traits: { ...own, cc: graded({ a: 0.2 }, estimate('graded')) }, specs: { a: spec(), b: spec() } }),
    ).toThrow('b/cc: graded entry without a value for this spec');
    expect(() =>
      build({
        traits: { ...own, cc: graded({ a: 0.2, b: 0.3 }, estimate('graded')) },
        specs: { a: spec(), b: spec({ cc: own.cc }) },
      }),
    ).toThrow('b/cc: graded value for a spec with its own pair');
  });

  it('a graded value for an unknown spec and a class pair no spec inherits are errors, not silently ignored', () => {
    const pairs = { apm: rated(0.5, estimate('class')), cc: rated(0.5, estimate('class')) };
    expect(() =>
      build({
        traits: { ...pairs, cc: graded({ a: 0.2, b: 0.3, typo: 0.4 }, estimate('graded')) },
        specs: { a: spec(), b: spec() },
      }),
    ).toThrow('mage/cc: graded value for unknown spec typo');
    const own = { cc: rated(0.4, estimate('own')) };
    expect(() => build({ traits: pairs, specs: { a: spec(own), b: spec(own) } })).toThrow(
      'mage/cc: class pair that every spec replaces',
    );
  });

  it("provenance per trait on the real data: the spec's pair before the class pair, with the German note of its position", () => {
    for (const s of SPECS) {
      const cls = CLASS_EVIDENCE[s.classId]!;
      const own = cls.specs[s.id] ?? {};
      for (const [trait, got] of Object.entries(s.evidence ?? {})) {
        const fromSpec = own[trait] !== undefined;
        const winner = (fromSpec ? own[trait] : cls.shared[trait])!;
        const { note: winnerNote, ...rest } = winner;
        expect(got, `${s.id}/${trait}`).toMatchObject(winnerNote ? { ...rest, note: { en: winnerNote.en } } : rest);
        const note =
          winner.note?.de ?? DE_DATA[fromSpec ? `evidence.${s.id}.${trait}` : `evidence.${s.classId}.${trait}`];
        expect(got?.note?.de, `${s.id}/${trait}`).toBe(note);
      }
    }
  });
});
