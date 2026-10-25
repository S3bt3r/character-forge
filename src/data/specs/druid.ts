import { classic, community, confirmed, estimate } from '../evidence/helpers';
import { rated, type ClassSpecs } from '../rated';

/**
 * Druid: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const DRUID_SPECS = {
  traits: {
    armor: rated(0.3, classic('Leather armor.')),
    cc: rated(
      0.3,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Druid crowd control is weaker and less reliable, mostly roots that hold enemies in place.',
      ),
    ),
    deadZone: rated(0, classic('No minimum range: every ability works up close.')),
    defAbsorb: rated(
      0.2,
      confirmed(['deep-dive-hunter-druid'], 'Barkskin also usable in forms; otherwise hardly any shields.'),
    ),
    defKite: rated(
      0.4,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Can root enemies in place, also indoors (Entangling Roots), but cannot slow them.',
      ),
    ),
    dungeonUtility: rated(
      0.75,
      confirmed(
        ['deep-dive-hunter-druid', 'dn', 'wowhead-guide-druid-feral-tank-abilities', 'wowhead-guide-druid-restoration'],
        'Can resurrect the dead out of combat and in combat (Revive, Rebirth) and removes curses and poisons, but not diseases.',
      ),
    ),
    execute: rated(0, classic('No bonus damage against weakened enemies.')),
    healAbsorb: rated(
      0,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Druid healing relies on heals over time; no Druid spell shields an ally or absorbs damage on it.',
      ),
    ),
    healDirect: rated(
      0.05,
      confirmed(
        ['deep-dive-hunter-druid', 'dn', 'p2', 'wowhead-guide-druid-balance', 'wowhead-guide-druid-feral'],
        "Balance and Feral heal only after leaving their form, and Feral is not meant to heal, though a Feral talent adds some spell healing. Guides count spot heals among Balance's strengths.",
        { p2: '51:26' },
      ),
    ),
    healGroup: rated(
      0.05,
      confirmed(
        ['deep-dive-hunter-druid', 'p2', 'wowhead-guide-druid-feral', 'wowhead-guide-druid-balance-abilities'],
        'Balance and Feral heal others only after leaving their form, as Moonkin Form allows every spell except heals; the group heal stays a rare emergency (Tranquility). Feral is not meant to heal, and guides do not see Balance as a main healer either.',
        { p2: '51:26' },
      ),
    ),
    healHot: rated(
      0.05,
      confirmed(
        ['p2', 'wowhead-guide-druid-feral'],
        'Heals over time only after leaving the animal form (Rejuvenation, Regrowth); Feral is not meant to heal, and guides leave the form when extra healing is needed.',
        { p2: '51:26' },
      ),
    ),
    healingReduction: rated(0, classic('No healing reduction.')),
    hybridFlex: rated(1, confirmed(['deep-dive-hunter-druid'], 'Tank, melee, ranged and healer.')),
    pet: rated(0, classic('No pet.')),
    petControl: rated(0, classic('No pet.')),
    procs: rated(0.5, confirmed(['deep-dive-hunter-druid'], 'Omen of Clarity is a baseline ability for all Druids.')),
    rangeWeave: rated(0, estimate('Balance and Restoration cast from fixed range, without melee in their play.')),
    reagentDependency: rated(0.2, classic('Seeds for Rebirth and herbs for greater group buffs.')),
    selfCleanse: rated(
      0.5,
      confirmed(
        ['dn', 'wowhead-guide-druid-feral-tank-abilities', 'wowhead-guide-druid-restoration'],
        'Removes curses and poisons, but no magic or diseases (Remove Curse, Cure Poison); guides note that Remove Curse also removes Banes.',
      ),
    ),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    slow: rated(0, confirmed(['deep-dive-hunter-druid'], 'No slow.')),
    soloEndgame: rated(
      0.55,
      community(
        ['wowhead-guide-druid-balance', 'wowhead-guide-druid-balance-abilities'],
        "Balance deals ranged damage and keeps the Druid's healing spells to recover after fights and handle difficult situations; but mana limits its output and many talents go into mana recovery, which slows farming and long sessions alone.",
      ),
    ),
    tabTargetTank: rated(0, classic("Balance and Restoration don't tank as their main role.")),
    themeElements: rated(0, classic("The elements are not part of the Druid's theme.")),
    themeFel: rated(0, classic("Demons are not part of the Druid's theme.")),
    themeLight: rated(0, classic("The Light is not part of the Druid's theme.")),
    themeMartial: rated(0, classic("Weapon mastery is not part of the Druid's theme.")),
    themeNature: rated(1, confirmed(['deep-dive-hunter-druid'], 'The Druid keeps its bond with nature.')),
    themeShadow: rated(0, classic("Shadow magic is not part of the Druid's theme.")),
    totems: rated(0, classic('No totems.')),

    weaponCaster: rated(
      1.0,
      confirmed(
        ['deep-dive-hunter-druid', 'deep-dive-panel'],
        'Balance and Restoration fight with nature magic, and spellcaster weapons grant spell damage and healing.',
      ),
    ),
    weaponDual: rated(
      0,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Druids fight with nature magic or in animal form, never with a weapon in each hand.',
      ),
    ),
    weaponRanged: rated(
      0,
      confirmed(['deep-dive-hunter-druid'], 'Druids attack at range only with nature magic, not with a bow or gun.'),
    ),
    weaponShield: rated(
      0,
      confirmed(['deep-dive-hunter-druid'], 'Druids fight with nature magic or in animal form and carry no shield.'),
    ),
    weaponTwoHand: rated(
      0,
      confirmed(
        ['deep-dive-hunter-druid'],
        'Balance and Restoration fight with nature magic; a staff serves their spells, not mighty blows.',
      ),
    ),
  },
  specs: {
    'druid-balance': {
      name: 'Balance',
      traits: {
        themeNature: rated(
          0.9,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Balance calls on nature magic, roots and storms, but the moon shapes its identity as well (Moonfire, Starfire).',
          ),
        ),
        themeElements: rated(
          0.3,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Balance calls on wind and earth (Hurricane, Entangling Roots), but draws on nature magic and the moon rather than the elements as allies.',
          ),
        ),
        healHot: rated(
          0.1,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance'],
            "Balance has to leave Moonkin Form to heal over time, as the form allows no heals; a Balance talent makes these heals last longer (Nature's Splendor), and guides count flexible spot heals among Balance's strengths.",
          ),
        ),
        aoe: rated(
          0.55,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance'],
            'Area damage from a storm without a cooldown (Hurricane); guides use it from 5 targets on and keep DoTs on two targets below that.',
          ),
        ),
        apm: rated(0.5, estimate('Medium pace with cast times.')),
        burst: rated(
          0.5,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Phases of faster casting: Wrath shortens the cast time of the next 2 Starfire casts, up to 4 charges (Eclipse).',
          ),
        ),
        cc: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance'],
            'Druid crowd control is weaker and less reliable, but Balance can root up to 3 enemies at once (Overgrowth), and its roots break less often from damage and work indoors (Entangling Roots); guides count crowd control of multiple targets among its strengths.',
          ),
        ),
        combatReset: rated(
          0.05,
          estimate('No way to drop combat; shapeshifting only breaks movement-impairing effects to run away.'),
        ),
        complexity: rated(
          0.3,
          community(
            ['wowhead-guide-druid-balance'],
            'The rotation is simple enough to learn in an evening, and mana is the limit: keep two DoTs on the target and alternate two damage spells, where one speeds up the other (Eclipse).',
          ),
        ),
        defStand: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Tougher in Moonkin Form and Bear Form; a Feral talent adds armor there as well.',
          ),
        ),
        dotDamage: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance'],
            'Balance keeps two DoTs on the target (Moonfire, Insect Swarm), and Balance talents increase all periodic damage and make both last longer.',
          ),
        ),
        eliteSolo: rated(
          0.45,
          estimate(
            'Mana limits long fights: Balance pulls one enemy at a time and roots anything that closes the distance, up to 3 targets at once (Entangling Roots, Overgrowth).',
          ),
        ),
        escape: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-feral-tank-abilities'],
            "Shifting form breaks slows, and Travel Form and Nature's Grasp help you get away; Nature's Grasp also works indoors and in forms.",
          ),
        ),
        gearDependency: rated(
          0.45,
          confirmed(
            ['p2', 'wowhead-guide-druid-balance'],
            "Spell power gear is available from level 10; guides find that caster weapons carry spell damage and do more for your damage than most armor pieces, and that mana rather than talents limits Balance's output.",
            { p2: '10:11' },
          ),
        ),
        groundZones: rated(
          0.5,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance', 'wowhead-guide-druid-balance-abilities'],
            'One area spell to place, a storm without a cooldown (Hurricane); guides call it the spell for AoE.',
          ),
        ),
        groupDemand: rated(
          0.5,
          community(
            ['wowhead-guide-druid-balance', 'dn'],
            'Brings a raid-wide aura (Moonkin Aura), and guides rate its raid utility highly for a damage spec, but whether the damage is viable for raids is unclear.',
          ),
        ),
        hybridTax: rated(
          1,
          confirmed(
            ['p2'],
            'Hybrid damage specs deal about 5% less damage; every class except Hunter, Mage, Rogue and Warlock counts as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        interrupt: rated(0, confirmed(['deep-dive-hunter-druid'], 'No silence, no slow, no interrupt.')),
        levelingDowntime: rated(
          0.85,
          community(
            ['wowhead-guide-druid-balance'],
            'Mana is what limits you: pull one enemy at a time and drink between fights rather than pushing through.',
          ),
        ),
        positional: rated(
          0,
          classic(
            'Ranged caster: no damage spell needs a position, and the positional attacks of Cat Form play no part.',
          ),
        ),
        pvpBattleground: rated(
          0.65,
          community(
            ['wowhead-guide-druid-balance', 'deep-dive-hunter-druid'],
            'Can root up to 3 enemies at once (Overgrowth) and heal itself; deep Balance builds are competitive in PvP.',
          ),
        ),
        pvpWorld: rated(
          0.7,
          community(
            ['wowhead-guide-druid-balance', 'wowhead-guide-druid-balance-abilities', 'deep-dive-hunter-druid'],
            "Can root up to 3 enemies at once (Overgrowth) and heal itself; deep Balance builds are competitive in PvP, and Nature's Grasp is exceptionally good there.",
          ),
        ),
        raidUtility: rated(
          0.8,
          confirmed(
            ['dn', 'wowhead-guide-druid-balance', 'deep-dive-hunter-druid'],
            "Brings a raid-wide aura for spell crits (Moonkin Aura), a group buff and mana help (Mark of the Wild, Innervate), and a debuff that lowers the enemy's chance to hit. Guides rate its raid utility highly for a damage spec.",
          ),
        ),
        range: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid'],
            "Casts from range; a talent extends the range of all damage spells (Nature's Reach).",
          ),
        ),
        resEnergy: rated(0, classic('Energy only in Cat Form, not core for the spec.')),
        resMana: rated(1, confirmed(['deep-dive-hunter-druid'], 'Mana is the main resource.')),
        resRage: rated(0, classic('Rage only in Bear Form, not core for the spec.')),
        roleHealer: rated(
          0.25,
          confirmed(['p2'], "Hybrids can heal with their mana bar, but aren't strong at it.", { p2: '17:56' }),
        ),
        roleMeleeDps: rated(0, classic('Caster spec without a melee role.')),
        roleRangedDps: rated(1, confirmed(['deep-dive-hunter-druid'], "Balance as the Druid's caster path.")),
        roleTank: rated(
          0.1,
          confirmed(['p3'], 'Early dungeons can be tanked by Druids in Bear Form even without Feral talents.', {
            p3: '44:51',
          }),
        ),
        selfHeal: rated(
          0.75,
          confirmed(['p2'], 'Good self-healing with a mana bar and healing spells.', {
            p2: '18:01',
          }),
        ),
        shapeshift: rated(0.6, confirmed(['deep-dive-hunter-druid'], 'Moonkin Form; smooth shapeshifting in general.')),
        singleTarget: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance', 'p2'],
            'The main damage comes from Starfire, since Wrath is cheap but weak; hybrid damage is meant to stay competitive, and guides find mana rather than talents limits the output.',
            { p2: '19:36' },
          ),
        ),
        soloLeveling: rated(
          0.6,
          confirmed(
            ['dn', 'p2', 'wowhead-guide-druid-balance'],
            'Guides call Balance a reasonably safe leveling choice: Wrath is tuned to be strong enough on its own before Starfire, though Druids may be tuned down a little elsewhere.',
            { p2: '11:48' },
          ),
        ),
        stealth: rated(
          0,
          community(
            ['wowhead-guide-druid-balance-abilities'],
            'Stealth in Cat Form is available, but Balance has no reason to enter Cat Form.',
          ),
        ),
        stun: rated(
          0.35,
          community(
            ['wowhead-guide-druid-balance-abilities'],
            'A short stun in Bear Form (Bash, 4 sec) that every spec finds occasional use for, at the cost of leaving Moonkin Form.',
          ),
        ),
        survivability: rated(
          0.55,
          confirmed(
            ['p2', 'deep-dive-hunter-druid'],
            'Hybrids are already good at healing themselves with a mana bar; Barkskin is usable while shapeshifted and Bear Form helps in an emergency, but Balance is a caster in leather.',
            { p2: '18:01' },
          ),
        ),
        themeArcane: rated(
          0.5,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-balance', 'wowhead-guide-druid-balance-abilities'],
            'Half arcane, half nature: Starfire, the main damage spell, and Moonfire deal Arcane damage, while Wrath deals Nature damage and the class is rooted in nature.',
          ),
        ),
        threatControl: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid'],
            'A Restoration talent lowers the threat of all Arcane and Nature spells, and Balance can take it as well (Subtlety).',
          ),
        ),
        autoAttack: rated(
          0.05,
          estimate('Damage comes from spells; weapon swings only happen on the rare trip into Bear Form.'),
        ),
      },
    },
    'druid-feral': {
      name: 'Feral',
      traits: {
        soloEndgame: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-feral-tank', 'wowhead-guide-druid-feral-abilities'],
            'Feral picks its fights from Stealth, holds elites in Bear Form and heals up to full health with Rage (Frenzied Regeneration); guides find this makes threatening open world situations a breeze. But Druids cannot snare and have weaker crowd control.',
          ),
        ),
        weaponCaster: rated(
          0.1,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Feral fights in Cat Form or Bear Form; spells serve only as side tools outside these forms.',
          ),
        ),
        weaponTwoHand: rated(
          0.2,
          confirmed(
            ['deep-dive-hunter-druid'],
            "The equipped weapon's DPS sets the damage of auto attacks in Cat Form and Bear Form, so a high-DPS weapon such as a two-hander matters; the fight itself happens in animal form, not with a swung weapon.",
          ),
        ),
        themeMartial: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid'],
            "A melee fighter, but with claws and fangs rather than blade and bow: in Cat Form and Bear Form, auto attacks and weapon-based attacks use the equipped weapon's DPS.",
          ),
        ),
        selfCleanse: rated(
          0.45,
          estimate('Removes curses and poisons, but Feral has to leave its animal form to do so.'),
        ),
        rangeWeave: rated(
          0.1,
          estimate('Fights in melee in Cat or Bear Form and leaves it only for the odd spell from range.'),
        ),
        dungeonUtility: rated(
          0.65,
          estimate(
            'The same resurrections and curse and poison removal as every Druid, but Feral has to leave its animal form to cast them.',
          ),
        ),
        defKite: rated(
          0.3,
          confirmed(
            ['deep-dive-hunter-druid'],
            "Cannot slow enemies; Nature's Grasp works in form, but Entangling Roots means leaving the animal form.",
          ),
        ),
        defAbsorb: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid'],
            'No barrier, but two talents raise the Dodge chance, also in Bear Form, Berserk clears Fear and grants immunity to it, and Barkskin works in form.',
          ),
        ),
        cc: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-spell-feral-charge'],
            'Druid crowd control is weaker and less reliable, but Feral talents add to it: a shorter cooldown for the stun in Bear Form (Bash) and a leap in Bear Form that holds the target in place (Feral Charge).',
          ),
        ),
        aoe: rated(
          0.25,
          confirmed(
            ['p2', 'deep-dive-hunter-druid'],
            'No sustained area damage outside Bear Form: only there do attacks hit up to 3 targets at once (Swipe, and a second attack during Berserk).',
            { p2: '25:12' },
          ),
        ),
        apm: rated(
          0.85,
          confirmed(
            ['dn', 'p2', 'deep-dive-hunter-druid'],
            'Fast pace: Cat Form rarely waits for Energy, as Shifting Power grants 40 Energy on a 16 sec cooldown, 8 sec with talents.',
            { p2: '15:38' },
          ),
        ),
        burst: rated(
          0.65,
          confirmed(
            ['deep-dive-hunter-druid', 'dn'],
            'For 15 sec every 3 min, combo abilities in Cat Form gain +100% crit chance (Berserk), and Shifting Power instantly turns mana into 40 energy.',
          ),
        ),
        combatReset: rated(
          0.1,
          estimate(
            'No way to drop combat; Cower greatly reduces threat in Cat Form, and shapeshifting breaks movement-impairing effects to run away.',
          ),
        ),
        complexity: rated(
          0.8,
          community(
            ['wowhead-guide-druid-feral-tank', 'wowhead-guide-druid-feral', 'deep-dive-hunter-druid'],
            'Easy to pick up but hard to master: juggling shapeshift forms can overwhelm new players, and a really good Feral Druid uses every form for different events; Shifting Power turns mana into energy.',
          ),
        ),
        defStand: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid'],
            'More armor in animal form through a talent (Thick Hide), and Defense on gear helps.',
          ),
        ),
        dotDamage: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Bleeds that tick on the target (Rake, Rip, and Lacerate from level 42).',
          ),
        ),
        eliteSolo: rated(0.6, estimate('Bear Form and self-healing.')),
        escape: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-feral'],
            'Guides see Feral as very mobile (Feral Swiftness, Feral Charge, Dash); the speed bonus also works indoors, the leap in either animal form.',
          ),
        ),
        gearDependency: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid', 'p2'],
            "Gear matters: auto attacks in form use the weapon's DPS, a talent lets Druid tanks benefit from Defense items (Thick Hide), and Shifting Power makes Intellect matter.",
            { p2: '16:19' },
          ),
        ),
        groundZones: rated(
          0.05,
          estimate(
            'In Cat or Bear Form nothing is placed on the ground; Swipe hits the enemies around the Druid, and Hurricane works only outside form.',
          ),
        ),
        groupDemand: rated(
          0.7,
          community(
            ['wowhead-guide-druid-feral', 'wowhead-guide-druid-feral-tank', 'dn'],
            'Seen as the perfect off-tank and easy to fit into groups thanks to its hybrid nature; Leader of the Pack is raid-wide.',
          ),
        ),
        hybridTax: rated(
          1,
          confirmed(
            ['p2'],
            'Hybrid damage specs deal about 5% less damage; every class except Hunter, Mage, Rogue and Warlock counts as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        interrupt: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-spell-feral-charge'],
            'Interrupts spellcasting for 4 sec with a leap in Bear Form that also holds the target in place (Feral Charge); the Cat Form version does not interrupt.',
          ),
        ),
        levelingDowntime: rated(
          0.3,
          estimate(
            'Cat Form fights run on energy, but heals out of form and Shifting Power cost mana, so some drinking between fights.',
          ),
        ),
        positional: rated(
          0.85,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'wowhead-guide-druid-feral-abilities',
              'wowhead-guide-druid-feral',
              'wowhead-guide-druid-feral-tank-abilities',
            ],
            'Fights mostly from behind: the main attack (Shred) and both openers from Stealth work only behind the target, the attack from the front is weaker, and a leap in Cat Form lands behind the enemy. In Bear Form the same spec tanks facing the enemy.',
          ),
        ),
        pvpBattleground: rated(0.6, estimate('Mobile and able to stealth.')),
        pvpWorld: rated(0.75, estimate('Stealth and mobility for world PvP.')),
        raidUtility: rated(
          0.7,
          confirmed(
            ['dn'],
            'Brings a raid-wide aura for melee and ranged crits (Leader of the Pack), plus a group buff and mana help (Mark of the Wild, Innervate).',
          ),
        ),
        range: rated(0, classic('Fighting in Cat Form or Bear Form in melee.')),
        resEnergy: rated(0.8, confirmed(['dn'], 'Energy in Cat Form; Shifting Power converts mana into 40 energy.')),
        resMana: rated(0.4, confirmed(['deep-dive-hunter-druid'], 'Shifting Power makes mana relevant for cats too.')),
        resRage: rated(0.6, confirmed(['dn'], 'Rage in Bear Form; more rage on critical strikes.')),
        roleHealer: rated(
          0.25,
          confirmed(
            ['p2', 'dn', 'wowhead-guide-druid-feral'],
            "Hybrids like Feral can heal, but aren't supposed to be good at it; a Feral talent adds some spell healing, and guides heal out of form when extra healing is needed.",
            { p2: '17:56' },
          ),
        ),
        roleMeleeDps: rated(
          0.9,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Cat Form damage around Shred is a core role, and Druids are fully capable tanks and damage dealers; but the same spec also carries Bear Form tanking, so it is not a pure damage dealer.',
          ),
        ),
        roleRangedDps: rated(0, classic('Melee spec without a ranged role.')),
        roleTank: rated(
          0.8,
          confirmed(
            ['p2', 'deep-dive-hunter-druid', 'dn'],
            'Fully capable tank, also for dungeons in Bear Form; Defense counts, Bear Form threat bonus is 50%.',
            { p2: '24:19' },
          ),
        ),
        selfHeal: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid', 'dn'],
            'A rage-fueled heal restores up to 100% of health (Frenzied Regeneration), plus healing spells that a Feral talent strengthens.',
          ),
        ),
        shapeshift: rated(
          1,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Shapeshifted Druids use consumables, weapon effects and racial abilities without leaving form; the core of Feral.',
          ),
        ),
        singleTarget: rated(
          0.65,
          confirmed(
            ['deep-dive-hunter-druid'],
            'The main attack works well without much talent support (Shred), the fallback needs no extra talent (Claw), and attacks in form use weapon DPS.',
          ),
        ),
        soloLeveling: rated(
          0.75,
          community(
            ['wowhead-guide-druid-feral-tank', 'deep-dive-hunter-druid'],
            'Healing, stealth and tanking make threatening open world situations a breeze; Frenzied Regeneration heals up to 100% of max health given enough rage.',
          ),
        ),
        stealth: rated(0.8, confirmed(['deep-dive-hunter-druid'], 'Stealth in Cat Form with its bonuses.')),
        stun: rated(
          0.7,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'wowhead-guide-druid-feral-abilities',
              'wowhead-guide-druid-feral-tank-abilities',
            ],
            'Two stuns without leaving its forms: Bash, which a talent makes more frequent, and Pounce from Stealth.',
          ),
        ),
        survivability: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Bear Form; Frenzied Regeneration heals up to 100% of max health given enough rage.',
          ),
        ),
        tabTargetTank: rated(
          0.55,
          confirmed(
            ['deep-dive-hunter-druid'],
            'As a tank, one attack hits 3 targets (Swipe), but the high-threat attacks work on one target, so further enemies need target switching; only Berserk lets Primal Bite hit up to 3 targets for 15 sec.',
          ),
        ),
        themeArcane: rated(0, classic("Arcane magic is not part of Feral's theme.")),
        threatControl: rated(
          0.5,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-feral-tank-abilities'],
            'Cower greatly reduces threat in Cat Form, a button for the moment it matters, but drops no aggro fully.',
          ),
        ),
        autoAttack: rated(
          0.8,
          confirmed(
            ['deep-dive-hunter-druid'],
            "Auto attacks in animal form use the equipped weapon's DPS and weapon procs work, but abilities carry a large share of the damage.",
          ),
        ),
      },
    },
    'druid-restoration': {
      name: 'Restoration',
      traits: {
        soloEndgame: rated(
          0.4,
          confirmed(
            ['deep-dive-panel'],
            'Restoration puts its talents into healing, so it kills slowly alone; bonus healing adds a third as much bonus damage, which gives healing specializations more support in the world, and its heals keep it alive.',
          ),
        ),
        healHot: rated(
          1.0,
          confirmed(
            ['deep-dive-hunter-druid', 'dn'],
            "Heals over time are the core of Druid healing: one covers the target's whole party (Wild Growth), Swiftmend does not use up the HoTs on the target, and Rejuvenation can land critical hits.",
          ),
        ),
        healDirect: rated(
          0.45,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration'],
            'Druid healing relies on heals over time, though guides call the direct heals strong single-target heals (Healing Touch, Swiftmend, Regrowth).',
          ),
        ),
        healGroup: rated(
          0.85,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration'],
            "A heal over time on the target's whole party, pets included (Wild Growth), and a talent shortens the cooldown of the big group heal (Tranquility); guides find its main heals on a 1 sec global cooldown give lots of healing coverage in raids.",
          ),
        ),
        procs: rated(
          0.4,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration'],
            'Watch for a proc buff, then cast a large heal: guides find that massive for mana efficiency (Omen of Clarity, baseline for all Druids), while HoTs go out proactively.',
          ),
        ),
        aoe: rated(0.15, estimate('Healer spec with little AoE damage.')),
        apm: rated(
          0.6,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration'],
            'Fast HoT blankets: a talent cuts the global cooldown of its main heals to 1 sec (Gift of the Earthmother).',
          ),
        ),
        burst: rated(0.1, estimate('Healer spec with little burst.')),
        combatReset: rated(
          0.05,
          estimate('No way to drop combat; shapeshifting only breaks movement-impairing effects to run away.'),
        ),
        complexity: rated(
          0.8,
          community(
            ['wowhead-guide-druid-restoration'],
            'Healing through HoTs takes time and foresight, HoTs need to be applied proactively, and it is easy to misjudge a situation; not the most straightforward healing spec for new players.',
          ),
        ),
        defStand: rated(
          0.25,
          estimate(
            'Leather armor; Bear Form helps in an emergency, but Restoration heals outside it and lacks the Feral armor talent.',
          ),
        ),
        dotDamage: rated(
          0.3,
          confirmed(['deep-dive-hunter-druid'], 'Only one DoT (Moonfire); the other Druid DoT is a Balance talent.'),
        ),
        eliteSolo: rated(0.6, estimate('Lots of healing, little damage.')),
        escape: rated(
          0.6,
          confirmed(
            [
              'deep-dive-hunter-druid',
              'wowhead-guide-druid-restoration-abilities',
              'wowhead-guide-druid-feral-tank-abilities',
            ],
            "Shifting form breaks slows, and Travel Form and Nature's Grasp help you get away, the latter also indoors and in forms; guides find Dash useful for all specs.",
          ),
        ),
        gearDependency: rated(
          0.25,
          community(
            ['wowhead-guide-druid-restoration'],
            'Relies little on gear: two effects give strong regeneration in combat to outlast long encounters (Reflection, Omen of Clarity).',
          ),
        ),
        groundZones: rated(0.2, classic('Hardly any ground effects.')),
        groupDemand: rated(
          0.7,
          community(
            ['wowhead-guide-druid-restoration'],
            'Healers are in demand, but some groups look for more than great healing: Restoration Druids bring no unique offensive utility and are commonly the first candidates when raids trim healers.',
          ),
        ),
        hybridTax: rated(
          0,
          confirmed(['p2'], 'Restoration is a healer spec, so the damage cost of hybrid damage specs does not apply.', {
            p2: '22:18',
          }),
        ),
        interrupt: rated(0, confirmed(['deep-dive-hunter-druid'], 'No silence, no slow, no interrupt.')),
        levelingDowntime: rated(0.35, estimate('Healer leveling with mana breaks.')),
        positional: rated(
          0,
          classic(
            'Healer at range: no healing spell needs a position, and the positional attacks of Cat Form play no part.',
          ),
        ),
        pvpBattleground: rated(0.8, estimate('A HoT healer who shifts forms is hard to pin down.')),
        pvpWorld: rated(0.6, estimate('Tough, but little damage; shapeshifting frees the Druid from slows.')),
        raidUtility: rated(
          0.55,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration', 'dn'],
            'Every Druid has the stronger group buff built in (Improved Mark of the Wild), plus Innervate and Rebirth; guides see no unique offensive utility beyond what any Druid can maintain.',
          ),
        ),
        range: rated(0.85, estimate('Heals over time from full healing spell range.')),
        resEnergy: rated(
          0,
          confirmed(
            ['deep-dive-hunter-druid', 'dn'],
            'Not core for the spec: energy only in Cat Form, and a Restoration talent banks energy outside it (Furor).',
          ),
        ),
        resMana: rated(
          1,
          confirmed(
            ['deep-dive-hunter-druid'],
            'Mana is the main resource; a talent restores plenty of mana while casting (Reflection).',
          ),
        ),
        resRage: rated(0, classic('Rage only in Bear Form, not core for the spec.')),
        roleHealer: rated(
          1,
          confirmed(
            ['deep-dive-hunter-druid'],
            'A powerful healer with a limited toolkit that relies on HoTs, including a group HoT (Wild Growth).',
          ),
        ),
        roleMeleeDps: rated(0, classic('Healer spec without a melee role.')),
        roleRangedDps: rated(0, classic('Healer spec without a ranged role.')),
        roleTank: rated(
          0.1,
          confirmed(['p3'], 'Early dungeons can be tanked by Druids in Bear Form even without Feral talents.', {
            p3: '44:51',
          }),
        ),
        selfHeal: rated(1, confirmed(['deep-dive-hunter-druid'], 'Full healing spells as Restoration.')),
        shapeshift: rated(
          0.5,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration-abilities'],
            'Shapeshifted Druids use consumables and racial abilities without leaving form; for healers Travel Form and Bear Form.',
          ),
        ),
        singleTarget: rated(0.25, estimate('Healer spec with little damage.')),
        soloLeveling: rated(0.4, estimate('Little damage as a healer.')),
        stealth: rated(
          0.2,
          community(
            ['wowhead-guide-druid-restoration-abilities'],
            'Stealth in Cat Form is frequently useful for all specs, but not core to the spec.',
          ),
        ),
        stun: rated(
          0.35,
          community(
            ['wowhead-guide-druid-restoration-abilities'],
            'A short stun in Bear Form (Bash, 4 sec) that every spec finds occasional use for, at the cost of pausing healing.',
          ),
        ),
        survivability: rated(0.75, estimate('Lots of self-healing through HoTs.')),
        themeArcane: rated(
          0.1,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration-abilities'],
            'A side note: Restoration is a healer rooted in nature; Arcane shows only in two damage spells (Moonfire, Starfire) and in a talent that guards Arcane and Nature spells against interruption.',
          ),
        ),
        threatControl: rated(
          0.55,
          confirmed(
            ['deep-dive-hunter-druid', 'wowhead-guide-druid-restoration'],
            'Lowers threat with a talent in its own tree, by up to 30% for all Arcane and Nature spells (Subtlety), plus Cower in Cat Form.',
          ),
        ),
        autoAttack: rated(
          0.05,
          estimate('Healing comes from spells; weapon swings only happen on the rare trip into Bear Form.'),
        ),
      },
    },
  },
} satisfies ClassSpecs<'druid'>;
