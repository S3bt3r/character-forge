import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { EvidenceView } from '../../../data/rated';
import type { WARRIOR_SPECS } from '../../../data/specs/warrior';
import type { PALADIN_SPECS } from '../../../data/specs/paladin';
import type { HUNTER_SPECS } from '../../../data/specs/hunter';
import type { ROGUE_SPECS } from '../../../data/specs/rogue';
import type { PRIEST_SPECS } from '../../../data/specs/priest';
import type { SHAMAN_SPECS } from '../../../data/specs/shaman';
import type { MAGE_SPECS } from '../../../data/specs/mage';
import type { WARLOCK_SPECS } from '../../../data/specs/warlock';
import type { DRUID_SPECS } from '../../../data/specs/druid';
import { WARRIOR_NOTES as warrior } from './warrior';
import { PALADIN_NOTES as paladin } from './paladin';
import { HUNTER_NOTES as hunter } from './hunter';
import { ROGUE_NOTES as rogue } from './rogue';
import { PRIEST_NOTES as priest } from './priest';
import { SHAMAN_NOTES as shaman } from './shaman';
import { MAGE_NOTES as mage } from './mage';
import { WARLOCK_NOTES as warlock } from './warlock';
import { DRUID_NOTES as druid } from './druid';

/** Each class's notes against that class's evidence, so the notes of one class cannot be wired to another. */
type NotesPerClass = {
  warrior: GermanClassNotes<EvidenceView<typeof WARRIOR_SPECS>>;
  paladin: GermanClassNotes<EvidenceView<typeof PALADIN_SPECS>>;
  hunter: GermanClassNotes<EvidenceView<typeof HUNTER_SPECS>>;
  rogue: GermanClassNotes<EvidenceView<typeof ROGUE_SPECS>>;
  priest: GermanClassNotes<EvidenceView<typeof PRIEST_SPECS>>;
  shaman: GermanClassNotes<EvidenceView<typeof SHAMAN_SPECS>>;
  mage: GermanClassNotes<EvidenceView<typeof MAGE_SPECS>>;
  warlock: GermanClassNotes<EvidenceView<typeof WARLOCK_SPECS>>;
  druid: GermanClassNotes<EvidenceView<typeof DRUID_SPECS>>;
};

/** Provenance notes per class, structured like `src/data/specs/`. */
export const DE_CLASS_NOTES = {
  warrior,
  paladin,
  hunter,
  rogue,
  priest,
  shaman,
  mage,
  warlock,
  druid,
} satisfies NotesPerClass;
