import { CLASSIC, classic, community, confirmed, estimate, unconfirmed } from '../evidence/helpers';
import { graded, rated, type ClassSpecs } from '../rated';

/**
 * Priest: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const PRIEST_SPECS = {
  traits: {
    apm: graded(
      { 'priest-discipline': 0.55, 'priest-holy': 0.5, 'priest-shadow': 0.4 },
      estimate(
        'Spells with cast times set the pace. Discipline fits spells with short cooldowns between its heals (Penance, Power Word: Shield), Holy weaves in Prayer of Mending and switches between heals, and Shadow mostly casts and channels its spells.',
      ),
    ),
    armor: rated(0, confirmed(['deep-dive-priest-warrior'], 'Limited to cloth armor.')),
    cc: graded(
      { 'priest-discipline': 0.5, 'priest-holy': 0.5, 'priest-shadow': 0.55 },
      confirmed(
        ['deep-dive-priest-warrior'],
        'Every Priest has crowd control (Psychic Scream); Shadow can also silence a target with a talent (Silence).',
      ),
    ),
    combatReset: rated(
      0.1,
      confirmed(
        ['deep-dive-priest-warrior', 'dn', 'wowhead-guide-priest-shadow-abilities'],
        'Lowers threat for 10 sec (Fade), after which all threat returns, so it ends no fight; no talent improves it, and Priests have no other way to drop combat.',
      ),
    ),
    deadZone: rated(0, classic('No minimum range: every spell works up close.')),
    defKite: rated(
      0.05,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Priests have few ways to escape enemies, and Discipline and Holy have no freeze, root or slow of their own. Only Dwarf Priests can briefly hold a Humanoid in place, for 2 sec on a 2 min cooldown (Chastise).',
      ),
    ),
    defStand: rated(
      0.1,
      confirmed(['deep-dive-priest-warrior'], 'Limited to cloth armor; a little armor from Inner Fire.'),
    ),
    escape: rated(0.3, confirmed(['deep-dive-priest-warrior'], 'Wears only cloth and has few ways to escape enemies.')),
    gearDependency: rated(
      0.25,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Healing Priests need no hit chance from gear: a talent raises the hit chance of Holy spells by up to 18% (Holy Precision), since healing Priests are not expected to wear gear with hit chance.',
      ),
    ),
    groundZones: rated(0, confirmed(['deep-dive-priest-warrior'], 'No ground effects.')),
    healAbsorb: rated(
      0.5,
      confirmed(
        ['deep-dive-priest-warrior', 'p2'],
        'Holy can wrap allies in a shield that absorbs damage (Power Word: Shield), something no other healer can do. For Holy it is a real but secondary part of a mixed toolkit.',
        { p2: '1:14:25' },
      ),
    ),
    healDirect: rated(
      0.8,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy'],
        'Holy heals both directly and over time (Flash Heal, Greater Heal) and with a talent that heals the Priest and the target at once (Binding Heal): a full set of direct heals, though guides see Holy built around raid healing.',
      ),
    ),
    healGroup: rated(
      0.5,
      confirmed(
        ['deep-dive-priest-warrior', 'p2', 'wowhead-guide-priest-discipline'],
        "Heals the target's whole party at once, pets included (Prayer of Healing). The developers see keeping a tank alive as Discipline's likely strength; guides note that its talents strengthen single-target healing and find its group healing just okay.",
        { p2: '1:14:32' },
      ),
    ),
    healHot: rated(
      0.3,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-priest-discipline-abilities'],
        "Has an instant heal over time that several Priests can keep on the same target (Renew), but Discipline's talents go into shields and Penance rather than heals over time.",
      ),
    ),
    healingReduction: rated(
      0,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy-abilities'],
        'Priests cannot reduce the healing an enemy receives; only Troll Priests lower it by 20% (Hex of Weakness).',
      ),
    ),
    hybridFlex: rated(
      0.55,
      confirmed(
        ['deep-dive-priest-warrior', 'p2'],
        'Can heal or deal Shadow damage, two of the three roles but no tank; Dual Specialization comes at level 40. A Smite build deals damage and heals, and can heal in dungeons.',
        { p2: '1:12:40' },
      ),
    ),
    pet: rated(0, classic('No pet.')),
    petControl: rated(0, classic('No pet.')),
    positional: rated(0, classic('No ability needs a position.')),
    range: rated(
      0.85,
      community(
        ['wowhead-guide-priest-holy'],
        'Spells reach about 30 yards, and the group heal reaches 40 yards (Prayer of Healing).',
      ),
    ),
    rangeWeave: rated(0, classic('Fixed range as a caster.')),
    reagentDependency: rated(0.2, classic('Group buffs use up candles, and feathers are used up as well.')),
    resEnergy: rated(0, classic("Priests don't use energy.")),
    resMana: rated(1, classic('Mana is the only resource.')),
    resRage: rated(0, classic("Priests don't use rage.")),
    roleMeleeDps: rated(0, classic('Priests do not fight in melee.')),
    roleTank: rated(0, classic('Not a tank.')),
    selfCleanse: rated(
      0.5,
      community(
        ['wowhead-guide-priest-discipline-abilities', 'deep-dive-priest-warrior'],
        'Can remove magic and diseases, but no poisons or curses (Dispel Magic, Cure Disease); Shadow uses both in Shadowform too, as the form blocks only heals.',
      ),
    ),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    soloEndgame: rated(
      0.75,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-priest-discipline'],
        'Discipline leans into shields (Power Word: Shield); guides call it an unkillable solo spec that few elites can challenge. Still, Priests are very vulnerable in cloth armor with few ways to escape, and rely on friends who can tank or control.',
      ),
    ),
    stealth: rated(0, classic('No stealth as a class ability.')),
    stun: rated(
      0,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Cannot stun; Dwarf Priests can only hold a Humanoid in place for 2 sec while damaging it (Chastise).',
      ),
    ),
    tabTargetTank: rated(0, classic('Not a tank class.')),
    themeArcane: rated(
      0.05,
      confirmed(
        ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy-abilities'],
        'Priests draw on the Light and Shadow rather than arcane magic; their only Arcane spell is a Night Elf racial (Starshards).',
      ),
    ),
    themeElements: rated(0, CLASSIC),
    themeFel: rated(0, CLASSIC),
    themeLight: rated(0.9, confirmed(['deep-dive-priest-warrior'], 'Priests draw power from the Light and Shadow.')),
    themeMartial: rated(0, CLASSIC),
    themeNature: rated(0, CLASSIC),
    themeShadow: graded(
      { 'priest-discipline': 0.3, 'priest-holy': 0.2, 'priest-shadow': 1 },
      confirmed(
        ['deep-dive-priest-warrior', 'dn'],
        'Priests draw power from the Light and Shadow, and every Priest has Shadow spells (Shadow Word: Death, Devouring Plague); for Shadow they are the core. Discipline also rewards keeping a Shadow DoT on the target (Power in Light).',
      ),
    ),
    threatControl: rated(
      0.7,
      confirmed(
        ['deep-dive-priest-warrior', 'dn', 'wowhead-spell-silent-resolve'],
        'Can lower threat (Fade), and a Discipline talent lowers the threat of all spells by 30% (Silent Resolve); no talent improves Fade.',
      ),
    ),
    totems: rated(0, classic('No totems.')),
    autoAttack: rated(
      0.1,
      community(
        ['wowhead-guide-priest-discipline', 'dn'],
        'Fights with spells instead of weapon swings. The wand is a mainstay while leveling, but wands do not scale with spell damage and need 0.5 sec of standing still.',
      ),
    ),

    weaponCaster: rated(
      1.0,
      confirmed(
        ['deep-dive-priest-warrior', 'deep-dive-panel'],
        'Discipline, Holy and Shadow all fight with spells as versatile spellcasters, and spellcaster weapons grant spell damage and healing.',
      ),
    ),
    weaponDual: rated(
      0,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Priests are versatile spellcasters and fight with spells, not with weapons.',
      ),
    ),
    weaponRanged: rated(
      0,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Priests are versatile spellcasters and attack with spells, not with a bow or gun.',
      ),
    ),
    weaponShield: rated(
      0,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Priests are versatile spellcasters and fight with spells, not with weapons.',
      ),
    ),
    weaponTwoHand: rated(
      0,
      confirmed(
        ['deep-dive-priest-warrior'],
        'Priests are versatile spellcasters and fight with spells, not with weapons; a staff serves their spells, not mighty blows.',
      ),
    ),
  },
  specs: {
    'priest-discipline': {
      name: 'Discipline',
      traits: {
        themeArcane: rated(
          0.1,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'wowhead-guide-priest-discipline-abilities'],
            'Discipline draws from the Light, with a faint tie to raw magical energy: its talents speed up Mana Burn and strengthen Starshards, the Arcane spell of Night Elf Priests.',
          ),
        ),
        healDirect: rated(
          0.85,
          confirmed(
            ['deep-dive-priest-warrior', 'p2', 'wowhead-guide-priest-discipline'],
            "Heals single allies directly, for example with a channeled talent that heals every second (Penance). The developers see keeping a tank alive as Discipline's likely strength, and guides find its talents strengthen single-target healing.",
            { p2: '1:14:40' },
          ),
        ),
        healAbsorb: rated(
          1.0,
          confirmed(
            ['p2', 'deep-dive-priest-warrior', 'wowhead-guide-priest-discipline'],
            "Shields that absorb damage are Discipline's big strength, and its talents lean further into them, such as a shield left by critical heals (Divine Aegis). Guides call them the best absorbs in the game.",
            { p2: '1:14:25' },
          ),
        ),
        defStand: rated(
          0.15,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Only cloth armor, with a little extra armor from Inner Fire, which a Discipline talent strengthens (Improved Inner Fire).',
          ),
        ),
        aoe: rated(
          0.15,
          community(
            ['wowhead-guide-priest-discipline-abilities', 'wowhead-guide-priest-shadow-abilities'],
            'Hardly any area damage; the one area damage spell is a Holy talent and needs points outside the Discipline tree (Holy Nova).',
          ),
        ),
        burst: rated(0.15, estimate('A healer spec whose damage spells bring only small spikes (Penance, Smite).')),
        complexity: rated(
          0.55,
          community(
            ['wowhead-guide-priest-discipline'],
            'Straightforward to pick up, with enough complexity to stay interesting; shields need timing around Weakened Soul.',
          ),
        ),
        defAbsorb: rated(
          0.9,
          confirmed(['p2'], "Shields that absorb damage are Discipline's big strength.", {
            p2: '1:14:25',
          }),
        ),
        dotDamage: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Has two damage over time spells (Devouring Plague, Shadow Word: Pain); every Priest learns the plague at level 20.',
          ),
        ),
        dungeonUtility: rated(
          0.5,
          community(
            ['wowhead-guide-priest-discipline-abilities'],
            'Can cure diseases and resurrect the dead out of combat, but cannot remove poisons or curses (Cure Disease).',
          ),
        ),
        eliteSolo: rated(
          0.8,
          community(
            ['wowhead-guide-priest-discipline'],
            'An unkillable solo spec: great survivability tools and decent damage, so few elite enemies can challenge you.',
          ),
        ),
        execute: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Every Priest learns an instant Shadow damage spell at level 32 (Shadow Word: Death), but it hurts the Priest if the target survives.',
          ),
        ),
        groupDemand: rated(
          0.9,
          confirmed(
            ['p2', 'wowhead-guide-priest-discipline'],
            "The developers see keeping a tank alive as Discipline's likely strength; guides expect no trouble getting invites to heal groups and a high chance to feature in many raid compositions.",
            { p2: '1:14:40' },
          ),
        ),
        hybridTax: rated(
          0,
          confirmed(
            ['p2'],
            'Discipline is a healer spec, so the damage cost of about 5% for hybrid damage specs does not apply.',
            { p2: '22:18' },
          ),
        ),
        interrupt: rated(0, classic('Cannot interrupt spells; only a Shadow talent can (Silence).')),
        levelingDowntime: rated(
          0.4,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-discipline'],
            'Breaks for mana after fights are common; a talent keeps 50% of the mana regeneration from Spirit while casting (Meditation).',
          ),
        ),
        procs: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Few effects to react to: non-periodic critical heals add an absorb shield on their own (Divine Aegis), and the main spells run on cooldowns (Penance, Power Word: Shield).',
          ),
        ),
        pvpBattleground: rated(
          0.95,
          community(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-discipline'],
            'Heals directly and over time and shields allies with the best absorbs in the game (Power Word: Shield). A talent heals allies or damages enemies every second (Penance). In a battleground, allies cover the few ways to escape.',
          ),
        ),
        pvpWorld: rated(
          0.7,
          unconfirmed(
            ['p4'],
            'Called just good in the official podcast when talk turned to the community PvP tournament (Penance); according to the developers, the class changes are not made for that tournament.',
            { p4: '1:01:13' },
          ),
        ),
        raidUtility: rated(
          0.7,
          confirmed(
            ['deep-dive-priest-warrior', 'p2'],
            'Brings buffs every Priest has: Divine Spirit from level 30, and Power Word: Fortitude, which is so good that groups bring a Priest for it.',
            { p2: '1:10:28' },
          ),
        ),
        roleHealer: rated(
          1,
          confirmed(['deep-dive-priest-warrior'], 'The most versatile healer: HoTs, direct heals, absorb shields.'),
        ),
        roleRangedDps: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Damage stays a side role: a talent makes two of its damage spells hit harder on targets with Holy Fire or Shadow Word: Pain (Power in Light).',
          ),
        ),
        selfHeal: rated(1, classic('Full healing spells, also on yourself.')),
        shapeshift: rated(0, classic('No shapeshifting.')),
        singleTarget: rated(
          0.3,
          community(['wowhead-guide-priest-discipline'], 'Healer spec with decent damage (Smite, Penance).'),
        ),
        slow: rated(
          0,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-shadow-abilities'],
            'Cannot slow enemies; the only Priest slow comes with a Shadow talent (Mind Flay).',
          ),
        ),
        soloLeveling: rated(
          0.7,
          community(
            ['wowhead-guide-priest-discipline'],
            'Great survivability tools and decent damage make Discipline an unkillable solo spec and a great one for soloing out in the world.',
          ),
        ),
        survivability: rated(
          0.7,
          community(
            ['wowhead-guide-priest-discipline'],
            'Survives very well through strong shields and healing, despite cloth armor and few ways to escape.',
          ),
        ),
      },
    },
    'priest-holy': {
      name: 'Holy',
      traits: {
        soloEndgame: rated(
          0.45,
          confirmed(
            ['p2', 'deep-dive-priest-warrior'],
            'The developers call a Holy build that deals damage with Smite and heals great for going out in the world. Full healing costs it a lot of damage (hybrid tax), though, and Priests are very vulnerable in cloth armor with few ways to escape, so kills stay slow.',
            { p2: '1:12:32' },
          ),
        ),
        healHot: rated(
          0.55,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'wowhead-guide-priest-holy'],
            'Heals over time alongside direct heals: Renew can be active from several Priests on the same target and can land critical hits, and guides see it as one tool beside direct heals, group heals and shields.',
          ),
        ),
        healGroup: rated(
          0.95,
          confirmed(
            ['p2', 'deep-dive-priest-warrior', 'wowhead-guide-priest-holy-abilities'],
            "Heals many allies at once, which the developers see as Holy's likely strength: Prayer of Healing covers the target's whole party, Prayer of Mending jumps from ally to ally as it heals, and Holy Nova heals party members nearby.",
            { p2: '1:14:32' },
          ),
        ),
        threatControl: rated(
          0.55,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'wowhead-guide-priest-holy', 'classic'],
            'Can lower threat (Fade) and heal with low threat (Binding Heal), but no Holy talent lowers threat in general, and no talent improves Fade.',
          ),
        ),
        escape: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy'],
            'Cloth armor and few ways to escape enemies; guides note that most heals need standing still to cast and only a few work on the move.',
          ),
        ),
        themeLight: rated(
          1,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Priests draw power from the Light and Shadow; Holy draws on the Light.',
          ),
        ),
        aoe: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy-abilities'],
            'The only area damage is a 10-yard instant (Holy Nova), and Holy Fire damage can make it cost no mana (Searing Light).',
          ),
        ),
        burst: rated(0.1, estimate('Healer spec with few damage spikes.')),
        complexity: rated(
          0.5,
          community(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy'],
            'Approachable for new players: several healing spells, and switching between them refunds mana (Litany of Light).',
          ),
        ),
        defAbsorb: rated(
          0.7,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Can put up a shield that absorbs damage (Power Word: Shield); among healers, only Priests have absorb shields.',
          ),
        ),
        dotDamage: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Has two damage over time spells (Devouring Plague, Shadow Word: Pain); every Priest learns the plague at level 20.',
          ),
        ),
        dungeonUtility: rated(
          0.5,
          community(
            ['wowhead-guide-priest-holy-abilities'],
            'Can cure diseases and resurrect the dead out of combat, but cannot remove poisons or curses (Cure Disease).',
          ),
        ),
        eliteSolo: rated(0.4, estimate('Shields and healing last a long time, but damage is lacking.')),
        execute: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Every Priest learns an instant Shadow damage spell at level 32 (Shadow Word: Death), but it hurts the Priest if the target survives.',
          ),
        ),
        groupDemand: rated(
          0.9,
          confirmed(
            ['p2', 'wowhead-guide-priest-holy'],
            "The developers see healing a whole party at once as Holy's likely strength, and guides count it among the strongest PvE healers.",
            { p2: '1:14:32' },
          ),
        ),
        hybridTax: rated(
          0,
          confirmed(
            ['p2'],
            'Holy is a healer spec, so the damage cost for hybrid damage specs does not apply; only a Smite build that deals damage pays a big hybrid tax for keeping its full healing.',
            { p2: '1:12:32' },
          ),
        ),
        interrupt: rated(0, classic('Cannot interrupt spells; only a Shadow talent can (Silence).')),
        levelingDowntime: rated(
          0.55,
          community(
            ['wowhead-guide-priest-holy', 'deep-dive-priest-warrior'],
            'Mana intensive: switching heals refunds part of the mana cost (Litany of Light), but repeating one spell drains the bar, which means frequent breaks after fights.',
          ),
        ),
        procs: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Few effects to react to: every non-periodic critical heal triggers Inspiration, and a talent can make the next Holy Nova cost no mana (Searing Light).',
          ),
        ),
        pvpBattleground: rated(
          0.85,
          community(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy', 'p2'],
            'The most versatile healer: direct heals, heals over time and absorb shields no other healer has. Cloth armor and a low health pool make Holy a prime target for melee.',
            { p2: '1:14:25' },
          ),
        ),
        pvpWorld: rated(0.4, estimate('Little damage in duels.')),
        raidUtility: rated(
          0.6,
          confirmed(
            ['deep-dive-priest-warrior', 'p2', 'wowhead-guide-priest-shadow-abilities'],
            'Brings buffs of every Priest: Divine Spirit, Fear Ward and Power Word: Fortitude, so good that groups bring a Priest for it. Holy does not reach the 31-point Discipline talent that gives an ally more damage and healing.',
            { p2: '1:10:28' },
          ),
        ),
        roleHealer: rated(
          1,
          confirmed(
            ['p2', 'deep-dive-priest-warrior'],
            'A full healer whose likely strength, as the developers see it, is healing a whole party at once, helped by a heal that jumps between allies (Prayer of Mending).',
            {
              p2: '1:14:32',
            },
          ),
        ),
        roleRangedDps: rated(
          0.2,
          confirmed(
            ['p2'],
            'Can deal damage with a Smite build, which the developers want to be a thing, though weaker than the specs meant for damage.',
            {
              p2: '1:12:02',
            },
          ),
        ),
        selfHeal: rated(
          1,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Full healing spells also work on yourself, and one heal covers the Priest and the target at once (Binding Heal).',
          ),
        ),
        shapeshift: rated(0, classic('No shapeshifting.')),
        singleTarget: rated(
          0.3,
          confirmed(
            ['p2'],
            'A healer spec; Smite builds have the potential to be very strong, but stay below the specs meant for damage, as they pay a big hybrid tax for their full healing.',
            { p2: '1:12:21' },
          ),
        ),
        slow: rated(
          0,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-shadow-abilities'],
            'Cannot slow enemies; the only Priest slow comes with a Shadow talent (Mind Flay).',
          ),
        ),
        soloLeveling: rated(
          0.5,
          confirmed(['p2'], 'The developers call Smite builds great for questing: damage and healing in one.', {
            p2: '1:12:32',
          }),
        ),
        survivability: rated(
          0.45,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-holy'],
            'Full healing, but Priests are a very vulnerable class in cloth armor with few ways to escape, and guides call Holy a prime target for melee.',
          ),
        ),
      },
    },
    'priest-shadow': {
      name: 'Shadow',
      traits: {
        soloEndgame: rated(
          0.8,
          confirmed(
            ['dn', 'deep-dive-priest-warrior', 'wowhead-guide-priest-shadow'],
            'Deals damage over time from range and heals its party through that damage, on a 30 sec cooldown (Vampiric Embrace); guides see mana recovery tools that likely carry it through long farming sessions. But Priests are very vulnerable in cloth armor with few ways to escape.',
          ),
        ),
        healHot: rated(
          0.1,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-shadow'],
            'Shadowform allows no heals, so Shadow has to leave it for a heal over time (Renew); in form, the party is healed only as a side effect of Shadow damage, for 30 sec at a time (Vampiric Embrace).',
          ),
        ),
        healDirect: rated(
          0,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-shadow'],
            'Shadowform allows every spell except heals, so Shadow Priests cannot heal in form and give no direct heals to others while playing Shadow.',
          ),
        ),
        healGroup: rated(
          0.25,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'p2'],
            'Heals the party as a side effect of its damage through its vampiric abilities: a talent that lasts 30 sec on a 30 sec cooldown (Vampiric Embrace).',
            { p2: '1:10:16' },
          ),
        ),
        healAbsorb: rated(
          0.15,
          estimate(
            'Shadowform allows every spell except heals, and the shield presumably counts as allowed (Power Word: Shield), so Shadow can shield an ally on occasion, though it plays for damage.',
          ),
        ),
        threatControl: rated(
          0.6,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'wowhead-guide-priest-shadow-abilities'],
            'Can lower threat (Fade), and a Shadow talent lowers the threat of Shadow spells; no talent improves Fade. Guides note that Mind Blast and Devouring Plague generate a lot of threat.',
          ),
        ),
        gearDependency: rated(
          0.45,
          estimate(
            'Damage scales with spell power on gear, and Shadowform halves the mana cost of Shadow spells, so Shadow leans less on Spirit and mana from gear.',
          ),
        ),
        defKite: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Slows a target with a channeled spell (Mind Flay), and a talent adds damage with every tick (Improved Mind Flay); beyond that, Priests have few ways to escape enemies, and Shadow has no root or freeze of its own.',
          ),
        ),
        themeLight: rated(
          0.2,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Priests draw power from the Light and Shadow; Shadow draws on the shadow side, and the Light stays distant.',
          ),
        ),
        aoe: rated(
          0.35,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Little area damage: when a target with the plague dies, the plague jumps to 2 new enemies within 5 yards (Devouring Contagion, Devouring Plague).',
          ),
        ),
        burst: rated(
          0.6,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Burst comes from Mind Blast and Shadow Word: Death, and Shadowform doubles the critical strike bonus, also for Shadow Word: Death.',
          ),
        ),
        complexity: rated(
          0.5,
          community(
            ['wowhead-guide-priest-shadow'],
            'Approachable for new players: keep a damage over time spell on the target (Shadow Word: Pain) and channel Mind Flay.',
          ),
        ),
        defAbsorb: rated(
          0.7,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Can put up a shield that absorbs damage (Power Word: Shield); among healers, only Priests have absorb shields.',
          ),
        ),
        dotDamage: rated(
          0.9,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Shadow relies on damage over time, and its plague jumps to new enemies when a target dies (Devouring Contagion).',
          ),
        ),
        dungeonUtility: rated(
          0.5,
          community(
            ['wowhead-guide-priest-shadow-abilities', 'deep-dive-priest-warrior'],
            'Can cure diseases and resurrect the dead out of combat, but cannot remove poisons or curses (Cure Disease); Shadowform blocks only heals, so Shadow cures diseases in form too.',
          ),
        ),
        eliteSolo: rated(0.7, estimate('DoTs, Vampiric Embrace and Psychic Scream make elites doable.')),
        execute: rated(
          0.7,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-shadow'],
            'Can finish off weakened enemies: every Priest learns an instant damage spell (Shadow Word: Death), and a Shadow talent raises its critical strike chance on targets below 20% health (Early Demise); guides see this as a damage niche for Shadow.',
          ),
        ),
        groupDemand: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior', 'p2', 'wowhead-guide-priest-shadow'],
            'Brought for its damage first, and as a hybrid damage spec it pays the hybrid tax; Shadow Weaving only helps its own damage. Guides find its endgame raid viability unclear, with a focus on personal damage, and it cannot heal in Shadowform.',
            { p2: '1:10:09' },
          ),
        ),
        hybridTax: rated(
          1,
          confirmed(
            ['p2'],
            'As a hybrid damage spec, Shadow deals about 5% less damage; every class except Hunter, Mage, Rogue and Warlock counts as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        interrupt: rated(0.7, confirmed(['deep-dive-priest-warrior'], 'A Shadow talent silences a target (Silence).')),
        levelingDowntime: rated(
          0.3,
          confirmed(
            ['deep-dive-priest-warrior', 'wowhead-guide-priest-shadow'],
            'Shadowform halves the mana cost of Shadow spells, but only from level 40.',
          ),
        ),
        procs: rated(
          0.1,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Damage runs on damage over time and cooldowns with little to react to: every Mind Blast and fully channeled Mind Flay triggers Dark Inspiration, and the talent that makes the target take more damage from the Priest cannot fail to apply.',
          ),
        ),
        pvpBattleground: rated(
          0.75,
          estimate(
            'Puts pressure on enemies with damage over time, with crowd control and a silence (Psychic Scream, Silence).',
          ),
        ),
        pvpWorld: rated(
          0.9,
          community(
            ['wowhead-guide-priest-shadow', 'dn'],
            'Strong in solo PvP: a toolkit particularly well suited for one-on-one fights, though in cloth armor; Vampiric Embrace has a 30 sec cooldown.',
          ),
        ),
        raidUtility: rated(
          0.45,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'p2'],
            "Brings Fortitude and some party healing, and Dark Inspiration raises the party's Spirit; no mana for the group, and Shadow Weaving only helps its own damage.",
            { p2: '1:10:16' },
          ),
        ),
        roleHealer: rated(
          0.2,
          confirmed(['p2'], 'Shadow heals the group on the side through vampiric abilities; not a main healer.', {
            p2: '1:10:16',
          }),
        ),
        roleRangedDps: rated(
          1,
          confirmed(['deep-dive-priest-warrior'], 'Shadow Priests deal damage over time as their main role.'),
        ),
        range: rated(
          0.85,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Spells reach about 30 yards, and a 2-point talent extends offensive Shadow spells by 20% (Shadow Reach).',
          ),
        ),
        selfHeal: rated(
          0.8,
          confirmed(
            ['deep-dive-priest-warrior', 'dn'],
            'Shadowform allows no healing spells, so Shadow heals itself only after leaving the form or through Vampiric Embrace, on a 30 sec cooldown.',
          ),
        ),
        shapeshift: rated(0, estimate('Shadowform is not counted as shapeshifting.')),
        singleTarget: rated(
          0.7,
          confirmed(
            ['p2'],
            'The developers want Shadow to always bring good damage first; as a hybrid damage spec it deals about 5% less damage.',
            { p2: '1:10:34' },
          ),
        ),
        slow: rated(
          0.45,
          confirmed(
            ['deep-dive-priest-warrior', 'dn', 'wowhead-guide-priest-shadow-abilities', 'classic'],
            'Slows its target only while channeling Mind Flay, a core rotation spell, and a talent adds damage with every tick (Improved Mind Flay); no other slow, so it is frequent on a single target but tied to the channel.',
          ),
        ),
        soloLeveling: rated(
          0.75,
          community(
            ['wowhead-guide-priest-shadow', 'deep-dive-priest-warrior', 'dn'],
            'Excellent survivability and solid damage while leveling: Mind Flay from level 20, Shadowform halves the mana cost of Shadow spells from level 40, and Vampiric Embrace has a 30 sec cooldown.',
          ),
        ),
        stun: rated(
          0.1,
          confirmed(
            ['deep-dive-priest-warrior'],
            'Stuns only by chance through a Shadow talent (Blackout), which is also required for Improved Psychic Scream.',
          ),
        ),
        survivability: rated(
          0.55,
          community(
            ['wowhead-guide-priest-shadow', 'dn'],
            'Takes 15% less physical damage in Shadowform, and Vampiric Embrace (30 sec cooldown) and the shield help; heals work only outside the form.',
          ),
        ),
      },
    },
  },
} satisfies ClassSpecs<'priest'>;
