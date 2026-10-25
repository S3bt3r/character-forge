import type { QuestionDef } from '../display';
import { LEVELING_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/leveling';
import { buildQuestions, opt, question, spec } from './helpers';

const LEVELING_DRAFTS = [
  question(
    'leveling-speed',
    'leveling',
    {
      text: 'How important is leveling solo quickly and safely to you?',
      short: 'Solo leveling',
      help: 'The road to level 60 is long: the first 20 levels alone take about 20 hours on average.',
      mode: 'any',
      tier: 'core',
      single: true,
    },
    [
      opt(
        'very',
        {
          label: 'Very important',
          hint: 'You want to make quick progress and rarely die.',
        },
        [spec('soloLeveling', 1)],
      ),
      opt(
        'some',
        {
          label: 'Important, but not everything',
          hint: 'Speed is nice, but not a must.',
        },
        [spec('soloLeveling', 0.7)],
      ),
      opt(
        'no',
        {
          label: 'Not important',
          hint: "It's about the journey, and you enjoy the ride.",
        },
        [],
      ),
    ],
  ),
  question(
    'leveling-style',
    'leveling',
    {
      text: 'How do you want to level?',
      short: 'Leveling path',
      help: 'Experience comes mainly from quests. Dungeons are meant to be run more than once.',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      // No scoring of its own: playing solo is already asked in "How do you like to play?".
      opt(
        'quests',
        {
          label: 'Quests in the world',
          hint: "Completing quests and exploring the world. It suits every class and doesn't shift the result.",
        },
        [],
      ),
      opt(
        'dungeons',
        {
          label: 'Dungeons with a group',
          hint: 'You head with others through dangerous places full of enemies and treasure; Forever adds nine new dungeons from level 13.',
        },
        [spec('groupDemand', 1), spec('dungeonUtility', 0.7)],
      ),
      opt(
        'elite',
        {
          label: 'Beating elite enemies alone',
          hint: 'You also take on elite quests with especially strong enemies that are actually meant for groups.',
        },
        [spec('eliteSolo', 1)],
      ),
    ],
  ),
  question(
    'downtime',
    'leveling',
    {
      text: 'How often are you okay with resting after a fight?',
      short: 'Downtime',
      help: 'Many characters have to eat or drink between fights to restore health and mana.',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'none',
        {
          label: 'Ideally never',
          hint: 'You want to go straight from fight to fight.',
        },
        [spec('levelingDowntime', 0)],
      ),
      opt(
        'low',
        {
          label: 'Now and then',
          hint: 'A short breather every now and then is fine.',
        },
        [spec('levelingDowntime', 0.35)],
      ),
      opt(
        'regular',
        {
          label: 'Regularly',
          hint: 'For you, breaks are part of a cozy adventure.',
        },
        [spec('levelingDowntime', 0.7)],
      ),
    ],
  ),
  question(
    'gear-dependency',
    'leveling',
    {
      text: 'How much should your gear matter?',
      short: 'Gear',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'base',
        {
          label: 'Strong even without top gear',
          hint: 'You want to feel capable even with basic gear.',
        },
        [spec('gearDependency', 0.2)],
      ),
      opt(
        'scale',
        {
          label: 'Can scale a lot',
          hint: 'Chasing better gear and getting much stronger motivates you.',
        },
        [spec('gearDependency', 0.9)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type LevelingDrafts = typeof LEVELING_DRAFTS;

export const LEVELING: QuestionDef[] = buildQuestions(LEVELING_DRAFTS, DE);
