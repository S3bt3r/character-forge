import type { QuestionDef } from '../display';
import { PVP_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/pvp';
import { buildQuestions, opt, question, spec } from './helpers';

const PVP_DRAFTS = [
  // Gate: awards no points itself, but controls how much this chapter counts.
  question(
    'pvp-interest',
    'pvp',
    {
      text: 'How important are fights against other players to you?',
      short: 'PvP',
      help: 'PvP means "player versus player". Forever has battlegrounds, fights in the open world and a rank system where you earn Rank Points over a season.',
      gate: { mute: ['no'], boost: ['very'] },
    },
    [
      opt(
        'very',
        {
          label: "Very important, it's my main content",
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
          label: 'Not at all',
          hint: "The chapter doesn't count.",
        },
        [],
      ),
    ],
  ),
  // Scored as a requirement; the class should be good in all chosen areas.
  question(
    'pvp-type',
    'pvp',
    {
      text: 'Where do you want to hold your own against other players?',
      short: 'PvP areas',
      mode: 'all',
      tier: 'core',
    },
    [
      opt(
        'bg',
        {
          label: 'Battlegrounds as a team',
          hint: 'Teams compete in their own areas and fight over flags and bases.',
        },
        [spec('pvpBattleground', 1)],
      ),
      opt(
        'world',
        {
          label: 'Open world',
          hint: 'Spontaneous fights and ambushes while exploring.',
        },
        [spec('pvpWorld', 1)],
      ),
      opt(
        'duel',
        {
          label: 'Duels, on my own',
          hint: 'One on one: you have to hold your ground without support.',
        },
        [spec('pvpWorld', 1), spec('selfHeal', 0.7)],
      ),
      opt(
        'rank',
        {
          label: 'Reaching a PvP rank',
          hint: 'You earn Rank Points over a season to reach the highest ranks and rewards.',
        },
        [spec('pvpBattleground', 1), spec('groupDemand', 0.6)],
      ),
    ],
  ),
  question(
    'bg-role',
    'pvp',
    {
      text: 'What do you take on in a battleground?',
      short: 'Battleground role',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'objective',
        {
          label: 'Taking and holding objectives',
          hint: 'You carry the flag or defend important points.',
        },
        [spec('survivability', 1), spec('escape', 1)],
      ),
      opt(
        'frontline',
        {
          label: 'Fighting on the front line',
          hint: 'You charge ahead and stand up to the pressure.',
        },
        [spec('defStand', 1), spec('autoAttack', 0.6)],
      ),
      opt(
        'isolate',
        {
          label: 'Taking out enemy healers',
          hint: "You go after the enemy's supporters and take them out.",
        },
        [spec('burst', 1), spec('interrupt', 0.8)],
      ),
      opt(
        'support',
        {
          label: 'Keeping allies alive',
          hint: 'You make sure your team holds out longer.',
        },
        [spec('roleHealer', 1)],
      ),
    ],
  ),
  question(
    'world-pvp',
    'pvp',
    {
      text: 'What do you do when another player attacks you in the world?',
      short: 'Attacked in the world',
      help: 'On the PvP ruleset there is no protection from being attacked again and again.',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'defender',
        {
          label: 'I stand my ground',
          hint: 'You accept the fight and want to see it through.',
        },
        [spec('survivability', 1), spec('selfHeal', 0.7)],
      ),
      opt(
        'escape',
        {
          label: 'I get away',
          hint: 'You want to be able to reach safety reliably.',
        },
        [spec('escape', 1), spec('combatReset', 0.7)],
      ),
      opt(
        'stalker',
        {
          label: "I'm the one who attacks",
          hint: 'You would rather lurk in hiding yourself and strike by surprise.',
        },
        [spec('stealth', 1), spec('burst', 0.9)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type PvpDrafts = typeof PVP_DRAFTS;

export const PVP: QuestionDef[] = buildQuestions(PVP_DRAFTS, DE);
