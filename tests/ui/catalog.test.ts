import { describe, it, expect } from 'vitest';
import { optionLabel, penaltyReason, QUESTIONS } from '../../src/ui/catalog';
import { optionId, questionId } from '../../src/domain/ids';

describe('Labels of picked options', () => {
  it('the explanation names the label of exactly the picked option', () => {
    for (const q of QUESTIONS)
      for (const o of q.options) expect(optionLabel(q.id, o.id), `${q.id}/${o.id}`).toBe(o.label);
    expect(optionLabel(questionId('role'), optionId('does-not-exist'))).toBeUndefined();
  });
});

describe('Reasons of deal-breaker penalties', () => {
  it('a penalty shows the reason of exactly the deal-breaker it comes from', () => {
    let count = 0;
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        for (const e of o.effects) {
          if (e.kind !== 'dealbreaker') continue;
          expect(
            penaltyReason({ questionId: q.id, optionId: o.id, scope: e.scope, trait: e.trait, points: 25 }),
            `${q.id}/${o.id}`,
          ).toBe(e.reason);
          count++;
        }
      }
    }
    expect(count).toBeGreaterThan(0);
  });

  it('a penalty without a deal-breaker behind it is a bug, not an empty reason', () => {
    const [q] = QUESTIONS.filter((x) => x.options.some((o) => o.effects.some((e) => e.kind === 'dealbreaker')));
    const o = q!.options.find((x) => x.effects.some((e) => e.kind === 'dealbreaker'))!;
    const trait = o.effects.find((e) => e.kind === 'dealbreaker')!.trait;
    expect(() => penaltyReason({ questionId: q!.id, optionId: o.id, scope: 'race', trait, points: 25 })).toThrow(
      `No deal-breaker ${q!.id}/${o.id} on race/${trait}`,
    );
    expect(() =>
      penaltyReason({ questionId: q!.id, optionId: o.id, scope: 'spec', trait: 'no-such-trait', points: 25 }),
    ).toThrow(/No deal-breaker/);
    expect(() =>
      penaltyReason({
        questionId: questionId('no-such-question'),
        optionId: o.id,
        scope: 'spec',
        trait: 'apm',
        points: 25,
      }),
    ).toThrow(/No deal-breaker/);
  });
});
