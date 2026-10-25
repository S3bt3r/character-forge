import type { GermanChapter } from '../../../data/questions/helpers';
import type { ToolkitDrafts } from '../../../data/questions/toolkit';

/** German texts of the Toolkit chapter, translation of the English texts in `src/data/questions/toolkit.ts`. */
export const TOOLKIT_CHAPTER_TEXTS = {
  control: {
    text: 'Welche Möglichkeiten, Gegner zu stören, brauchst du?',
    short: 'Gegner stören',
    help: 'Nicht jede Klasse hat alle diese Werkzeuge. Wähle, worauf du nicht verzichten willst.',
    options: {
      kick: {
        label: 'Zauber unterbrechen',
        hint: 'Du kannst einen gegnerischen Zauber abbrechen, bevor er fertig ist (oft „Kick“ genannt).',
      },
      stun: {
        label: 'Betäuben',
        hint: 'Du setzt einen Gegner für ein paar Sekunden außer Gefecht (oft „Stun“ genannt).',
      },
      slow: {
        label: 'Verlangsamen',
        hint: 'Du machst Gegner langsamer, damit sie dir nicht entkommen oder dich nicht erreichen.',
      },
      lockdown: {
        label: 'Länger kampfunfähig machen',
        hint: 'Du schaltest einen Gegner eine Weile aus, etwa durch Bezauberung, Furcht oder Fallen.',
      },
    },
  },
  tactical: {
    text: 'Welche taktischen Fähigkeiten brauchst du?',
    short: 'Taktik',
    options: {
      reset: {
        label: 'Aus dem Kampf flüchten',
        hint: 'Du kannst dich in brenzligen Momenten aus einem Kampf lösen, der schiefläuft.',
      },
      stealth: {
        label: 'Unsichtbar schleichen',
        hint: 'Du bewegst dich ungesehen und entscheidest selbst, wann der Kampf beginnt.',
      },
      travel: {
        label: 'Schnell unterwegs sein',
        hint: 'Du kommst ohne Reittier oder Umwege flott von A nach B.',
      },
    },
  },
  'utility-tasks': {
    text: 'Welche Hilfen willst du deiner Gruppe bieten?',
    short: 'Gruppenhilfen',
    help: 'Manche Klassen haben Fähigkeiten, die anderen den Alltag erleichtern. In Forever ist besonders der Summon wertvoll, also Mitspieler zu dir zu holen.',
    options: {
      buffs: {
        label: 'Gruppe buffen',
        hint: 'Du verleihst deinen Mitspielern dauerhafte Verbesserungen oder Schutz (Buffs).',
      },
      services: {
        label: 'Dienste anbieten',
        hint: 'Du holst Mitspieler zu dir (Summon), bringst sie an andere Orte oder versorgst sie mit Essen und Trinken.',
      },
      rez: {
        label: 'Wiederbeleben und reinigen',
        hint: 'Du holst gefallene Mitspieler zurück und entfernst Krankheiten, Gifte oder Flüche.',
      },
    },
  },
} satisfies GermanChapter<ToolkitDrafts>;
