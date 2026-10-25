import { classic, community, confirmed, ESTIMATE, estimate } from '../evidence/helpers';
import { rated, type ClassSpecs } from '../rated';

/**
 * Warrior: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const WARRIOR_SPECS = {
  traits: {
    apm: rated(
      0.75,
      estimate(
        'Fills most global cooldowns, limited by the Rage at hand: Bloodthirst and Whirlwind on cooldown, plus Cleave with surplus Rage.',
      ),
    ),
    armor: rated(1, classic('Wears plate armor from level 40.')),
    cc: rated(0.25, classic('Can control enemies with fear (Intimidating Shout).')),
    combatReset: rated(0.1, classic('No way to drop combat.')),
    complexity: rated(
      0.55,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Has to manage stances and Rage; from level 14 every Warrior keeps 10 Rage when switching stances (Tactical Mastery).',
      ),
    ),
    deadZone: rated(0, classic('No minimum range: every melee ability works up close.')),
    defAbsorb: rated(
      0.2,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Has no absorb shields or immunities; Shield Wall and Retaliation each have their own 15 min cooldown.',
      ),
    ),
    defKite: rated(0.1, classic('Can slow an enemy (Hamstring), but has no way to keep distance.')),
    dotDamage: rated(
      0.2,
      confirmed(
        ['deep-dive-priest-warrior', 'dn'],
        'Damage over time is only a minor source: Rend scales with attack power, and Deep Wounds is a rolling DoT.',
      ),
    ),
    dungeonUtility: rated(0, classic('Cannot remove curses, poisons or diseases and cannot resurrect the dead.')),
    eliteSolo: rated(0.3, estimate('Fighting an elite alone is hard without healing and control.')),
    gearDependency: rated(
      0.9,
      confirmed(
        ['p2', 'wowhead-guide-warrior-fury'],
        'The developers name the Warrior as a class that cares about gear, and guides find Fury needs large amounts of gear to reach certain stat caps.',
        { p2: '9:52' },
      ),
    ),
    groundZones: rated(0, classic('No ground effects or traps.')),
    groupDemand: rated(
      0.5,
      confirmed(
        ['deep-dive-priest-warrior', 'p2'],
        'Any party or raid is happy to add a Warrior as a tank or damage dealer; as a hybrid damage spec, Fury deals about 5% less damage.',
        { p2: '22:18' },
      ),
    ),
    healAbsorb: rated(0, classic('No ability heals others.')),
    healDirect: rated(0, classic('No ability heals others.')),
    healGroup: rated(0, classic('No ability heals others.')),
    healHot: rated(0, classic('No ability heals others.')),
    hybridFlex: rated(
      0.55,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Can tank or deal damage, two of the three roles, and is in demand for both; Warriors cannot heal.',
      ),
    ),
    interrupt: rated(
      0.7,
      confirmed(
        ['dn'],
        'Can interrupt spellcasts (Pummel, Shield Bash); a Shield Bash that also silences is a Protection talent (Improved Shield Bash).',
      ),
    ),
    levelingDowntime: rated(
      0.6,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-warrior-protection', 'wowhead-guide-warrior-arms'],
        'Warriors lack the tools to recover from heavy damage; guides find Victory Rush brings some sustain while leveling, but list limited passive sustain as an Arms weakness.',
      ),
    ),
    pet: rated(0, classic('No pet.')),
    petControl: rated(0, classic('No pet.')),
    positional: rated(
      0.25,
      confirmed(
        ['dn'],
        'Arms and Fury fight as melee damage dealers: no ability needs a position, but standing behind the enemy avoids its parries and blocks. A known beta bug lets enemies parry and block from behind at close range; not standing too close avoids it.',
      ),
    ),
    pvpWorld: rated(
      0.65,
      estimate(
        "Can cut the enemy's healing, close distance, and slow enemies or hold them in place (Mortal Strike, Charge, Improved Hamstring), but Warriors lack the tools to recover from heavy damage.",
      ),
    ),
    raidUtility: rated(
      0.6,
      confirmed(
        ['deep-dive-priest-warrior', 'dn'],
        'Brings unique buffs and debuffs, and Battle Shout reaches the whole raid.',
      ),
    ),
    range: rated(0, confirmed(['deep-dive-priest-warrior'], 'Warriors are the masters of melee combat.')),
    rangeWeave: rated(0, classic('Stays in melee and never switches to ranged combat.')),
    reagentDependency: rated(0.05, classic('Needs hardly any supplies, at most thrown weapons.')),
    resEnergy: rated(0, classic("Warriors don't use energy.")),
    resMana: rated(0, classic("Warriors don't use mana.")),
    resRage: rated(
      1,
      confirmed(['deep-dive-priest-warrior'], 'Rage is the resource, gained from dealing and taking damage.'),
    ),
    roleHealer: rated(0, classic('Warriors have no healing spells.')),
    roleRangedDps: rated(0, classic('Uses ranged weapons only to pull enemies.')),
    selfCleanse: rated(0, classic('No ability removes magic, curses, poisons or diseases.')),
    selfHeal: rated(
      0.2,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Heals 10% of health after a kill (Victory Rush), but has hardly any self-healing after taking heavy damage.',
      ),
    ),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    shapeshift: rated(0, classic('Uses stances instead of shapeshifting.')),
    singleTarget: rated(0.7, ESTIMATE),
    slow: rated(0.7, classic('Can slow an enemy (Hamstring).')),
    soloEndgame: rated(
      0.45,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-warrior-arms'],
        'Warriors cannot easily recover from taking too much damage, so most fights cost downtime; a strike after a kill heals some health (Victory Rush). Guides credit Arms with mobility, control and area burst, but name limited passive sustain and Rage starvation.',
      ),
    ),
    soloLeveling: rated(
      0.55,
      confirmed(
        ['dn', 'deep-dive-priest-warrior'],
        'Rage gains are balanced for questing Warriors, and a kill allows a heal for 10% of maximum health (Victory Rush), but Warriors lack the tools to recover from heavy damage.',
      ),
    ),
    stealth: rated(0, classic('No stealth.')),
    tabTargetTank: rated(0, classic("Arms and Fury don't tank as their main role.")),
    themeArcane: rated(0, classic("Arcane magic is not part of the Warrior's theme; Warriors fight with weapons.")),
    themeElements: rated(0, classic("The elements are not part of the Warrior's theme; Warriors fight with weapons.")),
    themeFel: rated(0, classic("Demons are not part of the Warrior's theme; Warriors fight with weapons.")),
    themeLight: rated(0, classic("The Light is not part of the Warrior's theme; Warriors fight with weapons.")),
    themeMartial: rated(1, confirmed(['hero'], 'Warriors strive for perfection in armed combat.')),
    themeNature: rated(0, classic("Nature is not part of the Warrior's theme; Warriors fight with weapons.")),
    themeShadow: rated(0, classic("Shadow magic is not part of the Warrior's theme; Warriors fight with weapons.")),
    threatControl: rated(0.2, classic('Has hardly any tools to lower threat.')),
    totems: rated(0, classic('No totems.')),
    autoAttack: rated(
      1,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Damage comes from weapon swings and auto attack, and the Rage from hits depends on weapon speed; Fury swings two weapons and draws most of its damage from them.',
      ),
    ),

    weaponCaster: rated(
      0,
      confirmed(['deep-dive-priest-warrior'], 'Warriors fight with weapons, Rage and stances, not with spells.'),
    ),
    weaponDual: rated(
      0.05,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Neither spec rewards a second weapon: Arms fights with a two-hander, and an Arms talent triggers only from main hand attacks (Bloodthrill); Protection carries a shield, which its talents require (Bastion, Master of Defense).',
      ),
    ),
    weaponRanged: rated(
      0.05,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Warriors are the masters of melee combat; a bow, gun or thrown weapon serves at most to pull enemies.',
      ),
    ),
    weaponShield: rated(
      0.1,
      confirmed(
        ['dn', 'p2'],
        'Arms and Fury carry a shield only for emergencies: a macro can swap a two-handed weapon for sword and shield within one global cooldown, and the developers point out that a Warrior can strap on a shield, go into Defensive Stance and save the day.',
        { p2: '22:43' },
      ),
    ),
    weaponTwoHand: rated(
      1.0,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Arms fights with a big two-hander: an Arms talent also rewards polearms and staves, which come only as two-handers (Weaponmaster), and another triggers only from main hand attacks, so a second weapon adds nothing (Bloodthrill).',
      ),
    ),
  },
  specs: {
    'warrior-arms': {
      name: 'Arms',
      traits: {
        defKite: rated(
          0.35,
          community(
            ['wowhead-guide-warrior-arms'],
            'Can slow an enemy (Hamstring) and, by chance, hold it in place, which easily shuts enemies down (Improved Hamstring); but has no way to gain distance.',
          ),
        ),
        autoAttack: rated(
          0.9,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-arms'],
            'Damage comes from weapon swings and auto attack, and the Rage from hits depends on weapon speed; a talent keeps Slam from delaying the swing, but part of the damage comes from abilities (Overpower, Rend).',
          ),
        ),
        apm: rated(
          0.7,
          estimate(
            'Mortal Strike, Overpower and a DoT fill the rotation, but Slam is no filler between swings: it has an 18 sec cooldown, which a talent shortens by up to 3 sec.',
          ),
        ),
        raidUtility: rated(
          0.5,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            "Brings unique buffs and debuffs, and Battle Shout reaches the whole raid; Arms' own talents do not widen the area of the shouts (that is a Fury talent).",
          ),
        ),
        groupDemand: rated(
          0.45,
          confirmed(
            ['deep-dive-priest-warrior', 'p2', 'dn'],
            'Any party or raid is happy to add a Warrior as a tank or damage dealer; as a hybrid damage spec, Arms deals about 5% less damage, and its own talents do not lower the Rage cost of Cleave and Whirlwind (that is a Fury talent).',
            { p2: '22:18' },
          ),
        ),
        gearDependency: rated(
          0.7,
          confirmed(
            ['p2', 'deep-dive-priest-warrior', 'wowhead-guide-warrior-fury'],
            'The developers name the Warrior as a class that cares about gear, and an Arms talent gives a bonus based on the equipped weapon (Weaponmaster); guides find Fury needs large amounts of gear to reach certain stat caps.',
            { p2: '9:52' },
          ),
        ),
        dotDamage: rated(
          0.4,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Weapon strikes deal most of the damage, but Rend matters: it scales with attack power, and an Arms talent gives main hand attacks on targets with Rend a chance to activate Overpower; Deep Wounds adds a rolling DoT.',
          ),
        ),
        aoe: rated(
          0.7,
          confirmed(
            ['deep-dive-priest-warrior', 'p2', 'dn'],
            "Warriors are the kings of cleave with the strongest sustained area damage, a class strength; Arms' own talents do not lower the Rage cost of Cleave and Whirlwind (that is a Fury talent).",
            { p2: '25:01' },
          ),
        ),
        burst: rated(
          0.75,
          confirmed(
            ['p2'],
            'According to the developers, Recklessness is probably the strongest personal cooldown in the game, which is why it has a 30 min cooldown.',
            { p2: '28:47' },
          ),
        ),
        cc: rated(
          0.45,
          community(
            ['wowhead-guide-warrior-arms'],
            'Can control enemies with fear (Intimidating Shout) and, by chance, hold a target in place, which easily shuts enemies down (Improved Hamstring); mostly control of single targets.',
          ),
        ),
        defStand: rated(0.7, classic('Wears plate armor and has lots of health, but usually carries no shield.')),
        escape: rated(
          0.5,
          community(
            ['wowhead-guide-warrior-arms'],
            'Closes distance quickly, which gives great mobility on the battlefield (Charge, Intercept), but has no way to escape.',
          ),
        ),
        execute: rated(0.9, classic('Bonus damage against enemies below 20% health (Execute).')),
        survivability: rated(
          0.6,
          community(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-arms'],
            'A durable front-line fighter that mitigates damage, but lacks the tools to recover from heavy damage and has limited passive sustain.',
          ),
        ),
        healingReduction: rated(1, classic('Reduces the healing the target receives (Mortal Strike).')),
        hybridTax: rated(
          1,
          confirmed(
            ['p2'],
            'As a hybrid damage spec, Arms deals about 5% less damage; every class except Hunter, Mage, Rogue and Warlock counts as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        procs: rated(
          0.75,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'p2'],
            'Reacting to procs shapes the rotation: an Arms talent gives main hand attacks on targets with Rend a chance of up to 20% to activate Overpower (Bloodthrill), a little randomness the developers want.',
            { p2: '32:10' },
          ),
        ),
        pvpBattleground: rated(
          0.75,
          confirmed(['deep-dive-priest-warrior'], 'Can knock riders off their mounts (Spearing Strike).'),
        ),
        roleMeleeDps: rated(1, confirmed(['deep-dive-priest-warrior'], 'A master of melee combat.')),
        roleTank: rated(
          0.3,
          confirmed(
            ['p2'],
            'A Warrior can strap on a shield, go into Defensive Stance and save the day, but without Protection talents it is an emergency tank at best.',
            { p2: '22:43' },
          ),
        ),
        stun: rated(
          0.55,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-arms', 'wowhead-guide-warrior-protection-abilities'],
            'Stuns briefly when closing distance: Charge (1 sec, not in combat) and Intercept (3 sec), which guides find make Arms very mobile. A longer stun is a Protection talent, and an Arms talent makes maces ignore armor but not stun.',
          ),
        ),
      },
    },
    'warrior-fury': {
      name: 'Fury',
      traits: {
        soloEndgame: rated(
          0.35,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-fury'],
            'Warriors lack the tools to easily recover from taking too much damage, and Bloodthirst grants movement speed instead of healing; guides find Fury can struggle in solo content and is best when supported by other people.',
          ),
        ),
        weaponDual: rated(
          1.0,
          confirmed(
            ['dn'],
            'Fury fights with a weapon in each hand: Whirlwind always strikes with both weapons, and a Fury talent raises the hit chance of off-hand attacks.',
          ),
        ),
        weaponTwoHand: rated(
          0.25,
          confirmed(
            ['dn'],
            'Fury builds on a weapon in each hand: Whirlwind always strikes with both, a Fury talent raises the hit chance of off-hand attacks, and no Fury talent rewards a two-hander, which remains a possible side setup.',
          ),
        ),
        levelingDowntime: rated(
          0.55,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-protection', 'dn'],
            'Warriors lack the tools to recover from heavy damage; guides find Victory Rush brings some sustain while leveling, and a Fury talent restores up to 1% health with each of the next 3 melee attacks after Enrage, Bloodthirst and similar abilities.',
          ),
        ),
        eliteSolo: rated(
          0.15,
          community(
            ['wowhead-guide-warrior-fury', 'deep-dive-priest-warrior'],
            'Hard without healing and control: Warriors lack the tools to recover from heavy damage, and Fury can struggle in solo content and does best with support.',
          ),
        ),
        pvpWorld: rated(0.45, estimate('Brings no healing reduction into duels, as Mortal Strike is an Arms talent.')),
        complexity: rated(
          0.6,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-fury'],
            'Has to manage stances and Rage, and Enrage can trigger from any damage taken; guides call the rotation simple on the surface but the Rage management complex at times.',
          ),
        ),
        aoe: rated(
          0.8,
          confirmed(
            ['deep-dive-priest-warrior', 'p2', 'dn'],
            'Warriors are the kings of cleave with the strongest sustained area damage, and a Fury talent lowers the Rage cost of Cleave and Whirlwind (Raging Blows).',
            { p2: '25:01' },
          ),
        ),
        burst: rated(
          0.75,
          confirmed(
            ['p2'],
            'According to the developers, Recklessness is probably the strongest personal cooldown in the game, which is why it has a 30 min cooldown.',
            { p2: '28:47' },
          ),
        ),
        defStand: rated(0.7, classic('Wears plate armor and has lots of health, but usually carries no shield.')),
        escape: rated(
          0.55,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'classic'],
            'Closes distance quickly (Charge, Intercept), Bloodthirst grants 10% movement speed for 10 sec, and a talent removes movement-impairing effects; but there is no real escape.',
          ),
        ),
        execute: rated(0.9, classic('Bonus damage against enemies below 20% health (Execute).')),
        healingReduction: rated(0, classic('No healing reduction, as Mortal Strike is an Arms talent.')),
        hybridTax: rated(
          1,
          confirmed(
            ['p2'],
            'As a hybrid damage spec, Fury deals about 5% less damage; every class except Hunter, Mage, Rogue and Warlock counts as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        procs: rated(
          0.4,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Its procs act passively and ask for no reaction: Enrage can trigger from any damage taken, and Unbridled Rage also triggers by chance.',
          ),
        ),
        soloLeveling: rated(
          0.4,
          community(
            ['wowhead-guide-warrior-fury'],
            'Can struggle when leveling and in other solo content, and does best with support.',
          ),
        ),
        selfHeal: rated(
          0.25,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Bloodthirst does not heal, but a talent restores up to 1% health with each of the next 3 melee attacks after Enrage, Bloodthirst and similar abilities (Gore Drinker).',
          ),
        ),
        singleTarget: rated(
          0.7,
          community(
            ['wowhead-guide-warrior-fury'],
            'Weaker in long single-target fights with little incoming damage, since Rage then comes only from its own hits.',
          ),
        ),
        survivability: rated(
          0.7,
          community(
            ['wowhead-guide-warrior-fury', 'dn'],
            'High base health and plate let Fury tank through damage and survive mistakes, and a Fury talent restores up to 1% health with each of the next 3 melee attacks after Enrage, Bloodthirst and similar abilities.',
          ),
        ),
        pvpBattleground: rated(0.55, ESTIMATE),
        roleMeleeDps: rated(1, confirmed(['deep-dive-priest-warrior'], 'A master of melee combat.')),
        roleTank: rated(
          0.3,
          confirmed(
            ['p2'],
            'A Warrior can strap on a shield, go into Defensive Stance and save the day, but without Protection talents it is an emergency tank at best.',
            { p2: '22:43' },
          ),
        ),
        stun: rated(
          0.55,
          estimate(
            'Stuns briefly while closing distance: Charge stuns for 1 sec but cannot be used in combat, and Fury fights in Berserker Stance, where Intercept stuns for 3 sec in combat. A longer stun is a Protection talent.',
          ),
        ),
      },
    },
    'warrior-protection': {
      name: 'Protection',
      traits: {
        positional: rated(0, classic('Tanks from the front, facing the enemy; no ability needs a position.')),
        soloEndgame: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior'],
            "Warriors can mitigate damage done to them, so shield and plate keep Protection alive against elites, but they lack the tools to easily recover from taking too much damage, and Protection's low damage makes every kill slow and costly.",
          ),
        ),
        weaponShield: rated(
          1.0,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Protection is built on the shield: with one equipped its talents raise all damage and turn dodges, parries and blocks into Rage (Bastion, Master of Defense), the threat talent of its tank stance needs one, and Shield Slam scales with block value.',
          ),
        ),
        weaponTwoHand: rated(
          0.1,
          confirmed(
            ['dn', 'deep-dive-priest-warrior'],
            'Protection fights with a shield, as key talents work only with one equipped (Bastion, Master of Defense); without a shield the talent tree opens only up to its middle, as a PvP secondary spec, so a two-hander stays a rare side option.',
          ),
        ),
        themeMartial: rated(
          0.9,
          confirmed(
            ['hero', 'deep-dive-priest-warrior'],
            'Warriors strive for perfection in armed combat; Protection fights with weapon and shield, and its talents and attacks tie its damage to the shield (Bastion, Shield Slam), so the shield stands next to the blade.',
          ),
        ),
        rangeWeave: rated(
          0.1,
          estimate(
            'A melee tank; a ranged weapon serves only to pull enemies for the group, and a talent makes Charge usable in Defensive Stance to close the distance (Vanguard).',
          ),
        ),
        interrupt: rated(
          0.9,
          confirmed(
            ['dn', 'wowhead-guide-warrior-protection-abilities'],
            'With the shield always equipped, can interrupt spellcasting at any time: Shield Bash interrupts and locks that school of magic for 6 sec, a Protection talent improves it further (Improved Shield Bash), and Pummel is also available.',
          ),
        ),
        autoAttack: rated(
          0.7,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-protection'],
            'Melee swings generate Rage, and a talent gives blocks a chance to generate 5 Rage, but the tanking rests on abilities: guides find Sunder Armor and Revenge generally offer more damage and threat, and strikes such as Shield Slam deal damage of their own.',
          ),
        ),
        apm: rated(
          0.8,
          estimate(
            'Has an input almost every global cooldown: tank abilities such as Revenge, Shield Slam and Thunder Clap on its 6 sec cooldown, plus switching stances and targets to hold threat.',
          ),
        ),
        cc: rated(
          0.45,
          confirmed(
            ['dn', 'wowhead-guide-warrior-protection-abilities'],
            'Can control enemies with fear (Intimidating Shout) and stun one for 5 sec (Concussion Blow); Protection talents such as a shield bash that silences serve as PvP tools (Improved Shield Bash).',
          ),
        ),
        threatControl: rated(0.1, classic('Has no tools to lower threat; as a tank Protection wants to hold it.')),
        singleTarget: rated(0.3, estimate('Tank spec with little damage.')),
        levelingDowntime: rated(
          0.6,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-protection'],
            'Warriors lack the tools to recover from heavy damage, and guides find Victory Rush brings some sustain while leveling; with a shield and a talent for extra Defense, Protection takes less damage (Anticipation).',
          ),
        ),
        groupDemand: rated(
          1,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Any party or raid is happy to add a Warrior as a tank or damage dealer, and Protection fills the tank role.',
          ),
        ),
        gearDependency: rated(
          0.6,
          confirmed(
            ['p2', 'deep-dive-priest-warrior'],
            "The developers name the Warrior as a class that cares about gear, and Shield Slam's damage scales with block value; Rage from taking damage ignores armor, so heavier armor does not cut the tank's Rage.",
            { p2: '9:52' },
          ),
        ),
        complexity: rated(
          0.65,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Has to manage stances and Rage, and as a tank also threat (Thunder Clap usable in Defensive Stance); can gain Rage from blocks, dodges and parries.',
          ),
        ),
        aoe: rated(
          0.55,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Area damage from Thunder Clap, usable in Defensive Stance and scaling with attack power.',
          ),
        ),
        burst: rated(0.2, estimate('Tank spec with little burst.')),
        defStand: rated(
          1,
          confirmed(['deep-dive-priest-warrior'], 'Shield and plate, and a talent raises Defense (Anticipation).'),
        ),
        escape: rated(
          0.4,
          confirmed(['deep-dive-priest-warrior'], 'A talent makes Charge usable in Defensive Stance (Vanguard).'),
        ),
        execute: rated(
          0.4,
          classic(
            'Protection also gets bonus damage against enemies below 20% health, but not in Defensive Stance (Execute).',
          ),
        ),
        healingReduction: rated(0, classic('No healing reduction, as Mortal Strike is an Arms talent.')),
        hybridTax: rated(
          0,
          confirmed(['p2'], 'Protection is a tank spec, so the damage cost of hybrid damage specs does not apply.', {
            p2: '22:18',
          }),
        ),
        procs: rated(
          0.6,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Blocks, dodges and parries with a shield can generate Rage (Shield Specialization, Master of Defense).',
          ),
        ),
        pvpBattleground: rated(
          0.45,
          confirmed(
            ['p2'],
            'The developers say not every spec is built for PvP and expect a Protection Warrior to struggle against a Mage.',
            { p2: '1:08:43' },
          ),
        ),
        pvpWorld: rated(
          0.4,
          confirmed(
            ['p2'],
            'The developers say not every spec is built for PvP and expect a Protection Warrior to struggle against a Mage.',
            { p2: '1:08:43' },
          ),
        ),
        roleMeleeDps: rated(0.3, estimate('Deals little melee damage as a tank.')),
        roleTank: rated(1, confirmed(['deep-dive-priest-warrior'], 'A tank welcome in any group.')),
        soloLeveling: rated(
          0.3,
          confirmed(
            ['dn'],
            'A talent is meant to smooth out leveling as Protection before it gets Shield Slam (Focused Rage).',
          ),
        ),
        stun: rated(
          0.75,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-protection-abilities'],
            'Can stun for 5 sec (Concussion Blow), a talent makes Charge with its 1 sec stun usable in the tank stance, and after a stance swap Intercept stuns for 3 sec.',
          ),
        ),
        survivability: rated(
          0.95,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-warrior-protection-abilities'],
            "Shield Wall has its own 15 min cooldown, and guides call Protection's defensive abilities and cooldowns robust and advise using them liberally while tanking.",
          ),
        ),
        tabTargetTank: rated(
          0.5,
          confirmed(
            [
              'deep-dive-priest-warrior',
              'deep-dive-paladin',
              'wowhead-guide-warrior-protection',
              'wowhead-guide-warrior-protection-abilities',
            ],
            'Thunder Clap works in Defensive Stance and reliably generates threat on up to 4 enemies, which guides find lets Protection tank more than one or two targets without frantic tab-targeting; beyond 4 enemies it has to switch targets.',
          ),
        ),
      },
    },
  },
} satisfies ClassSpecs<'warrior'>;
