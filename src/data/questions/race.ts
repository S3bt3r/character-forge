import type { QuestionDef } from '../display';
import { RACE_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/race';
import { buildQuestions, opt, question, race } from './helpers';

const RACE_DRAFTS = [
  question(
    'culture',
    'race',
    {
      text: 'Which culture should shape your race?',
      short: 'Culture',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'honor',
        {
          label: 'Honor and battle',
          hint: 'A proud people of fighters with their own code of honor.',
        },
        [race('themeHonor', 1)],
      ),
      opt(
        'nature',
        {
          label: 'Nature and spirits',
          hint: 'A people living in harmony with the land, animals and ancestors.',
        },
        [race('themeNature', 1)],
      ),
      opt(
        'arcane',
        {
          label: 'Magic and scholarship',
          hint: 'A people of researchers, libraries and ancient secrets.',
        },
        [race('themeArcane', 1)],
      ),
      opt(
        'shadow',
        {
          label: 'Death and shadow',
          hint: 'A grim people who have already faced death once.',
        },
        [race('themeShadow', 1)],
      ),
      opt(
        'light',
        {
          label: 'Light and faith',
          hint: 'A people with strong faith and noble ideals.',
        },
        [race('themeLight', 1)],
      ),
      opt(
        'tech',
        {
          label: 'Technology and invention',
          hint: 'A people of tinkerers, machines and bold experiments.',
        },
        [race('themeTech', 1)],
      ),
    ],
  ),
  question(
    'size',
    'race',
    {
      text: 'How tall should your character be?',
      short: 'Size',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'small',
        {
          label: 'Small',
          hint: 'Much smaller than most others, nimble and underestimated.',
        },
        [race('size', 0)],
      ),
      opt(
        'medium',
        {
          label: 'Medium',
          hint: 'Roughly human size.',
        },
        [race('size', 0.5)],
      ),
      opt(
        'large',
        {
          label: 'Large',
          hint: 'Tall or hulking, you tower over the others.',
        },
        [race('size', 1)],
      ),
    ],
  ),
  question(
    'aesthetic',
    'race',
    {
      text: 'What should your character look like?',
      short: 'Looks',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'elegant',
        {
          label: 'Elegant',
          hint: 'Graceful, well-kept and beautiful.',
        },
        [race('aesthetic', 1)],
      ),
      opt(
        'rough',
        {
          label: 'Rugged or grim',
          hint: 'Wild, fearsome or scarred.',
        },
        [race('aesthetic', 0)],
      ),
    ],
  ),
  // Scored as a tolerance; a race fits if it offers one of the chosen kinds of novelty.
  question(
    'novelty',
    'race',
    {
      text: 'What appeals to you when choosing your race?',
      short: 'Race choice',
      help: 'The Skyborne are a new race in Forever with their own starting area; depending on the faction they lean toward magic or nature. There are also new combinations of race and class.',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'skyborne',
        {
          label: 'The new race',
          hint: 'You want to play the Skyborne, who only exist in Forever.',
        },
        [race('novelty', 1)],
      ),
      opt(
        'new-combo',
        {
          label: 'A new combination',
          hint: 'A race and class pairing that only exists in Forever; every Skyborne pairing counts too.',
        },
        [race('newCombo', 1)],
      ),
      opt(
        'classic',
        {
          label: 'A classic race',
          hint: 'A race that has always been part of this world.',
        },
        [race('novelty', 0)],
      ),
    ],
  ),
  // Scored as a requirement; the race should bring every chosen kind of racial ability.
  question(
    'racial-focus',
    'race',
    {
      text: "What should your race's innate talents be able to do?",
      short: 'Racial abilities',
      help: 'Every race has its own abilities. They are still being reworked in the beta.',
      mode: 'all',
      tier: 'core',
    },
    [
      opt(
        'pvp',
        {
          label: 'Strong against players',
          hint: 'Talents that give you an edge in fights against other players.',
        },
        [race('racialPvp', 1)],
      ),
      opt(
        'pve',
        {
          label: 'Strong in PvE',
          hint: 'Talents that help you against NPCs, in dungeons and raids.',
        },
        [race('racialPve', 1)],
      ),
      opt(
        'stun',
        {
          label: 'Breaking free of stuns or roots',
          hint: 'You can break free when you are held in place or stunned.',
        },
        [race('stunEscape', 1)],
      ),
      opt(
        'fear',
        {
          label: 'Shaking off fear',
          hint: 'You can break free when something makes you panic.',
        },
        [race('fearEscape', 1)],
      ),
      opt(
        'cleanse',
        {
          label: 'Getting rid of poison and disease',
          hint: 'You can remove poisons, diseases or bleeds from yourself.',
        },
        [race('selfCleanse', 1)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type RaceDrafts = typeof RACE_DRAFTS;

export const RACE_QUESTIONS: QuestionDef[] = buildQuestions(RACE_DRAFTS, DE);
