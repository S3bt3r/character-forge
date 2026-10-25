import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { ROGUE_SPECS } from '../../../data/specs/rogue';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Rogue, translation of the English notes in `src/data/specs/rogue.ts`. */
export const ROGUE_NOTES = {
  shared: {
    apm: 'Energie-Builder und Finisher füllen die meisten globalen Abklingzeiten, und ein Kampf-Talent macht Ausweiden billiger, die Energie reicht also weiter.',
    armor: 'Trägt Lederrüstung.',
    combatReset: 'Kann den Kampf beenden (Verschwinden).',
    deadZone: 'Kein Mindestabstand: Jede Nahkampffähigkeit funktioniert auch aus nächster Nähe.',
    defKite:
      'Hat wenig, um Gegner auf Abstand zu halten: Verkrüppelndes Gift gibt jedem Schlag eine Chance von 30 %, das Bewegungstempo 12 Sek. lang um 50 % zu verlangsamen, und es gibt keine Wurzeln oder Einfrieren.',
    defStand:
      'Trägt Leder und hat weder Schild noch Blocken oder Talente für Rüstung oder Gesundheit; der Schurke überlebt durch seine Verteidigungswerkzeuge statt durch Rüstung (Entrinnen, Verschwinden, Finte).',
    dungeonUtility: 'Kann weder Flüche, Gifte oder Krankheiten entfernen noch Gefallene wiederbeleben.',
    eliteSolo:
      'Kann beim Questen Gegnergruppen trennen, ohne die Verstohlenheit zu verlassen (Kopfnuss), und kann es überstehen, zu viele zu ziehen (Entrinnen), hat aber keine Heilung.',
    gearDependency:
      'Die Entwickler zählen Schurken zu den Klassen, die beim Leveln auf Ausrüstung und Waffen achten. Meucheln und Täuschung belohnen Dolche, aber Gifte und Blutungen tragen einen Teil ihres Schadens, und laut den Guides umgehen die Gifte von Meucheln die Rüstung.',
    groundZones: 'Keine Bodeneffekte oder Fallen.',
    healAbsorb: 'Keine Fähigkeit heilt andere.',
    healDirect: 'Keine Fähigkeit heilt andere.',
    healGroup: 'Keine Fähigkeit heilt andere.',
    healHot: 'Keine Fähigkeit heilt andere.',
    healingReduction:
      'Kann die Heilung auf einem Gegner senken: Jeder Treffer mit Wundgift hat eine Chance von 30 %, alle Heileffekte auf dem Gegner 15 Sek. lang zu senken, doch es ist ein sehr spezieller Einsatz, eher für PvP, daher nicht Teil jeder Ausstattung.',
    hybridFlex: 'Nahkampfschaden ist die einzige Rolle des Schurken; Schurken gelten nicht als Hybride.',
    hybridTax: 'Schurken gelten nicht als Hybride, daher gibt es keinen Schadensabzug für Hybride.',
    interrupt:
      'Kann einen gegnerischen Zauber unterbrechen und diese Magieschule 5 Sek. lang sperren (Tritt), ein wichtiges Werkzeug gegen Zauberwirker. Solarplexus und Nierenhieb unterbrechen ebenfalls, solange Tritt Abklingzeit hat.',
    levelingDowntime: 'Braucht zwischen den Kämpfen nur Essen für die Gesundheit, kein Mana.',
    pet: 'Kein Begleiter.',
    petControl: 'Kein Begleiter.',
    pvpBattleground: 'Stark beim Abfangen Einzelner, schwächer im offenen Gruppenkampf.',
    pvpWorld:
      'Verstohlenheit, Kontrolle und Burst erlauben dem Schurken, seine Kämpfe zu wählen; Ablenken senkt die Verstohlenheitsaufdeckung der Gegner, verrät gegnerischen Spielern aber auch einen Schurken in der Nähe.',
    raidUtility:
      'Laut den Guides bringen Schurken keinen Raid-Buff und keinen echten Raid-Beitrag über Schaden und Unterbrechungen hinaus (Tritt). Rüstung schwächen entspricht 5 Stapeln von Rüstung zerreißen eines Kriegers und blockiert es nicht, und laut den Guides sind beide gleichwertig.',
    range: 'Reiner Nahkämpfer.',
    rangeWeave: 'Bleibt im Nahkampf und wechselt nie in den Fernkampf.',
    reagentDependency:
      'Gifte sind Verbrauchsmaterial, das auf die Waffen aufgetragen wird, und haben viele Aufladungen, daher muss man nur gelegentlich nachkaufen; Meucheln stützt sich stark auf Gifte, doch ein Meucheln-Talent lässt sie oft ihre Aufladungen behalten.',
    resEnergy:
      'Energie ist die Ressource, und laut den Guides regeneriert sie fließend, nicht in Ticks; auf schnellere Energieregeneration angesprochen, planen die Entwickler derzeit keine Änderungen.',
    resMana: 'Schurken nutzen kein Mana.',
    resRage: 'Schurken nutzen keine Wut.',
    roleHealer: 'Keine Heilzauber.',
    roleMeleeDps:
      'Eine Nahkampf-Schadensklasse mit dem Potenzial für den höchsten Einzelziel-Nahkampfschaden im Spiel.',
    roleRangedDps: 'Nutzt eine Fernkampfwaffe nur zum Pullen.',
    roleTank: 'Kein Tank, keine Spottfähigkeit.',
    selfCleanse: 'Keine Fähigkeit entfernt Magie, Flüche, Gifte oder Krankheiten.',
    selfHeal: 'Keine Eigenheilung.',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    shapeshift: 'Kein Gestaltwandel.',
    slow: 'Kann fliehende Gegner verlangsamen: Verkrüppelndes Gift gibt jedem Schlag eine Chance von 30 %, das Bewegungstempo 12 Sek. lang um 50 % zu verlangsamen, unbezahlbar gegen Gegner, die bei wenig Gesundheit davonlaufen. Häufig, aber nicht sicher.',
    soloEndgame:
      'Schurken handeln aus der Verstohlenheit und schleichen an Gegnern vorbei; Verteidigungswerkzeuge helfen beim Überleben (Entrinnen, Verschwinden, Finte). Ohne Eigenheilung sind langes Farmen und Elite-Gegner teuer, und laut den Guides fehlt ihnen nennenswerter Spaltschaden.',
    soloLeveling:
      'Kann beim Questen aus der Verstohlenheit Kämpfe wählen und Gruppen trennen (Kopfnuss); langsame Energieregeneration und fehlende Heilung bremsen.',
    stealth:
      'Schurken sind die Meister der Verstohlenheit, mit eigenen Fähigkeiten, die aus ihr heraus wirken (Ablenken, Kopfnuss, Erdrosseln).',
    survivability:
      'Trägt Leder und hat keine Heilung, aber ordentliche Überlebenswerkzeuge (Entrinnen, Verschwinden, Finte).',
    tabTargetTank: 'Keine Tank-Klasse.',
    themeMartial:
      'Schurken bauen auf Verstohlenheit, Gifte und präzise Waffenangriffe. Kampf unterstützt alle Waffenarten und setzt auf hart treffenden Direktschaden; Meucheln ist auf Dolche spezialisiert, setzt aber auf Gifte; Täuschung setzt auf Kampftricks und Blutungen.',
    themeShadow:
      'Schurken sind die Meister der Verstohlenheit, deren Taten nie ans Licht kommen, und verlassen sich auf eine Mischung aus Verstohlenheit und ein wenig Mystik; Täuschung vertieft die Verstohlenheit durch ihre Talente und setzt auf Kampftricks.',
    threatControl: 'Kann die eigene Bedrohung senken (Finte).',
    totems: 'Keine Totems.',
    autoAttack:
      'Schurken verursachen viel Schaden mit Autoangriffen, Zerhäckseln und Giften; Meucheln ist als giftbetonter Spielstil um Verstümmeln gebaut und Täuschung um Kampftricks und Blutungen, daher kommt bei ihnen mehr Schaden aus Fähigkeiten.',

    weaponCaster: 'Schurken kämpfen mit Waffenangriffen und Giften, nicht mit Zaubern.',
    weaponDual:
      'Alle Schurken kämpfen mit einer Waffe in jeder Hand. Der Hauptschlag von Meucheln verlangt in jeder Hand einen Dolch; ein Kampf-Talent belohnt jede Einhandwaffenart, und zwei Schläge von Täuschung belohnen Dolche (Blutsturz, Geisterhafter Stoß).',
    weaponRanged:
      'Schurken schätzen lautlose Projektilwaffen, kämpfen aber im Nahkampf, wo sie das höchste Nahkampfschadenspotenzial gegen Einzelziele im Spiel haben; Bogen, Schusswaffe oder Wurfwaffe dienen vor allem zum Pullen.',
    weaponShield: 'Schurken können keinen Schild benutzen.',
    weaponTwoHand: 'Schurken benutzen keine Zweihandwaffen.',
  },
  specs: {
    'rogue-assassination': {
      themeShadow:
        'Schurken eliminieren bestimmte Ziele und sind dann am erfolgreichsten, wenn ihre Taten unentdeckt bleiben; Meucheln setzt auf Gifte und wirkt düster und tödlich, aber ohne verbotene Magie.',
      slow: 'Kann fliehende Gegner verlangsamen: Jeder Schlag kann Verkrüppelndes Gift auslösen, das das Bewegungstempo 12 Sek. lang um 50 % senkt. Toxin und ein Meucheln-Talent lassen das Gift öfter greifen und länger auf der Waffe bleiben.',
      apm: 'Energie-Builder und Finisher füllen die meisten globalen Abklingzeiten. Verstümmeln baut Combopunkte für Finisher auf, die vor allem Toxin und Zerhäckseln aufrechthalten, ein gleichmäßiger Ablauf mit wenigen zusätzlichen Eingaben.',
      raidUtility:
        'Laut den Guides bringen Schurken keinen Raid-Buff, nur Schaden und Unterbrechungen (Tritt). Rüstung schwächen wirkt wie das Rüstung zerreißen eines Kriegers, und ein Meucheln-Talent macht es billiger; ohne Krieger kann Meucheln den Debuff also abdecken.',
      aoe: 'Hat keine Angriffe, die mehrere Gegner treffen; der Spaltschaden der Schurken (Klingenwirbel) liegt im Kampf-Baum.',
      burst: 'Burst kommt von einem tiefen Meucheln-Talent, das auch auf den Hauptbuilder wirkt (Kaltblütigkeit).',
      cc: 'Kann einen Gegner aus der Verstohlenheit kontrollieren, ohne sie zu verlassen (Kopfnuss), dazu Blenden und Solarplexus, den ein Meucheln-Talent verbessert.',
      complexity:
        'Verstümmeln baut Combopunkte auf, um zwei Buffs aufrechtzuhalten (Zerhäckseln, Toxin); es gibt keine nennenswerten Cooldowns, der Großteil der Spec ist also nur das Aufrechthalten dieser beiden Buffs.',
      defAbsorb:
        'Ein Cooldown, um Schaden zu vermeiden, der das Ausweichen 15 Sek. lang um 50 % erhöht (Entrinnen); keine Barriere oder Immunität, und das Talent für mehr Parieren liegt im Kampf-Baum.',
      dotDamage:
        'Meucheln ist auf Gifte ausgerichtet: Toxin erhöht den Giftschaden um 30 %, Verbesserte Gifte lässt sie oft ihre Aufladungen behalten.',
      escape: 'Kann zur Flucht sprinten, ausweichen oder verschwinden (Sprinten, Entrinnen, Verschwinden).',
      execute: 'Hat keinen Bonusschaden gegen angeschlagene Gegner; das Talent dafür liegt im Täuschung-Baum (Exitus).',
      groupDemand:
        'Jeder Schurke ist wegen Verstohlenheit, Kontrolle und des höchsten möglichen Einzelziel-Nahkampfschadens in Gruppe und Raid gern gesehen. Laut den Guides hängt der Raidplatz von Meucheln ohne Raid-Buff am Schaden, und manche Kämpfe sind womöglich gegen Gifte immun.',
      positional:
        'Kämpft meist ohne Positionszwang: Der wichtigste Builder braucht Dolche, aber keine Position; nur ein Ersatzschlag von hinten (Meucheln) und die Opener aus der Verstohlenheit (Hinterhalt, Erdrosseln) verlangen den Rücken des Ziels.',
      procs:
        'Wenige Procs, auf die man reagiert: Verstümmeln und Gifte lösen bei Treffern Effekte aus, die aber von selbst wirken. Laut den Guides besteht die Spec größtenteils darin, Zerhäckseln und Toxin aufrechtzuhalten, ein vorhersehbarer Ablauf.',
      singleTarget:
        'Potenzial für den höchsten Einzelziel-Nahkampfschaden im Spiel; laut den Entwicklern machen Schurken in PvE-Kämpfen ohne viel Bewegung den höchsten Einzelziel-Schaden und tragen keinen Schadensabzug für Hybride, und laut den Guides bremst Giftimmunität Meucheln.',
      stun: 'Zwei zuverlässige Betäubungen: eine aus der Verstohlenheit für 4 Sek. (Fieser Trick) und ein Finisher (Nierenhieb), dazu eine weitere Handlungsunfähigkeit. Ein Meucheln-Talent bringt während des Nierenhiebs mehr Schaden, aber keine Betäubung.',
    },
    'rogue-combat': {
      soloEndgame:
        'Kampf handelt aus der Verstohlenheit und schleicht an Gegnern vorbei; Verteidigungswerkzeuge helfen beim Überleben (Entrinnen, Verschwinden, Finte). Ohne Eigenheilung kosten langes Farmen und Elite-Gegner Zeit; laut den Guides hat Kampf nennenswerten Spaltschaden.',
      themeShadow:
        'Schurken sind Meister der Verstohlenheit, deren Taten unentdeckt bleiben, doch Kampf setzt auf hart treffenden Direktschaden.',
      autoAttack:
        'Schurken verursachen viel Schaden mit Autoangriffen, Zerhäckseln und Giften, und laut den Guides ist Kampf eine auf Autoangriffe ausgerichtete Spec, die sich weder auf Gifte noch auf Blutungen stützt.',
      gearDependency:
        'Der Schaden kommt großteils aus Waffenschlägen, die Waffe zählt also viel, und ein Kampf-Talent gibt jeder Einhandwaffenart einen Bonus, sodass jede bessere Waffe zählt, die droppt.',
      survivability:
        'Trägt Leder und hat keine Heilung, aber ordentliche Überlebenswerkzeuge (Entrinnen, Verschwinden, Finte), und ein Kampf-Talent erhöht die Parierchance.',
      soloLeveling:
        'Kann beim Questen aus der Verstohlenheit Kämpfe wählen und Gruppen trennen (Kopfnuss); langsame Energieregeneration und fehlende Heilung bremsen, und ein Kampf-Talent erhöht die Parierchance.',
      pvpWorld:
        'Verstohlenheit, Kontrolle und Burst erlauben dem Schurken, seine Kämpfe zu wählen; laut den Guides hat Kampf ordentlichen Burst.',
      aoe: 'Trifft weitere Gegner nur mit etwas Spaltschaden (Klingenwirbel).',
      burst:
        'Ordentlicher Burst: Zwei Cooldowns und eine aktive Volksfähigkeit lassen den Schurken den Schaden am Anfang bündeln oder für eine Burn-Phase aufheben (Klingenwirbel, Adrenalinrausch).',
      cc: 'Kann einen Gegner aus der Verstohlenheit kontrollieren, ohne sie zu verlassen (Kopfnuss), dazu zwei weitere Kontrollfähigkeiten (Blenden, Solarplexus).',
      complexity:
        'Recht geradlinig: Ein Builder-Schlag bringt Combopunkte, die vor allem in einen Buff fließen (Zerhäckseln), überschüssige in einen Schadensfinisher; dazu zwei große Cooldowns, die man am besten sofort und möglichst gemeinsam einsetzt (Klingenwirbel, Adrenalinrausch).',
      defAbsorb:
        'Ein Kampf-Talent erhöht die Parierchance um bis zu 5 % (Abwehr), dazu ein Cooldown für Ausweichen (Entrinnen); keine Barriere und keine Immunität.',
      dotDamage:
        'Kampf konzentriert sich auf harten Direktschaden; laut den Guides stützt sich die Spec weder auf Gifte noch auf Blutungen, und Blutung passt wahrscheinlich nicht in ihre Rotation. Tödliches Gift auf einer Waffe ist möglich.',
      escape:
        'Kann zur Flucht sprinten, ausweichen oder verschwinden, und ein Kampf-Talent senkt die Abklingzeit von Sprinten und Entrinnen um bis zu 60 %, beide Fluchtwerkzeuge sind also öfter bereit.',
      execute: 'Hat keinen Bonusschaden gegen angeschlagene Gegner; das Talent dafür liegt im Täuschung-Baum (Exitus).',
      groupDemand:
        'Jeder Schurke ist in jeder Gruppe und jedem Raid gern gesehen; laut den Guides bringt Kampf keinen Raid-Buff mit, sein Raidplatz hängt also am Schaden.',
      positional:
        'Unterstützt sowohl einen Build um Finsterer Stoß, der keine Position verlangt, als auch einen Build um Meucheln; die Guides sehen Finsterer Stoß als Standard, Meucheln und die Opener aus der Verstohlenheit von hinten.',
      procs:
        'Wenige Procs, auf die man reagiert: Ein Kampf-Talent gibt Schwertern und Äxten eine Chance auf einen Extra-Angriff, der von selbst wirkt und keine Reaktion verlangt (Niedermetzeln). Laut den Guides ist die Spec recht geradlinig: Ein Schlag baut Combopunkte für die Finisher auf (Finsterer Stoß).',
      singleTarget:
        'Potenzial für den höchsten Einzelziel-Nahkampfschaden im Spiel; laut den Entwicklern machen Schurken in PvE-Kämpfen ohne viel Bewegung den höchsten Einzelziel-Schaden. Laut den Guides braucht Kampf weder Gifte noch Blutungen, Immunitäten bremsen ihn also nie.',
      stun: 'Zwei zuverlässige Betäubungen: eine aus der Verstohlenheit für 4 Sek. (Fieser Trick) und ein Finisher (Nierenhieb), dazu eine weitere Handlungsunfähigkeit; ein Meucheln-Talent bringt während des Nierenhiebs mehr Schaden, aber keine Betäubung.',
    },
    'rogue-subtlety': {
      groundZones:
        'Die einzige am Boden platzierte Fähigkeit ist Ablenken, und ein Täuschung-Talent vergrößert ihren Wirkungsbereich; keine dauerhaften Bodeneffekte oder Fallen.',
      survivability:
        'Trägt Leder und hat keine Heilung, aber ordentliche Überlebenswerkzeuge (Entrinnen, Verschwinden, Finte), und ein Täuschung-Talent verbilligt zwei Kontrollfähigkeiten deutlich, was hilft, Schaden zu vermeiden.',
      pvpWorld:
        'Verstohlenheit, Kontrolle und Burst erlauben dem Schurken, seine Kämpfe zu wählen, und ein Täuschung-Talent verbilligt Kopfnuss und Blenden deutlich.',
      pvpBattleground:
        'Billigere Kontrolle hilft gegen einzelne Ziele: Ein Täuschung-Talent verbilligt Kopfnuss und Blenden deutlich.',
      apm: 'Energie-Builder und Finisher füllen die meisten globalen Abklingzeiten. Täuschung hält drei Effekte aufrecht (Blutsturz, Blutung, Zerhäckseln) und verschwindet mitten im Kampf, um an weitere Fähigkeiten aus der Verstohlenheit zu kommen.',
      aoe: 'Hat keine Angriffe, die mehrere Gegner treffen; der Spaltschaden der Schurken (Klingenwirbel) liegt im Kampf-Baum.',
      burst: 'Burst kommt von Konzentration, einem tiefen Täuschung-Talent, dessen Wirkung 20 Sek. hält.',
      cc: 'Kann einen Gegner aus der Verstohlenheit kontrollieren, ohne sie zu verlassen (Kopfnuss), und ein Täuschung-Talent verbilligt Kopfnuss und Blenden deutlich.',
      complexity:
        'Verlangt etwas mehr Nuancen: Blutsturz aufrechthalten, damit er Blutung verstärkt, und mitten im Kampf verschwinden, um an Fähigkeiten aus der Verstohlenheit zu kommen; die Entwickler planen Todesmal als 31-Punkte-Talent von Täuschung.',
      defAbsorb:
        'Ein Cooldown, um Schaden zu vermeiden, der das Ausweichen 15 Sek. lang um 50 % erhöht (Entrinnen); keine Barriere oder Immunität, und das Talent für mehr Parieren liegt im Kampf-Baum.',
      dotDamage:
        'Täuschung setzt auf Kampftricks und Blutungen: Blutsturz verstärkt Blutung, und jeder Tick von Blutung verbilligt den nächsten Builder (Tausend Schnitte). Laut den Guides hält Täuschung Blutung aufrecht; sie trägt viel vom Schaden, aber nicht den ganzen Spielstil.',
      escape:
        'Kann zur Flucht sprinten, ausweichen oder verschwinden (Sprinten, Entrinnen, Verschwinden); Täuschung-Talente verbessern die Verstohlenheit und verbilligen Blenden deutlich, die Flucht mit Verschwinden und Blenden gelingt also zuverlässiger.',
      execute:
        'Ein mäßiger passiver Bonus gegen angeschlagene Gegner: Ein Täuschung-Talent lässt drei Builder-Schläge an Zielen unter 35 % Gesundheit mehr Schaden verursachen (Exitus), laut den Guides 10 % mehr; Meucheln zählt nicht dazu.',
      groupDemand:
        'Jeder Schurke ist wegen Verstohlenheit, Kontrolle und des höchsten möglichen Einzelziel-Nahkampfschadens in Gruppe und Raid gern gesehen. Laut den Guides hängt der Raidplatz von Täuschung ohne Raid-Buff am Schaden, und manche Kämpfe sind womöglich gegen Blutungen immun.',
      positional:
        'Kann im Build um einen Schlag ohne Positionszwang von jeder Seite kämpfen, und ein Talent erlaubt Erdrosseln auch von vorn; Hinterhalt und Meucheln verlangen weiterhin den Rücken des Ziels.',
      procs:
        'Ein Proc, auf den man reagiert: Mit einem Talent erlaubt Meucheln manchmal, den nächsten Hinterhalt im Kampf ohne Verstohlenheit einzusetzen; das dient einem Build um Meucheln, während die Guides Combopunkte mit Blutsturz aufbauen. Zwei weitere Talente lösen immer aus und verlangen keine Reaktion.',
      singleTarget:
        'Laut den Entwicklern machen Schurken in PvE-Kämpfen ohne viel Bewegung den höchsten Einzelziel-Schaden; laut den Guides dürfte Täuschung beim Schaden mithalten, ihre PvE-Tauglichkeit sei aber weitgehend Spekulation.',
      stun: 'Zwei zuverlässige Betäubungen: eine aus der Verstohlenheit für 4 Sek. (Fieser Trick) und ein Finisher (Nierenhieb), dazu eine weitere Handlungsunfähigkeit; ein Meucheln-Talent bringt während des Nierenhiebs mehr Schaden, aber keine Betäubung.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof ROGUE_SPECS>>;
