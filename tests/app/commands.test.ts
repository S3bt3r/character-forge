import { describe, it, expect } from 'vitest';
import { importNeedsConsent, withAnswer } from '../../src/app/commands';
import { questionId } from '../../src/domain/ids';
import { answersOf, DONT_CARE, pick } from '../support/fixtures';

const answers = answersOf({ role: pick('tank'), faction: DONT_CARE });

describe('Setting an answer', () => {
  it('sets or replaces exactly one question and leaves the given answers unchanged', () => {
    const next = withAnswer(answers, questionId('role'), pick('healer'));
    expect(next).toEqual(answersOf({ role: pick('healer'), faction: DONT_CARE }));
    expect(withAnswer(answers, questionId('distance'), DONT_CARE)).toEqual(
      answersOf({ role: pick('tank'), faction: DONT_CARE, distance: DONT_CARE }),
    );
    expect(answers).toEqual(answersOf({ role: pick('tank'), faction: DONT_CARE }));
  });

  it('undefined removes the question instead of keeping an empty entry', () => {
    const next = withAnswer(answers, questionId('role'), undefined);
    expect(next).toEqual(answersOf({ faction: DONT_CARE }));
    expect('role' in next).toBe(false);
  });
});

describe('Importing a share code', () => {
  it('asks for consent only when there are answers to lose', () => {
    expect(importNeedsConsent({})).toBe(false);
    expect(importNeedsConsent(answersOf({ faction: DONT_CARE }))).toBe(true);
  });
});
