import type { QuestionDef } from '../display';
import { PROFESSIONS_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/professions';
import { buildQuestions, opt, profession, question } from './helpers';

const PROFESSIONS_DRAFTS = [
  question(
    'prof-time',
    'professions',
    {
      text: 'How much time do you want to put into professions?',
      short: 'Professions: time',
      help: 'With professions you gather materials or craft items. Account-wide bonuses (Legacy) can reduce the effort.',
      mode: 'any',
      tier: 'core',
      single: true,
    },
    [
      opt(
        'low',
        {
          label: 'Little',
          hint: 'On the side while exploring, without extra effort.',
        },
        [profession('timeCost', 0)],
      ),
      opt(
        'mid',
        {
          label: 'Some',
          hint: 'Gathering or crafting on purpose now and then.',
        },
        [profession('timeCost', 0.5)],
      ),
      opt(
        'high',
        {
          label: 'A lot',
          hint: 'Professions are content of their own that you like to invest time in.',
        },
        [profession('timeCost', 1)],
      ),
    ],
  ),
  // Scored as a requirement; the pair should serve all chosen goals.
  question(
    'prof-goal',
    'professions',
    {
      text: 'What should your professions give you?',
      short: 'Profession goal',
      mode: 'all',
      tier: 'core',
    },
    [
      opt(
        'gold',
        {
          label: 'Earning gold',
          hint: 'You sell materials or goods to other players.',
        },
        [profession('goldIncome', 1)],
      ),
      opt(
        'pvp',
        {
          label: 'Edge against players',
          hint: 'Bombs, gadgets and tools for fights against other players.',
        },
        [profession('pvpValue', 1)],
      ),
      opt(
        'pve',
        {
          label: 'Preparing for bosses',
          hint: 'Potions, enhancements and gear for dungeons and raids.',
        },
        [profession('pveValue', 1)],
      ),
      opt(
        'leveling',
        {
          label: 'Help while leveling',
          hint: 'Better gear and tools already on the way up.',
        },
        [profession('levelingValue', 1)],
      ),
      opt(
        'campsite',
        {
          label: 'Equipping campsites',
          hint: 'You craft items that help the whole group at campfires.',
        },
        [profession('campsiteValue', 1)],
      ),
    ],
  ),
  question(
    'prof-budget',
    'professions',
    {
      text: 'How much gold can you invest in learning?',
      short: 'Professions: gold',
      mode: 'any',
      tier: 'dynamic',
      single: true,
    },
    [
      opt(
        'low',
        {
          label: 'Little',
          hint: 'The profession should cost you as little as possible.',
        },
        [profession('goldCost', 0)],
      ),
      opt(
        'mid',
        {
          label: 'Some',
          hint: 'Moderate spending is fine.',
        },
        [profession('goldCost', 0.5)],
      ),
      opt(
        'high',
        {
          label: 'Whatever it costs',
          hint: 'You invest whatever it takes.',
        },
        [],
      ),
    ],
  ),
  question(
    'prof-trading',
    'professions',
    {
      text: 'Do you like trading with other players?',
      short: 'Trading',
      mode: 'any',
      tier: 'fine',
      single: true,
    },
    [
      opt(
        'like',
        {
          label: "It's fun",
          hint: 'Buying and selling at the Auction House is a game within the game for you.',
        },
        [profession('auctionHouse', 1)],
      ),
      opt(
        'dislike',
        {
          label: 'Rather avoid it',
          hint: 'You want to be as independent from trading as possible.',
        },
        [profession('auctionHouse', 0)],
      ),
    ],
  ),
  question(
    'prof-explore',
    'professions',
    {
      text: 'Do you want to track down rare recipes and materials?',
      short: 'Recipe hunting',
      help: 'Forever adds over 600 new recipes, some of them well hidden.',
      mode: 'any',
      tier: 'fine',
      single: true,
    },
    [
      opt(
        'yes',
        {
          label: "Yes, that's the exciting part",
          hint: 'Treasure hunting and rare finds motivate you.',
        },
        [profession('exploration', 1)],
      ),
      opt(
        'no',
        {
          label: 'Rather predictable',
          hint: 'You want to know where to get what.',
        },
        [profession('exploration', 0)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type ProfessionsDrafts = typeof PROFESSIONS_DRAFTS;

export const PROFESSION_QUESTIONS: QuestionDef[] = buildQuestions(PROFESSIONS_DRAFTS, DE);
