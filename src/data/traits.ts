import { TRAIT_TEXTS as DE } from '../i18n/de/entities/traits';
import { traitCatalog, type TraitTexts } from './localize';

/**
 * Spec and race trait catalogs: the dimensions along which questions and specs or races are compared
 * (profession traits: `professions.ts`, Legacy traits: `legacy.ts`). All values lie in [0, 1]. Add new
 * traits here; the compiler then enforces values in all profiles as well as a German name and scale in
 * `src/i18n/de/entities/traits.ts`.
 */
const SPEC_TRAIT_TEXTS = {
  roleTank: { label: 'Tank', scale: "0 = can't tank, 1 = main tank" },
  roleHealer: { label: 'Healer', scale: '0 = no healing, 1 = main healer' },
  roleMeleeDps: { label: 'Melee damage', scale: '0 = never, 1 = core role' },
  roleRangedDps: { label: 'Ranged damage', scale: '0 = never, 1 = core role' },
  resMana: { label: 'Mana', scale: '0 = not used, 1 = main resource (several resources possible)' },
  resRage: { label: 'Rage', scale: '0 = not used, 1 = main resource (several resources possible)' },
  resEnergy: { label: 'Energy', scale: '0 = not used, 1 = main resource (several resources possible)' },
  selfHeal: { label: 'Self-healing', scale: '0 = none, 1 = full healing spells' },
  interrupt: { label: 'Interrupt (kick)', scale: '0 = none, 1 = reliably available' },
  stun: { label: 'Stun', scale: '0 = none, 1 = several reliable ones' },
  cc: { label: 'Crowd control (CC)', scale: '0 = none, 1 = outstanding' },
  escape: { label: 'Mobility & escape', scale: '0 = hardly any, 1 = lots of escape tools' },
  pet: { label: 'Pet', scale: '0 = none, 1 = central to the play style' },
  stealth: { label: 'Stealth', scale: '0 = none, 1 = core of the play style' },
  shapeshift: { label: 'Shapeshifting', scale: '0 = none, 1 = core of the play style' },
  range: { label: 'Combat range', scale: '0 = melee, 1 = maximum range' },
  armor: { label: 'Armor type', scale: '0 = cloth, 1 = plate' },
  levelingDowntime: {
    label: 'Downtime while leveling',
    scale: '0 = hardly any eating/drinking, 1 = after almost every fight',
  },
  soloLeveling: { label: 'Solo leveling', scale: '0 = tough, 1 = fast and safe' },
  soloEndgame: {
    label: 'Playing alone at level 60',
    scale: '0 = depends on a group, 1 = thrives alone (farming, open world, elites)',
  },
  groupDemand: { label: 'Demand in groups', scale: '0 = hard to find groups, 1 = sought after' },
  raidUtility: {
    label: 'Raid utility',
    scale: '0 = no buffs or debuffs for the group, 1 = several unique raid-wide buffs or debuffs',
  },
  services: { label: 'Group services', scale: '0 = none, 1 = summons or supplies the group' },
  dungeonUtility: { label: 'Dungeon utility', scale: 'Removing disease/poison/curse, resurrecting' },
  pvpBattleground: { label: 'Battleground strength', scale: '0 = weak, 1 = very strong' },
  pvpWorld: { label: 'World PvP & duels', scale: '0 = weak, 1 = very strong' },
  complexity: { label: 'Complexity', scale: '0 = few buttons, 1 = demanding' },
  gearDependency: { label: 'Gear dependency', scale: '0 = low, 1 = high' },
  burst: { label: 'Burst damage', scale: '0 = low, 1 = very high' },
  aoe: { label: 'AoE damage', scale: '0 = low, 1 = very high' },
  singleTarget: { label: 'Single-target damage', scale: '0 = low, 1 = very high' },
  survivability: { label: 'Survivability', scale: '0 = fragile, 1 = very sturdy' },
  hybridFlex: {
    label: 'Role flexibility',
    scale: '0 = one role, 1 = tank, healer and damage within the class, switched with Dual Specialization',
  },
  reagentDependency: { label: 'Reagents & ammo', scale: '0 = none, 1 = constantly needed' },
  deadZone: { label: 'Dead zone', scale: '0 = none, 1 = marked weakness at close range' },
  slow: { label: 'Slows', scale: '0 = none, 1 = reliable and frequent' },
  totems: { label: 'Totems', scale: '0 = none, 1 = core of the play style' },
  dotDamage: { label: 'Damage over time', scale: '0 = none, 1 = core of the play style' },
  autoAttack: { label: 'Weapon swings', scale: '0 = spells, 1 = damage from weapon swings/auto attack' },
  procs: { label: 'Random triggers (procs)', scale: '0 = predictable, 1 = reacting to procs' },
  execute: { label: 'Bonus damage below 20–35%', scale: '0 = none, 1 = strong bonus damage against weakened enemies' },
  healingReduction: { label: 'Healing reduction', scale: '0 = none, 1 = reliable' },
  apm: {
    label: 'Input pace',
    scale: '0 = few inputs per minute (long casts, slow swings), 1 = an input or reaction almost every global cooldown',
  },
  positional: { label: 'Positioning', scale: "0 = doesn't matter, 1 = often has to stand behind the target" },
  groundZones: { label: 'Ground effects & traps', scale: '0 = none, 1 = lots of placing' },
  rangeWeave: { label: 'Switching melee/ranged', scale: '0 = fixed range, 1 = constant switching' },
  petControl: { label: 'Controlling a pet', scale: '0 = no pet or passive pet, 1 = active control' },
  defStand: { label: 'Defense: armor', scale: 'Armor, block, lots of health' },
  defAbsorb: { label: 'Defense: shields & immunity', scale: 'Barriers, dodge, immunity' },
  defKite: { label: 'Defense: keeping distance', scale: 'Freezing, roots, slows' },
  combatReset: { label: 'Resetting combat', scale: 'Vanish, Feign Death, Ice Block' },
  eliteSolo: { label: 'Elite enemies solo', scale: '0 = hardly possible, 1 = specialty' },
  threatControl: { label: 'Lowering threat', scale: '0 = no tools, 1 = very aggro-safe' },
  selfCleanse: { label: 'Cleansing', scale: 'Removing magic/poison/disease/curse' },
  hybridTax: { label: 'Hybrid tax', scale: '1 = hybrid damage spec with ~5% less damage' },
  tabTargetTank: {
    label: 'Multi-target tanking by switching targets',
    scale: '0 = AoE threat, 1 = lots of tab-targeting',
  },
  themeLight: { label: 'Theme: Light', scale: '0 = distant, 1 = core' },
  themeShadow: { label: 'Theme: shadow', scale: '0 = distant, 1 = core' },
  themeNature: { label: 'Theme: nature', scale: '0 = distant, 1 = core' },
  themeArcane: { label: 'Theme: arcane', scale: '0 = distant, 1 = core' },
  themeFel: { label: 'Theme: demons', scale: '0 = distant, 1 = core' },
  themeMartial: { label: 'Theme: weapon mastery', scale: '0 = distant, 1 = core' },
  themeElements: { label: 'Theme: elements', scale: '0 = distant, 1 = core' },
  healAbsorb: { label: 'Healing: shields & prevention', scale: "0 = doesn't heal this way, 1 = core of its healing" },
  healGroup: { label: 'Healing: group heals', scale: "0 = doesn't heal this way, 1 = core of its healing" },
  healDirect: { label: 'Healing: big direct heals', scale: "0 = doesn't heal this way, 1 = core of its healing" },
  healHot: { label: 'Healing: heals over time', scale: "0 = doesn't heal this way, 1 = core of its healing" },
  weaponTwoHand: { label: 'Weapon: two-handed', scale: "0 = doesn't fight this way, 1 = core of how it fights" },
  weaponDual: { label: 'Weapon: two weapons', scale: "0 = doesn't fight this way, 1 = core of how it fights" },
  weaponShield: { label: 'Weapon: weapon and shield', scale: "0 = doesn't fight this way, 1 = core of how it fights" },
  weaponRanged: { label: 'Weapon: bow or gun', scale: "0 = doesn't fight this way, 1 = core of how it fights" },
  weaponCaster: { label: 'Weapon: staff and spells', scale: "0 = doesn't fight this way, 1 = core of how it fights" },
} satisfies Record<string, TraitTexts>;

const RACE_TRAIT_TEXTS = {
  racialPvp: { label: 'PvP racial abilities', scale: '0 = little use, 1 = very strong' },
  racialPve: { label: 'PvE racial abilities', scale: '0 = little use, 1 = very strong' },
  stunEscape: { label: 'Protection from stuns/roots', scale: '0 = none, 1 = active break-free' },
  fearEscape: { label: 'Protection from fear', scale: '0 = none, 1 = active break-free' },
  selfCleanse: { label: 'Self-cleansing', scale: 'Removing poisons/diseases/bleeds' },
  size: { label: 'Body size', scale: '0 = small, 1 = large' },
  aesthetic: { label: 'Looks', scale: '0 = rugged/grim, 1 = elegant' },
  novelty: { label: 'Novelty', scale: '0 = long familiar, 1 = new in Forever' },
  themeLight: { label: 'Culture: Light & faith', scale: '0 = distant, 1 = core' },
  themeShadow: { label: 'Culture: death & shadow', scale: '0 = distant, 1 = core' },
  themeNature: { label: 'Culture: nature & spirits', scale: '0 = distant, 1 = core' },
  themeArcane: { label: 'Culture: magic & scholarship', scale: '0 = distant, 1 = core' },
  themeHonor: { label: 'Culture: honor & war', scale: '0 = distant, 1 = core' },
  themeTech: { label: 'Culture: technology', scale: '0 = distant, 1 = core' },
} satisfies Record<string, TraitTexts>;

export type SpecTraitId = keyof typeof SPEC_TRAIT_TEXTS;
export type RaceTraitId = keyof typeof RACE_TRAIT_TEXTS;
export const SPEC_TRAITS = traitCatalog(SPEC_TRAIT_TEXTS, DE.spec);
export const RACE_TRAITS = traitCatalog(RACE_TRAIT_TEXTS, DE.race);
