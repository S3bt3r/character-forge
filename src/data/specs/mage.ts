import { classic, community, confirmed, estimate, unconfirmed } from '../evidence/helpers';
import { graded, rated, type ClassSpecs } from '../rated';

/**
 * Mage: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const MAGE_SPECS = {
  traits: {
    armor: rated(0, classic('Cloth armor.')),
    deadZone: rated(0, classic('No minimum range: every spell works up close.')),
    defStand: rated(
      0.1,
      classic('Wears cloth and cannot block; only its armor spells add a little armor (Frost Armor, Ice Armor).'),
    ),
    dungeonUtility: rated(
      0.25,
      classic(
        'Can remove curses from the group (Remove Lesser Curse), but cannot remove poisons or diseases and cannot resurrect the dead.',
      ),
    ),
    execute: rated(0, classic('No bonus damage against weakened enemies.')),
    gearDependency: rated(
      0.4,
      confirmed(
        ['p2', 'dn', 'wowhead-guide-mage-fire'],
        "Spell damage is tuned to typical green questing gear. Frost's main damage bonus needs no critical strikes (Ice Lance hits frozen targets much harder), and guides find a build with Frost talents needs less gear early on.",
        { p2: '10:23' },
      ),
    ),
    groundZones: rated(
      0.6,
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-mage-arcane'],
        'Area spells hit a chosen spot on the ground (Blizzard, Flamestrike); a Frost talent makes Blizzard slow by at most 40% (Improved Blizzard), and guides note that Flamestrike does not stack with its own ranks.',
      ),
    ),
    groupDemand: rated(
      0.5,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Always useful to a raid or party for buffs, food and water, control and damage, but fills only a damage spot.',
      ),
    ),
    healAbsorb: rated(0, classic('No ability heals others.')),
    healDirect: rated(0, classic('No ability heals others.')),
    healGroup: rated(0, classic('No ability heals others.')),
    healHot: rated(0, classic('No ability heals others.')),
    healingReduction: rated(0, classic('No healing reduction.')),
    hybridFlex: rated(
      0,
      confirmed(['p2'], "Damage is the Mage's only role; Mages explicitly don't count as hybrids.", { p2: '22:32' }),
    ),
    hybridTax: rated(
      0,
      confirmed(['p2'], "Mages don't count as hybrids, so there is no hybrid damage cost.", { p2: '22:18' }),
    ),
    interrupt: rated(
      0.9,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Can interrupt an enemy spellcast (Counterspell); one point in a talent always adds a short Silence (Improved Counterspell).',
      ),
    ),
    levelingDowntime: rated(
      0.7,
      confirmed(
        ['deep-dive-mage-shaman', 'dn'],
        'Conjures its own food and water, but the Mage needs to restore mana between fights while leveling, and Fire goes without the Frost talents whose slows let a Mage kite without losing health.',
      ),
    ),
    pet: rated(0, classic('No pet.')),
    petControl: rated(0, classic('No pet.')),
    positional: rated(0, classic('No ability needs a position.')),
    raidUtility: rated(
      0.4,
      confirmed(
        ['deep-dive-mage-shaman', 'dn'],
        "Brings unique buffs such as Arcane Intellect, but no raid-wide debuff: Improved Scorch and Winter's Chill help only the Mage who casts them.",
      ),
    ),
    range: rated(0.9, confirmed(['hero'], 'Mages prefer to fight from range.')),
    rangeWeave: rated(0, classic('Casts from a fixed spell range and never switches to melee.')),
    reagentDependency: rated(0.35, classic('Teleports and portals use up runes, and group buffs use up powder.')),
    resEnergy: rated(0, classic("Mages don't use energy.")),
    resMana: rated(
      1,
      confirmed(['deep-dive-mage-shaman'], 'Mana is the only resource; Arcane spends mana deliberately for damage.'),
    ),
    resRage: rated(0, classic("Mages don't use rage.")),
    roleHealer: rated(0, classic('No healing spells.')),
    roleMeleeDps: rated(0, classic('Caster without a melee role.')),
    roleRangedDps: rated(
      1,
      confirmed(['deep-dive-mage-shaman'], 'One of the most powerful damage classes, casting spells from range.'),
    ),
    roleTank: rated(0, classic('Pure damage class without tank tools.')),
    selfCleanse: rated(0.25, classic('Can remove curses (Remove Lesser Curse), but no magic, poisons or diseases.')),
    selfHeal: rated(0, classic('No self-healing.')),
    services: rated(
      0.8,
      confirmed(
        ['deep-dive-mage-shaman', 'p3'],
        'Conjures food and water for the group, and the developers mention Mage portals; teleports are assumed.',
        { p3: '52:40' },
      ),
    ),
    shapeshift: rated(0, classic('No shapeshifting.')),
    slow: rated(
      0.7,
      confirmed(
        ['dn', 'deep-dive-mage-shaman'],
        'Several baseline spells slow enemies: one by 40% from level 24 (Frost Blast), another from level 40 (Frostfire Bolt), and others such as Cone of Cold; Arcane and Fire have no talents that strengthen them.',
      ),
    ),
    soloEndgame: rated(
      0.55,
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-mage-fire'],
        'Mages are extremely fragile and die easily if caught in melee. Fire ends fights with heavy critical hits but without the control of the Frost talents, and guides call it gear dependent, so it falls behind while gearing up.',
      ),
    ),
    stealth: rated(0, classic('No stealth.')),
    stun: rated(
      0.05,
      confirmed(
        ['deep-dive-mage-shaman'],
        'No stun of its own; the talent that adds a chance to stun belongs to the Fire tree (Impact).',
      ),
    ),
    tabTargetTank: rated(0, classic('Not a tank class.')),
    themeArcane: graded(
      { 'mage-arcane': 1, 'mage-fire': 0.4, 'mage-frost': 0.35 },
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-mage-fire'],
        "Arcane power amplifies the rest of the Mage's toolkit; for Arcane it is the core. Fire and Frost build on their own school, but an Arcane talent lets their bolts trigger Arcane Missiles (Missile Barrage), and guides find deep Fire reaches good Arcane support talents.",
      ),
    ),
    themeElements: rated(
      0.4,
      confirmed(
        ['hero', 'deep-dive-mage-shaman'],
        'Mages hurl powerful bolts of frost and flame; Arcane builds on Arcane spells and casts Fireball and Frostbolt alongside them, both of which can trigger Missile Barrage.',
      ),
    ),
    themeFel: rated(0, classic("Demons are not part of the Mage's theme.")),
    themeLight: rated(0, classic("The Light is not part of the Mage's theme.")),
    themeMartial: rated(0, classic("Weapon mastery is not part of the Mage's theme.")),
    themeNature: rated(0, classic("Nature is not part of the Mage's theme.")),
    themeShadow: rated(0, classic("Shadow magic is not part of the Mage's theme.")),
    totems: rated(0, classic('No totems.')),
    autoAttack: rated(
      0.1,
      community(
        ['wowhead-guide-mage-arcane', 'dn'],
        'Damage comes from spells, not weapons. The wand is very relevant while leveling, as for every caster, but wands do not scale with spell damage and need 0.5 sec of standing still.',
      ),
    ),

    weaponCaster: rated(
      1.0,
      confirmed(
        ['deep-dive-mage-shaman', 'deep-dive-panel'],
        'Arcane, Fire and Frost all fight with spells, from Arcane Blast to Fireball and Frostbolt, and spellcaster weapons grant spell damage.',
      ),
    ),
    weaponDual: rated(0, confirmed(['hero'], 'Mages rarely engage in melee and fight with spells, not with weapons.')),
    weaponRanged: rated(0, confirmed(['hero'], 'Mages attack from a distance with spells, not with a bow or gun.')),
    weaponShield: rated(
      0,
      confirmed(['hero'], 'Mages rarely engage in melee and fight with spells, not with weapons.'),
    ),
    weaponTwoHand: rated(
      0,
      confirmed(
        ['hero'],
        'Mages rarely engage in melee and fight with spells, not with weapons; a staff serves their spells, not mighty blows.',
      ),
    ),
  },
  specs: {
    'mage-arcane': {
      name: 'Arcane',
      traits: {
        soloEndgame: rated(
          0.5,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-mage-arcane'],
            'Mages are extremely fragile and die easily if caught in melee. Arcane consumes mana for more damage, and guides name running out of mana as a weakness, which drains long farming sessions.',
          ),
        ),
        groundZones: rated(
          0.4,
          community(
            ['wowhead-guide-mage-arcane'],
            "Can place ground spells such as Blizzard, but in dungeons Arcane's highlight is area damage with Arcane Explosion, which a talent lets it use as much as it wants without much concern for threat (Arcane Subtlety).",
          ),
        ),
        levelingDowntime: rated(
          0.55,
          community(
            ['wowhead-guide-mage-arcane', 'deep-dive-mage-shaman', 'dn'],
            'Conjures its own food and water and needs to restore mana between fights while leveling; good mana support talents and free spells give more time in combat, so further optimization mostly goes into avoiding breaks to drink.',
          ),
        ),
        aoe: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-mage-arcane'],
            'Mages are masters of ranged area damage, stronger and more varied than any other class, and guides call AoE in dungeons the highlight of Arcane.',
          ),
        ),
        apm: rated(
          0.45,
          confirmed(
            ['dn'],
            'The pace is set by casts: Arcane Blast casts in 1.5 sec and its stacks last 15 sec, Arcane Wrath casts in 3.5 sec every 6 sec, and Missile Barrage procs come on top.',
          ),
        ),
        burst: rated(
          0.95,
          confirmed(
            ['dn', 'deep-dive-mage-shaman', 'wowhead-guide-mage-arcane'],
            'Builds up to a burst phase: Arcane Blast stacks spell damage up to 4 times, and guides suggest rushing to 4 stacks, then using cooldowns. Arcane talents raise critical damage, and guides expect great endgame burst with Arcane Power.',
          ),
        ),
        cc: rated(0.9, confirmed(['deep-dive-mage-shaman'], 'Has one of the best crowd control spells (Polymorph).')),
        combatReset: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'To get free, Arcane has only Blink and Frost Nova; Ice Block sits deep in the Frost talent tree, so Arcane goes without it.',
            { p2: '1:08:02' },
          ),
        ),
        complexity: rated(
          0.55,
          confirmed(
            ['dn', 'wowhead-guide-mage-arcane'],
            'A stacking spell and two talents add buttons (Arcane Blast, Arcane Wrath, Missile Barrage). Guides call the rotation simple at first, later an unintuitive priority list that is hard to figure out without outside help.',
          ),
        ),
        defAbsorb: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman', 'classic'],
            'A mana barrier absorbs damage (Mana Shield), made cheaper by an Arcane talent (Arcane Shielding), plus a ward against fire or frost; Arcane goes without Ice Block, a deep Frost talent.',
          ),
        ),
        defKite: rated(
          0.7,
          confirmed(
            ['dn', 'deep-dive-mage-shaman', 'classic'],
            'Keeps enemies at range with baseline spells: Frost Blast slows by 40% from level 24, Frostfire Bolt slows as well, and Frost Nova helps too; no Arcane talent improves them.',
          ),
        ),
        dotDamage: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Damage over time only as a small share, through Frostfire Bolt from level 40.',
          ),
        ),
        eliteSolo: rated(
          0.35,
          estimate(
            'Extremely fragile when caught in melee and without the Frost talents that strengthen slows for kiting; an Arcane talent makes the mana barrier cheaper (Arcane Shielding, Mana Shield).',
          ),
        ),
        escape: rated(0.75, classic('Blink and Frost Nova.')),
        gearDependency: rated(
          0.6,
          confirmed(
            ['p1', 'dn'],
            'Spells are tuned around the spell power on gear, and Arcane Blast also turns Intellect into spell damage.',
            { p1: '54:34' },
          ),
        ),
        procs: rated(
          0.7,
          confirmed(
            ['deep-dive-mage-shaman', 'dn'],
            'One proc to react to: hits from several spells can make the next Arcane Missiles channel twice as fast and cost no mana (Missile Barrage, a first-row talent), and Arcane Blast triggers it twice as often. The Arcane Blast stacks themselves are planned, not random.',
          ),
        ),
        pvpBattleground: rated(
          0.55,
          unconfirmed(
            ['p2'],
            'Arcane goes without Ice Block, a deep Frost talent, and a podcast guest finds a Mage without it hardly able to win in PvP; the developers have no plans at this time to give every Mage Ice Block.',
            { p2: '1:08:02' },
          ),
        ),
        pvpWorld: rated(
          0.6,
          unconfirmed(
            ['wowhead-guide-mage-arcane', 'deep-dive-mage-shaman', 'p2'],
            'Guides expect great burst damage from Arcane Power and Arcane critical damage talents, but Mages are extremely fragile in melee, and Arcane goes without Ice Block, a deep Frost talent; a podcast guest finds a Mage hardly able to win in PvP without it.',
            { p2: '1:08:02' },
          ),
        ),
        singleTarget: rated(
          0.85,
          confirmed(
            ['dn', 'wowhead-guide-mage-arcane'],
            'Damage grows with Intellect and maximum mana: Arcane Blast stacks spell damage from Intellect, and Arcane Wrath hits harder the more maximum mana the Mage has. Guides tie the output to fight length and mana.',
          ),
        ),
        soloLeveling: rated(
          0.65,
          community(
            ['wowhead-guide-mage-arcane'],
            'Mana support talents and an early wand improvement make for great early leveling.',
          ),
        ),
        survivability: rated(
          0.15,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Extremely fragile and dies easily when caught in melee; an Arcane talent makes the mana barrier cheaper (Arcane Shielding, Mana Shield), but Arcane goes without Ice Block, a deep Frost talent.',
          ),
        ),
        threatControl: rated(
          0.55,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-mage-arcane'],
            'Can deal area damage with little worry about threat: an Arcane talent lowers the threat of Arcane spells (Arcane Subtlety), and guides find it lets Arcane use Arcane Explosion as much as it wants; Arcane goes without Ice Block, a deep Frost talent.',
          ),
        ),
      },
    },
    'mage-fire': {
      name: 'Fire',
      traits: {
        stun: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'classic'],
            'Can stun by chance rather than on demand: a Fire talent gives Fire spells a chance to stun (Impact); low rank spells trigger it less often, and the periodic damage of Flamestrike does not trigger it.',
          ),
        ),
        themeElements: rated(
          0.7,
          confirmed(['hero'], 'Mages hurl powerful bolts of frost and flame; Fire relies on Fire spells.'),
        ),
        aoe: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Masters of ranged area damage, stronger and more varied than any other class.',
          ),
        ),
        apm: rated(
          0.35,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-mage-fire'],
            'A calm pace of mostly long casts with few extra inputs: Fireball makes up most of the casting, and Fire Blast on its cooldown always grants a charge toward a faster Pyroblast.',
          ),
        ),
        burst: rated(
          0.95,
          confirmed(
            ['deep-dive-mage-shaman', 'dn'],
            'Lands devastatingly heavy hits and critical damage: with 3 stacks of Heating Up, Pyroblast casts in 1.5 sec, and Combustion has 3 charges.',
          ),
        ),
        cc: rated(
          0.8,
          confirmed(
            ['deep-dive-mage-shaman'],
            "Has one of the best crowd control spells (Polymorph); Fire's own addition is a talent that stuns by chance and triggers less often from low rank spells (Impact).",
          ),
        ),
        combatReset: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'To get free, Fire has only Blink and Frost Nova; Ice Block sits deep in the Frost talent tree, so Fire goes without it.',
            { p2: '1:08:02' },
          ),
        ),
        complexity: rated(
          0.55,
          confirmed(
            ['dn', 'wowhead-guide-mage-fire'],
            'Guides call Fire very simple at first and slightly more complicated while leveling, once Heating Up comes into play: Fire Blast always adds a charge toward a faster Pyroblast.',
          ),
        ),
        defAbsorb: rated(
          0.35,
          confirmed(
            ['deep-dive-mage-shaman', 'classic'],
            'A mana barrier and a ward against fire or frost (Fire Ward, Frost Ward), but without the Arcane talent that makes the barrier cheaper and without Ice Block, a deep Frost talent; Mages are extremely fragile when caught in melee.',
          ),
        ),
        defKite: rated(
          0.8,
          confirmed(
            ['dn', 'deep-dive-mage-shaman'],
            'Keeps enemies at range with baseline slows: Frost Blast slows by 40% from level 24, and a Fire talent also shortens the cast of the slowing Frostfire Bolt (Improved Fireball).',
          ),
        ),
        dotDamage: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-mage-fire', 'dn'],
            'Mostly heavy direct hits, with damage over time on the side: critical strikes make the target burn for part of the damage (Ignite), Frostfire Bolt adds some too, and a Fire talent raises Fire damage for each Fire effect on the target.',
          ),
        ),
        eliteSolo: rated(
          0.3,
          estimate(
            'Extremely fragile when caught in melee and without the Frost talents that strengthen slows for kiting; Fire also goes without the cheaper mana barrier of the Arcane tree (Arcane Shielding) and without Ice Block, a deep Frost talent, so long fights against an elite are hard.',
          ),
        ),
        escape: rated(0.75, classic('Blink and Frost Nova.')),
        gearDependency: rated(
          0.9,
          community(
            ['wowhead-guide-mage-fire', 'deep-dive-mage-shaman'],
            'Fire requires quite a lot of gear to scale: Ignite needs fairly consistent critical strikes, and Heating Up also comes from critical strikes. Fire is balanced for very endgame gearing and falls behind easily while gearing up.',
          ),
        ),
        procs: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-mage-fire'],
            'Rewards critical strikes and timing: critical strikes from its main Fire spells stack Heating Up, which shortens the next Pyroblast, and guides find the spec somewhat reliant on luck, even though Fire Blast always grants a charge.',
          ),
        ),
        pvpBattleground: rated(
          0.55,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'p2'],
            'Mages are masters of ranged area damage, and critical strikes have full effect in PvP; but they are extremely fragile in melee, and a podcast guest finds a Fire Mage struggles against everything in PvP.',
            { p2: '1:08:35' },
          ),
        ),
        pvpWorld: rated(
          0.4,
          confirmed(
            ['p2'],
            'A podcast guest finds Fire struggles against everything in PvP; the developers say not every spec is built for PvP.',
            { p2: '1:08:35' },
          ),
        ),
        singleTarget: rated(
          0.8,
          community(
            ['wowhead-guide-mage-fire'],
            'Scales strongly with critical strikes and deals great damage in endgame gear.',
          ),
        ),
        soloLeveling: rated(0.6, confirmed(['dn'], 'The Mage needs to restore mana between fights while leveling.')),
        survivability: rated(
          0.1,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Extremely fragile and dies easily when caught in melee; Fire goes without the cheaper mana barrier of the Arcane tree (Arcane Shielding) and without Ice Block, a deep Frost talent.',
          ),
        ),
        threatControl: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Threat reduction only through talents such as Burning Soul (3 points); Ignite is separate per Mage, which avoids threat problems.',
          ),
        ),
      },
    },
    'mage-frost': {
      name: 'Frost',
      traits: {
        soloEndgame: rated(
          0.8,
          confirmed(
            ['deep-dive-mage-shaman', 'p2', 'wowhead-guide-mage-frost'],
            'Frost grants combat control unrivaled by any other class; guides call it the quintessential safety caster (slows, a barrier, Ice Block). Its slows are deliberately limited against large groups, to keep Mages from soloing 20 mobs.',
            { p2: '1:06:28' },
          ),
        ),
        slow: rated(
          1.0,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-mage-frost'],
            'Control is the strength of Frost: several spells slow (Frostbolt, Cone of Cold), Frost talents add a slow of at most 40% to Blizzard and lengthen all Chill effects by up to 33%, and guides call Frost the master of the ranged slow.',
          ),
        ),
        themeElements: rated(
          0.7,
          confirmed(['hero'], 'Mages hurl powerful bolts of frost and flame; Frost relies on Frost spells.'),
        ),
        levelingDowntime: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-mage-frost'],
            'Conjures its own food and water, but the Mage needs to restore mana between fights while leveling, and guides find Frost cannot sustain itself well. Its slows make kiting possible with no personal risk, which saves health.',
          ),
        ),
        aoe: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Mages are masters of ranged area damage; Blizzard and Cone of Cold are limited to curb gold farming.',
            { p2: '1:05:39' },
          ),
        ),
        apm: rated(
          0.5,
          confirmed(
            ['p2', 'wowhead-guide-mage-frost'],
            'A moderate pace: Frostbolt as the filler and Ice Lance on Fingers of Frost procs; guides call it simple but asking for quick reactions.',
            { p2: '7:08' },
          ),
        ),
        burst: rated(
          0.6,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-mage-frost'],
            'Guides find Frost has no burst cooldown; Ice Lance deals 200% more damage on frozen targets, and Fingers of Frost treats targets as frozen.',
          ),
        ),
        cc: rated(
          1,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Has one of the best crowd control spells (Polymorph), and Frost adds control unrivaled by any other class.',
          ),
        ),
        combatReset: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Gets out of trouble with Ice Block, a Frost talent, and Cold Snap, a deeper Frost talent with a 10 min cooldown. The developers find Ice Block for every Mage might be okay but would water down the Frost fantasy, and have no plans for it at this time.',
            { p2: '1:08:17' },
          ),
        ),
        complexity: rated(
          0.4,
          community(
            ['wowhead-guide-mage-frost', 'dn'],
            'A very simple rotation that asks only for quick reactions to procs: a filler spell, Ice Lance on Fingers of Frost procs, and a small combo of stacks that empower Cone of Cold.',
          ),
        ),
        defAbsorb: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Can take a defensive talent deep in its own tree (Ice Block, 16 points).',
          ),
        ),
        defKite: rated(1, confirmed(['deep-dive-mage-shaman'], 'Frost offers a level of control no other class has.')),
        dotDamage: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Damage over time only as a small share, through Frostfire Bolt from level 40.',
          ),
        ),
        eliteSolo: rated(
          0.65,
          community(
            ['wowhead-guide-mage-frost'],
            'The quintessential safety caster, whose slows make kiting possible with no personal risk. But Frost cannot sustain itself well and has no proper way to recover health in combat, which keeps long fights against an elite demanding.',
          ),
        ),
        escape: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Several ways out: Blink and Frost Nova, plus two deep Frost talents, Ice Block (16 points) and a second one with a 10 min cooldown (21 points).',
          ),
        ),
        procs: rated(
          0.85,
          confirmed(
            ['p2', 'dn', 'wowhead-guide-mage-frost'],
            'Reacting to procs is the core: Fingers of Frost procs decide when to cast Ice Lance, which deals 200% more damage on frozen targets. The developers use this as their example of a proc rotation, and guides warn players who struggle with reacting to procs.',
            { p2: '7:08' },
          ),
        ),
        pvpBattleground: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Mages are masters of ranged area damage, and Frost offers control unrivaled by any other class; a podcast guest calls Frost the PvP build.',
            { p2: '1:07:56' },
          ),
        ),
        pvpWorld: rated(
          0.85,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Frost offers control unrivaled by any other class; a podcast guest calls Frost currently the PvP build.',
            { p2: '1:07:56' },
          ),
        ),
        singleTarget: rated(
          0.75,
          community(
            ['wowhead-guide-mage-frost', 'dn'],
            'Damage from Frostbolt and Ice Lance, which deals 200% more damage on frozen targets; Frost is just as effective against single targets as in AoE.',
          ),
        ),
        soloLeveling: rated(
          0.75,
          community(
            ['wowhead-guide-mage-frost'],
            'The quintessential safety caster that kites with little risk, but with weak self-sustain.',
          ),
        ),
        survivability: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-mage-frost'],
            'Mages are extremely fragile, and choosing a specialization is their answer: guides find Frost harder to kill thanks to slows, Ice Barrier and Ice Block.',
          ),
        ),
        threatControl: rated(
          0.6,
          confirmed(
            ['dn', 'deep-dive-mage-shaman', 'classic'],
            "Can keep threat in check: a talent lowers the Mage's threat (Frost Channeling), and Ice Block, a deep Frost talent, lets the Mage survive a moment of pulled aggro.",
          ),
        ),
      },
    },
  },
} satisfies ClassSpecs<'mage'>;
