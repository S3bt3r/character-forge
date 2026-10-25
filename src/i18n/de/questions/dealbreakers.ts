import type { GermanChapter } from '../../../data/questions/helpers';
import type { DealbreakersDrafts } from '../../../data/questions/dealbreakers';

/** German texts of the Deal-Breakers chapter, translation of the English texts in `src/data/questions/dealbreakers.ts`. */
export const DEALBREAKERS_CHAPTER_TEXTS = {
  'deal-breakers': {
    text: 'Was würde dir den Spaß verderben?',
    short: 'No-Go',
    help: 'Jedes gewählte No-Go zieht bei betroffenen Klassen Prozentpunkte ab. Sie bleiben sichtbar, rutschen aber nach unten.',
    options: {
      'no-selfheal': {
        label: 'Mich nicht selbst heilen können',
        hint: 'Ohne Hilfe anderer kannst du dich im Kampf nicht von Schaden erholen.',
        reasons: {
          selfHeal: 'Kaum Eigenheilung',
        },
      },
      'no-escape': {
        label: 'Kaum entkommen können',
        hint: 'Wenn es brenzlig wird, hast du wenig Mittel, um dich zu retten.',
        reasons: {
          escape: 'Wenig Fluchtmöglichkeiten',
        },
      },
      deadzone: {
        label: 'Schwach auf kurze Distanz',
        hint: 'Kommt ein Gegner ganz nah, kannst du ihn kaum noch angreifen.',
        reasons: {
          deadZone: 'Schwäche auf kurze Distanz',
        },
      },
      pet: {
        label: 'Ständig einen Begleiter lenken',
        hint: 'Du müsstest dauernd auf einen zweiten Kämpfer achten.',
        reasons: {
          petControl: 'Begleiter muss aktiv gesteuert werden',
        },
      },
      'no-kick': {
        label: 'Zauber nicht unterbrechen können',
        hint: 'Gefährliche gegnerische Zauber kannst du nicht stoppen.',
        reasons: {
          interrupt: 'Keine Unterbrechung',
        },
      },
      'no-slow': {
        label: 'Gegner nicht bremsen können',
        hint: 'Fliehende oder heranstürmende Gegner kannst du nicht verlangsamen.',
        reasons: {
          slow: 'Keine Verlangsamung',
        },
      },
      'no-cc': {
        label: 'Gegner kaum aufhalten können',
        hint: 'Du hast wenig Mittel, Gegner außer Gefecht zu setzen.',
        reasons: {
          cc: 'Kaum Kontrollfähigkeiten',
        },
      },
      downtime: {
        label: 'Nach fast jedem Kampf pausieren',
        hint: 'Du müsstest oft essen oder trinken, bevor es weitergeht.',
        reasons: {
          levelingDowntime: 'Viele Pausen beim Leveln',
        },
      },
      reagents: {
        label: 'Ständig Material nachkaufen',
        hint: 'Deine Fähigkeiten verbrauchen regelmäßig Munition oder andere Gegenstände.',
        reasons: {
          reagentDependency: 'Ständiger Materialbedarf',
        },
      },
      gear: {
        label: 'Ohne Top-Ausrüstung schwach sein',
        hint: 'Mit einfacher Ausrüstung fällst du deutlich hinter andere zurück.',
        reasons: {
          gearDependency: 'Sehr ausrüstungsabhängig',
        },
      },
      fragile: {
        label: 'Sehr zerbrechlich sein',
        hint: 'Du teilst viel aus, gehst aber schnell zu Boden.',
        reasons: {
          survivability: 'Wenig robust',
        },
      },
      'no-group': {
        label: 'Schwer eine Gruppe finden',
        hint: 'Gruppen suchen deine Rolle eher selten.',
        reasons: {
          groupDemand: 'In Gruppen wenig gefragt',
        },
      },
      'weak-solo': {
        label: 'Allein nur mühsam vorankommen',
        hint: 'Ohne Mitspieler kommst du nur langsam voran.',
        reasons: {
          soloLeveling: 'Mühsames Solo-Leveln',
        },
      },
      totems: {
        label: 'Hilfsobjekte aufstellen müssen',
        hint: 'Deine Stärke hinge davon ab, ständig Objekte am Boden zu platzieren.',
        reasons: {
          totems: 'Aufstellbare Hilfsobjekte sind Kern der Spielweise',
        },
      },
      shapeshift: {
        label: 'Ständig die Gestalt wechseln',
        hint: 'Du müsstest dich im Kampf immer wieder in Tiergestalten verwandeln.',
        reasons: {
          shapeshift: 'Gestaltwandel ist Kern der Spielweise',
        },
      },
      'tab-tank': {
        label: 'Mehrere Gegner einzeln an mich binden',
        hint: 'Als Tank müsstest du viele Gegner nacheinander anvisieren, statt alle auf einmal.',
        reasons: {
          tabTargetTank: 'Mehrere Gegner nur einzeln zu binden',
        },
      },
      'hybrid-tax': {
        label: 'Weniger Schaden für mehr Vielseitigkeit',
        hint: 'Wer mehrere Rollen beherrscht, macht etwa 5 % weniger Schaden.',
        reasons: {
          hybridTax: '~5 % weniger Schaden durch Vielseitigkeit',
        },
      },
    },
  },
} satisfies GermanChapter<DealbreakersDrafts>;
