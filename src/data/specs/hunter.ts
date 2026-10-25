import { classic, community, confirmed, ESTIMATE, estimate, unconfirmed } from '../evidence/helpers';
import { graded, rated, type ClassSpecs } from '../rated';

/**
 * Hunter: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const HUNTER_SPECS = {
  traits: {
    aoe: rated(
      0.45,
      confirmed(
        [
          'deep-dive-hunter-druid',
          'wowhead-guide-hunter-beast-mastery',
          'wowhead-guide-hunter-beast-mastery-abilities',
        ],
        'Area damage from two shots: Multi-Shot hits 3 targets but shares a cooldown with Aimed Shot, and Volley has no cooldown; a Marksmanship talent raises the damage of both.',
      ),
    ),
    apm: rated(0.5, ESTIMATE),
    armor: rated(0.55, classic('Leather, mail from level 40.')),
    combatReset: rated(
      0.85,
      confirmed(
        ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities'],
        'Can drop combat in PvE by playing dead (Feign Death), though it can miss; the talent that makes it more reliable is a Survival talent.',
      ),
    ),
    complexity: graded(
      { 'hunter-beast-mastery': 0.35, 'hunter-marksmanship': 0.55 },
      community(
        ['wowhead-guide-hunter-beast-mastery', 'wowhead-guide-hunter-marksmanship'],
        'Hunters are easy to pick up. Beast Mastery mostly means keeping two summoned Hawks rolling without refreshing too early; Marksmanship asks a little more, but is not a hard spec.',
      ),
    ),
    deadZone: rated(
      1,
      confirmed(['deep-dive-hunter-druid'], 'Ranged attacks cannot be used within 8 yards of the enemy (dead zone).'),
    ),
    defAbsorb: rated(
      0.3,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Hardly any shields; a Beast Mastery talent raises the chance to dodge (Aspect of the Monkey).',
      ),
    ),
    defKite: rated(
      0.8,
      confirmed(
        ['p2', 'deep-dive-hunter-druid', 'dn'],
        'Hunters are meant to keep enemies at range: traps work in combat, though Auto Shot needs 0.5 sec of standing still.',
        { p2: '58:20' },
      ),
    ),
    defStand: rated(0.2, classic('Leather, mail from level 40, no shield.')),
    dungeonUtility: rated(0, classic('Cannot remove curses, poisons or diseases and cannot resurrect the dead.')),
    execute: rated(0, classic('No bonus damage against weakened enemies.')),
    gearDependency: rated(0.55, confirmed(['deep-dive-hunter-druid'], "Pets gain stats from the Hunter's gear.")),
    groundZones: rated(
      0.5,
      confirmed(
        ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery-abilities'],
        "Traps are placed at your own feet, also in combat (30 sec cooldown), one Fire Trap and one Ice Trap at a time, and Volley hits a targeted area without a cooldown; a Marksmanship talent raises Volley's damage.",
      ),
    ),
    groupDemand: rated(
      0.2,
      community(
        ['wowhead-guide-hunter-beast-mastery', 'wowhead-guide-hunter-survival'],
        'Hunters bring no useful buffs to party or raid, so in ambitious groups they earn a spot only through high damage.',
      ),
    ),
    healAbsorb: rated(0, classic('No ability heals others.')),
    healDirect: rated(0, classic('No ability heals others.')),
    healGroup: rated(0, classic('No ability heals others.')),
    healHot: rated(0, classic('No ability heals others.')),
    healingReduction: rated(
      0.2,
      confirmed(
        ['dn', 'deep-dive-hunter-druid'],
        'Only with a Crocolisk pet: Dismember reduces healing received by 25% for 6 sec on a 15 sec cooldown, so it covers only part of a fight.',
      ),
    ),
    hybridFlex: rated(
      0,
      confirmed(['p2', 'deep-dive-hunter-druid'], "Damage is the Hunter's only role; Hunters don't count as hybrids.", {
        p2: '22:26',
      }),
    ),
    hybridTax: rated(
      0,
      confirmed(['p2'], "Hunters don't count as hybrids, so there is no hybrid damage cost.", { p2: '22:18' }),
    ),
    interrupt: rated(0, confirmed(['deep-dive-hunter-druid'], 'No stun and no interrupt.')),
    levelingDowntime: rated(
      0.2,
      confirmed(
        ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
        'Each talent tree has a mana regeneration talent, which guides find keeps breaks short, and the pet takes the hits.',
      ),
    ),
    positional: rated(0, classic('No ability needs a position.')),
    procs: rated(0.3, ESTIMATE),
    pvpBattleground: rated(
      0.6,
      confirmed(
        ['p2'],
        "Very strong at long range; opponents beat a Hunter by getting in close, where the shots don't work.",
        { p2: '57:34' },
      ),
    ),
    pvpWorld: rated(
      0.7,
      confirmed(
        ['p2'],
        "Very strong at long range; opponents beat a Hunter by getting in close, where the shots don't work.",
        { p2: '57:34' },
      ),
    ),
    reagentDependency: rated(
      1,
      confirmed(
        ['dn', 'wowhead-guide-hunter-beast-mastery'],
        'Shots use up ammo, and a quiver or ammo pouch takes a bag slot; Beast Mastery and Marksmanship shoot all the time, so the need never stops.',
      ),
    ),
    resEnergy: rated(0, classic("Hunters don't use energy.")),
    resMana: rated(
      1,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Mana is the only resource and pays for shots, stings and traps; talents lower the cost.',
      ),
    ),
    resRage: rated(0, classic("Hunters don't use rage.")),
    roleHealer: rated(0, confirmed(['deep-dive-hunter-druid'], 'A pure damage class.')),
    roleTank: rated(0, confirmed(['deep-dive-hunter-druid'], 'A damage class; only the pet tanks.')),
    selfCleanse: rated(0, classic('No ability removes magic, curses, poisons or diseases.')),
    selfHeal: rated(0.05, classic('No self-healing except First Aid.')),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    shapeshift: rated(0, classic('No shapeshifting.')),
    singleTarget: rated(
      0.8,
      confirmed(
        ['p2', 'wowhead-guide-hunter-beast-mastery'],
        "Hunters don't count as hybrids, so there is no hybrid damage cost; guides tie a raid spot to high base damage alone.",
        { p2: '22:26' },
      ),
    ),
    slow: rated(
      0.8,
      confirmed(
        ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities'],
        'Several slows (Concussive Shot, Wing Clip, Frost Trap); traps work in combat (30 sec cooldown), and two pet families slow as well.',
      ),
    ),
    soloEndgame: rated(
      0.85,
      confirmed(
        ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
        'The pet can tank in solo play, and guides call Hunter kiting strong as long as enemies lack ranged control or gap closers. Survival plays with or without a pet and has melee options for the dead zone within 8 yards.',
      ),
    ),
    soloLeveling: rated(
      0.95,
      confirmed(
        [
          'deep-dive-hunter-druid',
          'wowhead-guide-hunter-beast-mastery',
          'wowhead-guide-hunter-marksmanship',
          'wowhead-guide-hunter-survival',
        ],
        'The pet can tank in solo play, and guides call all three specs very powerful in solo content.',
      ),
    ),
    stealth: rated(0, classic('No stealth of its own.')),
    stun: rated(
      0.05,
      confirmed(
        ['deep-dive-hunter-druid', 'dn', 'wowhead-spell-intimidation', 'classic'],
        'No stun of its own; a Marksmanship talent gives a chance to stun, and a Beast Mastery talent lets the pet stun for 3 sec (Improved Concussive Shot, Intimidation).',
      ),
    ),
    survivability: rated(0.6, ESTIMATE),
    tabTargetTank: rated(0, classic('Not a tank class.')),
    themeArcane: rated(
      0.15,
      confirmed(
        ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities'],
        'Every Hunter uses two shots that deal Arcane damage (Arcane Shot, Volley), but the class is a ranged fighter with a trusted companion rather than a wielder of raw magic, so the theme stays small.',
      ),
    ),
    themeElements: rated(0, classic("The elements are not part of the Hunter's theme.")),
    themeFel: rated(0, classic("Demons are not part of the Hunter's theme.")),
    themeLight: rated(0, classic("The Light is not part of the Hunter's theme.")),
    themeMartial: graded(
      { 'hunter-beast-mastery': 0.6, 'hunter-marksmanship': 0.95 },
      confirmed(
        ['deep-dive-hunter-druid'],
        'Bow, gun and melee weapons are part of the class theme. Marksmanship masters the bow and rewards fighting without a pet (Lone Wolf); Beast Mastery lets its pet and summoned Hawks carry much of the fight.',
      ),
    ),
    themeNature: rated(0.8, confirmed(['hero'], 'Hunters have the gift of taming wild beasts.')),
    themeShadow: rated(0, classic("Shadow magic is not part of the Hunter's theme.")),
    threatControl: rated(
      0.95,
      confirmed(
        ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery-abilities'],
        'Several ways to shed threat: Disengage lowers it, Feign Death drops combat in PvE, and the pet can draw a large amount of threat with one of its abilities.',
      ),
    ),
    totems: rated(0, classic('No totems.')),

    weaponCaster: rated(
      0.05,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Hunters fight with bow or gun, melee weapons and a trusted companion rather than with spells.',
      ),
    ),
    weaponDual: rated(
      0.05,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Beast Mastery and Marksmanship fight at range with bow or gun; nothing in their talents rewards a second melee weapon.',
      ),
    ),
    weaponRanged: rated(
      1.0,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Beast Mastery and Marksmanship fight at range with bow or gun, with the longest range of any class.',
      ),
    ),
    weaponShield: rated(0, classic('Hunters cannot use a shield.')),
    weaponTwoHand: rated(
      0.1,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Beast Mastery and Marksmanship fight at range with bow or gun; their melee weapon, which may be a two-hander, serves only for brief melee strikes.',
      ),
    ),
  },
  specs: {
    'hunter-beast-mastery': {
      name: 'Beast Mastery',
      traits: {
        healingReduction: rated(
          0.25,
          confirmed(
            ['dn', 'deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery'],
            'Only with a Crocolisk pet: Dismember reduces healing received by 25% for 6 sec on a 15 sec cooldown; guides find it guts healing in PvP.',
          ),
        ),
        deadZone: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery'],
            'Ranged attacks cannot be used within 8 yards (dead zone), which guides find hurts Beast Mastery, but the pet keeps dealing damage up close.',
          ),
        ),
        soloEndgame: rated(
          1,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery'],
            'The pet takes the hits while the Hunter attacks from the longest range of any class, guides call the kiting strong, and elites in the open world and farming need no group.',
          ),
        ),
        themeNature: rated(
          1,
          confirmed(
            ['hero', 'deep-dive-hunter-druid'],
            'Hunters befriend wild animals and tame them as pets; Beast Mastery builds its talents around the pet and makes the bond with beasts its core.',
          ),
        ),
        gearDependency: rated(
          0.25,
          confirmed(
            ['deep-dive-hunter-druid'],
            "Pets gain stats from the Hunter's gear, but the talents raise the damage of the pet and of summoned Hawks, so the pet and its talents carry much of the damage.",
          ),
        ),
        groundZones: rated(
          0.45,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'Traps are placed at your own feet, also in combat (30 sec cooldown), one Fire Trap and one Ice Trap at a time, and Volley hits a targeted area; in the guides Beast Mastery places a trap only occasionally.',
          ),
        ),
        survivability: rated(
          0.7,
          confirmed(
            ['deep-dive-hunter-druid'],
            'The pet can tank in solo play, and a talent raises the chance to dodge (Aspect of the Monkey).',
          ),
        ),
        aoe: rated(
          0.45,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'wowhead-guide-hunter-beast-mastery',
              'wowhead-guide-hunter-beast-mastery-abilities',
            ],
            'Area damage from Multi-Shot, which hits 3 targets but shares a cooldown with Aimed Shot, and from Volley without a cooldown; some pet families add area attacks.',
          ),
        ),
        burst: rated(
          0.8,
          community(
            ['wowhead-guide-hunter-beast-mastery'],
            'Guides expect high burst while Bestial Wrath is up; two summoned Hawks together with the pet under it may be a lethal burst combo.',
          ),
        ),
        cc: rated(
          0.65,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'wowhead-guide-hunter-beast-mastery',
              'wowhead-guide-hunter-beast-mastery-abilities',
            ],
            'Freezing Trap freezes a single target for 20 sec, traps work in combat (30 sec cooldown), and with a Beast Mastery talent the pet stuns for 3 sec (Intimidation); Hunters cannot stun or interrupt on their own.',
          ),
        ),
        dotDamage: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'One damage-over-time sting that scales slightly with attack power (Serpent Sting); several pet families add bleeds or poisons.',
          ),
        ),
        eliteSolo: rated(0.9, confirmed(['deep-dive-hunter-druid'], 'The pet can tank solo and in small groups.')),
        escape: rated(
          0.75,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'p2',
              'wowhead-guide-hunter-beast-mastery',
              'wowhead-guide-hunter-beast-mastery-abilities',
            ],
            'Many tools to keep enemies away (Aspect of the Cheetah, Feign Death, Concussive Shot), plus traps in combat; guides call Hunter kiting strong as long as enemies lack ranged control or gap closers.',
            { p2: '58:20' },
          ),
        ),
        pet: rated(1, confirmed(['deep-dive-hunter-druid'], 'The pet can tank solo and in small groups.')),
        petControl: rated(
          1,
          confirmed(
            ['deep-dive-hunter-druid'],
            'The talents support playing with the pet, and every pet family brings its own abilities.',
          ),
        ),
        raidUtility: rated(
          0.25,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery'],
            "Little raid utility: Hunter's Mark and a Wolf howl that buffs only the party's melee attack power (Furious Howl); guides see no raid buffs, at most some armor reduction from a pet ability.",
          ),
        ),
        range: rated(1, confirmed(['deep-dive-hunter-druid'], 'Longest range of all classes.')),
        rangeWeave: rated(
          0.3,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities', 'p2'],
            'Ranged attacks cannot be used within 8 yards (dead zone), and in the guides Beast Mastery occasionally mixes in a melee ability; melee weaving takes Survival talents.',
            { p2: '57:05' },
          ),
        ),
        roleMeleeDps: rated(
          0,
          confirmed(
            ['p2', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'Melee weaving takes talents, and in the guides Beast Mastery only occasionally mixes in a melee ability.',
            { p2: '57:10' },
          ),
        ),
        roleRangedDps: rated(1, confirmed(['deep-dive-hunter-druid'], 'Strong ranged abilities.')),
        stun: rated(
          0.35,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery'],
            'Hunters cannot stun on their own, but with a Beast Mastery talent the pet stuns the target for 3 sec on its next successful attack (Intimidation).',
          ),
        ),
        autoAttack: rated(
          0.5,
          confirmed(['dn'], 'Auto Shot keeps firing during Aimed Shot; it needs 0.5 sec of standing still.'),
        ),
      },
    },
    'hunter-marksmanship': {
      name: 'Marksmanship',
      traits: {
        themeArcane: rated(
          0.2,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'A talent shortens the cooldown of Arcane Shot, so the two Arcane shots come up often (Arcane Shot, Volley); still an archer rather than a wielder of raw magic.',
          ),
        ),
        soloEndgame: rated(
          0.75,
          community(
            ['wowhead-guide-hunter-marksmanship', 'deep-dive-hunter-druid'],
            'Deals 20% more damage only without an active pet (Lone Wolf), so Marksmanship is assumed to play without the tanking pet when alone. Kiting and range stay strong, but guides find the dead zone within 8 yards especially punishing.',
          ),
        ),
        themeNature: rated(
          0.55,
          confirmed(
            ['hero', 'deep-dive-hunter-druid'],
            'Hunters know the uncharted places of the world and become master trackers, but Lone Wolf rewards fighting without a pet, so the bond with beasts is optional.',
          ),
        ),
        threatControl: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'Can lower threat (Disengage) and drop combat in PvE by playing dead (Feign Death), but without a pet under Lone Wolf, nothing draws threat away from the Hunter.',
          ),
        ),
        apm: rated(
          0.35,
          confirmed(
            ['deep-dive-hunter-druid', 'dn'],
            'A calm pace with cast times: Sniper Shot casts for 4 sec on a 15 sec cooldown, Aimed Shot is cast as well, and Auto Shot fires only after 0.5 sec without moving.',
          ),
        ),
        levelingDowntime: rated(
          0.3,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            'A talent regenerates mana while casting after Serpent Sting hits, which guides find keeps breaks short; but Marksmanship is assumed to level without a pet for the bonus damage of Lone Wolf, so nothing takes the hits and it rests often.',
          ),
        ),
        stun: rated(
          0.1,
          confirmed(
            ['deep-dive-hunter-druid', 'dn'],
            'No stun of its own; a Marksmanship talent may add a brief stun (Improved Concussive Shot).',
          ),
        ),
        survivability: rated(
          0.5,
          community(
            ['wowhead-guide-hunter-marksmanship'],
            'Usually no pet in dungeons and raids because of Lone Wolf, so there is often no pet to take the hits.',
          ),
        ),
        soloLeveling: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            "The pet can tank in solo play, though Marksmanship's talents reward fighting without one (Lone Wolf); guides call all three specs very powerful in solo content.",
          ),
        ),
        singleTarget: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            'High damage: Lone Wolf grants 20% more without an active pet, and Sniper Shot hits even harder than Aimed Shot; guides tie a group spot to serious damage.',
          ),
        ),
        pvpBattleground: rated(
          0.7,
          confirmed(
            ['p2', 'deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            "Very strong at long range, but opponents beat a Hunter by getting in close, where the shots don't work. Guides find the long casts hard to land in PvP, but call a Marksmanship Hunter left alone extremely lethal.",
            { p2: '57:34' },
          ),
        ),
        gearDependency: rated(
          0.5,
          confirmed(
            ['deep-dive-hunter-druid'],
            "The damage comes from the Hunter's own shots and ranged weapon: all attacks deal 20% more damage while no pet is active (Lone Wolf), and a talent adds up to 100% of Intellect to Attack Power.",
          ),
        ),
        burst: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            'Guides find the long casts bring high burst; Sniper Shot hits even harder than Aimed Shot.',
          ),
        ),
        cc: rated(
          0.65,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'Freezing Trap freezes a single target for 20 sec and traps work in combat (30 sec cooldown); Hunters cannot stun or interrupt on their own, but a Marksmanship talent may add a brief stun.',
          ),
        ),
        dotDamage: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            'One damage-over-time sting (Serpent Sting), and a Marksmanship talent raises its damage by 20%.',
          ),
        ),
        eliteSolo: rated(
          0.7,
          community(
            ['wowhead-guide-hunter-marksmanship', 'deep-dive-hunter-druid'],
            'Pet control lets Hunters solo very tough targets, but Marksmanship is assumed to give up the tanking pet for Lone Wolf, which grants 20% more damage only without an active pet.',
          ),
        ),
        escape: rated(
          0.75,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'p2',
              'wowhead-guide-hunter-marksmanship',
              'wowhead-guide-hunter-beast-mastery-abilities',
            ],
            'Many tools to keep enemies away (Aspect of the Cheetah, Feign Death, Concussive Shot), plus traps in combat; guides call Hunter kiting strong as long as enemies lack ranged control or gap closers.',
            { p2: '58:20' },
          ),
        ),
        groupDemand: rated(
          0.2,
          community(
            ['wowhead-guide-hunter-marksmanship'],
            'Without a pet and with an aura that does nothing for melee, groups take the spec only for serious damage.',
          ),
        ),
        pet: rated(
          0.6,
          confirmed(['deep-dive-hunter-druid'], 'Can keep a pet, but Lone Wolf grants 20% more damage without one.'),
        ),
        petControl: rated(
          0.1,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship'],
            'Deals 20% more damage with all attacks while no pet is active (Lone Wolf), and guides expect Marksmanship to play without one in dungeons and raids.',
          ),
        ),
        raidUtility: rated(
          0.4,
          confirmed(
            ['dn', 'wowhead-guide-hunter-marksmanship'],
            "One raid-wide buff, the Hunters' only one, which raises only ranged attack power (Trueshot Aura).",
          ),
        ),
        range: rated(1, confirmed(['deep-dive-hunter-druid'], 'Longest range of all classes.')),
        rangeWeave: rated(
          0.25,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-marksmanship', 'p2'],
            'Ranged attacks cannot be used within 8 yards (dead zone), which guides find hits Marksmanship especially hard, and Sniper Shot has a base range of 45 yards; melee weaving takes Survival talents.',
            { p2: '57:05' },
          ),
        ),
        roleMeleeDps: rated(0, confirmed(['p2'], 'Melee is deliberately kept out of Marksmanship.', { p2: '56:04' })),
        roleRangedDps: rated(1, confirmed(['deep-dive-hunter-druid'], 'Strong ranged abilities.')),
        autoAttack: rated(
          0.5,
          confirmed(['dn'], 'Auto Shot keeps firing during Aimed Shot; it needs 0.5 sec of standing still.'),
        ),
      },
    },
    'hunter-survival': {
      name: 'Survival',
      traits: {
        positional: rated(
          0.25,
          confirmed(
            ['dn', 'deep-dive-hunter-druid'],
            'Fights in melee, where no ability needs a position, but standing behind the target avoids its parries and blocks.',
          ),
        ),
        weaponRanged: rated(
          0.45,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'A melee spec with traps whose talents let it switch back and forth between ranged and melee combat, so its kit uses both.',
          ),
        ),
        weaponDual: rated(
          0.65,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            "Fights in melee, and a talent raises off-hand damage while dual-wielding (Predator's Edge), which guides call really strong; Survival also shoots and can wield a two-hander.",
          ),
        ),
        weaponTwoHand: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            "A two-hander works, but a talent raises off-hand damage while dual-wielding (Predator's Edge), which makes two weapons the stronger setup; Survival competes with Warriors, Rogues and possibly Paladins for weapons.",
          ),
        ),
        themeElements: rated(
          0.2,
          confirmed(
            ['deep-dive-hunter-druid'],
            "Fire and frost traps are the Hunter's only tie to the elements, and Survival is the trap build, with talents that make traps more reliable (Survival Tactics) and shorten their cooldown; at heart a weapon fantasy, so the theme stays faint.",
          ),
        ),
        slow: rated(
          0.9,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities', 'wowhead-guide-hunter-survival'],
            'Several slows (Concussive Shot, Wing Clip, Frost Trap); Frost Trap slows every enemy in its zone by 60%, and a Survival talent cuts trap cooldowns by 40%.',
          ),
        ),
        reagentDependency: rated(
          0.9,
          confirmed(
            ['dn', 'p2', 'wowhead-guide-hunter-survival'],
            'Shots use up ammo, and a quiver or ammo pouch takes a bag slot; but Survival can stay in melee, and an option switches automatically between auto attack and Auto Shot, so it often fights in melee instead of shooting.',
            { p2: '55:25' },
          ),
        ),
        levelingDowntime: rated(
          0.25,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'A talent regenerates mana (Resourcefulness), but guides find Survival can likely be played with or without a pet, so a pet does not always take the hits.',
          ),
        ),
        combatReset: rated(
          0.9,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-beast-mastery-abilities'],
            'Can drop combat in PvE by playing dead (Feign Death), and a Survival talent makes it hit more reliably, though not always (Survival Tactics).',
          ),
        ),
        groupDemand: rated(
          0.15,
          community(
            ['wowhead-guide-hunter-survival'],
            'Hunters bring no useful buffs to party or raid, and Survival competes with Warriors, Rogues and possibly Paladins for weapons.',
          ),
        ),
        soloLeveling: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            "The pet can tank in solo play, though Survival's talents do not build around it; guides call Survival very powerful in solo content and most likely playable with or without a pet.",
          ),
        ),
        aoe: rated(
          0.4,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'wowhead-guide-hunter-beast-mastery',
              'wowhead-guide-hunter-beast-mastery-abilities',
              'wowhead-guide-hunter-survival',
            ],
            'Area damage from Multi-Shot, which hits 3 targets but shares a cooldown with another shot, and from Volley without a cooldown; a Survival talent cuts trap cooldowns by 40%, so Fire Trap comes more often.',
          ),
        ),
        apm: rated(
          0.9,
          community(
            ['wowhead-guide-hunter-survival'],
            'Almost always a button to press, combining melee abilities with traps.',
          ),
        ),
        burst: rated(0.55, ESTIMATE),
        complexity: rated(
          0.6,
          confirmed(
            ['p2'],
            'Two ways to play: staying in melee is lazier but easy; weaving means attacking from range, running in when Mongoose Bite activates, unloading melee attacks and a trap, and stepping back out.',
            { p2: '55:18' },
          ),
        ),
        cc: rated(
          0.7,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'dn',
              'wowhead-guide-hunter-beast-mastery-abilities',
              'wowhead-guide-hunter-survival',
            ],
            'Control through traps: Freezing Trap freezes one target for 20 sec, Entrapment triggers on every trap (on the frost trap only when it is first set off, and weaker when repeated), and a Survival talent cuts trap cooldowns by 40%.',
          ),
        ),
        deadZone: rated(
          0.15,
          confirmed(
            ['p2', 'deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'A melee spec with traps that fights up close, so only its shots drop out within 8 yards; Survival is the answer the developers give to players who hate the dead zone.',
            { p2: '57:47' },
          ),
        ),
        dotDamage: rated(
          0.35,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Little damage over time: Serpent Sting and, with a talent, a bleed over 21 sec from Mongoose Bite; most of the damage comes from direct melee and ranged attacks.',
          ),
        ),
        eliteSolo: rated(0.9, confirmed(['deep-dive-hunter-druid'], 'The pet can tank solo and in small groups.')),
        escape: rated(
          0.8,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'dn',
              'wowhead-guide-hunter-survival',
              'wowhead-guide-hunter-beast-mastery-abilities',
            ],
            'Many tools to keep enemies away (Aspect of the Cheetah, Feign Death, Concussive Shot), plus a melee strike that briefly raises movement speed; talents shorten slows on you and trap cooldowns, and guides call Hunter kiting strong.',
          ),
        ),
        groundZones: rated(
          0.75,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-hunter-survival'],
            'Traps are placed at your own feet, also in combat (30 sec cooldown), one Fire Trap and one Ice Trap at a time, and a Survival talent cuts trap cooldowns by 40%.',
          ),
        ),
        pet: rated(
          0.7,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'The pet can tank solo and in small groups, but guides find Survival can likely be played with or without one.',
          ),
        ),
        petControl: rated(
          0.7,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'Every pet family has its own ability and the pet can tank solo and in small groups, but Survival builds on traps and melee, and guides find it can likely be played with or without a pet.',
          ),
        ),
        procs: rated(
          0.7,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'p2', 'wowhead-guide-hunter-survival'],
            "Reacts to chance effects (procs): attacks on the marked target can activate Mongoose Bite for 10 sec (Expose Prey, Hunter's Mark), and Survival runs in to use it, which makes Mongoose Bite part of the rotation.",
            { p2: '55:45' },
          ),
        ),
        pvpBattleground: rated(
          0.65,
          estimate(
            'Survival also fights in melee, so getting in close, the usual counter to Hunters, works less well against it.',
          ),
        ),
        pvpWorld: rated(
          0.75,
          estimate(
            'Survival also fights in melee, so getting in close, the usual counter to Hunters, works less well against it.',
          ),
        ),
        raidUtility: rated(
          0.2,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            "Little raid utility: Hunter's Mark and a Wolf howl that buffs only the party's melee attack power (Furious Howl); guides see no raid buffs, at most a debuff another class already applies, and Survival can likely play without a pet.",
          ),
        ),
        range: rated(
          0.25,
          unconfirmed(
            ['p2', 'deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'Fights close with some range: the developers leave open whether Survival stays in melee or stands at range and runs in for Mongoose Bite, and the guide for the beta calls it a melee spec with traps.',
            { p2: '55:18' },
          ),
        ),
        rangeWeave: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid', 'dn', 'p2'],
            'Switches between ranged and melee combat: talents support it, an option swaps automatically between auto attack and Auto Shot, and you run in for Mongoose Bite, a trap and Strider Kick and step back out; staying in melee is another way to play.',
            { p2: '55:18' },
          ),
        ),
        roleMeleeDps: rated(
          0.8,
          unconfirmed(
            ['p2', 'deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'Mostly a melee role, though not a pure melee spec: the developers leave open whether Survival stays in melee with Mongoose Bite, Strider Kick and traps or stands at range and runs in, and the guide for the beta calls it a melee spec with traps.',
            { p2: '55:18' },
          ),
        ),
        roleRangedDps: rated(
          0.45,
          unconfirmed(
            ['p2', 'deep-dive-hunter-druid', 'wowhead-guide-hunter-survival'],
            'A partial ranged role: every Hunter has Aimed Shot, and in one of the two play styles the developers outline, Survival shoots until Mongoose Bite activates; the guide for the beta calls it a melee spec with traps.',
            { p2: '55:18' },
          ),
        ),
        singleTarget: rated(
          0.8,
          community(
            ['wowhead-guide-hunter-survival', 'deep-dive-hunter-druid'],
            'Guides expect great sustained damage, since there is almost always a button to press; most of the damage comes from direct melee and ranged attacks.',
          ),
        ),
        themeMartial: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid'],
            "Blade and bow: melee talents let the Hunter move back and forth between ranged and melee combat (Predator's Edge, Strider Kick, Mongoose Bite).",
          ),
        ),
        autoAttack: rated(
          0.7,
          confirmed(['deep-dive-hunter-druid'], 'Strider Kick as a weapon damage attack; melee talents for Survival.'),
        ),
      },
    },
  },
} satisfies ClassSpecs<'hunter'>;
