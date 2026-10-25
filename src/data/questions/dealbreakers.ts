import type { QuestionDef } from '../display';
import { DEALBREAKERS_CHAPTER_TEXTS as DE } from '../../i18n/de/questions/dealbreakers';
import { buildQuestions, opt, question, specMax, specMin } from './helpers';

/*
 * Each chosen option is a deal-breaker of its own with a penalty (`SEVERITY_PENALTY`): "heavy" for things
 * that affect the play style structurally, "light" for convenience. The severity is an estimate.
 */
const DEALBREAKERS_DRAFTS = [
  question(
    'deal-breakers',
    'dealbreakers',
    {
      text: 'What would spoil the fun for you?',
      short: 'Deal-breaker',
      help: 'Each deal-breaker you pick deducts percentage points from the classes it affects. They stay visible but move down.',
      mode: 'all',
      tier: 'core',
    },
    [
      opt(
        'no-selfheal',
        {
          label: "Can't heal myself",
          hint: "Without help from others you can't recover from damage in a fight.",
        },
        [specMin('selfHeal', 0.4, 'heavy', 'Little self-healing')],
      ),
      opt(
        'no-escape',
        {
          label: 'Hardly any way to escape',
          hint: 'When things get dicey, you have few ways to save yourself.',
        },
        [specMin('escape', 0.4, 'light', 'Few escape options')],
      ),
      opt(
        'deadzone',
        {
          label: 'Weak at close range',
          hint: 'When an enemy gets very close, you can hardly attack it anymore.',
        },
        [specMax('deadZone', 0.5, 'heavy', 'Weakness at close range')],
      ),
      opt(
        'pet',
        {
          label: 'Constantly controlling a pet',
          hint: 'You would always have to keep an eye on a second fighter.',
        },
        [specMax('petControl', 0.6, 'heavy', 'Pet needs active control')],
      ),
      opt(
        'no-kick',
        {
          label: "Can't interrupt spells",
          hint: "You can't stop dangerous enemy spells.",
        },
        [specMin('interrupt', 0.3, 'light', 'No interrupt')],
      ),
      opt(
        'no-slow',
        {
          label: "Can't slow enemies",
          hint: "You can't slow down fleeing or charging enemies.",
        },
        [specMin('slow', 0.3, 'light', 'No slow')],
      ),
      opt(
        'no-cc',
        {
          label: 'Hardly any way to stop enemies',
          hint: 'You have few ways to put enemies out of action.',
        },
        [specMin('cc', 0.3, 'light', 'Little crowd control')],
      ),
      opt(
        'downtime',
        {
          label: 'Resting after almost every fight',
          hint: 'You would often have to eat or drink before moving on.',
        },
        [specMax('levelingDowntime', 0.6, 'light', 'Lots of downtime while leveling')],
      ),
      opt(
        'reagents',
        {
          label: 'Constantly restocking supplies',
          hint: 'Your abilities regularly use up ammo or other items.',
        },
        [specMax('reagentDependency', 0.5, 'light', 'Constant need for supplies')],
      ),
      opt(
        'gear',
        {
          label: 'Weak without top gear',
          hint: 'With basic gear you fall clearly behind others.',
        },
        [specMax('gearDependency', 0.8, 'heavy', 'Very gear-dependent')],
      ),
      opt(
        'fragile',
        {
          label: 'Being very fragile',
          hint: 'You deal a lot of damage but go down quickly.',
        },
        [specMin('survivability', 0.4, 'heavy', 'Not very sturdy')],
      ),
      opt(
        'no-group',
        {
          label: 'Hard to find a group',
          hint: 'Groups rarely look for your role.',
        },
        [specMin('groupDemand', 0.35, 'light', 'Rarely in demand for groups')],
      ),
      opt(
        'weak-solo',
        {
          label: 'Slow progress when playing alone',
          hint: 'Without other players you only make slow progress.',
        },
        [specMin('soloLeveling', 0.4, 'heavy', 'Tough solo leveling')],
      ),
      opt(
        'totems',
        {
          label: 'Having to place helper objects',
          hint: 'Your strength would depend on constantly placing objects on the ground.',
        },
        [specMax('totems', 0.5, 'heavy', 'Placeable helper objects are core to the play style')],
      ),
      opt(
        'shapeshift',
        {
          label: 'Constantly changing form',
          hint: 'You would have to turn into animal forms again and again in combat.',
        },
        [specMax('shapeshift', 0.5, 'heavy', 'Shapeshifting is core to the play style')],
      ),
      opt(
        'tab-tank',
        {
          label: 'Holding several enemies one by one',
          hint: 'As a tank you would have to target many enemies one after another instead of all at once.',
        },
        [specMax('tabTargetTank', 0.5, 'light', 'Several enemies can only be held one by one')],
      ),
      opt(
        'hybrid-tax',
        {
          label: 'Less damage for more versatility',
          hint: 'Those who master several roles deal about 5% less damage.',
        },
        [specMax('hybridTax', 0.5, 'heavy', '~5% less damage due to versatility')],
      ),
    ],
  ),
];

/** Shape of the drafts; the chapter's texts bind to it. */
export type DealbreakersDrafts = typeof DEALBREAKERS_DRAFTS;

export const DEALBREAKERS: QuestionDef[] = buildQuestions(DEALBREAKERS_DRAFTS, DE);
