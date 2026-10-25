import type { GermanChapter } from '../../../data/questions/helpers';
import type { PveDrafts } from '../../../data/questions/pve';

/** German texts of the Dungeons & Raids chapter, translation of the English texts in `src/data/questions/pve.ts`. */
export const PVE_CHAPTER_TEXTS = {
  'pve-interest': {
    text: 'Wie wichtig sind dir Dungeons und Raids?',
    short: 'Dungeons & Raids',
    help: 'Dungeons sind abgeschlossene Gebiete für fünf Spieler, Raids große Herausforderungen für 10 bis 40 Spieler mit mächtigen Bossen.',
    options: {
      very: {
        label: 'Sehr wichtig, ich will dabei sein',
        hint: 'Deine Antworten in diesem Kapitel zählen doppelt.',
      },
      some: {
        label: 'Gelegentlich',
        hint: 'Deine Antworten in diesem Kapitel zählen normal.',
      },
      no: {
        label: 'Kaum',
        hint: 'Das Kapitel zählt nicht.',
      },
    },
  },
  'group-content': {
    text: 'Welche Gruppeninhalte reizen dich?',
    short: 'Gruppeninhalte',
    options: {
      dungeons: {
        label: 'Dungeons',
        hint: 'Kleine Gruppe aus fünf Spielern: Jede Rolle zählt, viele Gegnergruppen.',
      },
      'small-raid': {
        label: 'Kleine Raids',
        hint: 'Zehn Spieler in einer eingespielten Gruppe gegen mächtige Bosse (Tiefengrabhügel).',
      },
      'large-raid': {
        label: 'Große Raids',
        hint: '20 oder 40 Spieler (Hyjalgipfel, Onyxias Hort), große Bosskämpfe und viel Koordination.',
      },
    },
  },
  'boss-role': {
    text: 'Was machst du im Bosskampf am liebsten?',
    short: 'Bosskampf',
    options: {
      dodge: {
        label: 'Gefahren ausweichen',
        hint: 'Ständig in Bewegung bleiben und trotzdem weiter wirken.',
      },
      adds: {
        label: 'Zusätzliche Gegner bändigen',
        hint: 'Herbeigerufene Gegner fesseln oder schnell beseitigen.',
      },
      steady: {
        label: 'Gleichmäßig Schaden halten',
        hint: 'Konzentriert auf den Boss, möglichst konstant und ohne Aussetzer.',
      },
      save: {
        label: 'Im Notfall retten',
        hint: 'Einspringen, wenn es kritisch wird: heilen, abfangen oder durchhalten.',
      },
    },
  },
  'dungeon-self-protection': {
    text: 'Wie willst du dich in Dungeons selbst schützen?',
    short: 'Selbstschutz',
    help: 'Manche neuen Dungeons bestrafen Gruppen spürbar, die Krankheiten oder Blutungen nicht loswerden.',
    options: {
      cleanse: {
        label: 'Mich selbst reinigen',
        hint: 'Du kannst schädliche Effekte zumindest von dir selbst entfernen.',
      },
      aggro: {
        label: 'Gegner von mir ablenken',
        hint: 'Wenn ein Gegner dich ins Visier nimmt, kannst du seine Aufmerksamkeit loswerden.',
      },
    },
  },
} satisfies GermanChapter<PveDrafts>;
