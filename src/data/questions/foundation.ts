import type { QuestionDef } from '../display';
import { FOUNDATION_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/foundation';
import { buildQuestions, opt, question, spec } from './helpers';

const FOUNDATION_DRAFTS = [
  question(
    'role',
    'foundation',
    {
      text: 'Which role do you want to take on in a group?',
      short: 'Group role',
      help: "Pick every role you're comfortable with. Every role is in demand and valuable in Forever.",
      mode: 'any',
      tier: 'pillar',
    },
    [
      opt(
        'tank',
        {
          label: 'Protect (tank)',
          hint: 'You draw the enemies to yourself and take a lot of punishment to keep the group safe.',
        },
        [spec('roleTank', 1)],
      ),
      opt(
        'healer',
        {
          label: 'Heal (healer)',
          hint: 'You keep your allies alive with healing spells and keep an eye on everything.',
        },
        [spec('roleHealer', 1)],
      ),
      opt(
        'melee',
        {
          label: 'Damage up close',
          hint: 'You fight right next to the enemy with weapons or claws and take it down fast.',
        },
        [spec('roleMeleeDps', 1)],
      ),
      opt(
        'ranged',
        {
          label: 'Damage from range',
          hint: 'You attack from a safe distance with spells or ranged weapons.',
        },
        [spec('roleRangedDps', 1)],
      ),
    ],
  ),
  question(
    'distance',
    'foundation',
    {
      text: 'How close do you want to be to the enemy?',
      short: 'Combat range',
      mode: 'any',
      tier: 'pillar',
    },
    [
      opt(
        'melee',
        {
          label: 'Right up close',
          hint: 'In the thick of it, within reach of your weapon (up to about 5 yards).',
        },
        [spec('range', 0)],
      ),
      opt(
        'mid',
        {
          label: 'Medium range',
          hint: 'A few steps away: close enough to step in, far enough to keep an overview.',
        },
        [spec('range', 0.6)],
      ),
      opt(
        'max',
        {
          label: 'As far away as possible',
          hint: 'You want to hit enemies before they reach you (30 yards and more).',
        },
        [spec('range', 1)],
      ),
      opt(
        'weave',
        {
          label: 'Always switching',
          hint: 'You switch flexibly back and forth between melee and ranged.',
        },
        [spec('rangeWeave', 1)],
      ),
    ],
  ),
  question(
    'defense',
    'foundation',
    {
      text: 'How do you prefer to survive?',
      short: 'Survival',
      mode: 'any',
      tier: 'pillar',
    },
    [
      opt(
        'stand',
        {
          label: 'Take the hits',
          hint: 'Heavy armor, a shield and lots of health. You simply tank through the hits.',
        },
        [spec('defStand', 1)],
      ),
      opt(
        'absorb',
        {
          label: 'Ward it off',
          hint: 'Shields, dodging or brief invulnerability keep the damage from landing.',
        },
        [spec('defAbsorb', 1)],
      ),
      opt(
        'selfheal',
        {
          label: 'Heal through it',
          hint: 'You heal yourself or drain health from your enemy.',
        },
        [spec('selfHeal', 1)],
      ),
      opt(
        'kite',
        {
          label: 'Keep them at bay',
          hint: 'You slow, root or freeze enemies so they never reach you in the first place.',
        },
        [spec('defKite', 1)],
      ),
    ],
  ),
  question(
    'pet',
    'foundation',
    {
      text: 'Do you want an animal or magical companion?',
      short: 'Pet',
      mode: 'any',
      tier: 'pillar',
    },
    [
      opt(
        'none',
        {
          label: 'Rather alone',
          hint: 'No pet. You rely only on your own abilities.',
        },
        [spec('pet', 0)],
      ),
      opt(
        'passive',
        {
          label: 'Pet in the background',
          hint: 'A pet fights alongside you, but you barely need to control it.',
        },
        [spec('pet', 0.7), spec('petControl', 0.3)],
      ),
      opt(
        'active',
        {
          label: 'Actively control a pet',
          hint: 'You give your pet commands and use its abilities on purpose.',
        },
        [spec('pet', 1), spec('petControl', 1)],
      ),
    ],
  ),
  // One single choice for the trade-off between pure damage and versatility; as a requirement the two poles would
  // penalize each other.
  question(
    'flex',
    'foundation',
    {
      text: 'Specialist or all-rounder?',
      short: 'Versatility',
      help: 'Currently from level 40 you can save and switch between two specializations. According to the developers, those who master several roles deal about 5% less damage than pure damage dealers.',
      mode: 'any',
      tier: 'core',
      single: true,
    },
    [
      opt(
        'pure',
        {
          label: 'Specialist',
          hint: "One role, but at its best. Versatility isn't important to you.",
        },
        [spec('hybridFlex', 0), spec('hybridTax', 0)],
      ),
      opt(
        'dual',
        {
          label: 'Two roles to switch between',
          hint: 'You switch between two saved specializations when needed.',
        },
        [spec('hybridFlex', 0.6)],
      ),
      opt(
        'hybrid',
        {
          label: 'All-rounder',
          hint: 'You step in whenever needed and support the group, even if your damage is a bit lower.',
        },
        [spec('hybridFlex', 1), spec('raidUtility', 0.7)],
      ),
    ],
  ),
  // Scored as a tolerance: picking both solo and group means anything is fine and must not penalize a class that is
  // strong in both.
  question(
    'social',
    'foundation',
    {
      text: 'How do you like to play?',
      short: 'Play style',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'solo',
        {
          label: 'Solo',
          hint: 'You explore the world at your own pace without waiting for others.',
        },
        [spec('soloEndgame', 1)],
      ),
      opt(
        'group',
        {
          label: 'With others',
          hint: 'You like playing with others and want to be in demand for groups.',
        },
        [spec('groupDemand', 1)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type FoundationDrafts = typeof FOUNDATION_DRAFTS;

export const FOUNDATION: QuestionDef[] = buildQuestions(FOUNDATION_DRAFTS, DE);
