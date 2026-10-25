import type { SpecKey } from '../../../data/ids';

/** Name per specialization. */
export const SPEC_TEXTS = {
  'warrior-arms': {
    name: 'Waffen',
  },
  'warrior-fury': {
    name: 'Furor',
  },
  'warrior-protection': {
    name: 'Schutz',
  },
  'paladin-holy': {
    name: 'Heilig',
  },
  'paladin-protection': {
    name: 'Schutz',
  },
  'paladin-retribution': {
    name: 'Vergeltung',
  },
  'hunter-beast-mastery': {
    name: 'Tierherrschaft',
  },
  'hunter-marksmanship': {
    name: 'Treffsicherheit',
  },
  'hunter-survival': {
    name: 'Überleben',
  },
  'rogue-assassination': {
    name: 'Meucheln',
  },
  'rogue-combat': {
    name: 'Kampf',
  },
  'rogue-subtlety': {
    name: 'Täuschung',
  },
  'priest-discipline': {
    name: 'Disziplin',
  },
  'priest-holy': {
    name: 'Heilig',
  },
  'priest-shadow': {
    name: 'Schatten',
  },
  'shaman-elemental': {
    name: 'Elementar',
  },
  'shaman-enhancement': {
    name: 'Verstärkung',
  },
  'shaman-restoration': {
    name: 'Wiederherstellung',
  },
  'mage-arcane': {
    name: 'Arkan',
  },
  'mage-fire': {
    name: 'Feuer',
  },
  'mage-frost': {
    name: 'Frost',
  },
  'warlock-affliction': {
    name: 'Gebrechen',
  },
  'warlock-demonology': {
    name: 'Dämonologie',
  },
  'warlock-destruction': {
    name: 'Zerstörung',
  },
  'druid-balance': {
    name: 'Gleichgewicht',
  },
  'druid-feral': {
    name: 'Wildheit',
  },
  'druid-restoration': {
    name: 'Wiederherstellung',
  },
} satisfies Record<SpecKey, { name: string }>;
