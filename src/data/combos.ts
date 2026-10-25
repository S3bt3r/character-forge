import type { ComboDef } from './display';
import type { DataEvidence } from './evidence/helpers';
import { SHARED_EVIDENCE } from './evidence/shared';
import type { ClassKey, RaceKey } from './ids';
import { classId, raceId } from '../domain/ids';

/*
 * Race×class matrix as listed in the race and class tables of the article "Create the Hero You Want to Be".
 * The article also names the new Forever combinations; the Skyborne combinations come from their own article.
 */

const CLASSIC_COMBO = SHARED_EVIDENCE.classicCombo;
const NEW_COMBO = SHARED_EVIDENCE.newCombo;
const SKYBORNE_COMBO: DataEvidence = { provenance: 'confirmed', sources: ['skyborne'] };

const MATRIX: Record<RaceKey, { classic: ClassKey[]; new?: ClassKey[]; skyborne?: ClassKey[] }> = {
  orc: { classic: ['hunter', 'rogue', 'shaman', 'warlock', 'warrior'], new: ['mage'] },
  tauren: { classic: ['druid', 'hunter', 'shaman', 'warrior'] },
  troll: { classic: ['hunter', 'mage', 'priest', 'rogue', 'shaman', 'warrior'], new: ['warlock'] },
  undead: { classic: ['mage', 'priest', 'rogue', 'warlock', 'warrior'], new: ['paladin'] },
  'skyborne-horde': { classic: [], skyborne: ['druid', 'hunter', 'rogue', 'shaman', 'warrior'] },
  dwarf: { classic: ['hunter', 'paladin', 'priest', 'rogue', 'warrior'], new: ['shaman'] },
  gnome: { classic: ['mage', 'rogue', 'warlock', 'warrior'], new: ['priest'] },
  human: { classic: ['mage', 'paladin', 'priest', 'rogue', 'warlock', 'warrior'], new: ['hunter'] },
  'night-elf': { classic: ['druid', 'hunter', 'priest', 'rogue', 'warrior'] },
  'skyborne-alliance': { classic: [], skyborne: ['druid', 'hunter', 'mage', 'rogue', 'warrior'] },
};

const combo = (race: RaceKey, cls: ClassKey, isNew: boolean, evidence: DataEvidence): ComboDef => ({
  raceId: raceId(race),
  classId: classId(cls),
  isNew,
  evidence,
});

export const COMBOS: ComboDef[] = (Object.entries(MATRIX) as [RaceKey, (typeof MATRIX)[RaceKey]][]).flatMap(
  ([race, m]) => [
    ...m.classic.map((cls) => combo(race, cls, false, CLASSIC_COMBO)),
    ...(m.new ?? []).map((cls) => combo(race, cls, true, NEW_COMBO)),
    ...(m.skyborne ?? []).map((cls) => combo(race, cls, true, SKYBORNE_COMBO)),
  ],
);
