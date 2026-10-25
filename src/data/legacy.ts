import { traitProfile } from '../domain/catalog';
import type { LegacyPerkDef } from './display';
import type { DataEvidence } from './evidence/helpers';
import type { ClassKey } from './ids';
import { TRAIT_TEXTS as DE_TRAITS } from '../i18n/de/entities/traits';
import { PERK_TEXTS as DE } from '../i18n/de/entities/legacy';
import { localize, traitCatalog, type TraitTexts } from './localize';
import { classId, perkId } from '../domain/ids';

const LEGACY_TRAIT_TEXTS = {
  leveling: { label: 'Faster leveling', scale: '0 = unrelated, 1 = speeds up leveling a lot' },
  crafting: { label: 'Leveling professions', scale: '0 = unrelated, 1 = core of the perk' },
  gold: { label: 'Saving/earning gold', scale: '0 = unrelated, 1 = core of the perk' },
  pvp: { label: 'PvP', scale: '0 = unrelated, 1 = core of the perk' },
  group: { label: 'Group & raid', scale: '0 = unrelated, 1 = core of the perk' },
  convenience: { label: 'Comfort & travel', scale: '0 = unrelated, 1 = core of the perk' },
  reputation: { label: 'Reputation', scale: '0 = unrelated, 1 = core of the perk' },
  campsite: { label: 'Campsite', scale: '0 = unrelated, 1 = core of the perk' },
} satisfies Record<string, TraitTexts>;

export type LegacyTraitId = keyof typeof LEGACY_TRAIT_TEXTS;
export const LEGACY_TRAITS = traitCatalog(LEGACY_TRAIT_TEXTS, DE_TRAITS.legacy);
type Perk = LegacyPerkDef<LegacyTraitId>;

/** Perk names and effects from the Blizzard article on the Legacy system; it doesn't give point costs. */
const LEGACY_SOURCE: DataEvidence = { provenance: 'confirmed', sources: ['legacy'] };
/**
 * Perks whose effect the Development Notes state more precisely: Bartering gives no discount on training and repairs,
 * The Quick and the Dead affects more Priest spells.
 */
const LEGACY_DN_SOURCE: DataEvidence = { provenance: 'confirmed', sources: ['legacy', 'dn'] };
const NO_TRAITS = { leveling: 0, crafting: 0, gold: 0, pvp: 0, group: 0, convenience: 0, reputation: 0, campsite: 0 };

/** Classes with purchasable class reagents (Classic experience, not confirmed in detail for Forever). */
const REAGENT_CLASSES: ClassKey[] = ['mage', 'priest', 'rogue', 'shaman', 'druid', 'paladin'];
/** Classes without real healing spells that depend on bandages (Warriors only have small combat heals like Victory Rush; Warlocks heal themselves via drain). */
const NO_HEAL_CLASSES: ClassKey[] = ['warrior', 'rogue', 'hunter', 'mage'];

/** Perk with English name and English effect; the translation lives in `src/i18n/de/entities/legacy.ts`. */
const perk = <const Id extends string>(
  id: Id,
  texts: { name: string; summary: string },
  tree: Perk['tree'],
  traits: Partial<Record<LegacyTraitId, number>>,
  classSynergy?: ClassKey[],
  evidence: DataEvidence = LEGACY_SOURCE,
) => ({
  id,
  ...texts,
  tree,
  traits: { ...NO_TRAITS, ...traits },
  ...(classSynergy ? { classSynergy } : {}),
  evidence,
});

const LEGACY_PERK_DRAFTS = [
  // Professions
  perk(
    'overtime',
    {
      name: 'Working Overtime',
      summary:
        'Higher chance to gain a skill point in all professions, including class-specific ones like Lockpicking.',
    },
    'professions',
    { crafting: 1 },
  ),
  perk(
    'bountiful-harvest',
    {
      name: 'Bountiful Harvest',
      summary: 'Chance for extra scarce resources from Mining, Herbalism and Skinning.',
    },
    'professions',
    { crafting: 0.6, gold: 0.65 },
  ),
  perk(
    'bartering',
    {
      name: 'Bartering',
      summary: 'Lowers the gold price of items bought from vendors (not training or repairs).',
    },
    'professions',
    { crafting: 0.2, gold: 1 },
    undefined,
    LEGACY_DN_SOURCE,
  ),
  perk(
    'performance-bonus',
    {
      name: 'Performance Bonus',
      summary:
        "Sometimes gives extra Merchant's Favor with the profession factions Azeroth Commerce Authority (Alliance) and Durotar Supply and Logistics (Horde).",
    },
    'professions',
    { crafting: 0.65, gold: 0.15, reputation: 0.4 },
  ),
  perk(
    'master-chef',
    {
      name: 'Master Chef',
      summary: 'Chance for extra results when cooking.',
    },
    'professions',
    { crafting: 0.5, gold: 0.35, group: 0.3 },
  ),
  perk(
    'luremaster',
    {
      name: 'Luremaster',
      summary: 'Chance for extra fish when fishing.',
    },
    'professions',
    { crafting: 0.5, gold: 0.3 },
  ),
  perk(
    'dedicated-study',
    {
      name: 'Dedicated Study',
      summary:
        'Once a day, a boost that raises your profession skill faster; once all professions are at 300, it gives Elemental Essences instead.',
    },
    'professions',
    { crafting: 0.9, gold: 0.3 },
  ),
  // Adventure
  perk(
    'well-rested',
    {
      name: 'Well Rested',
      summary: 'Rested experience builds up faster and to a higher cap.',
    },
    'adventure',
    { leveling: 1 },
  ),
  perk(
    'thrill',
    {
      name: 'Thrill of Adventure',
      summary: 'After defeating a worthy enemy, you regain a little health and mana.',
    },
    'adventure',
    { leveling: 0.7, convenience: 0.4 },
  ),
  perk(
    'high-alert',
    {
      name: 'High Alert',
      summary: 'You spot stealthed enemies earlier, except in battlegrounds.',
    },
    'adventure',
    { pvp: 0.55 },
  ),
  perk(
    'field-guide',
    {
      name: 'Field Guide',
      summary: 'Shorter cooldown when placing campsite items.',
    },
    'adventure',
    { group: 0.4, convenience: 0.4, campsite: 1 },
  ),
  perk(
    'field-medic',
    {
      name: 'Field Medicine',
      summary: "Shorter wait between two bandages. Doesn't apply in dungeons, raids and battlegrounds.",
    },
    'adventure',
    { leveling: 0.4, pvp: 0.15, convenience: 0.5 },
    NO_HEAL_CLASSES,
  ),
  perk(
    'talented',
    {
      name: 'Talented',
      summary: 'Unlocks talent points up to five levels earlier.',
    },
    'adventure',
    { leveling: 0.7 },
  ),
  perk(
    'frequent-flier',
    {
      name: 'Frequent Flier',
      summary: 'Cheaper and faster flight paths.',
    },
    'adventure',
    { leveling: 0.35, gold: 0.45, convenience: 1 },
  ),
  // Resourcefulness
  perk(
    'gourmand',
    {
      name: 'Gourmand',
      summary: 'Longer duration for buffs from food.',
    },
    'resourcefulness',
    { leveling: 0.2, gold: 0.15, group: 0.5, convenience: 0.5 },
  ),
  perk(
    'quick-and-the-dead',
    {
      name: 'The Quick and the Dead',
      summary:
        'After dying, your ghost runs back to your body faster; party and raid buffs cost nothing after resurrecting.',
    },
    'resourcefulness',
    { leveling: 0.3, gold: 0.15, pvp: 0.2, group: 0.8, convenience: 0.65 },
    undefined,
    LEGACY_DN_SOURCE,
  ),
  perk(
    'reinforce',
    {
      name: 'Reinforce',
      summary: 'Gear loses less durability when you die.',
    },
    'resourcefulness',
    { gold: 0.7, group: 0.4, convenience: 0.3 },
  ),
  perk(
    'for-great-honor',
    {
      name: 'For Great Honor',
      summary: 'More Honor from PvP.',
    },
    'resourcefulness',
    { pvp: 1 },
  ),
  perk(
    'permanence',
    {
      name: 'Permanence',
      summary: 'Longer duration for party, raid and campsite buffs.',
    },
    'resourcefulness',
    { group: 0.85, convenience: 0.5, campsite: 0.6 },
  ),
  perk(
    'diplomat',
    {
      name: 'Diplomat',
      summary: 'Higher reputation gains.',
    },
    'resourcefulness',
    { pvp: 0.3, reputation: 1 },
  ),
  perk(
    'reagent-economy',
    {
      name: 'Reagent Economy',
      summary:
        "Class abilities don't need purchasable reagents (consumable materials for spells); tier 1 campsite items need no materials.",
    },
    'resourcefulness',
    { crafting: 0.15, gold: 0.6, group: 0.6, convenience: 0.6, campsite: 0.5 },
    REAGENT_CLASSES,
  ),
];

export type PerkKey = (typeof LEGACY_PERK_DRAFTS)[number]['id'];

export const LEGACY_PERKS: Perk[] = LEGACY_PERK_DRAFTS.map(({ classSynergy, ...p }) => ({
  ...p,
  id: perkId(p.id),
  ...(classSynergy ? { classSynergy: classSynergy.map(classId) } : {}),
  traits: traitProfile(p.traits),
  ...localize(p, DE[p.id], ['name', 'summary']),
}));

/** At release, 16 Legacy points can be spent per character. */
export const LEGACY_POINTS_PER_CHARACTER = 16;
