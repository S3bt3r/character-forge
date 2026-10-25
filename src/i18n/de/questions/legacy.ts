import type { GermanChapter } from '../../../data/questions/helpers';
import type { LegacyDrafts } from '../../../data/questions/legacy';

/** German texts of the Legacy chapter, translation of the English texts in `src/data/questions/legacy.ts`. */
export const LEGACY_CHAPTER_TEXTS = {
  'legacy-focus': {
    text: 'Wofür willst du deine Vermächtnispunkte einsetzen?',
    short: 'Vermächtnis',
    help: 'Vermächtnisherausforderungen funktionieren wie Erfolge und bringen Vermächtnispunkte für deinen ganzen Account. Jeder Charakter setzt eine begrenzte Zahl davon für dauerhafte Boni ein und kann sie gegen Gebühr neu verteilen.',
    options: {
      leveling: {
        label: 'Schneller leveln',
        hint: 'Boni, die den Weg bis Level 60 verkürzen.',
      },
      crafting: {
        label: 'Berufe meistern',
        hint: 'Boni, mit denen du in Berufen schneller besser wirst.',
      },
      gold: {
        label: 'Gold sparen und verdienen',
        hint: 'Boni, die Kosten senken oder zusätzliche Erträge bringen.',
      },
      pvp: {
        label: 'Kämpfe gegen Spieler',
        hint: 'Boni für mehr Ehre und Wachsamkeit gegenüber anderen Spielern.',
      },
      group: {
        label: 'Die Gruppe buffen',
        hint: 'Boni, die Buffs für deine Mitspieler verlängern.',
      },
      convenience: {
        label: 'Komfort und Reisen',
        hint: 'Boni, die Reisen und kleine Alltagsärgernisse erleichtern.',
      },
      reputation: {
        label: 'Ruf aufbauen',
        hint: 'Boni, mit denen du bei Fraktionen schneller Ruf gewinnst.',
      },
      campsite: {
        label: 'Lagerplätze',
        hint: 'Boni rund um Lagerfeuer und ihre Gegenstände.',
      },
    },
  },
} satisfies GermanChapter<LegacyDrafts>;
