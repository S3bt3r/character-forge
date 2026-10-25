import { classic, community, confirmed, estimate } from '../evidence/helpers';
import { graded, rated, type ClassSpecs } from '../rated';

/**
 * Warlock: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const WARLOCK_SPECS = {
  traits: {
    apm: rated(
      0.35,
      estimate(
        'Long casts set the pace. Demonology fills with Shadow casts, marks targets for its demon and casts a faster big spell on low-health enemies; Destruction fills with Incinerate and uses its cooldowns when ready (Conflagrate, Shadowburn).',
      ),
    ),
    armor: rated(0, classic('Wears only cloth armor.')),
    cc: rated(
      0.75,
      confirmed(
        [
          'p3',
          'wowhead-guide-warlock-affliction-abilities',
          'wowhead-guide-warlock-demonology-abilities',
          'wowhead-guide-warlock-destruction-abilities',
        ],
        'Can fear or horrify enemies, banish demons and elementals, and have a demon seduce humanoids (Death Coil, Banish, Seduction); fear reaches 20 yards.',
        { p3: '51:47' },
      ),
    ),
    combatReset: rated(0.2, classic('Only fear and Death Coil help to break free.')),
    deadZone: rated(0, classic('No minimum range: every spell works up close.')),
    defAbsorb: rated(
      0.4,
      confirmed(
        [
          'dn',
          'wowhead-guide-warlock-affliction-abilities',
          'wowhead-guide-warlock-demonology-abilities',
          'wowhead-guide-warlock-destruction-abilities',
        ],
        'Two absorb shields: one scales with 10% of spell healing (Voidwalker Sacrifice), the other absorbs Shadow damage (Shadow Ward).',
      ),
    ),
    dungeonUtility: rated(
      0.25,
      classic(
        'Can place a stone on an ally in advance that lets them resurrect themselves after death (Soulstone), but cannot remove curses, poisons or diseases.',
      ),
    ),
    escape: rated(0.3, classic('Hardly any mobility.')),
    gearDependency: rated(
      0.5,
      confirmed(
        ['p2'],
        'The developers want spellcasters to care about their gear like melee classes do, with spell power gear from level 10.',
        { p2: '9:52' },
      ),
    ),
    groundZones: rated(0.3, classic('Rain of Fire as a ground spell.')),
    groupDemand: rated(
      0.45,
      confirmed(
        [
          'deep-dive-rogue-warlock',
          'p3',
          'wowhead-guide-warlock-affliction-abilities',
          'wowhead-guide-warlock-demonology-abilities',
          'wowhead-guide-warlock-destruction-abilities',
        ],
        'Deals damage that competes with any other spellcaster, and guides count Soulstone and summoning among what a raid wants from a Warlock; Meeting Stones do not summon, so that falls to the Warlock. Otherwise it fills only a damage spot.',
        { p3: '22:35' },
      ),
    ),
    healAbsorb: rated(0, classic('No ability heals others.')),
    healDirect: rated(0, classic('No ability heals others.')),
    healGroup: rated(0, classic('No ability heals others.')),
    healHot: rated(0, classic('No ability heals others.')),
    healingReduction: rated(0, classic('No way to reduce the healing an enemy receives.')),
    hybridFlex: rated(
      0,
      confirmed(['p2'], "Damage is the Warlock's only role; Warlocks explicitly don't count as hybrids.", {
        p2: '22:32',
      }),
    ),
    hybridTax: rated(
      0,
      confirmed(['p2'], "Warlocks don't count as hybrids, so there is no hybrid damage cost.", { p2: '22:18' }),
    ),
    interrupt: rated(0.5, confirmed(['deep-dive-rogue-warlock'], 'Interrupts through the Felhunter (Spell Lock).')),
    levelingDowntime: rated(0.15, confirmed(['deep-dive-rogue-warlock'], 'Life Tap scales with Spirit.')),
    positional: rated(0, classic('No ability needs a position.')),
    pvpBattleground: rated(
      0.7,
      confirmed(['p2'], 'Any Warlock build is meant to work in a battleground.', {
        p2: '1:02:10',
      }),
    ),
    pvpWorld: graded(
      { 'warlock-affliction': 1.0, 'warlock-demonology': 0.9, 'warlock-destruction': 0.75 },
      community(
        [
          'p2',
          'p5',
          'wowhead-guide-warlock-affliction',
          'wowhead-guide-warlock-demonology',
          'wowhead-guide-warlock-destruction',
          'deep-dive-rogue-warlock',
        ],
        'The developers accept SL/SL (an Affliction/Demonology hybrid) as a pure PvP build, and a Warlock won a PvP tournament. Affliction heals itself, Demonology has strong pets and survivability; Destruction has burst (Shadowburn, Conflagrate) but lacks that sustain.',
        { p2: '1:01:37', p5: '1:09:26' },
      ),
    ),
    raidUtility: rated(
      0.55,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Has a curse that works on all magic damage (Curse of the Elements), and the Imp brings a buff (Blood Pact).',
      ),
    ),
    range: rated(0.85, confirmed(['dn'], 'Casts from normal spell range; no Demonology talent extends it.')),
    rangeWeave: rated(0, classic('Casts from a fixed spell range and never switches to melee.')),
    reagentDependency: graded(
      { 'warlock-affliction': 0.55, 'warlock-demonology': 0.7, 'warlock-destruction': 0.65 },
      confirmed(
        [
          'deep-dive-rogue-warlock',
          'wowhead-guide-warlock-affliction-abilities',
          'wowhead-guide-warlock-demonology-abilities',
          'wowhead-guide-warlock-destruction-abilities',
        ],
        "Summoning demons costs Soul Shards, and a drain spell grants them. A Demonology talent makes Soul Fire a regular cast that costs a shard except on enemies below 35% health, Destruction spends one on an instant finisher, and Affliction's damage spells cost none.",
      ),
    ),
    resEnergy: rated(0, classic("Warlocks don't use energy.")),
    resMana: rated(
      1,
      confirmed(['deep-dive-rogue-warlock'], 'Mana is the main resource; Life Tap scales with Spirit.'),
    ),
    resRage: rated(0, classic("Warlocks don't use rage.")),
    roleHealer: rated(0, classic('No healing for others.')),
    roleMeleeDps: rated(0, classic('Warlocks do not fight in melee.')),
    roleRangedDps: rated(
      1,
      confirmed(['deep-dive-rogue-warlock'], 'All three specs should keep up in damage with every caster class.'),
    ),
    roleTank: rated(0, classic('Pure damage class without tank tools.')),
    selfCleanse: rated(
      0.2,
      confirmed(['deep-dive-rogue-warlock'], 'Can cleanse itself only through a demon, the Felhunter (Devour Magic).'),
    ),
    selfHeal: rated(
      0.45,
      confirmed(
        ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology-abilities'],
        'Heals itself by draining life (Drain Life) and with a horror effect on a cooldown (Death Coil); sacrificing the right demon restores health (Demonic Sacrifice), and Demonology has no talents that strengthen the drains.',
      ),
    ),
    services: rated(
      1,
      confirmed(['p3'], "Summons other players, especially valuable because the Meeting Stones don't work.", {
        p3: '22:35',
      }),
    ),
    shapeshift: rated(0, classic('No shapeshifting.')),
    soloEndgame: rated(
      0.9,
      confirmed(
        ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology'],
        'Warlocks are physically weak and depend on their demons for protection; Demonology keeps foes focused on its pet while Soul Fire decimates them, and guides find two talents give it about 64% more effective health (Soul Link, Demonic Embrace).',
      ),
    ),
    stealth: rated(0, classic('No stealth.')),
    tabTargetTank: rated(0, classic('Not a tank class.')),
    themeArcane: rated(
      0.05,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Warlocks bend forbidden powers to their will, commanding Shadow, Fire and demonic power rather than arcane magic; none of their spells is arcane.',
      ),
    ),
    themeFel: rated(
      0.8,
      confirmed(
        ['hero', 'deep-dive-rogue-warlock'],
        'Empowered by demonic blood, Warlocks summon and control terrifying demonic entities and bend forbidden powers to their will; Affliction draws on that power through damage over time and draining effects.',
      ),
    ),
    themeLight: rated(0, classic("The Light is not part of the Warlock's theme.")),
    themeMartial: rated(0, classic("Weapon mastery is not part of the Warlock's theme.")),
    themeNature: rated(0, classic("Nature is not part of the Warlock's theme.")),
    totems: rated(0, classic('No totems.')),
    autoAttack: rated(
      0.1,
      confirmed(
        ['dn'],
        'Damage comes from spells, not weapons. The wand matters while leveling, as for every caster, but wands do not scale with spell damage and need 0.5 sec of standing still.',
      ),
    ),

    weaponCaster: rated(
      1.0,
      confirmed(
        ['deep-dive-rogue-warlock', 'deep-dive-panel'],
        'Affliction, Demonology and Destruction all fight with spells, from Wrack to Incinerate; even their weapon imbues are spell-focused, and spellcaster weapons grant spell damage.',
      ),
    ),
    weaponDual: rated(
      0,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Warlocks fight with spells and demons, not with weapons; even their weapon imbues are spell-focused.',
      ),
    ),
    weaponRanged: rated(
      0,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Warlocks attack with spells and demons, not with a bow or gun; even their weapon imbues are spell-focused.',
      ),
    ),
    weaponShield: rated(
      0,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Warlocks fight with spells and demons, not with weapons; even their weapon imbues are spell-focused.',
      ),
    ),
    weaponTwoHand: rated(
      0,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Warlocks fight with spells and demons, not with weapons; even their weapon imbues are spell-focused.',
      ),
    ),
  },
  specs: {
    'warlock-affliction': {
      name: 'Affliction',
      traits: {
        range: rated(
          0.95,
          confirmed(
            ['dn'],
            'Casts from beyond the usual spell range: a talent increases the range of Affliction spells by up to 20% (Grim Reach).',
          ),
        ),
        soloEndgame: rated(
          0.95,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-affliction'],
            'Warlocks are physically weak and depend on their demon pets for protection; Affliction sustains its own health through powerful draining effects, and guides call its DoT cleave some of the best in the game, however spread out the enemies are.',
          ),
        ),
        gearDependency: rated(
          0.4,
          community(
            ['wowhead-guide-warlock-affliction'],
            'Haste does not affect damage over time or channeled spells such as drains, so Haste on gear will likely be wasted on Affliction, while critical strikes on its DoTs let it scale with gear.',
          ),
        ),
        apm: rated(
          0.5,
          estimate(
            'Keeps several DoTs rolling on all targets, casts instant Shadow Bolts when Nightfall triggers and fills with drain spells such as Wrack.',
          ),
        ),
        cc: rated(
          0.8,
          confirmed(
            ['p3', 'dn', 'wowhead-guide-warlock-affliction-abilities'],
            'Can fear or horrify enemies, banish demons and elementals, and have a demon seduce humanoids (Death Coil, Banish, Seduction); fear reaches 20 yards, and an Affliction talent may extend it.',
            { p3: '51:47' },
          ),
        ),
        pvpBattleground: rated(
          0.85,
          community(
            ['wowhead-guide-warlock-affliction', 'dn'],
            'Puts DoTs on every target, and its self-healing helps a lot in PvP and strengthens the SL/SL build (an Affliction/Demonology hybrid); a talent adds up to 20% range to Affliction spells, which may extend Fear (Grim Reach).',
          ),
        ),
        escape: rated(
          0.4,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Hardly any mobility: Warlocks are physically weak and depend on their demon pets for protection. An Affliction talent slows a pursuer by 30% for kiting (Curse of Exhaustion).',
          ),
        ),
        selfHeal: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-affliction-abilities'],
            'No healing spells, but Affliction sustains its own health through powerful drains: Drain Life heals for the damage dealt, and talents increase the health it drains by up to 20% and up to 36% (Improved Drains, Soul Siphon).',
          ),
        ),
        aoe: rated(
          0.7,
          community(
            [
              'wowhead-guide-warlock-affliction',
              'wowhead-guide-warlock-affliction-abilities',
              'wowhead-guide-warlock-destruction',
            ],
            'DoTs on every target give some of the best cleave in the game, no matter how spread out the enemies are, though frontloaded DoTs leave little burst for targets that die quickly; Rain of Fire and Hellfire add area damage without the Destruction talents that boost them.',
          ),
        ),
        burst: rated(
          0.3,
          community(
            ['wowhead-guide-warlock-affliction'],
            'No burst: DoTs need time to tick, so low-health targets are hard to snipe.',
          ),
        ),
        complexity: rated(
          0.45,
          community(
            ['wowhead-guide-warlock-affliction'],
            'A very straightforward spec: DoTs on the targets, drain spells as filler; juggling and tracking several DoTs across enemies still asks for some attention.',
          ),
        ),
        defKite: rated(
          0.4,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'One reliable slow, but no freeze or root: an Affliction talent reduces movement speed by 30% (Curse of Exhaustion).',
          ),
        ),
        defStand: rated(
          0.2,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-affliction-abilities'],
            'Wears cloth, with armor spells that raise armor and health regeneration (Demon Skin, Demon Armor); Warlocks are physically weak and depend on their demon pets for protection.',
          ),
        ),
        dotDamage: rated(
          1,
          confirmed(['deep-dive-rogue-warlock'], "Damage over time, drains and Banes are Affliction's core."),
        ),
        eliteSolo: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'DoTs and drains: Affliction sustains its own health through powerful drains, and fear helps.',
          ),
        ),
        execute: rated(
          0,
          estimate(
            'No bonus damage against weakened enemies: Drain Soul grants Soul Shards but no such bonus, and the talent that acts below 35% health belongs to Demonology (Decimation).',
          ),
        ),
        pet: rated(0.85, confirmed(['deep-dive-rogue-warlock'], 'Relies on demon pets for protection.')),
        petControl: rated(
          0.55,
          community(
            ['wowhead-guide-warlock-affliction-abilities', 'deep-dive-rogue-warlock'],
            "Uses a demon that needs commands: at least Spell Lock, Devour Magic and Seduction should be keybound rather than left on the pet bar. The talents that strengthen the demon sit in the Demonology tree, and most of Affliction's damage comes from its DoTs.",
          ),
        ),
        procs: rated(
          0.55,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-affliction-abilities'],
            'Its drains and other spells can trigger instant Shadow Bolts (Nightfall), and guides find Shadow Bolt is cast mostly when that procs, so the spec reacts to a random trigger between DoT refreshes.',
          ),
        ),
        singleTarget: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-affliction'],
            'Warlocks deal damage to compete with any other spellcaster; guides find Affliction pulls ahead in long fights where periodic damage ticks out in full, while short fights do not give DoTs time to deal their full damage.',
          ),
        ),
        slow: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-affliction-abilities'],
            'An Affliction talent reduces movement speed by 30% and is applied as a curse (Curse of Exhaustion).',
          ),
        ),
        soloLeveling: rated(
          0.9,
          confirmed(['deep-dive-rogue-warlock'], 'DoTs, demon pets and powerful health drains make leveling safe.'),
        ),
        stun: rated(
          0.05,
          community(
            ['wowhead-guide-warlock-affliction-abilities'],
            'Hardly any stun: only the Infernal stuns on impact, and summoning it needs a reagent and has a long cooldown.',
          ),
        ),
        survivability: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology'],
            'Physically weak, but Affliction sustains its health through powerful drains; the talents guides credit with about 64% more effective health come only through a hybrid build with Demonology (Soul Link, Demonic Embrace).',
          ),
        ),
        themeElements: rated(0, classic("The elements are not part of Affliction's theme.")),
        themeShadow: rated(
          1,
          confirmed(
            ['hero', 'deep-dive-rogue-warlock'],
            'Warlocks bend forbidden powers to their will and inflict great torment upon their foes; Affliction concentrates on Shadow damage over time and draining effects, with Wrack tearing the target apart from within: the core of the theme.',
          ),
        ),
        threatControl: rated(0.5, confirmed(['deep-dive-rogue-warlock'], 'Up to 20% less threat (Suppression).')),
      },
    },
    'warlock-demonology': {
      name: 'Demonology',
      traits: {
        gearDependency: rated(
          0.3,
          confirmed(
            ['deep-dive-rogue-warlock'],
            "Pets scale from their summoner's stats, so gear counts for the demon too, but a Demonology talent raises the spell damage of the Warlock and the demon by an amount tied to level rather than gear (Demonic Knowledge).",
          ),
        ),
        interrupt: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology-abilities'],
            'Can interrupt an enemy spellcast while the Felhunter is the active demon (Spell Lock), and a Demonology talent cuts its cooldown by 2 sec (Improved Felhunter).',
          ),
        ),
        groupDemand: rated(
          0.4,
          confirmed(
            [
              'deep-dive-rogue-warlock',
              'wowhead-guide-warlock-demonology-abilities',
              'wowhead-guide-warlock-demonology',
            ],
            "Deals damage that competes with any other spellcaster; guides say a raid wants Soulstone and summoning, but much of Demonology's damage walks on its own legs, where raid area damage and bad positioning can kill it.",
          ),
        ),
        themeFel: rated(
          1,
          confirmed(
            ['hero', 'deep-dive-rogue-warlock'],
            'Empowered by demonic blood, Warlocks summon and control terrifying demonic entities; Demonology builds its talents around deeper demon synergies, the core of the theme.',
          ),
        ),
        aoe: rated(
          0.55,
          community(
            ['wowhead-guide-warlock-demonology-abilities', 'wowhead-guide-warlock-destruction'],
            "Has Rain of Fire and Hellfire for area damage, but all area spells are Destruction spells and benefit from that tree's talents, which Demonology does not take.",
          ),
        ),
        burst: rated(
          0.55,
          community(
            ['wowhead-guide-warlock-demonology'],
            'Damage climbs as the fight nears its end: below 35% health a talent lets Soul Fire cost no Soul Shard, cast faster and come back sooner (Decimation); before that the damage is steady, from long casts and the pet.',
          ),
        ),
        complexity: rated(
          0.5,
          community(
            ['wowhead-guide-warlock-demonology', 'deep-dive-rogue-warlock'],
            'The rotation is simple, but the pet asks for more: when to send it into combat and how to keep it out of damaging mechanics. How Demonology stacks Demonic Sacrifice and Master Demonologist shapes its combat abilities.',
          ),
        ),
        defKite: rated(
          0.15,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'No freeze, root or slow in the Demonology tree: the slows from Affliction and Destruction talents are reachable only through hybrid builds (Curse of Exhaustion, Aftermath).',
          ),
        ),
        defStand: rated(
          0.35,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology'],
            'Wears cloth, but a talent strengthens its armor spells by up to 30% (Demonic Aegis), and guides find Soul Link and Demonic Embrace make Demonology tanky. Still, Warlocks are physically weak and depend on their demon pets for protection.',
          ),
        ),
        dotDamage: rated(
          0.5,
          community(
            ['wowhead-guide-warlock-demonology', 'wowhead-guide-warlock-demonology-abilities'],
            'Most damage comes from hard-cast Shadow Bolt and the pet; DoTs keep rolling alongside but are not the focus.',
          ),
        ),
        eliteSolo: rated(
          0.95,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology-abilities'],
            'Keeps enemies focused on its pet and can heal the pet (Health Funnel), without threat through a talent (Improved Health Funnel).',
          ),
        ),
        execute: rated(
          0.6,
          confirmed(['deep-dive-rogue-warlock'], 'More damage and fast Soul Fire below 35% health (Decimation).'),
        ),
        pet: rated(
          1,
          confirmed(
            ['deep-dive-rogue-warlock', 'p2'],
            'Can sacrifice a demon for its buff (Demonic Sacrifice); the 31-point talent keeps that buff when another demon is summoned, so two demon buffs work at once.',
            {
              p2: '1:04:13',
            },
          ),
        ),
        petControl: rated(
          0.9,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology'],
            'Managing the demon is the core of the spec: guides say this includes when to send it into combat or to a marked spot. Much of the damage comes from the demon, which has to stay alive; a talent keeps enemies on it (Demonic Brand).',
          ),
        ),
        procs: rated(
          0.4,
          community(
            ['wowhead-guide-warlock-demonology'],
            'Few procs; Decimation triggers predictably below 35% health.',
          ),
        ),
        singleTarget: rated(
          0.9,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-demonology'],
            'Warlocks deal damage to compete with any other spellcaster, and guides find stacked damage bonuses plus a buffed demon make Demonology one of the strongest single-target specs in the game.',
          ),
        ),
        slow: rated(
          0.3,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'No slow in its own tree; the Affliction talent that slows by 30% is reachable only through hybrid builds (Curse of Exhaustion).',
          ),
        ),
        soloLeveling: rated(
          0.95,
          community(
            ['wowhead-guide-warlock-demonology'],
            'A very friendly build for leveling: strong pets and great survivability.',
          ),
        ),
        stun: rated(
          0.05,
          community(
            ['wowhead-guide-warlock-demonology-abilities'],
            'Hardly any stun: only the Infernal stuns on impact, and summoning it needs a reagent and has a long cooldown.',
          ),
        ),
        survivability: rated(
          0.8,
          community(
            ['wowhead-guide-warlock-demonology'],
            'Two talents give about 64% more effective health (Soul Link, Demonic Embrace).',
          ),
        ),
        themeElements: rated(0, classic("The elements are not part of Demonology's theme.")),
        themeShadow: rated(
          0.85,
          confirmed(
            ['hero', 'deep-dive-rogue-warlock'],
            'Warlocks are feared above all for their wickedness and cruelty and summon terrifying demonic entities; Demonology wields the same forbidden power with Shadow Bolt, but its demons take the front.',
          ),
        ),
        threatControl: rated(
          0.55,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Two threat tools in its own tree: a talent cuts the threat of healing the pet by up to 100% (Improved Health Funnel), and another makes Searing Pain generate less threat (Demonic Brand).',
          ),
        ),
      },
    },
    'warlock-destruction': {
      name: 'Destruction',
      traits: {
        range: rated(
          0.95,
          confirmed(
            ['dn'],
            'Casts from beyond the usual spell range: a talent increases the range of Destruction spells by up to 20% (Destructive Reach).',
          ),
        ),
        soloEndgame: rated(
          0.75,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-destruction'],
            "Warlocks rely on their demons for protection, so Destruction keeps a pet that holds enemies, and guides credit Shadowburn and Conflagrate with burst that ends fights fast. But the Warlock is physically weak, and Destruction's talents add no drains or extra effective health.",
          ),
        ),
        groundZones: rated(
          0.4,
          community(
            ['wowhead-guide-warlock-destruction'],
            "Has a ground spell (Rain of Fire), and as a Destruction spell it benefits from the tree's talents.",
          ),
        ),
        levelingDowntime: rated(
          0.25,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Life Tap scales with Spirit, so mana rarely forces a break; the occasional break comes from health, as Destruction neither sustains its health through powerful drains nor keeps foes focused on its pet.',
          ),
        ),
        themeFel: rated(
          0.85,
          confirmed(
            ['hero', 'deep-dive-rogue-warlock'],
            'Empowered by demonic blood, Warlocks depend on their demon pets for protection; Destruction wields that forbidden power as demonic Fire and Shadow (Shadowburn, Conflagrate, Hellfire).',
          ),
        ),
        selfHeal: rated(
          0.35,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-destruction-abilities'],
            'Only the baseline drains: draining life heals (Drain Life) and a horror effect heals on a cooldown (Death Coil), while the talents that strengthen drains sit in the Affliction tree.',
          ),
        ),
        aoe: rated(
          0.8,
          community(
            ['wowhead-guide-warlock-destruction', 'wowhead-guide-warlock-destruction-abilities', 'dn'],
            'Great area damage through Hellfire and Rain of Fire, both Destruction spells that benefit from talents in the tree and can crit; its cleave is a weak point, which a talent partially offsets (Bane of Havoc).',
          ),
        ),
        burst: rated(
          0.85,
          community(['wowhead-guide-warlock-destruction'], 'Great burst through Conflagrate and Shadowburn.'),
        ),
        complexity: rated(
          0.15,
          community(
            ['wowhead-guide-warlock-destruction'],
            'A simple, very newbie-friendly rotation: keep DoTs up, cast the two cooldown spells when available (Shadowburn, Conflagrate), otherwise fill with Incinerate.',
          ),
        ),
        defKite: rated(
          0.35,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'A slow only, and only when casting Conflagrate: a talent gives it up to 100% chance to daze the target, cutting its movement speed by 50% for 5 sec (Aftermath).',
          ),
        ),
        defStand: rated(
          0.25,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Armor spells (Demon Skin, Demon Armor), and a talent lowers all damage taken by up to 10% (Molten Skin).',
          ),
        ),
        dotDamage: rated(
          0.5,
          community(
            ['wowhead-guide-warlock-destruction', 'deep-dive-rogue-warlock'],
            'DoTs stay up throughout because the main spells build on a Fire DoT (Immolate): it fuels Conflagrate and makes Incinerate deal 25% more damage. Direct spells carry most of the damage, and there are no Shadow damage buffs for DoTs.',
          ),
        ),
        eliteSolo: rated(0.6, estimate('Little self-sustain in long fights against an elite.')),
        execute: rated(
          0.1,
          community(
            ['wowhead-guide-warlock-destruction-abilities', 'deep-dive-rogue-warlock'],
            'An instant Shadow spell on a short cooldown serves as a finisher, and its Soul Shard is refunded if the target dies (Shadowburn); no Destruction spell gains damage against weakened enemies.',
          ),
        ),
        pet: rated(
          0.85,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-destruction-abilities'],
            'Relies on demon pets for protection, and guides find the demon you summon changes how you play.',
          ),
        ),
        petControl: rated(
          0.55,
          community(
            ['wowhead-guide-warlock-destruction-abilities', 'deep-dive-rogue-warlock'],
            "The demon's abilities are as much a part of the kit as the spellbook and belong on keybinds. The talents that strengthen the demon sit in the Demonology tree, and most of Destruction's damage comes from its own spells.",
          ),
        ),
        procs: rated(
          0.2,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-destruction'],
            'Nothing in the rotation waits on a random trigger: a talent (Shadow and Flame) triggers reliably from the two cooldown spells (Conflagrate, Shadowburn), which guides find are cast whenever available in a simple rotation.',
          ),
        ),
        singleTarget: rated(
          0.85,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-warlock-destruction'],
            'Warlocks deal damage to compete with any other spellcaster; guides find Destruction has strong single-target damage, with Incinerate as the filler and Shadowburn and Conflagrate when available.',
          ),
        ),
        slow: rated(
          0.4,
          confirmed(['deep-dive-rogue-warlock'], 'A talent lets Conflagrate slow the target by 50% (Aftermath).'),
        ),
        soloLeveling: rated(0.7, estimate('Leans on damage rather than self-sustain.')),
        stun: rated(
          0.35,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-spell-pyroclasm'],
            'A chance-based stun from a Destruction talent (Pyroclasm): Soul Fire gets a 26% chance to stun its target for 3 sec, and the two area Fire spells a 26% chance over their duration to stun targets they damage for 3 sec.',
          ),
        ),
        survivability: rated(
          0.5,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Physically weak with little self-sustain; Molten Skin lowers all damage taken by up to 10%.',
          ),
        ),
        themeElements: rated(
          0.4,
          confirmed(
            ['deep-dive-rogue-warlock', 'p2'],
            "Fire is half of Destruction's toolkit (Immolate, Conflagrate, Incinerate), but as forbidden power deliberately mixed with Shadow rather than the elements as allies, so that Destruction is more than another flavor of fire mage.",
            { p2: '58:56' },
          ),
        ),
        themeShadow: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock', 'p2'],
            'Destruction deliberately mixes Shadow spells such as Shadowburn into its Fire, with a talent linking both (Shadow and Flame); forbidden power, but half its toolkit is Fire.',
            { p2: '59:08' },
          ),
        ),
        threatControl: rated(
          0.3,
          community(
            ['wowhead-guide-warlock-affliction', 'wowhead-guide-warlock-demonology', 'deep-dive-rogue-warlock'],
            'No threat tools in its tree; the Affliction talent lowering threat by up to 20% is key for most PvE specs (Suppression).',
          ),
        ),
      },
    },
  },
} satisfies ClassSpecs<'warlock'>;
