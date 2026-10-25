import type { LocalizedText } from '../display';
import type { ChapterId } from '../../domain/questions';
import type { QuestionDef } from '../display';
import { checkConditions } from './helpers';
import { CHAPTER_TEXTS as DE } from '../../i18n/de/questions/chapters';
import { FOUNDATION } from './foundation';
import { COMBAT_FEEL } from './combat-feel';
import { DEALBREAKERS } from './dealbreakers';
import { SETTING } from './setting';
import { LEGACY_QUESTIONS } from './legacy';
import { LEVELING } from './leveling';
import { RACE_QUESTIONS } from './race';
import { TOOLKIT } from './toolkit';
import { PROFESSION_QUESTIONS } from './professions';
import { PVE } from './pve';
import { PVP } from './pvp';

/** Order = order of the tabs; the German translation lives in `src/i18n/de/questions/chapters.ts`. */
const CHAPTER_DEFS: { id: ChapterId; title: string; intro: string }[] = [
  { id: 'setting', title: 'Setting', intro: "Your faction. You can't change it later." },
  {
    id: 'foundation',
    title: 'Foundation',
    intro: 'The big decisions: your role, your combat range and how you survive.',
  },
  { id: 'combat-feel', title: 'Combat Feel', intro: 'How your attacks and powers should feel.' },
  { id: 'toolkit', title: 'Toolkit', intro: 'What you want to be able to do in combat and for your group.' },
  { id: 'leveling', title: 'Leveling', intro: 'The road from level 1 to 60.' },
  {
    id: 'pve',
    title: 'Dungeons & Raids',
    intro: 'Together with other players against groups of enemies and bosses (PvE).',
  },
  { id: 'pvp', title: 'PvP', intro: 'Fights against other players.' },
  { id: 'race', title: 'Race', intro: 'Culture, looks and innate talents.' },
  { id: 'dealbreakers', title: 'Deal-Breakers', intro: 'What would spoil the fun for you.' },
  { id: 'professions', title: 'Professions', intro: 'Time, gold and benefits.' },
  { id: 'legacy', title: 'Legacy', intro: 'Account-wide bonuses for your character.' },
];

export const CHAPTERS: { id: ChapterId; title: LocalizedText; intro: LocalizedText }[] = CHAPTER_DEFS.map(
  ({ id, title, intro }) => ({
    id,
    title: { en: title, de: DE[id].title },
    intro: { en: intro, de: DE[id].intro },
  }),
);

export const QUESTIONS: QuestionDef[] = checkConditions([
  ...SETTING,
  ...FOUNDATION,
  ...COMBAT_FEEL,
  ...TOOLKIT,
  ...LEVELING,
  ...PVE,
  ...PVP,
  ...RACE_QUESTIONS,
  ...DEALBREAKERS,
  ...PROFESSION_QUESTIONS,
  ...LEGACY_QUESTIONS,
]);
