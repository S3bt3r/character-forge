import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { DRUID_SPECS } from '../../../data/specs/druid';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Druid, translation of the English notes in `src/data/specs/druid.ts`. */
export const DRUID_NOTES = {
  shared: {
    armor: 'Lederrüstung.',
    cc: 'Druiden-CC ist schwächer und unzuverlässiger, vor allem Wurzeln, die Gegner festhalten.',
    deadZone: 'Kein Mindestabstand: Jede Fähigkeit funktioniert auch aus nächster Nähe.',
    defAbsorb: 'Baumrinde auch in Gestalt nutzbar; sonst kaum Schilde.',
    defKite: 'Kann Gegner festwurzeln, auch in Innenräumen (Wucherwurzeln), aber nicht verlangsamen.',
    dungeonUtility:
      'Kann Gefallene außerhalb und im Kampf zurückholen (Wiederbeleben, Wiedergeburt) und entfernt Flüche und Gifte, aber keine Krankheiten.',
    execute: 'Kein Bonusschaden gegen angeschlagene Gegner.',
    healAbsorb:
      'Die Heilung des Druiden stützt sich auf Heilungen über Zeit; kein Zauber des Druiden schirmt einen Verbündeten ab oder absorbiert Schaden an ihm.',
    healDirect:
      'Gleichgewicht und Wildheit heilen nur nach Verlassen ihrer Gestalt, und Wildheit ist nicht als Heiler gedacht, auch wenn ein Wildheit-Talent etwas Zauberheilung gibt. Die Guides zählen Spontanheilungen zu den Stärken von Gleichgewicht.',
    healGroup:
      'Gleichgewicht und Wildheit heilen andere nur nach Verlassen ihrer Gestalt, da Mondkingestalt alle Zauber außer Heilungen erlaubt; die Gruppenheilung bleibt ein seltener Notfall (Gelassenheit). Wildheit ist nicht als Heiler gedacht, und die Guides sehen auch Gleichgewicht nicht als Haupt-Heiler.',
    healHot:
      'Heilungen über Zeit nur nach Verlassen der Tiergestalt (Verjüngung, Nachwachsen); Wildheit ist nicht als Heiler gedacht, und die Guides verlassen die Gestalt, wenn zusätzliche Heilung nötig ist.',
    healingReduction: 'Keine Heilungsreduktion.',
    hybridFlex: 'Tank, Nahkampf, Fernkampf und Heiler.',
    pet: 'Kein Begleiter.',
    petControl: 'Kein Begleiter.',
    procs: 'Omen der Klarsicht ist Grundfähigkeit für alle Druiden.',
    rangeWeave: 'Gleichgewicht und Wiederherstellung wirken auf fester Reichweite, ohne Nahkampf in ihrem Spiel.',
    reagentDependency: 'Samen für Wiedergeburt und Kräuter für große Gruppenbuffs.',
    selfCleanse:
      'Entfernt Flüche und Gifte, aber keine Magie und Krankheiten (Fluch aufheben, Vergiftung heilen); laut den Guides entfernt Fluch aufheben auch Omen.',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    slow: 'Keine Verlangsamung.',
    soloEndgame:
      'Gleichgewicht verursacht Fernkampfschaden und behält die Heilzauber des Druiden, um sich nach Kämpfen zu erholen und schwierige Lagen zu meistern; das Mana begrenzt aber die Leistung, und viele Talente gehen in Manaregeneration, was Farmen und lange Sitzungen allein bremst.',
    tabTargetTank: 'Gleichgewicht und Wiederherstellung tanken nicht als Hauptrolle.',
    themeElements: 'Die Elemente gehören nicht zum Thema des Druiden.',
    themeFel: 'Dämonen gehören nicht zum Thema des Druiden.',
    themeLight: 'Das Licht gehört nicht zum Thema des Druiden.',
    themeMartial: 'Waffenkunst gehört nicht zum Thema des Druiden.',
    themeNature: 'Druide bewahrt seine Naturverbundenheit.',
    themeShadow: 'Schattenmagie gehört nicht zum Thema des Druiden.',
    totems: 'Keine Totems.',

    weaponCaster:
      'Gleichgewicht und Wiederherstellung kämpfen mit Naturmagie, und Waffen für Zauberwirker gewähren Zauberschaden und Heilung.',
    weaponDual: 'Druiden kämpfen mit Naturmagie oder in Tiergestalt, nie mit einer Waffe in jeder Hand.',
    weaponRanged: 'Druiden greifen auf Distanz nur mit Naturmagie an, nicht mit Bogen oder Schusswaffe.',
    weaponShield: 'Druiden kämpfen mit Naturmagie oder in Tiergestalt und tragen keinen Schild.',
    weaponTwoHand:
      'Gleichgewicht und Wiederherstellung kämpfen mit Naturmagie; ein Stab dient ihren Zaubern, nicht wuchtigen Schlägen.',
  },
  specs: {
    'druid-balance': {
      themeNature:
        'Gleichgewicht nutzt Naturmagie, Wurzeln und Stürme, doch der Mond prägt seine Identität mit (Mondfeuer, Sternenfeuer).',
      themeElements:
        'Gleichgewicht ruft Wind und Erde an (Hurrikan, Wucherwurzeln), schöpft aber aus Naturmagie und dem Mond statt aus den Elementen als Verbündeten.',
      healHot:
        'Gleichgewicht muss die Mondkingestalt verlassen, um über Zeit zu heilen, da die Gestalt keine Heilungen erlaubt; ein Gleichgewicht-Talent verlängert diese Heilungen (Pracht der Natur), und die Guides zählen flexible Spontanheilungen zu den Stärken von Gleichgewicht.',
      aoe: 'Flächenschaden durch einen Sturm ohne Abklingzeit (Hurrikan); die Guides nutzen ihn ab 5 Zielen, darunter halten sie DoTs auf zwei Zielen.',
      apm: 'Mittleres Tempo mit Zauberzeiten.',
      burst:
        'Phasen mit schnelleren Zaubern: Zorn verkürzt die Zauberzeit der nächsten 2 Sternenfeuer, bis zu 4 Aufladungen (Finsternis).',
      cc: 'Druiden-CC ist schwächer und unzuverlässiger, aber Gleichgewicht kann bis zu 3 Gegner zugleich festwurzeln (Wildes Wachstum), und seine Wurzeln brechen seltener durch Schaden und wirken auch in Innenräumen (Wucherwurzeln); die Guides zählen CC gegen mehrere Ziele zu seinen Stärken.',
      combatReset:
        'Keine Möglichkeit, den Kampf zu beenden; Gestaltwandel löst nur bewegungseinschränkende Effekte, um wegzulaufen.',
      complexity:
        'Die Rotation ist an einem Abend gelernt, und das Mana setzt die Grenze: zwei DoTs auf dem Ziel halten und zwei Schadenszauber abwechseln, wobei einer den anderen beschleunigt (Finsternis).',
      defStand: 'Zäher in Mondkingestalt und Bärengestalt; ein Wildheit-Talent gibt dort zusätzlich Rüstung.',
      dotDamage:
        'Gleichgewicht hält zwei DoTs auf dem Ziel (Mondfeuer, Insektenschwarm), und Gleichgewicht-Talente erhöhen allen periodischen Schaden und verlängern beide.',
      eliteSolo:
        'Mana begrenzt lange Kämpfe: Gleichgewicht pullt Gegner einzeln und wurzelt alles fest, was die Distanz schließt, bis zu 3 Ziele zugleich (Wucherwurzeln, Wildes Wachstum).',
      escape:
        'Gestaltwechsel löst Verlangsamungen, und Reisegestalt und Griff der Natur helfen beim Entkommen; Griff der Natur wirkt auch in Innenräumen und in Gestalt.',
      gearDependency:
        'Zaubermacht-Ausrüstung gibt es ab Level 10; laut den Guides tragen Waffen für Zauberwirker Zauberschaden und bringen dem Schaden mehr als die meisten Rüstungsteile, und das Mana begrenzt die Leistung des Gleichgewichts, nicht die Talente.',
      groundZones:
        'Ein Flächenzauber zum Platzieren, ein Sturm ohne Abklingzeit (Hurrikan); die Guides nennen ihn den Zauber für Flächenschaden.',
      groupDemand:
        'Bringt eine raidweite Aura (Mondkin-Aura), und laut den Guides viel Raid-Utility für eine Schadens-Spec; ob der Schaden für Raids reicht, ist aber offen.',
      hybridTax:
        'Hybrid-Schadens-Specs machen rund 5 % weniger Schaden; als Hybride gelten alle Klassen außer Jäger, Magier, Schurke und Hexenmeister.',
      interrupt: 'Kein Schweigen, keine Verlangsamung, keine Unterbrechung.',
      levelingDowntime:
        'Das Mana setzt die Grenze: Gegner einzeln pullen und zwischen Kämpfen trinken, statt durchzuziehen.',
      positional:
        'Zauberwirker auf Distanz: Kein Schadenszauber verlangt eine Position, und die Positionsangriffe der Katzengestalt spielen keine Rolle.',
      pvpBattleground:
        'Kann bis zu 3 Gegner zugleich festwurzeln (Wildes Wachstum) und sich selbst heilen; tiefe Gleichgewicht-Builds sind im PvP konkurrenzfähig.',
      pvpWorld:
        'Kann bis zu 3 Gegner zugleich festwurzeln (Wildes Wachstum) und sich selbst heilen; tiefe Gleichgewicht-Builds sind im PvP konkurrenzfähig, und Griff der Natur ist dort besonders stark.',
      raidUtility:
        'Bringt eine raidweite Aura für kritische Zaubertreffer (Mondkin-Aura), einen Gruppenbuff und Manahilfe (Mal der Wildnis, Anregen) und einen Debuff, der die Trefferchance des Gegners senkt. Laut den Guides bringt Gleichgewicht viel Raid-Utility für eine Schadens-Spec.',
      range: 'Wirkt aus der Distanz; ein Talent erhöht die Reichweite aller Schadenszauber (Reichweite der Natur).',
      resEnergy: 'Energie nur in Katzengestalt, für die Spec kein Kern.',
      resMana: 'Mana ist die Hauptressource.',
      resRage: 'Wut nur in Bärengestalt, für die Spec kein Kern.',
      roleHealer: 'Hybride können mit Manaleiste heilen, sind darin aber nicht stark.',
      roleMeleeDps: 'Zauberwirker-Spec ohne Nahkampf-Rolle.',
      roleRangedDps: 'Gleichgewicht als Zauberwirker-Pfad des Druiden.',
      roleTank: 'Frühe Dungeons können Druiden in Bärengestalt auch ohne Wildheit-Talente tanken.',
      selfHeal: 'Gute Eigenheilung mit Manaleiste und Heilzaubern.',
      shapeshift: 'Mondkingestalt; Gestaltwandeln allgemein flüssig.',
      singleTarget:
        'Der Hauptschaden kommt von Sternenfeuer, da Zorn wenig Mana kostet, aber auch wenig Schaden macht; Hybrid-Schaden soll konkurrenzfähig bleiben, und laut den Guides begrenzt das Mana die Leistung, nicht die Talente.',
      soloLeveling:
        'Laut den Guides eine recht sichere Wahl zum Leveln: Zorn ist so abgestimmt, dass er vor Sternenfeuer allein stark genug ist, dafür werden Druiden womöglich an anderer Stelle etwas abgeschwächt.',
      stealth:
        'Verstohlenheit in Katzengestalt ist verfügbar, Gleichgewicht hat aber keinen Grund für die Katzengestalt.',
      stun: 'Eine kurze Betäubung in Bärengestalt (Schwungvoller Hieb, 4 Sek.), für die jede Spec gelegentlich Verwendung findet, um den Preis, die Mondkingestalt zu verlassen.',
      survivability:
        'Hybride heilen sich mit Manaleiste schon gut selbst; Baumrinde ist in Gestalt nutzbar und Bärengestalt hilft im Notfall, aber Gleichgewicht ist ein Zauberwirker in Leder.',
      themeArcane:
        'Halb Arkan, halb Natur: Sternenfeuer, der wichtigste Schadenszauber, und Mondfeuer verursachen Arkanschaden, Zorn dagegen Naturschaden, und die Klasse wurzelt in der Natur.',
      threatControl:
        'Ein Wiederherstellung-Talent senkt die Bedrohung aller Arkan- und Naturzauber, auch Gleichgewicht kann es mitnehmen (Täuschung).',
      autoAttack: 'Schaden kommt aus Zaubern; Waffenschläge gibt es nur beim seltenen Wechsel in die Bärengestalt.',
    },
    'druid-feral': {
      soloEndgame:
        'Wildheit wählt aus der Verstohlenheit ihre Kämpfe, hält Elite-Gegner in Bärengestalt und heilt sich mit Wut bis zur vollen Gesundheit (Rasende Regeneration); laut den Guides werden bedrohliche Lagen in der offenen Welt so zum Kinderspiel. Druiden können aber nicht verlangsamen und haben schwächeren CC.',
      weaponCaster:
        'Wildheit kämpft in Katzengestalt oder Bärengestalt; Zauber dienen nur als Nebenwerkzeuge außerhalb dieser Gestalten.',
      weaponTwoHand:
        'Der DPS der ausgerüsteten Waffe bestimmt den Schaden der Autoangriffe in Katzengestalt und Bärengestalt, daher zählt eine Waffe mit hohem DPS wie eine Zweihandwaffe; gekämpft wird aber in Tiergestalt, nicht mit einer geschwungenen Waffe.',
      themeMartial:
        'Ein Nahkämpfer, aber mit Klauen und Reißzähnen statt Klinge und Bogen: In Katzengestalt und Bärengestalt nutzen Autoangriffe und Angriffe mit Waffenschaden den DPS der ausgerüsteten Waffe.',
      selfCleanse: 'Entfernt Flüche und Gifte, aber Wildheit muss dafür die Tiergestalt verlassen.',
      rangeWeave:
        'Kämpft in Katzen- oder Bärengestalt im Nahkampf und verlässt sie nur für den gelegentlichen Zauber aus der Ferne.',
      dungeonUtility:
        'Dieselben Wiederbelebungen und dieselbe Entfernung von Flüchen und Giften wie jeder Druide, aber Wildheit muss dafür die Tiergestalt verlassen.',
      defKite:
        'Kann Gegner nicht verlangsamen; Griff der Natur wirkt in Gestalt, aber für Wucherwurzeln muss die Tiergestalt verlassen werden.',
      defAbsorb:
        'Keine Barriere, aber zwei Talente erhöhen die Ausweichchance, auch in Bärengestalt, Berserker entfernt Furcht und macht immun dagegen, und Baumrinde wirkt in Gestalt.',
      cc: 'Druiden-CC ist schwächer und unzuverlässiger, aber Wildheit-Talente ergänzen ihn: eine kürzere Abklingzeit für die Betäubung in Bärengestalt (Schwungvoller Hieb) und ein Sprung in Bärengestalt, der das Ziel festhält (Wilde Attacke).',
      aoe: 'Kein dauerhafter Flächenschaden außerhalb der Bärengestalt: Nur dort treffen Angriffe bis zu 3 Ziele zugleich (Prankenhieb, während Berserker ein zweiter Angriff).',
      apm: 'Schnelles Tempo: Die Katzengestalt wartet selten auf Energie, da Machtverschiebung 40 Energie bei 16 Sek. Abklingzeit gibt, mit Talenten 8 Sek.',
      burst:
        'Alle 3 Min. für 15 Sek. +100 % kritische Trefferchance für Combo-Fähigkeiten in Katzengestalt (Berserker), und Machtverschiebung wandelt sofort Mana in 40 Energie.',
      combatReset:
        'Keine Möglichkeit, den Kampf zu beenden; Ducken senkt in Katzengestalt die Bedrohung stark, und Gestaltwandel löst bewegungseinschränkende Effekte, um wegzulaufen.',
      complexity:
        'Leicht zu lernen, aber schwer zu meistern: Der Wechsel zwischen Gestalten kann Einsteiger überfordern, und ein wirklich guter Wildheit-Druide nutzt jede Gestalt für andere Situationen; Machtverschiebung wandelt Mana in Energie.',
      defStand:
        'Mehr Rüstung in Tiergestalt durch ein Talent (Dickes Fell), und Verteidigung auf der Ausrüstung hilft.',
      dotDamage: 'Blutungen, die auf dem Ziel ticken (Krallenhieb, Zerfetzen und ab Level 42 Aufschlitzen).',
      eliteSolo: 'Bärengestalt und Eigenheilung.',
      escape:
        'Die Guides sehen Wildheit als sehr mobil (Schnelligkeit der Wildnis, Wilde Attacke, Spurt); der Tempobonus wirkt auch in Innenräumen, der Sprung in beiden Tiergestalten.',
      gearDependency:
        'Ausrüstung zählt: Autoangriffe in Gestalt nutzen den DPS der Waffe, ein Talent lässt Druiden-Tanks von Gegenständen mit Verteidigung profitieren (Dickes Fell), und Machtverschiebung macht Intelligenz wichtig.',
      groundZones:
        'In Katzen- oder Bärengestalt wird nichts auf den Boden gesetzt; Prankenhieb trifft die Gegner um den Druiden, und Hurrikan lässt sich nur außerhalb der Gestalt wirken.',
      groupDemand:
        'Gilt als perfekter Offtank, der dank seiner Hybrid-Natur leicht in Gruppen passt; Rudelführer ist raidweit.',
      hybridTax:
        'Hybrid-Schadens-Specs machen rund 5 % weniger Schaden; als Hybride gelten alle Klassen außer Jäger, Magier, Schurke und Hexenmeister.',
      interrupt:
        'Unterbricht Zauber 4 Sek. lang mit einem Sprung in Bärengestalt, der das Ziel auch festhält (Wilde Attacke); die Version in Katzengestalt unterbricht nicht.',
      levelingDowntime:
        'Katzengestalt kämpft mit Energie, aber Heilung außerhalb der Gestalt und Machtverschiebung kosten Mana, daher etwas Trinken zwischen Kämpfen.',
      positional:
        'Kämpft vor allem von hinten: Der Hauptangriff (Schreddern) und beide Opener aus der Verstohlenheit wirken nur hinter dem Ziel, der Angriff von vorn ist schwächer, und ein Sprung in Katzengestalt landet hinter dem Gegner. In Bärengestalt tankt dieselbe Spec mit dem Gesicht zum Gegner.',
      pvpBattleground: 'Mobil und stealthfähig.',
      pvpWorld: 'Verstohlenheit und Mobilität fürs Welt-PvP.',
      raidUtility:
        'Bringt eine raidweite Aura für kritische Nah- und Fernkampftreffer (Rudelführer), dazu einen Gruppenbuff und Manahilfe (Mal der Wildnis, Anregen).',
      range: 'Kampf in Katzen- oder Bärengestalt im Nahkampf.',
      resEnergy: 'Energie in Katzengestalt; Machtverschiebung wandelt Mana in 40 Energie.',
      resMana: 'Machtverschiebung macht Mana auch für Katzen relevant.',
      resRage: 'Wut in Bärengestalt; mehr Wut bei kritischen Treffern.',
      roleHealer:
        'Hybride wie Wildheit können heilen, sollen darin aber nicht gut sein; ein Wildheit-Talent gibt etwas Zauberheilung, und die Guides heilen außerhalb der Gestalt, wenn zusätzliche Heilung nötig ist.',
      roleMeleeDps:
        'Schaden in Katzengestalt rund um Schreddern ist eine Kernaufgabe, und Druiden sind vollwertige Tanks und Schadensverursacher; dieselbe Spec trägt aber auch das Tanken in Bärengestalt und ist daher kein reiner Schadensverursacher.',
      roleRangedDps: 'Nahkampf-Spec ohne Fernkampf-Rolle.',
      roleTank:
        'Rundum fähiger Tank, auch für Dungeons in Bärengestalt; Verteidigung zählt, Bedrohungsbonus der Bärengestalt 50 %.',
      selfHeal:
        'Eine Heilung, die Wut verbraucht, stellt bis zu 100 % der Gesundheit wieder her (Rasende Regeneration), dazu Heilzauber, die ein Wildheit-Talent verstärkt.',
      shapeshift:
        'In Gestalt nutzen Druiden Verbrauchsgüter, Waffeneffekte und Volksfähigkeiten, ohne die Gestalt zu verlassen; Kern der Wildheit.',
      singleTarget:
        'Der Hauptangriff wirkt ohne viel Talentunterstützung (Schreddern), die Ausweichlösung braucht kein zusätzliches Talent (Klaue), und Angriffe in Gestalt nutzen den Waffen-DPS.',
      soloLeveling:
        'Heilung, Verstohlenheit und Tanken machen gefährliche Situationen in der offenen Welt zum Kinderspiel; Rasende Regeneration heilt bei genug Wut bis 100 % der maximalen Gesundheit.',
      stealth: 'Verstohlenheit in Katzengestalt mit ihren Boni.',
      stun: 'Zwei Betäubungen, ohne die Gestalt zu verlassen: Schwungvoller Hieb, den ein Talent häufiger macht, und Anspringen aus der Verstohlenheit.',
      survivability: 'Bärengestalt; Rasende Regeneration heilt bei genug Wut bis 100 % der maximalen Gesundheit.',
      tabTargetTank:
        'Als Tank trifft ein Angriff 3 Ziele (Prankenhieb), aber die Angriffe mit hoher Bedrohung wirken auf ein Ziel, daher brauchen weitere Gegner Ziel-Wechsel; nur Berserker lässt Urtümlicher Biss 15 Sek. lang bis zu 3 Ziele treffen.',
      themeArcane: 'Arkane Magie gehört nicht zum Thema der Wildheit.',
      threatControl:
        'Ducken senkt in Katzengestalt die Bedrohung stark, eine Taste für den entscheidenden Moment, löst die Aggro aber nicht vollständig.',
      autoAttack:
        'Autoangriffe in Tiergestalt nutzen den DPS der ausgerüsteten Waffe, und Waffeneffekte wirken, aber Fähigkeiten tragen einen großen Teil des Schadens.',
    },
    'druid-restoration': {
      soloEndgame:
        'Wiederherstellung steckt ihre Talente in Heilung und tötet allein daher langsam; Bonusheilung bringt zu einem Drittel Bonusschaden, was Heilungsspezialisierungen in der Welt mehr Unterstützung gibt, und ihre Heilung hält sie am Leben.',
      healHot:
        'Heilungen über Zeit sind der Kern der Heilung des Druiden: Eine deckt die ganze Gruppe des Ziels ab (Wildwuchs), Rasche Heilung verbraucht die HoTs auf dem Ziel nicht, und Verjüngung kann kritisch treffen.',
      healDirect:
        'Die Heilung des Druiden stützt sich auf Heilungen über Zeit, die Guides nennen die direkten Heilungen aber starke Einzelzielheilungen (Heilende Berührung, Rasche Heilung, Nachwachsen).',
      healGroup:
        'Eine Heilung über Zeit auf der ganzen Gruppe des Ziels samt Begleitern (Wildwuchs), ein Talent verkürzt die Abklingzeit der großen Gruppenheilung (Gelassenheit), und laut den Guides geben die Hauptheilungen mit 1 Sek. globaler Abklingzeit viel Heilabdeckung in Raids.',
      procs:
        'Auf einen Proc-Buff achten und dann eine große Heilung wirken: laut den Guides bringt das viel Mana-Effizienz (Omen der Klarsicht, Grundfähigkeit aller Druiden), während HoTs vorausschauend verteilt werden.',
      aoe: 'Heiler-Spec mit wenig Flächenschaden.',
      apm: 'Schnelles HoT-Verteilen: Ein Talent senkt die globale Abklingzeit seiner wichtigsten Heilungen auf 1 Sek. (Gabe der Erdmutter).',
      burst: 'Heiler-Spec mit wenig Burst.',
      combatReset:
        'Keine Möglichkeit, den Kampf zu beenden; Gestaltwandel löst nur bewegungseinschränkende Effekte, um wegzulaufen.',
      complexity:
        'Heilen über HoTs braucht Zeit und Voraussicht, HoTs müssen vorausschauend verteilt werden, und Situationen werden leicht falsch eingeschätzt; nicht die einfachste Heiler-Spec für Einsteiger.',
      defStand:
        'Lederrüstung; Bärengestalt hilft im Notfall, aber Wiederherstellung heilt außerhalb davon und hat das Rüstungstalent der Wildheit nicht.',
      dotDamage: 'Nur ein DoT (Mondfeuer); der andere DoT des Druiden ist ein Gleichgewicht-Talent.',
      eliteSolo: 'Viel Heilung, wenig Schaden.',
      escape:
        'Gestaltwechsel löst Verlangsamungen, und Reisegestalt und Griff der Natur helfen beim Entkommen, Letzterer auch in Innenräumen und in Gestalt; laut den Guides ist Spurt für alle Specs nützlich.',
      gearDependency:
        'Hängt wenig von der Ausrüstung ab: Zwei Effekte sorgen für starke Regeneration im Kampf, um lange Begegnungen durchzuhalten (Reflexion, Omen der Klarsicht).',
      groundZones: 'Kaum Bodeneffekte.',
      groupDemand:
        'Heiler sind gefragt, manche Gruppen suchen aber mehr als starke Heilung: Wiederherstellungs-Druiden bringen keine eigene offensive Utility mit und sind oft die ersten Kandidaten, wenn Raids Heiler streichen.',
      hybridTax:
        'Wiederherstellung ist eine Heiler-Spec, daher gilt der Schadensabzug für Hybrid-Schadens-Specs nicht.',
      interrupt: 'Kein Schweigen, keine Verlangsamung, keine Unterbrechung.',
      levelingDowntime: 'Heiler-Leveln mit Manapausen.',
      positional:
        'Heiler auf Distanz: Kein Heilzauber verlangt eine Position, und die Positionsangriffe der Katzengestalt spielen keine Rolle.',
      pvpBattleground: 'HoT-Heiler mit Gestaltwechsel schwer zu fassen.',
      pvpWorld: 'Zäh, aber wenig Schaden; Gestaltwandeln befreit den Druiden von Verlangsamungen.',
      raidUtility:
        'Jeder Druide hat den stärkeren Gruppenbuff als Grundfähigkeit (Verbessertes Mal der Wildnis), dazu Anregen und Wiedergeburt; laut den Guides keine eigene offensive Utility über das hinaus, was jeder Druide aufrechterhalten kann.',
      range: 'Heilt mit HoTs aus voller Heilzauber-Reichweite.',
      resEnergy:
        'Für die Spec kein Kern: Energie nur in Katzengestalt, und ein Wiederherstellung-Talent spart außerhalb davon Energie an (Ingrimm).',
      resMana: 'Mana ist die Hauptressource; ein Talent gibt beim Zaubern erhebliche Manaregeneration (Reflexion).',
      resRage: 'Wut nur in Bärengestalt, für die Spec kein Kern.',
      roleHealer:
        'Ein starker Heiler mit begrenztem Werkzeugkasten, der auf HoTs setzt, darunter ein Gruppen-HoT (Wildwuchs).',
      roleMeleeDps: 'Heiler-Spec ohne Nahkampf-Rolle.',
      roleRangedDps: 'Heiler-Spec ohne Fernkampf-Rolle.',
      roleTank: 'Frühe Dungeons können Druiden in Bärengestalt auch ohne Wildheit-Talente tanken.',
      selfHeal: 'Volle Heilzauber als Wiederherstellung.',
      shapeshift:
        'In Gestalt nutzen Druiden Verbrauchsgüter und Volksfähigkeiten, ohne die Gestalt zu verlassen; für Heiler Reise- und Bärengestalt.',
      singleTarget: 'Heiler-Spec mit wenig Schaden.',
      soloLeveling: 'Wenig Schaden als Heiler.',
      stealth: 'Verstohlenheit in Katzengestalt ist für alle Specs häufig nützlich, für die Spec aber kein Kern.',
      stun: 'Eine kurze Betäubung in Bärengestalt (Schwungvoller Hieb, 4 Sek.), für die jede Spec gelegentlich Verwendung findet, um den Preis, das Heilen zu unterbrechen.',
      survivability: 'Viel Eigenheilung über HoTs.',
      themeArcane:
        'Nur eine Nebensache: Wiederherstellung ist ein Heiler, der in der Natur wurzelt; Arkan zeigt sich nur in zwei Schadenszaubern (Mondfeuer, Sternenfeuer) und in einem Talent, das Arkan- und Naturzauber vor Unterbrechung schützt.',
      threatControl:
        'Senkt die Bedrohung mit einem Talent im eigenen Baum, um bis zu 30 % für alle Arkan- und Naturzauber (Täuschung), dazu Ducken in Katzengestalt.',
      autoAttack: 'Heilung kommt aus Zaubern; Waffenschläge gibt es nur beim seltenen Wechsel in die Bärengestalt.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof DRUID_SPECS>>;
