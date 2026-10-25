import { describe, it, expect } from 'vitest';
import { CLASSES } from '../../src/data/classes';
import { SPECS } from '../../src/data/specs';
import { RACES } from '../../src/data/races';
import { COMBOS } from '../../src/data/combos';
import { SOURCES } from '../../src/data/sources';
import { SPEC_TRAITS, RACE_TRAITS } from '../../src/data/traits';
import { QUESTIONS } from '../../src/data/questions';
import { PROFESSIONS, PROFESSION_TRAITS } from '../../src/data/professions';
import { LEGACY_PERKS, LEGACY_TRAITS } from '../../src/data/legacy';
import { CLASS_SPECS } from '../../src/data/specs';
import type { Evidence } from '../../src/data/display';
import type { Effect } from '../../src/domain/questions';

const PROVENANCES = ['confirmed', 'classic', 'unconfirmed', 'estimate', 'community'];

const inUnit = (v: number) => Number.isFinite(v) && v >= 0 && v <= 1;

function allEvidence(): Evidence[] {
  return [
    ...SPECS.flatMap((s) => Object.values(s.evidence ?? {})),
    ...RACES.flatMap((r) => Object.values(r.evidence ?? {})),
    ...COMBOS.map((c) => c.evidence),
    ...PROFESSIONS.flatMap((p) => Object.values(p.evidence ?? {})),
    ...LEGACY_PERKS.map((p) => p.evidence),
  ].filter((e): e is Evidence => e !== undefined);
}

function allEffects(): { questionId: string; effect: Effect }[] {
  return QUESTIONS.flatMap((q) => q.options.flatMap((o) => o.effects.map((effect) => ({ questionId: q.id, effect }))));
}

describe('Data foundation', () => {
  it('every spec/race/profession has a value in [0, 1] for every trait', () => {
    for (const spec of SPECS) {
      expect(Object.keys(spec.traits).sort(), spec.id).toEqual(Object.keys(SPEC_TRAITS).sort());
      for (const [trait, v] of Object.entries(spec.traits)) expect(inUnit(v), `${spec.id}.${trait}=${v}`).toBe(true);
    }
    for (const race of RACES) {
      expect(Object.keys(race.traits).sort(), race.id).toEqual(Object.keys(RACE_TRAITS).sort());
      for (const [trait, v] of Object.entries(race.traits)) expect(inUnit(v), `${race.id}.${trait}=${v}`).toBe(true);
    }
    for (const prof of PROFESSIONS) {
      expect(Object.keys(prof.traits).sort(), prof.id).toEqual(Object.keys(PROFESSION_TRAITS).sort());
      for (const [trait, v] of Object.entries(prof.traits)) expect(inUnit(v), `${prof.id}.${trait}=${v}`).toBe(true);
    }
    expect(LEGACY_PERKS.length).toBeGreaterThan(0);
    for (const perk of LEGACY_PERKS) {
      expect(Object.keys(perk.traits).sort(), perk.id).toEqual(Object.keys(LEGACY_TRAITS).sort());
      for (const [trait, v] of Object.entries(perk.traits)) expect(inUnit(v), `${perk.id}.${trait}=${v}`).toBe(true);
    }
  });

  it('question effects reference existing traits, IDs are unique', () => {
    const questionIds = QUESTIONS.map((q) => q.id);
    expect(new Set(questionIds).size).toBe(questionIds.length);
    for (const q of QUESTIONS) {
      if (q.kind === 'rated') {
        expect(['any', 'all'], q.id).toContain(q.mode);
        expect(['pillar', 'core', 'dynamic', 'fine'], q.id).toContain(q.tier);
        expect(typeof q.multi, q.id).toBe('boolean');
      }
      const optionIds = q.options.map((o) => o.id);
      expect(new Set(optionIds).size, q.id).toBe(optionIds.length);
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(2);
    }
    for (const { questionId, effect } of allEffects()) {
      const where = `${questionId}: ${JSON.stringify(effect)}`;
      switch (effect.kind) {
        case 'pref': {
          const catalog = {
            spec: SPEC_TRAITS,
            race: { ...RACE_TRAITS, newCombo: true },
            profession: PROFESSION_TRAITS,
            legacy: LEGACY_TRAITS,
          }[effect.scope];
          expect(effect.trait in catalog, where).toBe(true);
          expect(inUnit(effect.target), where).toBe(true);
          expect(effect.weight, where).toBeGreaterThan(0);
          break;
        }
        case 'dealbreaker': {
          const catalog = effect.scope === 'spec' ? SPEC_TRAITS : RACE_TRAITS;
          expect(effect.trait in catalog, where).toBe(true);
          expect(inUnit(effect.threshold), where).toBe(true);
          expect(['heavy', 'light'], where).toContain(effect.severity);
          break;
        }
        case 'faction':
          expect(['alliance', 'horde']).toContain(effect.faction);
          break;
      }
    }
  });

  it('combinations, factions, specs and class colors are consistent', () => {
    const classIds = new Set(CLASSES.map((c) => c.id));
    const racesById = new Map(RACES.map((r) => [r.id, r]));
    for (const c of COMBOS) {
      expect(classIds.has(c.classId), c.classId).toBe(true);
      expect(racesById.has(c.raceId), c.raceId).toBe(true);
    }
    const keys = COMBOS.map((c) => `${c.raceId}/${c.classId}`);
    expect(new Set(keys).size).toBe(keys.length);

    for (const classId of classIds) {
      const factions = new Set(
        COMBOS.filter((c) => c.classId === classId).map((c) => racesById.get(c.raceId)!.faction),
      );
      expect([...factions].sort(), classId).toEqual(['alliance', 'horde']);
      expect(
        SPECS.filter((s) => s.classId === classId),
        classId,
      ).toHaveLength(3);
    }
    const skybornePriests = COMBOS.filter((c) => c.raceId.startsWith('skyborne') && c.classId === 'priest');
    expect(skybornePriests).toHaveLength(0);
    // Combinations new in Forever according to Blizzard (deep-dive-panel/hero) plus all Skyborne.
    const expectedNew = ['gnome/priest', 'human/hunter', 'dwarf/shaman', 'orc/mage', 'troll/warlock', 'undead/paladin'];
    const isNew = COMBOS.filter((c) => c.isNew).map((c) => `${c.raceId}/${c.classId}`);
    expect(isNew.filter((k) => !k.startsWith('skyborne')).sort()).toEqual([...expectedNew].sort());
    for (const c of COMBOS.filter((c) => c.raceId.startsWith('skyborne'))) expect(c.isNew, c.classId).toBe(true);
    for (const c of CLASSES) expect(c.color, c.id).toMatch(/^#[0-9a-f]{6}$/i);
    for (const s of SPECS) expect(classIds.has(s.classId), s.id).toBe(true);
  });

  it('evidence refers to existing sources with a valid provenance', () => {
    const evidence = allEvidence();
    expect(evidence.length).toBeGreaterThan(0);
    for (const e of evidence) {
      expect(PROVENANCES).toContain(e.provenance);
      for (const src of e.sources ?? []) expect(src in SOURCES, src).toBe(true);
      if (e.provenance !== 'estimate') expect(e.sources?.length ?? 0, JSON.stringify(e)).toBeGreaterThan(0);
      // Specs, races, professions, combinations and perks alike: a community entry names the guide it comes from.
      if (e.provenance === 'community')
        expect(
          (e.sources ?? []).some((id) => id.startsWith('wowhead-guide-')),
          JSON.stringify(e),
        ).toBe(true);
      // A community guide alone is no Forever source (docs/DATA.md), wherever the entry stands.
      if (e.provenance === 'confirmed' || e.provenance === 'unconfirmed')
        expect(
          (e.sources ?? []).some((id) => id !== 'classic' && !id.startsWith('wowhead-guide-')),
          JSON.stringify(e),
        ).toBe(true);
    }
  });
});

describe('Provenance per specialization and trait', () => {
  // Preferences and deal-breakers: both rate traits of a spec and show their provenance.
  const usedSpecTraits = [
    ...new Set(
      allEffects().flatMap(({ effect }) =>
        (effect.kind === 'pref' || effect.kind === 'dealbreaker') && effect.scope === 'spec' ? [effect.trait] : [],
      ),
    ),
  ];

  it('every used combination of spec and trait has an explicit entry', () => {
    const missing = SPECS.flatMap((s) =>
      usedSpecTraits
        .filter((t) => !(s.evidence as Record<string, Evidence> | undefined)?.[t])
        .map((t) => `${s.id}/${t}`),
    );
    expect(missing, missing.slice(0, 20).join(', ')).toEqual([]);
  });

  // The source rules for every provenance hold for all evidence (see "evidence refers to existing sources"); these are the spec-only ones.
  it('every spec entry except a bare Classic or estimate one has a German note, Classic names its source, and a spec cites only guides of its own class', () => {
    for (const s of SPECS) {
      for (const [trait, e] of Object.entries((s.evidence ?? {}) as Record<string, Evidence>)) {
        const where = `${s.id}/${trait}`;
        // "from Classic" or "estimate" without details needs no note, the icon says it.
        if (e.note) expect(e.note.de?.trim().length ?? 0, where).toBeGreaterThan(0);
        else expect(['classic', 'estimate'], where).toContain(e.provenance);
        if (e.provenance === 'classic') expect(e.sources, where).toContain('classic');
        for (const id of e.sources ?? [])
          if (id.startsWith('wowhead-guide-')) expect(id, where).toMatch(new RegExp(`^wowhead-guide-${s.classId}-`));
      }
    }
  });
});

describe('Timestamps on podcast sources', () => {
  // Podcast sources are the ones whose address is a video.
  const PODCASTS = new Set(
    Object.entries(SOURCES)
      .filter(([, s]) => Object.values(s.url ?? {}).some((u) => u.includes('youtube.com')))
      .map(([id]) => id),
  );
  const withEvidence = [...SPECS, ...RACES, ...PROFESSIONS] as {
    id: string;
    evidence?: Partial<Record<string, Evidence>>;
  }[];
  const entries = withEvidence.flatMap((x) =>
    Object.entries(x.evidence ?? {}).flatMap(([trait, e]) => (e ? [{ where: `${x.id}/${trait}`, e }] : [])),
  );

  it('every timestamp belongs to a podcast source of the entry and has the form m:ss or h:mm:ss', () => {
    let count = 0;
    for (const { where, e } of entries) {
      for (const [id, at] of Object.entries(e.at ?? {})) {
        count++;
        expect(e.sources ?? [], where).toContain(id);
        expect(PODCASTS.has(id), `${where}: ${id}`).toBe(true);
        expect(at, where).toMatch(/^(?:\d+:[0-5]\d|[0-5]?\d):[0-5]\d$/);
      }
    }
    expect(count).toBeGreaterThan(0);
  });

  it('every entry (spec, race, profession) with a podcast source carries a timestamp for it', () => {
    const missing = entries.flatMap(({ where, e }) =>
      (e.sources ?? []).filter((id) => PODCASTS.has(id) && !e.at?.[id]).map((id) => `${where} ${id}`),
    );
    expect(missing, missing.slice(0, 20).join(', ')).toEqual([]);
  });
});

describe('Spec pairs per class', () => {
  type Pairs = Record<string, { value?: number; values?: Record<string, number> }>;
  const classes = Object.entries(
    CLASS_SPECS as Record<string, { traits: Pairs; specs: Record<string, { traits: Pairs }> }>,
  );

  it('a graded entry lists exactly the specs that inherit it', () => {
    for (const [cls, data] of classes) {
      for (const [trait, pair] of Object.entries(data.traits)) {
        if (!pair.values) continue;
        const heirs = Object.keys(data.specs).filter((spec) => !data.specs[spec]!.traits[trait]);
        expect(Object.keys(pair.values).sort(), `${cls}/${trait}`).toEqual(heirs.sort());
      }
    }
  });

  it('a graded entry justifies different values, so one value belongs in a plain pair', () => {
    const flat = classes.flatMap(([cls, data]) =>
      Object.entries(data.traits).flatMap(([trait, pair]) =>
        pair.values && new Set(Object.values(pair.values)).size < 2 ? [`${cls}/${trait}`] : [],
      ),
    );
    expect(flat).toEqual([]);
  });

  it('every spec value has exactly one evidence: its own pair or the class pair', () => {
    for (const spec of SPECS)
      expect(Object.keys(spec.evidence ?? {}).sort(), spec.id).toEqual(Object.keys(SPEC_TRAITS).sort());
  });
});
