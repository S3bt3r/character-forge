import type { GermanEntityTexts } from '../../../data/localize';
import type { RaceEntry } from '../../../data/races';

/** Name, background, racial abilities and provenance notes per race. */
export const RACE_TEXTS = {
  orc: {
    name: 'Orc',
    lore: 'Kriegerisches Volk unter Thrall, befreit von der dämonischen Blutschuld, geprägt von Ehre, Schamanismus und Durotar; neu in Forever als Magier spielbar.',
    racials:
      'Kochendes Blut (15 Sek. lang +10 % Angriffskraft und Zaubermacht), Fluch brechen (entfernt Flüche und Omen, 8 Sek. lang 5 % weniger Magieschaden), Wild (+1 % kritische Trefferchance), Zähigkeit (Betäubungen wirken 20 % kürzer).',
    evidence: {
      stunEscape:
        'Betäubungen wirken 20 % kürzer (Zähigkeit), aber nichts befreit aktiv aus Betäubung oder Bewegungsunfähigkeit.',
      racialPve:
        'Mehr Schaden auf Abruf und mehr kritische Treffer: 15 Sek. lang 10 % mehr Angriffskraft und Zaubermacht (Kochendes Blut), ständig 1 % kritische Trefferchance (Wild). Laut den Guides sind Orcs der Maßstab für Verstärkungs-Schamanen und wohl die beste Wahl für Furor-Krieger und für Magier im PvE die beste der Horde.',
      racialPvp:
        'Betäubungen wirken 20 % kürzer (Zähigkeit), Fluch brechen entfernt Flüche und senkt erlittenen Magieschaden; aus Betäubung oder Furcht befreit nichts. Laut den Guides sind Orcs für Verstärkungs-Schamanen die beste Wahl der Horde, wohl auch für Jäger, und für Magier wohl eine von zwei PvP-Wahlen der Horde.',
      selfCleanse: 'Kann Gifte, Krankheiten und Blutungen nicht entfernen; Fluch brechen entfernt nur Flüche und Omen.',
    },
  },
  undead: {
    name: 'Untoter (Verlassener)',
    lore: 'Von der Geißel befreite Untote unter Sylvanas. Neu in Forever: Paladine der Verlassenen aus der Bandarionfestung.',
    racials:
      'Wille der Verlassenen (entfernt Bezauberung, Furcht und Schlaf), Kannibalismus (stellt durch das Verzehren von Leichen 35 % Gesundheit und Mana her), Unterwasseratmung (300 % länger unter Wasser), Berührung des Grabes (Angriffe entziehen gelegentlich Gesundheit, ohne Kontrolleffekte zu brechen).',
    evidence: {
      racialPve:
        'Etwas Zusatzschaden, der dich auch heilt: Angriffe entziehen manchmal Gesundheit (Berührung des Grabes), und Kannibalismus stellt Gesundheit und Mana her. Laut den Guides sind Untote für Schurken einigermaßen konkurrenzfähig und für Priester der Horde empfohlen.',
      racialPvp:
        'Befreit aus Bezauberung, Furcht und Schlaf (Wille der Verlassenen), ohne danach Immunität zu geben. Laut den Guides ist das für Magier und Hexenmeister die stärkste PvP-Volksfähigkeit und eine der besten im Spiel.',
      fearEscape: 'Befreit aus Furcht (Wille der Verlassenen), ohne danach Immunität zu geben.',
    },
  },
  tauren: {
    name: 'Tauren',
    lore: 'Naturverbundenes Nomadenvolk aus Mulgore, Diener der Erdmutter.',
    racials:
      'Kriegsdonner (betäubt Gegner in der Nähe 2 Sek. lang), Grüner Daumen (lässt ein Kraut in der Nähe doppelt wachsen, das du ohne Kräuterkunde ernten kannst), Ebenenlaufen (schneller, je länger du in Bewegung bist), Durchhaltevermögen (+5 % Gesundheit, +2 % kritischer Schaden und kritische Heilung).',
    evidence: {
      racialPvp:
        'Kann Gegner in der Nähe für 2 Sek. betäuben, Abklingzeit 90 Sek. (Kriegsdonner), und Durchhaltevermögen gibt 5 % mehr Gesundheit, aber nichts befreit aus Betäubung oder Furcht. Laut den Guides ist Kriegsdonner eine sehr starke Flächenbetäubung in PvP und PvE.',
      racialPve:
        'Ständig mehr Gesundheit und stärkere kritische Treffer: 5 % Gesundheit und 2 % kritischer Schaden und kritische Heilung (Durchhaltevermögen); Kriegsdonner betäubt Gegner in der Nähe.',
    },
  },
  troll: {
    name: 'Troll',
    lore: 'Dunkelspeer-Trolle mit Voodoo-Tradition; neu in Forever als Hexenmeister spielbar.',
    racials:
      'Berserker (10 Sek. lang 10 % höheres Zauber- und Angriffstempo), Rasche Regeneration (stellt über Zeit 50 % Gesundheit her), Wildtierschlächter (+5 % Schaden gegen Wildtiere), Regeneration (+20 % Gesundheitsregeneration, 20 % davon laufen im Kampf weiter).',
    evidence: {
      racialPve:
        'Schneller zaubern und angreifen auf Abruf: 10 Sek. lang 10 % Zauber- und Angriffstempo (Berserker). Laut den Guides ist Berserker für Jäger im PvE sehr stark, und Trolle sind für Krieger die zweitbeste Wahl der Horde.',
      racialPvp:
        'Ein Schadensschub (Berserker) und eine Selbstheilung über Zeit, die bei Bewegung, Aktion oder Schaden abbricht (Rasche Regeneration). Laut den Guides hilft sie vor allem gegen Klassen ohne DoTs und ist schwer nutzbar, wenn es darauf ankommt. Nichts befreit aus Betäubung oder Furcht.',
    },
  },
  'skyborne-horde': {
    name: 'Himmelsgeborener (Windformer)',
    lore: "Shen'dorei, Nachkommen der ersten Himmelsgeborenen, von den Windgeistern gesegnet. Wollen die verschwundenen Luftgeister zurückholen; verbunden mit dem Irdenen Ring.",
    racials:
      'Auf Luft gehen (10 Sek. lang gleiten), Vom Wind gesegnet (+3 % Tempo), Elementare Einsicht (+5 % Schaden gegen Elementare), Himmelssicht (+10 % Bewegungstempo).',
    evidence: {
      racialPvp:
        'Vor allem schneller unterwegs: 10 % Bewegungstempo (Himmelssicht) und 3 % Tempo (Vom Wind gesegnet); laut einem Verstärkungs-Schamanen-Guide liegt die Stärke der Himmelsgeborenen in der zusätzlichen Bewegung. Eine Befreiung, Reinigung oder ein Kontrolleffekt fehlt.',
      racialPve:
        'Ein ständiger Tempobonus: 3 % Tempo (Vom Wind gesegnet) und 5 % Schaden gegen Elementare (Elementare Einsicht); Himmelssicht gibt nur Bewegungstempo. Laut den Guides sind Himmelsgeborene für Schurken den Orcs ebenbürtig und für Jäger gegen Elementare vorn.',
    },
  },
  human: {
    name: 'Mensch',
    lore: 'Volk von Sturmwind, Ritterlichkeit und Glaube an das Heilige Licht; neu in Forever als Jäger spielbar.',
    racials:
      'Überlebenswille (entfernt Betäubungen), Wahrnehmung (entdeckt 20 Sek. lang getarnte Gegner), Gnadenlos (+2 % kritische Trefferchance), Unbeugsamkeit (+5 % Willenskraft, das beschleunigt die Regeneration).',
    evidence: {
      racialPvp:
        'Befreit aus Betäubungen (Überlebenswille); die Guides vergleichen ihn mit einem PvP-Schmuckstück und nennen ihn eine starke PvP-Volksfähigkeit.',
      stunEscape: 'Befreit aus Betäubungen (Überlebenswille).',
      racialPve:
        'Ein ständiger Bonus auf kritische Treffer und schnellere Regeneration: ständig 2 % kritische Trefferchance (Gnadenlos) und 5 % Willenskraft (Unbeugsamkeit). Die Guides empfehlen Menschen für Paladine und sehen sie für Schurken nah an der Spitze.',
    },
  },
  dwarf: {
    name: 'Zwerg',
    lore: 'Bergvolk aus Eisenschmiede, Forscher und Schmiede; neu in Forever als Schamanen spielbar.',
    racials:
      'Steingestalt (entfernt Blutungen, Gifte und Krankheiten und macht immun dagegen, 8 Sek. lang 10 % weniger körperlicher Schaden), Schatzsucher (zeigt Schatztruhen in der Nähe, außerdem eine Chance auf zusätzliche Gegenstände in den meisten Truhen), Zorn der Erde (+2 % kritischer Schaden und kritische Heilung), Großwildjäger (+5 % Schaden gegen Wildtiere).',
    evidence: {
      racialPve:
        'Ein Bonus auf kritische Treffer und gegen Wildtiere: 2 % kritischer Schaden und kritische Heilung (Zorn der Erde), 5 % Schaden gegen Wildtiere (Großwildjäger). Laut den Guides sind Zwerge für Verstärkungs-Schamanen eine der schwächsten Wahlen im PvE und für Schurken etwas hinter den meisten Allianz-Völkern.',
      racialPvp:
        'Wird 8 Sek. lang immun gegen Blutungen, Gifte und Krankheiten und erleidet weniger körperlichen Schaden (Steingestalt), aber nichts befreit aus Betäubung oder Furcht; laut den Guides ist Steingestalt im PvP gegen Schurken eine gute Volksfähigkeit.',
      selfCleanse: 'Entfernt Blutungen, Gifte und Krankheiten von dir selbst (Steingestalt).',
    },
  },
  gnome: {
    name: 'Gnom',
    lore: 'Erfinderisches Volk aus Gnomeregan; neu in Forever als Priester spielbar.',
    racials:
      'Entfesselungskünstler (kurz immun gegen Bewegungsunfähigkeit und Verlangsamung), Heureka! (8 Sek. lang kosten Schadensfähigkeiten 10 % weniger und verursachen 10 % mehr Schaden; bei Priestern kosten auch Heilfähigkeiten 10 % weniger und heilen 10 % mehr; regelmäßige Effekte ausgenommen), Wacher Geist (+5 % maximales Mana, Wut oder Energie), Technologist (Ingenieursgeräte zuverlässiger).',
    evidence: {
      size: 'Gnome sind von kleiner Gestalt.',
      stunEscape:
        'Befreit aus Bewegungsunfähigkeit und Verlangsamung und macht kurz immun dagegen (Entfesselungskünstler), entfernt aber keine Betäubungen.',
      racialPvp:
        'Befreit aus Bewegungsunfähigkeit und Verlangsamung und macht kurz immun dagegen (Entfesselungskünstler), aber nichts befreit aus Betäubung oder Furcht. Laut den Guides ist Entfesselungskünstler im PvP hervorragend, und für Magier sind Gnome eine der zwei PvP-Wahlen der Allianz.',
      racialPve:
        'Ein kurzer Schub und mehr Ressourcen: 8 Sek. lang kosten Fähigkeiten 10 % weniger und machen 10 % mehr Schaden, bei Priestern auch Heilung (Heureka!), dazu 5 % mehr maximales Mana, Wut oder Energie (Wacher Geist). Laut den Guides sind Gnome für Priester die Wahl der Allianz und für Schurken unter den besten Allianz-Völkern.',
    },
  },
  'night-elf': {
    name: 'Nachtelf',
    lore: 'Uraltes Volk aus Teldrassil, Hüter der Natur und Diener Elunes.',
    racials:
      'Elunes Licht (15 Sek. lang +10 % kritische Trefferchance), Schattenhaftigkeit (getarnt, solange du stillstehst), Schnelligkeit (+1 % Ausweichen, +2 % Laufgeschwindigkeit), Irrwischgeist (75 % schneller, solange du tot bist).',
    evidence: {
      racialPvp:
        'Ein Schub an kritischen Treffern und ein Versteck: 15 Sek. lang 10 % kritische Trefferchance (Elunes Licht) und verborgen, solange du stillstehst (Schattenhaftigkeit); laut den Guides hält das im Kampf Gegner davon ab, dich anzugreifen. Nichts befreit aus Betäubung, Furcht oder Bewegungsunfähigkeit.',
      racialPve:
        'Ein Schub an kritischen Treffern: 15 Sek. lang 10 % kritische Trefferchance (Elunes Licht). Laut den Guides sind Nachtelfen vor allem deshalb die beste Wahl der Allianz für Krieger, womöglich für Jäger, und eine der stärksten für Druiden; für Schurken liegen sie etwas hinter den meisten Allianz-Völkern.',
    },
  },
  'skyborne-alliance': {
    name: 'Himmelsgeborener (Hoher Orden)',
    lore: "Shen'dorei, Nachfahren der Gelehrten von Eldre'Thalas. Wollen das arkane Wissen zurück und unabhängig von den Elementarwesen werden; verbunden mit der Kirin Tor.",
    racials:
      'Auf Luft gehen (10 Sek. lang gleiten), Vom Wind gesegnet (+3 % Tempo), Elementare Einsicht (+5 % Schaden gegen Elementare), Leylinie lesen (+100 % Gesundheits- und Manaregeneration).',
    evidence: {
      racialPvp:
        'Bringt 3 % Tempo (Vom Wind gesegnet); schnellere Gesundheits- und Manaregeneration und Gleiten (Auf Luft gehen) helfen gegen Spieler wenig, und laut den Guides zielen die Volksfähigkeiten eher auf das Leveln als auf das Endgame. Befreiung, Reinigung oder CC fehlen.',
      racialPve:
        'Bringt 3 % Tempo (Vom Wind gesegnet) und Leylinie lesen, laut den Guides für Druiden eine starke Mana-Abklingzeit. Für Arkan-Magier sind Himmelsgeborene laut den Guides möglicherweise die beste Wahl der Allianz, für Schurken nah an Menschen und Gnomen.',
    },
  },
} satisfies GermanEntityTexts<RaceEntry, 'name' | 'lore' | 'racials'>;
