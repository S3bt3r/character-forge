import { traitProfile } from '../domain/catalog';
import type { RaceDef } from './display';
import { RACE_TEXTS as DE } from '../i18n/de/entities/races';
import { community, confirmed, withGerman, type NoteTexts } from './evidence/helpers';
import { SHARED_EVIDENCE } from './evidence/shared';
import type { RaceKey } from './ids';
import { localize } from './localize';
import type { RaceTraitId } from './traits';
import { raceId } from '../domain/ids';
import { rated, splitPairs, unrated, type Rated, type WithEvidence } from './rated';

type Race = RaceDef<RaceTraitId>;
type RaceBase = Omit<Race, 'id' | 'name' | 'lore' | 'racials' | 'traits' | 'evidence'> &
  Record<'name' | 'lore' | 'racials', string> & { traits: Record<RaceTraitId, Rated> };
type RaceTextsRuntime = Record<'name' | 'lore' | 'racials', string> & { evidence?: NoteTexts };

const SKYBORNE_NOVELTY = SHARED_EVIDENCE.skyborneNovelty;

const RACE_BASES = [
  // Horde
  {
    id: 'orc',
    faction: 'horde',
    name: 'Orc',
    lore: 'A warlike people led by Thrall and freed from the demonic blood curse, shaped by honor, shamanism and Durotar; new in Forever as playable Mages.',
    racials:
      'Blood Fury (+10% attack power and spell power for 15 sec), Shatter Curse (removes curses and banes, 5% less magic damage for 8 sec), Savage (+1% critical strike chance), Hardiness (stuns last 20% shorter).',
    traits: {
      racialPvp: rated(
        0.85,
        confirmed(
          [
            'hero',
            'dn',
            'wowhead-guide-hunter-beast-mastery',
            'wowhead-guide-shaman-enhancement',
            'wowhead-guide-mage-arcane',
          ],
          'Stuns last 20% shorter (Hardiness) and Shatter Curse removes curses and lowers magic damage taken, but nothing breaks a stun or fear. Guides call Orcs the best Horde race for Enhancement Shamans, likely for Hunters, and likely one of two Horde PvP picks for Mages.',
        ),
      ),
      racialPve: rated(
        0.95,
        confirmed(
          ['hero', 'dn', 'wowhead-guide-shaman-enhancement', 'wowhead-guide-warrior-fury', 'wowhead-guide-mage-arcane'],
          'More damage on demand and more critical hits: 10% more attack and spell power for 15 sec (Blood Fury) and 1% critical strike chance at all times (Savage). Guides call Orcs the golden standard for Enhancement Shamans and likely the best race for Fury Warriors and the best Horde PvE pick for Mages.',
        ),
      ),
      stunEscape: rated(
        0.4,
        confirmed(['hero'], 'Stuns last 20% shorter (Hardiness), but nothing actively breaks a stun or root.'),
      ),
      fearEscape: unrated(0),
      selfCleanse: rated(
        0.0,
        confirmed(['dn'], 'Cannot remove poisons, diseases or bleeds; Shatter Curse removes only curses and banes.'),
      ),
      size: unrated(0.7),
      aesthetic: unrated(0.2),
      novelty: unrated(0.1),
      themeLight: unrated(0),
      themeShadow: unrated(0.2),
      themeNature: unrated(0.4),
      themeArcane: unrated(0.1),
      themeHonor: unrated(1),
      themeTech: unrated(0.1),
    },
  },
  {
    id: 'undead',
    faction: 'horde',
    name: 'Undead (Forsaken)',
    lore: 'Undead freed from the Scourge under Sylvanas. New in Forever: Forsaken Paladins from Bandarion Keep.',
    racials:
      'Will of the Forsaken (removes charm, fear and sleep), Cannibalize (restores 35% health and mana by eating corpses), Underwater Breathing (300% longer underwater), Touch of the Grave (attacks occasionally drain health without breaking crowd control).',
    traits: {
      racialPvp: rated(
        0.9,
        confirmed(
          [
            'deep-dive-panel',
            'wowhead-guide-mage-arcane',
            'wowhead-guide-warlock-affliction',
            'wowhead-guide-priest-discipline',
          ],
          'Breaks free of charm, fear and sleep (Will of the Forsaken), with no immunity afterward. Guides call it the strongest PvP racial for Mages and Warlocks and one of the best in the game.',
        ),
      ),
      racialPve: rated(
        0.5,
        confirmed(
          ['deep-dive-panel', 'wowhead-guide-rogue-assassination', 'wowhead-guide-priest-holy'],
          'Some extra damage that also heals you: attacks sometimes drain health (Touch of the Grave), and Cannibalize restores health and mana. Guides rate Undead moderately competitive for Rogues and recommend them for Horde Priests.',
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: rated(
        1,
        confirmed(['deep-dive-panel'], 'Breaks free of fear (Will of the Forsaken), with no immunity afterward.'),
      ),
      selfCleanse: unrated(0),
      size: unrated(0.5),
      aesthetic: unrated(0),
      novelty: unrated(0.1),
      themeLight: unrated(0.3),
      themeShadow: unrated(1),
      themeNature: unrated(0),
      themeArcane: unrated(0.3),
      themeHonor: unrated(0.2),
      themeTech: unrated(0.1),
    },
  },
  {
    id: 'tauren',
    faction: 'horde',
    name: 'Tauren',
    lore: 'A nomadic people close to nature from Mulgore, servants of the Earth Mother.',
    racials:
      'War Stomp (stuns nearby enemies for 2 sec), Cultivation (grows a duplicate of a nearby herb that you can gather without Herbalism), Plainsrunning (faster the longer you keep moving), Endurance (+5% health, +2% critical damage and healing).',
    traits: {
      racialPvp: rated(
        0.6,
        confirmed(
          ['dn', 'hero', 'wowhead-guide-hunter-beast-mastery', 'wowhead-guide-shaman-elemental'],
          'Can stun nearby enemies for 2 sec every 90 sec (War Stomp), and Endurance adds 5% health, but nothing frees you from stuns or fear. Guides call War Stomp a very strong area stun in PvP and PvE.',
        ),
      ),
      racialPve: rated(
        0.65,
        confirmed(
          ['hero', 'dn'],
          'More health and stronger critical hits at all times: 5% health and 2% critical damage and healing (Endurance); War Stomp stuns nearby enemies.',
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: unrated(1),
      aesthetic: unrated(0.3),
      novelty: unrated(0.1),
      themeLight: unrated(0.2),
      themeShadow: unrated(0),
      themeNature: unrated(1),
      themeArcane: unrated(0),
      themeHonor: unrated(0.6),
      themeTech: unrated(0),
    },
  },
  {
    id: 'troll',
    faction: 'horde',
    name: 'Troll',
    lore: 'Darkspear Trolls with a voodoo tradition; new in Forever as playable Warlocks.',
    racials:
      'Berserking (10% faster casting and attack speed for 10 sec), Rapid Regeneration (restores 50% health over time), Beast Slaying (+5% damage against beasts), Regeneration (+20% health regeneration, 20% of it continues in combat).',
    traits: {
      racialPvp: rated(
        0.4,
        confirmed(
          ['hero', 'wowhead-guide-warrior-protection', 'wowhead-guide-mage-frost'],
          'A burst window (Berserking) and a self-heal over time that stops on movement, action or damage (Rapid Regeneration). Guides find the heal useful mainly against classes without DoTs and hard to use when it matters most. Nothing frees you from stuns or fear.',
        ),
      ),
      racialPve: rated(
        0.8,
        confirmed(
          ['hero', 'wowhead-guide-hunter-beast-mastery', 'wowhead-guide-warrior-arms'],
          'Faster casting and attacks on demand: 10% casting and attack speed for 10 sec (Berserking). Guides call Berserking very strong for Hunters in PvE and Trolls the second-best Horde race for Warriors.',
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: unrated(0.75),
      aesthetic: unrated(0.25),
      novelty: unrated(0.1),
      themeLight: unrated(0),
      themeShadow: unrated(0.5),
      themeNature: unrated(0.6),
      themeArcane: unrated(0.1),
      themeHonor: unrated(0.4),
      themeTech: unrated(0),
    },
  },
  {
    id: 'skyborne-horde',
    faction: 'horde',
    name: 'Skyborne (Windshaper)',
    lore: "Shen'dorei, descendants of the first Skyborne, blessed by the wind spirits. They want to bring back the vanished air spirits; allied with the Earthen Ring.",
    racials:
      'Walk on Air (glide for 10 sec), Wind Blessed (+3% haste), Elemental Insight (+5% damage against elementals), Skysight (+10% movement speed).',
    traits: {
      racialPvp: rated(
        0.2,
        confirmed(
          ['hero', 'dn', 'wowhead-guide-shaman-enhancement'],
          'Mostly faster on the move: 10% movement speed (Skysight) and 3% haste (Wind Blessed); an Enhancement Shaman guide sees the strength of the Skyborne in the extra movement. There is no escape, cleanse or crowd control.',
        ),
      ),
      racialPve: rated(
        0.7,
        confirmed(
          ['dn', 'hero', 'wowhead-guide-rogue-assassination', 'wowhead-guide-hunter-beast-mastery'],
          'A steady haste bonus: 3% haste at all times (Wind Blessed) and 5% damage against elementals (Elemental Insight); Skysight adds only movement speed. Guides put Skyborne on par with Orcs for Rogues and on top against elementals for Hunters.',
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: unrated(0.55),
      aesthetic: unrated(0.9),
      novelty: rated(1, SKYBORNE_NOVELTY),
      themeLight: unrated(0),
      themeShadow: unrated(0),
      themeNature: unrated(0.9),
      themeArcane: unrated(0.4),
      themeHonor: unrated(0.3),
      themeTech: unrated(0),
    },
  },
  // Alliance
  {
    id: 'human',
    faction: 'alliance',
    name: 'Human',
    lore: 'The people of Stormwind, chivalry and faith in the Holy Light; new in Forever as playable Hunters.',
    racials:
      'Will to Survive (removes stuns), Perception (detects stealthed enemies for 20 sec), Ruthless (+2% critical strike chance), The Human Spirit (+5% Spirit, which speeds up regeneration).',
    traits: {
      racialPvp: rated(
        1,
        confirmed(
          ['hero', 'wowhead-guide-hunter-beast-mastery', 'wowhead-guide-mage-arcane'],
          'Breaks free of stuns (Will to Survive); guides compare it to a PvP trinket and call it a strong PvP racial.',
        ),
      ),
      racialPve: rated(
        0.8,
        confirmed(
          [
            'dn',
            'hero',
            'wowhead-guide-paladin-holy',
            'wowhead-guide-paladin-retribution',
            'wowhead-guide-rogue-assassination',
          ],
          'A steady bonus to critical hits and faster regeneration: 2% critical strike chance at all times (Ruthless) and 5% Spirit (The Human Spirit). Guides recommend Humans for Paladins and rate them close to the top for Rogues.',
        ),
      ),
      stunEscape: rated(1, confirmed(['hero'], 'Breaks free of stuns (Will to Survive).')),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: unrated(0.5),
      aesthetic: unrated(0.6),
      novelty: unrated(0.1),
      themeLight: unrated(0.8),
      themeShadow: unrated(0.1),
      themeNature: unrated(0.1),
      themeArcane: unrated(0.3),
      themeHonor: unrated(0.8),
      themeTech: unrated(0.2),
    },
  },
  {
    id: 'dwarf',
    faction: 'alliance',
    name: 'Dwarf',
    lore: 'A mountain people from Ironforge, explorers and smiths; new in Forever as playable Shamans.',
    racials:
      'Stoneform (removes bleeds, poisons and diseases and grants immunity to them, 10% less physical damage for 8 sec), Find Treasure (shows nearby treasure chests, also a chance to find additional items in most chests), Earth Fury (+2% critical damage and healing), Big Game Hunter (+5% damage against beasts).',
    traits: {
      racialPvp: rated(
        0.7,
        confirmed(
          ['hero', 'wowhead-guide-hunter-beast-mastery'],
          'Becomes immune to bleeds, poisons and diseases and takes less physical damage for 8 sec (Stoneform), but nothing frees you from stuns or fear; guides call Stoneform a good PvP racial against Rogues.',
        ),
      ),
      racialPve: rated(
        0.5,
        confirmed(
          ['dn', 'hero', 'wowhead-guide-shaman-enhancement', 'wowhead-guide-rogue-assassination'],
          'A bonus to critical hits and against beasts: 2% critical damage and healing (Earth Fury) and 5% damage against beasts (Big Game Hunter). Guides call Dwarves one of the weakest PvE picks for Enhancement Shamans and a bit behind most Alliance races for Rogues.',
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: unrated(0),
      selfCleanse: rated(1, confirmed(['hero'], 'Removes bleeds, poisons and diseases from yourself (Stoneform).')),
      size: unrated(0.2),
      aesthetic: unrated(0.3),
      novelty: unrated(0.1),
      themeLight: unrated(0.6),
      themeShadow: unrated(0),
      themeNature: unrated(0.3),
      themeArcane: unrated(0.1),
      themeHonor: unrated(0.8),
      themeTech: unrated(0.5),
    },
  },
  {
    id: 'gnome',
    faction: 'alliance',
    name: 'Gnome',
    lore: 'An inventive people from Gnomeregan; new in Forever as playable Priests.',
    racials:
      'Escape Artist (briefly immune to roots and snares), Eureka! (for 8 sec, damage abilities cost 10% less and deal 10% more damage; for Priests, healing abilities also cost 10% less and heal 10% more; periodic effects excluded), Expansive Mind (+5% maximum mana, rage or energy), Engineering Specialization (engineering devices are more reliable).',
    traits: {
      racialPvp: rated(
        0.85,
        confirmed(
          ['hero', 'wowhead-guide-priest-discipline', 'wowhead-guide-mage-arcane'],
          'Breaks roots and snares and is briefly immune to them (Escape Artist), but nothing frees you from stuns or fear. Guides call Escape Artist superb in PvP and name Gnomes one of the two Alliance PvP picks for Mages.',
        ),
      ),
      racialPve: rated(
        0.75,
        confirmed(
          [
            'dn',
            'hero',
            'wowhead-guide-priest-discipline',
            'wowhead-guide-priest-holy',
            'wowhead-guide-priest-shadow',
            'wowhead-guide-rogue-assassination',
          ],
          'A short burst and more resources: for 8 sec abilities cost 10% less and deal 10% more damage, for Priests also healing (Eureka!), plus 5% more maximum mana, rage or energy (Expansive Mind). Guides call Gnomes the Alliance pick for Priests and among the best Alliance races for Rogues.',
        ),
      ),
      stunEscape: rated(
        0.6,
        confirmed(
          ['hero', 'wowhead-guide-mage-arcane'],
          'Breaks roots and snares and is briefly immune to them (Escape Artist), but does not remove stuns.',
        ),
      ),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: rated(0, confirmed(['hero'], 'Gnomes are small in stature.')),
      aesthetic: unrated(0.5),
      novelty: unrated(0.1),
      themeLight: unrated(0.2),
      themeShadow: unrated(0.1),
      themeNature: unrated(0),
      themeArcane: unrated(0.8),
      themeHonor: unrated(0.1),
      themeTech: unrated(1),
    },
  },
  {
    id: 'night-elf',
    faction: 'alliance',
    name: 'Night Elf',
    lore: 'An ancient people from Teldrassil, guardians of nature and servants of Elune.',
    racials:
      "Elune's Light (+10% critical strike chance for 15 sec), Shadowmeld (stealthed while you stand still), Quickness (+1% dodge, +2% run speed), Wisp Spirit (75% faster while you are dead).",
    traits: {
      racialPvp: rated(
        0.5,
        confirmed(
          ['hero', 'wowhead-guide-rogue-assassination'],
          "A burst of critical hits and a way to hide: 10% critical strike chance for 15 sec (Elune's Light) and hiding while you stand still (Shadowmeld), which guides say discourages enemies from attacking you in combat. Nothing frees you from stuns, fear or roots.",
        ),
      ),
      racialPve: rated(
        0.75,
        community(
          [
            'wowhead-guide-warrior-arms',
            'wowhead-guide-warrior-fury',
            'wowhead-guide-hunter-beast-mastery',
            'wowhead-guide-druid-feral',
            'wowhead-guide-druid-restoration',
            'wowhead-guide-rogue-assassination',
          ],
          "A burst of critical hits: 10% critical strike chance for 15 sec (Elune's Light). Mainly for this, guides call Night Elves the best Alliance race for Warriors, possibly for Hunters, and one of the strongest for Druids; for Rogues they fall a bit behind most Alliance races.",
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: unrated(0.85),
      aesthetic: unrated(0.85),
      novelty: unrated(0.1),
      themeLight: unrated(0.3),
      themeShadow: unrated(0.3),
      themeNature: unrated(1),
      themeArcane: unrated(0.3),
      themeHonor: unrated(0.3),
      themeTech: unrated(0),
    },
  },
  {
    id: 'skyborne-alliance',
    faction: 'alliance',
    name: 'Skyborne (High Order)',
    lore: "Shen'dorei, descendants of the scholars of Eldre'Thalas. They want to reclaim arcane knowledge and become independent of the elementals; allied with the Kirin Tor.",
    racials:
      'Walk on Air (glide for 10 sec), Wind Blessed (+3% haste), Elemental Insight (+5% damage against elementals), Read Ley Line (+100% health and mana regeneration).',
    traits: {
      racialPvp: rated(
        0.15,
        confirmed(
          ['hero', 'dn', 'wowhead-guide-warrior-arms'],
          'Brings 3% haste (Wind Blessed); faster health and mana regeneration and a glide (Walk on Air) do little against players, and guides find the racials aimed at leveling rather than the endgame. There is no escape, cleanse or crowd control.',
        ),
      ),
      racialPve: rated(
        0.7,
        confirmed(
          ['dn', 'wowhead-guide-mage-arcane', 'wowhead-guide-rogue-assassination', 'wowhead-guide-druid-restoration'],
          'Brings 3% haste (Wind Blessed) and Read Ley Line, which guides call a strong mana cooldown for Druids. Guides also call Skyborne possibly the best Alliance pick for Arcane Mages and close to Humans and Gnomes for Rogues.',
        ),
      ),
      stunEscape: unrated(0),
      fearEscape: unrated(0),
      selfCleanse: unrated(0),
      size: unrated(0.55),
      aesthetic: unrated(0.9),
      novelty: rated(1, SKYBORNE_NOVELTY),
      themeLight: unrated(0),
      themeShadow: unrated(0),
      themeNature: unrated(0.3),
      themeArcane: unrated(1),
      themeHonor: unrated(0.2),
      themeTech: unrated(0),
    },
  },
] satisfies (RaceBase & { id: RaceKey })[];

/** A race without texts; the texts bind to it (`RACE_TEXTS`). */
export type RaceEntry = WithEvidence<(typeof RACE_BASES)[number]>;

/** English name, lore, racials and notes sit in the base list above; the German texts live in `src/i18n/de/entities/races.ts`. */
export const RACES: Race[] = RACE_BASES.map((r) => {
  const de: RaceTextsRuntime = DE[r.id];
  const { values, evidence } = splitPairs(r.traits);
  return {
    ...r,
    id: raceId(r.id),
    traits: traitProfile(values),
    ...localize(r, de, ['name', 'lore', 'racials']),
    ...(Object.keys(evidence).length > 0 ? { evidence: withGerman(evidence, de.evidence ?? {}) } : {}),
  };
});
