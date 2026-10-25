import type { PerkKey } from '../../../data/legacy';
import type { LiteralIds } from '../../../data/localize';

/** Name and effect per Legacy perk. */
export const PERK_TEXTS = {
  overtime: {
    name: 'Überstunden machen',
    summary:
      'Höhere Chance auf einen Fertigkeitspunkt in allen Berufen, auch in klassenspezifischen wie Schlossknacken.',
  },
  'bountiful-harvest': {
    name: 'Reiche Ernte',
    summary: 'Chance auf zusätzliche seltene Ressourcen bei Bergbau, Kräuterkunde und Kürschnerei.',
  },
  bartering: {
    name: 'Feilschen',
    summary:
      'Senkt den Goldpreis von Gegenständen, die du bei Händlern kaufst (nicht beim Lehrer und nicht für Reparaturen).',
  },
  'performance-bonus': {
    name: 'Leistungszulage',
    summary:
      'Manchmal zusätzliches Händlerwohlwollen bei den Berufsfraktionen Handelskommission von Azeroth (Allianz) und Versorgung und Logistik Durotar (Horde).',
  },
  'master-chef': {
    name: 'Meisterkoch',
    summary: 'Chance auf zusätzliche Ergebnisse beim Kochen.',
  },
  luremaster: {
    name: 'Ködermeister',
    summary: 'Chance auf zusätzliche Fische beim Angeln.',
  },
  'dedicated-study': {
    name: 'Konzentriertes Lernen',
    summary:
      'Einmal täglich ein Schub, der deine Berufsfertigkeit schneller steigert; sind alle Berufe auf 300, gibt es stattdessen Elementaressenzen.',
  },
  'well-rested': {
    name: 'Gut ausgeruht',
    summary: 'Der Ruhebonus wächst schneller an und erreicht eine höhere Obergrenze.',
  },
  thrill: {
    name: 'Nervenkitzel des Abenteuers',
    summary: 'Nach dem Besiegen eines ernstzunehmenden Gegners erhältst du etwas Gesundheit und Mana zurück.',
  },
  'high-alert': {
    name: 'Aufmerksamkeit',
    summary: 'Du entdeckst getarnte Gegner früher, außer in Battlegrounds.',
  },
  'field-guide': {
    name: 'Feldkompendium',
    summary: 'Kürzere Abklingzeit beim Platzieren von Lagergegenständen.',
  },
  'field-medic': {
    name: 'Feldmedizin',
    summary: 'Kürzere Wartezeit zwischen zwei Verbänden. Gilt nicht in Dungeons, Raids und Battlegrounds.',
  },
  talented: {
    name: 'Talentiert',
    summary: 'Schaltet Talentpunkte bis zu fünf Level früher frei.',
  },
  'frequent-flier': {
    name: 'Vielflieger',
    summary: 'Günstigere und schnellere Flugrouten.',
  },
  gourmand: {
    name: 'Feinschmecker',
    summary: 'Längere Dauer von Buffs durch Essen.',
  },
  'quick-and-the-dead': {
    name: 'Schneller als der Tod',
    summary:
      'Nach dem Tod läuft dein Geist schneller zum Körper zurück; Gruppen- und Raid-Buffs kosten nach der Wiederbelebung nichts.',
  },
  reinforce: {
    name: 'Verstärken',
    summary: 'Ausrüstung nutzt sich beim Tod weniger ab.',
  },
  'for-great-honor': {
    name: 'Große Ehre',
    summary: 'Mehr Ehre durch PvP.',
  },
  permanence: {
    name: 'Permanenz',
    summary: 'Längere Dauer von Gruppen-, Raid- und Lager-Buffs.',
  },
  diplomat: {
    name: 'Diplomat',
    summary: 'Höherer Rufgewinn.',
  },
  'reagent-economy': {
    name: 'Reagenzienwirtschaft',
    summary:
      'Klassenfähigkeiten brauchen keine kaufbaren Reagenzien (Verbrauchsmaterial für Zauber); Lagergegenstände der Stufe 1 brauchen keine Materialien.',
  },
} satisfies LiteralIds<PerkKey, Record<PerkKey, { name: string; summary: string }>>;
