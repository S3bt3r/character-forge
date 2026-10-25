import type { GermanChapter } from '../../../data/questions/helpers';
import type { FoundationDrafts } from '../../../data/questions/foundation';

/** German texts of the Foundation chapter, translation of the English texts in `src/data/questions/foundation.ts`. */
export const FOUNDATION_CHAPTER_TEXTS = {
  role: {
    text: 'Welche Rolle willst du in einer Gruppe übernehmen?',
    short: 'Gruppenrolle',
    help: 'Wähle alle, mit denen du dich wohlfühlst. Jede Rolle ist in Forever gefragt und wertvoll.',
    options: {
      tank: {
        label: 'Beschützen (Tank)',
        hint: 'Du ziehst die Aufmerksamkeit der Gegner auf dich und hältst viel aus, damit die Gruppe sicher ist.',
      },
      healer: {
        label: 'Heilen (Heiler)',
        hint: 'Du hältst deine Mitspieler mit Heilzaubern am Leben und behältst den Überblick.',
      },
      melee: {
        label: 'Schaden aus nächster Nähe',
        hint: 'Du kämpfst direkt am Gegner mit Waffen oder Klauen und besiegst ihn schnell.',
      },
      ranged: {
        label: 'Schaden aus der Ferne',
        hint: 'Du greifst aus sicherem Abstand mit Zaubern oder Fernkampfwaffen an.',
      },
    },
  },
  distance: {
    text: 'Wie nah willst du am Gegner sein?',
    short: 'Kampfdistanz',
    options: {
      melee: {
        label: 'Ganz nah dran',
        hint: 'Mitten im Getümmel, in Reichweite deiner Waffe (bis etwa 5 Meter).',
      },
      mid: {
        label: 'Mittlere Entfernung',
        hint: 'Ein paar Schritte Abstand: nah genug zum Eingreifen, weit genug für den Überblick.',
      },
      max: {
        label: 'So weit weg wie möglich',
        hint: 'Du willst Gegner treffen, bevor sie dich erreichen (30 Meter und mehr).',
      },
      weave: {
        label: 'Ständig wechselnd',
        hint: 'Du springst flexibel zwischen Nahkampf und Fernkampf hin und her.',
      },
    },
  },
  defense: {
    text: 'Wie willst du am liebsten überleben?',
    short: 'Überleben',
    options: {
      stand: {
        label: 'Einstecken',
        hint: 'Schwere Rüstung, Schild und viel Gesundheit. Du stehst Treffer einfach durch.',
      },
      absorb: {
        label: 'Abwehren',
        hint: 'Schutzschilde, Ausweichen oder kurze Unverwundbarkeit verhindern den Schaden.',
      },
      selfheal: {
        label: 'Gegenheilen',
        hint: 'Du heilst dich selbst oder ziehst dem Gegner Gesundheit ab.',
      },
      kite: {
        label: 'Auf Abstand halten',
        hint: 'Du bremst, fesselst oder frierst Gegner ein, damit sie dich gar nicht erst erreichen.',
      },
    },
  },
  pet: {
    text: 'Möchtest du einen tierischen oder magischen Begleiter?',
    short: 'Begleiter',
    options: {
      none: {
        label: 'Lieber allein',
        hint: 'Kein Begleiter. Du verlässt dich nur auf deine eigenen Fähigkeiten.',
      },
      passive: {
        label: 'Begleiter im Hintergrund',
        hint: 'Ein Begleiter kämpft mit, du musst ihn aber kaum steuern.',
      },
      active: {
        label: 'Begleiter aktiv lenken',
        hint: 'Du gibst deinem Begleiter Befehle und nutzt gezielt seine Fähigkeiten.',
      },
    },
  },
  flex: {
    text: 'Spezialist oder Allrounder?',
    short: 'Vielseitigkeit',
    help: 'Derzeit ab Level 40 lassen sich zwei Spezialisierungen speichern und wechseln. Wer mehrere Rollen beherrscht, macht laut Entwicklern etwa 5 % weniger Schaden als reine Schadensverursacher.',
    options: {
      pure: {
        label: 'Spezialist',
        hint: 'Eine Rolle, dafür das Maximum. Vielseitigkeit ist dir nicht wichtig.',
      },
      dual: {
        label: 'Zwei Rollen zum Umschalten',
        hint: 'Du wechselst bei Bedarf zwischen zwei gespeicherten Spezialisierungen.',
      },
      hybrid: {
        label: 'Allrounder',
        hint: 'Du springst jederzeit ein und unterstützt die Gruppe, auch wenn dein Schaden etwas geringer ist.',
      },
    },
  },
  social: {
    text: 'Wie spielst du am liebsten?',
    short: 'Spielweise',
    options: {
      solo: {
        label: 'Allein',
        hint: 'Du erkundest die Welt in deinem eigenen Tempo, ohne auf andere zu warten.',
      },
      group: {
        label: 'Mit anderen',
        hint: 'Du spielst gern mit anderen und willst in Gruppen gefragt sein.',
      },
    },
  },
} satisfies GermanChapter<FoundationDrafts>;
