import { CLASSIC, classic, community, confirmed, estimate } from '../evidence/helpers';
import { graded, rated, type ClassSpecs } from '../rated';

/**
 * Rogue: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const ROGUE_SPECS = {
  traits: {
    apm: rated(
      0.8,
      estimate(
        'Energy builders and finishers fill most global cooldowns, and a Combat talent makes Eviscerate cheaper, so the Energy goes further.',
      ),
    ),
    armor: rated(0.3, classic('Wears leather armor.')),
    combatReset: rated(1, classic('Can drop combat (Vanish).')),
    deadZone: rated(0, classic('No minimum range: every melee ability works up close.')),
    defKite: rated(
      0.3,
      estimate(
        'Has little to keep enemies at a distance: each strike with Crippling Poison has a 30% chance to slow movement speed by 50% for 12 sec, and there are no roots or freezes.',
      ),
    ),
    defStand: rated(
      0.25,
      estimate(
        'Wears leather and has no shield, block or talents for armor or health; the Rogue survives through its defensive tools rather than armor (Evasion, Vanish, Feint).',
      ),
    ),
    dungeonUtility: rated(0, classic('Cannot remove curses, poisons or diseases and cannot resurrect the dead.')),
    eliteSolo: rated(
      0.5,
      community(
        [
          'wowhead-guide-rogue-assassination-abilities',
          'wowhead-guide-rogue-combat-abilities',
          'wowhead-guide-rogue-subtlety-abilities',
        ],
        'Can split up groups of enemies while questing without leaving Stealth (Sap) and can survive pulling too many (Evasion), but has no healing.',
      ),
    ),
    gearDependency: rated(
      0.55,
      confirmed(
        ['deep-dive-panel', 'p2', 'deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination'],
        "The developers count Rogues among the classes that care about gear and weapons while leveling. Assassination and Subtlety reward daggers, but poisons and bleeds carry part of their damage, and guides find Assassination's poisons bypass armor.",
        { p2: '9:52' },
      ),
    ),
    groundZones: rated(0, classic('No ground effects or traps.')),
    healAbsorb: rated(0, classic('No ability heals others.')),
    healDirect: rated(0, classic('No ability heals others.')),
    healGroup: rated(0, classic('No ability heals others.')),
    healHot: rated(0, classic('No ability heals others.')),
    healingReduction: rated(
      0.5,
      community(
        [
          'wowhead-guide-rogue-assassination-abilities',
          'wowhead-guide-rogue-combat-abilities',
          'wowhead-guide-rogue-subtlety-abilities',
        ],
        'Can reduce healing on an enemy: each strike with Wound Poison has a 30% chance to reduce all healing effects on the enemy for 15 sec, but it is a very niche use that fits PvP more, so it is not part of every loadout.',
      ),
    ),
    hybridFlex: rated(
      0,
      confirmed(['p2'], "Melee damage is the Rogue's only role; Rogues don't count as hybrids.", { p2: '22:26' }),
    ),
    hybridTax: rated(
      0,
      confirmed(['p2'], "Rogues don't count as hybrids, so there is no hybrid damage cost.", { p2: '22:18' }),
    ),
    interrupt: rated(
      1,
      community(
        [
          'wowhead-guide-rogue-assassination-abilities',
          'wowhead-guide-rogue-combat-abilities',
          'wowhead-guide-rogue-subtlety-abilities',
        ],
        'Can interrupt an enemy spell and lock out that school of magic for 5 sec (Kick), a main tool against casters. Gouge and Kidney Shot interrupt too while Kick is on cooldown.',
      ),
    ),
    levelingDowntime: rated(0.5, estimate('Needs only food to restore health between fights, no mana.')),
    pet: rated(0, classic('No pet.')),
    petControl: rated(0, classic('No pet.')),
    pvpBattleground: rated(0.6, estimate('Strong at picking off individuals, weaker in open group fights.')),
    pvpWorld: rated(
      0.9,
      confirmed(
        ['deep-dive-rogue-warlock'],
        "Stealth, control and burst let a Rogue pick its fights; Distract lowers enemies' Stealth detection, but it also warns enemy players that a Rogue is nearby.",
      ),
    ),
    raidUtility: rated(
      0.1,
      confirmed(
        ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat', 'wowhead-guide-rogue-subtlety'],
        "Guides find Rogues bring no raid buff and no real raid contribution beyond damage and interrupts (Kick). Expose Armor matches 5 stacks of a Warrior's Sunder Armor and does not block it, and guides find the two on par.",
      ),
    ),
    range: rated(0, classic('Pure melee fighter.')),
    rangeWeave: rated(0, classic('Stays in melee and never switches to ranged combat.')),
    reagentDependency: rated(
      0.5,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Poisons are consumables applied to the weapons and hold many charges, so they need restocking only occasionally; Assassination relies heavily on poisons, but an Assassination talent often lets them keep their charges.',
      ),
    ),
    resEnergy: rated(
      1,
      confirmed(
        ['p2', 'wowhead-guide-rogue-assassination'],
        'Energy is the resource, and guides find it regenerates smoothly, not in ticks; asked about faster Energy regeneration, the developers plan no changes at this time.',
        { p2: '44:52' },
      ),
    ),
    resMana: rated(0, classic("Rogues don't use mana.")),
    resRage: rated(0, classic("Rogues don't use rage.")),
    roleHealer: rated(0, classic('No healing spells.')),
    roleMeleeDps: rated(
      1,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'A melee damage class with the potential for the highest single-target melee damage in the game.',
      ),
    ),
    roleRangedDps: rated(0, classic('Uses a ranged weapon only to pull enemies.')),
    roleTank: rated(0, classic('Not a tank, no taunt.')),
    selfCleanse: rated(0, classic('No ability removes magic, curses, poisons or diseases.')),
    selfHeal: rated(0, classic('No self-healing.')),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    shapeshift: rated(0, classic('No shapeshifting.')),
    slow: rated(
      0.6,
      community(
        ['wowhead-guide-rogue-combat-abilities', 'wowhead-guide-rogue-subtlety-abilities'],
        'Can slow fleeing enemies: each strike with Crippling Poison has a 30% chance to slow movement speed by 50% for 12 sec, invaluable against mobs that run away at low health. Frequent but not guaranteed.',
      ),
    ),
    soloEndgame: rated(
      0.65,
      confirmed(
        [
          'deep-dive-rogue-warlock',
          'wowhead-guide-rogue-assassination',
          'wowhead-guide-rogue-subtlety',
          'wowhead-guide-rogue-combat',
        ],
        'Rogues act from Stealth and slip past enemies; defensive tools help them survive (Evasion, Vanish, Feint). Without self-healing, long farming and elites are costly, and guides find they lack considerable cleave damage.',
      ),
    ),
    soloLeveling: rated(
      0.6,
      community(
        [
          'wowhead-guide-rogue-assassination',
          'wowhead-guide-rogue-assassination-abilities',
          'wowhead-guide-rogue-combat',
          'wowhead-guide-rogue-combat-abilities',
          'wowhead-guide-rogue-subtlety',
          'wowhead-guide-rogue-subtlety-abilities',
        ],
        'Can pick and split fights from Stealth while questing (Sap); slow Energy regeneration and no healing hold it back.',
      ),
    ),
    stealth: rated(
      1,
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Rogues are the masters of Stealth, with abilities of their own that work from it (Distract, Sap, Garrote).',
      ),
    ),
    survivability: rated(
      0.45,
      community(
        ['wowhead-guide-rogue-assassination', 'wowhead-guide-rogue-combat', 'wowhead-guide-rogue-subtlety'],
        'Wears leather and has no healing, but has decent survival tools (Evasion, Vanish, Feint).',
      ),
    ),
    tabTargetTank: rated(0, classic('Not a tank class.')),
    themeArcane: rated(0, CLASSIC),
    themeElements: rated(0, CLASSIC),
    themeFel: rated(0, CLASSIC),
    themeLight: rated(0, CLASSIC),
    themeMartial: graded(
      { 'rogue-assassination': 0.8, 'rogue-combat': 0.95, 'rogue-subtlety': 0.75 },
      confirmed(
        ['deep-dive-rogue-warlock'],
        'Rogues build on Stealth, Poisons and precise weapon attacks. Combat supports all weapon types and hits hard with direct damage; Assassination specializes in daggers but focuses on Poisons; Subtlety focuses on combat tricks and Bleeds.',
      ),
    ),
    themeNature: rated(0, CLASSIC),
    themeShadow: rated(
      0.5,
      confirmed(
        ['hero', 'deep-dive-rogue-warlock'],
        'Rogues are the masters of Stealth whose deeds never come to light, relying on a blend of stealth and minor mysticism; Subtlety deepens Stealth through its talents and focuses on combat tricks.',
      ),
    ),
    threatControl: rated(0.8, confirmed(['deep-dive-rogue-warlock'], 'Can lower its own threat (Feint).')),
    totems: rated(0, classic('No totems.')),
    autoAttack: rated(
      0.8,
      confirmed(
        ['p2', 'deep-dive-rogue-warlock'],
        'Rogues deal much damage from auto attacks, Slice and Dice and poisons; Assassination is built as a poison-focused playstyle around Mutilate and Subtlety around combat tricks and bleeds, so more of their damage comes from abilities.',
        { p2: '44:59' },
      ),
    ),

    weaponCaster: rated(
      0,
      confirmed(['deep-dive-rogue-warlock'], 'Rogues fight with weapon attacks and Poisons, not with spells.'),
    ),
    weaponDual: rated(
      1.0,
      confirmed(
        ['deep-dive-rogue-warlock'],
        "All Rogues fight with a weapon in each hand. Assassination's main strike needs a dagger in each hand; a Combat talent rewards every one-handed weapon type, and two Subtlety strikes reward daggers (Hemorrhage, Ghostly Strike).",
      ),
    ),
    weaponRanged: rated(
      0.1,
      confirmed(
        ['hero', 'deep-dive-rogue-warlock'],
        'Rogues are fond of silent projectile weapons, but they fight in melee, where they have the highest potential single-target melee damage in the game; a bow, gun or thrown weapon mainly serves to pull.',
      ),
    ),
    weaponShield: rated(0, classic('Rogues cannot use a shield.')),
    weaponTwoHand: rated(0, classic('Rogues use no two-handed weapons.')),
  },
  specs: {
    'rogue-assassination': {
      name: 'Assassination',
      traits: {
        themeShadow: rated(
          0.4,
          confirmed(
            ['hero', 'deep-dive-rogue-warlock'],
            'Rogues eliminate designated targets and are most successful when their deeds never come to light; Assassination adds a Poison-focused playstyle with a dark, deadly feel but no forbidden magic.',
          ),
        ),
        slow: rated(
          0.65,
          community(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination-abilities'],
            'Can slow fleeing enemies: each strike can apply Crippling Poison, which slows movement by 50% for 12 sec. Venom and an Assassination talent make the poison land more often and last longer on the weapon.',
          ),
        ),
        apm: rated(
          0.75,
          estimate(
            'Energy builders and finishers fill most global cooldowns. Mutilate builds combo points for finishers that mostly keep Venom and Slice and Dice up, a steady routine with few extra inputs.',
          ),
        ),
        raidUtility: rated(
          0.15,
          confirmed(
            [
              'deep-dive-rogue-warlock',
              'wowhead-guide-rogue-assassination',
              'wowhead-guide-rogue-assassination-abilities',
            ],
            "Guides find Rogues bring no raid buff, only damage and interrupts (Kick). Expose Armor matches a Warrior's Sunder Armor, and an Assassination talent makes it cheaper, so Assassination can cover this debuff when no Warrior does.",
          ),
        ),
        aoe: rated(
          0.1,
          confirmed(
            ['deep-dive-rogue-warlock'],
            "Has no attacks that hit several enemies; the Rogue's cleave damage (Blade Flurry) sits in the Combat tree.",
          ),
        ),
        burst: rated(
          0.85,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Burst comes from a deep Assassination talent that also works on the main builder (Cold Blood).',
          ),
        ),
        cc: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Can control an enemy from Stealth without leaving it (Sap), plus Blind and Gouge, which an Assassination talent improves.',
          ),
        ),
        complexity: rated(
          0.25,
          community(
            ['wowhead-guide-rogue-assassination'],
            'Mutilate builds combo points to keep two buffs up (Slice and Dice, Venom); there are no significant cooldowns, so the bulk of the spec is just maintaining these two buffs.',
          ),
        ),
        defAbsorb: rated(
          0.45,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination-abilities'],
            'One cooldown to avoid damage, which raises dodge by 50% for 15 sec (Evasion); no barrier or immunity, and the talent for more parry sits in the Combat tree.',
          ),
        ),
        dotDamage: rated(
          0.5,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Assassination is built around poisons: Venom raises poison damage by 30%, Improved Poisons often lets them keep their charges.',
          ),
        ),
        escape: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination-abilities'],
            'Can sprint, dodge or vanish to get away (Sprint, Evasion, Vanish).',
          ),
        ),
        execute: rated(
          0,
          confirmed(
            ['deep-dive-rogue-warlock', 'classic'],
            'Has no bonus damage against weakened enemies; the talent for it sits in the Subtlety tree (Quietus).',
          ),
        ),
        groupDemand: rated(
          0.45,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination', 'wowhead-guide-rogue-combat'],
            "Every Rogue is welcome in any group or raid for Stealth, control and the highest potential single-target melee damage. Guides find Assassination's raid spot rests on damage without a raid buff, and some encounters may be immune to poisons.",
          ),
        ),
        positional: rated(
          0.5,
          community(
            ['wowhead-guide-rogue-assassination-abilities'],
            "Mostly fights without a position requirement: the main builder needs daggers but no position; only a fallback strike from behind the target (Backstab) and the openers from Stealth (Ambush, Garrote) need the target's back.",
          ),
        ),
        procs: rated(
          0.35,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination'],
            'Few procs to react to: Mutilate and poisons trigger effects on hits, but these act on their own. Guides find the bulk of the spec is keeping up Slice and Dice and Venom, a predictable routine.',
          ),
        ),
        singleTarget: rated(
          0.95,
          confirmed(
            ['deep-dive-rogue-warlock', 'p2', 'wowhead-guide-rogue-assassination'],
            'Potential for the highest single-target melee damage in the game; the developers say Rogues deal the highest single-target damage in PvE fights with little movement and pay no hybrid damage cost, and guides find poison immunity hinders Assassination.',
            { p2: '45:15' },
          ),
        ),
        stun: rated(
          1,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-assassination-abilities'],
            'Two reliable stuns: one for 4 sec from Stealth (Cheap Shot) and a finisher (Kidney Shot), plus a further incapacitate. An Assassination talent adds damage during Kidney Shot, but no stun.',
          ),
        ),
      },
    },
    'rogue-combat': {
      name: 'Combat',
      traits: {
        soloEndgame: rated(
          0.7,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat'],
            'Combat acts from Stealth and slips past enemies; defensive tools help it survive (Evasion, Vanish, Feint). Without self-healing, long farming and elites cost time; guides find Combat has considerable cleave damage.',
          ),
        ),
        themeShadow: rated(
          0.2,
          confirmed(
            ['hero', 'deep-dive-rogue-warlock'],
            'Rogues are masters of Stealth whose deeds never come to light, but Combat focuses on hard hitting direct damage.',
          ),
        ),
        autoAttack: rated(
          0.9,
          confirmed(
            ['p2', 'wowhead-guide-rogue-combat'],
            'Rogues deal much damage from auto attacks, Slice and Dice and poisons, and guides find Combat a spec focused on auto attacks that relies on neither poisons nor bleeds.',
            { p2: '44:59' },
          ),
        ),
        gearDependency: rated(
          0.65,
          estimate(
            'Damage comes largely from weapon swings, so the weapon matters a lot, and a Combat talent gives every one-handed weapon type a bonus, so every better weapon that drops counts.',
          ),
        ),
        survivability: rated(
          0.55,
          community(
            ['wowhead-guide-rogue-combat', 'deep-dive-rogue-warlock'],
            'Wears leather and has no healing, but has decent survival tools (Evasion, Vanish, Feint), and a Combat talent raises parry chance.',
          ),
        ),
        soloLeveling: rated(
          0.65,
          community(
            ['wowhead-guide-rogue-combat', 'wowhead-guide-rogue-combat-abilities', 'deep-dive-rogue-warlock'],
            'Can pick and split fights from Stealth while questing (Sap); slow Energy regeneration and no healing hold it back, and a Combat talent raises parry chance.',
          ),
        ),
        pvpWorld: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat'],
            "Stealth, control and burst let a Rogue pick its fights; guides call Combat's burst decent.",
          ),
        ),
        aoe: rated(
          0.35,
          confirmed(['deep-dive-rogue-warlock'], 'Hits extra enemies only with a little cleave damage (Blade Flurry).'),
        ),
        burst: rated(
          0.75,
          community(
            ['wowhead-guide-rogue-combat'],
            'Decent burst: two cooldowns and an active racial ability let the Rogue frontload damage or hold it for a burn phase (Blade Flurry, Adrenaline Rush).',
          ),
        ),
        cc: rated(
          0.75,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Can control an enemy from Stealth without leaving it (Sap), plus two more control abilities (Blind, Gouge).',
          ),
        ),
        complexity: rated(
          0.35,
          community(
            ['wowhead-guide-rogue-combat'],
            'Fairly straightforward: a builder strike earns combo points, spent mainly on keeping a buff up (Slice and Dice) and the excess on a damaging finisher, plus two big cooldowns best used whenever ready and together (Blade Flurry, Adrenaline Rush).',
          ),
        ),
        defAbsorb: rated(
          0.55,
          confirmed(
            ['deep-dive-rogue-warlock', 'dn'],
            'A Combat talent raises parry chance by up to 5% (Deflection), plus a dodge cooldown (Evasion); no barrier or immunity.',
          ),
        ),
        dotDamage: rated(
          0.1,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat', 'wowhead-guide-rogue-combat-abilities'],
            'Combat focuses on hard hitting direct damage; guides find the spec relies on neither poisons nor bleeds, and Rupture likely does not fit its rotation. Deadly Poison on a weapon is possible.',
          ),
        ),
        escape: rated(
          0.9,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat'],
            'Can sprint, dodge or vanish to get away, and a Combat talent cuts the cooldown of Sprint and Evasion by up to 60%, so both escapes are ready more often.',
          ),
        ),
        execute: rated(
          0,
          confirmed(
            ['deep-dive-rogue-warlock', 'classic'],
            'Has no bonus damage against weakened enemies; the talent for it sits in the Subtlety tree (Quietus).',
          ),
        ),
        groupDemand: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat'],
            'Every Rogue is welcome in any party or raid; guides find Combat brings no raid buff, so its raid spot rests on damage.',
          ),
        ),
        positional: rated(
          0.5,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat', 'wowhead-guide-rogue-combat-abilities'],
            'Supports both a build around Sinister Strike, which needs no position, and a Backstab build; guides treat Sinister Strike as standard, with Backstab and the Stealth openers from behind.',
          ),
        ),
        procs: rated(
          0.35,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat'],
            'Few procs to react to: a Combat talent gives swords and axes a chance for an extra attack, which acts on its own and asks for no reaction (Hack and Slash). Guides call the spec fairly straightforward: one strike builds combo points for the finishers (Sinister Strike).',
          ),
        ),
        singleTarget: rated(
          1,
          confirmed(
            ['deep-dive-rogue-warlock', 'p2', 'wowhead-guide-rogue-combat'],
            'Potential for the highest single-target melee damage in the game; the developers say Rogues deal the highest single-target damage in PvE fights with little movement. Guides find Combat relies on neither poisons nor bleeds, so immunities never hinder it.',
            { p2: '45:15' },
          ),
        ),
        stun: rated(
          1,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-combat-abilities'],
            'Two reliable stuns: one for 4 sec from Stealth (Cheap Shot) and a finisher (Kidney Shot), plus a further incapacitate; an Assassination talent adds damage during Kidney Shot, but no stun.',
          ),
        ),
      },
    },
    'rogue-subtlety': {
      name: 'Subtlety',
      traits: {
        groundZones: rated(
          0.1,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'The only ability placed on the ground is Distract, and a Subtlety talent increases its radius of effect; no lasting ground effects or traps.',
          ),
        ),
        survivability: rated(
          0.5,
          community(
            ['wowhead-guide-rogue-subtlety', 'deep-dive-rogue-warlock'],
            'Wears leather and has no healing, but has decent survival tools (Evasion, Vanish, Feint), and a Subtlety talent makes two control abilities much cheaper, which helps avoid damage.',
          ),
        ),
        pvpWorld: rated(
          1,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Stealth, control and burst let a Rogue pick its fights, and a Subtlety talent makes Sap and Blind much cheaper.',
          ),
        ),
        pvpBattleground: rated(
          0.65,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Cheaper control helps against single targets: a Subtlety talent makes Sap and Blind much cheaper.',
          ),
        ),
        apm: rated(
          0.8,
          estimate(
            'Energy builders and finishers fill most global cooldowns. Subtlety keeps three effects up (Hemorrhage, Rupture, Slice and Dice) and vanishes mid-fight to reach more abilities from Stealth.',
          ),
        ),
        aoe: rated(
          0.1,
          confirmed(
            ['deep-dive-rogue-warlock'],
            "Has no attacks that hit several enemies; the Rogue's cleave damage (Blade Flurry) sits in the Combat tree.",
          ),
        ),
        burst: rated(
          0.8,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Burst comes from Premeditation, a deep Subtlety talent whose effect lasts 20 sec.',
          ),
        ),
        cc: rated(
          0.9,
          confirmed(
            ['deep-dive-rogue-warlock'],
            'Can control an enemy from Stealth without leaving it (Sap), and a Subtlety talent makes Sap and Blind much cheaper.',
          ),
        ),
        complexity: rated(
          0.7,
          community(
            ['wowhead-guide-rogue-subtlety', 'p2'],
            'Asks for a bit more nuance: keeping Hemorrhage up so it strengthens Rupture, and vanishing mid-fight to reach abilities from Stealth; the developers plan to make Death Mark the 31-point Subtlety talent.',
            { p2: '42:55' },
          ),
        ),
        defAbsorb: rated(
          0.45,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety-abilities'],
            'One cooldown to avoid damage, which raises dodge by 50% for 15 sec (Evasion); no barrier or immunity, and the talent for more parry sits in the Combat tree.',
          ),
        ),
        dotDamage: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety-abilities'],
            'Subtlety focuses on combat tricks and bleeds: Hemorrhage strengthens Rupture, and each Rupture tick makes the next builder cheaper (Thousand Cuts). Guides find Subtlety keeps Rupture up; the bleed carries much of the damage, but not the whole play style.',
          ),
        ),
        escape: rated(
          0.9,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety'],
            'Can sprint, dodge or vanish to get away (Sprint, Evasion, Vanish); Subtlety talents improve Stealth and make blinding an enemy much cheaper, so escaping by vanishing and blinding works more reliably.',
          ),
        ),
        execute: rated(
          0.4,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety'],
            'A modest passive bonus against weakened enemies: a Subtlety talent makes three builder strikes deal more damage to targets below 35% health (Quietus), guides say 10% more; Backstab is not included.',
          ),
        ),
        groupDemand: rated(
          0.45,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety', 'wowhead-guide-rogue-combat'],
            "Every Rogue is welcome in any group or raid for Stealth, control and the highest potential single-target melee damage. Guides find Subtlety's raid spot rests on damage without a raid buff, and some encounters may be immune to bleeds.",
          ),
        ),
        positional: rated(
          0.6,
          confirmed(
            ['deep-dive-rogue-warlock'],
            "Can fight from any side in a build around a strike that needs no position, and a talent lets Garrote be used from the front too; Ambush and Backstab still need the target's back.",
          ),
        ),
        procs: rated(
          0.55,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety'],
            'One proc to react to: with a talent, Backstab sometimes lets the next Ambush be used in combat without Stealth; it serves a build around Backstab, while guides build combo points with Hemorrhage. Two more talents always trigger and ask for no reaction.',
          ),
        ),
        singleTarget: rated(
          0.85,
          confirmed(
            ['p2', 'wowhead-guide-rogue-subtlety'],
            'The developers say Rogues deal the highest single-target damage in PvE fights with little movement; guides expect Subtlety to keep up in damage but call its PvE viability largely guesswork.',
            { p2: '45:15' },
          ),
        ),
        stun: rated(
          1,
          confirmed(
            ['deep-dive-rogue-warlock', 'wowhead-guide-rogue-subtlety-abilities'],
            'Two reliable stuns: one for 4 sec from Stealth (Cheap Shot) and a finisher (Kidney Shot), plus a further incapacitate; an Assassination talent adds damage during Kidney Shot, but no stun.',
          ),
        ),
      },
    },
  },
} satisfies ClassSpecs<'rogue'>;
