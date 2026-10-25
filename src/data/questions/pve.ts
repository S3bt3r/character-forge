import type { QuestionDef } from '../display';
import { PVE_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/pve';
import { buildQuestions, opt, question, spec } from './helpers';

const PVE_DRAFTS = [
  // Gate: awards no points itself, but controls how much this chapter counts.
  question(
    'pve-interest',
    'pve',
    {
      text: 'How important are dungeons and raids to you?',
      short: 'Dungeons & Raids',
      help: 'Dungeons are self-contained areas for five players, raids are big challenges for 10 to 40 players with powerful bosses.',
      gate: { mute: ['no'], boost: ['very'] },
    },
    [
      opt(
        'very',
        {
          label: 'Very important, I want to be there',
          hint: 'Your answers in this chapter count double.',
        },
        [],
      ),
      opt(
        'some',
        {
          label: 'Occasionally',
          hint: 'Your answers in this chapter count normally.',
        },
        [],
      ),
      opt(
        'no',
        {
          label: 'Hardly',
          hint: "The chapter doesn't count.",
        },
        [],
      ),
    ],
  ),
  // According to the developers, dungeons call for specific tools (e.g. removing diseases),
  // in raids buffs for many players count.
  question(
    'group-content',
    'pve',
    {
      text: 'Which group content appeals to you?',
      short: 'Group content',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'dungeons',
        {
          label: 'Dungeons',
          hint: 'A small group of five players: every role matters, lots of enemy packs.',
        },
        [spec('cc', 0.8), spec('dungeonUtility', 0.8)],
      ),
      opt(
        'small-raid',
        {
          label: 'Small raids',
          hint: 'Ten players in a well-coordinated group against powerful bosses (The Barrow Deeps).',
        },
        [spec('raidUtility', 0.7)],
      ),
      opt(
        'large-raid',
        {
          label: 'Large raids',
          hint: "20 or 40 players (Hyjal Summit, Onyxia's Lair), big boss fights and lots of coordination.",
        },
        [spec('raidUtility', 1), spec('groupDemand', 0.8)],
      ),
    ],
  ),
  question(
    'boss-role',
    'pve',
    {
      text: 'What do you like doing most in a boss fight?',
      short: 'Boss fight',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'dodge',
        {
          label: 'Dodging dangers',
          hint: 'Staying on the move all the time and still getting things done.',
        },
        [spec('escape', 0.8), spec('range', 0.7)],
      ),
      opt(
        'adds',
        {
          label: 'Handling extra enemies',
          hint: 'Locking down summoned enemies or taking them out quickly.',
        },
        [spec('cc', 0.8), spec('aoe', 0.8)],
      ),
      opt(
        'steady',
        {
          label: 'Keeping damage steady',
          hint: 'Focused on the boss, as consistent as possible and without gaps.',
        },
        [spec('singleTarget', 1)],
      ),
      opt(
        'save',
        {
          label: 'Saving the day',
          hint: 'Stepping in when things get critical: healing, intercepting or holding out.',
        },
        [spec('hybridFlex', 0.8), spec('survivability', 0.8)],
      ),
    ],
  ),
  question(
    'dungeon-self-protection',
    'pve',
    {
      text: 'How do you want to protect yourself in dungeons?',
      short: 'Self-protection',
      help: "Some new dungeons noticeably punish groups that can't get rid of diseases or bleeds.",
      mode: 'all',
      tier: 'fine',
    },
    [
      opt(
        'cleanse',
        {
          label: 'Cleansing myself',
          hint: 'You can remove harmful effects at least from yourself.',
        },
        [spec('selfCleanse', 1)],
      ),
      opt(
        'aggro',
        {
          label: 'Shaking enemies off',
          hint: 'When an enemy targets you, you can shake off its attention.',
        },
        [spec('threatControl', 1)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type PveDrafts = typeof PVE_DRAFTS;

export const PVE: QuestionDef[] = buildQuestions(PVE_DRAFTS, DE);
