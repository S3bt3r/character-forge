import type { GermanEntityTexts } from '../../../data/localize';
import type { ProfessionEntry } from '../../../data/professions';

/** Name, description and provenance notes per profession. */
export const PROFESSION_TEXTS = {
  herbalism: {
    name: 'Kräuterkunde',
    summary: 'Kräuter sammeln, nebenbei beim Questen, guter Gold-Ertrag; Räucherkerze fürs Lager.',
    evidence: {
      goldCost: 'Kräuterkunde braucht kein Werkzeug.',
      goldIncome:
        'Eine sehr gute Wahl zum Goldverdienen, besonders beim Leveln: Kräuter erzielen im Auktionshaus immer gute Preise, weil so viele gängige Rezepte sie nutzen.',
      pvpValue: 'Kräuterkundige stellen nur Lagerobjekte her, keine Kampfgegenstände.',
      pveValue:
        'Kräuterkundige stellen nur Lagerobjekte her, keine Kampfgegenstände; ihre Lager-Buffs können einer Gruppe vor einem Dungeon oder Raid helfen, im PvP zählt das kaum.',
      campsiteValue: 'Räucherkerze (Intelligenz) als Lagerobjekt.',
      auctionHouse: 'Kräuter erzielen im Auktionshaus immer gute Preise.',
      exploration: 'Jedes Kraut wächst nur in bestimmten Gebieten und Umgebungen.',
    },
  },
  mining: {
    name: 'Bergbau',
    summary: 'Erz abbauen: Grundlage für Schmiede und Ingenieure, solider Gold-Ertrag.',
    evidence: {
      timeCost:
        'Erzvorkommen gibt es so viele, dass Bergbau mit dem Level mithält. Verhütten bringt Skill bis 185, aber zwischen 140 und 155 bringt kein Barren Skill, daher braucht es dort den Abbau von Erz.',
      goldCost: 'Keine Anfangsinvestition; nötig ist nur eine Spitzhacke vom Händler.',
      goldIncome:
        'Eine ausgezeichnete Goldquelle ohne Anfangsinvestition: Die Materialien gehen in Rezepte mehrerer Herstellungsberufe und lassen sich im Auktionshaus leicht verkaufen.',
      pvpValue: 'Bergbau stellt nur Barren und Lagerobjekte her, keine Kampfgegenstände.',
      pveValue:
        'Bergbau stellt nur Barren und Lagerobjekte her, keine Kampfgegenstände; seine Lager-Buffs können einer Gruppe vor einem Dungeon oder Raid helfen, im PvP zählt das kaum.',
      levelingValue:
        'Für Krieger empfehlen die Guides Bergbau fürs Leveln, wegen der zahlreichen Vorkommen und des Lager-Buffs von Leitstein.',
      campsiteValue:
        'Leitstein, Felsgarten und Geschmolzene Gießerei geben einen Buff auf Angriffskraft im Nahkampf; laut den Guides gehört er zu den besten Lager-Buffs für Krieger.',
      auctionHouse: 'Die Materialien lassen sich leicht im Auktionshaus verkaufen.',
      exploration: 'Beim Skillen zieht man in Gebiete mit höherem Erz weiter.',
    },
  },
  skinning: {
    name: 'Kürschnerei',
    summary: 'Leder von erlegten Tieren, kaum Zusatzaufwand beim Leveln.',
    evidence: {
      levelingValue:
        'Beim Leveln tötet man ohnehin häutbare Tiere, daher kostet Kürschnerei keine zusätzliche Zeit und bringt Gold; sie stellt nur Lagerobjekte her, keine Ausrüstung fürs Leveln.',
      timeCost: 'Keine Umwege zu Vorkommen: Man häutet Tiere, die man ohnehin tötet.',
      goldCost: 'Nur ein Kürschnermesser vom Händler ist nötig.',
      goldIncome: 'Eine ausgezeichnete, halb passive Goldquelle, besonders beim Leveln.',
      pvpValue: 'Kürschnerei stellt nur Lagerobjekte her, keine Kampfgegenstände.',
      pveValue:
        'Kürschnerei stellt nur Lagerobjekte her, keine Kampfgegenstände; ihre Lager-Buffs können einer Gruppe vor einem Dungeon oder Raid helfen, im PvP zählt das kaum.',
      campsiteValue:
        'Lagerstuhl und die höheren Lagerobjekte der Kürschnerei geben allen am Lager einen Buff (kritischer Treffer, 2 %).',
      exploration: 'Keine Umwege zu Vorkommen: Man häutet Tiere, die man ohnehin tötet.',
    },
  },
  alchemy: {
    name: 'Alchemie',
    summary: 'Tränke, Fläschchen und Elixiere: Verbrauchsgüter für Raids und PvP; Alchemielabor fürs Lager.',
    evidence: {
      timeCost:
        'Die meisten Rezepte nutzen Kräuter; viele verkaufen Händler der Handelskommission von Azeroth oder von Versorgung und Logistik Durotar, manche erst ab Freundlich oder Wohlwollend, andere droppen bei bestimmten Gegnern.',
      pvpValue:
        'Tränke, Fläschchen und Elixiere geben starke zeitweilige Buffs, die auch im PvP helfen; Heiltränke kommen dagegen aus der Ersten Hilfe.',
      campsiteValue:
        'Die Lagerobjekte der Alchemie geben einen Buff auf Manaregeneration; die höheren bis zum Alchemielabor sind für bestimmte Rezepte nötig.',
      goldCost: 'Alchemie zu skillen kann oft teuer sein; selbst gesammelte Kräuter helfen.',
      goldIncome:
        'Ein ausgezeichneter Beruf zum Goldverdienen: Transmutationen sind eine passive Quelle, Verbrauchsgüter fürs Auktionshaus eine aktive, und viele Spieler fragen Verbrauchsgüter nach.',
      pveValue:
        'Alchemisten stellen Tränke, Fläschchen und Elixiere her, Raid-Verbrauchsgüter gibt es, und die Vorbereitung ist ein großer Teil des Erfolgs gegen einen Raid-Boss; laut den Guides erhalten Alchemisten 25 % stärkere Effekte von Elixieren und Fläschchen.',
      levelingValue: 'Über 50 Rezepte für Verbrauchsgüter auf niedrigen Leveln helfen beim Leveln.',
      auctionHouse:
        'Alchemisten verdienen Gold, indem sie Verbrauchsgüter im Auktionshaus verkaufen, und die lukrativsten Rezepte wechseln ständig mit Angebot und Nachfrage, daher gehört der Handel zum Beruf.',
      exploration: 'Viele Rezepte kommen von Fraktionshändlern.',
    },
  },
  blacksmithing: {
    name: 'Schmiedekunst',
    summary: 'Plattenrüstung, Waffen und Wetzsteine. Teures Skillen; Schleifstein fürs Lager.',
    evidence: {
      auctionHouse: 'Hergestellte Waffen verkaufen sich über den Herstellungskosten.',
      goldCost:
        'Zum Leveln braucht man gekaufte und gesammelte Materialien, und viele hergestellte Gegenstände bringen beim Händler wenig.',
      goldIncome: 'Hergestellte Waffen verkaufen sich über den Herstellungskosten.',
      levelingValue:
        'Schmiedekunst stellt beim Leveln stärkere Ausrüstung her, und frühe Waffen-Upgrades fühlen sich unglaublich stark an; sobald Dungeon-Belohnungen erreichbar sind, kann ihr Nutzen sinken.',
      campsiteValue:
        'Schleifstein (Angriffskraft) als Lagerobjekt; die höheren Objekte bieten einen nutzbaren Amboss und schalten Schmiede-Rezepte frei.',
      exploration: 'Rezepte als zufällige Drops in Dungeons.',
    },
  },
  engineering: {
    name: 'Ingenieurskunst',
    summary: 'Bomben, Gadgets und Schmuckstücke: stärkster PvP-Beruf; versteckte Rezepte in der Welt.',
    evidence: {
      timeCost:
        'Rezepte wie Bomben droppen aus versteckten Quellen mit sehr niedrigen Dropchancen und verlangen viel Farmen; Baupläne gibt es auch bei der Handelskommission von Azeroth, und eigenes Erz zu farmen kostet Zeit.',
      pvpValue:
        'Gadgets und Bomben geben der Ingenieurskunst großen Wert im PvP, und laut den Guides ist sie der beste Beruf fürs PvP im Endgame.',
      pveValue:
        'Laut den Guides machen Tüfteleien wie Nitrobooster die Ingenieurskunst für Raider Best in Slot und unbezahlbar, ihre Sprengstoffe haben großen Wert in Raids, und sie ist der beste Beruf fürs PvE im Endgame.',
      levelingValue: 'Bietet wenig Ausrüstung fürs Leveln, und für Krieger empfehlen die Guides sie zum Leveln nicht.',
      campsiteValue:
        'Materialbot, Reparaturbot und Werkbank des Anarchisten bieten Reagenzien und Reparaturen, aber keinen Werte-Buff; für Krieger nennen die Guides den Materialbot von begrenztem Nutzen.',
      exploration: 'Versteckte Rezepte (z. B. Bomben) und seltene Materialien.',
    },
  },
  leatherworking: {
    name: 'Lederverarbeitung',
    summary: 'Leder- und Kettenrüstung, Rüstungssets; Gerbgestell fürs Lager.',
    evidence: {
      levelingValue:
        'Viele Rezepte stellen beim Aufheben gebundene Teile her, die für ihr Level oft sehr stark sind, und das erste Lagerobjekt gibt Ruhebonus bis zu 5 % eines Levels.',
      campsiteValue:
        'Das erste Lagerobjekt der Lederverarbeitung gibt Ruhebonus bis zu 5 % eines Levels; das Gerbgestell ist für fortgeschrittene Rezepte der Lederverarbeitung nötig.',
      exploration: 'Rezepte als zufällige Drops in Dungeons.',
    },
  },
  tailoring: {
    name: 'Schneiderei',
    summary: 'Stoffrüstung und Taschen. Zaubermacht-Ausrüstung schon auf niedrigen Leveln; Fraktionsbanner fürs Lager.',
    evidence: {
      timeCost:
        'Jeder Spieler kann Stoff erbeuten, aber viele Muster verlangen Ruf, und manche Ausrüstungssets droppen bei Dungeon-Bossen.',
      goldCost: 'Jeder kann Stoff erbeuten, daher bleiben die Materialkosten moderat.',
      goldIncome: 'Gut für Gold, besonders früh, mit Taschen und Ausrüstung zum Herstellen und Entzaubern.',
      pveValue: 'Nützliche Ausrüstung bis ins Endgame; verbessert die Leistung in Dungeons.',
      levelingValue:
        'Schneiderei stellt schon auf niedrigen Leveln Zaubermacht-Ausrüstung her, und ihre Ausrüstungssets fürs Leveln sind beim Aufheben gebunden; laut den Guides verbessern die Stoffteile Tempo und Überlebensfähigkeit beim Leveln.',
      campsiteValue: 'Fraktionsbanner (Willenskraft) als Lagerobjekt.',
      auctionHouse:
        'Schneider liefern Taschen, und die Gegenstände aus dem Ruf der Himmelsgeborenen sind beim Anlegen gebunden und lassen sich im Auktionshaus verkaufen, während die Ausrüstungssets fürs Leveln beim Aufheben gebunden sind.',
      exploration: 'Viele Muster droppen in der Welt, bei Dungeon-Bossen, beim Angeln oder durch Taschendiebstahl.',
    },
  },
  enchanting: {
    name: 'Verzauberkunst',
    summary: 'Ausrüstung verzaubern, Gegenstände entzaubern. Teuer, aber im Endgame gefragt.',
    evidence: {
      pveValue:
        'Die Verzauberkunst stellt Zauberöle her, die mit den Waffeneffekten von Schamanen und Hexenmeistern stapeln.',
      levelingValue:
        'Für Priester nennen die Guides das Herstellen von Zauberstäben den Hauptgrund, Verzauberkunst früh zu lernen: Zauberstäbe machen beim Leveln einen guten Teil des Schadens aus. Sie gewinnen nichts aus Zauberschaden und brauchen vor dem Schuss 0,5 Sek. Stillstand.',
      campsiteValue:
        'Verzauberte Laute gibt allen am Lager Rüstung, alle Primärwerte und Widerstände; die höheren Objekte verbessern das Entzaubern und schalten Rezepte frei.',
    },
  },
  cooking: {
    name: 'Kochkunst',
    summary: 'Buff-Essen mit kleinem Erfahrungsbonus; Köche stellen das Koch-Lagerfeuer auf.',
    evidence: {
      timeCost:
        'Lehrer bringen nur etwa ein Dutzend von über 100 Rezepten bei; der Rest kommt von Händlern, aus Drops und von der Handelskommission von Azeroth. Für Skill 150 bis 225 braucht man ein Buch vom Händler, für 225 bis 300 eine Quest. Roher Fisch zum Skillen ist im Auktionshaus günstig.',
      campsiteValue: 'Köche platzieren verbesserte Lagerfeuer, die 5 oder 10 Lagerobjekte statt 3 aufnehmen.',
      goldCost: 'Roher Fisch zum Skillen ist im Auktionshaus günstig.',
      goldIncome:
        'Essens-Buffs halten 15 Min., und Spieler wollen sie beim Questen, in Dungeons und in Raids ständig, daher ist Essen im Auktionshaus eine sehr gute Einnahmequelle.',
      pveValue:
        'Essens-Buffs halten 15 Min., und Spieler wollen sie in Dungeons und Raids ständig, aber gekochtes Essen wird im Auktionshaus verkauft, daher kann es jeder kaufen.',
      levelingValue:
        'Hergestelltes Essen gibt einen kleinen Erfahrungsbonus (5 % aus Kills) und Wertesteigerungen, und Kochkunst belegt keinen Platz für Hauptberufe; laut den Guides spart eigenes Essen Zeit und Gold.',
      auctionHouse: 'Essens-Buffs halten 15 Min., daher ist Essen im Auktionshaus sehr gefragt.',
      exploration: 'Die meisten Rezepte kommen von Händlern, aus Drops und von der Handelskommission von Azeroth.',
    },
  },
  fishing: {
    name: 'Angeln',
    summary: 'Fisch für Kochkunst und Alchemie. Entspannt, aber zeitintensiv.',
    evidence: {
      pveValue:
        'Angler stellen nur Lagerobjekte her, keine Kampfgegenstände; ihr Wert für Raids und Dungeons kommt indirekt über Fisch für das Werte-Essen der Kochkunst.',
      levelingValue:
        'Angeln stellt nur Lagerobjekte und keine Ausrüstung her, und das Skillen hängt nur davon ab, wie viele Fische man fängt; seine Fische liefern das Erfahrungs-Essen der Kochkunst und Futter für Tiere der Jäger.',
      goldCost: 'Praktisch keine Kosten.',
      goldIncome:
        'Angeln kostet praktisch nichts, und die richtigen Fische bringen überraschend gutes, beständiges Gold ohne viel Aufmerksamkeit.',
      campsiteValue:
        'Fischglas gibt 8 % mehr Werte, vermutlich für jede Rolle, und die höheren Lagerobjekte des Angelns liefern Köder für die Angelfertigkeit sowie ungewöhnliche, danach seltene Fische. Seine Objekte schalten keine Rezepte frei.',
      auctionHouse: 'Fisch wird zu Buff-Essen für dich selbst oder fürs Auktionshaus.',
      exploration: 'Jede Art von Fischschwarm gibt es nur in bestimmten Gebieten.',
    },
  },
  'first-aid': {
    name: 'Erste Hilfe',
    summary: 'Verbände, für Klassen ohne Heilung fast Pflicht.',
    evidence: {
      goldCost:
        'Verbände herzustellen ist meist der günstigste Weg, Erste Hilfe zu skillen; der Skillbereich von 150 bis 225 braucht ein Buch vom Händler.',
      pveValue: 'Erste Hilfe stellt die Heiltränke her, dazu Mittel gegen Krankheiten und Blutungen.',
      levelingValue:
        'Für jede Klasse nützlich, besonders für Nicht-Heiler; der Vermächtnis-Bonus Feldmedizin verkürzt „Kürzlich bandagiert“.',
      campsiteValue:
        'Erste-Hilfe-Kasten gibt einen Ausdauer-Buff, der jeder Rolle hilft, und die höheren Lagerobjekte der Ersten Hilfe liefern Heiltränke und Gegengift, danach Heiltränke und Umschläge. Der Buff erhöht nur einen Wert, und die Objekte schalten keine Rezepte frei.',
    },
  },
} satisfies GermanEntityTexts<ProfessionEntry, 'name' | 'summary'>;
