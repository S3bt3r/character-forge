import type { QuestionDef } from '../display';
import { TOOLKIT_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/toolkit';
import { buildQuestions, opt, question, spec } from './helpers';

const TOOLKIT_DRAFTS = [
  question(
    'control',
    'toolkit',
    {
      text: 'Which ways of disrupting enemies do you need?',
      short: 'Disrupt enemies',
      help: "Not every class has all of these tools. Pick what you don't want to do without.",
      mode: 'all',
      tier: 'core',
    },
    [
      opt(
        'kick',
        {
          label: 'Interrupt spells',
          hint: 'You can stop an enemy spell before it finishes (often called a "kick").',
        },
        [spec('interrupt', 1)],
      ),
      opt(
        'stun',
        {
          label: 'Stun',
          hint: 'You put an enemy out of action for a few seconds.',
        },
        [spec('stun', 1)],
      ),
      opt(
        'slow',
        {
          label: 'Slow',
          hint: "You make enemies slower so they can't get away from you or reach you.",
        },
        [spec('slow', 1)],
      ),
      opt(
        'lockdown',
        {
          label: 'Disable for longer',
          hint: 'You take an enemy out for a while, for example with charm, fear or traps.',
        },
        [spec('cc', 1)],
      ),
    ],
  ),
  // Scored as a requirement; the class should bring every chosen tool.
  question(
    'tactical',
    'toolkit',
    {
      text: 'Which tactical abilities do you need?',
      short: 'Tactics',
      mode: 'all',
      tier: 'dynamic',
    },
    [
      opt(
        'reset',
        {
          label: 'Escape from combat',
          hint: 'In tight spots you can get out of a fight that is going wrong.',
        },
        [spec('combatReset', 1)],
      ),
      opt(
        'stealth',
        {
          label: 'Sneak unseen',
          hint: 'You move unseen and decide for yourself when the fight begins.',
        },
        [spec('stealth', 1)],
      ),
      opt(
        'travel',
        {
          label: 'Travel fast',
          hint: 'You get from A to B quickly without a mount or detours.',
        },
        [spec('escape', 1)],
      ),
    ],
  ),
  // Scored as a requirement; buffs and services rate different traits, so whoever wants summons does not get just buffs.
  question(
    'utility-tasks',
    'toolkit',
    {
      text: 'Which kinds of help do you want to offer your group?',
      short: 'Group utility',
      help: 'Some classes have abilities that make life easier for others. In Forever, summoning is especially valuable, meaning bringing other players to you.',
      mode: 'all',
      tier: 'dynamic',
    },
    [
      opt(
        'buffs',
        {
          label: 'Buff the group',
          hint: 'You give your allies lasting improvements or protection (buffs).',
        },
        [spec('raidUtility', 1)],
      ),
      opt(
        'services',
        {
          label: 'Offer services',
          hint: 'You bring other players to you (summon), take them to other places or supply them with food and water.',
        },
        [spec('services', 1)],
      ),
      opt(
        'rez',
        {
          label: 'Resurrect and cleanse',
          hint: 'You bring fallen allies back and remove diseases, poisons or curses.',
        },
        [spec('dungeonUtility', 1)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type ToolkitDrafts = typeof TOOLKIT_DRAFTS;

export const TOOLKIT: QuestionDef[] = buildQuestions(TOOLKIT_DRAFTS, DE);
