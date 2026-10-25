import type { SourceId } from '../../data/sources';

/** Title per source. */
export const SOURCE_TEXTS = {
  'deep-dive-hunter-druid': {
    title: 'Klassenübersicht: Jäger und Druide',
  },
  'deep-dive-priest-warrior': {
    title: 'Klassenübersicht: Priester und Krieger',
  },
  'deep-dive-mage-shaman': {
    title: 'Klassenübersichten: Magier und Schamane',
  },
  'deep-dive-rogue-warlock': {
    title: 'Klassenübersicht: Schurke und Hexenmeister',
  },
  'deep-dive-paladin': {
    title: 'Klassenüberblicke: Paladin',
  },
  'whats-next-panel': {
    title: 'Podiumsdiskussion: Wie geht es weiter',
  },
  'deep-dive-panel': {
    title: 'Zusammenfassung der Einblicke',
  },
  fp: {
    title: 'Podiumsdiskussion Found Photos',
  },
  rules: {
    title: 'Macht eure eigenen Regeln',
  },
  hero: {
    title: 'Erschafft den Helden, der ihr sein wollt',
  },
  skyborne: {
    title: 'Lernt die neuen Himmelsgeborenen kennen',
  },
  legacy: {
    title: 'Erfahrt mehr über das Vermächtnissystem',
  },
  pvp: {
    title: 'So funktioniert der PvP-Fortschritt',
  },
  darkspear: {
    title: 'Kämpft um die Darkspear-Inseln',
  },
  raids: {
    title: 'Schlachtzugszeitplan mit Orten, Größen und Einstimmung',
  },
  dungeons: {
    title: 'Erkundet die neuen Dungeons',
  },
  p1: {
    title: 'Entwickler-Podcast 1 (Himmelsgeborene, Leveling)',
  },
  p2: {
    title: 'Entwickler-Podcast 2 (Klassendesign)',
  },
  p3: {
    title: 'Entwickler-Podcast 3 (Dungeons & Raids)',
  },
  p4: {
    title: 'Entwickler-Podcast 4 (PvP)',
  },
  p5: {
    title: 'Entwickler-Podcast 5 (Special zum Beta-Ende)',
  },
  dn: {
    title: 'Beta Development Notes (Stand 15. Oktober)',
  },
  'wowhead-guide-druid-balance': {
    title: 'Wowhead-Guide: Druide, Gleichgewicht',
  },
  'wowhead-guide-druid-balance-abilities': {
    title: 'Wowhead-Guide: Druide, Gleichgewicht (Fähigkeiten)',
  },
  'wowhead-guide-druid-feral': {
    title: 'Wowhead-Guide: Druide, Wildheit (DPS)',
  },
  'wowhead-guide-druid-feral-abilities': {
    title: 'Wowhead-Guide: Druide, Wildheit (DPS, Fähigkeiten)',
  },
  'wowhead-guide-druid-feral-tank': {
    title: 'Wowhead-Guide: Druide, Wildheit (Tank)',
  },
  'wowhead-guide-druid-feral-tank-abilities': {
    title: 'Wowhead-Guide: Druide, Wildheit (Tank, Fähigkeiten)',
  },
  'wowhead-guide-druid-restoration': {
    title: 'Wowhead-Guide: Druide, Wiederherstellung',
  },
  'wowhead-guide-druid-restoration-abilities': {
    title: 'Wowhead-Guide: Druide, Wiederherstellung (Fähigkeiten)',
  },
  'wowhead-guide-hunter-marksmanship': {
    title: 'Wowhead-Guide: Jäger, Treffsicherheit',
  },
  'wowhead-guide-hunter-beast-mastery': {
    title: 'Wowhead-Guide: Jäger, Tierherrschaft',
  },
  'wowhead-guide-hunter-beast-mastery-abilities': {
    title: 'Wowhead-Guide: Jäger, Tierherrschaft (Fähigkeiten)',
  },
  'wowhead-guide-hunter-survival': {
    title: 'Wowhead-Guide: Jäger, Überleben',
  },
  'wowhead-guide-mage-arcane': {
    title: 'Wowhead-Guide: Magier, Arkan',
  },
  'wowhead-guide-mage-fire': {
    title: 'Wowhead-Guide: Magier, Feuer',
  },
  'wowhead-guide-mage-frost': {
    title: 'Wowhead-Guide: Magier, Frost',
  },
  'wowhead-guide-paladin-retribution': {
    title: 'Wowhead-Guide: Paladin, Vergeltung',
  },
  'wowhead-guide-paladin-retribution-abilities': {
    title: 'Wowhead-Guide: Paladin, Vergeltung (Fähigkeiten)',
  },
  'wowhead-guide-paladin-protection': {
    title: 'Wowhead-Guide: Paladin, Schutz',
  },
  'wowhead-guide-paladin-holy': {
    title: 'Wowhead-Guide: Paladin, Heilig',
  },
  'wowhead-guide-priest-shadow': {
    title: 'Wowhead-Guide: Priester, Schatten',
  },
  'wowhead-guide-priest-shadow-abilities': {
    title: 'Wowhead-Guide: Priester, Schatten (Fähigkeiten)',
  },
  'wowhead-guide-priest-discipline': {
    title: 'Wowhead-Guide: Priester, Disziplin',
  },
  'wowhead-guide-priest-discipline-abilities': {
    title: 'Wowhead-Guide: Priester, Disziplin (Fähigkeiten)',
  },
  'wowhead-guide-priest-holy': {
    title: 'Wowhead-Guide: Priester, Heilig',
  },
  'wowhead-guide-priest-holy-abilities': {
    title: 'Wowhead-Guide: Priester, Heilig (Fähigkeiten)',
  },
  'wowhead-guide-rogue-assassination': {
    title: 'Wowhead-Guide: Schurke, Meucheln',
  },
  'wowhead-guide-rogue-assassination-abilities': {
    title: 'Wowhead-Guide: Schurke, Meucheln (Fähigkeiten)',
  },
  'wowhead-guide-rogue-combat': {
    title: 'Wowhead-Guide: Schurke, Kampf',
  },
  'wowhead-guide-rogue-combat-abilities': {
    title: 'Wowhead-Guide: Schurke, Kampf (Fähigkeiten)',
  },
  'wowhead-guide-rogue-subtlety': {
    title: 'Wowhead-Guide: Schurke, Täuschung',
  },
  'wowhead-guide-rogue-subtlety-abilities': {
    title: 'Wowhead-Guide: Schurke, Täuschung (Fähigkeiten)',
  },
  'wowhead-guide-shaman-elemental': {
    title: 'Wowhead-Guide: Schamane, Elementar',
  },
  'wowhead-guide-shaman-enhancement': {
    title: 'Wowhead-Guide: Schamane, Verstärkung',
  },
  'wowhead-guide-shaman-restoration': {
    title: 'Wowhead-Guide: Schamane, Wiederherstellung',
  },
  'wowhead-guide-shaman-restoration-abilities': {
    title: 'Wowhead-Guide: Schamane, Wiederherstellung (Fähigkeiten)',
  },
  'wowhead-guide-warlock-affliction': {
    title: 'Wowhead-Guide: Hexenmeister, Gebrechen',
  },
  'wowhead-guide-warlock-affliction-abilities': {
    title: 'Wowhead-Guide: Hexenmeister, Gebrechen (Fähigkeiten)',
  },
  'wowhead-guide-warlock-demonology': {
    title: 'Wowhead-Guide: Hexenmeister, Dämonologie',
  },
  'wowhead-guide-warlock-demonology-abilities': {
    title: 'Wowhead-Guide: Hexenmeister, Dämonologie (Fähigkeiten)',
  },
  'wowhead-guide-warlock-destruction': {
    title: 'Wowhead-Guide: Hexenmeister, Zerstörung',
  },
  'wowhead-guide-warlock-destruction-abilities': {
    title: 'Wowhead-Guide: Hexenmeister, Zerstörung (Fähigkeiten)',
  },
  'wowhead-guide-warrior-arms': {
    title: 'Wowhead-Guide: Krieger, Waffen',
  },
  'wowhead-guide-warrior-fury': {
    title: 'Wowhead-Guide: Krieger, Furor',
  },
  'wowhead-guide-warrior-protection': {
    title: 'Wowhead-Guide: Krieger, Schutz',
  },
  'wowhead-guide-warrior-protection-abilities': {
    title: 'Wowhead-Guide: Krieger, Schutz (Fähigkeiten)',
  },
  'wowhead-guide-profession-alchemy': {
    title: 'Wowhead-Guide: Alchemie',
  },
  'wowhead-guide-profession-engineering': {
    title: 'Wowhead-Guide: Ingenieurskunst',
  },
  'wowhead-guide-profession-tailoring': {
    title: 'Wowhead-Guide: Schneiderei',
  },
  'wowhead-guide-profession-herbalism': {
    title: 'Wowhead-Guide: Kräuterkunde',
  },
  'wowhead-guide-profession-mining': {
    title: 'Wowhead-Guide: Bergbau',
  },
  'wowhead-guide-profession-skinning': {
    title: 'Wowhead-Guide: Kürschnerei',
  },
  'wowhead-guide-profession-first-aid': {
    title: 'Wowhead-Guide: Erste Hilfe',
  },
  'wowhead-guide-profession-fishing': {
    title: 'Wowhead-Guide: Angeln',
  },
  'wowhead-guide-profession-cooking': {
    title: 'Wowhead-Guide: Kochkunst',
  },
  'wowhead-spell-elemental-mastery': {
    title: 'Wowhead-Datenbank: Elementarmeisterschaft',
  },
  'wowhead-spell-feral-charge': {
    title: 'Wowhead-Datenbank: Wilde Attacke (Bär)',
  },
  'wowhead-spell-pyroclasm': {
    title: 'Wowhead-Datenbank: Pyroklasmus',
  },
  'wowhead-spell-instrument-of-law': {
    title: 'Wowhead-Datenbank: Rechtsvollstrecker',
  },
  'wowhead-spell-intimidation': {
    title: 'Wowhead-Datenbank: Einschüchterung',
  },
  'wowhead-spell-silent-resolve': {
    title: 'Wowhead-Datenbank: Schweigsame Entschlossenheit',
  },
  classic: {
    title: 'WoW Classic (nicht für Forever bestätigt)',
  },
} satisfies Record<SourceId, { title: string }>;
