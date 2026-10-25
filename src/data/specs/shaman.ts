import { CLASSIC, classic, community, confirmed, estimate } from '../evidence/helpers';
import { graded, rated, type ClassSpecs } from '../rated';

/**
 * Shaman: every trait value with the evidence that justifies it (docs/DATA.md, section "Data model"). The class part
 * applies to every spec without a pair of its own; `graded` gives one evidence a value per spec.
 */
export const SHAMAN_SPECS = {
  traits: {
    apm: rated(
      0.5,
      confirmed(['deep-dive-mage-shaman'], 'Plays at a medium pace, with totems on a 1.0 sec global cooldown.'),
    ),
    armor: rated(0.55, confirmed(['deep-dive-mage-shaman'], 'Wears mail armor and can use shields.')),
    combatReset: rated(
      0.1,
      community(
        ['wowhead-guide-shaman-restoration-abilities'],
        'No way to drop combat. Can come back to life after dying, on a long cooldown (Reincarnation): useful to get back up after a wipe or to keep fighting after a mistake, but it ends no fight.',
      ),
    ),
    complexity: rated(
      0.4,
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration'],
        'Choosing and placing totems is a critical skill, and call spells summon several at once. Guides find Restoration needs only three heals (area, single target, and a heal over time on a short cooldown); the task is spreading them across a group.',
      ),
    ),
    deadZone: rated(0, classic('No minimum range: every ability works up close.')),
    dungeonUtility: rated(
      0.65,
      confirmed(
        ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-shaman-restoration-abilities'],
        'Can resurrect the dead (Ancestral Spirit) and remove poisons and diseases, also with cleansing totems that last 5 min (Disease Cleansing Totem).',
      ),
    ),
    eliteSolo: rated(
      0.6,
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
        'Among the sturdiest classes thanks to mail and a shield; guides use a slowing shock to kite melee elites when soloing (Frost Shock).',
      ),
    ),
    escape: rated(
      0.5,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Can escape in a travel form (Ghost Wolf); it becomes instant and usable indoors only with a talent from the Enhancement tree (Improved Ghost Wolf).',
      ),
    ),
    execute: rated(0, classic('No bonus damage against weakened enemies.')),
    groundZones: graded(
      { 'shaman-elemental': 0.9, 'shaman-enhancement': 0.8, 'shaman-restoration': 0.85 },
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
        'Totems stand on the ground, and placing them well is a critical skill. Fire Nova erupts at the Fire Totem, and an Elemental talent extends its range. Restoration places its healing totems to reach the party; Enhancement has few totem talents.',
      ),
    ),
    healAbsorb: rated(
      0,
      confirmed(
        ['deep-dive-mage-shaman', 'p2'],
        "Elemental and Enhancement cannot shield allies or absorb damage for them. Shamans heal with their own chaining spells, and according to the developers absorb shields are not part of any Shaman's healing.",
        { p2: '1:14:32' },
      ),
    ),
    healDirect: rated(
      0.05,
      confirmed(
        ['p2'],
        "Can heal a single target only as an off-heal (Healing Wave): the developers want hybrids to be able to heal, but not to be good at it, and Enhancement's Maelstrom Weapon speeds up Lightning Bolt but no healing spells.",
        { p2: '17:56' },
      ),
    ),
    healGroup: rated(
      0.05,
      confirmed(
        ['p2'],
        "Can heal a group only as an off-heal (Chain Heal, Healing Stream Totem): the developers deliberately keep hybrid damage specs from being too good at healing, and Enhancement's Maelstrom Weapon speeds up no healing spells.",
        { p2: '17:56' },
      ),
    ),
    healHot: rated(
      0.05,
      confirmed(
        ['p2', 'wowhead-guide-shaman-restoration-abilities'],
        'A totem can heal nearby party members at intervals (Healing Stream Totem), but Elemental and Enhancement are damage specs, and the developers keep hybrids from being good at healing.',
        { p2: '17:56' },
      ),
    ),
    healingReduction: rated(0, classic('Cannot reduce the healing an enemy receives.')),
    hybridFlex: rated(
      0.7,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Can deal melee or spell damage or heal, all effectively; Enhancement can also tank for a while in small groups.',
      ),
    ),
    interrupt: rated(
      0.9,
      community(
        ['wowhead-guide-shaman-restoration-abilities'],
        'Every Shaman has an instant interrupt (Earth Shock), used mainly to stop enemy spellcasts.',
      ),
    ),
    pet: rated(0.1, classic('No pet; totems only count marginally.')),
    petControl: rated(0, classic('No controllable pet.')),
    positional: rated(0, classic('No ability needs a position.')),
    raidUtility: rated(
      0.85,
      confirmed(
        ['deep-dive-mage-shaman', 'dn', 'raids'],
        "Totems buff the whole raid and last 5 min: resistance totems (Onyxia's Lair, for one, calls for fire resistance) and other buff totems such as Windfury Totem and Strength of Earth.",
      ),
    ),
    reagentDependency: rated(0.3, classic('Reincarnation needs an Ankh, and totems need totem items.')),
    resEnergy: rated(0, classic("Shamans don't use energy.")),
    resMana: rated(
      1,
      confirmed(
        ['deep-dive-mage-shaman', 'dn'],
        "Mana is the only resource; Stormstrike, an Enhancement ability, costs 8% of base mana, and Totemic Recall refunds 25% of the totems' mana.",
      ),
    ),
    resRage: rated(0, classic("Shamans don't use rage.")),
    selfCleanse: rated(
      0.5,
      confirmed(
        ['dn', 'wowhead-guide-shaman-restoration-abilities'],
        'Can remove poison and disease (Cure Poison, Cure Disease), also with cleansing totems that last 5 min (Disease Cleansing Totem), but cannot remove magic or curses: 2 of the 4 types.',
      ),
    ),
    services: rated(0, classic('No summons, portals or conjured food and water.')),
    shapeshift: graded(
      { 'shaman-elemental': 0, 'shaman-enhancement': 0.1, 'shaman-restoration': 0 },
      confirmed(
        ['deep-dive-mage-shaman'],
        'Has only a travel form, no combat form (Ghost Wolf); an Enhancement talent makes it instant and usable indoors (Improved Ghost Wolf).',
      ),
    ),
    slow: rated(
      0.75,
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
        'Can slow enemies with a shock and a totem (Frost Shock, Earthbind Totem); guides use the shock mainly to avoid damage or escape. An Elemental talent makes the totem hold nearby targets in place when placed.',
      ),
    ),
    soloEndgame: rated(
      0.65,
      confirmed(
        ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
        'Among the sturdiest classes thanks to mail and a shield, but lacks effective crowd control and relies on allies. Enhancement fights in melee, and guides call its instant Ghost Wolf, usable indoors too, great in the open world.',
      ),
    ),
    stealth: rated(0, classic('No stealth.')),
    stun: rated(0, classic('No stun.')),
    survivability: rated(
      0.7,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Among the sturdiest classes with mail and a shield, but reliant on allies for control and survival.',
      ),
    ),
    tabTargetTank: rated(0, classic('No tank specialization.')),
    themeArcane: rated(0, CLASSIC),
    themeElements: rated(1, confirmed(['hero'], 'Shamans are in direct contact with the elements.')),
    themeFel: rated(0, CLASSIC),
    themeLight: rated(0, CLASSIC),
    themeMartial: rated(0, CLASSIC),
    themeNature: graded(
      { 'shaman-elemental': 0.35, 'shaman-enhancement': 0.45, 'shaman-restoration': 0.5 },
      confirmed(
        ['hero', 'deep-dive-mage-shaman'],
        'Shamans embody the primal bond between mortals and their surroundings, but their focus is the elements, not forests and beasts. Restoration heals (Riptide, Chain Heal), Enhancement adds an animal touch with a wolf form a talent makes instant (Ghost Wolf), and Elemental fights with storm and fire.',
      ),
    ),
    themeShadow: rated(0, CLASSIC),
    totems: rated(
      1,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Totems take a 1.0 sec global cooldown each and buff totems last 5 min; call spells place 4 totems at once (Call of the Elements, Call of the Spirits, Call of the Ancestors).',
      ),
    ),

    weaponCaster: rated(
      0.95,
      confirmed(
        ['deep-dive-mage-shaman', 'deep-dive-panel'],
        'Elemental fights with spells such as Lightning Bolt, Chain Lightning and Lava Burst, and spellcaster weapons grant spell damage; Shamans wear mail, though, and may carry a one-hander and shield instead of a staff.',
      ),
    ),
    weaponDual: rated(
      0,
      community(
        ['wowhead-guide-shaman-enhancement'],
        'Shamans have no dual wielding: Enhancement fights with a two-hander, Elemental and Restoration with spells.',
      ),
    ),
    weaponRanged: rated(0, classic('Shamans cannot use a bow or gun.')),
    weaponShield: rated(
      0.35,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Shamans wear mail and can carry a shield; Restoration heals with a one-hander and shield at hand, though no talent rewards the shield and its play is spells.',
      ),
    ),
    weaponTwoHand: rated(
      0,
      confirmed(
        ['deep-dive-mage-shaman'],
        'Elemental and Restoration fight with spells, so the baseline skill with two-handed axes and maces plays no part for them.',
      ),
    ),
  },
  specs: {
    'shaman-elemental': {
      name: 'Elemental',
      traits: {
        soloEndgame: rated(
          0.45,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-elemental'],
            'Among the sturdiest classes thanks to mail and a shield, but lacks effective crowd control and relies on allies. Elemental deals ranged spell damage; guides find it runs short of mana at end game, which slows farming, and that a Restoration talent may solve this (Mindfulness).',
          ),
        ),
        weaponShield: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Shamans wear mail and can carry a shield, and Elemental may cast with a one-hander and shield, but it deals its damage at range with spells and no talent rewards the shield.',
          ),
        ),
        themeArcane: rated(
          0.05,
          confirmed(
            ['hero', 'deep-dive-mage-shaman'],
            "Arcane magic is not part of Elemental's theme: Shamans commune directly with the elements, and its spells are lightning and fire (Lightning Bolt, Chain Lightning, Lava Burst). It shares only the role of a pure damage caster.",
          ),
        ),
        apm: rated(
          0.35,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-spell-elemental-mastery'],
            'Long casts fill most of the fight: Lightning Bolt and Lava Burst take 2.5 sec each to cast. An early Elemental talent shortens both by 0.5 sec, and Elemental Mastery shortens them further, but only for 15 sec on a 3 min cooldown.',
          ),
        ),
        complexity: rated(
          0.35,
          community(
            ['wowhead-guide-shaman-elemental', 'dn'],
            'A simple playstyle that makes Elemental a great option for new players; two spells with a cooldown each join Lightning Bolt and the totems (Lava Burst, Elemental Mastery).',
          ),
        ),
        survivability: rated(
          0.6,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Among the sturdiest classes with mail and a shield, but reliant on allies for control and survival; Elemental gets neither the extra dodge of Anticipation nor the healing of a healer spec.',
          ),
        ),
        aoe: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'p2'],
            'Hits groups with Chain Lightning, whose cooldown a talent removes for 15 sec, and with Fire Nova, which can be triggered several times at the Fire Totem. According to the developers, Shamans cleave only by burning mana on these two spells, and not much.',
            { p2: '25:18' },
          ),
        ),
        burst: rated(
          0.75,
          confirmed(['dn'], 'Its damage spikes come from two deep Elemental talents (Lava Burst, Elemental Mastery).'),
        ),
        cc: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman', 'dn'],
            'Shamans lack effective crowd control; an Elemental talent makes Earthbind Totem instantly hold nearby targets in place for 5 sec when placed (Earthbound).',
          ),
        ),
        defAbsorb: rated(
          0.2,
          confirmed(
            ['dn'],
            'Has hardly any shields or immunities, only a totem that redirects a spell (Grounding Totem).',
          ),
        ),
        defKite: rated(
          0.6,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-shaman-restoration-abilities'],
            'Can keep enemies away with slows from a shock and a totem (Frost Shock, Earthbind Totem), and an Elemental talent makes the totem hold nearby targets in place for 5 sec when placed (Earthbound): slows and a root, but no freeze.',
          ),
        ),
        defStand: rated(0.5, confirmed(['deep-dive-mage-shaman'], 'Mail armor and a shield make Shamans sturdy.')),
        dotDamage: rated(
          0.35,
          confirmed(
            ['deep-dive-mage-shaman', 'dn'],
            'Has a DoT (Flame Shock) that an Elemental talent strengthens and extends (Call of Flame), and Lava Burst benefits from it.',
          ),
        ),
        gearDependency: rated(
          0.7,
          community(
            ['wowhead-guide-shaman-elemental'],
            'Scales with spell power; early leveling is hard without a lot of spell power gear.',
          ),
        ),
        groupDemand: rated(
          0.55,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement', 'p2'],
            'Always welcome in a group, and guides note that every Shaman spec brings the same totems. Elemental brings them as a spell damage dealer that deals about 5% less damage as a hybrid and cannot step in as a tank in small groups.',
            { p2: '22:18' },
          ),
        ),
        hybridTax: rated(
          1,
          confirmed(['p2'], 'Shamans count as hybrids, so as a damage spec Elemental deals about 5% less damage.', {
            p2: '22:18',
          }),
        ),
        levelingDowntime: rated(
          0.75,
          confirmed(
            ['deep-dive-mage-shaman'],
            'A caster that spends mana on every pull and drinks often. A Restoration talent keeps regeneration going while casting (Mindfulness) and recalling totems returns some mana, but Elemental has no Water Shield and no weapon attacks to save mana.',
          ),
        ),
        procs: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Its chance effects act on their own and leave little to react to: Lightning Bolt and Chain Lightning have a chance to cast a second copy instantly at no mana cost (Lightning Overload).',
          ),
        ),
        pvpBattleground: rated(
          0.7,
          estimate('Brings burst and an area root (Elemental Mastery, Earthbound), but little crowd control.'),
        ),
        pvpWorld: rated(0.6, estimate('Good damage spikes, but hardly any crowd control.')),
        range: rated(
          0.85,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Spells reach about 30 yards; an Elemental talent also extends Lava Burst and Fire Nova by up to 6 yards and Flame Shock by up to 15 yards.',
          ),
        ),
        rangeWeave: rated(
          0,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-elemental'],
            'Casts from a fixed range, and placing totems needs no run into place: a spell moves them up to 30 yards (Totemic Projection).',
          ),
        ),
        roleHealer: rated(
          0.25,
          confirmed(['p2'], 'Can heal as a hybrid, but is not meant to be good at it.', { p2: '17:56' }),
        ),
        roleMeleeDps: rated(0, classic('Caster spec without a melee role.')),
        roleRangedDps: rated(1, confirmed(['deep-dive-mage-shaman'], 'Shamans can be effective magic damage dealers.')),
        roleTank: rated(0, classic('Not a tank.')),
        selfHeal: rated(
          0.75,
          confirmed(['p2'], 'Can heal itself, as hybrids can thanks to their mana bar.', { p2: '18:01' }),
        ),
        singleTarget: rated(
          0.7,
          confirmed(
            ['dn', 'deep-dive-mage-shaman', 'p2'],
            'Two deep Elemental talents strengthen damage on one target: Lava Burst deals 20% more damage to a target with Flame Shock, and Elemental Mastery shortens its main casts by 0.5 sec. The developers aim for about 5% less damage on hybrid damage specs.',
            { p2: '22:18' },
          ),
        ),
        soloLeveling: rated(
          0.45,
          community(
            ['wowhead-guide-shaman-elemental', 'dn', 'deep-dive-mage-shaman'],
            'Elemental is hard to level early without a lot of spell power gear and depends on mana; a second-row talent shortens Lightning Bolt casts to give it progression in the early levels (Elemental Alacrity).',
          ),
        ),
        threatControl: rated(
          0.5,
          confirmed(
            ['deep-dive-mage-shaman'],
            "A Restoration talent deliberately placed within Elemental's reach lowers the threat of all spells (Natural Grace).",
          ),
        ),
        autoAttack: rated(0.05, estimate('Damage comes from spells; weapon swings play almost no part.')),
      },
    },
    'shaman-enhancement': {
      name: 'Enhancement',
      traits: {
        positional: rated(
          0.25,
          confirmed(
            ['dn'],
            'Fights in melee, where no ability needs a position, but standing behind the enemy avoids its parries and blocks. A known beta bug lets enemies parry and block from behind at close range; not standing too close avoids it.',
          ),
        ),
        weaponCaster: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Fights with a two-hander, but can cast instant Lightning Bolts (Maelstrom Weapon), and the developers want it to care about spell power and use its lightning spells.',
            { p2: '50:16' },
          ),
        ),
        weaponShield: rated(
          0.05,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
            'Fights with a two-handed weapon and has no shield talent.',
          ),
        ),
        weaponTwoHand: rated(
          1.0,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
            'Fights with a two-handed weapon: two-handed axes and maces and Weapon Mastery are baseline, and guides describe it as a two-handed weapon spec without dual wielding.',
          ),
        ),
        themeMartial: rated(
          0.7,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Fights with its weapons: several abilities build on melee attacks (Stormstrike, Maelstrom Weapon, Rage of the Farseer), and weapon imbues empower the weapon itself, but it mixes in spell casting.',
            { p2: '51:09' },
          ),
        ),
        themeElements: rated(
          0.9,
          confirmed(
            ['hero', 'deep-dive-mage-shaman', 'p2'],
            'Shamans commune directly with the elements; Enhancement carries them on its weapons (Rockbiter Weapon) and casts lightning, an electric move that belongs to its fantasy (Maelstrom Weapon), though melee shares the focus.',
            { p2: '52:45' },
          ),
        ),
        apm: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Fills the free global cooldowns between melee swings, which the developers point out, with Stormstrike every 8 sec, shocks and instant Lightning Bolts (Maelstrom Weapon); totems take a 1.0 sec global cooldown.',
            { p2: '51:57' },
          ),
        ),
        aoe: rated(
          0.4,
          confirmed(
            ['p2'],
            "Area damage is not Enhancement's focus: the developers don't want it to be the king of cleave, so Maelstrom Weapon speeds up Lightning Bolt but not Chain Lightning.",
            { p2: '51:32' },
          ),
        ),
        burst: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'dn', 'wowhead-guide-shaman-enhancement'],
            'Has moderate damage spikes: a 3 min cooldown raises attack speed by 30% for 25 sec, but not casting speed (Rage of the Farseer), and Stormstrike every 8 sec makes the next Lightning Bolt deal 20% more damage.',
          ),
        ),
        cc: rated(0.2, confirmed(['deep-dive-mage-shaman'], 'Shamans lack effective crowd control.')),
        complexity: rated(
          0.5,
          community(
            ['wowhead-guide-shaman-enhancement'],
            '"Very straightforward" and "very beginner-friendly": using totems correctly and managing mana are the main things to learn.',
          ),
        ),
        defAbsorb: rated(
          0.35,
          confirmed(['deep-dive-mage-shaman'], 'A talent raises the chance to dodge attacks (Anticipation).'),
        ),
        defKite: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman'],
            "Can slow enemies with a shock and a totem (Frost Shock, Earthbind Totem); a first-row Enhancement talent widens the totem's area (Earth's Grasp), and another makes Shocks cheaper.",
          ),
        ),
        defStand: rated(
          0.5,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Wears mail and can carry a shield, though no talent improves the shield; a talent grants Stamina (Toughness).',
          ),
        ),
        dotDamage: rated(0.3, classic('Has a single DoT (Flame Shock).')),
        escape: rated(
          0.55,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Can escape in a travel form that a talent makes instant and usable indoors (Ghost Wolf, Improved Ghost Wolf).',
          ),
        ),
        gearDependency: rated(
          0.7,
          confirmed(
            ['p2', 'deep-dive-mage-shaman'],
            'Needs melee and caster stats at once: it depends on its weapon and attack power, and the developers want Enhancement to care about spell power too. Talents turn a share of Intellect into attack power and spell damage (Mental Dexterity, Mental Quickness).',
            { p2: '50:16' },
          ),
        ),
        groupDemand: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
            'Always welcome in a group, and guides expect every melee group to want a Shaman for Windfury Totem, though any Shaman spec brings the same totems.',
          ),
        ),
        hybridTax: rated(
          1,
          confirmed(['p2'], 'Shamans count as hybrids, so as a damage spec Enhancement deals about 5% less damage.', {
            p2: '22:18',
          }),
        ),
        levelingDowntime: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
            'Guides find Enhancement relies on weapon attacks without spending much mana, and a talent also lets it regenerate mana from Spirit (Improved Stormstrike).',
          ),
        ),
        procs: rated(
          0.8,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Melee attacks build up charges by chance until Lightning Bolt can be cast instantly (Maelstrom Weapon), and Windfury Weapon adds more procs.',
          ),
        ),
        pvpBattleground: rated(0.6, estimate('Puts pressure on enemies in melee, but has little crowd control.')),
        pvpWorld: rated(0.65, estimate('Sturdy and strong in duels with Stormstrike.')),
        range: rated(
          0.1,
          confirmed(
            ['p2', 'deep-dive-mage-shaman'],
            'Fights in melee; the developers want a little spellcasting mixed in, and Maelstrom Weapon makes Lightning Bolt instant.',
            { p2: '51:45' },
          ),
        ),
        rangeWeave: rated(
          0.2,
          confirmed(
            ['p2', 'deep-dive-mage-shaman'],
            'Mixes a little spellcasting into melee with shocks and Lightning Bolts from Maelstrom Weapon, but casts them from melee range, so its position hardly changes.',
            { p2: '51:45' },
          ),
        ),
        roleHealer: rated(
          0.25,
          confirmed(
            ['p2'],
            'Can heal as a hybrid, but Maelstrom Weapon deliberately speeds up only Lightning Bolt, not healing spells.',
            {
              p2: '18:12',
            },
          ),
        ),
        roleMeleeDps: rated(1, confirmed(['deep-dive-mage-shaman'], 'Shamans can be effective melee damage dealers.')),
        roleRangedDps: rated(
          0.1,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'A melee spec that mixes in spells: melee attacks stack charges that shorten the cast of Lightning Bolt (Maelstrom Weapon), and the developers want Enhancement to feel like more than just a melee fighter.',
            { p2: '51:09' },
          ),
        ),
        roleTank: rated(
          0.3,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Can tank for a while in small groups, since a talent raises its threat while Rockbiter Weapon is in use (Spirit Weapons), but is not a full tank spec.',
          ),
        ),
        selfHeal: rated(
          0.75,
          confirmed(['p2'], 'Can heal itself, as hybrids can thanks to their mana bar.', { p2: '18:01' }),
        ),
        singleTarget: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement', 'p2'],
            'Hits one target with Stormstrike every 8 sec and instant Lightning Bolts (Maelstrom Weapon). Its damage is competitive, as guides also expect, though about 5% lower as a hybrid.',
            { p2: '22:18' },
          ),
        ),
        soloLeveling: rated(
          0.75,
          community(
            ['wowhead-guide-shaman-enhancement'],
            '"A very strong leveling spec" that relies on weapon attacks without spending much mana.',
          ),
        ),
        tabTargetTank: rated(
          0,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Can serve as a temporary tank in small groups, but has no tank specialization.',
          ),
        ),
        threatControl: rated(
          0.55,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
            'Causes less threat: a deep Enhancement talent lowers generated threat by 30% while Rockbiter Weapon is not in use (Spirit Weapons).',
          ),
        ),
        autoAttack: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'p2'],
            'Fights with auto attacks from a two-handed weapon: every melee attack can build charges (Maelstrom Weapon), a cooldown raises attack speed (Rage of the Farseer), and the developers mix in only a little spellcasting that does not interfere with auto attacks.',
            { p2: '51:45' },
          ),
        ),
      },
    },
    'shaman-restoration': {
      name: 'Restoration',
      traits: {
        soloEndgame: rated(
          0.25,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
            'Among the sturdiest classes thanks to mail and a shield, but lacks effective crowd control. Restoration survives through its heals but deals very little damage; guides say a slowing shock can kite a strong melee elite until it dies (Frost Shock), but that is the exception.',
          ),
        ),
        weaponCaster: rated(
          0.9,
          confirmed(
            ['deep-dive-mage-shaman', 'deep-dive-panel'],
            'Restoration heals with spells such as Riptide and Chain Heal, and spellcaster weapons grant healing; it usually heals with a one-hander and shield instead of a staff.',
          ),
        ),
        healHot: rated(
          0.5,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration'],
            'Heals over time with an instant heal that keeps healing (Riptide, 6 sec cooldown) and a totem that heals nearby party members (Healing Stream Totem). Guides count a heal over time on a short cooldown among the three heals Restoration needs.',
          ),
        ),
        healDirect: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration'],
            'Heals single targets with Healing Wave, which a talent strengthens (Healing Way), and Riptide heals the target instantly; guides describe a toolkit of one main single-target heal beside one area heal and one heal over time.',
          ),
        ),
        healGroup: rated(
          0.95,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
            "Heals parties and raids with a heal that jumps between allies (Chain Heal), one of the Shaman's unique chaining spells; Riptide makes Chain Heal 25% more effective on its target, and a totem heals nearby party members (Healing Stream Totem).",
          ),
        ),
        healAbsorb: rated(
          0.05,
          estimate(
            'Has no shield or absorb for allies; Water Shield, a Restoration talent, grants mana only to the Shaman. A talent may give the targets of critical heals some armor, a light form of prevention (Ancestral Healing).',
          ),
        ),
        slow: rated(
          0.6,
          community(
            ['wowhead-guide-shaman-restoration-abilities'],
            "Can slow enemies with a shock and a totem (Frost Shock, Earthbind Totem): the shock mainly to avoid damage or escape, the totem when escaping or kiting. Restoration's talents add no root and no cheaper shocks.",
          ),
        ),
        dungeonUtility: rated(
          0.75,
          confirmed(
            ['dn', 'wowhead-guide-shaman-restoration-abilities'],
            'Can resurrect the dead (Ancestral Spirit) and remove poisons and diseases, also with cleansing totems that cure nearby party members for 5 min (Disease Cleansing Totem), but cannot remove curses. As the healer, Restoration keeps these cures up in the fight.',
          ),
        ),
        escape: rated(
          0.4,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
            'Its travel form works only outdoors and with a cast time (Ghost Wolf), since the talent that changes this sits in the Enhancement tree (Improved Ghost Wolf); a shock slows enemies for an escape (Frost Shock).',
          ),
        ),
        eliteSolo: rated(
          0.35,
          estimate(
            'Sturdy with mail and a shield, and a slowing shock can kite a melee elite (Frost Shock), but as a healer Restoration deals little damage, so a kited elite takes long to die, and without effective crowd control few ways out remain.',
          ),
        ),
        themeElements: rated(
          0.8,
          confirmed(
            ['hero'],
            'Shamans are in direct contact with the elements; Restoration heals and leans a little more toward nature.',
          ),
        ),
        aoe: rated(
          0.3,
          confirmed(
            ['p2'],
            'A healer spec whose only area damage comes from Fire Nova and Chain Lightning; according to the developers, Shamans manage only a little cleave damage by burning mana on them.',
            { p2: '25:18' },
          ),
        ),
        burst: rated(0.1, estimate('Healer spec with few damage spikes.')),
        cc: rated(0.2, confirmed(['deep-dive-mage-shaman'], 'Shamans lack effective crowd control.')),
        defAbsorb: rated(
          0.2,
          confirmed(
            ['dn'],
            'Has hardly any shields or immunities, only a totem that redirects a spell (Grounding Totem).',
          ),
        ),
        defKite: rated(
          0.3,
          classic('Can slow enemies to keep them away with a shock and a totem (Frost Shock, Earthbind Totem).'),
        ),
        defStand: rated(0.5, confirmed(['deep-dive-mage-shaman'], 'Mail armor and a shield make Shamans sturdy.')),
        dotDamage: rated(0.3, classic('Has a single DoT (Flame Shock).')),
        gearDependency: rated(
          0.3,
          community(
            ['wowhead-guide-shaman-restoration', 'deep-dive-mage-shaman'],
            'Has a strong baseline toolkit before set bonuses, and its mana leans less on gear: a self-buff grants mana when an attack hits the Shaman or one of its heals lands a critical strike (Water Shield).',
          ),
        ),
        groupDemand: rated(
          0.95,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-enhancement'],
            'Always welcome: a healer with raid-wide totems, and guides expect the class to be very high in demand for every raid.',
          ),
        ),
        hybridTax: rated(
          0,
          confirmed(['p2'], 'Restoration is a healer spec, so the damage cost of hybrid damage specs does not apply.', {
            p2: '22:18',
          }),
        ),
        levelingDowntime: rated(
          0.65,
          confirmed(
            ['deep-dive-mage-shaman', 'dn'],
            'Fights last long and cost mana, since as a healer Restoration deals little damage and spends mana on Lightning Bolt; a self-buff grants mana when an attack hits the Shaman and on any critical spell (Water Shield).',
          ),
        ),
        procs: rated(
          0.25,
          confirmed(
            ['dn'],
            'Few procs to react to: a self-buff grants mana on any critical spell, a passive effect (Water Shield), and heals answer incoming damage, not procs.',
          ),
        ),
        pvpBattleground: rated(
          0.85,
          estimate(
            'A sturdy healer with mail and a shield that heals across the group (Chain Heal) and can redirect a spell with a totem (Grounding Totem), but has little crowd control.',
          ),
        ),
        pvpWorld: rated(0.5, estimate('Tough, but deals little damage.')),
        range: rated(
          0.75,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration-abilities'],
            'Heals at range, but its totems have to reach the whole party, which keeps the Shaman nearer the group; a spell moves all totems to a new spot within 30 yards, so they need not be placed up close (Totemic Projection).',
          ),
        ),
        rangeWeave: rated(
          0,
          confirmed(
            ['deep-dive-mage-shaman', 'wowhead-guide-shaman-restoration'],
            'Heals from a fixed range, and placing totems needs no run into place: a spell moves them up to 30 yards (Totemic Projection).',
          ),
        ),
        roleHealer: rated(
          1,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Heals groups and raids, with a heal that jumps between allies (Chain Heal).',
          ),
        ),
        roleMeleeDps: rated(0, classic('Healer spec without a melee role.')),
        roleRangedDps: rated(0, classic('Healer spec without a ranged role.')),
        roleTank: rated(0, classic('Not a tank.')),
        selfHeal: rated(
          1,
          confirmed(
            ['deep-dive-mage-shaman'],
            'Can use its full healing spells on itself too, plus an instant heal with a heal over time (Riptide).',
          ),
        ),
        singleTarget: rated(0.25, estimate('Healer spec with little damage.')),
        soloLeveling: rated(
          0.25,
          community(
            ['wowhead-guide-shaman-restoration', 'p2', 'deep-dive-mage-shaman'],
            'Sturdy with mail and a shield, and Lightning Bolt casts in 2.5 sec from rank 4, which the developers say helps Restoration while leveling; but as a healer it deals little damage, and guides recommend leveling as a healer only when always playing in a group.',
            { p2: '1:13:44' },
          ),
        ),
        threatControl: rated(
          0.5,
          confirmed(
            ['deep-dive-mage-shaman'],
            'A talent in its own tree lowers the threat of all spells (Natural Grace).',
          ),
        ),
        autoAttack: rated(0.05, estimate('Healing comes from spells; weapon swings play almost no part.')),
      },
    },
  },
} satisfies ClassSpecs<'shaman'>;
