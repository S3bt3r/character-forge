import type { LegacyTraitId } from '../../../data/legacy';
import type { TraitTexts } from '../../../data/localize';
import type { ProfessionTraitId } from '../../../data/professions';
import type { RaceTraitId, SpecTraitId } from '../../../data/traits';

/** Name and scale per trait of the specs, races, professions and perks. */
export const TRAIT_TEXTS = {
  spec: {
    roleTank: {
      label: 'Tank',
      scale: '0 = kann nicht tanken, 1 = Haupt-Tank',
    },
    roleHealer: {
      label: 'Heiler',
      scale: '0 = keine Heilung, 1 = Haupt-Heiler',
    },
    roleMeleeDps: {
      label: 'Nahkampf-Schaden',
      scale: '0 = nie, 1 = Kernaufgabe',
    },
    roleRangedDps: {
      label: 'Fernkampf-Schaden',
      scale: '0 = nie, 1 = Kernaufgabe',
    },
    resMana: {
      label: 'Mana',
      scale: '0 = nicht genutzt, 1 = Hauptressource (mehrere Ressourcen möglich)',
    },
    resRage: {
      label: 'Wut',
      scale: '0 = nicht genutzt, 1 = Hauptressource (mehrere Ressourcen möglich)',
    },
    resEnergy: {
      label: 'Energie',
      scale: '0 = nicht genutzt, 1 = Hauptressource (mehrere Ressourcen möglich)',
    },
    selfHeal: {
      label: 'Eigenheilung',
      scale: '0 = keine, 1 = volle Heilzauber',
    },
    interrupt: {
      label: 'Unterbrechung (Kick)',
      scale: '0 = keine, 1 = zuverlässig verfügbar',
    },
    stun: {
      label: 'Betäubung (Stun)',
      scale: '0 = keine, 1 = mehrere zuverlässige',
    },
    cc: {
      label: 'Kontrolle (CC)',
      scale: '0 = keine, 1 = herausragend',
    },
    escape: {
      label: 'Mobilität & Flucht',
      scale: '0 = kaum, 1 = sehr viele Fluchtwerkzeuge',
    },
    pet: {
      label: 'Begleiter',
      scale: '0 = keiner, 1 = zentral für die Spielweise',
    },
    stealth: {
      label: 'Verstohlenheit',
      scale: '0 = keine, 1 = Kern der Spielweise',
    },
    shapeshift: {
      label: 'Gestaltwandel',
      scale: '0 = keiner, 1 = Kern der Spielweise',
    },
    range: {
      label: 'Kampfdistanz',
      scale: '0 = Nahkampf, 1 = maximale Reichweite',
    },
    armor: {
      label: 'Rüstungsklasse',
      scale: '0 = Stoff, 1 = Platte',
    },
    levelingDowntime: {
      label: 'Pausen beim Leveln',
      scale: '0 = kaum Essen/Trinken, 1 = nach fast jedem Kampf',
    },
    soloLeveling: {
      label: 'Solo-Leveln',
      scale: '0 = mühsam, 1 = schnell und sicher',
    },
    soloEndgame: {
      label: 'Allein auf Stufe 60',
      scale: '0 = braucht eine Gruppe, 1 = kommt allein bestens zurecht (Farmen, offene Welt, Elitegegner)',
    },
    groupDemand: {
      label: 'Gefragt in Gruppen',
      scale: '0 = schwer Gruppen zu finden, 1 = wird gesucht',
    },
    raidUtility: {
      label: 'Raid-Nutzen',
      scale: '0 = keine Buffs oder Debuffs für die Gruppe, 1 = mehrere einzigartige raidweite Buffs oder Debuffs',
    },
    services: {
      label: 'Gruppendienste',
      scale: '0 = keine, 1 = summont oder versorgt die Gruppe',
    },
    dungeonUtility: {
      label: 'Dungeon-Nutzen',
      scale: 'Krankheit/Gift/Fluch entfernen, Wiederbeleben',
    },
    pvpBattleground: {
      label: 'Battleground-Stärke',
      scale: '0 = schwach, 1 = sehr stark',
    },
    pvpWorld: {
      label: 'Welt-PvP & Duelle',
      scale: '0 = schwach, 1 = sehr stark',
    },
    complexity: {
      label: 'Komplexität',
      scale: '0 = wenige Tasten, 1 = anspruchsvoll',
    },
    gearDependency: {
      label: 'Ausrüstungsabhängigkeit',
      scale: '0 = gering, 1 = stark',
    },
    burst: {
      label: 'Burst-Schaden',
      scale: '0 = gering, 1 = sehr hoch',
    },
    aoe: {
      label: 'Flächenschaden',
      scale: '0 = gering, 1 = sehr hoch',
    },
    singleTarget: {
      label: 'Einzelziel-Schaden',
      scale: '0 = gering, 1 = sehr hoch',
    },
    survivability: {
      label: 'Robustheit',
      scale: '0 = zerbrechlich, 1 = sehr robust',
    },
    hybridFlex: {
      label: 'Rollenflexibilität',
      scale:
        '0 = eine Rolle, 1 = Tank, Heiler und Schaden innerhalb der Klasse, gewechselt über die Funktion Duale Spezialisierung',
    },
    reagentDependency: {
      label: 'Reagenzien & Munition',
      scale: '0 = keine, 1 = ständig nötig',
    },
    deadZone: {
      label: 'Tote Zone',
      scale: '0 = keine, 1 = ausgeprägte Schwäche auf kurze Distanz',
    },
    slow: {
      label: 'Verlangsamung',
      scale: '0 = keine, 1 = zuverlässig und oft',
    },
    totems: {
      label: 'Totems',
      scale: '0 = keine, 1 = Kern der Spielweise',
    },
    dotDamage: {
      label: 'Schaden über Zeit',
      scale: '0 = keiner, 1 = Kern der Spielweise',
    },
    autoAttack: {
      label: 'Waffenschläge',
      scale: '0 = Zauber, 1 = Schaden über Waffenschwünge/Autoangriff',
    },
    procs: {
      label: 'Zufallsauslöser (Procs)',
      scale: '0 = planbar, 1 = auf Procs reagieren',
    },
    execute: {
      label: 'Bonusschaden unter 20–35 %',
      scale: '0 = keiner, 1 = starker Bonusschaden gegen angeschlagene Gegner',
    },
    healingReduction: {
      label: 'Heilungsreduktion',
      scale: '0 = keine, 1 = zuverlässig',
    },
    apm: {
      label: 'Eingabetempo',
      scale:
        '0 = wenige Eingaben pro Minute (lange Zauber, langsame Schläge), 1 = fast in jeder globalen Abklingzeit eine Eingabe oder Reaktion',
    },
    positional: {
      label: 'Positionierung',
      scale: '0 = egal, 1 = muss oft hinter dem Ziel stehen',
    },
    groundZones: {
      label: 'Bodeneffekte & Fallen',
      scale: '0 = keine, 1 = viel Platzieren',
    },
    rangeWeave: {
      label: 'Wechsel Nah-/Fernkampf',
      scale: '0 = feste Distanz, 1 = ständiger Wechsel',
    },
    petControl: {
      label: 'Begleiter steuern',
      scale: '0 = kein/passiver Begleiter, 1 = aktive Steuerung',
    },
    defStand: {
      label: 'Verteidigung: Panzerung',
      scale: 'Rüstung, Block, viel Leben',
    },
    defAbsorb: {
      label: 'Verteidigung: Schilde & Immunität',
      scale: 'Barrieren, Ausweichen, Immunität',
    },
    defKite: {
      label: 'Verteidigung: Distanz halten',
      scale: 'Einfrieren, Wurzeln, Verlangsamen',
    },
    combatReset: {
      label: 'Kampf zurücksetzen',
      scale: 'Verschwinden, Totstellen, Eisblock',
    },
    eliteSolo: {
      label: 'Elite-Gegner solo',
      scale: '0 = kaum möglich, 1 = Spezialität',
    },
    threatControl: {
      label: 'Bedrohung senken',
      scale: '0 = keine Werkzeuge, 1 = sehr aggro-sicher',
    },
    selfCleanse: {
      label: 'Reinigen',
      scale: 'Magie/Gift/Krankheit/Fluch entfernen',
    },
    hybridTax: {
      label: 'Hybrid-Steuer',
      scale: '1 = Hybrid-Schadens-Spec mit ~5 % weniger Schaden',
    },
    tabTargetTank: {
      label: 'Mehrziel-Tanking per Ziel-Wechsel',
      scale: '0 = Flächen-Bedrohung, 1 = viel Tab-Targeting',
    },
    themeLight: {
      label: 'Thema: Licht',
      scale: '0 = fern, 1 = Kern',
    },
    themeShadow: {
      label: 'Thema: Schatten',
      scale: '0 = fern, 1 = Kern',
    },
    themeNature: {
      label: 'Thema: Natur',
      scale: '0 = fern, 1 = Kern',
    },
    themeArcane: {
      label: 'Thema: Arkan',
      scale: '0 = fern, 1 = Kern',
    },
    themeFel: {
      label: 'Thema: Dämonen',
      scale: '0 = fern, 1 = Kern',
    },
    themeMartial: {
      label: 'Thema: Waffenkunst',
      scale: '0 = fern, 1 = Kern',
    },
    themeElements: {
      label: 'Thema: Elemente',
      scale: '0 = fern, 1 = Kern',
    },
    healAbsorb: {
      label: 'Heilung: Schilde und Vorbeugen',
      scale: '0 = heilt nicht so, 1 = Kern seiner Heilung',
    },
    healGroup: {
      label: 'Heilung: Gruppenheilung',
      scale: '0 = heilt nicht so, 1 = Kern seiner Heilung',
    },
    healDirect: {
      label: 'Heilung: große Direktheilungen',
      scale: '0 = heilt nicht so, 1 = Kern seiner Heilung',
    },
    healHot: {
      label: 'Heilung: Heilung über Zeit',
      scale: '0 = heilt nicht so, 1 = Kern seiner Heilung',
    },
    weaponTwoHand: {
      label: 'Waffe: Zweihandwaffe',
      scale: '0 = kämpft nicht so, 1 = Kern seiner Kampfweise',
    },
    weaponDual: {
      label: 'Waffe: zwei Waffen',
      scale: '0 = kämpft nicht so, 1 = Kern seiner Kampfweise',
    },
    weaponShield: {
      label: 'Waffe: Waffe und Schild',
      scale: '0 = kämpft nicht so, 1 = Kern seiner Kampfweise',
    },
    weaponRanged: {
      label: 'Waffe: Bogen oder Gewehr',
      scale: '0 = kämpft nicht so, 1 = Kern seiner Kampfweise',
    },
    weaponCaster: {
      label: 'Waffe: Stab und Zauber',
      scale: '0 = kämpft nicht so, 1 = Kern seiner Kampfweise',
    },
  },
  race: {
    racialPvp: {
      label: 'PvP-Volksfähigkeiten',
      scale: '0 = kaum Nutzen, 1 = sehr stark',
    },
    racialPve: {
      label: 'PvE-Volksfähigkeiten',
      scale: '0 = kaum Nutzen, 1 = sehr stark',
    },
    stunEscape: {
      label: 'Schutz vor Betäubung/Bewegungsunfähigkeit',
      scale: '0 = keiner, 1 = aktive Befreiung',
    },
    fearEscape: {
      label: 'Schutz vor Furcht',
      scale: '0 = keiner, 1 = aktive Befreiung',
    },
    selfCleanse: {
      label: 'Selbstreinigung',
      scale: 'Gifte/Krankheiten/Blutungen entfernen',
    },
    size: {
      label: 'Körpergröße',
      scale: '0 = klein, 1 = groß',
    },
    aesthetic: {
      label: 'Optik',
      scale: '0 = rau/düster, 1 = elegant',
    },
    novelty: {
      label: 'Neuheit',
      scale: '0 = altbekannt, 1 = neu in Forever',
    },
    themeLight: {
      label: 'Kultur: Licht & Glaube',
      scale: '0 = fern, 1 = Kern',
    },
    themeShadow: {
      label: 'Kultur: Tod & Schatten',
      scale: '0 = fern, 1 = Kern',
    },
    themeNature: {
      label: 'Kultur: Natur & Geister',
      scale: '0 = fern, 1 = Kern',
    },
    themeArcane: {
      label: 'Kultur: Magie & Gelehrsamkeit',
      scale: '0 = fern, 1 = Kern',
    },
    themeHonor: {
      label: 'Kultur: Ehre & Krieg',
      scale: '0 = fern, 1 = Kern',
    },
    themeTech: {
      label: 'Kultur: Technik',
      scale: '0 = fern, 1 = Kern',
    },
  },
  profession: {
    timeCost: {
      label: 'Zeitaufwand',
      scale: '0 = nebenbei, 1 = sehr zeitintensiv',
    },
    goldCost: {
      label: 'Kosten beim Skillen',
      scale: '0 = kostenlos, 1 = sehr teuer',
    },
    goldIncome: {
      label: 'Gold-Ertrag',
      scale: '0 = kaum, 1 = sehr lukrativ',
    },
    pvpValue: {
      label: 'PvP-Nutzen',
      scale: '0 = keiner, 1 = sehr hoch',
    },
    pveValue: {
      label: 'Raid-/Dungeon-Nutzen',
      scale: '0 = keiner, 1 = sehr hoch',
    },
    levelingValue: {
      label: 'Nutzen beim Leveln',
      scale: '0 = keiner, 1 = sehr hoch',
    },
    campsiteValue: {
      label: 'Beitrag zu Lagern',
      scale: '0 = keiner, 1 = gefragte Lagerobjekte',
    },
    auctionHouse: {
      label: 'Auktionshaus-Handel',
      scale: '0 = unnötig, 1 = lebt vom Handel',
    },
    exploration: {
      label: 'Welt erkunden',
      scale: '0 = stationär, 1 = Rezepte/Material in der Welt jagen',
    },
  },
  legacy: {
    leveling: {
      label: 'Schneller leveln',
      scale: '0 = kein Bezug, 1 = beschleunigt das Leveln deutlich',
    },
    crafting: {
      label: 'Berufe skillen',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
    gold: {
      label: 'Gold sparen/verdienen',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
    pvp: {
      label: 'PvP',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
    group: {
      label: 'Gruppe & Raid',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
    convenience: {
      label: 'Komfort & Reisen',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
    reputation: {
      label: 'Ruf',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
    campsite: {
      label: 'Lager',
      scale: '0 = kein Bezug, 1 = Kern des Perks',
    },
  },
} satisfies {
  spec: Record<SpecTraitId, TraitTexts>;
  race: Record<RaceTraitId, TraitTexts>;
  profession: Record<ProfessionTraitId, TraitTexts>;
  legacy: Record<LegacyTraitId, TraitTexts>;
};
