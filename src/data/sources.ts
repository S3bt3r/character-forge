import type { LocalizedText } from './display';
import type { Lang } from '../i18n/lang';
import { SOURCE_TEXTS as DE } from '../i18n/de/sources';

export interface SourceDef {
  title: LocalizedText;
  url?: Partial<Record<Lang, string>>;
}

/*
 * Web addresses of the sources per language. Blizzard articles exist under the same ID in German and English;
 * podcasts, Development Notes and Wowhead class guides only in English; Wowhead profession guides and Forever database
 * tooltips in both. English titles are in `SOURCE_TITLES` below, German ones in `src/i18n/de/sources.ts`. Community
 * guides carry the prefix `wowhead-guide-`; the `community` provenance requires one of them.
 * A class guide has an overview page and an abilities page (suffix `-abilities`), each its own source, so an entry
 * links the page that carries its statement.
 */
const SOURCE_URLS = {
  'deep-dive-hunter-druid': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24301515',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24301515',
  },
  'deep-dive-priest-warrior': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24301514',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24301514',
  },
  'deep-dive-mage-shaman': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24302097',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24302097',
  },
  'deep-dive-rogue-warlock': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24310968',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24310968',
  },
  'deep-dive-paladin': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24302099',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24302099',
  },
  'whats-next-panel': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24303862',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24303862',
  },
  'deep-dive-panel': {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24303313',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24303313',
  },
  fp: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24304071',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24304071',
  },
  rules: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24302070',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24302070',
  },
  hero: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24304075',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24304075',
  },
  skyborne: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24302071',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24302071',
  },
  legacy: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24307383',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24307383',
  },
  pvp: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24303316',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24303316',
  },
  darkspear: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24307308',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24307308',
  },
  raids: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24303009',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24303009',
  },
  dungeons: {
    de: 'https://worldofwarcraft.blizzard.com/de-de/news/24301455',
    en: 'https://worldofwarcraft.blizzard.com/en-us/news/24301455',
  },
  p1: { en: 'https://www.youtube.com/watch?v=m49-jvGPCkA' },
  p2: { en: 'https://www.youtube.com/watch?v=uDRcv_w85j8' },
  p3: { en: 'https://www.youtube.com/watch?v=LwOWAf06YPg' },
  p4: { en: 'https://www.youtube.com/watch?v=bzaMA5fZ1tE' },
  p5: { en: 'https://www.youtube.com/watch?v=uOlxa3xvNq4' },
  dn: { en: 'https://eu.forums.blizzard.com/en/wow/t/631316' },
  'wowhead-guide-druid-balance': { en: 'https://www.wowhead.com/forever/guide/classes/druid/balance/overview-pve-dps' },
  'wowhead-guide-druid-balance-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/druid/balance/dps-abilities',
  },
  'wowhead-guide-druid-feral': { en: 'https://www.wowhead.com/forever/guide/classes/druid/feral/overview-pve-dps' },
  'wowhead-guide-druid-feral-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/druid/feral/dps-abilities',
  },
  'wowhead-guide-druid-feral-tank': {
    en: 'https://www.wowhead.com/forever/guide/classes/druid/feral/overview-pve-tank',
  },
  'wowhead-guide-druid-feral-tank-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/druid/feral/tank-abilities',
  },
  'wowhead-guide-druid-restoration': {
    en: 'https://www.wowhead.com/forever/guide/classes/druid/restoration/overview-pve-healer',
  },
  'wowhead-guide-druid-restoration-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/druid/restoration/healer-abilities',
  },
  'wowhead-guide-hunter-marksmanship': {
    en: 'https://www.wowhead.com/forever/guide/classes/hunter/marksmanship/overview-pve-dps',
  },
  'wowhead-guide-hunter-beast-mastery': {
    en: 'https://www.wowhead.com/forever/guide/classes/hunter/beast-mastery/overview-pve-dps',
  },
  'wowhead-guide-hunter-beast-mastery-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/hunter/beast-mastery/dps-abilities',
  },
  'wowhead-guide-hunter-survival': {
    en: 'https://www.wowhead.com/forever/guide/classes/hunter/survival/overview-pve-dps',
  },
  'wowhead-guide-mage-arcane': { en: 'https://www.wowhead.com/forever/guide/classes/mage/arcane/overview-pve-dps' },
  'wowhead-guide-mage-fire': { en: 'https://www.wowhead.com/forever/guide/classes/mage/fire/overview-pve-dps' },
  'wowhead-guide-mage-frost': { en: 'https://www.wowhead.com/forever/guide/classes/mage/frost/overview-pve-dps' },
  'wowhead-guide-paladin-retribution': {
    en: 'https://www.wowhead.com/forever/guide/classes/paladin/retribution/overview-pve-dps',
  },
  'wowhead-guide-paladin-retribution-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/paladin/retribution/dps-abilities',
  },
  'wowhead-guide-paladin-protection': {
    en: 'https://www.wowhead.com/forever/guide/classes/paladin/protection/overview-pve-tank',
  },
  'wowhead-guide-paladin-holy': {
    en: 'https://www.wowhead.com/forever/guide/classes/paladin/holy/overview-pve-healer',
  },
  'wowhead-guide-priest-shadow': { en: 'https://www.wowhead.com/forever/guide/classes/priest/shadow/overview-pve-dps' },
  'wowhead-guide-priest-shadow-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/priest/shadow/dps-abilities',
  },
  'wowhead-guide-priest-discipline': {
    en: 'https://www.wowhead.com/forever/guide/classes/priest/discipline/overview-pve-healer',
  },
  'wowhead-guide-priest-discipline-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/priest/discipline/healer-abilities',
  },
  'wowhead-guide-priest-holy': { en: 'https://www.wowhead.com/forever/guide/classes/priest/holy/overview-pve-healer' },
  'wowhead-guide-priest-holy-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/priest/holy/healer-abilities',
  },
  'wowhead-guide-rogue-assassination': {
    en: 'https://www.wowhead.com/forever/guide/classes/rogue/assassination/overview-pve-dps',
  },
  'wowhead-guide-rogue-assassination-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/rogue/assassination/dps-abilities',
  },
  'wowhead-guide-rogue-combat': { en: 'https://www.wowhead.com/forever/guide/classes/rogue/combat/overview-pve-dps' },
  'wowhead-guide-rogue-combat-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/rogue/combat/dps-abilities',
  },
  'wowhead-guide-rogue-subtlety': {
    en: 'https://www.wowhead.com/forever/guide/classes/rogue/subtlety/overview-pve-dps',
  },
  'wowhead-guide-rogue-subtlety-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/rogue/subtlety/dps-abilities',
  },
  'wowhead-guide-shaman-elemental': {
    en: 'https://www.wowhead.com/forever/guide/classes/shaman/elemental/overview-pve-dps',
  },
  'wowhead-guide-shaman-enhancement': {
    en: 'https://www.wowhead.com/forever/guide/classes/shaman/enhancement/overview-pve-dps',
  },
  'wowhead-guide-shaman-restoration': {
    en: 'https://www.wowhead.com/forever/guide/classes/shaman/restoration/overview-pve-healer',
  },
  'wowhead-guide-shaman-restoration-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/shaman/restoration/healer-abilities',
  },
  'wowhead-guide-warlock-affliction': {
    en: 'https://www.wowhead.com/forever/guide/classes/warlock/affliction/overview-pve-dps',
  },
  'wowhead-guide-warlock-affliction-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/warlock/affliction/dps-abilities',
  },
  'wowhead-guide-warlock-demonology': {
    en: 'https://www.wowhead.com/forever/guide/classes/warlock/demonology/overview-pve-dps',
  },
  'wowhead-guide-warlock-demonology-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/warlock/demonology/dps-abilities',
  },
  'wowhead-guide-warlock-destruction': {
    en: 'https://www.wowhead.com/forever/guide/classes/warlock/destruction/overview-pve-dps',
  },
  'wowhead-guide-warlock-destruction-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/warlock/destruction/dps-abilities',
  },
  'wowhead-guide-warrior-arms': { en: 'https://www.wowhead.com/forever/guide/classes/warrior/arms/overview-pve-dps' },
  'wowhead-guide-warrior-fury': { en: 'https://www.wowhead.com/forever/guide/classes/warrior/fury/overview-pve-dps' },
  'wowhead-guide-warrior-protection': {
    en: 'https://www.wowhead.com/forever/guide/classes/warrior/protection/overview-pve-tank',
  },
  'wowhead-guide-warrior-protection-abilities': {
    en: 'https://www.wowhead.com/forever/guide/classes/warrior/protection/tank-abilities',
  },
  'wowhead-guide-profession-alchemy': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/alchemy-overview-trainer-locations-recipes',
    en: 'https://www.wowhead.com/forever/guide/professions/alchemy-overview-trainer-locations-recipes',
  },
  'wowhead-guide-profession-engineering': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/engineering-overview-trainer-locations-recipes',
    en: 'https://www.wowhead.com/forever/guide/professions/engineering-overview-trainer-locations-recipes',
  },
  'wowhead-guide-profession-tailoring': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/tailoring-overview-trainer-locations-recipes',
    en: 'https://www.wowhead.com/forever/guide/professions/tailoring-overview-trainer-locations-recipes',
  },
  'wowhead-guide-profession-herbalism': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/herbalism/overview-leveling',
    en: 'https://www.wowhead.com/forever/guide/professions/herbalism/overview-leveling',
  },
  'wowhead-guide-profession-mining': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/mining/overview-leveling',
    en: 'https://www.wowhead.com/forever/guide/professions/mining/overview-leveling',
  },
  'wowhead-guide-profession-skinning': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/skinning/overview-leveling',
    en: 'https://www.wowhead.com/forever/guide/professions/skinning/overview-leveling',
  },
  'wowhead-guide-profession-first-aid': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/first-aid/overview',
    en: 'https://www.wowhead.com/forever/guide/professions/first-aid/overview',
  },
  'wowhead-guide-profession-fishing': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/fishing/overview-leveling',
    en: 'https://www.wowhead.com/forever/guide/professions/fishing/overview-leveling',
  },
  'wowhead-guide-profession-cooking': {
    de: 'https://www.wowhead.com/forever/de/guide/professions/cooking/overview-leveling',
    en: 'https://www.wowhead.com/forever/guide/professions/cooking/overview-leveling',
  },
  'wowhead-spell-elemental-mastery': {
    de: 'https://www.wowhead.com/forever/de/spell=16166',
    en: 'https://www.wowhead.com/forever/spell=16166',
  },
  'wowhead-spell-feral-charge': {
    de: 'https://www.wowhead.com/forever/de/spell=1238122',
    en: 'https://www.wowhead.com/forever/spell=1238122',
  },
  'wowhead-spell-pyroclasm': {
    de: 'https://www.wowhead.com/forever/de/spell=18073',
    en: 'https://www.wowhead.com/forever/spell=18073',
  },
  'wowhead-spell-instrument-of-law': {
    de: 'https://www.wowhead.com/forever/de/spell=1311085',
    en: 'https://www.wowhead.com/forever/spell=1311085',
  },
  'wowhead-spell-intimidation': {
    de: 'https://www.wowhead.com/forever/de/spell=19577',
    en: 'https://www.wowhead.com/forever/spell=19577',
  },
  'wowhead-spell-silent-resolve': {
    de: 'https://www.wowhead.com/forever/de/spell=14523',
    en: 'https://www.wowhead.com/forever/spell=14523',
  },
  classic: {},
} satisfies Record<string, Partial<Record<Lang, string>>>;

/** Title per source in English; Blizzard articles with their English title (without dash, as all visible English texts). */
const SOURCE_TITLES: Record<SourceId, string> = {
  'deep-dive-hunter-druid': 'Class Deep Dives: Hunter and Druid',
  'deep-dive-priest-warrior': 'Class Deep Dives: Priest and Warrior',
  'deep-dive-mage-shaman': 'Class Deep Dives: Mage and Shaman',
  'deep-dive-rogue-warlock': 'Class Deep Dives: Rogue and Warlock',
  'deep-dive-paladin': 'Class Deep Dives: Paladin',
  'whats-next-panel': "What's Next Panel Recap",
  'deep-dive-panel': 'Deep Dive Panel Recap',
  fp: 'Found Photos Panel Recap',
  rules: 'Choose Your Ruleset',
  hero: 'Create the Hero You Want to Be',
  skyborne: 'Meet the New Skyborne',
  legacy: 'Get to Know the Legacy System',
  pvp: 'How PvP Progression Works',
  darkspear: 'Battle for the Darkspear Islands',
  raids: 'Raid Overview: Locations, Raid Sizes and Attunement',
  dungeons: 'Explore the New Dungeons',
  p1: 'Developer Podcast 1 (Skyborne, Leveling)',
  p2: 'Developer Podcast 2 (Class Design)',
  p3: 'Developer Podcast 3 (Dungeons & Raids)',
  p4: 'Developer Podcast 4 (PvP)',
  p5: 'Developer Podcast 5 (End of Beta Special)',
  dn: 'Beta Development Notes (as of October 15)',
  'wowhead-guide-druid-balance': 'Wowhead Guide: Balance Druid',
  'wowhead-guide-druid-balance-abilities': 'Wowhead Guide: Balance Druid Abilities',
  'wowhead-guide-druid-feral': 'Wowhead Guide: Feral Druid (DPS)',
  'wowhead-guide-druid-feral-abilities': 'Wowhead Guide: Feral Druid (DPS) Abilities',
  'wowhead-guide-druid-feral-tank': 'Wowhead Guide: Feral Druid (Tank)',
  'wowhead-guide-druid-feral-tank-abilities': 'Wowhead Guide: Feral Druid (Tank) Abilities',
  'wowhead-guide-druid-restoration': 'Wowhead Guide: Restoration Druid',
  'wowhead-guide-druid-restoration-abilities': 'Wowhead Guide: Restoration Druid Abilities',
  'wowhead-guide-hunter-marksmanship': 'Wowhead Guide: Marksmanship Hunter',
  'wowhead-guide-hunter-beast-mastery': 'Wowhead Guide: Beast Mastery Hunter',
  'wowhead-guide-hunter-beast-mastery-abilities': 'Wowhead Guide: Beast Mastery Hunter Abilities',
  'wowhead-guide-hunter-survival': 'Wowhead Guide: Survival Hunter',
  'wowhead-guide-mage-arcane': 'Wowhead Guide: Arcane Mage',
  'wowhead-guide-mage-fire': 'Wowhead Guide: Fire Mage',
  'wowhead-guide-mage-frost': 'Wowhead Guide: Frost Mage',
  'wowhead-guide-paladin-retribution': 'Wowhead Guide: Retribution Paladin',
  'wowhead-guide-paladin-retribution-abilities': 'Wowhead Guide: Retribution Paladin Abilities',
  'wowhead-guide-paladin-protection': 'Wowhead Guide: Protection Paladin',
  'wowhead-guide-paladin-holy': 'Wowhead Guide: Holy Paladin',
  'wowhead-guide-priest-shadow': 'Wowhead Guide: Shadow Priest',
  'wowhead-guide-priest-shadow-abilities': 'Wowhead Guide: Shadow Priest Abilities',
  'wowhead-guide-priest-discipline': 'Wowhead Guide: Discipline Priest',
  'wowhead-guide-priest-discipline-abilities': 'Wowhead Guide: Discipline Priest Abilities',
  'wowhead-guide-priest-holy': 'Wowhead Guide: Holy Priest',
  'wowhead-guide-priest-holy-abilities': 'Wowhead Guide: Holy Priest Abilities',
  'wowhead-guide-rogue-assassination': 'Wowhead Guide: Assassination Rogue',
  'wowhead-guide-rogue-assassination-abilities': 'Wowhead Guide: Assassination Rogue Abilities',
  'wowhead-guide-rogue-combat': 'Wowhead Guide: Combat Rogue',
  'wowhead-guide-rogue-combat-abilities': 'Wowhead Guide: Combat Rogue Abilities',
  'wowhead-guide-rogue-subtlety': 'Wowhead Guide: Subtlety Rogue',
  'wowhead-guide-rogue-subtlety-abilities': 'Wowhead Guide: Subtlety Rogue Abilities',
  'wowhead-guide-shaman-elemental': 'Wowhead Guide: Elemental Shaman',
  'wowhead-guide-shaman-enhancement': 'Wowhead Guide: Enhancement Shaman',
  'wowhead-guide-shaman-restoration': 'Wowhead Guide: Restoration Shaman',
  'wowhead-guide-shaman-restoration-abilities': 'Wowhead Guide: Restoration Shaman Abilities',
  'wowhead-guide-warlock-affliction': 'Wowhead Guide: Affliction Warlock',
  'wowhead-guide-warlock-affliction-abilities': 'Wowhead Guide: Affliction Warlock Abilities',
  'wowhead-guide-warlock-demonology': 'Wowhead Guide: Demonology Warlock',
  'wowhead-guide-warlock-demonology-abilities': 'Wowhead Guide: Demonology Warlock Abilities',
  'wowhead-guide-warlock-destruction': 'Wowhead Guide: Destruction Warlock',
  'wowhead-guide-warlock-destruction-abilities': 'Wowhead Guide: Destruction Warlock Abilities',
  'wowhead-guide-warrior-arms': 'Wowhead Guide: Arms Warrior',
  'wowhead-guide-warrior-fury': 'Wowhead Guide: Fury Warrior',
  'wowhead-guide-warrior-protection': 'Wowhead Guide: Protection Warrior',
  'wowhead-guide-warrior-protection-abilities': 'Wowhead Guide: Protection Warrior Abilities',
  'wowhead-guide-profession-alchemy': 'Wowhead Guide: Alchemy',
  'wowhead-guide-profession-engineering': 'Wowhead Guide: Engineering',
  'wowhead-guide-profession-tailoring': 'Wowhead Guide: Tailoring',
  'wowhead-guide-profession-herbalism': 'Wowhead Guide: Herbalism',
  'wowhead-guide-profession-mining': 'Wowhead Guide: Mining',
  'wowhead-guide-profession-skinning': 'Wowhead Guide: Skinning',
  'wowhead-guide-profession-first-aid': 'Wowhead Guide: First Aid',
  'wowhead-guide-profession-fishing': 'Wowhead Guide: Fishing',
  'wowhead-guide-profession-cooking': 'Wowhead Guide: Cooking',
  'wowhead-spell-elemental-mastery': 'Wowhead Database: Elemental Mastery',
  'wowhead-spell-feral-charge': 'Wowhead Database: Feral Charge (Bear)',
  'wowhead-spell-pyroclasm': 'Wowhead Database: Pyroclasm',
  'wowhead-spell-instrument-of-law': 'Wowhead Database: Instrument of Law',
  'wowhead-spell-intimidation': 'Wowhead Database: Intimidation',
  'wowhead-spell-silent-resolve': 'Wowhead Database: Silent Resolve',
  classic: 'WoW Classic (not confirmed for Forever)',
};

export type SourceId = keyof typeof SOURCE_URLS;

export const SOURCES: Record<SourceId, SourceDef> = Object.fromEntries(
  Object.entries(SOURCE_URLS).map(([id, url]) => [
    id,
    {
      title: { en: SOURCE_TITLES[id as SourceId], de: DE[id as SourceId].title },
      ...(Object.keys(url).length > 0 ? { url } : {}),
    },
  ]),
) as Record<SourceId, SourceDef>;

/** Web address in the requested language, otherwise in the available one; undefined without a web address. */
export function sourceUrl(source: SourceDef, lang: Lang): string | undefined {
  return source.url?.[lang] ?? Object.values(source.url ?? {})[0];
}

/** Version of the data set; written into saved profiles and share codes. */
export const DATA_VERSION = 'beta-2026-10za';
