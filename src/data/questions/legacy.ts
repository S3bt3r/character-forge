import type { QuestionDef } from '../display';
import { LEGACY_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/legacy';
import { buildQuestions, legacy, opt, question } from './helpers';

const LEGACY_DRAFTS = [
  // Scored as a tolerance; a perk fits if it serves one of the chosen focuses.
  question(
    'legacy-focus',
    'legacy',
    {
      text: 'What do you want to spend your Legacy points on?',
      short: 'Legacy',
      help: 'Legacy Challenges work like achievements and earn Legacy points for your whole account. Each character spends a limited number of them on permanent bonuses and can reassign them for a fee.',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'leveling',
        {
          label: 'Faster leveling',
          hint: 'Bonuses that shorten the road to level 60.',
        },
        [legacy('leveling', 1)],
      ),
      opt(
        'crafting',
        {
          label: 'Mastering professions',
          hint: 'Bonuses that help you improve faster in professions.',
        },
        [legacy('crafting', 1)],
      ),
      opt(
        'gold',
        {
          label: 'Saving and earning gold',
          hint: 'Bonuses that lower costs or bring extra income.',
        },
        [legacy('gold', 1)],
      ),
      opt(
        'pvp',
        {
          label: 'Fights against players',
          hint: 'Bonuses for more Honor and alertness toward other players.',
        },
        [legacy('pvp', 1)],
      ),
      opt(
        'group',
        {
          label: 'Buffing the group',
          hint: 'Bonuses that make buffs for your allies last longer.',
        },
        [legacy('group', 1)],
      ),
      opt(
        'convenience',
        {
          label: 'Comfort and travel',
          hint: 'Bonuses that make travel and small everyday annoyances easier.',
        },
        [legacy('convenience', 1)],
      ),
      opt(
        'reputation',
        {
          label: 'Building reputation',
          hint: 'Bonuses that help you gain reputation with factions faster.',
        },
        [legacy('reputation', 1)],
      ),
      opt(
        'campsite',
        {
          label: 'Campsites',
          hint: 'Bonuses around campfires and their items.',
        },
        [legacy('campsite', 1)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type LegacyDrafts = typeof LEGACY_DRAFTS;

export const LEGACY_QUESTIONS: QuestionDef[] = buildQuestions(LEGACY_DRAFTS, DE);
