import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { PRIEST_SPECS } from '../../../data/specs/priest';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Priest, translation of the English notes in `src/data/specs/priest.ts`. */
export const PRIEST_NOTES = {
  shared: {
    themeArcane:
      'Priester schöpfen aus Licht und Schatten statt aus arkaner Magie; ihr einziger Arkanzauber ist eine Volksfähigkeit der Nachtelfen (Sternensplitter).',
    apm: 'Zauber mit Zauberzeiten bestimmen das Tempo. Disziplin schiebt Zauber mit kurzer Abklingzeit zwischen ihre Heilungen (Sühne, Machtwort: Schild), Heilig bindet Gebet der Besserung ein und wechselt zwischen Heilungen, und Schatten wirkt und kanalisiert vor allem seine Zauber.',
    armor: 'Auf Stoffrüstung beschränkt.',
    cc: 'Jeder Priester hat CC (Psychischer Schrei); Schatten kann mit einem Talent zusätzlich ein Ziel zum Schweigen bringen (Stille).',
    combatReset:
      'Verringert die Bedrohung 10 Sek. lang (Verblassen), danach kehrt die gesamte Bedrohung zurück, daher beendet es keinen Kampf; kein Talent verbessert es, und Priester haben keinen anderen Weg, den Kampf zu beenden.',
    deadZone: 'Kein Mindestabstand: Jeder Zauber funktioniert auch aus nächster Nähe.',
    defKite:
      'Priester haben wenige Fluchtmöglichkeiten, und Disziplin und Heilig haben kein eigenes Einfrieren, keine Wurzeln und keine Verlangsamung. Nur Zwergen-Priester können einen Humanoiden kurz festhalten, 2 Sek. lang bei 2 Min. Abklingzeit (Züchtigung).',
    defStand: 'Auf Stoffrüstung beschränkt; etwas Rüstung durch Inneres Feuer.',
    escape: 'Trägt nur Stoff und hat wenige Möglichkeiten, Gegnern zu entkommen.',
    gearDependency:
      'Heilende Priester brauchen keine Trefferchance von der Ausrüstung: ein Talent erhöht die Trefferchance von Heiligzaubern um bis zu 18 % (Heilige Präzision), da von heilenden Priestern keine Ausrüstung mit Trefferchance erwartet wird.',
    groundZones: 'Keine Bodeneffekte.',
    healAbsorb:
      'Heilig kann Verbündete mit einem Schild umgeben, der Schaden absorbiert (Machtwort: Schild), was kein anderer Heiler kann. Für Heilig ist das ein echter, aber untergeordneter Teil eines gemischten Werkzeugkastens.',
    healDirect:
      'Heilig heilt direkt und über Zeit (Blitzheilung, Große Heilung) und mit einem Talent, das den Priester und sein Ziel zugleich heilt (Verbindende Heilung): ein volles Werkzeug für Direktheilung, doch laut den Guides ist Heilig auf Raidheilung ausgelegt.',
    healGroup:
      'Heilt die ganze Gruppe des Ziels auf einmal, Begleiter eingeschlossen (Gebet der Heilung). Die Entwickler sehen wohl die Stärke von Disziplin darin, einen Tank am Leben zu halten; laut den Guides stärken ihre Talente die Einzelzielheilung, und ihre Flächenheilung ist nur in Ordnung.',
    healHot:
      'Hat eine sofortige Heilung über Zeit, die mehrere Priester auf demselben Ziel halten können (Erneuerung), aber die Talente von Disziplin gehen in Schilde und Sühne statt in Heilungen über Zeit.',
    healingReduction:
      'Priester können die Heilung, die ein Gegner erhält, nicht verringern; nur Troll-Priester senken sie um 20 % (Verhexung der Schwäche).',
    hybridFlex:
      'Kann heilen oder Schattenschaden verursachen, zwei der drei Rollen, aber kein Tank; die Duale Spezialisierung gibt es ab Level 40. Ein Build mit Heiliger Pein macht Schaden und heilt und kann in Dungeons heilen.',
    pet: 'Kein Begleiter.',
    petControl: 'Kein Begleiter.',
    positional: 'Keine Fähigkeit verlangt eine Position.',
    range: 'Zauber reichen rund 30 m weit, und die Gruppenheilung reicht 40 m (Gebet der Heilung).',
    rangeWeave: 'Feste Distanz als Zauberwirker.',
    reagentDependency: 'Gruppenbuffs verbrauchen Kerzen, dazu werden Federn verbraucht.',
    resEnergy: 'Priester nutzen keine Energie.',
    resMana: 'Mana ist die einzige Ressource.',
    resRage: 'Priester nutzen keine Wut.',
    roleMeleeDps: 'Priester kämpfen nicht im Nahkampf.',
    roleTank: 'Kein Tank.',
    selfCleanse:
      'Kann Magie und Krankheiten entfernen, aber keine Gifte oder Flüche (Magie bannen, Krankheit heilen); Schatten nutzt beide auch in Schattengestalt, da die Gestalt nur Heilungen sperrt.',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    soloEndgame:
      'Disziplin setzt auf Schilde (Machtwort: Schild), laut den Guides eine unverwüstliche Solo-Spec, der kaum ein Elite-Gegner gefährlich wird. Dennoch sind Priester in Stoffrüstung sehr verwundbar, haben wenig Fluchtwege und brauchen Freunde, die tanken oder kontrollieren.',
    stealth: 'Keine Verstohlenheit als Klassenfähigkeit.',
    stun: 'Kann nicht betäuben; Zwergen-Priester können einen Humanoiden nur 2 Sek. lang festhalten und ihm dabei Schaden zufügen (Züchtigung).',
    tabTargetTank: 'Keine Tank-Klasse.',
    themeLight: 'Priester schöpfen Macht aus Licht und Schatten.',
    themeShadow:
      'Priester schöpfen Macht aus Licht und Schatten, und jeder Priester hat Schattenzauber (Schattenwort: Tod, Verschlingende Seuche); für Schatten sind sie der Kern. Disziplin belohnt zudem, einen Schatten-DoT auf dem Ziel zu halten (Macht im Licht).',
    threatControl:
      'Kann die Bedrohung senken (Verblassen), und ein Disziplin-Talent senkt die Bedrohung aller Zauber um 30 % (Schweigsame Entschlossenheit); kein Talent verbessert Verblassen.',
    totems: 'Keine Totems.',
    autoAttack:
      'Kämpft mit Zaubern statt Waffenschlägen. Beim Leveln ist der Zauberstab ein fester Bestandteil, doch Zauberstäbe skalieren nicht mit Zauberschaden und brauchen 0,5 Sek. Stillstand.',

    weaponCaster:
      'Disziplin, Heilig und Schatten kämpfen alle mit Zaubern als vielseitige Zauberwirker, und Waffen für Zauberwirker gewähren Zauberschaden und Heilung.',
    weaponDual: 'Priester sind vielseitige Zauberwirker und kämpfen mit Zaubern, nicht mit Waffen.',
    weaponRanged:
      'Priester sind vielseitige Zauberwirker und greifen mit Zaubern an, nicht mit Bogen oder Schusswaffe.',
    weaponShield: 'Priester sind vielseitige Zauberwirker und kämpfen mit Zaubern, nicht mit Waffen.',
    weaponTwoHand:
      'Priester sind vielseitige Zauberwirker und kämpfen mit Zaubern, nicht mit Waffen; ein Stab dient ihren Zaubern, nicht wuchtigen Schlägen.',
  },
  specs: {
    'priest-discipline': {
      themeArcane:
        'Disziplin schöpft aus dem Licht, mit einer schwachen Verbindung zu roher magischer Energie: ihre Talente beschleunigen Manabrand und stärken Sternensplitter, den Arkanzauber der Priester der Nachtelfen.',
      healDirect:
        'Heilt einzelne Verbündete direkt, etwa mit einem kanalisierten Talent, das jede Sekunde heilt (Sühne). Die Entwickler sehen die Stärke von Disziplin wohl darin, einen Tank am Leben zu halten, und laut den Guides stärken ihre Talente die Einzelzielheilung.',
      healAbsorb:
        'Schilde, die Schaden absorbieren, sind die große Stärke von Disziplin, und ihre Talente setzen noch stärker darauf, etwa mit einem Schild nach kritischen Heilungen (Göttliche Aegis). Laut den Guides sind es die besten Absorptionen im Spiel.',
      defStand:
        'Nur Stoffrüstung, mit etwas zusätzlicher Rüstung durch Inneres Feuer, das ein Disziplin-Talent verstärkt (Verbessertes inneres Feuer).',
      aoe: 'Kaum Flächenschaden; der einzige Flächenschadenszauber ist ein Heilig-Talent und braucht Punkte außerhalb des Disziplin-Baums (Heilige Nova).',
      burst: 'Eine Heiler-Spec, deren Schadenszauber nur kleine Spitzen bringen (Sühne, Heilige Pein).',
      complexity:
        'Leicht zu erlernen, mit genug Komplexität, um interessant zu bleiben; Schilde verlangen Timing rund um Geschwächte Seele.',
      defAbsorb: 'Schilde, die Schaden absorbieren, sind die große Stärke von Disziplin.',
      dotDamage:
        'Hat zwei Zauber für Schaden über Zeit (Verschlingende Seuche, Schattenwort: Schmerz); die Seuche lernt jeder Priester mit Level 20.',
      dungeonUtility:
        'Kann Krankheiten heilen und Gefallene außerhalb des Kampfes wiederbeleben, aber keine Gifte oder Flüche entfernen (Krankheit heilen).',
      eliteSolo:
        'Eine unverwüstliche Solo-Spec: starke Überlebenswerkzeuge und ordentlicher Schaden, daher wird kaum ein Elite-Gegner gefährlich.',
      execute:
        'Jeder Priester lernt mit Level 32 einen sofortigen Schattenschadenszauber (Schattenwort: Tod), der den Priester aber verletzt, wenn das Ziel überlebt.',
      groupDemand:
        'Die Entwickler sehen wohl die Stärke von Disziplin darin, einen Tank am Leben zu halten; laut den Guides gibt es keine Probleme, als Heiler in Gruppen eingeladen zu werden, und gute Chancen, in vielen Raid-Aufstellungen vorzukommen.',
      hybridTax:
        'Disziplin ist eine Heiler-Spec, daher gilt der Schadensabzug von rund 5 % für Hybrid-Schadens-Specs nicht.',
      interrupt: 'Kann keine Zauber unterbrechen; das kann nur ein Schatten-Talent (Stille).',
      levelingDowntime:
        'Pausen für Mana nach Kämpfen sind üblich; ein Talent erhält beim Zaubern 50 % der Manaregeneration durch Willenskraft (Meditation).',
      procs:
        'Wenige Effekte, auf die man reagieren muss: nicht-periodische kritische Heilungen erzeugen von selbst einen Absorptionsschild (Göttliche Aegis), und die Hauptzauber laufen über Abklingzeiten (Sühne, Machtwort: Schild).',
      pvpBattleground:
        'Heilt direkt und über Zeit und schirmt Verbündete mit den besten Absorptionen im Spiel ab (Machtwort: Schild). Ein Talent heilt Verbündete oder schadet Gegnern jede Sekunde (Sühne). Im Battleground gleichen Verbündete die wenigen Fluchtwege aus.',
      pvpWorld:
        'Sühne sei einfach gut, hieß es im offiziellen Podcast zum PvP-Turnier der Community; laut den Entwicklern sind die Klassenänderungen nicht für dieses Turnier gemacht.',
      raidUtility:
        'Bringt Buffs, die jeder Priester hat: Göttlicher Wille ab Level 30 und Machtwort: Seelenstärke, die so gut ist, dass Gruppen dafür einen Priester mitnehmen.',
      roleHealer: 'Vielseitigster Heiler: HoTs, Direktheilung, Absorptionsschilde.',
      roleRangedDps:
        'Schaden bleibt eine Nebenrolle: ein Talent lässt zwei ihrer Schadenszauber härter treffen, wenn das Ziel Heiliges Feuer oder Schattenwort: Schmerz trägt (Macht im Licht).',
      selfHeal: 'Volle Heilzauber auch auf sich selbst.',
      shapeshift: 'Kein Gestaltwandel.',
      singleTarget: 'Heiler-Spec mit ordentlichem Schaden (Heilige Pein, Sühne).',
      slow: 'Kann Gegner nicht verlangsamen; die einzige Verlangsamung der Priester bringt ein Schatten-Talent (Gedankenschinden).',
      soloLeveling:
        'Starke Überlebenswerkzeuge und ordentlicher Schaden machen Disziplin zu einer unverwüstlichen Solo-Spec und einer großartigen, um allein in der Welt unterwegs zu sein.',
      survivability:
        'Überlebt dank starker Schilde und Heilung sehr gut, trotz Stoffrüstung und wenig Fluchtmöglichkeiten.',
    },
    'priest-holy': {
      soloEndgame:
        'Laut den Entwicklern ist ein Heilig-Build, der mit Heiliger Pein Schaden macht und heilt, großartig für die offene Welt. Volle Heilung kostet aber viel Schaden (Hybrid-Steuer), und Priester sind in Stoffrüstung sehr verwundbar und haben wenig Fluchtwege, daher bleibt das Töten langsam.',
      healHot:
        'Heilt über Zeit neben Direktheilungen: Erneuerung kann von mehreren Priestern auf demselben Ziel aktiv sein und kritisch treffen, und laut den Guides ist sie ein Werkzeug neben Direktheilungen, Gruppenheilungen und Schilden.',
      healGroup:
        'Heilt viele Verbündete zugleich, laut den Entwicklern wohl die Stärke von Heilig: Gebet der Heilung erfasst die ganze Gruppe des Ziels, Gebet der Besserung springt beim Heilen von Verbündetem zu Verbündetem, Heilige Nova heilt Gruppenmitglieder in der Nähe.',
      threatControl:
        'Kann die Bedrohung senken (Verblassen) und mit geringer Bedrohung heilen (Verbindende Heilung), aber kein Talent von Heilig senkt die Bedrohung allgemein, und kein Talent verbessert Verblassen.',
      escape:
        'Stoffrüstung und wenige Fluchtmöglichkeiten; laut den Guides verlangen die meisten Heilungen Stillstand beim Zaubern, und nur wenige wirken in der Bewegung.',
      themeLight: 'Priester schöpfen Macht aus Licht und Schatten; Heilig schöpft aus dem Licht.',
      aoe: 'Der einzige Flächenschaden ist ein Sofortzauber mit 10 m Reichweite (Heilige Nova), und Schaden von Heiligem Feuer kann ihn kostenlos machen (Sengendes Licht).',
      burst: 'Heiler-Spec mit wenig Schadensspitzen.',
      complexity:
        'Zugänglich für neue Spieler: mehrere Heilzauber, und der Wechsel zwischen ihnen erstattet Mana (Litanei des Lichts).',
      defAbsorb:
        'Kann einen Schild aufbauen, der Schaden absorbiert (Machtwort: Schild); unter den Heilern haben nur Priester Absorptionsschilde.',
      dotDamage:
        'Hat zwei Zauber für Schaden über Zeit (Verschlingende Seuche, Schattenwort: Schmerz); die Seuche lernt jeder Priester mit Level 20.',
      dungeonUtility:
        'Kann Krankheiten heilen und Gefallene außerhalb des Kampfes wiederbeleben, aber keine Gifte oder Flüche entfernen (Krankheit heilen).',
      eliteSolo: 'Schilde und Heilung halten lange durch, Schaden fehlt.',
      execute:
        'Jeder Priester lernt mit Level 32 einen sofortigen Schattenschadenszauber (Schattenwort: Tod), der den Priester aber verletzt, wenn das Ziel überlebt.',
      groupDemand:
        'Die Entwickler sehen wohl die Stärke von Heilig darin, eine ganze Gruppe auf einmal zu heilen, und laut den Guides zählt es zu den stärksten PvE-Heilern.',
      hybridTax:
        'Heilig ist eine Heiler-Spec, daher gilt der Schadensabzug für Hybrid-Schadens-Specs nicht; nur ein Build mit Heiliger Pein, der Schaden macht, zahlt eine hohe Hybrid-Steuer dafür, die volle Heilung zu behalten.',
      interrupt: 'Kann keine Zauber unterbrechen; das kann nur ein Schatten-Talent (Stille).',
      levelingDowntime:
        'Manaintensiv: der Wechsel zwischen Heilungen erstattet einen Teil der Manakosten (Litanei des Lichts), aber wer einen Zauber wiederholt, leert die Leiste, was häufige Pausen nach Kämpfen bedeutet.',
      procs:
        'Wenige Effekte, auf die man reagieren muss: jede nicht-periodische kritische Heilung löst Inspiration aus, und ein Talent kann die nächste Heilige Nova kostenlos machen (Sengendes Licht).',
      pvpBattleground:
        'Der vielseitigste Heiler: Direktheilung, Heilung über Zeit und Absorptionsschilde, die kein anderer Heiler hat. Stoffrüstung und wenig Gesundheit machen Heilig zu einem bevorzugten Ziel für Nahkämpfer.',
      pvpWorld: 'Wenig Schaden im Duell.',
      raidUtility:
        'Bringt Buffs jedes Priesters: Göttlicher Wille, Furchtzauberschutz und Machtwort: Seelenstärke, so gut, dass Gruppen dafür einen Priester mitnehmen. Das 31-Punkte-Talent des Disziplin-Baums, das einem Verbündeten mehr Schaden und Heilung gibt, erreicht Heilig nicht.',
      roleHealer:
        'Ein vollwertiger Heiler, dessen Stärke die Entwickler wohl darin sehen, eine ganze Gruppe auf einmal zu heilen, unterstützt von einer Heilung, die zwischen Verbündeten springt (Gebet der Besserung).',
      roleRangedDps:
        'Kann mit einem Build mit Heiliger Pein Schaden machen, den die Entwickler als Spielweise wollen, aber schwächer als die Specs, die für Schaden gedacht sind.',
      selfHeal:
        'Volle Heilzauber wirken auch auf einen selbst, und eine Heilung trifft den Priester und sein Ziel zugleich (Verbindende Heilung).',
      shapeshift: 'Kein Gestaltwandel.',
      singleTarget:
        'Eine Heiler-Spec; Builds mit Heiliger Pein haben das Potenzial, sehr stark zu sein, bleiben aber unter den Specs, die für Schaden gedacht sind, da sie für ihre volle Heilung eine hohe Hybrid-Steuer zahlen.',
      slow: 'Kann Gegner nicht verlangsamen; die einzige Verlangsamung der Priester bringt ein Schatten-Talent (Gedankenschinden).',
      soloLeveling:
        'Die Entwickler nennen Builds mit Heiliger Pein großartig zum Questen: Schaden und Heilung in einem.',
      survivability:
        'Volle Heilung, doch Priester sind eine sehr verwundbare Klasse in Stoffrüstung mit wenig Fluchtmöglichkeiten, und laut den Guides ist Heilig ein bevorzugtes Ziel für Nahkämpfer.',
    },
    'priest-shadow': {
      soloEndgame:
        'Macht Schaden über Zeit auf Distanz und heilt damit seine Gruppe, mit 30 Sek. Abklingzeit (Vampirumarmung); laut den Guides tragen Werkzeuge zur Manaregeneration wohl durch lange Farm-Sitzungen. Doch Priester sind in Stoffrüstung sehr verwundbar und haben wenig Fluchtwege.',
      healHot:
        'Schattengestalt erlaubt keine Heilungen, daher muss Schatten sie für eine Heilung über Zeit verlassen (Erneuerung); in Gestalt wird die Gruppe nur als Nebenwirkung des Schattenschadens geheilt, jeweils 30 Sek. lang (Vampirumarmung).',
      healDirect:
        'Schattengestalt erlaubt alle Zauber außer Heilungen, daher können Schattenpriester in Gestalt nicht heilen und geben im Spiel als Schatten keine Direktheilung an andere.',
      healGroup:
        'Heilt die Gruppe als Nebenwirkung seines Schadens über seine vampirischen Fähigkeiten: ein Talent, das 30 Sek. hält, bei 30 Sek. Abklingzeit (Vampirumarmung).',
      healAbsorb:
        'Schattengestalt erlaubt alle Zauber außer Heilungen, und der Schild zählt vermutlich dazu (Machtwort: Schild), daher kann Schatten gelegentlich einen Verbündeten abschirmen, spielt aber auf Schaden.',
      threatControl:
        'Kann die Bedrohung senken (Verblassen), und ein Schatten-Talent senkt die Bedrohung von Schattenzaubern; kein Talent verbessert Verblassen. Laut den Guides erzeugen Gedankenschlag und Verschlingende Seuche viel Bedrohung.',
      gearDependency:
        'Der Schaden skaliert mit Zaubermacht auf der Ausrüstung, und Schattengestalt halbiert die Manakosten von Schattenzaubern, daher ist Schatten weniger auf Willenskraft und Mana aus der Ausrüstung angewiesen.',
      defKite:
        'Verlangsamt ein Ziel mit einem kanalisierten Zauber (Gedankenschinden), und ein Talent steigert den Schaden mit jedem Tick (Verbessertes Gedankenschinden); darüber hinaus haben Priester wenige Fluchtmöglichkeiten, und Schatten hat keine eigenen Wurzeln und kein eigenes Einfrieren.',
      themeLight:
        'Priester schöpfen Macht aus Licht und Schatten; Schatten schöpft aus der Schattenseite, das Licht bleibt fern.',
      aoe: 'Wenig Flächenschaden: stirbt ein Ziel mit der Seuche, springt sie auf 2 neue Gegner innerhalb von 5 m über (Verschlingende Ansteckung, Verschlingende Seuche).',
      burst:
        'Burst kommt von Gedankenschlag und Schattenwort: Tod, und Schattengestalt verdoppelt den Krit-Bonus, auch für Schattenwort: Tod.',
      complexity:
        'Zugänglich für neue Spieler: einen Zauber für Schaden über Zeit auf dem Ziel halten (Schattenwort: Schmerz) und Gedankenschinden kanalisieren.',
      defAbsorb:
        'Kann einen Schild aufbauen, der Schaden absorbiert (Machtwort: Schild); unter den Heilern haben nur Priester Absorptionsschilde.',
      dotDamage:
        'Schatten setzt auf Schaden über Zeit, und seine Seuche springt auf neue Gegner über, wenn ein Ziel stirbt (Verschlingende Ansteckung).',
      dungeonUtility:
        'Kann Krankheiten heilen und Gefallene außerhalb des Kampfes wiederbeleben, aber keine Gifte oder Flüche entfernen (Krankheit heilen); Schattengestalt sperrt nur Heilungen, daher heilt Schatten Krankheiten auch in Gestalt.',
      eliteSolo: 'DoTs, Vampirumarmung und Psychischer Schrei machen Elite-Gegner machbar.',
      execute:
        'Kann angeschlagene Gegner erledigen: Jeder Priester lernt einen sofortigen Schadenszauber (Schattenwort: Tod), und ein Schatten-Talent erhöht dessen kritische Trefferchance gegen Ziele unter 20 % Gesundheit (Vorzeitiges Ableben); laut den Guides eine Schadensnische für Schatten.',
      groupDemand:
        'Wird vor allem für den Schaden mitgenommen und zahlt als Hybrid-Schadens-Spec die Hybrid-Steuer; Schattenwirken hilft nur dem eigenen Schaden. Laut den Guides ist die Eignung für Endgame-Raids unklar, mit Fokus auf dem eigenen Schaden, und in Schattengestalt kann Schatten nicht heilen.',
      hybridTax:
        'Als Hybrid-Schadens-Spec macht Schatten rund 5 % weniger Schaden; als Hybride gelten alle Klassen außer Jäger, Magier, Schurke und Hexenmeister.',
      interrupt: 'Ein Schatten-Talent bringt ein Ziel zum Schweigen (Stille).',
      levelingDowntime: 'Schattengestalt halbiert die Manakosten von Schattenzaubern, aber erst ab Level 40.',
      procs:
        'Der Schaden läuft über DoTs und Abklingzeiten, mit wenig, auf das man reagieren muss: jeder Gedankenschlag und jedes voll kanalisierte Gedankenschinden löst Dunkle Inspiration aus, und das Talent, durch das das Ziel mehr Schaden vom Priester erleidet, kann nicht fehlschlagen.',
      pvpBattleground:
        'Setzt Gegner mit Schaden über Zeit unter Druck und bringt CC und ein Schweigen mit (Psychischer Schrei, Stille).',
      pvpWorld:
        'Stark im Solo-PvP: ein Werkzeugkasten, der sich besonders gut für Duelle eignet, wenn auch in Stoffrüstung; Vampirumarmung hat 30 Sek. Abklingzeit.',
      raidUtility:
        'Bringt Seelenstärke und etwas Gruppenheilung, und Dunkle Inspiration erhöht die Willenskraft der Gruppe; kein Mana für die Gruppe, und Schattenwirken hilft nur dem eigenen Schaden.',
      roleHealer: 'Schatten heilt die Gruppe nebenbei über Vampirfähigkeiten; kein Haupt-Heiler.',
      roleRangedDps: 'Schattenpriester verursachen Schaden über Zeit als Hauptaufgabe.',
      range:
        'Zauber reichen rund 30 m weit, und ein Talent für 2 Punkte verlängert offensive Schattenzauber um 20 % (Schattenreichweite).',
      selfHeal:
        'Schattengestalt erlaubt keine Heilzauber, daher heilt sich Schatten nur nach Verlassen der Gestalt oder über Vampirumarmung, mit 30 Sek. Abklingzeit.',
      shapeshift: 'Schattengestalt wird nicht als Gestaltwandel gezählt.',
      singleTarget:
        'Die Entwickler wollen, dass Schatten vor allem immer guten Schaden bringt; als Hybrid-Schadens-Spec macht es rund 5 % weniger Schaden.',
      slow: 'Verlangsamt sein Ziel nur, solange Gedankenschinden kanalisiert wird, ein zentraler Rotationszauber, und ein Talent steigert den Schaden mit jedem Tick (Verbessertes Gedankenschinden); keine weitere Verlangsamung, daher häufig gegen ein einzelnes Ziel, aber an die Kanalisierung gebunden.',
      soloLeveling:
        'Hervorragende Überlebensfähigkeit und solider Schaden beim Leveln: Gedankenschinden ab Level 20, Schattengestalt halbiert ab Level 40 die Manakosten von Schattenzaubern, und Vampirumarmung hat 30 Sek. Abklingzeit.',
      stun: 'Betäubt nur mit einer Chance durch ein Schatten-Talent (Blackout), das auch Voraussetzung für das Talent Verbesserter psychischer Schrei ist.',
      survivability:
        'Erleidet in Schattengestalt 15 % weniger physischen Schaden, und Vampirumarmung (30 Sek. Abklingzeit) und Schild helfen; Heilungen wirken nur außerhalb der Gestalt.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof PRIEST_SPECS>>;
