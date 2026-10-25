import type { QuestionDef } from '../display';
import { COMBAT_FEEL_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/combat-feel';
import { buildQuestions, opt, question, spec } from './helpers';

const COMBAT_FEEL_DRAFTS = [
  question(
    'resource',
    'combat-feel',
    {
      text: 'What do you want to power your abilities?',
      short: 'Resource',
      help: 'Every ability costs something. The kind of energy shapes how your character feels.',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'mana',
        {
          label: 'A pool you budget (mana)',
          hint: 'A large pool that refills slowly. You plan when to use which ability.',
        },
        [spec('resMana', 1)],
      ),
      opt(
        'rage',
        {
          label: 'Fury that builds in combat (rage)',
          hint: 'Starts empty and fills up when you hit or get hit.',
        },
        [spec('resRage', 1)],
      ),
      opt(
        'energy',
        {
          label: 'Fast recharging (energy)',
          hint: 'A small pool that refills constantly. You play at a brisk rhythm.',
        },
        [spec('resEnergy', 1)],
      ),
    ],
  ),
  // Damage types scored as a tolerance: "I like these ways of dealing damage".
  question(
    'damage-type',
    'combat-feel',
    {
      text: 'How do you want to defeat enemies?',
      short: 'Damage type',
      mode: 'any',
      tier: 'core',
    },
    [
      opt(
        'burst',
        {
          label: 'In one blow (burst)',
          hint: 'Lots of damage in a very short time. Enemies fall before they can react.',
        },
        [spec('burst', 1)],
      ),
      opt(
        'dot',
        {
          label: 'Bit by bit (DoT)',
          hint: 'Damage over time: you apply effects that wear the enemy down over several seconds.',
        },
        [spec('dotDamage', 1)],
      ),
      opt(
        'weapon',
        {
          label: 'With steady weapon blows',
          hint: 'Your damage comes mostly from regular attacks with your weapon.',
        },
        [spec('autoAttack', 1)],
      ),
      opt(
        'proc',
        {
          label: 'With lucky moments (procs)',
          hint: 'Random triggers briefly empower you, and you react to them quickly.',
        },
        [spec('procs', 1)],
      ),
    ],
  ),
  // Weapon styles scored as a tolerance: "I like fighting this way"; several may fit.
  question(
    'weapon-style',
    'combat-feel',
    {
      text: 'What do you like to fight with?',
      short: 'Weapon style',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt('two-hand', { label: 'A big two-handed weapon', hint: 'Mighty blows with an axe, sword or mace.' }, [
        spec('weaponTwoHand', 1),
      ]),
      opt('dual', { label: 'Two weapons', hint: 'A blade in each hand, quick hits.' }, [spec('weaponDual', 1)]),
      opt('shield', { label: 'Weapon and shield', hint: 'One hand to strike, one to protect.' }, [
        spec('weaponShield', 1),
      ]),
      opt('ranged', { label: 'Bow or gun', hint: 'Precise shots from a distance.' }, [spec('weaponRanged', 1)]),
      opt('caster', { label: 'Staff and spells', hint: 'The weapon is secondary, the magic counts.' }, [
        spec('weaponCaster', 1),
      ]),
    ],
  ),
  // Healing styles scored as a tolerance; the healers' counterpart of damage-type, hence the same tier. Only specs
  // that heal others have values here, so it is left out for players whose role answer excludes healing.
  question(
    'healing-style',
    'combat-feel',
    {
      text: 'How do you like to keep your allies alive?',
      short: 'Healing style',
      mode: 'any',
      tier: 'core',
      appliesIf: { question: 'role', options: ['healer'] },
    },
    [
      opt(
        'shields',
        {
          label: 'Preventing damage',
          hint: 'Shields and protective effects stop damage before it lands.',
        },
        [spec('healAbsorb', 1)],
      ),
      opt(
        'group',
        {
          label: 'Healing the whole group',
          hint: 'Heals that reach several allies at once.',
        },
        [spec('healGroup', 1)],
      ),
      opt(
        'direct',
        {
          label: 'Big, well-timed heals',
          hint: 'Strong single heals at exactly the right moment.',
        },
        [spec('healDirect', 1)],
      ),
      opt(
        'hots',
        {
          label: 'Heals over time',
          hint: 'Effects that keep healing for several seconds.',
        },
        [spec('healHot', 1)],
      ),
    ],
  ),
  // Scored as a requirement; whoever picks several wants all of them.
  question(
    'damage-effects',
    'combat-feel',
    {
      text: 'What special effects should your damage have?',
      short: 'Damage effects',
      mode: 'all',
      tier: 'dynamic',
    },
    [
      opt(
        'heal-reduction',
        {
          label: "Weaken the enemy's healing",
          hint: 'Your attacks make enemies heal less effectively.',
        },
        [spec('healingReduction', 1)],
      ),
      opt(
        'execute',
        {
          label: 'Finish off nearly defeated enemies',
          hint: 'Especially strong attacks against enemies who are almost down.',
        },
        [spec('execute', 1)],
      ),
    ],
  ),
  question(
    'targets',
    'combat-feel',
    {
      text: 'How many enemies do you like to fight at once?',
      short: 'Number of enemies',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'single',
        {
          label: 'One',
          hint: 'Full focus on a single target, such as a strong boss.',
        },
        [spec('singleTarget', 1)],
      ),
      opt(
        'cleave',
        {
          label: 'Two or three',
          hint: 'Your attacks also hit the enemies right next to your target.',
        },
        [spec('aoe', 0.6)],
      ),
      opt(
        'aoe',
        {
          label: 'Many',
          hint: 'You hit whole groups at once (AoE damage).',
        },
        [spec('aoe', 1)],
      ),
    ],
  ),
  // Bundles the number of buttons and the input pace as one "demand"; for the specs both are closely linked.
  question(
    'complexity',
    'combat-feel',
    {
      text: 'How demanding should playing be?',
      short: 'Challenge',
      help: 'Forever relies on a few core abilities plus occasional powerful special abilities.',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'relaxed',
        {
          label: 'Relaxed',
          hint: 'Few buttons at a calm pace. Your mind stays free for what is happening.',
        },
        [spec('complexity', 0.2), spec('apm', 0.2)],
      ),
      opt(
        'balanced',
        {
          label: 'Balanced',
          hint: 'A manageable set of abilities at a steady rhythm.',
        },
        [spec('complexity', 0.5), spec('apm', 0.5)],
      ),
      opt(
        'demanding',
        {
          label: 'Demanding',
          hint: 'Many abilities at a high pace. It takes practice and rewards skill.',
        },
        [spec('complexity', 0.9), spec('apm', 0.9)],
      ),
    ],
  ),
  question(
    'positioning',
    'combat-feel',
    {
      text: 'Where do you prefer to attack from?',
      short: 'Attack position',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'frontal',
        {
          label: 'Up close, from the front',
          hint: 'You face the enemy head on in melee.',
        },
        [spec('positional', 0), spec('range', 0)],
      ),
      opt(
        'free',
        {
          label: 'Anywhere',
          hint: "Your position doesn't matter for your strength.",
        },
        [spec('positional', 0)],
      ),
      opt(
        'behind',
        {
          label: 'From behind',
          hint: 'You sneak behind the enemy because attacks are stronger there.',
        },
        [spec('positional', 1)],
      ),
    ],
  ),
  question(
    'mechanics',
    'combat-feel',
    {
      text: 'Which play styles do you find exciting?',
      short: 'Mechanics',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'direct',
        {
          label: 'Direct and simple',
          hint: 'Abilities hit the target right away, without setup.',
        },
        [spec('groundZones', 0), spec('totems', 0), spec('shapeshift', 0)],
      ),
      opt(
        'zones',
        {
          label: 'Traps and ground effects',
          hint: 'You set traps or mark areas where enemies take damage.',
        },
        [spec('groundZones', 1)],
      ),
      opt(
        'totems',
        {
          label: 'Placing helper objects',
          hint: 'You place objects on the ground that empower you and your group nearby.',
        },
        [spec('totems', 1)],
      ),
      opt(
        'shapeshift',
        {
          label: 'Shapeshifting',
          hint: 'You turn into different animal forms depending on the situation.',
        },
        [spec('shapeshift', 1)],
      ),
    ],
  ),
  question(
    'power-theme',
    'combat-feel',
    {
      text: 'Which powers fascinate you?',
      short: 'Powers',
      mode: 'any',
      tier: 'dynamic',
    },
    [
      opt(
        'light',
        {
          label: 'The Light',
          hint: 'Faith, hope and radiant power against the darkness.',
        },
        [spec('themeLight', 1)],
      ),
      opt(
        'shadow',
        {
          label: 'Shadow and death',
          hint: 'Dark, forbidden powers that strike fear into others.',
        },
        [spec('themeShadow', 1)],
      ),
      opt(
        'nature',
        {
          label: 'Nature and beasts',
          hint: 'A bond with forests, animals and the forces of the wild.',
        },
        [spec('themeNature', 1)],
      ),
      opt(
        'arcane-magic',
        {
          label: 'Arcane magic',
          hint: 'Pure magical energy rather than the elements: you gather raw spell power and unleash it.',
        },
        [spec('themeArcane', 1)],
      ),
      opt(
        'fel',
        {
          label: 'Demonic powers',
          hint: 'Dangerous pacts with beings from other worlds.',
        },
        [spec('themeFel', 1)],
      ),
      opt(
        'martial',
        {
          label: 'Weapon mastery',
          hint: 'Discipline, training and mastery of blade and bow.',
        },
        [spec('themeMartial', 1)],
      ),
      opt(
        'elements',
        {
          label: 'The elements',
          hint: 'Fire, water, earth and air as allies.',
        },
        [spec('themeElements', 1)],
      ),
    ],
  ),
  question(
    'armor',
    'combat-feel',
    {
      text: 'What armor should your character wear?',
      short: 'Armor',
      mode: 'any',
      tier: 'fine',
    },
    [
      opt(
        'plate',
        {
          label: 'Heavy plate armor',
          hint: 'Shining steel from head to toe, knightly and imposing.',
        },
        [spec('armor', 1)],
      ),
      opt(
        'mail',
        {
          label: 'Mail armor',
          hint: 'Sturdy metal rings, a good middle ground.',
        },
        [spec('armor', 0.55)],
      ),
      opt(
        'leather',
        {
          label: 'Leather armor',
          hint: 'Light and agile, ideal for nimble fighters.',
        },
        [spec('armor', 0.3)],
      ),
      opt(
        'cloth',
        {
          label: 'Cloth robes',
          hint: 'Robes and garments like scholars and mystics wear.',
        },
        [spec('armor', 0)],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type CombatFeelDrafts = typeof COMBAT_FEEL_DRAFTS;

export const COMBAT_FEEL: QuestionDef[] = buildQuestions(COMBAT_FEEL_DRAFTS, DE);
