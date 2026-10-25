import type { SpecDef } from '../display';
import { DE_CLASS_NOTES } from '../../i18n/de/evidence';
import { SPEC_TEXTS } from '../../i18n/de/entities/specs';
import type { ClassKey } from '../ids';
import type { ClassSpecs, CompleteClassSpecs } from '../rated';
import { SPEC_TRAITS, type SpecTraitId } from '../traits';
import { buildSpecs } from './build';
import { DRUID_SPECS } from './druid';
import { HUNTER_SPECS } from './hunter';
import { MAGE_SPECS } from './mage';
import { PALADIN_SPECS } from './paladin';
import { PRIEST_SPECS } from './priest';
import { ROGUE_SPECS } from './rogue';
import { SHAMAN_SPECS } from './shaman';
import { WARLOCK_SPECS } from './warlock';
import { WARRIOR_SPECS } from './warrior';

/** Class data as written in the class files; a spec without a value for some trait fails to compile here. */
const COMPLETE_CLASS_SPECS: {
  warrior: CompleteClassSpecs<'warrior', typeof WARRIOR_SPECS>;
  paladin: CompleteClassSpecs<'paladin', typeof PALADIN_SPECS>;
  hunter: CompleteClassSpecs<'hunter', typeof HUNTER_SPECS>;
  rogue: CompleteClassSpecs<'rogue', typeof ROGUE_SPECS>;
  priest: CompleteClassSpecs<'priest', typeof PRIEST_SPECS>;
  shaman: CompleteClassSpecs<'shaman', typeof SHAMAN_SPECS>;
  mage: CompleteClassSpecs<'mage', typeof MAGE_SPECS>;
  warlock: CompleteClassSpecs<'warlock', typeof WARLOCK_SPECS>;
  druid: CompleteClassSpecs<'druid', typeof DRUID_SPECS>;
} = {
  warrior: WARRIOR_SPECS,
  paladin: PALADIN_SPECS,
  hunter: HUNTER_SPECS,
  rogue: ROGUE_SPECS,
  priest: PRIEST_SPECS,
  shaman: SHAMAN_SPECS,
  mage: MAGE_SPECS,
  warlock: WARLOCK_SPECS,
  druid: DRUID_SPECS,
};

/** Values and evidence per class, in class order; the German notes bind to them (`src/i18n/de/evidence`). */
export const CLASS_SPECS: { [C in ClassKey]: ClassSpecs<C> } = COMPLETE_CLASS_SPECS;

const TRAITS = Object.keys(SPEC_TRAITS) as SpecTraitId[];

const specsOf = <C extends ClassKey>(cls: C) =>
  buildSpecs(cls, CLASS_SPECS[cls], TRAITS, { notes: DE_CLASS_NOTES[cls], names: SPEC_TEXTS });

export const SPECS: SpecDef<SpecTraitId>[] = (Object.keys(CLASS_SPECS) as ClassKey[]).flatMap(specsOf);
