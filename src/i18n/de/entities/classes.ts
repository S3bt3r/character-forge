import type { ClassKey } from '../../../data/ids';

/** Name, resources and description per class. */
export const CLASS_TEXTS = {
  warrior: {
    name: 'Krieger',
    resources: 'Wut',
    summary:
      'Ein Meister des Nahkampfs, der mehreren Gegnern nebeneinander Schaden zufügt (Cleave), und ein gefragter Tank. Wenig Eigenheilung und stark von der Ausrüstung abhängig, bringt aber einzigartige Buffs und Debuffs mit.',
  },
  paladin: {
    name: 'Paladin',
    resources: 'Mana',
    summary:
      'Ein robuster Plattenträger mit Heilung, Segen (Buffs) und einer kurzen Unverwundbarkeit. Hat keine Unterbrechung und kann Gegner nicht verlangsamen. Neu: Paladine der Verlassenen (Horde).',
  },
  hunter: {
    name: 'Jäger',
    resources: 'Mana',
    summary:
      'Hat die größte Reichweite aller Klassen, und der Begleiter kann beim Solo-Spiel tanken. Hat keine Betäubung und keine Unterbrechung. Fernkampfangriffe sind auf unter 8 m Abstand nicht nutzbar; nur die Spezialisierung Überleben kämpft im Nahkampf.',
  },
  rogue: {
    name: 'Schurke',
    resources: 'Energie & Combopunkte',
    summary:
      'Kann den höchsten Nahkampfschaden gegen ein einzelnes Ziel verursachen, da er als reine Schadensklasse keinen Schaden für andere Rollen abgibt. Keine Eigenheilung und wenige Gruppen-Buffs, aber dank Verstohlenheit (Stealth) und viel Kontrolle in jeder Gruppe gern gesehen.',
  },
  priest: {
    name: 'Priester',
    resources: 'Mana',
    summary:
      'Der vielseitigste Heiler (Heilung über Zeit, Direktheilung, Schilde) oder ein Schadensverursacher mit Schattenschaden, der sich selbst heilt. Trägt Stoffrüstung und hat wenig Fluchtmöglichkeiten.',
  },
  shaman: {
    name: 'Schamane',
    resources: 'Mana',
    summary:
      'Stellt Totems (Objekte mit Wirkung im Umkreis) mit raidweiten Buffs auf; heilt oder verursacht Schaden mit Zaubern, die von Ziel zu Ziel springen. Kaum CC. Neu: Zwergen-Schamanen (Allianz).',
  },
  mage: {
    name: 'Magier',
    resources: 'Mana',
    summary:
      'Ein Meister des Flächenschadens (AoE) aus der Ferne mit starker Kontrolle; versorgt die Gruppe außerdem mit Essen, Wasser und Portalen. Extrem verwundbar, sobald Gegner im Nahkampf stehen. Frost bietet die meiste Kontrolle. Neu: Orc-Magier (Horde).',
  },
  warlock: {
    name: 'Hexenmeister',
    resources: 'Mana & Seelensplitter',
    summary:
      'Kämpft mit Flüchen, Lebensentzug und Dämonen als Begleitern. Kann Mitspieler zu sich holen (Summon), was besonders wertvoll ist, weil die Treffpunkt-Steine an Dungeons in Forever nicht funktionieren. Muss Seelensplitter sammeln (eine Ressource aus besiegten Gegnern).',
  },
  druid: {
    name: 'Druide',
    resources: 'Mana, Wut (Bär), Energie (Katze)',
    summary:
      'Kann alle vier Rollen übernehmen. Hat keine Unterbrechung, keine Stille und keine Verlangsamung; als Heiler auf Heilung über Zeit (HoTs) angewiesen.',
  },
} satisfies Record<ClassKey, { name: string; resources: string; summary: string }>;
