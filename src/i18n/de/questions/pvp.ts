import type { GermanChapter } from '../../../data/questions/helpers';
import type { PvpDrafts } from '../../../data/questions/pvp';

/** German texts of the PvP chapter, translation of the English texts in `src/data/questions/pvp.ts`. */
export const PVP_CHAPTER_TEXTS = {
  'pvp-interest': {
    text: 'Wie wichtig sind dir Kämpfe gegen andere Spieler?',
    short: 'PvP',
    help: 'PvP heißt „Spieler gegen Spieler“. In Forever gibt es Battlegrounds, Kämpfe in der offenen Welt und ein Rangsystem, in dem du über eine Saison Rangpunkte sammelst.',
    options: {
      very: {
        label: 'Sehr wichtig, das ist mein Hauptinhalt',
        hint: 'Deine Antworten in diesem Kapitel zählen doppelt.',
      },
      some: {
        label: 'Gelegentlich',
        hint: 'Deine Antworten in diesem Kapitel zählen normal.',
      },
      no: {
        label: 'Gar nicht',
        hint: 'Das Kapitel zählt nicht.',
      },
    },
  },
  'pvp-type': {
    text: 'Wo willst du gegen andere Spieler bestehen?',
    short: 'PvP-Bereiche',
    options: {
      bg: {
        label: 'Battlegrounds im Team',
        hint: 'Teams treten in eigenen Gebieten an und kämpfen um Flaggen und Stützpunkte.',
      },
      world: {
        label: 'Offene Welt',
        hint: 'Spontane Kämpfe und Überfälle beim Erkunden.',
      },
      duel: {
        label: 'Duelle, auf mich allein gestellt',
        hint: 'Eins gegen eins: Du musst dich ohne Unterstützung behaupten.',
      },
      rank: {
        label: 'PvP-Rang erreichen',
        hint: 'Du sammelst über eine Saison Rangpunkte, um die höchsten Ränge und Belohnungen zu erreichen.',
      },
    },
  },
  'bg-role': {
    text: 'Was übernimmst du im Battleground?',
    short: 'Battleground-Rolle',
    options: {
      objective: {
        label: 'Ziele erobern und halten',
        hint: 'Du trägst die Flagge oder verteidigst wichtige Punkte.',
      },
      frontline: {
        label: 'In vorderster Reihe kämpfen',
        hint: 'Du stürmst voran und hältst dem Druck stand.',
      },
      isolate: {
        label: 'Gegnerische Heiler ausschalten',
        hint: 'Du suchst gezielt die Unterstützer des Gegners und schaltest sie aus.',
      },
      support: {
        label: 'Verbündete am Leben halten',
        hint: 'Du sorgst dafür, dass dein Team länger durchhält.',
      },
    },
  },
  'world-pvp': {
    text: 'Wie verhältst du dich, wenn dich in der Welt ein anderer Spieler angreift?',
    short: 'Angriff in der Welt',
    help: 'Beim PvP-Regelsatz gibt es keinen Schutz davor, wiederholt angegriffen zu werden.',
    options: {
      defender: {
        label: 'Ich stelle mich',
        hint: 'Du nimmst den Kampf an und willst ihn durchstehen.',
      },
      escape: {
        label: 'Ich entkomme',
        hint: 'Du willst dich zuverlässig in Sicherheit bringen können.',
      },
      stalker: {
        label: 'Ich greife selbst an',
        hint: 'Du lauerst lieber selbst im Verborgenen und schlägst überraschend zu.',
      },
    },
  },
} satisfies GermanChapter<PvpDrafts>;
