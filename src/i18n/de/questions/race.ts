import type { GermanChapter } from '../../../data/questions/helpers';
import type { RaceDrafts } from '../../../data/questions/race';

/** German texts of the Race chapter, translation of the English texts in `src/data/questions/race.ts`. */
export const RACE_CHAPTER_TEXTS = {
  culture: {
    text: 'Welche Kultur soll dein Volk prägen?',
    short: 'Kultur',
    options: {
      honor: {
        label: 'Ehre und Kampf',
        hint: 'Ein stolzes Volk von Kämpfern mit eigenem Ehrenkodex.',
      },
      nature: {
        label: 'Natur und Geister',
        hint: 'Ein Volk, das im Einklang mit Land, Tieren und Ahnen lebt.',
      },
      arcane: {
        label: 'Magie und Gelehrsamkeit',
        hint: 'Ein Volk von Forschern, Bibliotheken und uralten Geheimnissen.',
      },
      shadow: {
        label: 'Tod und Schatten',
        hint: 'Ein düsteres Volk, das dem Tod schon einmal begegnet ist.',
      },
      light: {
        label: 'Licht und Glaube',
        hint: 'Ein Volk mit starkem Glauben und edlen Idealen.',
      },
      tech: {
        label: 'Technik und Erfindungen',
        hint: 'Ein Volk von Tüftlern, Maschinen und kühnen Experimenten.',
      },
    },
  },
  size: {
    text: 'Wie groß soll dein Charakter sein?',
    short: 'Größe',
    options: {
      small: {
        label: 'Klein',
        hint: 'Deutlich kleiner als die meisten anderen, flink und unterschätzt.',
      },
      medium: {
        label: 'Mittel',
        hint: 'Etwa menschliche Größe.',
      },
      large: {
        label: 'Groß',
        hint: 'Hochgewachsen oder wuchtig, du überragst die anderen.',
      },
    },
  },
  aesthetic: {
    text: 'Wie soll dein Charakter aussehen?',
    short: 'Aussehen',
    options: {
      elegant: {
        label: 'Elegant',
        hint: 'Anmutig, gepflegt und schön.',
      },
      rough: {
        label: 'Rau oder düster',
        hint: 'Wild, furchteinflößend oder gezeichnet.',
      },
    },
  },
  novelty: {
    text: 'Was reizt dich bei der Wahl deines Volks?',
    short: 'Volkswahl',
    help: 'Die Himmelsgeborenen sind ein neues Volk in Forever mit eigenem Startgebiet; je nach Fraktion sind sie magisch oder naturverbunden geprägt. Außerdem gibt es neue Kombinationen aus Volk und Klasse.',
    options: {
      skyborne: {
        label: 'Das neue Volk',
        hint: 'Du willst die Himmelsgeborenen spielen, die es nur in Forever gibt.',
      },
      'new-combo': {
        label: 'Eine neue Kombination',
        hint: 'Eine Kombination aus Volk und Klasse, die es erst in Forever gibt; dazu zählt jede Kombination der Himmelsgeborenen.',
      },
      classic: {
        label: 'Ein klassisches Volk',
        hint: 'Ein Volk, das seit jeher zu dieser Welt gehört.',
      },
    },
  },
  'racial-focus': {
    text: 'Was sollen die angeborenen Talente deines Volkes können?',
    short: 'Volksfähigkeiten',
    help: 'Jedes Volk hat eigene Fähigkeiten. Sie werden in der Beta noch überarbeitet.',
    options: {
      pvp: {
        label: 'Stark gegen Spieler',
        hint: 'Talente, die dir im Kampf gegen andere Spieler einen Vorteil geben.',
      },
      pve: {
        label: 'Stark im PvE',
        hint: 'Talente, die dir gegen NPCs, in Dungeons und Raids helfen.',
      },
      stun: {
        label: 'Aus Betäubung oder Bewegungsunfähigkeit befreien',
        hint: 'Du kannst dich lösen, wenn du festgehalten oder betäubt wirst.',
      },
      fear: {
        label: 'Furcht abschütteln',
        hint: 'Du kannst dich befreien, wenn dich etwas in Panik versetzt.',
      },
      cleanse: {
        label: 'Gift und Krankheit loswerden',
        hint: 'Du kannst Gifte, Krankheiten oder Blutungen von dir entfernen.',
      },
    },
  },
} satisfies GermanChapter<RaceDrafts>;
