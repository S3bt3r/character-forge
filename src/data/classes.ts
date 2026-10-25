import type { ClassDef } from './display';
import type { ClassKey } from './ids';
import { CLASS_TEXTS as DE } from '../i18n/de/entities/classes';
import { localize } from './localize';
import { classId } from '../domain/ids';

type ClassBase = Omit<ClassDef, 'id' | 'name' | 'resources' | 'summary'> &
  Record<'name' | 'resources' | 'summary', string>;

/** Blizzard's in-game class colors (not from the Forever sources). */
const CLASS_BASES = [
  {
    id: 'warrior',
    name: 'Warrior',
    resources: 'Rage',
    summary:
      'A master of melee who deals damage to several enemies side by side (cleave) and a sought-after tank. Little self-healing and heavily dependent on gear, but brings unique buffs and debuffs.',
    color: '#C69B6D',
  },
  {
    id: 'paladin',
    name: 'Paladin',
    resources: 'Mana',
    summary:
      'A sturdy plate wearer with healing, Blessings (buffs) and a brief invulnerability. Has no interrupt and cannot slow enemies. New: Forsaken Paladins (Horde).',
    color: '#F48CBA',
  },
  {
    id: 'hunter',
    name: 'Hunter',
    resources: 'Mana',
    summary:
      'Has the longest range of any class, and the pet can tank when playing solo. Has no stun and no interrupt. Ranged attacks cannot be used within 8 yards; only the Survival specialization fights in melee.',
    color: '#AAD372',
  },
  {
    id: 'rogue',
    name: 'Rogue',
    resources: 'Energy & combo points',
    summary:
      'Can deal the highest melee damage to a single target, since as a pure damage class it gives up no damage for other roles. No self-healing and few group buffs, but its stealth and lots of control make it welcome in any group.',
    color: '#FFF468',
  },
  {
    id: 'priest',
    name: 'Priest',
    resources: 'Mana',
    summary:
      'The most versatile healer (heals over time, direct heals, shields) or a shadow damage dealer who heals themselves. Wears cloth armor and has few ways to escape.',
    color: '#FFFFFF',
  },
  {
    id: 'shaman',
    name: 'Shaman',
    resources: 'Mana',
    summary:
      'Places totems (objects that affect the area around them) with raid-wide buffs; heals or deals damage with spells that jump from target to target. Hardly any CC. New: Dwarf Shamans (Alliance).',
    color: '#0070DD',
  },
  {
    id: 'mage',
    name: 'Mage',
    resources: 'Mana',
    summary:
      'A master of area damage (AoE) from range with strong control; also provides food, water and portals for the group. Extremely fragile once enemies reach melee range. Frost brings the most control. New: Orc Mages (Horde).',
    color: '#3FC7EB',
  },
  {
    id: 'warlock',
    name: 'Warlock',
    resources: 'Mana & Soul Shards',
    summary:
      "Fights with curses, life drain and demons as pets. Can bring other players to their location (summon), which is especially valuable because the Meeting Stones at dungeons don't work in Forever. Has to collect Soul Shards (a resource from defeated enemies).",
    color: '#8788EE',
  },
  {
    id: 'druid',
    name: 'Druid',
    resources: 'Mana, Rage (bear), Energy (cat)',
    summary:
      'Can fill all four roles. Cannot interrupt or silence and has no slow; as a healer relies on heals over time (HoTs).',
    color: '#FF7C0A',
  },
] satisfies (ClassBase & { id: ClassKey })[];

/** English name, resources and description sit in the base list above; the German texts live in `src/i18n/de/entities/classes.ts`. */
export const CLASSES: ClassDef[] = CLASS_BASES.map((c) => ({
  ...c,
  id: classId(c.id),
  ...localize(c, DE[c.id], ['name', 'resources', 'summary']),
}));
