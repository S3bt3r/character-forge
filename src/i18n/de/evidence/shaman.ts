import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { SHAMAN_SPECS } from '../../../data/specs/shaman';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Shaman, translation of the English notes in `src/data/specs/shaman.ts`. */
export const SHAMAN_NOTES = {
  shared: {
    apm: 'Spielt sich in mittlerem Tempo, Totems haben 1,0 Sek. globale Abklingzeit.',
    armor: 'Trägt Kettenrüstung und kann Schilde benutzen.',
    combatReset:
      'Keine Möglichkeit, den Kampf zu beenden. Kann nach dem Tod mit langer Abklingzeit ins Leben zurückkehren (Reinkarnation): nützlich zur Wiederbelebung nach einem Wipe oder um nach einem Fehler weiterzukämpfen, beendet aber keinen Kampf.',
    complexity:
      'Totems auszuwählen und zu platzieren ist ein entscheidender Skill, und Rufzauber setzen mehrere auf einmal. Laut den Guides braucht Wiederherstellung nur drei Heilungen (Fläche, Einzelziel und eine kurz abklingende Heilung über Zeit); die Aufgabe ist, sie auf eine Gruppe zu verteilen.',
    deadZone: 'Kein Mindestabstand: Jede Fähigkeit funktioniert auch aus nächster Nähe.',
    dungeonUtility:
      'Kann Gefallene wiederbeleben (Geist der Ahnen) und Gifte und Krankheiten entfernen, auch mit Reinigungstotems, die 5 Min. halten (Totem der Krankheitsreinigung).',
    eliteSolo:
      'Dank Kettenrüstung und Schild eine der robustesten Klassen; laut den Guides lassen sich Nahkampf-Elite-Gegner beim Solospiel mit einem verlangsamenden Schock kiten (Frostschock).',
    escape:
      'Kann in einer Reiseform entkommen (Geisterwolf); sofort und in Innenräumen nutzbar wird sie nur mit einem Talent aus dem Verstärkung-Baum (Verbesserter Geisterwolf).',
    execute: 'Kein Bonusschaden gegen angeschlagene Gegner.',
    groundZones:
      'Totems stehen am Boden, und sie gut zu platzieren ist ein entscheidender Skill. Feuernova bricht am Feuertotem hervor, und ein Elementar-Talent vergrößert ihre Reichweite. Wiederherstellung stellt ihre Heiltotems für die Gruppe auf; Verstärkung hat wenige Totem-Talente.',
    healAbsorb:
      'Elementar und Verstärkung können Verbündete nicht mit Schilden schützen oder Schaden für sie absorbieren. Schamanen heilen mit ihren eigenen Kettenzaubern, und laut den Entwicklern gehören Schilde, die Schaden absorbieren, nicht zur Heilung eines Schamanen.',
    healDirect:
      'Kann ein einzelnes Ziel nur als Nebenheilung heilen (Welle der Heilung): Die Entwickler wollen, dass Hybride heilen können, darin aber nicht gut sind, und Waffe des Mahlstroms von Verstärkung beschleunigt Blitzschlag, aber keine Heilzauber.',
    healGroup:
      'Kann eine Gruppe nur als Nebenheilung heilen (Kettenheilung, Totem des heilenden Flusses): Die Entwickler achten bewusst darauf, dass Hybrid-Schadens-Specs nicht zu gut heilen, und Waffe des Mahlstroms von Verstärkung beschleunigt keine Heilzauber.',
    healHot:
      'Ein Totem kann Gruppenmitglieder in der Nähe regelmäßig heilen (Totem des heilenden Flusses), aber Elementar und Verstärkung sind Schadens-Specs, und die Entwickler achten darauf, dass Hybride nicht gut heilen.',
    healingReduction: 'Kann die Heilung, die ein Gegner erhält, nicht verringern.',
    hybridFlex:
      'Kann wirksam Nahkampf- oder Zauberschaden verursachen oder heilen; Verstärkung kann in kleinen Gruppen zudem zeitweise tanken.',
    interrupt:
      'Jeder Schamane hat eine sofortige Unterbrechung (Erdschock), die vor allem dazu dient, gegnerische Zauber zu unterbrechen.',
    pet: 'Kein Begleiter; Totems zählen nur am Rand.',
    petControl: 'Kein steuerbarer Begleiter.',
    positional: 'Keine Fähigkeit verlangt eine Position.',
    raidUtility:
      'Totems stärken den ganzen Raid und halten 5 Min.: Widerstandstotems (Onyxias Hort etwa verlangt Feuerwiderstand) und weitere Buff-Totems wie Totem des Windzorns und Stärke der Erde.',
    reagentDependency: 'Reinkarnation braucht ein Ankh, und Totems brauchen Totem-Gegenstände.',
    resEnergy: 'Schamanen nutzen keine Energie.',
    resMana:
      'Mana ist die einzige Ressource; Sturmschlag, eine Fähigkeit von Verstärkung, kostet 8 % des Grundmanas, und Totemischer Rückruf erstattet 25 % des Totem-Manas.',
    resRage: 'Schamanen nutzen keine Wut.',
    selfCleanse:
      'Kann Gift und Krankheit entfernen (Vergiftung heilen, Krankheit heilen), auch mit Reinigungstotems, die 5 Min. halten (Totem der Krankheitsreinigung), aber weder Magie noch Flüche: 2 von 4 Arten.',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    shapeshift:
      'Hat nur eine Reiseform, keine Kampfgestalt (Geisterwolf); ein Verstärkung-Talent macht sie sofort und in Innenräumen nutzbar (Verbesserter Geisterwolf).',
    slow: 'Kann Gegner mit einem Schock und einem Totem verlangsamen (Frostschock, Totem der Erdbindung); laut den Guides dient der Schock vor allem dazu, Schaden zu vermeiden oder zu entkommen. Ein Elementar-Talent lässt das Totem beim Setzen Ziele in der Nähe bewegungsunfähig machen.',
    soloEndgame:
      'Dank Kettenrüstung und Schild eine der robustesten Klassen, aber ohne wirksamen CC und auf Verbündete angewiesen. Verstärkung kämpft im Nahkampf, und laut den Guides ist ihr sofortiger Geisterwolf, der auch in Innenräumen geht, in der offenen Welt großartig.',
    stealth: 'Keine Verstohlenheit.',
    stun: 'Keine Betäubung.',
    survivability:
      'Mit Kettenrüstung und Schild eine der robustesten Klassen, aber auf Verbündete für Kontrolle und Überleben angewiesen.',
    tabTargetTank: 'Keine Tank-Spezialisierung.',
    themeElements: 'Schamanen stehen in direktem Kontakt zu den Elementen.',
    themeNature:
      'Schamanen verkörpern das ursprüngliche Band zwischen den Völkern und ihrer Umgebung, doch ihr Fokus sind die Elemente, nicht Wälder und Tiere. Wiederherstellung heilt (Springflut, Kettenheilung), Verstärkung bringt mit einer per Talent sofortigen Wolfsgestalt eine tierische Note (Geisterwolf), Elementar kämpft mit Sturm und Feuer.',
    totems:
      'Totems kosten je 1,0 Sek. globale Abklingzeit, Buff-Totems halten 5 Min., und Rufzauber setzen je 4 Totems auf einmal (Ruf der Elemente, Ruf der Geister, Ruf der Urahnen).',

    weaponCaster:
      'Elementar kämpft mit Zaubern wie Blitzschlag, Kettenblitzschlag und Lavaeruption, und Waffen für Zauberwirker gewähren Zauberschaden; dabei tragen Schamanen Kettenrüstung und können statt eines Stabs Einhandwaffe und Schild führen.',
    weaponDual:
      'Schamanen kämpfen nie mit zwei Waffen: Verstärkung kämpft mit einer Zweihandwaffe, Elementar und Wiederherstellung mit Zaubern.',
    weaponRanged: 'Schamanen können weder Bogen noch Schusswaffe benutzen.',
    weaponShield:
      'Schamanen tragen Kettenrüstung und können Schilde führen; Wiederherstellung heilt mit Einhandwaffe und Schild, auch wenn kein Talent den Schild belohnt und ihr Spiel aus Zaubern besteht.',
    weaponTwoHand:
      'Elementar und Wiederherstellung kämpfen mit Zaubern, daher spielt die Grundfähigkeit für Zweihandäxte und -streitkolben für sie keine Rolle.',
  },
  specs: {
    'shaman-elemental': {
      soloEndgame:
        'Dank Kettenrüstung und Schild eine der robustesten Klassen, aber ohne wirksamen CC und auf Verbündete angewiesen. Elementar verursacht Zauberschaden auf Distanz; laut den Guides fehlt ihr im Endgame Mana, was das Farmen bremst, und ein Wiederherstellung-Talent löst das vielleicht (Achtsamkeit).',
      weaponShield:
        'Schamanen tragen Kettenrüstung und können Schilde führen, und Elementar kann mit Einhandwaffe und Schild zaubern, verursacht seinen Schaden aber auf Distanz mit Zaubern, und kein Talent belohnt den Schild.',
      themeArcane:
        'Arkane Magie gehört nicht zum Thema von Elementar: Schamanen stehen in direktem Kontakt zu den Elementen, und seine Zauber sind Blitz und Feuer (Blitzschlag, Kettenblitzschlag, Lavaeruption). Gemeinsam ist nur die Rolle als reiner Schadenszauberer.',
      apm: 'Lange Zauber füllen den Großteil des Kampfes: Blitzschlag und Lavaeruption haben je 2,5 Sek. Zauberzeit. Ein frühes Elementar-Talent verkürzt beide um 0,5 Sek., Elementarmeisterschaft verkürzt sie weiter, aber nur für 15 Sek. bei 3 Min. Abklingzeit.',
      complexity:
        'Ein einfacher Spielstil, der Elementar zu einer großartigen Wahl für neue Spieler macht; zu Blitzschlag und den Totems kommen zwei Zauber mit je einer Abklingzeit (Lavaeruption, Elementarmeisterschaft).',
      survivability:
        'Mit Kettenrüstung und Schild eine der robustesten Klassen, aber auf Verbündete für Kontrolle und Überleben angewiesen; Elementar bekommt weder das zusätzliche Ausweichen von Vorahnung noch die Heilung einer Heiler-Spec.',
      aoe: 'Trifft Gruppen mit Kettenblitzschlag, dessen Abklingzeit ein Talent für 15 Sek. aufhebt, und mit Feuernova, die sich am Feuertotem mehrfach auslösen lässt. Laut den Entwicklern machen Schamanen Spaltschaden nur, indem sie Mana in diese beiden Zauber stecken, und auch dann nicht viel.',
      burst: 'Seine Schadensspitzen kommen aus zwei tiefen Elementar-Talenten (Lavaeruption, Elementarmeisterschaft).',
      cc: 'Schamanen fehlt effektiver CC; ein Elementar-Talent lässt Totem der Erdbindung beim Setzen Ziele in der Nähe sofort 5 Sek. lang festwurzeln (Erdgebunden).',
      defAbsorb: 'Hat kaum Schilde oder Immunität, nur ein Totem, das einen Zauber umlenkt (Totem der Erdung).',
      defKite:
        'Hält Gegner mit Verlangsamungen durch einen Schock und ein Totem auf Abstand (Frostschock, Totem der Erdbindung), und ein Elementar-Talent lässt das Totem Ziele in der Nähe beim Setzen 5 Sek. lang bewegungsunfähig machen (Erdgebunden): Verlangsamung und Wurzeln, aber kein Einfrieren.',
      defStand: 'Kettenrüstung und Schild machen Schamanen robust.',
      dotDamage:
        'Hat einen DoT (Flammenschock), den ein Elementar-Talent verstärkt und verlängert (Ruf der Flamme), und Lavaeruption profitiert davon.',
      gearDependency: 'Skaliert mit Zaubermacht; frühes Leveln ist ohne viel Zaubermacht auf der Ausrüstung schwer.',
      groupDemand:
        'In Gruppen immer willkommen, und laut den Guides bringt jede Schamanen-Spec dieselben Totems mit. Elementar bringt sie als Zauber-Schadensverursacher mit, der als Hybrid rund 5 % weniger Schaden macht und in kleinen Gruppen nicht als Tank einspringen kann.',
      hybridTax: 'Schamanen gelten als Hybride, daher macht Elementar als Schadens-Spec rund 5 % weniger Schaden.',
      levelingDowntime:
        'Ein Zauberwirker, der in jedem Kampf Mana verbraucht und oft trinkt. Ein Wiederherstellung-Talent lässt die Regeneration beim Zaubern weiterlaufen (Achtsamkeit), zurückgerufene Totems geben etwas Mana zurück, doch Elementar hat keinen Wasserschild und keine manasparenden Waffenangriffe.',
      procs:
        'Seine Zufallseffekte wirken von selbst und lassen wenig zum Reagieren: Blitzschlag und Kettenblitzschlag haben die Chance, sofort eine zweite Kopie ohne Manakosten zu wirken (Überladung).',
      pvpBattleground: 'Bringt Burst und Wurzeln im Bereich (Elementarmeisterschaft, Erdgebunden), aber wenig CC.',
      pvpWorld: 'Gute Schadensspitzen, aber kaum CC.',
      range:
        'Zauber reichen rund 30 m weit; ein Elementar-Talent verlängert auch Lavaeruption und Feuernova um bis zu 6 m und Flammenschock um bis zu 15 m.',
      rangeWeave:
        'Wirkt aus fester Distanz, und das Setzen der Totems verlangt keinen Weg dorthin: Ein Zauber versetzt sie bis zu 30 m weit (Totemische Projektion).',
      roleHealer: 'Kann als Hybrid heilen, soll darin aber nicht gut sein.',
      roleMeleeDps: 'Zauberwirker-Spec ohne Nahkampf-Rolle.',
      roleRangedDps: 'Schamanen können effektive Magie-Schadensverursacher sein.',
      roleTank: 'Kein Tank.',
      selfHeal: 'Kann sich selbst heilen, wie Hybride dank ihrer Manaleiste.',
      singleTarget:
        'Zwei tiefe Elementar-Talente stärken den Schaden auf ein Ziel: Lavaeruption verursacht an einem Ziel mit Flammenschock 20 % mehr Schaden, und Elementarmeisterschaft verkürzt die wichtigsten Zauberzeiten um 0,5 Sek. Die Entwickler peilen rund 5 % weniger Schaden für Hybrid-Schadens-Specs an.',
      soloLeveling:
        'Elementar ist in frühen Leveln ohne viel Zaubermacht auf der Ausrüstung schwer zu leveln und hängt vom Mana ab; ein Talent der zweiten Reihe verkürzt die Zauberzeit von Blitzschlag, um Elementar in den frühen Leveln Fortschritt zu geben (Elementare Geschwindigkeit).',
      threatControl:
        'Ein Wiederherstellung-Talent, bewusst für Elementar erreichbar, senkt die Bedrohung aller Zauber (Natürliche Anmut).',
      autoAttack: 'Der Schaden kommt aus Zaubern; Waffenschläge spielen fast keine Rolle.',
    },
    'shaman-enhancement': {
      positional:
        'Kämpft im Nahkampf, wo keine Fähigkeit eine Position verlangt, doch wer hinter dem Gegner steht, umgeht dessen Parieren und Blocken. Ein bekannter Beta-Fehler lässt Gegner aus kurzer Distanz auch von hinten parieren und blocken; etwas Abstand vermeidet das.',
      weaponCaster:
        'Kämpft mit einer Zweihandwaffe, kann aber sofortige Blitzschläge wirken (Waffe des Mahlstroms), und die Entwickler wollen, dass sie auf Zaubermacht achtet und ihre Blitzzauber nutzt.',
      weaponShield: 'Kämpft mit einer Zweihandwaffe und hat kein Schildtalent.',
      weaponTwoHand:
        'Kämpft mit einer Zweihandwaffe: Zweihandäxte und -streitkolben sowie Waffenmeisterschaft sind Grundfähigkeiten, und laut den Guides ist sie eine Spec mit Zweihandwaffe ohne Kampf mit zwei Waffen.',
      themeMartial:
        'Kämpft mit ihren Waffen: mehrere Fähigkeiten bauen auf Nahkampfangriffe (Sturmschlag, Waffe des Mahlstroms, Zorn des Scharfsehers), und Waffenverzauberungen machen die Waffe selbst mächtiger, doch sie mischt Zauberei bei.',
      themeElements:
        'Schamanen stehen in direktem Kontakt zu den Elementen; Verstärkung trägt sie auf ihren Waffen (Waffe des Felsbeißers) und wirkt Blitzzauber, ein elektrischer Angriff, der zu ihrer Fantasie gehört (Waffe des Mahlstroms), doch der Nahkampf teilt sich den Fokus.',
      apm: 'Füllt die freien globalen Abklingzeiten zwischen Nahkampfschlägen, auf die die Entwickler hinweisen, mit Sturmschlag alle 8 Sek., Schocks und sofortigen Blitzschlägen (Waffe des Mahlstroms); Totems kosten 1,0 Sek. globale Abklingzeit.',
      aoe: 'Flächenschaden ist nicht der Schwerpunkt von Verstärkung: Die Entwickler wollen sie nicht als Spaltschaden-König, daher beschleunigt Waffe des Mahlstroms Blitzschlag, aber nicht Kettenblitzschlag.',
      burst:
        'Hat moderate Schadensspitzen: eine Fähigkeit mit 3 Min. Abklingzeit erhöht das Angriffstempo für 25 Sek. um 30 %, aber nicht das Zaubertempo (Zorn des Scharfsehers), und Sturmschlag alle 8 Sek. lässt den nächsten Blitzschlag 20 % mehr Schaden verursachen.',
      cc: 'Schamanen fehlt effektiver CC.',
      complexity:
        '„Sehr geradlinig“ und „sehr einsteigerfreundlich“: richtig mit Totems umzugehen und das Mana einzuteilen ist das Wichtigste zum Lernen.',
      defAbsorb: 'Ein Talent erhöht die Chance, Angriffen auszuweichen (Vorahnung).',
      defKite:
        'Kann Gegner mit einem Schock und einem Totem verlangsamen (Frostschock, Totem der Erdbindung); ein Verstärkung-Talent der ersten Reihe vergrößert den Bereich des Totems (Griff der Erde), und ein weiteres verbilligt Schocks.',
      defStand:
        'Trägt Kettenrüstung und kann einen Schild führen, auch wenn kein Talent den Schild verbessert; ein Talent gibt Ausdauer (Zähigkeit).',
      dotDamage: 'Hat einen einzigen DoT (Flammenschock).',
      escape:
        'Kann in einer Reiseform entkommen, die ein Talent sofort und in Innenräumen nutzbar macht (Geisterwolf, Verbesserter Geisterwolf).',
      gearDependency:
        'Braucht Nahkampf- und Zauberwerte zugleich: Waffe und Angriffskraft zählen, und die Entwickler wollen, dass Verstärkung auch auf Zaubermacht achtet. Talente wandeln Intelligenz anteilig in Angriffskraft und Zauberschaden (Geistige Gewandtheit, Geistige Schnelligkeit).',
      groupDemand:
        'In Gruppen immer willkommen, und laut den Guides will jede Nahkampfgruppe einen Schamanen für das Totem des Windzorns, auch wenn jede Schamanen-Spec dieselben Totems mitbringt.',
      hybridTax: 'Schamanen gelten als Hybride, daher macht Verstärkung als Schadens-Spec rund 5 % weniger Schaden.',
      levelingDowntime:
        'Laut den Guides setzt Verstärkung auf Waffenangriffe, ohne viel Mana zu verbrauchen, und ein Talent lässt sie zudem Mana aus Willenskraft regenerieren (Verbesserter Sturmschlag).',
      procs:
        'Nahkampfangriffe sammeln per Proc Aufladungen bis zum sofortigen Blitzschlag (Waffe des Mahlstroms), und Waffe des Windzorns bringt weitere Procs.',
      pvpBattleground: 'Macht im Nahkampf Druck, hat aber wenig CC.',
      pvpWorld: 'Robust und mit Sturmschlag stark im Duell.',
      range:
        'Kämpft im Nahkampf; die Entwickler wollen etwas Zauberwirken dazwischen, und Waffe des Mahlstroms macht Blitzschlag sofort.',
      rangeWeave:
        'Mischt mit Schocks und Blitzschlägen aus Waffe des Mahlstroms etwas Zauberwirken in den Nahkampf, wirkt sie aber aus Nahkampfreichweite, sodass sich die Position kaum ändert.',
      roleHealer:
        'Kann als Hybrid heilen, aber Waffe des Mahlstroms beschleunigt bewusst nur Blitzschlag, keine Heilzauber.',
      roleMeleeDps: 'Schamanen können effektive Nahkampf-Schadensverursacher sein.',
      roleRangedDps:
        'Eine Nahkampf-Spec, die Zauber einstreut: Nahkampfangriffe sammeln Aufladungen, die die Zauberzeit von Blitzschlag verkürzen (Waffe des Mahlstroms), und die Entwickler wollen, dass sich Verstärkung nach mehr als reinem Nahkampf anfühlt.',
      roleTank:
        'Kann in kleinen Gruppen zeitweise tanken, da ein Talent die Bedrohung erhöht, solange Waffe des Felsbeißers genutzt wird (Waffen der Geister), ist aber keine vollwertige Tank-Spec.',
      selfHeal: 'Kann sich selbst heilen, wie Hybride dank ihrer Manaleiste.',
      singleTarget:
        'Trifft ein Ziel mit Sturmschlag alle 8 Sek. und sofortigen Blitzschlägen (Waffe des Mahlstroms). Der Schaden ist konkurrenzfähig, wie auch die Guides erwarten, als Hybrid aber rund 5 % niedriger.',
      soloLeveling: '„Eine sehr starke Leveling-Spec“, die auf Waffenangriffe setzt, ohne viel Mana zu verbrauchen.',
      tabTargetTank: 'Kann in kleinen Gruppen als zeitweiser Tank dienen, hat aber keine Tank-Spezialisierung.',
      threatControl:
        'Erzeugt weniger Bedrohung: ein tiefes Verstärkung-Talent senkt die erzeugte Bedrohung um 30 %, solange Waffe des Felsbeißers nicht genutzt wird (Waffen der Geister).',
      autoAttack:
        'Kämpft mit Autoangriffen einer Zweihandwaffe: jeder Nahkampfangriff kann Aufladungen sammeln (Waffe des Mahlstroms), ein Cooldown erhöht das Angriffstempo (Zorn des Scharfsehers), und die Entwickler mischen nur etwas Zauberwirken bei, das den Autoangriff nicht stört.',
    },
    'shaman-restoration': {
      soloEndgame:
        'Dank Kettenrüstung und Schild eine der robustesten Klassen, aber ohne wirksamen CC. Wiederherstellung überlebt durch Heilung, macht aber sehr wenig Schaden; laut den Guides kann sie mit einem verlangsamenden Schock einen starken Nahkampf-Elite zu Tode kiten (Frostschock), doch das ist die Ausnahme.',
      weaponCaster:
        'Wiederherstellung heilt mit Zaubern wie Springflut und Kettenheilung, und Waffen für Zauberwirker gewähren Heilung; dabei heilt sie meist mit Einhandwaffe und Schild statt mit einem Stab.',
      healHot:
        'Heilt über Zeit mit einer sofortigen Heilung, die nachheilt (Springflut, 6 Sek. Abklingzeit), und einem Totem, das Gruppenmitglieder in der Nähe heilt (Totem des heilenden Flusses). Laut den Guides ist eine kurz abklingende Heilung über Zeit eine der drei Heilungen, die Wiederherstellung braucht.',
      healDirect:
        'Heilt einzelne Ziele mit Welle der Heilung, die ein Talent verstärkt (Weg der Heilung), und Springflut heilt das Ziel sofort; laut den Guides umfasst der Werkzeugkasten eine Haupt-Einzelzielheilung neben einer Flächenheilung und einer Heilung über Zeit.',
      healGroup:
        'Heilt Gruppen und Raids mit einer Heilung, die zwischen Verbündeten springt (Kettenheilung), einem der einzigartigen Kettenzauber des Schamanen; auf dem Ziel von Springflut wirkt Kettenheilung 25 % stärker, und ein Totem heilt Gruppenmitglieder in der Nähe (Totem des heilenden Flusses).',
      healAbsorb:
        'Hat keinen Schild und keine Absorption für Verbündete; Wasserschild, ein Wiederherstellung-Talent, gibt nur dem Schamanen Mana. Ein Talent gibt Zielen kritischer Heilungen womöglich etwas Rüstung, eine leichte Form der Vorbeugung (Heilung der Ahnen).',
      slow: 'Kann Gegner mit einem Schock und einem Totem verlangsamen (Frostschock, Totem der Erdbindung): den Schock vor allem, um Schaden zu vermeiden oder zu entkommen, das Totem zur Flucht oder zum Kiten. Die Talente von Wiederherstellung bringen weder Wurzeln noch billigere Schocks.',
      dungeonUtility:
        'Kann Gefallene wiederbeleben (Geist der Ahnen) und Gifte und Krankheiten entfernen, auch mit Reinigungstotems, die Gruppenmitglieder in der Nähe 5 Min. lang heilen (Totem der Krankheitsreinigung), aber keine Flüche. Als Heiler hält Wiederherstellung diese Reinigungen im Kampf aufrecht.',
      escape:
        'Die Reiseform lässt sich nur im Freien und mit Zauberzeit nutzen (Geisterwolf), da das Talent, das dies ändert, im Verstärkung-Baum sitzt (Verbesserter Geisterwolf); ein Schock verlangsamt Gegner für die Flucht (Frostschock).',
      eliteSolo:
        'Mit Kettenrüstung und Schild robust, und ein verlangsamender Schock kann einen Nahkampf-Elite-Gegner kiten (Frostschock), aber als Heiler macht Wiederherstellung wenig Schaden, sodass ein gekiteter Elite-Gegner lange bis zum Tod braucht, und ohne effektiven CC bleiben wenige Auswege.',
      themeElements:
        'Schamanen stehen in direktem Kontakt zu den Elementen; Wiederherstellung heilt und neigt etwas mehr zur Natur.',
      aoe: 'Eine Heiler-Spec mit Flächenschaden nur durch Feuernova und Kettenblitzschlag; laut den Entwicklern schaffen Schamanen damit unter Manaeinsatz nur wenig Spaltschaden.',
      burst: 'Heiler-Spec mit wenig Schadensspitzen.',
      cc: 'Schamanen fehlt effektiver CC.',
      defAbsorb: 'Hat kaum Schilde oder Immunität, nur ein Totem, das einen Zauber umlenkt (Totem der Erdung).',
      defKite:
        'Kann Gegner mit einem Schock und einem Totem verlangsamen, um sie auf Abstand zu halten (Frostschock, Totem der Erdbindung).',
      defStand: 'Kettenrüstung und Schild machen Schamanen robust.',
      dotDamage: 'Hat einen einzigen DoT (Flammenschock).',
      gearDependency:
        'Hat schon vor Setboni ein starkes Grundrepertoire, und ihr Mana hängt weniger von der Ausrüstung ab: ein Selbstbuff gibt Mana, wenn ein Angriff den Schamanen trifft oder eine seiner Heilungen kritisch trifft (Wasserschild).',
      groupDemand:
        'Immer willkommen: ein Heiler mit raidweiten Totems, und laut den Guides ist die Klasse in jedem Raid sehr gefragt.',
      hybridTax:
        'Wiederherstellung ist eine Heiler-Spec, daher gilt der Schadensabzug für Hybrid-Schadens-Specs nicht.',
      levelingDowntime:
        'Kämpfe dauern lange und kosten Mana, da Wiederherstellung als Heiler wenig Schaden macht und Mana für Blitzschlag ausgibt; ein Selbstbuff gibt Mana, wenn ein Angriff den Schamanen trifft, und bei jedem kritischen Zauber (Wasserschild).',
      procs:
        'Wenig Procs zum Reagieren: ein Selbstbuff gibt Mana bei jedem kritischen Zauber, ein passiver Effekt (Wasserschild), und Heilungen reagieren auf eingehenden Schaden, nicht auf Procs.',
      pvpBattleground:
        'Ein robuster Heiler mit Kettenrüstung und Schild, der über die Gruppe heilt (Kettenheilung) und mit einem Totem einen Zauber umlenken kann (Totem der Erdung), aber wenig CC hat.',
      pvpWorld: 'Zäh, macht aber wenig Schaden.',
      range:
        'Heilt auf Distanz, aber Totems müssen die ganze Gruppe erreichen, was den Schamanen näher an der Gruppe hält; ein Zauber versetzt alle Totems an einen neuen Ort im Umkreis von 30 m, sie müssen also nicht im Nahbereich gesetzt werden (Totemische Projektion).',
      rangeWeave:
        'Heilt aus fester Distanz, und das Setzen der Totems verlangt keinen Weg dorthin: Ein Zauber versetzt sie bis zu 30 m weit (Totemische Projektion).',
      roleHealer: 'Heilt Gruppen und Raids, mit einer Heilung, die zwischen Verbündeten springt (Kettenheilung).',
      roleMeleeDps: 'Heiler-Spec ohne Nahkampf-Rolle.',
      roleRangedDps: 'Heiler-Spec ohne Fernkampf-Rolle.',
      roleTank: 'Kein Tank.',
      selfHeal:
        'Kann volle Heilzauber auch auf sich selbst wirken, dazu eine Sofortheilung mit Heilung über Zeit (Springflut).',
      singleTarget: 'Heiler-Spec mit wenig Schaden.',
      soloLeveling:
        'Mit Kettenrüstung und Schild robust, und Blitzschlag hat ab Rang 4 eine Zauberzeit von 2,5 Sek., was laut den Entwicklern Wiederherstellung beim Leveln hilft; als Heiler macht sie aber wenig Schaden, und die Guides empfehlen Leveln als Heiler nur, wenn man immer in einer Gruppe spielt.',
      threatControl: 'Ein Talent im eigenen Baum senkt die Bedrohung aller Zauber (Natürliche Anmut).',
      autoAttack: 'Die Heilung kommt aus Zaubern; Waffenschläge spielen fast keine Rolle.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof SHAMAN_SPECS>>;
