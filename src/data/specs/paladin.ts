import { classic, community, confirmed, ESTIMATE, estimate, unconfirmed } from '../evidence/helpers';
import { rated, type ClassSpecs } from '../rated';

/**
 * Paladin: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const PALADIN_SPECS = {
  traits: {
    armor: rated(1, classic('Plate armor from level 40.')),
    burst: rated(0.2, ESTIMATE),
    combatReset: rated(
      0.6,
      classic('Can make itself immune for a short time to get out of a fight gone wrong (Divine Shield).'),
    ),
    complexity: rated(
      0.5,
      confirmed(
        ['deep-dive-panel', 'deep-dive-paladin'],
        'Judgement does not use up the active seal, and a Retribution talent lets the next swing after swapping seals carry both, with forgiving timing (seal twisting, Twist of Light).',
      ),
    ),
    deadZone: rated(0, classic('No minimum range: every ability works up close.')),
    defKite: rated(0, confirmed(['deep-dive-paladin'], 'Paladins have no way to slow enemies.')),
    dotDamage: rated(
      0.2,
      confirmed(
        ['deep-dive-paladin', 'dn'],
        'Every Paladin learns holy ground that damages enemies in it over time (Consecration).',
      ),
    ),
    dungeonUtility: rated(
      0.8,
      classic('Removes poison, disease and magic from allies and can resurrect the dead (Cleanse, Redemption).'),
    ),
    eliteSolo: rated(0.5, estimate('Sturdy, but little damage.')),
    execute: rated(
      0.3,
      confirmed(
        ['deep-dive-paladin', 'wowhead-guide-paladin-retribution-abilities'],
        'A finishing ability that can be used on enemies below 20% health (Hammer of Wrath); weakened targets are a Paladin strength.',
      ),
    ),
    gearDependency: rated(
      0.35,
      confirmed(
        ['deep-dive-paladin'],
        'Holy needs no hit chance from gear: plate healing gear is not planned to carry any, so a Holy talent grants up to 18% hit chance with Holy spells (Divine Precision).',
      ),
    ),
    groundZones: rated(
      0.4,
      confirmed(
        ['deep-dive-paladin'],
        'One ground effect to place, learned by every Paladin at level 20 (Consecration).',
      ),
    ),
    healAbsorb: rated(
      0.1,
      community(
        ['deep-dive-paladin', 'wowhead-guide-paladin-retribution', 'wowhead-guide-paladin-retribution-abilities'],
        "No absorb shield for allies; the Paladin's own shields protect only the Paladin (Templar's Bulwark, Seal of Fury). In an emergency, it can make an ally immune to physical damage (Blessing of Protection).",
      ),
    ),
    healDirect: rated(
      0.05,
      confirmed(
        ['deep-dive-paladin', 'p2'],
        'Every Paladin can heal others with direct heals and an emergency heal with a 20 min cooldown (Flash of Light, Holy Light, Lay on Hands), but hybrids are not meant to be good healers, and Protection heals an ally only in an emergency, as tanking comes first.',
        { p2: '17:56' },
      ),
    ),
    healGroup: rated(
      0.05,
      confirmed(
        ['deep-dive-paladin', 'wowhead-guide-paladin-protection'],
        'No group heal spell without Holy talents. A judgement can make each attack on the target heal the attacker a little (Judgement of Light), but Protection uses its judgement to taunt with the tank seal (Seal of Fury), so it heals the group only in passing.',
      ),
    ),
    healHot: rated(
      0,
      confirmed(
        ['deep-dive-paladin'],
        "No Paladin spell heals over time; Holy heals directly instead, keeping one target alive (Flash of Light) or instantly healing an ally's whole party (Light's Vigil, Holy Shock).",
      ),
    ),
    healingReduction: rated(0, classic('No way to reduce the healing an enemy receives.')),
    hybridFlex: rated(
      1,
      confirmed(
        ['deep-dive-paladin'],
        'Paladins can tank, deal damage and heal, and can be highly effective tanks, competitive damage dealers and the strongest single-target healers in the game.',
      ),
    ),
    interrupt: rated(0, confirmed(['deep-dive-paladin'], 'Paladins have no interrupt.')),
    levelingDowntime: rated(
      0.35,
      estimate(
        'Holy heals itself but has to stop for mana; as a healer spec it is built to use mana efficiently, so the breaks come less often.',
      ),
    ),
    pet: rated(0, classic('No pet.')),
    petControl: rated(0, classic('No pet.')),
    positional: rated(
      0,
      classic('No ability needs a position: Holy heals from range and Protection tanks facing the enemy.'),
    ),
    procs: rated(
      0.5,
      confirmed(
        ['deep-dive-paladin'],
        'A trigger to react to: critical hits with Holy Shock or Flash of Light shorten the cast time of the next Holy Light.',
      ),
    ),
    pvpBattleground: rated(0.6, ESTIMATE),
    pvpWorld: rated(0.5, ESTIMATE),
    raidUtility: rated(
      0.75,
      confirmed(
        ['deep-dive-paladin', 'raids', 'dn'],
        "Buffs for the whole raid: resistance auras reach every raid member within 30 yards, and Onyxia's Lair calls for fire resistance; every Paladin has Blessing of Kings, and a threat-lowering buff can go on top of a blessing (Salvation).",
      ),
    ),
    range: rated(
      0,
      confirmed(
        ['deep-dive-paladin'],
        'Protection and Retribution fight in melee; Paladins have only limited ranged abilities.',
      ),
    ),
    rangeWeave: rated(0, classic('No switching between melee and ranged.')),
    reagentDependency: rated(
      0.2,
      classic(
        'A few spells use up reagents: greater blessings need Symbol of Kings and Divine Intervention needs Symbol of Divinity; resurrection needs none.',
      ),
    ),
    resEnergy: rated(0, classic("Paladins don't use energy.")),
    resMana: rated(1, classic('Mana is the only resource.')),
    resRage: rated(0, classic("Paladins don't use rage.")),
    roleRangedDps: rated(
      0,
      confirmed(
        ['deep-dive-paladin'],
        'Protection and Retribution fight in melee; Paladins have only limited ranged abilities.',
      ),
    ),
    selfCleanse: rated(0.75, classic('Removes poison, disease and magic from itself, but no curses (Cleanse).')),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    shapeshift: rated(0, classic('No shapeshifting.')),
    slow: rated(0, confirmed(['deep-dive-paladin'], 'Paladins have no way to slow enemies.')),
    soloEndgame: rated(
      0.6,
      confirmed(
        ['deep-dive-paladin', 'dn', 'wowhead-guide-paladin-protection'],
        'Protection can be a highly effective tank and survives packs and elites alone, but farming is slow: its area damage gains little from spell power (Consecration), it cannot slow enemies, and guides find it often has to wait for mana.',
      ),
    ),
    stealth: rated(0, classic('No stealth.')),
    stun: rated(
      0.55,
      confirmed(
        ['p2', 'wowhead-guide-paladin-retribution-abilities'],
        'Can stun an enemy for 6 sec (Hammer of Justice), and a seal gives each melee attack a chance to stun.',
        { p2: '43:47' },
      ),
    ),
    survivability: rated(
      0.8,
      confirmed(
        ['deep-dive-paladin'],
        'Can make itself immune and has an emergency heal with a 20 min cooldown (Divine Shield, Lay on Hands).',
      ),
    ),
    tabTargetTank: rated(0, classic("Holy and Retribution don't tank as their main role.")),
    themeArcane: rated(0, classic("Arcane magic is not part of the Paladin's theme.")),
    themeElements: rated(0, classic("The elements are not part of the Paladin's theme.")),
    themeFel: rated(
      0,
      confirmed(
        ['deep-dive-paladin'],
        "Demons are not part of the Paladin's theme: Paladins fight demons rather than use demonic magic, and are very strong against undead and demons.",
      ),
    ),
    themeLight: rated(1, confirmed(['hero'], 'Paladins call upon the Light.')),
    themeMartial: rated(
      0.6,
      confirmed(
        ['hero', 'deep-dive-paladin'],
        'Paladins are powerful warriors in their own right who also call upon the Light. Protection fights in melee and strikes with its weapon (Holy Strike), but much of its threat comes from Holy damage.',
      ),
    ),
    themeNature: rated(0, classic("Nature is not part of the Paladin's theme.")),
    themeShadow: rated(
      0,
      confirmed(
        ['hero'],
        "Shadow magic is not part of the Paladin's theme: Paladins fight the forces of shadow rather than use them.",
      ),
    ),
    totems: rated(0, classic('No totems.')),

    weaponCaster: rated(
      0.8,
      confirmed(
        ['deep-dive-paladin'],
        "Holy's play rests on magic: it heals with spells (Flash of Light, Holy Light, Holy Shock) and gains spell-focused damage, but it wears plate, carries a one-hander and shield and adds weapon hits.",
      ),
    ),
    weaponDual: rated(0, classic('Paladins cannot wield a weapon in each hand.')),
    weaponRanged: rated(0, classic('Paladins cannot use a bow or gun.')),
    weaponShield: rated(
      1.0,
      confirmed(
        ['deep-dive-paladin', 'wowhead-guide-paladin-protection'],
        "Protection tanks with a one-hander and a shield: its seal's absorb shield needs a shield equipped, blocks restore mana, and a talent raises one-handed weapon damage (Seal of Fury, Shield Specialization).",
      ),
    ),
    weaponTwoHand: rated(
      0.05,
      confirmed(
        ['deep-dive-paladin'],
        'Neither fights with a two-hander: Holy heals with spells and swings its weapon only for Holy Strike, and Protection tanks with a one-hander and a shield, which a talent and the tank seal reward (Seal of Fury).',
      ),
    ),
  },
  specs: {
    'paladin-holy': {
      name: 'Holy',
      traits: {
        roleRangedDps: rated(
          0.15,
          confirmed(
            ['deep-dive-paladin', 'deep-dive-panel'],
            'Holy talents support hybrid builds around Holy Shock for occasional damage from range, but the core role is healing, and Paladins have only limited ranged abilities.',
          ),
        ),
        soloEndgame: rated(
          0.45,
          confirmed(
            ['deep-dive-panel', 'deep-dive-paladin'],
            'Plate armor and the strongest single-target healing in the game keep Holy alive, and bonus healing adds some bonus damage; but the damage stays low, and Paladins cannot slow enemies and have limited ranged abilities, so farming is slow.',
          ),
        ),
        weaponShield: rated(
          0.4,
          estimate(
            'Holy usually carries a one-hander with a shield, but heals with spells, and no Holy talent rewards the shield; Holy Strike adds an occasional weapon hit.',
          ),
        ),
        themeMartial: rated(
          0.2,
          confirmed(
            ['hero', 'deep-dive-paladin'],
            'Paladins are powerful warriors in their own right, but Holy builds its talents on healing and spell-focused damage.',
          ),
        ),
        themeArcane: rated(
          0.05,
          confirmed(
            ['deep-dive-paladin'],
            "Holy is a spellcaster, but it draws its power from the Light (Holy Shock, Light's Vigil), and none of its spells is arcane.",
          ),
        ),
        healDirect: rated(
          1.0,
          confirmed(
            ['deep-dive-paladin'],
            'The strongest single-target healers in the game: Holy keeps one target alive, and critical hits with Flash of Light or Holy Shock shorten the cast time of the next long heal by up to 1 sec (Infusion of Light).',
          ),
        ),
        healGroup: rated(
          0.35,
          confirmed(
            ['deep-dive-paladin'],
            "Healing a whole party at once takes planning: after preparing an ally (Light's Vigil), the next Holy Shock on them instantly heals that ally's whole party, but the setup makes it hard to use in reaction to damage.",
          ),
        ),
        healAbsorb: rated(
          0.15,
          estimate(
            'No absorb shield for allies; Holy prevents damage on others only with an emergency button that makes an ally immune to physical damage (Blessing of Protection).',
          ),
        ),
        stun: rated(
          0.45,
          confirmed(
            ['p2', 'wowhead-guide-paladin-retribution-abilities'],
            'Can stun an enemy for 6 sec (Hammer of Justice); the seal with a chance to stun works on melee attacks, which Holy rarely makes as a healer.',
            { p2: '43:47' },
          ),
        ),
        raidUtility: rated(
          0.85,
          confirmed(
            ['deep-dive-paladin', 'dn', 'wowhead-guide-paladin-protection'],
            'Buffs for the whole raid: resistance auras reach every raid member within 30 yards, every Paladin has Blessing of Kings, and Salvation lowers threat on top of a blessing. Guides count the seal debuffs a Paladin keeps on the target as vital to party and raid.',
          ),
        ),
        survivability: rated(
          0.9,
          confirmed(
            ['deep-dive-paladin'],
            'Can make itself immune and has an emergency heal with a 20 min cooldown (Divine Shield, Lay on Hands), plus full healing spells with strong single-target healing.',
          ),
        ),
        pvpBattleground: rated(
          0.85,
          confirmed(
            ['deep-dive-paladin'],
            'The strongest single-target healers in the game, and a talent makes Holy immune to Silence and interrupts for 6 sec on a 3 min cooldown (Voice of Truth); but Holy has no interrupt and no way to slow enemies.',
          ),
        ),
        complexity: rated(
          0.6,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-holy'],
            "Guides find the core simple, but with quite a lot of abilities to keep track of: blessings, buffs, auras and seals. The group heal is hard to use in reaction to damage, as it needs significant setup (Light's Vigil).",
          ),
        ),
        burst: rated(0.1, estimate('Healer spec with few damage spikes.')),
        aoe: rated(
          0.15,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'Area damage comes from holy ground that hits the first 4 enemies moderately and all others very little, and gains little from spell power (Consecration); as a healer spec, this damage plays a minor part for Holy.',
          ),
        ),
        apm: rated(0.5, estimate('Healing reacts to incoming damage throughout the fight.')),
        cc: rated(
          0.35,
          community(
            ['wowhead-guide-paladin-retribution'],
            'A stun and crowd control against undead (Hammer of Justice, Turn Undead); Holy Wrath also stuns undead and demons for 2 sec.',
          ),
        ),
        defAbsorb: rated(
          0.7,
          classic(
            'Can make itself immune, or an ally immune to physical damage (Divine Shield, Blessing of Protection).',
          ),
        ),
        defStand: rated(
          0.6,
          estimate(
            'Plate armor and a shield that can block, and a Paladin aura adds armor, but no Protection talents for block or Defense, so the shield alone adds little.',
          ),
        ),
        escape: rated(
          0.35,
          classic(
            'A blessing against movement-impairing effects, or immunity to get away (Blessing of Freedom, Divine Shield).',
          ),
        ),
        groupDemand: rated(0.9, confirmed(['deep-dive-paladin'], 'Holy is a capable healer in all kinds of groups.')),
        hybridTax: rated(
          0,
          confirmed(['p2'], 'Holy is a healer spec, so the damage cost of hybrid damage specs does not apply.', {
            p2: '22:18',
          }),
        ),
        roleHealer: rated(
          1,
          confirmed(
            ['deep-dive-paladin'],
            'Strong single-target healer (Flash of Light); healing a whole group takes planning. A talent makes Holy immune to Silence and interrupts (Voice of Truth).',
          ),
        ),
        range: rated(
          0.75,
          confirmed(
            ['deep-dive-paladin'],
            'Heals from spell range; Holy talents increase the range, but only to a limited extent.',
          ),
        ),
        roleMeleeDps: rated(0.1, estimate('Holy deals hardly any melee damage.')),
        roleTank: rated(
          0.1,
          confirmed(
            ['deep-dive-paladin'],
            "Every Paladin has the tank seal with its taunt (Seal of Fury), but Holy talents don't support tanking.",
          ),
        ),
        selfHeal: rated(
          1,
          confirmed(['deep-dive-paladin'], 'The full set of healing spells, with strong single-target healing.'),
        ),
        singleTarget: rated(
          0.3,
          community(
            ['wowhead-guide-paladin-holy', 'deep-dive-paladin'],
            'Decent damage while leveling; Holy talents and gear support a damage play style around Holy Shock ("Shock-adin").',
          ),
        ),
        soloLeveling: rated(
          0.5,
          community(
            ['wowhead-guide-paladin-holy'],
            'Self-sufficient with good healing, very good defensive abilities and decent damage, which makes leveling very smooth; as a healer spec, Holy takes longer to kill enemies.',
          ),
        ),
        threatControl: rated(
          0.4,
          confirmed(
            ['deep-dive-paladin', 'dn', 'wowhead-guide-paladin-retribution-abilities'],
            "Can lower one party member's threat (Salvation), which does not exclude a blessing; the talent that lowers a Paladin's own threat is a Retribution talent (Instrument of Law).",
          ),
        ),
        autoAttack: rated(
          0.1,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'Holy casts spells instead of relying on weapon swings; every Paladin has a weapon strike with a 10 sec cooldown (Holy Strike).',
          ),
        ),
      },
    },
    'paladin-protection': {
      name: 'Protection',
      traits: {
        weaponCaster: rated(
          0.2,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-protection'],
            'Protection fights with weapon and shield, but Seal of Fury adds Holy damage to every swing that grows with spell power.',
          ),
        ),
        themeLight: rated(
          0.9,
          confirmed(
            ['hero', 'deep-dive-paladin'],
            'Paladins call upon the Light, and Protection tanks with Holy damage (Seal of Fury, Holy Strike, Consecration).',
          ),
        ),
        rangeWeave: rated(
          0.1,
          confirmed(
            ['deep-dive-paladin'],
            'A melee tank; under Seal of Fury, Judgement taunts from 10 yards, so Protection can reach enemies a little farther away, but otherwise stays in melee.',
          ),
        ),
        procs: rated(
          0.3,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'Nothing to react to: the triggers fire on their own, such as a chance to block more often after being hit (Redoubt) and charges the next auto attack releases as extra attacks (Reckoning).',
          ),
        ),
        eliteSolo: rated(
          0.6,
          estimate(
            "Long fights against an elite become safer: each swing grants an absorb shield (Seal of Fury), a cooldown grants a shield equal to full health (Templar's Bulwark), and a Protection talent returns mana when the seal's shields are used up. The damage stays low.",
          ),
        ),
        survivability: rated(
          1,
          confirmed(
            ['deep-dive-paladin'],
            "Can make itself immune and has an emergency heal with a 20 min cooldown (Divine Shield, Lay on Hands), plus a shield that absorbs damage equal to full health (Templar's Bulwark) and a talent for up to 20 Defense.",
          ),
        ),
        pvpWorld: rated(0.45, estimate('Sturdy, but slow damage.')),
        pvpBattleground: rated(0.4, estimate('Tank spec: sturdy, but slow damage.')),
        groundZones: rated(
          0.6,
          confirmed(
            ['deep-dive-paladin'],
            'One ground effect to place (Consecration), which Protection lays down often to hold the threat of 4 enemies at a time.',
          ),
        ),
        gearDependency: rated(
          0.55,
          confirmed(
            ['deep-dive-paladin'],
            'Weapon and shield shape threat and mana: the tank seal adds the same Holy damage to each swing, which favors a fast weapon, and blocks restore mana (Seal of Fury, Shield Specialization).',
          ),
        ),
        aoe: rated(
          0.45,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'Area damage from holy ground that hits the first 4 enemies moderately and all others very little, and gains little from spell power (Consecration); Protection keeps it up to hold threat, but the damage stays at tank level.',
          ),
        ),
        apm: rated(
          0.55,
          confirmed(
            ['deep-dive-paladin', 'p2', 'wowhead-guide-paladin-protection'],
            'Paladins have many free global cooldowns, and Holy Strike has a long cooldown on purpose; Protection fills them with Holy Strike, which a talent turns into lower damage taken, and with Consecration and Judgement for threat.',
            { p2: '37:03' },
          ),
        ),
        cc: rated(
          0.35,
          community(
            ['wowhead-guide-paladin-retribution'],
            'A stun and crowd control against undead (Hammer of Justice, Turn Undead); Holy Wrath also stuns undead and demons for 2 sec.',
          ),
        ),
        complexity: rated(
          0.55,
          community(
            ['wowhead-guide-paladin-protection'],
            'Simple to learn as a tank, but the seals have to balance threat, mana, healing and debuffs on the target, and mana needs managing while tanking.',
          ),
        ),
        defAbsorb: rated(
          1,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-retribution-abilities'],
            "A cooldown absorbs damage equal to full health for 8 sec (Templar's Bulwark), each swing grants an absorb shield (Seal of Fury), and the Paladin can make itself immune (Divine Shield); a Protection talent shortens both cooldowns.",
          ),
        ),
        defStand: rated(
          1,
          confirmed(
            ['deep-dive-paladin'],
            'Plate armor and a shield, and a talent adds up to 20 Defense (Anticipation).',
          ),
        ),
        escape: rated(
          0.35,
          classic(
            'A blessing against movement-impairing effects, or immunity to get away (Blessing of Freedom, Divine Shield).',
          ),
        ),
        groupDemand: rated(
          0.85,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-protection'],
            'Paladins can be highly effective tanks, and Protection can also tank raids, as its Judgement taunts the target under the tank seal (Seal of Fury).',
          ),
        ),
        levelingDowntime: rated(
          0.55,
          community(
            ['wowhead-guide-paladin-protection', 'dn'],
            'Mana needs careful managing in long fights, and Protection will often wait for mana before engaging new enemies; blocks restore 4% mana at most once every 3 sec (Shield Specialization).',
          ),
        ),
        hybridTax: rated(
          0,
          confirmed(['p2'], 'Protection is a tank spec, so the damage cost of hybrid damage specs does not apply.', {
            p2: '22:18',
          }),
        ),
        roleHealer: rated(0.25, classic('Has healing spells even without Holy talents, but is not built to heal.')),
        roleMeleeDps: rated(0.3, estimate('Little melee damage as a tank.')),
        roleTank: rated(
          1,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'An effective tank, with a tank seal (Seal of Fury) and a buff that raises the threat of Holy damage by 90% (Righteous Fury).',
          ),
        ),
        selfHeal: rated(
          0.85,
          confirmed(
            [
              'deep-dive-paladin',
              'p2',
              'wowhead-guide-paladin-protection',
              'wowhead-guide-paladin-retribution-abilities',
            ],
            'Hybrids can heal themselves thanks to their mana bar: every Paladin has direct heals and an emergency heal with a 20 min cooldown (Flash of Light, Holy Light, Lay on Hands), but guides find Protection has to manage its mana carefully in long fights.',
            { p2: '18:01' },
          ),
        ),
        singleTarget: rated(0.35, ESTIMATE),
        soloLeveling: rated(0.55, estimate('Sturdy, but slow damage.')),
        tabTargetTank: rated(
          0.5,
          confirmed(
            ['deep-dive-paladin'],
            'Generates threat reliably on 4 enemies at once with holy ground (Consecration); beyond 4 Protection has to switch targets, and a Protection talent finishes the Judgement cooldown so it can taunt several enemies quickly.',
          ),
        ),
        threatControl: rated(
          0.2,
          confirmed(
            ['deep-dive-paladin', 'dn', 'wowhead-guide-paladin-retribution-abilities'],
            "Can lower one party member's threat (Salvation), which does not exclude a blessing; no other tools of its own to lower threat.",
          ),
        ),
        autoAttack: rated(
          0.7,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'Every melee swing adds Holy damage from the tank seal, which favors a fast weapon (Seal of Fury), and a talent stores charges that the next auto attack releases as extra attacks (Reckoning); Protection also builds threat with abilities such as Consecration.',
          ),
        ),
      },
    },
    'paladin-retribution': {
      name: 'Retribution',
      traits: {
        positional: rated(
          0.25,
          confirmed(
            ['dn'],
            'No ability needs a position, but as a melee damage dealer Retribution stands behind the enemy, which avoids its parries and blocks. A known beta bug lets enemies parry and block from behind at close range; not standing too close avoids it.',
          ),
        ),
        soloEndgame: rated(
          0.7,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-retribution'],
            'Plate armor, self-healing and emergency buttons (Lay on Hands, Blessing of Protection) make Retribution hard to kill alone, and it is very strong against undead and demons. It cannot slow enemies, though, and guides find the small mana pool drains fast and forces breaks.',
          ),
        ),
        weaponCaster: rated(
          0.25,
          confirmed(
            ['deep-dive-paladin'],
            'Retribution is a weapon-wielding champion of the Light that blends weapon attacks with Holy damage, and a talent raises its spell damage by up to 30% of Intellect (Champion of the Light).',
          ),
        ),
        weaponShield: rated(
          0.05,
          confirmed(
            ['dn'],
            'Retribution fights with a two-hander, which a Retribution talent rewards; a shield comes out at most for off-tanking.',
          ),
        ),
        weaponTwoHand: rated(
          0.95,
          confirmed(
            ['dn', 'deep-dive-paladin'],
            'Retribution is the weapon-wielding champion of the Light and fights with a two-hander, whose damage a Retribution talent raises by up to 6%; part of its damage is Holy damage from seals and a talent (Champion of the Light).',
          ),
        ),
        healDirect: rated(
          0.1,
          confirmed(
            ['p2', 'wowhead-guide-paladin-retribution'],
            'Can heal others on the side and in emergencies (Flash of Light, Lay on Hands), but the developers deliberately withhold healing talents from Retribution, and guides find its healing weak without changing talents.',
            { p2: '18:17' },
          ),
        ),
        healGroup: rated(
          0.1,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-retribution-abilities', 'p2'],
            'A thin passive group heal: a talent makes Holy Strike refresh every judgement on the target (Sacred Arbiter), so Retribution keeps up the one that heals attackers a little (Judgement of Light); the developers deliberately withhold healing talents from Retribution.',
            { p2: '18:17' },
          ),
        ),
        rangeWeave: rated(
          0.15,
          confirmed(
            ['deep-dive-paladin', 'deep-dive-panel'],
            'A melee spec with limited ranged abilities; a hybrid build can lean into Holy Shock for ranged, spell-powered play, but Retribution mostly stays in melee.',
          ),
        ),
        pvpWorld: rated(0.6, estimate('Melee damage dealer, sturdy with self-healing.')),
        aoe: rated(
          0.4,
          confirmed(
            ['p2'],
            'Retribution deals a little area damage with holy ground (Consecration); the developers deliberately gave it no cleave attack.',
            {
              p2: '25:06',
            },
          ),
        ),
        burst: rated(
          0.6,
          community(
            ['wowhead-guide-paladin-retribution', 'deep-dive-paladin', 'wowhead-spell-instrument-of-law'],
            'In PvP, most of the damage likely comes early in a fight, though there is no major damage cooldown; a talent makes the finishing hit on weakened targets instant (Instrument of Law, Hammer of Wrath).',
          ),
        ),
        apm: rated(
          0.4,
          confirmed(
            ['p2'],
            'Paladins have many free global cooldowns, left open on purpose as room to react, for example with an emergency heal (Lay on Hands).',
            { p2: '37:03' },
          ),
        ),
        cc: rated(
          0.5,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-retribution-abilities'],
            'A stun, a tool against undead and a talent for one more crowd control effect (Hammer of Justice, Turn Undead, Repentance); no interrupt and no way to slow enemies, and guides call the crowd control "very limited", with moderately long cooldowns.',
          ),
        ),
        defAbsorb: rated(
          0.7,
          classic(
            'Can make itself immune, or an ally immune to physical damage (Divine Shield, Blessing of Protection).',
          ),
        ),
        defStand: rated(
          0.6,
          estimate(
            'Plate armor and a Paladin aura that adds armor, but a two-handed weapon instead of a shield, so no block.',
          ),
        ),
        escape: rated(
          0.45,
          confirmed(['deep-dive-paladin'], 'Moves 15% faster thanks to a talent (Pursuit of Justice).'),
        ),
        gearDependency: rated(
          0.85,
          community(
            ['wowhead-guide-paladin-retribution', 'dn'],
            'Heavily reliant on gear, especially on stacking spell power, and a talent turns only up to 30% of Intellect into spell damage (Champion of the Light).',
          ),
        ),
        execute: rated(
          0.75,
          unconfirmed(
            ['deep-dive-paladin', 'wowhead-spell-instrument-of-law', 'wowhead-guide-paladin-retribution-abilities'],
            "A finishing ability for enemies below 20% health (Hammer of Wrath), which a Retribution talent makes instant, accentuating the Paladin's strength against weakened targets (Instrument of Law).",
          ),
        ),
        groupDemand: rated(
          0.5,
          confirmed(
            ['deep-dive-paladin', 'wowhead-guide-paladin-retribution'],
            'A talent keeps all judgements on the target active, even those of other Paladins, which adds significant group utility (Sacred Arbiter); guides find a major damage cooldown is missing, so groups take Retribution mainly for its utility.',
          ),
        ),
        hybridTax: rated(
          1,
          confirmed(
            ['p2'],
            'As a hybrid damage spec, Retribution deals about 5% less damage; every class except Hunter, Mage, Rogue and Warlock counts as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        procs: rated(
          0.4,
          confirmed(
            ['deep-dive-paladin', 'dn'],
            'Little to react to: a damage buff from critical strikes lasts 30 sec and stacks up to 3 times (Vengeance).',
          ),
        ),
        levelingDowntime: rated(
          0.45,
          community(
            ['wowhead-guide-paladin-retribution'],
            'A small mana pool that can easily drain dry, so mana breaks between fights despite self-healing.',
          ),
        ),
        raidUtility: rated(
          0.95,
          confirmed(
            ['deep-dive-paladin'],
            "Buffs and debuffs for the raid: a talent keeps three judgement debuffs active at once (Sacred Arbiter), another lets melee attacks lower the target's attack power (Vindication); plus raid-wide resistance auras and Blessing of Kings.",
          ),
        ),
        roleHealer: rated(
          0.25,
          confirmed(['p2'], 'Retribution can heal, but as a hybrid damage spec only moderately, by design.', {
            p2: '17:56',
          }),
        ),
        roleMeleeDps: rated(1, confirmed(['deep-dive-paladin'], 'A strong melee damage dealer.')),
        roleTank: rated(
          0.2,
          confirmed(['deep-dive-paladin'], 'Retribution can step in as an off-tank with Righteous Fury.'),
        ),
        selfHeal: rated(
          0.85,
          confirmed(
            ['deep-dive-paladin', 'p2', 'wowhead-guide-paladin-retribution-abilities'],
            'Hybrids can heal themselves thanks to their mana bar: every Paladin has direct heals and an emergency heal with a 20 min cooldown (Flash of Light, Holy Light, Lay on Hands), but Retribution does not heal full-time, and its mana also pays for seals.',
            { p2: '18:01' },
          ),
        ),
        singleTarget: rated(
          0.7,
          confirmed(
            ['deep-dive-paladin', 'dn', 'wowhead-guide-paladin-retribution'],
            'Paladins can be competitive damage dealers, and a talent adds 30% of Intellect as spell damage (Champion of the Light); guides rate its single-target damage as moderate and call it a capable damage dealer.',
          ),
        ),
        soloLeveling: rated(
          0.7,
          confirmed(
            ['dn', 'wowhead-guide-paladin-retribution'],
            'From level 40 in plate armor, self-healing and emergency buttons (Lay on Hands, Blessing of Protection) keep leveling safe; a weapon strike adds damage, which a talent raises (Holy Strike). Guides find the small mana pool can easily drain dry and limits the pace.',
          ),
        ),
        threatControl: rated(
          0.55,
          confirmed(
            ['deep-dive-paladin', 'dn', 'wowhead-guide-paladin-retribution-abilities'],
            "A Retribution talent lowers all threat by 20% while the tanking threat boost is off (Instrument of Law, Righteous Fury), and Salvation lowers one party member's threat without excluding a blessing.",
          ),
        ),
        themeMartial: rated(
          0.7,
          confirmed(
            ['deep-dive-paladin'],
            'Retribution is a weapon-wielding champion of the Light that blends weapon attacks with Holy damage, and seals add damage to every melee swing.',
          ),
        ),
        autoAttack: rated(
          0.85,
          confirmed(
            ['deep-dive-paladin', 'p2', 'wowhead-guide-paladin-retribution-abilities'],
            'Auto attacks carry the play style by design: seals add damage or effects to each melee swing, and a talent lets the next swing after a seal swap carry both seals (Twist of Light); Holy Strike and Judgement deal damage of their own.',
            { p2: '37:16' },
          ),
        ),
      },
    },
  },
} satisfies ClassSpecs<'paladin'>;
