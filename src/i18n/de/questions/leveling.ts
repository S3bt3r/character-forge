import type { GermanChapter } from '../../../data/questions/helpers';
import type { LevelingDrafts } from '../../../data/questions/leveling';

/** German texts of the Leveling chapter, translation of the English texts in `src/data/questions/leveling.ts`. */
export const LEVELING_CHAPTER_TEXTS = {
  'leveling-speed': {
    text: 'Wie wichtig ist dir, allein schnell und sicher zu leveln?',
    short: 'Solo-Leveling',
    help: 'Der Weg bis Level 60 ist lang: Allein die ersten 20 Level dauern im Schnitt rund 20 Stunden.',
    options: {
      very: {
        label: 'Sehr wichtig',
        hint: 'Du willst zügig vorankommen und selten sterben.',
      },
      some: {
        label: 'Wichtig, aber nicht alles',
        hint: 'Tempo ist schön, aber kein Muss.',
      },
      no: {
        label: 'Unwichtig',
        hint: 'Der Weg ist das Ziel, du genießt die Reise.',
      },
    },
  },
  'leveling-style': {
    text: 'Wie willst du leveln?',
    short: 'Leveling-Weg',
    help: 'Erfahrung gibt es vor allem für Quests. Dungeons sind dafür gedacht, mehr als einmal gelaufen zu werden.',
    options: {
      quests: {
        label: 'Quests in der Welt',
        hint: 'Quests erledigen und die Welt erkunden. Das passt zu jeder Klasse und verschiebt das Ergebnis nicht.',
      },
      dungeons: {
        label: 'Dungeons mit einer Gruppe',
        hint: 'Du ziehst mit anderen durch gefährliche Orte voller Gegner und Schätze; Forever bringt neun neue Dungeons ab Level 13.',
      },
      elite: {
        label: 'Elite-Gegner allein bezwingen',
        hint: 'Du stellst dich auch Elite-Quests mit besonders starken Gegnern, die eigentlich für Gruppen gedacht sind.',
      },
    },
  },
  downtime: {
    text: 'Wie oft ist es für dich okay, nach einem Kampf zu pausieren?',
    short: 'Pausen',
    help: 'Viele Charaktere müssen zwischen Kämpfen essen oder trinken, um Gesundheit und Mana aufzufüllen.',
    options: {
      none: {
        label: 'Möglichst nie',
        hint: 'Du willst von Kampf zu Kampf durchziehen.',
      },
      low: {
        label: 'Ab und zu',
        hint: 'Eine kurze Verschnaufpause hin und wieder ist in Ordnung.',
      },
      regular: {
        label: 'Regelmäßig',
        hint: 'Pausen gehören für dich zum gemütlichen Abenteuer dazu.',
      },
    },
  },
  'gear-dependency': {
    text: 'Wie stark soll deine Ausrüstung zählen?',
    short: 'Ausrüstung',
    options: {
      base: {
        label: 'Auch ohne Top-Ausrüstung stark',
        hint: 'Du willst dich auch mit einfacher Ausrüstung kompetent fühlen.',
      },
      scale: {
        label: 'Darf stark mitwachsen',
        hint: 'Bessere Ausrüstung zu jagen und deutlich stärker zu werden, motiviert dich.',
      },
    },
  },
} satisfies GermanChapter<LevelingDrafts>;
