import { describe, it, expect } from 'vitest';
import { buildQuestions, opt, question, specMax, specMin } from '../../../src/data/questions/helpers';

// German texts at runtime; the compiler binds them to real chapters, the builder only reads them.
const de = (options: string[]) =>
  ({
    q: {
      text: 'T',
      short: 'S',
      options: Object.fromEntries(options.map((id) => [id, { label: id, reasons: { apm: 'R' } }])),
    },
  }) as never;
const settings = { text: 'T', short: 'S', mode: 'any', tier: 'core' } as const;

describe('Question builder', () => {
  it('a gate option outside the question fails when the data loads, naming the gate', () => {
    const gate = question('q', 'pve', { text: 'T', short: 'S', gate: { mute: ['no'], boost: ['typo'] } }, [
      opt('no', { label: 'No' }, []),
      opt('yes', { label: 'Yes' }, []),
    ]);
    expect(() => buildQuestions([gate], de(['no', 'yes']))).toThrow('Gate q: unknown ID typo');
  });

  it('two deal-breakers of one option on the same scope and trait fail, since the ranking could not tell their reasons apart', () => {
    const twice = question('q', 'dealbreakers', settings, [
      opt('o', { label: 'O' }, [specMin('apm', 0.2, 'heavy', 'low'), specMax('apm', 0.8, 'light', 'high')]),
    ]);
    expect(() => buildQuestions([twice], de(['o']))).toThrow('Option o: two deal-breakers on spec/apm');
    const once = question('q', 'dealbreakers', settings, [
      opt('o', { label: 'O' }, [specMin('apm', 0.2, 'heavy', 'low'), specMin('cc', 0.2, 'heavy', 'low')]),
    ]);
    expect(() => buildQuestions([once], de(['o']))).not.toThrow();
  });
});
