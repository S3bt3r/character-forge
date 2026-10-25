import type { GermanChapter } from '../../../data/questions/helpers';
import type { ProfessionsDrafts } from '../../../data/questions/professions';

/** German texts of the Professions chapter, translation of the English texts in `src/data/questions/professions.ts`. */
export const PROFESSIONS_CHAPTER_TEXTS = {
  'prof-time': {
    text: 'Wie viel Zeit willst du in Berufe stecken?',
    short: 'Berufe: Zeit',
    help: 'Mit Berufen sammelst du Rohstoffe oder stellst Gegenstände her. Accountweite Boni (Vermächtnis) können den Aufwand senken.',
    options: {
      low: {
        label: 'Wenig',
        hint: 'Nebenbei beim Erkunden, ohne extra Aufwand.',
      },
      mid: {
        label: 'Mittel',
        hint: 'Ab und zu gezielt sammeln oder herstellen.',
      },
      high: {
        label: 'Viel',
        hint: 'Berufe sind ein eigener Spielinhalt, in den du gern Zeit investierst.',
      },
    },
  },
  'prof-goal': {
    text: 'Was sollen dir deine Berufe bringen?',
    short: 'Berufsziel',
    options: {
      gold: {
        label: 'Gold verdienen',
        hint: 'Du verkaufst Rohstoffe oder Waren an andere Spieler.',
      },
      pvp: {
        label: 'Vorteile gegen Spieler',
        hint: 'Bomben, Geräte und Hilfsmittel für Kämpfe gegen andere Spieler.',
      },
      pve: {
        label: 'Vorbereitung auf Bosse',
        hint: 'Tränke, Verbesserungen und Ausrüstung für Dungeons und Raids.',
      },
      leveling: {
        label: 'Hilfe beim Leveln',
        hint: 'Bessere Ausrüstung und Hilfsmittel schon auf dem Weg nach oben.',
      },
      campsite: {
        label: 'Lagerplätze ausstatten',
        hint: 'Du stellst Gegenstände her, die an Lagerfeuern der ganzen Gruppe helfen.',
      },
    },
  },
  'prof-budget': {
    text: 'Wie viel Gold kannst du ins Erlernen investieren?',
    short: 'Berufe: Gold',
    options: {
      low: {
        label: 'Wenig',
        hint: 'Der Beruf soll dich möglichst wenig kosten.',
      },
      mid: {
        label: 'Etwas',
        hint: 'Moderate Ausgaben sind in Ordnung.',
      },
      high: {
        label: 'Egal, was es kostet',
        hint: 'Du investierst, was nötig ist.',
      },
    },
  },
  'prof-trading': {
    text: 'Magst du es, mit anderen Spielern zu handeln?',
    short: 'Handel',
    options: {
      like: {
        label: 'Macht mir Spaß',
        hint: 'Im Auktionshaus kaufen und verkaufen ist für dich ein Spiel im Spiel.',
      },
      dislike: {
        label: 'Lieber vermeiden',
        hint: 'Du willst möglichst unabhängig vom Handel sein.',
      },
    },
  },
  'prof-explore': {
    text: 'Willst du seltene Rezepte und Materialien aufspüren?',
    short: 'Rezeptsuche',
    help: 'Forever bringt über 600 neue Rezepte, manche gut versteckt.',
    options: {
      yes: {
        label: 'Ja, das ist das Spannende',
        hint: 'Schatzsuche und seltene Funde motivieren dich.',
      },
      no: {
        label: 'Lieber planbar',
        hint: 'Du willst wissen, wo du was bekommst.',
      },
    },
  },
} satisfies GermanChapter<ProfessionsDrafts>;
