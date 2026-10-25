import type { GermanChapter } from '../../../data/questions/helpers';
import type { SettingDrafts } from '../../../data/questions/setting';

/** German texts of the Setting chapter, translation of the English texts in `src/data/questions/setting.ts`. */
export const SETTING_CHAPTER_TEXTS = {
  faction: {
    text: 'Welcher Fraktion willst du dich anschließen?',
    short: 'Fraktion',
    help: 'Bestimmt, welche Völker du spielen kannst und mit wem du zusammenspielst.',
    options: {
      alliance: {
        label: 'Allianz',
        hint: 'Menschen, Zwerge, Gnome, Nachtelfen und der Hohe Orden der Himmelsgeborenen.',
      },
      horde: {
        label: 'Horde',
        hint: 'Orcs, Tauren, Trolle, Verlassene und die Windformer der Himmelsgeborenen.',
      },
    },
  },
  ruleset: {
    text: 'Auf welchem Regelwerk willst du spielen?',
    short: 'Regelwerk',
    help: 'In Forever wählst du statt eines Realms ein Regelwerk. Ein Charakter kann später nicht in ein anderes Regelwerk wechseln.',
    options: {
      normal: { label: 'Normal', hint: 'Questen und Erkunden; gegen andere Spieler kämpfst du nur, wenn du willst.' },
      pvp: { label: 'PvP', hint: 'Jeder Ausflug in umkämpftes Gebiet kann zum Kampf gegen andere Spieler werden.' },
      roleplay: { label: 'Rollenspiel', hint: 'Tauche mit Gleichgesinnten tiefer in die Welt von Azeroth ein.' },
      'roleplay-pvp': { label: 'Rollenspiel-PvP', hint: 'Rollenspiel mit den Gefahren des PvP-Regelwerks.' },
    },
  },
} satisfies GermanChapter<SettingDrafts>;
