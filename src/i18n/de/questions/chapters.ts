import type { ChapterId } from '../../../domain/questions';

/** German title and intro per chapter, translation of the English ones in `src/data/questions/index.ts`. */
export const CHAPTER_TEXTS = {
  setting: {
    title: 'Rahmen',
    intro: 'Deine Fraktion. Sie lässt sich später nicht mehr ändern.',
  },
  foundation: {
    title: 'Fundament',
    intro: 'Die großen Entscheidungen: deine Rolle, deine Kampfdistanz und wie du überlebst.',
  },
  'combat-feel': {
    title: 'Spielgefühl',
    intro: 'Wie sich deine Angriffe und Kräfte anfühlen sollen.',
  },
  toolkit: {
    title: 'Werkzeuge',
    intro: 'Was du im Kampf und für deine Gruppe können willst.',
  },
  leveling: {
    title: 'Leveln',
    intro: 'Der Weg von Level 1 bis 60.',
  },
  pve: {
    title: 'Dungeons & Raids',
    intro: 'Gemeinsam mit anderen Spielern gegen Gegnergruppen und Bosse (PvE).',
  },
  pvp: {
    title: 'PvP',
    intro: 'Kämpfe gegen andere Spieler.',
  },
  race: {
    title: 'Volk',
    intro: 'Kultur, Aussehen und angeborene Talente.',
  },
  dealbreakers: {
    title: 'No-Gos',
    intro: 'Was dir den Spaß verderben würde.',
  },
  professions: {
    title: 'Berufe',
    intro: 'Zeit, Gold und Nutzen.',
  },
  legacy: {
    title: 'Vermächtnis',
    intro: 'Accountweite Boni für deinen Charakter.',
  },
} satisfies Record<ChapterId, { title: string; intro: string }>;
