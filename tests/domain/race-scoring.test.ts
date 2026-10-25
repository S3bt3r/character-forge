import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { evaluate } from '../../src/domain/evaluation';
import { rankClasses } from '../../src/domain/class-scoring';
import { rankRaces, uniqueTopRaceId, type RaceResult } from '../../src/domain/race-scoring';
import { answersOf, input, pick, pref, question, race, spec, type TestInput } from '../support/fixtures';
import { clampScore } from '../../src/domain/scoring';
import { classId, raceId } from '../../src/domain/ids';

describe('Race ranking', () => {
  it('faction filters races; classes without a race of this faction are dropped', () => {
    const fq = question('f', [[{ kind: 'faction', faction: 'horde' }], [{ kind: 'faction', faction: 'alliance' }]], {
      multi: false,
    });
    const data: TestInput = {
      specs: [spec('s1', 'c1', {}), spec('s2', 'c2', {})],
      races: [race('h', 'horde', {}), race('a', 'alliance', {})],
      questions: [fq],
      combos: [
        { raceId: raceId('h'), classId: classId('c1'), isNew: false },
        { raceId: raceId('a'), classId: classId('c1'), isNew: false },
        { raceId: raceId('a'), classId: classId('c2'), isNew: false },
      ],
    };
    expect(rankClasses(data, evaluate(data.questions, answersOf({ f: pick('o0') }))).map((c) => c.classId)).toEqual([
      'c1',
    ]);
    expect(
      rankRaces(data, evaluate(data.questions, answersOf({ f: pick('o0') })), classId('c1')).map((r) => r.raceId),
    ).toEqual(['h']);
    expect(
      rankClasses(data, evaluate(data.questions, answersOf({ f: pick('o1') })))
        .map((c) => c.classId)
        .sort(),
    ).toEqual(['c1', 'c2']);
    expect(
      rankRaces(data, evaluate(data.questions, {}), classId('c1'))
        .map((r) => r.raceId)
        .sort(),
    ).toEqual(['a', 'h']);
  });

  it('"new combination" raises only combinations marked isNew', () => {
    const data = input(
      [spec('s', 'paladin', {}), spec('m', 'mage', {})],
      [race('undead', 'horde', { x: 0.5 }), race('human', 'alliance', { x: 0.5 })],
      [question('nc', [[pref('race', 'newCombo', 1)]])],
      ['undead/paladin'],
    );
    const paladin = rankRaces(data, evaluate(data.questions, answersOf({ nc: pick('o0') })), classId('paladin'));
    expect(paladin.map((r) => r.raceId)).toEqual(['undead', 'human']);
    expect(paladin[0]!.isNew).toBe(true);
    expect(paladin[0]!.score).toBe(100);
    expect(paladin[1]!.score).toBe(0);
    const mage = rankRaces(data, evaluate(data.questions, answersOf({ nc: pick('o0') })), classId('mage'));
    for (const r of mage) expect(r.score).toBe(0);
  });
});

describe('Both factions and the leading race', () => {
  it('both factions picked: no race is excluded', () => {
    const fq = question('f', [[{ kind: 'faction', faction: 'horde' }], [{ kind: 'faction', faction: 'alliance' }]]);
    const data = input([spec('s', 'c', {})], [race('h', 'horde', {}), race('a', 'alliance', {})], [fq]);
    expect(
      rankRaces(data, evaluate(data.questions, answersOf({ f: pick('o0', 'o1') })), classId('c'))
        .map((r) => r.raceId)
        .sort(),
    ).toEqual(['a', 'h']);
  });

  it('uniqueTopRaceId only with a unique, rated leader', () => {
    const r = (id: string, score: number, raw: number | null = score): RaceResult => ({
      raceId: raceId(id),
      score: clampScore(score),
      match: raw === null ? { kind: 'unrated' } : { kind: 'rated', percent: clampScore(raw) },
      isNew: false,
      matches: [],
      conflicts: [],
      penalties: [],
    });
    expect(uniqueTopRaceId([])).toBeUndefined();
    expect(uniqueTopRaceId([r('a', 50, null), r('b', 50, null)])).toBeUndefined();
    expect(uniqueTopRaceId([r('a', 80), r('b', 80)])).toBeUndefined();
    expect(uniqueTopRaceId([r('a', 80), r('b', 60)])).toBe('a');
    expect(uniqueTopRaceId([r('a', 70)])).toBe('a');
  });

  it('without a race rating there is no leader, even if deductions separate the scores', () => {
    const r = (id: string, score: number): RaceResult => ({
      raceId: raceId(id),
      isNew: false,
      score: clampScore(score),
      match: { kind: 'unrated' },
      matches: [],
      conflicts: [],
      penalties: [],
    });
    expect(uniqueTopRaceId([r('a', 50), r('b', 25)])).toBeUndefined();
  });
});

describe('Ties', () => {
  it('races with equal scores are ordered by ID, whatever the order of the catalog', () => {
    const races = [
      race('zeta', 'horde', { a: 0.9 }),
      race('alpha', 'alliance', { a: 0.1 }),
      race('mu', 'horde', { a: 0.5 }),
    ];
    fc.assert(
      fc.property(fc.shuffledSubarray(races, { minLength: races.length }), (shuffled) => {
        const data = input([spec('s', 'c', {})], shuffled, []);
        expect(rankRaces(data, evaluate(data.questions, {}), classId('c')).map((r) => r.raceId)).toEqual([
          'alpha',
          'mu',
          'zeta',
        ]);
      }),
    );
  });
});
