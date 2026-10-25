import { describe, it, expect } from 'vitest';
import { DATA_VERSION } from '../../src/data/sources';
import fc from 'fast-check';
import { QUESTIONS } from '../../src/data/questions';
import { decodeShareCode, encodeShareCode } from '../../src/persistence/share-code';
import { sanitizeAnswerObject } from '../../src/persistence/answers-sanitizer';
import { recommend } from '../../src/app/recommendation';
import { answersOf, gates, pick, DONT_CARE, pickHigh, rated } from '../support/fixtures';
import { MemoryStorage, rawCode } from '../support/persistence';
import { createProfileStore } from '../../src/persistence/storage';
import type { Answers } from '../../src/domain/answers';
import { isWeighable, isMultipleChoice } from '../../src/domain/questions';

const singles = QUESTIONS.filter((q) => !isMultipleChoice(q) && q.options.length > 1);

const overfull: Answers = Object.fromEntries(singles.map((q) => [q.id, pick(...q.options.map((o) => o.id))]));

describe("Don't care", () => {
  it('"Don\'t care" survives saving (sanitizer) and sharing (share code)', async () => {
    const answers = answersOf({ role: DONT_CARE, faction: DONT_CARE, control: pick('kick') });
    expect(sanitizeAnswerObject(answers, QUESTIONS)).toEqual(answers);
    const decoded = await decodeShareCode(await encodeShareCode(answers, DATA_VERSION), QUESTIONS);
    expect(decoded.ok && decoded.answers).toEqual(answers);
  });
});

describe("Don't care for an opening question", () => {
  it('is dropped when loading saved answers or a share code, so the chapter counts as with no answer to its opening question', async () => {
    expect(gates(QUESTIONS).length).toBeGreaterThan(0);
    const stored = answersOf({
      ...Object.fromEntries(gates(QUESTIONS).map((g) => [g.id, DONT_CARE])),
      role: DONT_CARE,
    });
    expect(sanitizeAnswerObject(stored, QUESTIONS)).toEqual(answersOf({ role: DONT_CARE }));
    const decoded = await decodeShareCode(await encodeShareCode(stored, DATA_VERSION), QUESTIONS);
    expect(decoded.ok && decoded.answers).toEqual(answersOf({ role: DONT_CARE }));
  });
});

describe('Single choice from an external source', () => {
  it('a share code with several answers to a single choice keeps exactly one', async () => {
    expect(singles.length).toBeGreaterThan(0);
    const result = await decodeShareCode(await encodeShareCode(overfull, DATA_VERSION), QUESTIONS);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    for (const q of singles) expect(result.answers[q.id], q.id).toEqual(pick(q.options[0]!.id));
  });

  it('saved answers with several options for a single choice keep exactly one', () => {
    const answers = sanitizeAnswerObject(overfull, QUESTIONS);
    for (const q of singles) expect(answers[q.id], q.id).toEqual(pick(q.options[0]!.id));
  });

  it('a loaded draft is cleaned up the same way', () => {
    const storage = new MemoryStorage();
    const store = createProfileStore(() => storage, QUESTIONS);
    store.saveDraft(answersOf({ ...overfull, unknown: pick('x') }));
    const draft = store.loadDraft();
    expect(Object.keys(draft).sort()).toEqual(singles.map((q) => q.id).sort());
    for (const q of singles) expect(draft[q.id], q.id).toEqual(pick(q.options[0]!.id));
  });
});

describe('Saved answers', () => {
  const profile = (over: Record<string, unknown> = {}) => ({
    id: 'p1',
    name: 'Test',
    savedAt: '2026-10-19T10:00:00.000Z',
    dataVersion: 'v',
    answers: answersOf({ role: pick('tank') }),
    ...over,
  });
  const storeWith = (stored: unknown) => {
    const storage = new MemoryStorage();
    storage.setItem('wfc.profiles.v1', JSON.stringify(stored));
    return createProfileStore(() => storage, QUESTIONS);
  };

  it('values that are not objects, unknown kinds and option lists with non-IDs are dropped', () => {
    const raw = {
      role: null,
      distance: 5,
      defense: { kind: 'picked', optionIds: ['stand', 7], importance: 'normal' },
      pet: { kind: 'picked', optionIds: 'none', importance: 'normal' },
      control: { kind: 'maybe', optionIds: ['kick'] },
      social: pick('solo'),
    };
    expect(sanitizeAnswerObject(raw, QUESTIONS)).toEqual(answersOf({ social: pick('solo') }));
  });

  it('a dropped answer leaves no key behind, so the answers do not count as given', () => {
    // importNeedsConsent counts the keys: a key holding undefined would ask before importing over nothing.
    const raw = { role: { kind: 'picked', optionIds: ['unknown'], importance: 'normal' }, social: pick('solo') };
    expect(sanitizeAnswerObject(raw, QUESTIONS)).toStrictEqual(answersOf({ social: pick('solo') }));
  });

  it('answers that are missing, null, a list or no object yield no answers', () => {
    for (const raw of [undefined, null, [pick('solo')], 'social', 5]) {
      expect(sanitizeAnswerObject(raw, QUESTIONS), JSON.stringify(raw)).toEqual({});
    }
    const list = storeWith([profile({ answers: null }), profile({ id: 'p2', answers: undefined })]).list();
    expect(list.ok && list.value.map((p) => p.answers)).toEqual([{}, {}]);
  });
});

describe('Answers from an external source', () => {
  it('an entry with an empty option list is dropped, in the share code and in storage', async () => {
    const code = await decodeShareCode(
      await rawCode('{"v":1,"d":"x","a":[["role",[]],["faction",["horde"]]]}'),
      QUESTIONS,
    );
    expect(code.ok && code.answers).toEqual(answersOf({ faction: pick('horde') }));
    const stored = sanitizeAnswerObject({ role: { kind: 'picked', optionIds: [], importance: 'normal' } }, QUESTIONS);
    expect(stored).toEqual({});
  });

  it('"Important" is kept only for questions whose weight selection offers it', async () => {
    const weighable = QUESTIONS.find((q) => isWeighable(q))!;
    const others = QUESTIONS.filter((q) => !isWeighable(q));
    expect(others.length).toBeGreaterThan(0);
    const raw = Object.fromEntries([weighable, ...others].map((q) => [q.id, pickHigh(q.options[0]!.id)]));
    const expected = Object.fromEntries([
      [weighable.id, pickHigh(weighable.options[0]!.id)],
      ...others.map((q) => [q.id, pick(q.options[0]!.id)]),
    ]);
    expect(sanitizeAnswerObject(raw, QUESTIONS)).toEqual(expected);
    const decoded = await decodeShareCode(await encodeShareCode(raw, DATA_VERSION), QUESTIONS);
    expect(decoded.ok && decoded.answers).toEqual(expected);
  });
});

describe("Don't care from an external source", () => {
  const questions = rated(QUESTIONS);

  it('"Don\'t care" with stray options or importance stays "Don\'t care" and changes no result', () => {
    expect(questions.some((q) => q.multi) && questions.some((q) => !q.multi)).toBe(true);
    fc.assert(
      fc.property(
        fc.constantFrom(...questions).chain((q) =>
          fc.tuple(
            fc.constant(q),
            fc.subarray(
              q.options.map((o) => o.id),
              { minLength: 1 },
            ),
            fc.nat(),
            fc.boolean(),
          ),
        ),
        ([q, chosen, position, high]) => {
          // Fields a "Don't care" does not have are ignored, whatever they contain.
          const optionIds = chosen.slice(position % (chosen.length + 1));
          const raw = { [q.id]: { kind: 'dontCare', optionIds, ...(high ? { importance: 'high' } : {}) } };
          const answers = sanitizeAnswerObject(raw, QUESTIONS);
          expect(answers).toEqual(answersOf({ [q.id]: DONT_CARE }));
          expect(recommend(answers).ranking).toEqual(recommend({}).ranking);
        },
      ),
      { numRuns: 30 },
    );
  });
});
