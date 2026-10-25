import { traitProfile } from '../domain/catalog';
import type { ProfessionDef } from './display';
import { PROFESSION_TEXTS as DE } from '../i18n/de/entities/professions';
import { community, confirmed, estimate, withGerman, type NoteTexts } from './evidence/helpers';
import type { ClassKey, RaceKey } from './ids';
import { TRAIT_TEXTS as DE_TRAITS } from '../i18n/de/entities/traits';
import { localize, traitCatalog, type TraitTexts } from './localize';
import { classId, professionId, raceId } from '../domain/ids';
import { knownId } from './known';
import { rated, splitPairs, unrated, type Rated, type WithEvidence } from './rated';

const PROFESSION_TRAIT_TEXTS = {
  timeCost: { label: 'Time required', scale: '0 = on the side, 1 = very time-consuming' },
  goldCost: { label: 'Cost to level', scale: '0 = free, 1 = very expensive' },
  goldIncome: { label: 'Gold income', scale: '0 = hardly any, 1 = very lucrative' },
  pvpValue: { label: 'PvP value', scale: '0 = none, 1 = very high' },
  pveValue: { label: 'Raid/dungeon value', scale: '0 = none, 1 = very high' },
  levelingValue: { label: 'Value while leveling', scale: '0 = none, 1 = very high' },
  campsiteValue: { label: 'Contribution to campsites', scale: '0 = none, 1 = sought-after campsite items' },
  auctionHouse: { label: 'Auction House trading', scale: '0 = unnecessary, 1 = lives off trading' },
  exploration: { label: 'Exploring the world', scale: '0 = stationary, 1 = hunting recipes/materials in the world' },
} satisfies Record<string, TraitTexts>;

export type ProfessionTraitId = keyof typeof PROFESSION_TRAIT_TEXTS;
export const PROFESSION_TRAITS = traitCatalog(PROFESSION_TRAIT_TEXTS, DE_TRAITS.profession);
type Profession = ProfessionDef<ProfessionTraitId>;
type ProfessionBase = Omit<
  Profession,
  'id' | 'classSynergy' | 'raceSynergy' | 'partners' | 'name' | 'summary' | 'traits' | 'evidence'
> &
  Record<'name' | 'summary', string> & {
    traits: Record<ProfessionTraitId, Rated>;
    classSynergy?: ClassKey[];
    raceSynergy?: RaceKey[];
    partners?: string[];
  };
type ProfessionTextsRuntime = Record<'name' | 'summary', string> & { evidence?: NoteTexts };

/*
 * The articles do not list every profession; Enchanting is named only in the Development Notes. Where no Blizzard
 * source rates a value, the Wowhead profession and class guides do (`community`); values marked `unrated`
 * are Classic experience or estimates. Legacy bonuses (Professions tree) can lower the effort.
 */
const PROFESSION_BASES = [
  {
    id: 'herbalism',
    kind: 'gathering',
    name: 'Herbalism',
    summary: 'Gathering herbs on the side while questing, good gold income; Incense Candle for the campsite.',
    traits: {
      timeCost: unrated(0.35),
      goldCost: rated(0, community(['wowhead-guide-profession-herbalism'], 'Herbalism needs no tools.')),
      goldIncome: rated(
        0.8,
        community(
          ['wowhead-guide-profession-herbalism'],
          'A great way to make gold, especially while leveling: herbs always fetch a good price on the Auction House because so many common recipes use them.',
        ),
      ),
      pvpValue: rated(
        0.1,
        community(['wowhead-guide-profession-herbalism'], 'Herbalists craft only campsite objects, no combat items.'),
      ),
      pveValue: rated(
        0.2,
        community(
          ['wowhead-guide-profession-herbalism'],
          'Herbalists craft only campsite objects, no combat items; their campsite buffs can help a group before a dungeon or raid, which matters little in PvP.',
        ),
      ),
      levelingValue: unrated(0.4),
      campsiteValue: rated(0.5, confirmed(['deep-dive-panel'], 'Incense Candle (Intellect) as a campsite object.')),
      auctionHouse: rated(
        0.8,
        community(['wowhead-guide-profession-herbalism'], 'Herbs always fetch a good price on the Auction House.'),
      ),
      exploration: rated(
        0.8,
        community(
          ['wowhead-guide-profession-herbalism'],
          'Each kind of herb grows only in certain zones and environments.',
        ),
      ),
    },
    classSynergy: ['druid', 'hunter', 'warlock'],
    raceSynergy: ['tauren'],
    partners: ['alchemy'],
  },
  {
    id: 'mining',
    kind: 'gathering',
    name: 'Mining',
    summary: 'Mining ore: the basis for smiths and engineers, solid gold income.',
    traits: {
      timeCost: rated(
        0.45,
        community(
          ['wowhead-guide-warrior-arms', 'wowhead-guide-profession-mining'],
          'Ore nodes are plentiful enough to keep Mining in step with your level. Smelting grants skill up to 185, but no bar grants skill between 140 and 155, so those levels need mining.',
        ),
      ),
      goldCost: rated(
        0.05,
        community(
          ['wowhead-guide-profession-mining'],
          'No upfront investment; only a mining pick from vendors is needed.',
        ),
      ),
      goldIncome: rated(
        0.8,
        community(
          ['wowhead-guide-profession-mining'],
          'An excellent source of gold with no upfront investment: the materials go into recipes of several crafting professions and sell easily on the Auction House.',
        ),
      ),
      pvpValue: rated(
        0.1,
        community(['wowhead-guide-profession-mining'], 'Miners craft only bars and campsite objects, no combat items.'),
      ),
      pveValue: rated(
        0.2,
        community(
          ['wowhead-guide-profession-mining'],
          'Miners craft only bars and campsite objects, no combat items; their campsite buffs can help a group before a dungeon or raid, which matters little in PvP.',
        ),
      ),
      levelingValue: rated(
        0.4,
        community(
          ['wowhead-guide-warrior-arms'],
          'For Warriors, guides recommend Mining for leveling, thanks to plentiful nodes and the Lodestone campsite buff.',
        ),
      ),
      campsiteValue: rated(
        0.6,
        community(
          ['wowhead-guide-profession-mining', 'wowhead-guide-warrior-arms'],
          'Lodestone, Rock Garden and Molten Foundry give a melee Attack Power buff; guides count it among the best campsite buffs for Warriors.',
        ),
      ),
      auctionHouse: rated(
        0.8,
        community(['wowhead-guide-profession-mining'], 'Materials sell easily on the Auction House.'),
      ),
      exploration: rated(
        0.8,
        community(['wowhead-guide-profession-mining'], 'Skilling up means moving on to zones with higher ores.'),
      ),
    },
    classSynergy: ['druid', 'hunter', 'warlock'],
    partners: ['blacksmithing', 'engineering'],
  },
  {
    id: 'skinning',
    kind: 'gathering',
    name: 'Skinning',
    summary: 'Leather from slain beasts, hardly any extra effort while leveling.',
    traits: {
      timeCost: rated(
        0.15,
        community(['wowhead-guide-profession-skinning'], 'No detours to nodes: you skin beasts you already kill.'),
      ),
      goldCost: rated(
        0.05,
        community(['wowhead-guide-profession-skinning'], 'Only a skinning knife from vendors is needed.'),
      ),
      goldIncome: rated(
        0.7,
        community(
          ['wowhead-guide-profession-skinning'],
          'An excellent, semi-passive source of gold, especially while leveling.',
        ),
      ),
      pvpValue: rated(
        0.1,
        community(['wowhead-guide-profession-skinning'], 'Skinners craft only campsite objects, no combat items.'),
      ),
      pveValue: rated(
        0.2,
        community(
          ['wowhead-guide-profession-skinning'],
          'Skinners craft only campsite objects, no combat items; their campsite buffs can help a group before a dungeon or raid, which matters little in PvP.',
        ),
      ),
      levelingValue: rated(
        0.4,
        community(
          ['wowhead-guide-profession-skinning'],
          'You already kill skinnable beasts while leveling, so Skinning costs no extra time and earns gold; it crafts only campsite objects, no leveling gear.',
        ),
      ),
      campsiteValue: rated(
        0.55,
        community(
          ['wowhead-guide-profession-skinning', 'wowhead-guide-mage-arcane'],
          'Camp Chair and the higher Skinning campsite objects give a critical strike buff (2%) to everyone at the camp.',
        ),
      ),
      auctionHouse: unrated(0.7),
      exploration: rated(
        0.3,
        community(['wowhead-guide-profession-skinning'], 'No detours to nodes: you skin beasts you already kill.'),
      ),
    },
    classSynergy: ['hunter', 'rogue', 'druid', 'shaman'],
    partners: ['leatherworking'],
  },
  {
    id: 'alchemy',
    kind: 'crafting',
    name: 'Alchemy',
    summary: 'Potions, flasks and elixirs: consumables for raids and PvP; Alchemy Lab for the campsite.',
    traits: {
      timeCost: rated(
        0.6,
        estimate(
          'Most recipes use herbs; many are sold by vendors of the Azeroth Commerce Authority or Durotar Supply and Logistics, some only at Friendly or Honored, and others drop from specific mobs.',
        ),
      ),
      goldCost: rated(
        0.6,
        community(
          ['wowhead-guide-profession-alchemy'],
          'Leveling Alchemy can often be expensive; gathering your own herbs helps.',
        ),
      ),
      goldIncome: rated(
        0.85,
        community(
          ['wowhead-guide-profession-alchemy'],
          'An excellent way to make gold: transmutes are a passive source, consumables for the Auction House an active one, and many players are in the market for consumables.',
        ),
      ),
      pvpValue: rated(
        0.7,
        estimate(
          'Potions, flasks and elixirs give powerful temporary buffs that help in PvP as well; Healing Potions come from First Aid instead.',
        ),
      ),
      pveValue: rated(
        0.8,
        confirmed(
          ['p3', 'wowhead-guide-profession-alchemy', 'wowhead-guide-druid-feral'],
          'Alchemists craft potions, flasks and elixirs, raid consumables are available, and preparation is a large part of success against a raid boss; guides report that Alchemists get 25% stronger elixir and flask effects.',
          { p3: '57:55' },
        ),
      ),
      levelingValue: rated(
        0.55,
        community(
          ['wowhead-guide-profession-alchemy', 'wowhead-guide-shaman-enhancement'],
          'Over 50 recipes for consumables at low levels help while leveling.',
        ),
      ),
      campsiteValue: rated(
        0.6,
        confirmed(
          ['deep-dive-panel', 'wowhead-guide-profession-alchemy'],
          'The Alchemy campsite objects give a mana regeneration buff; the higher ones up to the Alchemy Lab are required for certain recipes.',
        ),
      ),
      auctionHouse: rated(
        0.8,
        community(
          ['wowhead-guide-profession-alchemy'],
          'Alchemists make money by selling consumables on the Auction House, and the most profitable recipes change constantly with supply and demand, so trading is part of the profession.',
        ),
      ),
      exploration: rated(
        0.3,
        community(['wowhead-guide-profession-alchemy'], 'Many recipes come from faction vendors.'),
      ),
    },
    partners: ['herbalism'],
  },
  {
    id: 'blacksmithing',
    kind: 'crafting',
    name: 'Blacksmithing',
    summary: 'Plate armor, weapons and Sharpening Stones. Expensive to level; Sharpening Wheel for the campsite.',
    traits: {
      timeCost: unrated(0.65),
      goldCost: rated(
        0.65,
        confirmed(
          ['dn'],
          'Leveling needs bought and gathered materials, and many crafted items sell to vendors for little.',
        ),
      ),
      goldIncome: rated(
        0.5,
        community(['wowhead-guide-warrior-arms'], 'Crafted weapons sell above their crafting cost.'),
      ),
      pvpValue: unrated(0.4),
      pveValue: unrated(0.6),
      levelingValue: rated(
        0.7,
        community(
          ['wowhead-guide-warrior-arms', 'wowhead-guide-shaman-enhancement'],
          'Blacksmithing crafts more powerful gear while leveling, and early weapon upgrades feel incredibly strong; once dungeon rewards are in reach, its usefulness may diminish.',
        ),
      ),
      campsiteValue: rated(
        0.6,
        confirmed(
          ['deep-dive-panel', 'wowhead-guide-mage-arcane'],
          'Sharpening Wheel (Attack Power) as a campsite object; the higher objects add a usable Anvil and enable Forge recipes.',
        ),
      ),
      auctionHouse: rated(
        0.5,
        community(['wowhead-guide-warrior-arms'], 'Crafted weapons sell above their crafting cost.'),
      ),
      exploration: rated(0.4, confirmed(['dn'], 'Recipes as random drops in dungeons.')),
    },
    classSynergy: ['warrior', 'paladin'],
    partners: ['mining'],
  },
  {
    id: 'engineering',
    kind: 'crafting',
    name: 'Engineering',
    summary: 'Bombs, gadgets and trinkets: the strongest PvP profession; hidden recipes out in the world.',
    traits: {
      timeCost: rated(
        0.75,
        confirmed(
          ['p4', 'wowhead-guide-profession-engineering'],
          'Recipes such as bombs drop from hidden sources with very low drop chances and take a lot of farming; schematics also come from the Azeroth Commerce Authority, and farming your own ore takes time.',
          { p4: '29:45' },
        ),
      ),
      goldCost: unrated(0.7),
      goldIncome: unrated(0.25),
      pvpValue: rated(
        1,
        community(
          ['wowhead-guide-warrior-arms', 'wowhead-guide-mage-arcane'],
          'Gadgets and bombs give Engineering great value in PvP, and guides call it the best profession for endgame PvP.',
        ),
      ),
      pveValue: rated(
        0.9,
        community(
          ['wowhead-guide-profession-engineering', 'wowhead-guide-mage-arcane', 'wowhead-guide-warrior-arms'],
          'Guides find that Tinkers such as Nitro Boosts make Engineering best in slot and invaluable for raiders, that its explosives have great value in raids, and that it is the best profession for endgame PvE.',
        ),
      ),
      levelingValue: rated(
        0.3,
        community(
          ['wowhead-guide-profession-engineering', 'wowhead-guide-warrior-arms'],
          'Offers little gear for leveling, and for Warriors guides do not recommend it for leveling.',
        ),
      ),
      campsiteValue: rated(
        0.4,
        community(
          ['wowhead-guide-profession-engineering', 'wowhead-guide-warrior-arms'],
          "Reagent Bot, Repair Bot and Anarchist's Workbench offer reagents and repairs but no stat buff; for Warriors, guides call the Reagent Bot of limited value.",
        ),
      ),
      auctionHouse: unrated(0.2),
      exploration: rated(0.7, confirmed(['p4'], 'Hidden recipes (e.g. bombs) and rare materials.', { p4: '29:04' })),
    },
    raceSynergy: ['gnome'],
    partners: ['mining'],
  },
  {
    id: 'leatherworking',
    kind: 'crafting',
    name: 'Leatherworking',
    summary: 'Leather and mail armor, armor sets; Tanning Rack for the campsite.',
    traits: {
      timeCost: unrated(0.5),
      goldCost: unrated(0.45),
      goldIncome: unrated(0.5),
      pvpValue: unrated(0.4),
      pveValue: unrated(0.6),
      levelingValue: rated(
        0.75,
        community(
          ['wowhead-guide-hunter-beast-mastery', 'wowhead-guide-mage-arcane'],
          'Many recipes make bind-on-pickup pieces that are often very strong for their level, and the first campsite object grants rested experience up to 5% of a level.',
        ),
      ),
      campsiteValue: rated(
        0.6,
        confirmed(
          ['deep-dive-panel', 'wowhead-guide-mage-arcane'],
          'The first Leatherworking campsite object gives rested experience up to 5% of a level; the Tanning Rack is required for advanced Leatherworking recipes.',
        ),
      ),
      auctionHouse: unrated(0.5),
      exploration: rated(0.4, confirmed(['dn'], 'Recipes as random drops in dungeons.')),
    },
    classSynergy: ['rogue', 'druid', 'hunter', 'shaman'],
    partners: ['skinning'],
  },
  {
    id: 'tailoring',
    kind: 'crafting',
    name: 'Tailoring',
    summary: 'Cloth armor and bags. Spell power gear already at low levels; Faction Banner for the campsite.',
    traits: {
      timeCost: rated(
        0.6,
        estimate(
          'Every player can loot cloth, but many patterns need reputation, and some gear sets drop from dungeon bosses.',
        ),
      ),
      goldCost: rated(
        0.35,
        community(
          ['wowhead-guide-profession-tailoring'],
          'Everyone can loot cloth, so material costs stay reasonable.',
        ),
      ),
      goldIncome: rated(
        0.5,
        community(
          ['wowhead-guide-profession-tailoring'],
          'Good for gold, especially early on, with bags and gear to craft and disenchant.',
        ),
      ),
      pvpValue: unrated(0.3),
      pveValue: rated(
        0.65,
        community(
          ['wowhead-guide-profession-tailoring', 'wowhead-guide-priest-discipline'],
          'Useful gear up to endgame; improves dungeon performance.',
        ),
      ),
      levelingValue: rated(
        0.85,
        confirmed(
          ['p1', 'wowhead-guide-profession-tailoring', 'wowhead-guide-priest-holy'],
          'Tailoring crafts spell power gear at low levels, and its leveling gear sets are bind-on-pickup; guides find the cloth pieces improve leveling speed and survivability.',
          { p1: '54:27' },
        ),
      ),
      campsiteValue: rated(0.6, confirmed(['deep-dive-panel'], 'Faction Banner (Spirit) as a campsite object.')),
      auctionHouse: rated(
        0.5,
        community(
          ['wowhead-guide-profession-tailoring'],
          'Tailors supply bags, and the Skyborne reputation items are bind-on-equip and can be sold on the Auction House, while the leveling gear sets are bind-on-pickup.',
        ),
      ),
      exploration: rated(
        0.4,
        community(
          ['wowhead-guide-profession-tailoring'],
          'Many patterns drop in the world, from dungeon bosses, while fishing or from pickpocketing.',
        ),
      ),
    },
    classSynergy: ['mage', 'priest', 'warlock'],
    partners: ['enchanting'],
  },
  {
    id: 'enchanting',
    kind: 'crafting',
    name: 'Enchanting',
    summary: 'Enchanting gear and disenchanting items. Expensive, but in demand at endgame.',
    traits: {
      timeCost: unrated(0.7),
      goldCost: unrated(0.9),
      goldIncome: unrated(0.6),
      pvpValue: unrated(0.5),
      pveValue: rated(
        0.8,
        confirmed(
          ['dn', 'deep-dive-mage-shaman', 'deep-dive-rogue-warlock'],
          'Enchanting makes Wizard Oils, which stack with Shaman and Warlock weapon effects.',
        ),
      ),
      levelingValue: rated(
        0.7,
        community(
          ['wowhead-guide-priest-holy', 'wowhead-guide-priest-discipline', 'dn'],
          'For Priests, guides name crafting wands the main reason to take Enchanting early: wands make up a good part of the damage while leveling. Wands gain nothing from spell damage and need 0.5 sec of standing still to shoot.',
        ),
      ),
      campsiteValue: rated(
        0.7,
        community(
          ['wowhead-guide-priest-discipline', 'wowhead-guide-mage-arcane'],
          'Enchanted Lute gives armor, all primary stats and resistances to everyone at the camp; the higher objects improve disenchanting and enable recipes.',
        ),
      ),
      auctionHouse: unrated(0.6),
      exploration: unrated(0.3),
    },
    partners: ['tailoring'],
  },
  {
    id: 'cooking',
    kind: 'secondary',
    name: 'Cooking',
    summary: 'Buff food with a small experience bonus; Cooks place the Campfire.',
    traits: {
      timeCost: rated(
        0.45,
        estimate(
          'Trainers teach only about a dozen of over 100 recipes; the rest come from vendors, drops and the Azeroth Commerce Authority. Skill 150 to 225 needs a book from a vendor, 225 to 300 a quest. Raw fish for leveling is cheap on the Auction House.',
        ),
      ),
      goldCost: rated(
        0.15,
        community(['wowhead-guide-profession-cooking'], 'Raw fish for skilling up is cheap on the Auction House.'),
      ),
      goldIncome: rated(
        0.6,
        community(
          ['wowhead-guide-profession-cooking'],
          'Food buffs last 15 min and players want them constantly while questing, in dungeons and in raids, which makes food on the Auction House a great source of income.',
        ),
      ),
      pvpValue: unrated(0.3),
      pveValue: rated(
        0.4,
        community(
          ['wowhead-guide-profession-cooking'],
          'Food buffs last 15 min and players want them constantly in dungeons and raids, but cooked food sells on the Auction House, so anyone can buy it.',
        ),
      ),
      levelingValue: rated(
        0.65,
        confirmed(
          ['deep-dive-panel', 'wowhead-guide-profession-cooking'],
          'Crafted food grants a small experience bonus (5% from kills) and stat boosts, and Cooking takes no primary profession slot; guides find that cooking your own food saves time and money.',
        ),
      ),
      campsiteValue: rated(
        0.8,
        confirmed(
          ['deep-dive-panel', 'wowhead-guide-profession-cooking'],
          'Cooks place upgraded campfires that hold 5 or 10 campsite objects instead of 3.',
        ),
      ),
      auctionHouse: rated(
        0.55,
        community(
          ['wowhead-guide-profession-cooking'],
          'Food buffs last 15 min, so food is in high demand on the Auction House.',
        ),
      ),
      exploration: rated(
        0.3,
        community(
          ['wowhead-guide-profession-cooking'],
          'Most recipes come from vendors, drops and the Azeroth Commerce Authority.',
        ),
      ),
    },
  },
  {
    id: 'fishing',
    kind: 'secondary',
    name: 'Fishing',
    summary: 'Fish for Cooking and Alchemy. Relaxing, but time-consuming.',
    traits: {
      timeCost: unrated(0.6),
      goldCost: rated(0, community(['wowhead-guide-profession-fishing'], 'Essentially no costs.')),
      goldIncome: rated(
        0.55,
        community(
          ['wowhead-guide-profession-fishing'],
          'Fishing has essentially no costs, and the right fish bring surprisingly good, steady gold without much attention.',
        ),
      ),
      pvpValue: unrated(0.1),
      pveValue: rated(
        0.1,
        community(
          ['wowhead-guide-profession-fishing'],
          'Fishers craft only campsite objects, no combat items; their value for raids and dungeons comes indirectly through fish for the stat food of Cooking.',
        ),
      ),
      levelingValue: rated(
        0.2,
        estimate(
          'Fishing crafts only campsite objects and no gear, and leveling it depends only on how many fish you catch; its fish feed the experience food of Cooking and Hunter pets.',
        ),
      ),
      campsiteValue: rated(
        0.65,
        community(
          ['wowhead-guide-profession-fishing', 'wowhead-guide-mage-arcane'],
          'Fish Bowl gives 8% increased stats, assumed to help every role, and the higher Fishing campsite objects add Fishing Skill lures plus uncommon, then rare fish. Its objects unlock no recipes.',
        ),
      ),
      auctionHouse: rated(
        0.5,
        community(['wowhead-guide-profession-fishing'], 'Fish become buff food for yourself or for the Auction House.'),
      ),
      exploration: rated(
        0.6,
        community(['wowhead-guide-profession-fishing'], 'Each kind of fish school appears only in specific zones.'),
      ),
    },
    classSynergy: ['shaman', 'hunter'],
  },
  {
    id: 'first-aid',
    kind: 'secondary',
    name: 'First Aid',
    summary: 'Bandages, almost a must for classes without healing.',
    traits: {
      timeCost: unrated(0.15),
      goldCost: rated(
        0.2,
        community(
          ['wowhead-guide-profession-first-aid'],
          'Crafting bandages is usually the cheapest way to level First Aid; the skill range from 150 to 225 needs a book sold by a vendor.',
        ),
      ),
      goldIncome: unrated(0.2),
      pvpValue: unrated(0.6),
      pveValue: rated(
        0.4,
        community(
          ['wowhead-guide-profession-first-aid'],
          'Healing Potions come from First Aid, plus cures for diseases and bleeds.',
        ),
      ),
      levelingValue: rated(
        0.7,
        community(
          ['wowhead-guide-profession-first-aid'],
          'Useful for every class, especially for non-healers; the Legacy perk Field Medicine shortens Recently Bandaged.',
        ),
      ),
      campsiteValue: rated(
        0.6,
        community(
          ['wowhead-guide-profession-first-aid', 'wowhead-guide-mage-arcane'],
          'First Aid Kit gives a Stamina buff that helps every role, and the higher First Aid campsite objects supply Healing Potions and antivenom, then Healing Potions and poultices. The buff raises a single stat, and the objects unlock no recipes.',
        ),
      ),
      auctionHouse: unrated(0.2),
      exploration: unrated(0.1),
    },
    classSynergy: ['warrior', 'rogue', 'hunter', 'mage'],
  },
  // `Lowercase<string>` instead of `string` keeps the literal IDs; the texts bind to them (`PROFESSION_TEXTS`).
] satisfies (ProfessionBase & { id: Lowercase<string>; classSynergy?: ClassKey[]; raceSynergy?: RaceKey[] })[];

/** A profession without texts; the texts bind to it (`PROFESSION_TEXTS`). */
export type ProfessionEntry = WithEvidence<(typeof PROFESSION_BASES)[number]>;

/** English name, description and notes sit in the base list above; the German texts live in `src/i18n/de/entities/professions.ts`. */
const PROFESSION_IDS = PROFESSION_BASES.map((p) => professionId(p.id));
/** A partner must be a profession of the list; a typo fails when the data loads instead of silently losing the bonus. */
const partnerId = (id: string) => knownId(PROFESSION_IDS, id, 'Partner profession');

export const PROFESSIONS: Profession[] = PROFESSION_BASES.map(({ classSynergy, raceSynergy, partners, ...p }) => {
  const de: ProfessionTextsRuntime = DE[p.id];
  const { values, evidence } = splitPairs(p.traits);
  return {
    ...p,
    id: professionId(p.id),
    ...(classSynergy ? { classSynergy: classSynergy.map(classId) } : {}),
    ...(raceSynergy ? { raceSynergy: raceSynergy.map(raceId) } : {}),
    ...(partners ? { partners: partners.map(partnerId) } : {}),
    traits: traitProfile(values),
    ...localize(p, de, ['name', 'summary']),
    ...(Object.keys(evidence).length > 0 ? { evidence: withGerman(evidence, de.evidence ?? {}) } : {}),
  };
});
