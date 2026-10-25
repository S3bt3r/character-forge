import type { ScoringInput } from '../../src/domain/scoring';
import { traitProfile, traitValue, type Faction, type RaceProfile, type SpecProfile } from '../../src/domain/catalog';
import type {
  DealbreakerEffect,
  Effect,
  Question,
  GateQuestion,
  RatedQuestion,
  ChapterId,
  QuestionMode,
  QuestionTier,
  Severity,
  TraitScope,
} from '../../src/domain/questions';
import type { Answer, Answers, Importance } from '../../src/domain/answers';
import { classId, optionId, questionId, raceId, specId } from '../../src/domain/ids';

/** Shared building blocks for scoring tests with small, synthetic data sets. */

function picked(ids: string[], importance: Importance): Answer {
  const [first, ...rest] = ids;
  // An answer without options cannot exist; a test that builds one is wrong.
  if (first === undefined) throw new Error('A picked answer needs at least one option');
  return { kind: 'picked', optionIds: [optionId(first), ...rest.map(optionId)], importance };
}
/** Picked options with normal importance. */
export const pick = (...ids: string[]): Answer => picked(ids, 'normal');
/** Picked options of an important question. */
export const pickHigh = (...ids: string[]): Answer => picked(ids, 'high');
export const DONT_CARE: Answer = { kind: 'dontCare' };
/** Answers keyed by plain question IDs, as tests write them; the keys become question IDs. */
export const answersOf = (answers: Record<string, Answer>): Answers => answers as Answers;

export function spec(id: string, cls: string, traits: Record<string, number>): SpecProfile {
  return { id: specId(id), classId: classId(cls), traits: traitProfile(traits) };
}

export function race(id: string, faction: Faction, traits: Record<string, number>): RaceProfile {
  return { id: raceId(id), faction, traits: traitProfile(traits) };
}

export function question(
  id: string,
  options: Effect[][],
  { mode = 'any', tier = 'core', multi = true }: { mode?: QuestionMode; tier?: QuestionTier; multi?: boolean } = {},
): RatedQuestion {
  return {
    kind: 'rated',
    id: questionId(id),
    chapter: 'foundation',
    multi,
    mode,
    tier,
    options: options.map((effects, i) => ({ id: optionId(`o${i}`), effects })),
  };
}

/** Gate with `count` options without effects, in the given chapter. */
export function gateQuestion(
  id: string,
  count: number,
  gate: { mute: string[]; boost: string[] },
  chapter: ChapterId,
): GateQuestion {
  return {
    kind: 'gate',
    id: questionId(id),
    chapter,
    options: Array.from({ length: count }, (_, i) => ({ id: optionId(`o${i}`), effects: [] })),
    gate: { mute: gate.mute.map(optionId), boost: gate.boost.map(optionId) },
  };
}

/** The questions that score, without the gates. */
export const rated = (questions: Question[]): RatedQuestion[] =>
  questions.filter((q): q is RatedQuestion => q.kind === 'rated');

/** The gates among the questions, with their gate type. */
export const gates = <Q extends Question>(questions: Q[]): Extract<Q, { kind: 'gate' }>[] =>
  questions.filter((q): q is Extract<Q, { kind: 'gate' }> => q.kind === 'gate');

export const pref = (scope: TraitScope, trait: string, target: number, weight = 1): Effect => ({
  kind: 'pref',
  scope,
  trait,
  target: traitValue(target),
  weight,
});

export const deal = (
  scope: DealbreakerEffect['scope'],
  trait: string,
  op: 'min' | 'max',
  threshold: number,
  severity: Severity = 'heavy',
): Effect => ({ kind: 'dealbreaker', scope, trait, op, threshold: traitValue(threshold), severity });

/** Synthetic catalog together with the questions its answers are evaluated against. */
export type TestInput = ScoringInput & { questions: Question[] };

/** Every race can be combined with every class; `newCombos` marks `race/class` keys as new (`isNew`). */
export function input(
  specs: SpecProfile[],
  races: RaceProfile[],
  questions: Question[],
  newCombos: string[] = [],
): TestInput {
  const classIds = [...new Set(specs.map((s) => s.classId))];
  return {
    specs,
    races,
    questions,
    combos: races.flatMap((r) =>
      classIds.map((classId) => ({
        raceId: r.id,
        classId,
        isNew: newCombos.includes(`${r.id}/${classId}`),
      })),
    ),
  };
}
