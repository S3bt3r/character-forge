/**
 * The keys of classes, specializations and races as the data writes them; the builders turn them into the branded
 * domain IDs (`src/domain/ids.ts`). The data files check their entries against these keys
 * so that typos in evidence entries, combinations and synergies show up at compile time.
 * The compiler also rejects an ID that is listed here but missing from the evidence tables, the combination
 * matrix or the German texts, or the other way round.
 */
const CLASS_KEYS = ['warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid'] as const;
export type ClassKey = (typeof CLASS_KEYS)[number];

const SPEC_KEYS = {
  warrior: ['warrior-arms', 'warrior-fury', 'warrior-protection'],
  paladin: ['paladin-holy', 'paladin-protection', 'paladin-retribution'],
  hunter: ['hunter-beast-mastery', 'hunter-marksmanship', 'hunter-survival'],
  rogue: ['rogue-assassination', 'rogue-combat', 'rogue-subtlety'],
  priest: ['priest-discipline', 'priest-holy', 'priest-shadow'],
  shaman: ['shaman-elemental', 'shaman-enhancement', 'shaman-restoration'],
  mage: ['mage-arcane', 'mage-fire', 'mage-frost'],
  warlock: ['warlock-affliction', 'warlock-demonology', 'warlock-destruction'],
  druid: ['druid-balance', 'druid-feral', 'druid-restoration'],
} as const satisfies Record<ClassKey, readonly string[]>;
/** Specializations of a class. */
export type SpecKeyOf<C extends ClassKey> = (typeof SPEC_KEYS)[C][number];
export type SpecKey = SpecKeyOf<ClassKey>;

const RACE_KEYS = [
  'orc',
  'undead',
  'tauren',
  'troll',
  'skyborne-horde',
  'human',
  'dwarf',
  'gnome',
  'night-elf',
  'skyborne-alliance',
] as const;
export type RaceKey = (typeof RACE_KEYS)[number];
