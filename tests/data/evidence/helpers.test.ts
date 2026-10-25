import { describe, it, expect } from 'vitest';
import {
  CLASSIC,
  classic,
  confirmed,
  estimate,
  withGerman,
  withSharedGerman,
} from '../../../src/data/evidence/helpers';

describe('German notes for evidence entries', () => {
  it('adds the German note exactly where the German texts list one and keeps every other entry as it is', () => {
    const evidence = { apm: estimate('Fast.'), cc: CLASSIC, range: confirmed(['dn'], 'Far.') };
    const result = withGerman(evidence, { apm: 'Schnell.' });
    expect(result.apm).toEqual({ provenance: 'estimate', note: { en: 'Fast.', de: 'Schnell.' } });
    expect(result.cc).toBe(CLASSIC);
    expect(result.range).toBe(evidence.range);
    expect(evidence.apm.note).toEqual({ en: 'Fast.' });
  });

  it('a German note for an entry without an English one is a mistake in the data and fails when the data loads', () => {
    expect(() => withGerman({ cc: CLASSIC }, { cc: 'Klassisch.' })).toThrow(
      'German note for "cc" without an English note',
    );
  });

  it('shared notes get their German text and keep provenance and sources', () => {
    const shared = withSharedGerman({ camp: confirmed(['dn'], 'Campsite.') }, { camp: 'Lager.' });
    expect(shared.camp).toEqual({ provenance: 'confirmed', sources: ['dn'], note: { en: 'Campsite.', de: 'Lager.' } });
  });

  it('a Classic entry may carry a note, and the timestamps of a podcast travel with the entry', () => {
    expect(classic('Unchanged.')).toEqual({ ...CLASSIC, note: { en: 'Unchanged.' } });
    expect(confirmed(['p2'], 'Said so.', { p2: '1:02' })).toMatchObject({ sources: ['p2'], at: { p2: '1:02' } });
  });
});
