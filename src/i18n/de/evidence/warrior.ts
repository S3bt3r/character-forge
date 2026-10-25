import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { WARRIOR_SPECS } from '../../../data/specs/warrior';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Warrior, translation of the English notes in `src/data/specs/warrior.ts`. */
export const WARRIOR_NOTES = {
  shared: {
    pvpWorld:
      'Kann die Heilung des Gegners senken, Distanz überbrücken und Gegner verlangsamen oder festhalten (Tödlicher Stoß, Sturmangriff, Verbesserte Kniesehne), aber Kriegern fehlen Werkzeuge, um sich von hohem Schaden zu erholen.',
    apm: 'Füllt die meisten globalen Abklingzeiten, begrenzt durch die verfügbare Wut: Blutdurst und Wirbelwind nach Abklingzeit, dazu Spalten bei überschüssiger Wut.',
    armor: 'Trägt ab Level 40 Plattenrüstung.',
    cc: 'Kann Gegner mit Furcht kontrollieren (Drohruf).',
    combatReset: 'Keine Möglichkeit, den Kampf zu beenden.',
    complexity:
      'Muss Haltungen und Wut verwalten; ab Level 14 behält jeder Krieger beim Haltungswechsel 10 Wut (Taktiker).',
    deadZone: 'Kein Mindestabstand: Jede Nahkampffähigkeit funktioniert auch aus nächster Nähe.',
    defAbsorb:
      'Hat keine Absorptionsschilde oder Immunitäten; Schildwall und Gegenschlag haben je eine eigene Abklingzeit von 15 Min.',
    defKite: 'Kann einen Gegner verlangsamen (Kniesehne), hat aber keine Möglichkeit, Abstand zu halten.',
    dotDamage:
      'Schaden über Zeit ist nur eine Nebenquelle: Verwunden skaliert mit Angriffskraft, und Tiefe Wunden ist ein rollender DoT.',
    dungeonUtility: 'Kann weder Flüche, Gifte oder Krankheiten entfernen noch Gefallene wiederbeleben.',
    eliteSolo: 'Ohne Heilung und Kontrolle ist ein Kampf allein gegen einen Elite-Gegner schwer.',
    gearDependency:
      'Die Entwickler nennen den Krieger als Klasse, die auf Ausrüstung achtet, und laut den Guides braucht Furor viel Ausrüstung, um bestimmte Werte-Grenzen zu erreichen.',
    groundZones: 'Keine Bodeneffekte oder Fallen.',
    groupDemand:
      'Jede Gruppe und jeder Raid nimmt gern einen Krieger als Tank oder Schadensverursacher mit; als Hybrid-Schadens-Spec macht Furor rund 5 % weniger Schaden.',
    healAbsorb: 'Keine Fähigkeit heilt andere.',
    healDirect: 'Keine Fähigkeit heilt andere.',
    healGroup: 'Keine Fähigkeit heilt andere.',
    healHot: 'Keine Fähigkeit heilt andere.',
    hybridFlex:
      'Kann tanken oder Schaden machen, zwei der drei Rollen, und ist für beide gefragt; heilen können Krieger nicht.',
    interrupt:
      'Kann Zauber unterbrechen (Zuschlagen, Schildhieb); ein Schildhieb, der zusätzlich Stille bewirkt, ist ein Schutz-Talent (Verbesserter Schildhieb).',
    levelingDowntime:
      'Kriegern fehlen Werkzeuge, um sich von hohem Schaden zu erholen; laut den Guides bringt Siegesrausch beim Leveln etwas Durchhaltevermögen, doch sie nennen wenig passive Erholung als Schwäche von Waffen.',
    pet: 'Kein Begleiter.',
    petControl: 'Kein Begleiter.',
    positional:
      'Waffen und Furor kämpfen als Nahkampf-Schadensverursacher: Keine Fähigkeit verlangt eine Position, aber wer hinter dem Gegner steht, umgeht dessen Parieren und Blocken. Ein bekannter Beta-Fehler lässt Gegner aus kurzer Distanz auch von hinten parieren und blocken; etwas Abstand vermeidet das.',
    raidUtility: 'Bringt einzigartige Buffs und Debuffs, und Schlachtruf wirkt raidweit.',
    range: 'Krieger sind die Meister des Nahkampfs.',
    rangeWeave: 'Bleibt im Nahkampf und wechselt nie in den Fernkampf.',
    reagentDependency: 'Braucht kaum Material, höchstens Wurfwaffen.',
    resEnergy: 'Krieger nutzen keine Energie.',
    resMana: 'Krieger nutzen kein Mana.',
    resRage: 'Wut ist die Ressource, gewonnen aus verursachtem und erlittenem Schaden.',
    roleHealer: 'Krieger haben keine Heilzauber.',
    roleRangedDps: 'Nutzt Fernkampfwaffen nur zum Pullen.',
    selfCleanse: 'Keine Fähigkeit entfernt Magie, Flüche, Gifte oder Krankheiten.',
    selfHeal:
      'Heilt nach einem Kill 10 % der Gesundheit (Siegesrausch), hat aber kaum Eigenheilung nach hohem Schaden.',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    shapeshift: 'Nutzt Haltungen statt Gestaltwandel.',
    slow: 'Kann einen Gegner verlangsamen (Kniesehne).',
    soloEndgame:
      'Krieger erholen sich schwer von zu viel Schaden, daher kosten die meisten Kämpfe Pausen; nach einem Kill heilt ein Schlag etwas Gesundheit (Siegesrausch). Laut den Guides bringt Waffen Mobilität, Kontrolle und Flächenburst, leidet aber unter wenig passiver Erholung und Wutmangel.',
    soloLeveling:
      'Wutgewinne sind auf questende Krieger abgestimmt, und nach einem Kill heilt Siegesrausch 10 % der maximalen Gesundheit, aber Kriegern fehlen Werkzeuge, um sich von hohem Schaden zu erholen.',
    stealth: 'Keine Verstohlenheit.',
    tabTargetTank: 'Waffen und Furor tanken nicht als Hauptrolle.',
    themeArcane: 'Arkane Magie gehört nicht zum Thema des Kriegers; Krieger kämpfen mit Waffen.',
    themeElements: 'Die Elemente gehören nicht zum Thema des Kriegers; Krieger kämpfen mit Waffen.',
    themeFel: 'Dämonen gehören nicht zum Thema des Kriegers; Krieger kämpfen mit Waffen.',
    themeLight: 'Das Licht gehört nicht zum Thema des Kriegers; Krieger kämpfen mit Waffen.',
    themeMartial: 'Krieger streben nach Perfektion im bewaffneten Kampf.',
    themeNature: 'Die Natur gehört nicht zum Thema des Kriegers; Krieger kämpfen mit Waffen.',
    themeShadow: 'Schattenmagie gehört nicht zum Thema des Kriegers; Krieger kämpfen mit Waffen.',
    threatControl: 'Hat kaum Werkzeuge, um die Bedrohung zu senken.',
    totems: 'Keine Totems.',
    autoAttack:
      'Der Schaden kommt aus Waffenschlägen und Autoangriff, und die Wut aus Treffern hängt vom Waffentempo ab; Furor schlägt mit zwei Waffen zu und bezieht daraus den größten Teil seines Schadens.',

    weaponCaster: 'Krieger kämpfen mit Waffen, Wut und Haltungen, nicht mit Zaubern.',
    weaponDual:
      'Keine der beiden Specs belohnt eine zweite Waffe: Waffen kämpft mit einer Zweihandwaffe, und ein Waffen-Talent löst nur bei Angriffen mit der Waffenhand aus (Rausch des Blutes); Schutz trägt einen Schild, den seine Talente voraussetzen (Bastion, Meister der Verteidigung).',
    weaponRanged:
      'Krieger sind die Meister des Nahkampfs; Bogen, Schusswaffe oder Wurfwaffe dienen höchstens zum Pullen von Gegnern.',
    weaponShield:
      'Waffen und Furor tragen einen Schild nur für Notfälle: Ein Makro kann innerhalb einer globalen Abklingzeit eine Zweihandwaffe gegen Schwert und Schild tauschen, und die Entwickler betonen, dass ein Krieger einen Schild anlegen, in die Verteidigungshaltung gehen und die Lage retten kann.',
    weaponTwoHand:
      'Waffen kämpft mit einer großen Zweihandwaffe: Ein Waffen-Talent belohnt auch Stangenwaffen und Stäbe, die es nur zweihändig gibt (Waffenmeister), und ein anderes löst nur mit der Waffenhand aus, sodass eine zweite Waffe nichts bringt (Rausch des Blutes).',
  },
  specs: {
    'warrior-arms': {
      defKite:
        'Kann einen Gegner verlangsamen (Kniesehne) und ihn mit etwas Glück festhalten, was Gegner leicht ausschaltet (Verbesserte Kniesehne), hat aber keine Möglichkeit, Abstand zu gewinnen.',
      autoAttack:
        'Der Schaden kommt aus Waffenschlägen und Autoangriff, und die Wut aus Treffern hängt vom Waffentempo ab; ein Talent verhindert, dass Zerschmettern den Schlag verzögert, doch ein Teil des Schadens kommt aus Fähigkeiten (Überwältigen, Verwunden).',
      apm: 'Tödlicher Stoß, Überwältigen und ein DoT füllen die Rotation, doch Zerschmettern ist kein Füller zwischen den Schlägen: Es hat eine Abklingzeit von 18 Sek., die ein Talent um bis zu 3 Sek. verkürzt.',
      raidUtility:
        'Bringt einzigartige Buffs und Debuffs, und Schlachtruf wirkt raidweit; die eigenen Talente von Waffen vergrößern den Wirkungsbereich der Rufe nicht (das ist ein Furor-Talent).',
      groupDemand:
        'Jede Gruppe und jeder Raid nimmt gern einen Krieger als Tank oder Schadensverursacher mit; als Hybrid-Schadens-Spec macht Waffen rund 5 % weniger Schaden, und seine eigenen Talente senken die Wutkosten von Spalten und Wirbelwind nicht (das ist ein Furor-Talent).',
      gearDependency:
        'Die Entwickler nennen den Krieger als Klasse, die auf Ausrüstung achtet, und ein Waffen-Talent gibt einen Bonus je nach ausgerüsteter Waffe (Waffenmeister); laut den Guides braucht Furor viel Ausrüstung, um bestimmte Werte-Grenzen zu erreichen.',
      dotDamage:
        'Den Großteil des Schadens machen Waffenschläge, doch Verwunden zählt: Es skaliert mit Angriffskraft, und ein Waffen-Talent gibt Angriffen mit der Waffenhand gegen Ziele mit Verwunden eine Chance, Überwältigen zu aktivieren; Tiefe Wunden kommt als rollender DoT hinzu.',
      aoe: 'Krieger sind die Könige des Cleave mit dem stärksten Dauer-Flächenschaden, eine Klassenstärke; die eigenen Talente von Waffen senken die Wutkosten von Spalten und Wirbelwind nicht (das ist ein Furor-Talent).',
      burst:
        'Laut den Entwicklern ist Tollkühnheit vermutlich der stärkste persönliche Cooldown im Spiel und hat deshalb 30 Min. Abklingzeit.',
      cc: 'Kann Gegner mit Furcht kontrollieren (Drohruf) und ein Ziel mit etwas Glück festhalten, was Gegner leicht ausschaltet (Verbesserte Kniesehne); vor allem Kontrolle einzelner Ziele.',
      defStand: 'Trägt Plattenrüstung und hat viel Gesundheit, aber meist keinen Schild.',
      escape:
        'Überbrückt schnell Distanz, was große Mobilität im Kampf gibt (Sturmangriff, Abfangen), hat aber keine Fluchtmöglichkeit.',
      execute: 'Bonusschaden gegen Gegner unter 20 % Gesundheit (Hinrichten).',
      survivability:
        'Ein robuster Kämpfer an vorderster Front, der Schaden abfängt, dem aber Werkzeuge zur Erholung nach hohem Schaden fehlen und der wenig passive Erholung hat.',
      healingReduction: 'Senkt die Heilung, die das Ziel erhält (Tödlicher Stoß).',
      hybridTax:
        'Als Hybrid-Schadens-Spec macht Waffen rund 5 % weniger Schaden; als Hybride gelten alle Klassen außer Jäger, Magier, Schurke und Hexenmeister.',
      procs:
        'Die Reaktion auf Procs prägt die Rotation: Ein Waffen-Talent gibt Angriffen mit der Waffenhand gegen Ziele mit Verwunden eine Chance von bis zu 20 %, Überwältigen zu aktivieren (Rausch des Blutes), etwas RNG, das die Entwickler bewusst wollen.',
      pvpBattleground: 'Kann Reiter vom Reittier werfen (Aufspießender Stoß).',
      roleMeleeDps: 'Ein Meister des Nahkampfs.',
      roleTank:
        'Ein Krieger kann einen Schild anlegen, in die Verteidigungshaltung gehen und die Lage retten, ohne Schutz-Talente aber höchstens als Notfall-Tank.',
      stun: 'Betäubt kurz beim Heranstürmen: Sturmangriff (1 Sek., nicht im Kampf) und Abfangen (3 Sek.), die Waffen laut den Guides sehr mobil machen. Eine längere Betäubung ist ein Schutz-Talent; ein Waffen-Talent lässt Streitkolben Rüstung ignorieren, aber nicht betäuben.',
    },
    'warrior-fury': {
      soloEndgame:
        'Kriegern fehlen die Werkzeuge, um sich leicht von zu viel erlittenem Schaden zu erholen, und Blutdurst gibt Bewegungstempo statt Heilung; laut den Guides kann Furor in Solo-Inhalten Probleme haben und ist am besten mit Unterstützung anderer.',
      weaponDual:
        'Furor kämpft mit einer Waffe in jeder Hand: Wirbelwind trifft immer mit beiden Waffen, und ein Furor-Talent erhöht die Trefferchance von Angriffen mit der Schildhand.',
      weaponTwoHand:
        'Furor setzt auf eine Waffe in jeder Hand: Wirbelwind trifft immer mit beiden, ein Furor-Talent erhöht die Trefferchance von Angriffen mit der Schildhand, und kein Furor-Talent belohnt eine Zweihandwaffe, die eine mögliche Nebenvariante bleibt.',
      levelingDowntime:
        'Kriegern fehlen Werkzeuge, um sich von hohem Schaden zu erholen; laut den Guides bringt Siegesrausch beim Leveln etwas Durchhaltevermögen, und ein Furor-Talent stellt nach Wutanfall, Blutdurst und ähnlichen Fähigkeiten mit den nächsten 3 Nahkampfangriffen je bis zu 1 % Gesundheit wieder her.',
      eliteSolo:
        'Ohne Heilung und Kontrolle schwer: Kriegern fehlen Werkzeuge, um sich von hohem Schaden zu erholen, und Furor tut sich solo schwer und ist mit Unterstützung am besten.',
      pvpWorld: 'Bringt keine Heilungsreduktion ins Duell, da Tödlicher Stoß ein Waffen-Talent ist.',
      complexity:
        'Muss Haltungen und Wut verwalten, und Wutanfall kann durch jeden erlittenen Schaden auslösen; laut den Guides ist die Rotation oberflächlich einfach, das Wut-Management aber teils komplex.',
      aoe: 'Krieger sind die Könige des Cleave mit dem stärksten Dauer-Flächenschaden, und ein Furor-Talent senkt die Wutkosten von Spalten und Wirbelwind (Wütende Schläge).',
      burst:
        'Laut den Entwicklern ist Tollkühnheit vermutlich der stärkste persönliche Cooldown im Spiel und hat deshalb 30 Min. Abklingzeit.',
      defStand: 'Trägt Plattenrüstung und hat viel Gesundheit, aber meist keinen Schild.',
      escape:
        'Überbrückt schnell Distanz (Sturmangriff, Abfangen), Blutdurst gibt 10 Sek. lang +10 % Bewegungstempo, und ein Talent entfernt bewegungseinschränkende Effekte; eine echte Flucht gibt es aber nicht.',
      execute: 'Bonusschaden gegen Gegner unter 20 % Gesundheit (Hinrichten).',
      healingReduction: 'Keine Heilungsreduktion, da Tödlicher Stoß ein Waffen-Talent ist.',
      hybridTax:
        'Als Hybrid-Schadens-Spec macht Furor rund 5 % weniger Schaden; als Hybride gelten alle Klassen außer Jäger, Magier, Schurke und Hexenmeister.',
      procs:
        'Seine Procs wirken passiv und verlangen keine Reaktion: Wutanfall kann durch jeden erlittenen Schaden auslösen, und Entfesselter Zorn löst ebenfalls zufällig aus.',
      soloLeveling: 'Kann sich beim Leveln und in anderen Solo-Inhalten schwertun und ist mit Unterstützung am besten.',
      selfHeal:
        'Blutdurst heilt nicht, aber ein Talent stellt nach Wutanfall, Blutdurst und ähnlichen Fähigkeiten mit den nächsten 3 Nahkampfangriffen je bis zu 1 % Gesundheit wieder her (Blutgier).',
      singleTarget:
        'Schwächer in langen Einzelzielkämpfen mit wenig eingehendem Schaden, da Wut dann nur aus den eigenen Treffern kommt.',
      survivability:
        'Viel Grundgesundheit und Plattenrüstung lassen Furor Schaden einstecken und Fehler überstehen, und ein Furor-Talent stellt nach Wutanfall, Blutdurst und ähnlichen Fähigkeiten mit den nächsten 3 Nahkampfangriffen je bis zu 1 % Gesundheit wieder her.',
      roleMeleeDps: 'Ein Meister des Nahkampfs.',
      roleTank:
        'Ein Krieger kann einen Schild anlegen, in die Verteidigungshaltung gehen und die Lage retten, ohne Schutz-Talente aber höchstens als Notfall-Tank.',
      stun: 'Betäubt kurz beim Überbrücken der Distanz: Sturmangriff betäubt 1 Sek. lang, ist aber im Kampf nicht nutzbar, und Furor kämpft in Berserkerhaltung, in der Abfangen im Kampf 3 Sek. lang betäubt. Eine längere Betäubung ist ein Schutz-Talent.',
    },
    'warrior-protection': {
      positional: 'Tankt von vorn, dem Gegner zugewandt; keine Fähigkeit verlangt eine Position.',
      soloEndgame:
        'Krieger können erlittenen Schaden abmildern, daher halten Schild und Platte Schutz gegen Elite-Gegner am Leben, doch ihnen fehlen die Werkzeuge, um sich leicht von zu viel erlittenem Schaden zu erholen, und der geringe Schaden von Schutz macht jeden Kill langsam und teuer.',
      weaponShield:
        'Schutz ist auf den Schild gebaut: Mit Schild erhöhen seine Talente sämtlichen Schaden und erzeugen Wut aus Ausweichen, Parieren und Blocks (Bastion, Meister der Verteidigung), das Bedrohungstalent der Tank-Haltung braucht einen Schild, und Schildschlag skaliert mit dem Blockwert.',
      weaponTwoHand:
        'Schutz kämpft mit Schild, da wichtige Talente nur mit ausgerüstetem Schild wirken (Bastion, Meister der Verteidigung); ohne Schild öffnet sich der Talentbaum nur bis zur Mitte, als PvP-Zweitspec, daher bleibt eine Zweihandwaffe eine seltene Nebenvariante.',
      themeMartial:
        'Krieger streben nach Perfektion im bewaffneten Kampf; Schutz kämpft mit Waffe und Schild, und Talente und Angriffe binden seinen Schaden an den Schild (Bastion, Schildschlag), sodass der Schild neben der Klinge steht.',
      rangeWeave:
        'Ein Nahkampf-Tank; eine Fernkampfwaffe dient nur zum Pullen für die Gruppe, und ein Talent macht Sturmangriff in Verteidigungshaltung nutzbar, um die Distanz zu schließen (Frontkämpfer).',
      interrupt:
        'Mit stets angelegtem Schild kann Schutz jederzeit Zauber unterbrechen: Schildhieb unterbricht und sperrt die unterbrochene Zauberschule 6 Sek. lang, ein Schutz-Talent verstärkt ihn weiter (Verbesserter Schildhieb), dazu kommt Zuschlagen.',
      autoAttack:
        'Schläge im Nahkampf erzeugen Wut, und ein Talent gibt Blocks eine Chance, 5 Wut zu erzeugen, aber das Tanken stützt sich auf Fähigkeiten: Laut den Guides bringen Rüstung zerreißen und Rache in der Regel mehr Schaden und Bedrohung, und Angriffe wie Schildschlag verursachen eigenen Schaden.',
      apm: 'Hat fast jede globale Abklingzeit eine Eingabe: Tank-Fähigkeiten wie Rache, Schildschlag und Donnerknall mit seiner Abklingzeit von 6 Sek., dazu Haltungs- und Zielwechsel, um die Bedrohung zu halten.',
      cc: 'Kann Gegner mit Furcht kontrollieren (Drohruf) und einen 5 Sek. lang betäuben (Erschütternder Schlag); Schutz-Talente wie ein Schildhieb mit Stille dienen als PvP-Werkzeuge (Verbesserter Schildhieb).',
      threatControl: 'Hat keine Werkzeuge, um die Bedrohung zu senken; als Tank will Schutz sie halten.',
      singleTarget: 'Tank-Spec mit wenig Schaden.',
      levelingDowntime:
        'Kriegern fehlen Werkzeuge, um sich von hohem Schaden zu erholen, und laut den Guides bringt Siegesrausch beim Leveln etwas Durchhaltevermögen; mit Schild und einem Talent für zusätzliche Verteidigung nimmt Schutz weniger Schaden (Vorahnung).',
      groupDemand:
        'Jede Gruppe und jeder Raid nimmt gern einen Krieger als Tank oder Schadensverursacher mit, und Schutz übernimmt die Rolle des Tanks.',
      gearDependency:
        'Die Entwickler nennen den Krieger als Klasse, die auf Ausrüstung achtet, und der Schaden von Schildschlag skaliert mit dem Blockwert; Wut aus erlittenem Schaden ignoriert die Rüstung, mehr Rüstung senkt also nicht die Wut des Tanks.',
      complexity:
        'Muss Haltungen und Wut verwalten und als Tank zusätzlich die Bedrohung (Donnerknall in Verteidigungshaltung nutzbar); kann Wut aus Blocken, Ausweichen und Parieren gewinnen.',
      aoe: 'Flächenschaden durch Donnerknall, in Verteidigungshaltung nutzbar und mit Angriffskraft skalierend.',
      burst: 'Tank-Spec mit wenig Burst.',
      defStand: 'Schild und Platte, und ein Talent erhöht die Verteidigung (Vorahnung).',
      escape: 'Ein Talent macht Sturmangriff in Verteidigungshaltung nutzbar (Frontkämpfer).',
      execute:
        'Auch Schutz verursacht Bonusschaden gegen Gegner unter 20 % Gesundheit, aber nicht in Verteidigungshaltung (Hinrichten).',
      healingReduction: 'Keine Heilungsreduktion, da Tödlicher Stoß ein Waffen-Talent ist.',
      hybridTax: 'Schutz ist eine Tank-Spec, daher gilt der Schadensabzug für Hybrid-Schadens-Specs nicht.',
      procs:
        'Blocken, Ausweichen und Parieren mit Schild können Wut erzeugen (Schildspezialisierung, Meister der Verteidigung).',
      pvpBattleground:
        'Laut den Entwicklern ist nicht jede Spec für PvP gebaut, und ein Schutz-Krieger hätte gegen einen Magier Mühe.',
      pvpWorld:
        'Laut den Entwicklern ist nicht jede Spec für PvP gebaut, und ein Schutz-Krieger hätte gegen einen Magier Mühe.',
      roleMeleeDps: 'Macht als Tank wenig Nahkampfschaden.',
      roleTank: 'Ein in jeder Gruppe gern gesehener Tank.',
      soloLeveling:
        'Ein Talent soll das Leveln als Schutz-Krieger erleichtern, bevor Schildschlag verfügbar ist (Fokussierte Wut).',
      stun: 'Kann 5 Sek. lang betäuben (Erschütternder Schlag), ein Talent macht Sturmangriff mit seiner Betäubung von 1 Sek. in der Tank-Haltung nutzbar, und nach einem Haltungswechsel betäubt Abfangen 3 Sek. lang.',
      survivability:
        'Schildwall hat eine eigene Abklingzeit von 15 Min., und laut den Guides sind die defensiven Fähigkeiten und Cooldowns von Schutz robust und sollten beim Tanken großzügig eingesetzt werden.',
      tabTargetTank:
        'Donnerknall ist in Verteidigungshaltung nutzbar und erzeugt zuverlässig Bedrohung bei bis zu 4 Gegnern, womit Schutz laut den Guides mehr als ein oder zwei Ziele ohne hektisches Tab-Wechseln tanken kann; bei mehr als 4 Gegnern muss Schutz Ziele wechseln.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof WARRIOR_SPECS>>;
