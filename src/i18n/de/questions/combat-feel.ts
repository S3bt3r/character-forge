import type { GermanChapter } from '../../../data/questions/helpers';
import type { CombatFeelDrafts } from '../../../data/questions/combat-feel';

/** German texts of the Combat Feel chapter, translation of the English texts in `src/data/questions/combat-feel.ts`. */
export const COMBAT_FEEL_CHAPTER_TEXTS = {
  resource: {
    text: 'Womit willst du deine Fähigkeiten antreiben?',
    short: 'Ressource',
    help: 'Jede Fähigkeit kostet etwas. Die Art dieser Energie prägt, wie sich dein Charakter anfühlt.',
    options: {
      mana: {
        label: 'Ein Vorrat, den du einteilst (Mana)',
        hint: 'Großer Vorrat, der langsam nachfüllt. Du planst, wann du welche Fähigkeit einsetzt.',
      },
      rage: {
        label: 'Zorn, der im Kampf wächst (Wut)',
        hint: 'Startet leer und füllt sich, wenn du triffst oder getroffen wirst.',
      },
      energy: {
        label: 'Schnell nachladend (Energie)',
        hint: 'Kleiner Vorrat, der sich ständig auffüllt. Du spielst in einem flotten Rhythmus.',
      },
    },
  },
  'damage-type': {
    text: 'Wie willst du Gegner besiegen?',
    short: 'Schadensart',
    options: {
      burst: {
        label: 'Mit einem Schlag (Burst)',
        hint: 'Viel Schaden in sehr kurzer Zeit. Gegner fallen, bevor sie reagieren können.',
      },
      dot: {
        label: 'Nach und nach (DoT)',
        hint: 'Schaden über Zeit: Du setzt Effekte, die den Gegner über mehrere Sekunden schwächen.',
      },
      weapon: {
        label: 'Mit stetigen Waffenschlägen',
        hint: 'Dein Schaden kommt vor allem aus regelmäßigen Angriffen mit der Waffe.',
      },
      proc: {
        label: 'Mit Glücksmomenten (Procs)',
        hint: 'Zufällige Auslöser verstärken dich kurz, und du reagierst schnell darauf.',
      },
    },
  },
  'weapon-style': {
    text: 'Womit kämpfst du am liebsten?',
    short: 'Waffenstil',
    options: {
      'two-hand': { label: 'Eine große Zweihandwaffe', hint: 'Wuchtige Schläge mit Axt, Schwert oder Streitkolben.' },
      dual: { label: 'Zwei Waffen', hint: 'In jeder Hand eine Klinge, schnelle Treffer.' },
      shield: { label: 'Waffe und Schild', hint: 'Eine Hand zum Schlagen, eine zum Schützen.' },
      ranged: { label: 'Bogen oder Gewehr', hint: 'Präzise Schüsse aus der Ferne.' },
      caster: { label: 'Stab und Zauber', hint: 'Die Waffe ist Nebensache, die Magie zählt.' },
    },
  },
  'healing-style': {
    text: 'Wie hältst du deine Verbündeten am liebsten am Leben?',
    short: 'Heilstil',
    options: {
      shields: {
        label: 'Schaden verhindern',
        hint: 'Schilde und Schutzeffekte fangen Schaden ab, bevor er trifft.',
      },
      group: {
        label: 'Die ganze Gruppe heilen',
        hint: 'Heilungen, die mehrere Verbündete gleichzeitig erreichen.',
      },
      direct: {
        label: 'Große, genau getimte Heilungen',
        hint: 'Starke Einzelheilungen im richtigen Moment.',
      },
      hots: {
        label: 'Heilung über Zeit',
        hint: 'Effekte, die über mehrere Sekunden weiterheilen.',
      },
    },
  },
  'damage-effects': {
    text: 'Welche besonderen Wirkungen soll dein Schaden haben?',
    short: 'Schadenswirkung',
    options: {
      'heal-reduction': {
        label: 'Heilung des Gegners schwächen',
        hint: 'Deine Angriffe sorgen dafür, dass sich Gegner schlechter heilen können.',
      },
      execute: {
        label: 'Fast besiegte Gegner beenden',
        hint: 'Besonders starke Angriffe gegen Gegner, die schon fast am Ende sind.',
      },
    },
  },
  targets: {
    text: 'Gegen wie viele Gegner kämpfst du gern gleichzeitig?',
    short: 'Gegnerzahl',
    options: {
      single: {
        label: 'Einen',
        hint: 'Voller Fokus auf ein einzelnes Ziel, etwa einen starken Boss.',
      },
      cleave: {
        label: 'Zwei bis drei',
        hint: 'Deine Angriffe treffen auch die Gegner direkt daneben.',
      },
      aoe: {
        label: 'Viele',
        hint: 'Du triffst ganze Gruppen auf einmal (Flächenschaden).',
      },
    },
  },
  complexity: {
    text: 'Wie fordernd soll das Spielen sein?',
    short: 'Anspruch',
    help: 'Forever setzt auf wenige Kernfähigkeiten plus gelegentliche starke Spezialfähigkeiten.',
    options: {
      relaxed: {
        label: 'Entspannt',
        hint: 'Wenige Tasten in ruhigem Tempo. Du hast den Kopf frei für das Geschehen.',
      },
      balanced: {
        label: 'Ausgewogen',
        hint: 'Eine überschaubare Auswahl in gleichmäßigem Takt.',
      },
      demanding: {
        label: 'Fordernd',
        hint: 'Viele Fähigkeiten in hohem Tempo. Das verlangt Übung und belohnt Können.',
      },
    },
  },
  positioning: {
    text: 'Von wo aus greifst du am liebsten an?',
    short: 'Angriffsposition',
    options: {
      frontal: {
        label: 'Im Nahkampf von vorn',
        hint: 'Du stellst dich dem Gegner im Nahkampf direkt von vorne.',
      },
      free: {
        label: 'Egal wo',
        hint: 'Deine Position spielt für deine Stärke keine Rolle.',
      },
      behind: {
        label: 'Von hinten',
        hint: 'Du schleichst dich hinter den Gegner, weil Angriffe dort stärker wirken.',
      },
    },
  },
  mechanics: {
    text: 'Welche Spielweisen findest du spannend?',
    short: 'Mechaniken',
    options: {
      direct: {
        label: 'Direkt und unkompliziert',
        hint: 'Fähigkeiten wirken sofort auf das Ziel, ohne Vorbereitung.',
      },
      zones: {
        label: 'Fallen und Bodeneffekte',
        hint: 'Du legst Fallen oder markierst Bereiche, in denen Gegner Schaden nehmen.',
      },
      totems: {
        label: 'Hilfsobjekte aufstellen',
        hint: 'Du platzierst Objekte am Boden, die dich und deine Gruppe in der Nähe stärken.',
      },
      shapeshift: {
        label: 'Gestalt wechseln',
        hint: 'Du verwandelst dich je nach Lage in verschiedene Tiergestalten.',
      },
    },
  },
  'power-theme': {
    text: 'Welche Kräfte faszinieren dich?',
    short: 'Kräfte',
    options: {
      light: {
        label: 'Das Licht',
        hint: 'Glaube, Hoffnung und strahlende Macht gegen die Finsternis.',
      },
      shadow: {
        label: 'Schatten und Tod',
        hint: 'Dunkle, verbotene Kräfte, die anderen Furcht einflößen.',
      },
      nature: {
        label: 'Natur und Tiere',
        hint: 'Verbundenheit mit Wäldern, Tieren und den Kräften der Wildnis.',
      },
      'arcane-magic': {
        label: 'Arkane Magie',
        hint: 'Reine magische Energie statt der Elemente: Du bündelst rohe Zauberkraft und entfesselst sie.',
      },
      fel: {
        label: 'Dämonische Mächte',
        hint: 'Gefährliche Pakte mit Wesen aus anderen Welten.',
      },
      martial: {
        label: 'Waffenkunst',
        hint: 'Disziplin, Training und Meisterschaft mit Klinge und Bogen.',
      },
      elements: {
        label: 'Die Elemente',
        hint: 'Feuer, Wasser, Erde und Luft als Verbündete.',
      },
    },
  },
  armor: {
    text: 'Welche Rüstung soll dein Charakter tragen?',
    short: 'Rüstung',
    options: {
      plate: {
        label: 'Schwere Plattenrüstung',
        hint: 'Glänzender Stahl von Kopf bis Fuß, ritterlich und wuchtig.',
      },
      mail: {
        label: 'Kettenrüstung',
        hint: 'Robuste Ringe aus Metall, ein guter Mittelweg.',
      },
      leather: {
        label: 'Lederrüstung',
        hint: 'Leicht und beweglich, ideal für flinke Kämpfer.',
      },
      cloth: {
        label: 'Stoffgewänder',
        hint: 'Roben und Gewänder, wie sie Gelehrte und Mystiker tragen.',
      },
    },
  },
} satisfies GermanChapter<CombatFeelDrafts>;
