import type { QuestionDef } from '../display';
import { SETTING_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/setting';
import { buildQuestions, faction, opt, question, spec } from './helpers';

/** Constraint that cannot be changed later: the faction filters the playable races. */
const SETTING_DRAFTS = [
  question(
    'faction',
    'setting',
    {
      text: 'Which faction do you want to join?',
      short: 'Faction',
      help: 'Decides which races you can play and who you play with.',
      mode: 'any',
      tier: 'core',
      single: true,
    },
    [
      opt(
        'alliance',
        {
          label: 'Alliance',
          hint: 'Humans, Dwarves, Gnomes, Night Elves and the High Order Skyborne.',
        },
        [faction('alliance')],
      ),
      opt(
        'horde',
        {
          label: 'Horde',
          hint: 'Orcs, Tauren, Trolls, Forsaken and the Windshaper Skyborne.',
        },
        [faction('horde')],
      ),
    ],
  ),
  // Only the PvP rulesets score: there other players can attack you at any time, so standing your ground or getting
  // away matters even to players who skip the PvP chapter. Agreed: pvpWorld is also asked in the PvP chapter; on a PvP
  // ruleset it counts in addition, on purpose.
  question(
    'ruleset',
    'setting',
    {
      text: 'Which ruleset do you want to play on?',
      short: 'Ruleset',
      help: 'In Forever you choose a ruleset instead of a realm. A character cannot switch to another ruleset later.',
      mode: 'any',
      tier: 'dynamic',
      single: true,
    },
    [
      opt(
        'normal',
        { label: 'Normal', hint: 'Questing and exploring; you fight other players only when you choose to.' },
        [],
      ),
      opt(
        'pvp',
        { label: 'PvP', hint: 'Every trip into contested territory can turn into a fight with other players.' },
        [spec('pvpWorld', 1), spec('escape', 1, 0.5), spec('combatReset', 1, 0.5), spec('stealth', 1, 0.25)],
      ),
      opt('roleplay', { label: 'Roleplaying', hint: 'Lean into the fantasy of Azeroth with like-minded players.' }, []),
      opt('roleplay-pvp', { label: 'Roleplay-PvP', hint: 'Roleplaying with the dangers of the PvP ruleset.' }, [
        spec('pvpWorld', 1),
        spec('escape', 1, 0.5),
        spec('combatReset', 1, 0.5),
        spec('stealth', 1, 0.25),
      ]),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type SettingDrafts = typeof SETTING_DRAFTS;

export const SETTING: QuestionDef[] = buildQuestions(SETTING_DRAFTS, DE);
