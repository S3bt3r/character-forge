import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { PALADIN_SPECS } from '../../../data/specs/paladin';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Paladin, translation of the English notes in `src/data/specs/paladin.ts`. */
export const PALADIN_NOTES = {
  shared: {
    gearDependency:
      'Heilig braucht keine Trefferchance von der Ausrüstung: Plattenrüstung für Heiler soll keine tragen, daher gewährt ein Heilig-Talent bis zu 18 % Trefferchance mit Heiligzaubern (Göttliche Präzision).',
    armor: 'Plattenrüstung ab Level 40.',
    combatReset: 'Kann sich kurz immun machen, um aus einem missglückten Kampf herauszukommen (Gottesschild).',
    complexity:
      'Richturteil verbraucht das aktive Siegel nicht, und ein Vergeltung-Talent lässt den nächsten Schlag nach einem Siegelwechsel beide Siegel tragen, mit nachsichtigem Timing (Siegeldrehen, Wendung des Lichts).',
    deadZone: 'Kein Mindestabstand: Jede Fähigkeit funktioniert auch aus nächster Nähe.',
    defKite: 'Paladine können Gegner nicht verlangsamen.',
    dotDamage: 'Jeder Paladin lernt geweihten Boden, der Gegner darin über Zeit schädigt (Weihe).',
    dungeonUtility:
      'Entfernt Gift, Krankheit und Magie von Verbündeten und kann Gefallene wiederbeleben (Läuterung, Erlösung).',
    eliteSolo: 'Robust, aber wenig Schaden.',
    execute:
      'Ein Finisher gegen Gegner unter 20 % Gesundheit (Hammer des Zorns); angeschlagene Ziele sind eine Stärke des Paladins.',
    groundZones: 'Ein Bodeneffekt zum Platzieren, den jeder Paladin mit Level 20 lernt (Weihe).',
    healAbsorb:
      'Kein Absorptionsschild für Verbündete; die Schilde des Paladins schützen nur ihn selbst (Bollwerk des Templers, Siegel des Furors). Im Notfall kann er einen Verbündeten gegen körperlichen Schaden immun machen (Segen des Schutzes).',
    healDirect:
      'Jeder Paladin kann andere mit direkten Heilungen und einer Notfallheilung mit 20 Min. Abklingzeit heilen (Lichtblitz, Heiliges Licht, Handauflegung), aber Hybride sollen keine guten Heiler sein, und Schutz heilt einen Verbündeten nur im Notfall, da das Tanken vorgeht.',
    healGroup:
      'Ohne Heilig-Talente kein Gruppenheilzauber. Ein Richturteil kann jeden Angriff auf das Ziel den Angreifer etwas heilen lassen (Richturteil des Lichts), doch Schutz nutzt sein Richturteil mit dem Tank-Siegel zum Spotten (Siegel des Furors) und heilt die Gruppe daher nur nebenbei.',
    healHot:
      'Kein Zauber des Paladins heilt über Zeit; Heilig heilt stattdessen direkt, hält ein Ziel am Leben (Lichtblitz) oder heilt sofort die ganze Gruppe eines Verbündeten (Lichtwacht, Heiliger Schock).',
    healingReduction: 'Keine Möglichkeit, die Heilung zu verringern, die ein Gegner erhält.',
    hybridFlex:
      'Paladine können tanken, Schaden machen und heilen und können äußerst effektive Tanks, wettbewerbsfähige Schadensverursacher und die stärksten Einzelzielheiler im Spiel sein.',
    interrupt: 'Paladine haben keine Unterbrechung.',
    levelingDowntime:
      'Heilig heilt sich selbst, muss aber für Mana pausieren; als Heiler-Spec ist es auf sparsamen Manaeinsatz ausgelegt, daher kommen die Pausen seltener.',
    pet: 'Kein Begleiter.',
    petControl: 'Kein Begleiter.',
    positional:
      'Keine Fähigkeit verlangt eine Position: Heilig heilt aus der Distanz, und Schutz tankt mit dem Gesicht zum Gegner.',
    procs:
      'Ein Auslöser, auf den man reagiert: Kritische Treffer mit Heiliger Schock oder Lichtblitz verkürzen die Zauberzeit des nächsten Zaubers Heiliges Licht.',
    raidUtility:
      'Buffs für den ganzen Raid: Widerstandsauren erreichen jedes Raidmitglied im Umkreis von 30 m, und Onyxias Hort verlangt Feuerwiderstand; jeder Paladin hat Segen der Könige, und ein Buff, der die Bedrohung senkt, schließt keinen Segen aus (Rettung).',
    range: 'Schutz und Vergeltung kämpfen im Nahkampf; Paladine haben nur beschränkte Fernkampffähigkeiten.',
    rangeWeave: 'Kein Wechsel zwischen Nah- und Fernkampf.',
    reagentDependency:
      'Einige Zauber verbrauchen Reagenzien: große Segen brauchen Symbol der Könige und Göttliches Eingreifen braucht Symbol der Göttlichkeit; Wiederbeleben braucht keins.',
    resEnergy: 'Paladine nutzen keine Energie.',
    resMana: 'Mana ist die einzige Ressource.',
    resRage: 'Paladine nutzen keine Wut.',
    roleRangedDps: 'Schutz und Vergeltung kämpfen im Nahkampf; Paladine haben nur beschränkte Fernkampffähigkeiten.',
    selfCleanse: 'Entfernt Gift, Krankheit und Magie von sich selbst, aber keine Flüche (Läuterung).',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    shapeshift: 'Kein Gestaltwandel.',
    slow: 'Paladine können Gegner nicht verlangsamen.',
    soloEndgame:
      'Schutz kann ein äußerst effektiver Tank sein und übersteht Gruppen und Elite-Gegner allein, doch Farmen geht langsam: Der Flächenschaden wächst kaum mit der Zaubermacht (Weihe), Gegner lassen sich nicht verlangsamen, und laut den Guides muss Schutz oft auf Mana warten.',
    stealth: 'Keine Verstohlenheit.',
    stun: 'Kann einen Gegner 6 Sek. lang betäuben (Hammer der Gerechtigkeit), und ein Siegel gibt jedem Nahkampfangriff eine Chance auf Betäubung.',
    survivability:
      'Kann sich immun machen und hat eine Notfallheilung mit 20 Min. Abklingzeit (Gottesschild, Handauflegung).',
    tabTargetTank: 'Heilig und Vergeltung tanken nicht als Hauptrolle.',
    themeArcane: 'Arkane Magie gehört nicht zum Thema des Paladins.',
    themeElements: 'Die Elemente gehören nicht zum Thema des Paladins.',
    themeFel:
      'Dämonen gehören nicht zum Thema des Paladins: Paladine bekämpfen Dämonen, statt dämonische Magie zu nutzen, und sind sehr stark gegen Untote und Dämonen.',
    themeLight: 'Paladine rufen das Licht an.',
    themeMartial:
      'Paladine sind für sich genommen starke Krieger, die auch das Licht anrufen. Schutz kämpft im Nahkampf und schlägt mit seiner Waffe zu (Heiliger Stoß), doch ein großer Teil seiner Bedrohung stammt aus Heiligschaden.',
    themeNature: 'Die Natur gehört nicht zum Thema des Paladins.',
    themeShadow:
      'Schattenmagie gehört nicht zum Thema des Paladins: Paladine bekämpfen die Mächte der Schatten, statt sie zu nutzen.',
    totems: 'Keine Totems.',

    weaponCaster:
      'Das Spiel von Heilig beruht auf Magie: Es heilt mit Zaubern (Lichtblitz, Heiliges Licht, Heiliger Schock) und erhält zauberfokussierten Schaden, trägt aber Plattenrüstung, Einhandwaffe und Schild und streut Waffentreffer ein.',
    weaponDual: 'Paladine können keine Waffe in jeder Hand führen.',
    weaponRanged: 'Paladine können weder Bogen noch Schusswaffe benutzen.',
    weaponShield:
      'Schutz tankt mit Einhandwaffe und Schild: Der Absorptionsschild seines Siegels braucht einen ausgerüsteten Schild, Blocks stellen Mana wieder her, und ein Talent erhöht den Schaden von Einhandwaffen (Siegel des Furors, Schildspezialisierung).',
    weaponTwoHand:
      'Keine der beiden kämpft mit einer Zweihandwaffe: Heilig heilt mit Zaubern und schwingt die Waffe nur für Heiliger Stoß, und Schutz tankt mit Einhandwaffe und Schild, was ein Talent und das Tank-Siegel belohnen (Siegel des Furors).',
  },
  specs: {
    'paladin-holy': {
      roleRangedDps:
        'Heilig-Talente stützen Hybrid-Builds rund um den Zauber Heiliger Schock für gelegentlichen Schaden aus der Distanz, doch die Kernaufgabe ist die Heilung, und Paladine haben nur beschränkte Fernkampffähigkeiten.',
      soloEndgame:
        'Plattenrüstung und die stärkste Einzelzielheilung im Spiel halten Heilig am Leben, und Bonusheilung bringt etwas Bonusschaden; doch der Schaden bleibt gering, und Paladine können Gegner nicht verlangsamen und haben begrenzte Fernkampffähigkeiten, daher geht Farmen langsam.',
      weaponShield:
        'Heilig trägt meist eine Einhandwaffe mit Schild, heilt aber mit Zaubern, und kein Heilig-Talent belohnt den Schild; Heiliger Stoß fügt gelegentlich einen Waffentreffer hinzu.',
      themeMartial:
        'Paladine sind für sich genommen starke Krieger, doch Heilig baut seine Talente auf Heilung und zauberbasierten Schaden.',
      themeArcane:
        'Heilig ist ein Zauberwirker, schöpft seine Macht aber aus dem Licht (Heiliger Schock, Lichtwacht), und keiner seiner Zauber ist arkan.',
      healDirect:
        'Die stärksten Einzelzielheiler im Spiel: Heilig hält ein Ziel am Leben, und kritische Treffer mit Lichtblitz oder Heiliger Schock verkürzen die Zauberzeit der nächsten langen Heilung um bis zu 1 Sek. (Lichtinfusion).',
      healGroup:
        'Eine ganze Gruppe auf einmal zu heilen erfordert Planung: Nach der Vorbereitung eines Verbündeten (Lichtwacht) heilt der nächste Einsatz von Heiliger Schock auf ihm sofort seine ganze Gruppe, aber die Vorbereitung macht es schwer, damit auf Schaden zu reagieren.',
      healAbsorb:
        'Kein Absorptionsschild für Verbündete; Heilig verhindert Schaden an anderen nur mit einem Notfallknopf, der einen Verbündeten immun gegen körperlichen Schaden macht (Segen des Schutzes).',
      stun: 'Kann einen Gegner 6 Sek. lang betäuben (Hammer der Gerechtigkeit); das Siegel mit Chance auf Betäubung wirkt auf Nahkampfangriffe, die Heilig als Heiler selten ausführt.',
      raidUtility:
        'Buffs für den ganzen Raid: Widerstandsauren erreichen jedes Raidmitglied im Umkreis von 30 m, jeder Paladin hat Segen der Könige, und Rettung senkt die Bedrohung zusätzlich zu einem Segen. Laut den Guides sind die Siegel-Debuffs, die ein Paladin auf dem Ziel hält, für Gruppe und Raid wichtig.',
      survivability:
        'Kann sich immun machen und hat eine Notfallheilung mit 20 Min. Abklingzeit (Gottesschild, Handauflegung), dazu volle Heilzauber mit starker Einzelzielheilung.',
      pvpBattleground:
        'Die stärksten Einzelzielheiler im Spiel, und ein Talent macht Heilig 6 Sek. lang immun gegen Stille und Unterbrechungen, bei 3 Min. Abklingzeit (Stimme der Wahrheit); doch Heilig hat keine Unterbrechung und keine Möglichkeit, Gegner zu verlangsamen.',
      complexity:
        'Laut den Guides ist der Kern einfach, aber es gibt recht viele Fähigkeiten: Segen, Buffs, Auren und Siegel. Die Gruppenheilung ist reaktiv schwer einzusetzen, da sie viel Vorbereitung braucht (Lichtwacht).',
      burst: 'Heiler-Spec mit wenig Schadensspitzen.',
      aoe: 'Flächenschaden kommt von geweihtem Boden, der die ersten 4 Gegner moderat und alle weiteren sehr gering trifft und kaum mit der Zaubermacht wächst (Weihe); als Heiler-Spec spielt dieser Schaden für Heilig eine kleine Rolle.',
      apm: 'Heilen reagiert den ganzen Kampf über auf eingehenden Schaden.',
      cc: 'Eine Betäubung und CC gegen Untote (Hammer der Gerechtigkeit, Untote vertreiben); Heiliger Zorn betäubt außerdem Untote und Dämonen 2 Sek. lang.',
      defAbsorb:
        'Kann sich selbst immun machen oder einen Verbündeten immun gegen körperlichen Schaden (Gottesschild, Segen des Schutzes).',
      defStand:
        'Plattenrüstung und ein Schild, der blocken kann, und eine Paladin-Aura gibt zusätzliche Rüstung, aber keine Schutz-Talente für Blocken oder Verteidigung, daher bringt der Schild allein wenig.',
      escape:
        'Ein Segen gegen bewegungseinschränkende Effekte oder Immunität zur Flucht (Segen der Freiheit, Gottesschild).',
      groupDemand: 'Heilig ist ein fähiger Heiler in allen Arten von Gruppen.',
      hybridTax: 'Heilig ist eine Heiler-Spec, daher gilt der Schadensabzug für Hybrid-Schadens-Specs nicht.',
      roleHealer:
        'Starker Einzelziel-Heiler (Lichtblitz); eine ganze Gruppe zu heilen braucht Planung. Ein Talent macht Heilig immun gegen Stille und Unterbrechungen (Stimme der Wahrheit).',
      range: 'Heilt auf Zauberreichweite; Heilig-Talente erhöhen die Reichweite, aber nur begrenzt.',
      roleMeleeDps: 'Heilig verursacht kaum Nahkampfschaden.',
      roleTank:
        'Jeder Paladin hat das Tank-Siegel mit Spott (Siegel des Furors), Heilig-Talente stützen aber kein Tanken.',
      selfHeal: 'Der volle Satz an Heilzaubern, mit starker Einzelzielheilung.',
      singleTarget:
        'Ordentlicher Schaden beim Leveln; Heilig-Talente und Ausrüstung stützen eine Schadens-Spielweise rund um den Zauber Heiliger Schock („Shock-adin“).',
      soloLeveling:
        'Selbstständig mit guter Heilung, sehr guten Defensivfähigkeiten und ordentlichem Schaden, das macht das Leveln sehr reibungslos; als Heiler-Spec braucht Heilig länger, um Gegner zu töten.',
      threatControl:
        'Kann die Bedrohung eines Gruppenmitglieds senken (Rettung), was keinen Segen ausschließt; das Talent, das die eigene Bedrohung eines Paladins senkt, ist ein Vergeltung-Talent (Rechtsvollstrecker).',
      autoAttack:
        'Heilig wirkt Zauber statt Waffenschlägen; jeder Paladin hat einen Waffenschlag mit 10 Sek. Abklingzeit (Heiliger Stoß).',
    },
    'paladin-protection': {
      weaponCaster:
        'Schutz kämpft mit Waffe und Schild, aber Siegel des Furors fügt jedem Schlag Heiligschaden hinzu, der mit der Zaubermacht wächst.',
      themeLight:
        'Paladine rufen das Licht an, und Schutz tankt mit Heiligschaden (Siegel des Furors, Heiliger Stoß, Weihe).',
      rangeWeave:
        'Ein Nahkampf-Tank; unter Siegel des Furors spottet Richturteil auf 10 m, so erreicht Schutz Gegner etwas weiter entfernt, bleibt sonst aber im Nahkampf.',
      procs:
        'Nichts, worauf man reagieren muss: Die Auslöser wirken von selbst, etwa eine Chance, nach erlittenen Treffern öfter zu blocken (Verschanzen), und Aufladungen, die der nächste Autoangriff als Extraangriffe auslöst (Abrechnung).',
      eliteSolo:
        'Lange Kämpfe gegen Elite-Gegner werden sicherer: Jeder Schlag gibt einen Absorptionsschild (Siegel des Furors), ein Cooldown einen Schild in Höhe der vollen Gesundheit (Bollwerk des Templers), und ein Schutz-Talent gibt Mana zurück, wenn die Siegel-Schilde aufgebraucht sind. Der Schaden bleibt gering.',
      survivability:
        'Kann sich immun machen und hat eine Notfallheilung mit 20 Min. Abklingzeit (Gottesschild, Handauflegung), dazu einen Schild, der Schaden in Höhe der vollen Gesundheit absorbiert (Bollwerk des Templers), und ein Talent für bis zu 20 Verteidigung.',
      pvpWorld: 'Robust, aber langsamer Schaden.',
      pvpBattleground: 'Tank-Spec: robust, aber langsamer Schaden.',
      groundZones:
        'Ein Bodeneffekt zum Platzieren (Weihe), den Schutz oft setzt, um die Bedrohung von 4 Gegnern gleichzeitig zu halten.',
      gearDependency:
        'Waffe und Schild prägen Bedrohung und Mana: Das Tank-Siegel fügt jedem Schlag gleichbleibenden Heiligschaden hinzu, was eine schnelle Waffe begünstigt, und Blocks stellen Mana wieder her (Siegel des Furors, Schildspezialisierung).',
      aoe: 'Flächenschaden durch geweihten Boden, der die ersten 4 Gegner moderat und alle weiteren sehr gering trifft und kaum mit der Zaubermacht wächst (Weihe); Schutz hält ihn aufrecht, um Bedrohung zu halten, doch der Schaden bleibt auf Tank-Niveau.',
      apm: 'Paladine haben viele freie globale Abklingzeiten, und Heiliger Stoß hat bewusst eine lange Abklingzeit; Schutz füllt sie mit Heiliger Stoß, der dank eines Talents den erlittenen Schaden senkt, und mit Weihe und Richturteil für Bedrohung.',
      cc: 'Eine Betäubung und CC gegen Untote (Hammer der Gerechtigkeit, Untote vertreiben); Heiliger Zorn betäubt außerdem Untote und Dämonen 2 Sek. lang.',
      complexity:
        'Als Tank einfach zu erlernen, aber die Siegel müssen Bedrohung, Mana, Heilung und Debuffs auf dem Ziel ausbalancieren, und beim Tanken muss das Mana verwaltet werden.',
      defAbsorb:
        'Ein Cooldown absorbiert 8 Sek. lang Schaden in Höhe der vollen Gesundheit (Bollwerk des Templers), jeder Schlag gibt einen Absorptionsschild (Siegel des Furors), und der Paladin kann sich immun machen (Gottesschild); ein Schutz-Talent verkürzt beide Abklingzeiten.',
      defStand: 'Plattenrüstung und Schild, und ein Talent gibt bis zu 20 Verteidigung (Erwartung).',
      escape:
        'Ein Segen gegen bewegungseinschränkende Effekte oder Immunität zur Flucht (Segen der Freiheit, Gottesschild).',
      groupDemand:
        'Paladine können äußerst effektive Tanks sein, und Schutz kann auch Raids tanken, da sein Richturteil unter dem Tank-Siegel das Ziel verspottet (Siegel des Furors).',
      levelingDowntime:
        'Das Mana muss in langen Kämpfen sorgfältig verwaltet werden, und Schutz wartet oft auf Mana, bevor er neue Gegner angreift; Blocks stellen höchstens einmal alle 3 Sek. 4 % Mana wieder her (Schildspezialisierung).',
      hybridTax: 'Schutz ist eine Tank-Spec, daher gilt der Schadensabzug für Hybrid-Schadens-Specs nicht.',
      roleHealer: 'Hat Heilzauber auch ohne Heilig-Talente, ist aber nicht aufs Heilen ausgelegt.',
      roleMeleeDps: 'Wenig Nahkampfschaden als Tank.',
      roleTank:
        'Ein effektiver Tank, mit einem Tank-Siegel (Siegel des Furors) und einem Buff, der die Bedrohung durch Heiligschaden um 90 % erhöht (Zorn der Gerechtigkeit).',
      selfHeal:
        'Hybride können sich dank Manaleiste selbst heilen: Jeder Paladin hat direkte Heilungen und eine Notfallheilung mit 20 Min. Abklingzeit (Lichtblitz, Heiliges Licht, Handauflegung), aber laut den Guides muss Schutz in langen Kämpfen sein Mana sorgfältig verwalten.',
      soloLeveling: 'Robust, aber langsamer Schaden.',
      tabTargetTank:
        'Erzeugt mit geweihtem Boden zuverlässig Bedrohung bei 4 Gegnern gleichzeitig (Weihe); bei mehr als 4 muss Schutz das Ziel wechseln, und ein Schutz-Talent beendet die Abklingzeit von Richturteil, so kann Schutz mehrere Gegner schnell verspotten.',
      threatControl:
        'Kann die Bedrohung eines Gruppenmitglieds senken (Rettung), was keinen Segen ausschließt; sonst keine eigenen Werkzeuge, um Bedrohung zu senken.',
      autoAttack:
        'Jeder Nahkampfschwung fügt Heiligschaden aus dem Tank-Siegel hinzu, was eine schnelle Waffe begünstigt (Siegel des Furors), und ein Talent sammelt Aufladungen, die der nächste Autoangriff als Extraangriffe auslöst (Abrechnung); Schutz baut Bedrohung auch mit Fähigkeiten wie Weihe auf.',
    },
    'paladin-retribution': {
      positional:
        'Keine Fähigkeit verlangt eine Position, aber als Nahkampf-Schadensverursacher steht Vergeltung hinter dem Gegner und umgeht so dessen Parieren und Blocken. Ein bekannter Beta-Fehler lässt Gegner aus kurzer Distanz auch von hinten parieren und blocken; etwas Abstand vermeidet das.',
      soloEndgame:
        'Plattenrüstung, Eigenheilung und Notfallknöpfe (Handauflegung, Segen des Schutzes) machen Vergeltung allein schwer zu töten; gegen Untote und Dämonen ist sie sehr stark. Gegner lassen sich nicht verlangsamen, und laut den Guides ist der kleine Manapool schnell leer und erzwingt Pausen.',
      weaponCaster:
        'Vergeltung ist ein waffenführender Champion des Lichts, der Waffenangriffe mit Heiligschaden verbindet, und ein Talent erhöht seinen Zauberschaden um bis zu 30 % der Intelligenz (Champion des Lichts).',
      weaponShield:
        'Vergeltung kämpft mit einer Zweihandwaffe, die ein Vergeltung-Talent belohnt; ein Schild kommt höchstens zum Offtanken zum Einsatz.',
      weaponTwoHand:
        'Vergeltung ist der waffenführende Champion des Lichts und kämpft mit einer Zweihandwaffe, deren Schaden ein Vergeltung-Talent um bis zu 6 % erhöht; ein Teil des Schadens ist Heiligschaden aus Siegeln und einem Talent (Champion des Lichts).',
      healDirect:
        'Kann nebenbei und im Notfall andere heilen (Lichtblitz, Handauflegung), aber die Entwickler halten Heiltalente bewusst von Vergeltung fern, und laut den Guides ist die Heilung ohne Talentwechsel schwach.',
      healGroup:
        'Eine dünne passive Gruppenheilung: Ein Talent lässt Heiliger Stoß alle Richturteile auf dem Ziel erneuern (Heiliger Richter), so hält Vergeltung das Richturteil aufrecht, das Angreifer ein wenig heilt (Richturteil des Lichts); die Entwickler halten Heiltalente bewusst von Vergeltung fern.',
      rangeWeave:
        'Eine Nahkampf-Spec mit beschränkten Fernkampffähigkeiten; ein Hybrid-Build kann auf Heiliger Schock für zauberbasiertes Spiel aus der Distanz setzen, aber Vergeltung bleibt meist im Nahkampf.',
      pvpWorld: 'Nahkampf-Schadensverursacher, robust mit Eigenheilung.',
      aoe: 'Vergeltung verursacht mit geweihtem Boden etwas Flächenschaden (Weihe); einen Cleave-Angriff haben ihr die Entwickler bewusst nicht gegeben.',
      burst:
        'Im PvP kommt der Schaden vermutlich vor allem zu Kampfbeginn, aber ohne großen Schadens-Cooldown; ein Talent macht den Abschlusstreffer gegen angeschlagene Ziele zum Sofortzauber (Rechtsvollstrecker, Hammer des Zorns).',
      apm: 'Paladine haben viele freie globale Abklingzeiten, bewusst offen gelassen, um reagieren zu können, etwa mit einer Notfallheilung (Handauflegung).',
      cc: 'Eine Betäubung, ein Werkzeug gegen Untote und ein Talent für einen weiteren CC-Effekt (Hammer der Gerechtigkeit, Untote vertreiben, Buße); keine Unterbrechung und keine Möglichkeit, Gegner zu verlangsamen, und laut den Guides ist der CC „sehr begrenzt“, mit recht langen Abklingzeiten.',
      defAbsorb:
        'Kann sich selbst immun machen oder einen Verbündeten immun gegen körperlichen Schaden (Gottesschild, Segen des Schutzes).',
      defStand:
        'Plattenrüstung und eine Paladin-Aura, die zusätzliche Rüstung gibt, aber Zweihandwaffe statt Schild, daher kein Blocken.',
      escape: 'Bewegt sich dank eines Talents 15 % schneller (Streben nach Gerechtigkeit).',
      gearDependency:
        'Stark ausrüstungsabhängig, vor allem beim Stapeln von Zaubermacht, und ein Talent wandelt nur bis zu 30 % der Intelligenz in Zauberschaden um (Champion des Lichts).',
      execute:
        'Ein Finisher gegen Gegner unter 20 % Gesundheit (Hammer des Zorns), den ein Vergeltung-Talent zum Sofortzauber macht und so die Stärke des Paladins gegen angeschlagene Ziele betont (Rechtsvollstrecker).',
      groupDemand:
        'Ein Talent hält alle Richturteile auf dem Ziel aufrecht, auch die anderer Paladine, was der Gruppe erheblichen Nutzen bringt (Heiliger Richter); laut den Guides fehlt ein großer Schadens-Cooldown, daher nehmen Gruppen Vergeltung vor allem für ihren Nutzen mit.',
      hybridTax:
        'Als Hybrid-Schadens-Spec macht Vergeltung rund 5 % weniger Schaden; als Hybride gelten alle Klassen außer Jäger, Magier, Schurke und Hexenmeister.',
      procs:
        'Wenig, worauf man reagieren muss: Ein Schadensbuff durch kritische Treffer hält 30 Sek. und stapelt bis zu 3-mal (Rache).',
      levelingDowntime:
        'Kleiner Manapool, der schnell leerläuft, daher trotz Eigenheilung Manapausen zwischen Kämpfen.',
      raidUtility:
        'Buffs und Debuffs für den Raid: Ein Talent hält drei Richturteile gleichzeitig aufrecht (Heiliger Richter), ein anderes lässt Nahkampfangriffe die Angriffskraft des Ziels senken (Rechtschaffene Schwächung); dazu raidweite Widerstandsauren und Segen der Könige.',
      roleHealer: 'Vergeltung kann heilen, als Hybrid-Schadens-Spec aber bewusst nur mäßig.',
      roleMeleeDps: 'Ein starker Nahkampf-Schadensverursacher.',
      roleTank: 'Vergeltung kann mit Zorn der Gerechtigkeit als Offtank einspringen.',
      selfHeal:
        'Hybride können sich dank Manaleiste selbst heilen: Jeder Paladin hat direkte Heilungen und eine Notfallheilung mit 20 Min. Abklingzeit (Lichtblitz, Heiliges Licht, Handauflegung), aber Vergeltung heilt nicht dauerhaft, und ihr Mana bezahlt auch die Siegel.',
      singleTarget:
        'Paladine können wettbewerbsfähige Schadensverursacher sein, und ein Talent gibt 30 % der Intelligenz als Zauberschaden (Champion des Lichts); laut den Guides ist der Einzelzielschaden moderat, und die Guides nennen Vergeltung einen fähigen Schadensverursacher.',
      soloLeveling:
        'Plattenrüstung ab Level 40, Eigenheilung und Notfallknöpfe (Handauflegung, Segen des Schutzes) machen das Leveln sicher; ein Waffenschlag bringt zusätzlichen Schaden, den ein Talent erhöht (Heiliger Stoß). Laut den Guides kann der kleine Manapool schnell leerlaufen und begrenzt das Tempo.',
      threatControl:
        'Ein Vergeltung-Talent senkt sämtliche Bedrohung um 20 %, solange die Bedrohungssteigerung fürs Tanken aus ist (Rechtsvollstrecker, Zorn der Gerechtigkeit), und Rettung senkt die Bedrohung eines Gruppenmitglieds, ohne einen Segen auszuschließen.',
      themeMartial:
        'Vergeltung ist ein waffenführender Champion des Lichts, der Waffenangriffe mit Heiligschaden verbindet, und Siegel fügen jedem Nahkampfschwung Schaden hinzu.',
      autoAttack:
        'Autoangriffe tragen die Spielweise, so ist es gewollt: Siegel fügen jedem Nahkampfschwung Schaden oder Effekte hinzu, und ein Talent lässt den nächsten Schlag nach einem Siegelwechsel beide Siegel tragen (Wendung des Lichts); Heiliger Stoß und Richturteil verursachen eigenen Schaden.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof PALADIN_SPECS>>;
