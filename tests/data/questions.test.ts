import { describe, it, expect } from 'vitest';
import { SEVERITY_PENALTY } from '../../src/domain/scoring';
import { bestSpec } from '../../src/domain/class-scoring';
import { QUESTIONS } from '../../src/data/questions';
import { answersOf, pick, rated, gates } from '../support/fixtures';
import { recommend } from '../../src/app/recommendation';
import { checkConditions } from '../../src/data/questions/helpers';
import type { QuestionDef } from '../../src/data/display';
import { SPECS } from '../../src/data/specs';

/** Intentionally unrated options: picking them means "anything is fine" (see docs/DATA.md). */
const UNRATED_BY_DESIGN = ['leveling-style/quests'];

describe('Gates in the catalog', () => {
  it('the real gates map "no" to mute and "very" to boost', () => {
    for (const [gateId, chapter] of [
      ['pve-interest', 'pve'],
      ['pvp-interest', 'pvp'],
    ] as const) {
      const g = QUESTIONS.find((x) => x.id === gateId)!;
      expect(g.chapter).toBe(chapter);
      expect(g).toMatchObject({ kind: 'gate', gate: { mute: ['no'], boost: ['very'] } });
    }
  });

  it('gate questions in the catalog award no points themselves', () => {
    const gateQuestions = gates(QUESTIONS);
    expect(gateQuestions.map((q) => q.id).sort()).toEqual(['pve-interest', 'pvp-interest']);
    for (const g of gateQuestions) {
      for (const o of g.options) expect(o.effects, `${g.id}/${o.id}`).toEqual([]);
      const optionIds = g.options.map((o) => o.id);
      for (const id of [...g.gate.mute, ...g.gate.boost]) expect(optionIds, g.id).toContain(id);
      expect(
        g.gate.mute.filter((id) => g.gate.boost.includes(id)),
        g.id,
      ).toEqual([]);
      expect(
        gates(QUESTIONS).filter((x) => x.chapter === g.chapter),
        g.id,
      ).toHaveLength(1);
    }
  });
});

describe('Gate dependencies in the catalog', () => {
  const q = (id: string) => rated(QUESTIONS).find((x) => x.id === id)!;

  it('Dungeons & Raids: content and boss fight role depend on the gate', () => {
    expect(QUESTIONS.filter((x) => x.chapter === 'pve').map((x) => x.id)).toEqual([
      'pve-interest',
      'group-content',
      'boss-role',
      'dungeon-self-protection',
    ]);
    expect(q('group-content').options.map((o) => o.id)).toEqual(['dungeons', 'small-raid', 'large-raid']);
    expect(q('boss-role').options.map((o) => o.id)).toEqual(['dodge', 'adds', 'steady', 'save']);
    for (const id of ['group-content', 'boss-role']) {
      expect(q(id).mode, id).toBe('any');
      expect(q(id).multi, id).toBe(true);
    }
    const answers = answersOf({ 'group-content': pick('dungeons'), 'boss-role': pick('adds') });
    expect(recommend(answersOf({ ...answers, 'pve-interest': pick('no') })).ranking).toEqual(recommend({}).ranking);
    expect(recommend(answers).ranking).not.toEqual(recommend({}).ranking);
  });
});

describe('Effect of the options', () => {
  it('every option of a multiple-choice OR question outside the gates has an effect', () => {
    for (const x of rated(QUESTIONS).filter((x) => x.multi && x.mode === 'any')) {
      for (const o of x.options) {
        const id = `${x.id}/${o.id}`;
        if (UNRATED_BY_DESIGN.includes(id)) continue;
        expect(o.effects.length, id).toBeGreaterThan(0);
      }
    }
  });

  it('the listed exceptions exist and are unrated', () => {
    for (const id of UNRATED_BY_DESIGN) {
      const [qid, oid] = id.split('/');
      const o = QUESTIONS.find((x) => x.id === qid)?.options.find((x) => x.id === oid);
      expect(o, id).toBeDefined();
      expect(o!.effects, id).toEqual([]);
    }
  });
});

describe('Whom each deal-breaker hits', () => {
  const all = (cls: string) => SPECS.filter((s) => s.classId === cls).map((s) => s.id);
  const EXPECTED: Record<string, { severity: 'heavy' | 'light'; specs: string[] }> = {
    'no-selfheal': {
      severity: 'heavy',
      specs: [...all('warrior'), ...all('hunter'), ...all('rogue'), ...all('mage'), 'warlock-destruction'],
    },
    'no-escape': {
      severity: 'light',
      specs: ['paladin-holy', 'paladin-protection', ...all('priest'), 'warlock-demonology', 'warlock-destruction'],
    },
    deadzone: { severity: 'heavy', specs: ['hunter-beast-mastery', 'hunter-marksmanship'] },
    pet: {
      severity: 'heavy',
      specs: ['hunter-beast-mastery', 'hunter-survival', 'warlock-demonology'],
    },
    'no-kick': {
      severity: 'light',
      specs: [
        ...all('paladin'),
        ...all('hunter'),
        'priest-discipline',
        'priest-holy',
        'druid-balance',
        'druid-restoration',
      ],
    },
    'no-slow': { severity: 'light', specs: [...all('paladin'), 'priest-discipline', 'priest-holy', ...all('druid')] },
    'no-cc': { severity: 'light', specs: ['warrior-fury', 'shaman-enhancement', 'shaman-restoration'] },
    downtime: {
      severity: 'light',
      specs: ['mage-fire', 'mage-frost', 'druid-balance', 'shaman-elemental', 'shaman-restoration'],
    },
    reagents: { severity: 'light', specs: [...all('hunter'), ...all('warlock')] },
    gear: { severity: 'heavy', specs: ['warrior-fury', 'paladin-retribution', 'mage-fire'] },
    fragile: { severity: 'heavy', specs: ['mage-arcane', 'mage-fire'] },
    'no-group': { severity: 'light', specs: [...all('hunter'), 'priest-shadow'] },
    'weak-solo': { severity: 'heavy', specs: ['warrior-protection', 'shaman-restoration'] },
    totems: { severity: 'heavy', specs: all('shaman') },
    shapeshift: { severity: 'heavy', specs: ['druid-balance', 'druid-feral'] },
    'tab-tank': { severity: 'light', specs: ['druid-feral'] },
    'hybrid-tax': {
      severity: 'heavy',
      specs: [
        'warrior-arms',
        'warrior-fury',
        'paladin-retribution',
        'priest-shadow',
        'shaman-elemental',
        'shaman-enhancement',
        'druid-balance',
        'druid-feral',
      ],
    },
  };

  it('each deal-breaker hits exactly the defined specs with the defined severity', () => {
    const noGo = QUESTIONS.find((q) => q.id === 'deal-breakers')!;
    expect(noGo.options.map((o) => o.id).sort()).toEqual(Object.keys(EXPECTED).sort());
    for (const [optionId, { severity, specs }] of Object.entries(EXPECTED)) {
      const results = recommend(answersOf({ 'deal-breakers': pick(optionId) })).ranking.flatMap((c) => c.specs);
      expect(results.length, optionId).toBe(SPECS.length);
      const hit = results.filter((s) => s.penalties.length > 0);
      expect(hit.map((s) => s.specId).sort(), optionId).toEqual([...specs].sort());
      for (const s of hit)
        expect(
          s.penalties.map((p) => p.points),
          `${optionId}/${s.specId}`,
        ).toEqual([SEVERITY_PENALTY[severity]]);
    }
  });
});

describe('Group utility', () => {
  it('"Offer services" and "Buff the group" rate different traits and rank the classes differently', () => {
    const question = QUESTIONS.find((q) => q.id === 'utility-tasks')!;
    const traitsOf = (optionId: string) =>
      question.options.find((o) => o.id === optionId)!.effects.map((e) => (e.kind === 'pref' ? e.trait : e.kind));
    expect(traitsOf('services')).toEqual(['services']);
    expect(traitsOf('buffs')).toEqual(['raidUtility']);
    const order = (optionId: string) =>
      recommend(answersOf({ 'utility-tasks': pick(optionId) })).ranking.map((c) => c.classId);
    expect(order('services')).not.toEqual(order('buffs'));
  });
});

describe('Answer conditions in the catalog', () => {
  /** The catalog with the given conditions in place of the questions' own. */
  const withConditions = (conditions: Record<string, { question: string; options: string[] }>) =>
    QUESTIONS.map((q) => (q.id in conditions ? ({ ...q, appliesIf: conditions[q.id] } as QuestionDef) : q));

  it('the real catalog passes; a condition with an unknown question or option fails when the data loads', () => {
    expect(() => checkConditions(QUESTIONS)).not.toThrow();
    expect(() =>
      checkConditions(withConditions({ 'healing-style': { question: 'rol', options: ['healer'] } })),
    ).toThrow(/unknown question/);
    expect(() => checkConditions(withConditions({ 'healing-style': { question: 'role', options: ['heal'] } }))).toThrow(
      /healing-style, condition on role: unknown ID heal/,
    );
    expect(() => checkConditions(withConditions({ 'healing-style': { question: 'role', options: [] } }))).toThrow(
      /no option/,
    );
  });

  it('a condition on itself, on a conditional question or on a question in a chapter with a gate fails', () => {
    expect(() =>
      checkConditions(withConditions({ 'healing-style': { question: 'healing-style', options: ['group'] } })),
    ).toThrow(/healing-style itself has a condition/);
    // If role had a condition itself, its answers could rule the healing style out while not counting.
    expect(() => checkConditions(withConditions({ role: { question: 'distance', options: ['melee'] } }))).toThrow(
      /itself has a condition/,
    );
    // group-content sits in the PvE chapter, which its gate can switch off
    expect(() =>
      checkConditions(withConditions({ 'healing-style': { question: 'group-content', options: ['dungeons'] } })),
    ).toThrow(/chapter with a gate/);
  });
});

describe('Ruleset', () => {
  it('a PvP ruleset counts even with the PvP chapter switched off; the other rulesets change nothing', () => {
    const base = { 'pvp-interest': pick('no'), role: pick('melee') };
    const ranking = (extra: Record<string, ReturnType<typeof pick>>) =>
      recommend(answersOf({ ...base, ...extra })).ranking;
    for (const ruleset of ['normal', 'roleplay'])
      expect(ranking({ ruleset: pick(ruleset) }), ruleset).toEqual(ranking({}));
    for (const ruleset of ['pvp', 'roleplay-pvp'])
      expect(ranking({ ruleset: pick(ruleset) }), ruleset).not.toEqual(ranking({}));
  });
});

/** The spec traits an option's preferences rate. */
const specTraitsOf = (questionId: string, optionId: string): string[] =>
  QUESTIONS.find((q) => q.id === questionId)!
    .options.find((o) => o.id === optionId)!
    .effects.flatMap((e) => (e.kind === 'pref' && e.scope === 'spec' ? [e.trait] : []));

/** For each option on its own, the best-ranked spec has a value of at least 0.9 in the option's trait. */
function expectTopSpecEmbodiesEachOption(questionId: string) {
  for (const option of QUESTIONS.find((q) => q.id === questionId)!.options) {
    const [trait] = specTraitsOf(questionId, option.id);
    expect(trait, option.id).toBeDefined();
    const best = recommend(answersOf({ [questionId]: pick(option.id) }))
      .ranking.flatMap((c) => c.specs)
      .sort((a, b) => b.score - a.score)[0]!;
    const value = SPECS.find((s) => s.id === best.specId)!.traits[trait as keyof (typeof SPECS)[number]['traits']];
    expect(value, `${option.id} -> ${best.specId}`).toBeGreaterThanOrEqual(0.9);
  }
}

describe('Playing solo', () => {
  it('the solo playstyle and solo leveling rate different traits', () => {
    const playstyle = specTraitsOf('social', 'solo');
    const leveling = specTraitsOf('leveling-speed', 'very');
    expect(playstyle.length).toBeGreaterThan(0);
    expect(leveling.length).toBeGreaterThan(0);
    expect(playstyle.filter((t) => leveling.includes(t))).toEqual([]);
  });
});

describe('Power themes', () => {
  it('each power theme leads to a spec that embodies it', () => {
    expectTopSpecEmbodiesEachOption('power-theme');
  });
});

describe('Weapon style', () => {
  it('each weapon trait has exactly one option of its own', () => {
    const question = QUESTIONS.find((q) => q.id === 'weapon-style')!;
    const traits = question.options.flatMap((o) => specTraitsOf(question.id, o.id));
    const weaponTraits = Object.keys(SPECS[0]!.traits).filter((t) => t.startsWith('weapon'));
    expect([...traits].sort()).toEqual([...weaponTraits].sort());
  });

  it('each weapon style leads to specs that fight that way', () => {
    expectTopSpecEmbodiesEachOption('weapon-style');
  });
});

describe('Separating the healers', () => {
  const healers = SPECS.filter((s) => s.traits.roleHealer === 1);
  /** Spec scores for each single picked option of the given questions. */
  const scoresPerOption = (questions: typeof QUESTIONS) =>
    rated(questions).flatMap((q) =>
      q.options.map(
        (o) =>
          new Map(
            recommend(answersOf({ [q.id]: pick(o.id) }))
              .ranking.flatMap((c) => c.specs)
              .map((s) => [s.specId as string, s.score]),
          ),
      ),
    );
  const isAheadSomewhere = (scores: Map<string, number>[], a: string, b: string) =>
    scores.some((s) => s.get(a)! > s.get(b)!);

  it('no healer spec is dominated: for every two healers, some option of the catalog puts each ahead', () => {
    expect(healers.length).toBeGreaterThanOrEqual(2);
    const scores = scoresPerOption(QUESTIONS);
    for (const a of healers)
      for (const b of healers)
        if (a !== b) expect(isAheadSomewhere(scores, a.id, b.id), `${a.id} is never ahead of ${b.id}`).toBe(true);
  });

  it('the healing style counts only for players who do not rule out healing in the role question', () => {
    const ranking = (answers: Record<string, ReturnType<typeof pick>>) => recommend(answersOf(answers)).ranking;
    expect(ranking({ role: pick('melee'), 'healing-style': pick('group') })).toEqual(ranking({ role: pick('melee') }));
    expect(ranking({ role: pick('healer'), 'healing-style': pick('group') })).not.toEqual(
      ranking({ role: pick('healer') }),
    );
  });

  it('the healing style alone separates two healer specs of the same class in both directions', () => {
    const healingStyle = QUESTIONS.filter((q) => q.id === 'healing-style');
    expect(healingStyle).toHaveLength(1);
    const scores = scoresPerOption(healingStyle);
    const siblings = healers.flatMap((a) =>
      healers.filter((b) => b !== a && b.classId === a.classId).map((b) => [a, b]),
    );
    expect(siblings.length).toBeGreaterThan(0);
    for (const [a, b] of siblings)
      expect(isAheadSomewhere(scores, a!.id, b!.id), `${a!.id} is never ahead of ${b!.id}`).toBe(true);
  });
});

describe('Richness of the catalog', () => {
  it('there are answer sets with more than three pros, so the "more" display is needed', () => {
    const answers = Object.fromEntries(rated(QUESTIONS).map((q) => [q.id, pick(q.options[0]!.id)]));
    expect(recommend(answers).ranking.some((c) => bestSpec(c).matches.length > 3)).toBe(true);
  });
});
