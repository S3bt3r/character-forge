import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../../src/data/questions';
import { classCriteriaCount, classScore } from '../../src/domain/class-scoring';
import type { Answers } from '../../src/domain/answers';
import { recommend, recommendForClass } from '../../src/app/recommendation';
import { CLASSES } from '../../src/data/classes';
import { answersOf, pick, rated } from '../support/fixtures';
import { evaluate } from '../../src/domain/evaluation';
import { PROFESSIONS } from '../../src/data/professions';
import { LEGACY_PERKS } from '../../src/data/legacy';
import { classId } from '../../src/domain/ids';

/** Answers to the first `n` questions with spec preferences (the first option with an effect each). */
function specPreferenceAnswers(n: number): Answers {
  const qs = rated(QUESTIONS)
    .filter((q) => q.options.some((o) => o.effects.some((e) => e.kind === 'pref' && e.scope === 'spec')))
    .slice(0, n);
  return Object.fromEntries(qs.map((q) => [q.id, pick(q.options.find((o) => o.effects.length > 0)!.id)]));
}

describe('Notice above the ranking', () => {
  it('below eight class-relevant answers "only a few", from eight on no notice', () => {
    const seven = specPreferenceAnswers(7);
    const eight = specPreferenceAnswers(8);
    expect(classCriteriaCount(evaluate(QUESTIONS, seven))).toBe(7);
    expect(classCriteriaCount(evaluate(QUESTIONS, eight))).toBe(8);
    expect(recommend(seven).notice).toBe('fewAnswers');
    expect(recommend(eight).notice).toBeUndefined();
    expect(recommend({}).notice).toBe('noRating');
  });
});

describe('Picked faction', () => {
  it('exactly one faction counts, both or none mean "open"', () => {
    expect(recommend(answersOf({ faction: pick('alliance') })).faction).toBe('alliance');
    expect(recommend(answersOf({ faction: pick('horde') })).faction).toBe('horde');
    expect(recommend(answersOf({ faction: pick('horde', 'alliance') })).faction).toBeUndefined();
    expect(recommend({}).faction).toBeUndefined();
  });
});

describe('Recommendation for the answers', () => {
  it('ranking, notice and faction come from one evaluation of the answers', () => {
    const answers = answersOf({ ...specPreferenceAnswers(3), faction: pick('horde') });
    const evaluation = evaluate(QUESTIONS, answers);
    const result = recommend(answers);
    expect(result.evaluation).toEqual(evaluation);
    // Every class once, best first; how each is scored is the domain's business (tests/domain).
    expect(result.ranking.map((c) => c.classId).sort()).toEqual(CLASSES.map((c) => c.id).sort());
    const scores = result.ranking.map(classScore);
    expect(scores).toEqual([...scores].sort((x, y) => y - x));
    expect(result.notice).toBe('fewAnswers');
    expect(result.faction).toBe('horde');
  });
});

describe('Recommendation for one class', () => {
  const raceSynergies = (details: ReturnType<typeof recommendForClass>) =>
    [details.professionPairs!.best, ...details.professionPairs!.alternatives, ...details.secondaryProfessions]
      .flatMap((p) => p.synergies)
      .filter((s) => s.kind === 'race');

  it('without race answers no race leads, so no profession gets a race synergy', () => {
    const details = recommendForClass(evaluate(QUESTIONS, {}), classId('warrior'));
    expect(details.racesRated).toBe(false);
    expect(details.topRaceId).toBeUndefined();
    expect(raceSynergies(details)).toEqual([]);
    expect(details.legacyRated).toBe(false);
  });

  it('two races tied at the top decide no race synergy', () => {
    const details = recommendForClass(
      evaluate(QUESTIONS, answersOf({ novelty: pick('skyborne') })),
      classId('warrior'),
    );
    expect(details.racesRated).toBe(true);
    expect(details.races[0]!.score).toBe(details.races[1]!.score);
    expect(details.topRaceId).toBeUndefined();
    expect(raceSynergies(details)).toEqual([]);
  });

  it('a unique leading race brings the race synergies of exactly the professions that name it', () => {
    const details = recommendForClass(
      evaluate(QUESTIONS, answersOf({ size: pick('large'), faction: pick('horde') })),
      classId('warrior'),
    );
    // The rule, not a particular race: the leader is unique and its race is the one the professions get.
    const [first, second] = details.races;
    expect(first!.score).toBeGreaterThan(second!.score);
    expect(details.topRaceId).toBe(first!.raceId);
    const named = PROFESSIONS.filter((p) => p.raceSynergy?.includes(details.topRaceId!)).map((p) => p.id);
    expect(named.length).toBeGreaterThan(0);
    const synergies = raceSynergies(details);
    expect(synergies.length).toBeGreaterThan(0);
    for (const synergy of synergies) expect(named, synergy.professionId).toContain(synergy.professionId);
  });

  it('Legacy answers mark the perks as rated', () => {
    expect(
      recommendForClass(evaluate(QUESTIONS, answersOf({ 'legacy-focus': pick('leveling') })), classId('mage'))
        .legacyRated,
    ).toBe(true);
  });

  it('every secondary profession is shown, not only the best', () => {
    const shown = recommendForClass(evaluate(QUESTIONS, {}), classId('mage')).secondaryProfessions.map(
      (p) => p.professionId,
    );
    expect([...shown].sort()).toEqual(
      PROFESSIONS.filter((p) => p.kind === 'secondary')
        .map((p) => p.id)
        .sort(),
    );
  });

  it('Legacy perks that fit the class rank first', () => {
    const [first] = recommendForClass(evaluate(QUESTIONS, {}), classId('mage')).legacyPerks;
    expect(first!.score).toBeGreaterThan(50);
    expect(LEGACY_PERKS.find((p) => p.id === first!.perkId)!.classSynergy).toContain('mage');
  });

  it('shows three races, one profession pair with two alternatives and five Legacy perks', () => {
    const details = recommendForClass(evaluate(QUESTIONS, {}), classId('mage'));
    expect(details.races).toHaveLength(3);
    expect(details.professionPairs!.alternatives).toHaveLength(2);
    expect(details.legacyPerks).toHaveLength(5);
  });
});
