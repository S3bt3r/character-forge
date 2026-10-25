import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { WARLOCK_SPECS } from '../../../data/specs/warlock';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Warlock, translation of the English notes in `src/data/specs/warlock.ts`. */
export const WARLOCK_NOTES = {
  shared: {
    apm: 'Lange Zauber bestimmen das Tempo. Dämonologie füllt mit Schattenzaubern, markiert Ziele für ihren Dämon und wirkt gegen angeschlagene Gegner einen schnelleren großen Zauber; Zerstörung füllt mit Verbrennen und wirkt ihre Cooldowns, sobald bereit (Feuersbrunst, Schattenbrand).',
    armor: 'Trägt nur Stoffrüstung.',
    cc: 'Kann Gegner in Furcht versetzen oder mit Horror belegen, Dämonen und Elementare verbannen und von einem Dämon Humanoide verführen lassen (Todesmantel, Verbannen, Verführung); Furcht reicht 20 m weit.',
    combatReset: 'Nur Furcht und Todesmantel helfen, sich zu lösen.',
    deadZone: 'Kein Mindestabstand: Jeder Zauber funktioniert auch aus nächster Nähe.',
    defAbsorb:
      'Zwei Absorptionsschilde: einer skaliert mit 10 % der Zauberheilung (Leerwandler-Opferung), der andere absorbiert Schattenschaden (Schattenzauberschutz).',
    dungeonUtility:
      'Kann vorab einen Stein auf einen Verbündeten legen, mit dem er sich nach dem Tod selbst wiederbelebt (Seelenstein), aber keine Flüche, Gifte oder Krankheiten entfernen.',
    escape: 'Kaum Mobilität.',
    gearDependency:
      'Die Entwickler wollen, dass Zauberwirker ihre Ausrüstung so wichtig nehmen wie Nahkämpfer, mit Zaubermacht-Ausrüstung ab Level 10.',
    groundZones: 'Feuerregen als Bodenzauber.',
    groupDemand:
      'Verursacht Schaden, der mit jedem anderen Zauberwirker mithält, und laut den Guides gehören Seelenstein und Summonen zu dem, was ein Raid vom Hexenmeister will; Versammlungssteine beschwören nicht, das bleibt dem Hexenmeister. Ansonsten besetzt er nur einen Schadensplatz.',
    healAbsorb: 'Keine Fähigkeit heilt andere.',
    healDirect: 'Keine Fähigkeit heilt andere.',
    healGroup: 'Keine Fähigkeit heilt andere.',
    healHot: 'Keine Fähigkeit heilt andere.',
    healingReduction: 'Keine Möglichkeit, die Heilung zu verringern, die ein Gegner erhält.',
    hybridFlex: 'Schaden ist die einzige Rolle des Hexenmeisters; Hexenmeister gelten ausdrücklich nicht als Hybride.',
    hybridTax: 'Hexenmeister gelten nicht als Hybride, daher gibt es keinen Schadensabzug für Hybride.',
    interrupt: 'Unterbricht über den Teufelsjäger (Zaubersperre).',
    levelingDowntime: 'Aderlass skaliert mit Willenskraft.',
    positional: 'Keine Fähigkeit verlangt eine Position.',
    pvpBattleground: 'Jeder Hexenmeister-Build soll im Battleground funktionieren.',
    pvpWorld:
      'Die Entwickler akzeptieren SL/SL (Hybrid aus Gebrechen und Dämonologie) als reinen PvP-Build, und ein Hexenmeister gewann ein PvP-Turnier. Gebrechen heilt sich selbst, Dämonologie hat starke Begleiter und hält viel aus; Zerstörung hat Burst (Schattenbrand, Feuersbrunst), aber keinen solchen Selbsterhalt.',
    raidUtility:
      'Hat einen Fluch, der auf jeglichen Magieschaden wirkt (Fluch der Elemente), und der Wichtel bringt einen Buff (Blutpakt).',
    range: 'Zaubert aus normaler Zauberreichweite; kein Dämonologie-Talent erhöht sie.',
    rangeWeave: 'Zaubert aus fester Zauber-Distanz und wechselt nie in den Nahkampf.',
    reagentDependency:
      'Das Beschwören von Dämonen kostet Seelensplitter, und ein Entzugszauber gewährt welche. Ein Dämonologie-Talent macht Seelenfeuer zum regelmäßigen Zauber, der außer gegen Gegner unter 35 % Gesundheit einen Splitter kostet; Zerstörung zahlt einen für einen sofortigen Finisher, die Schadenszauber von Gebrechen kosten keinen.',
    resEnergy: 'Hexenmeister nutzen keine Energie.',
    resMana: 'Mana ist die Hauptressource; Aderlass skaliert mit Willenskraft.',
    resRage: 'Hexenmeister nutzen keine Wut.',
    roleHealer: 'Keine Heilung für andere.',
    roleMeleeDps: 'Hexenmeister kämpfen nicht im Nahkampf.',
    roleRangedDps: 'Alle drei Specs sollen beim Schaden mit jeder Zauberklasse mithalten.',
    roleTank: 'Reine Schadensklasse ohne Tank-Werkzeuge.',
    selfCleanse: 'Kann sich nur über einen Dämon reinigen, den Teufelsjäger (Magie verschlingen).',
    selfHeal:
      'Heilt sich, indem er Leben entzieht (Blutsauger), und mit einem Horroreffekt mit Abklingzeit (Todesmantel); das Opfern des passenden Dämons stellt Gesundheit wieder her (Dämonische Opferung), und Dämonologie hat keine Talente, die die Entzugszauber verstärken.',
    services: 'Summont andere Spieler, besonders wertvoll, da Versammlungssteine nicht funktionieren.',
    shapeshift: 'Kein Gestaltwandel.',
    soloEndgame:
      'Hexenmeister sind körperlich schwach und auf den Schutz ihrer Dämonen angewiesen; Dämonologie hält Feinde auf ihren Dämon fokussiert, während Seelenfeuer sie dezimiert, und laut den Guides geben ihr zwei Talente rund 64 % mehr effektive Gesundheit (Seelenverbindung, Dämonische Umarmung).',
    stealth: 'Keine Verstohlenheit.',
    tabTargetTank: 'Keine Tank-Klasse.',
    themeArcane:
      'Hexenmeister unterwerfen verbotene Kräfte ihrem Willen und beherrschen Schatten, Feuer und dämonische Macht statt arkaner Magie; keiner ihrer Zauber ist arkan.',
    themeFel:
      'Mit Hilfe von Dämonenblut beschwören und beherrschen Hexenmeister furchterregende dämonische Wesen und beugen verbotene Mächte ihrem Willen; Gebrechen nutzt diese Macht über Schaden über Zeit und Entzugseffekte.',
    themeLight: 'Das Licht gehört nicht zum Thema des Hexenmeisters.',
    themeMartial: 'Waffenkunst gehört nicht zum Thema des Hexenmeisters.',
    themeNature: 'Die Natur gehört nicht zum Thema des Hexenmeisters.',
    totems: 'Keine Totems.',
    autoAttack:
      'Der Schaden kommt aus Zaubern, nicht aus Waffen. Der Zauberstab zählt beim Leveln wie bei jedem Zauberwirker, doch Zauberstäbe skalieren nicht mit Zauberschaden und brauchen 0,5 Sek. Stillstand.',

    weaponCaster:
      'Gebrechen, Dämonologie und Zerstörung kämpfen alle mit Zaubern, von Zermürben bis Verbrennen; selbst ihre Waffenverzauberungen sind auf Zauber ausgerichtet, und Waffen für Zauberwirker gewähren Zauberschaden.',
    weaponDual:
      'Hexenmeister kämpfen mit Zaubern und Dämonen, nicht mit Waffen; selbst ihre Waffenverzauberungen sind auf Zauber ausgerichtet.',
    weaponRanged:
      'Hexenmeister greifen mit Zaubern und Dämonen an, nicht mit Bogen oder Schusswaffe; selbst ihre Waffenverzauberungen sind auf Zauber ausgerichtet.',
    weaponShield:
      'Hexenmeister kämpfen mit Zaubern und Dämonen, nicht mit Waffen; selbst ihre Waffenverzauberungen sind auf Zauber ausgerichtet.',
    weaponTwoHand:
      'Hexenmeister kämpfen mit Zaubern und Dämonen, nicht mit Waffen; selbst ihre Waffenverzauberungen sind auf Zauber ausgerichtet.',
  },
  specs: {
    'warlock-affliction': {
      range:
        'Zaubert von jenseits der üblichen Zauberreichweite: ein Talent erhöht die Reichweite der Gebrechen-Zauber um bis zu 20 % (Grimmige Reichweite).',
      soloEndgame:
        'Hexenmeister sind körperlich schwach und auf den Schutz ihrer Dämonenbegleiter angewiesen; Gebrechen erhält die eigene Gesundheit durch mächtige Entzugseffekte, und laut den Guides ist ihr Spaltschaden durch DoTs einer der besten im Spiel, egal wie verteilt die Gegner stehen.',
      gearDependency:
        'Tempo wirkt nicht auf Schaden über Zeit oder kanalisierte Zauber wie Entzüge, Tempo auf der Ausrüstung ist für Gebrechen also wohl verschwendet, während kritische Treffer seiner DoTs es mit der Ausrüstung skalieren lassen.',
      apm: 'Hält mehrere DoTs auf allen Zielen aufrecht, wirkt sofortige Schattenblitze, wenn Einbruch der Nacht auslöst, und füllt mit Entzugszaubern wie Zermürben.',
      cc: 'Kann Gegner in Furcht versetzen oder mit Horror belegen, Dämonen und Elementare verbannen und von einem Dämon Humanoide verführen lassen (Todesmantel, Verbannen, Verführung); Furcht reicht 20 m weit, ein Gebrechen-Talent erhöht diese Reichweite womöglich.',
      pvpBattleground:
        'Bringt DoTs auf jedes Ziel, und seine Eigenheilung hilft im PvP sehr und stärkt den SL/SL-Build (Hybrid aus Gebrechen und Dämonologie); ein Talent erhöht die Reichweite von Gebrechen-Zaubern um bis zu 20 %, was auch Furcht betreffen kann (Grimmige Reichweite).',
      escape:
        'Kaum Mobilität: Hexenmeister sind körperlich schwach und auf den Schutz ihrer Dämonenbegleiter angewiesen. Ein Gebrechen-Talent verlangsamt Verfolger beim Kiten um 30 % (Fluch der Erschöpfung).',
      selfHeal:
        'Keine Heilzauber, aber Gebrechen hält sich über starke Entzugseffekte selbst am Leben: Blutsauger heilt um den verursachten Schaden, und Talente erhöhen die damit entzogene Gesundheit um bis zu 20 % und bis zu 36 % (Verbesserte Entzugszauber, Seelenentzug).',
      aoe: 'DoTs auf jedem Ziel geben einen der besten Spaltschäden im Spiel, egal wie verteilt die Gegner stehen, vorgeladene DoTs lassen allerdings wenig Burst gegen Ziele, die schnell sterben; Feuerregen und Höllenfeuer bringen Flächenschaden ohne die Zerstörung-Talente, die sie verstärken.',
      burst:
        'Kein Burst: DoTs brauchen Zeit zum Ticken, daher lassen sich Gegner mit wenig Gesundheit schwer schnell erledigen.',
      complexity:
        'Eine sehr geradlinige Spec: DoTs auf die Ziele, Entzugszauber als Füller; mehrere DoTs auf verschiedenen Gegnern zu jonglieren und im Blick zu behalten fordert dennoch etwas.',
      defKite:
        'Eine verlässliche Verlangsamung, aber kein Einfrieren und kein Festhalten: ein Gebrechen-Talent verringert das Bewegungstempo um 30 % (Fluch der Erschöpfung).',
      defStand:
        'Trägt Stoff, mit Rüstungszaubern, die Rüstung und Gesundheitsregeneration erhöhen (Dämonenhaut, Dämonenrüstung); Hexenmeister sind körperlich schwach und auf den Schutz ihrer Dämonenbegleiter angewiesen.',
      dotDamage: 'Schaden über Zeit, Entzug und Omen sind der Kern von Gebrechen.',
      eliteSolo: 'DoTs und Entzug: Gebrechen hält sich über starke Entzugseffekte selbst am Leben, und Furcht hilft.',
      execute:
        'Kein Bonusschaden gegen angeschlagene Gegner: Seelendieb gewährt Seelensplitter, aber keinen solchen Bonus, und das Talent, das unter 35 % Gesundheit wirkt, gehört zu Dämonologie (Dezimierung).',
      pet: 'Auf den Schutz der Dämonenbegleiter angewiesen.',
      petControl:
        'Nutzt einen Dämon, der Befehle braucht: mindestens Zaubersperre, Magie verschlingen und Verführung sollten auf eigenen Tasten liegen statt auf der Begleiterleiste. Die Talente, die den Dämon verstärken, liegen im Dämonologie-Baum, und der meiste Schaden von Gebrechen kommt aus seinen DoTs.',
      procs:
        'Seine Entzugszauber und andere Zauber können sofortige Schattenblitze auslösen (Einbruch der Nacht), und laut den Guides wird Schattenblitz vor allem gewirkt, wenn das auslöst; die Spec reagiert also zwischen dem Erneuern der DoTs auf einen Zufallsauslöser.',
      singleTarget:
        'Hexenmeister verursachen Schaden, der mit jedem anderen Zauberwirker mithält; laut den Guides zieht Gebrechen in langen Kämpfen davon, in denen periodischer Schaden voll ausläuft, während kurze Kämpfe den DoTs keine Zeit für ihren vollen Schaden lassen.',
      slow: 'Ein Gebrechen-Talent verringert das Bewegungstempo um 30 % und wird als Fluch auf das Ziel gelegt (Fluch der Erschöpfung).',
      soloLeveling: 'DoTs, Dämonenbegleiter und starke Entzugseffekte machen das Leveln sicher.',
      stun: 'Kaum Betäubung: Nur die Höllenbestie betäubt beim Einschlag, und ihre Beschwörung braucht ein Reagenz und hat eine lange Abklingzeit.',
      survivability:
        'Körperlich schwach, doch Gebrechen hält sich über starke Entzugseffekte am Leben; die Talente, denen die Guides rund 64 % mehr effektive Gesundheit zuschreiben, erreicht sie nur über einen Hybrid-Build mit Dämonologie (Seelenverbindung, Dämonische Umarmung).',
      themeElements: 'Die Elemente gehören nicht zum Thema von Gebrechen.',
      themeShadow:
        'Hexenmeister unterwerfen verbotene Kräfte ihrem Willen und setzen ihre Feinde großen Qualen aus; Gebrechen konzentriert sich auf Schattenschaden über Zeit und Entzugseffekte, wobei Zermürben das Ziel von innen zerreißt: der Kern des Themas.',
      threatControl: 'Bis zu 20 % weniger Bedrohung (Unterdrückung).',
    },
    'warlock-demonology': {
      gearDependency:
        'Begleiter skalieren mit den Werten ihres Beschwörers, die Ausrüstung zählt also auch für den Dämon, aber ein Dämonologie-Talent erhöht den Zauberschaden von Hexenmeister und Dämon um einen Wert, der am Level hängt statt an der Ausrüstung (Dämonisches Wissen).',
      interrupt:
        'Kann einen gegnerischen Zauber unterbrechen, wenn der Teufelsjäger der aktive Dämon ist (Zaubersperre), und ein Dämonologie-Talent verkürzt die Abklingzeit um 2 Sek. (Verbesserter Teufelsjäger).',
      groupDemand:
        'Verursacht Schaden, der mit jedem anderen Zauberwirker mithält; laut den Guides wollen Raids Seelenstein und Summonen, doch ein großer Teil des Schadens von Dämonologie läuft auf eigenen Beinen, wo Flächenschaden im Raid und schlechte Positionierung ihn töten können.',
      themeFel:
        'Mit Hilfe von Dämonenblut beschwören und beherrschen Hexenmeister furchterregende dämonische Wesen; Dämonologie baut ihre Talente um tiefere Synergien mit dem Dämon, den Kern des Themas.',
      aoe: 'Hat Feuerregen und Höllenfeuer für Flächenschaden, alle Flächenzauber sind aber Zauber der Zerstörung und profitieren von den Talenten dieses Baums, die Dämonologie nicht wählt.',
      burst:
        'Der Schaden steigt zum Ende des Kampfes: unter 35 % Gesundheit lässt ein Talent Seelenfeuer ohne Seelensplitter, schneller und mit kürzerer Abklingzeit wirken (Dezimierung); davor ist der Schaden gleichmäßig, aus langen Zaubern und dem Begleiter.',
      complexity:
        'Die Rotation ist einfach, der Begleiter fordert aber mehr: wann er in den Kampf geht und wie er aus schädlichen Mechaniken herausbleibt. Wie Dämonologie Dämonische Opferung und Meisterdämonologe kombiniert, prägt ihre Kampffähigkeiten.',
      defKite:
        'Kein Einfrieren, Festhalten oder Verlangsamen im Dämonologie-Baum: die Verlangsamungen aus Talenten von Gebrechen und Zerstörung erreicht Dämonologie nur über Hybrid-Builds (Fluch der Erschöpfung, Nachspiel).',
      defStand:
        'Trägt Stoff, aber ein Talent verstärkt seine Rüstungszauber um bis zu 30 % (Dämonische Aegis), und laut den Guides machen Seelenverbindung und Dämonische Umarmung Dämonologie robust. Dennoch sind Hexenmeister körperlich schwach und auf den Schutz ihrer Dämonenbegleiter angewiesen.',
      dotDamage:
        'Der meiste Schaden kommt von voll gewirkten Schattenblitzen und dem Begleiter; DoTs laufen nebenher, sind aber kein Fokus.',
      eliteSolo:
        'Hält Gegner auf dem Begleiter und kann ihn heilen (Lebenslinie), mit einem Talent ohne Bedrohung (Verbesserte Lebenslinie).',
      execute: 'Mehr Schaden und schnelles Seelenfeuer unter 35 % Gesundheit (Dezimierung).',
      pet: 'Kann einen Dämon für seinen Buff opfern (Dämonische Opferung); das 31-Punkte-Talent erhält diesen Buff, wenn ein anderer Dämon beschworen wird, so wirken zwei Dämonen-Buffs zugleich.',
      petControl:
        'Das Dämonen-Management ist der Kern der Spec: laut den Guides gehört dazu, wann der Dämon in den Kampf geht oder an eine markierte Stelle zieht. Ein großer Teil des Schadens kommt vom Dämon, der am Leben bleiben muss; ein Talent lenkt Gegner auf ihn (Dämonisches Brandmal).',
      procs: 'Wenige Procs; Dezimierung löst planbar unter 35 % Gesundheit aus.',
      singleTarget:
        'Hexenmeister verursachen Schaden, der mit jedem anderen Zauberwirker mithält, und laut den Guides machen gestapelte Schadensboni plus ein verstärkter Dämon Dämonologie zu einem der stärksten Einzelziel-Specs im Spiel.',
      slow: 'Keine Verlangsamung im eigenen Baum; das Gebrechen-Talent, das um 30 % verlangsamt, ist nur über Hybrid-Builds erreichbar (Fluch der Erschöpfung).',
      soloLeveling: 'Ein sehr freundlicher Build zum Leveln: starke Begleiter und hohe Überlebensfähigkeit.',
      stun: 'Kaum Betäubung: Nur die Höllenbestie betäubt beim Einschlag, und ihre Beschwörung braucht ein Reagenz und hat eine lange Abklingzeit.',
      survivability: 'Zwei Talente geben rund 64 % mehr effektive Gesundheit (Seelenverbindung, Dämonische Umarmung).',
      themeElements: 'Die Elemente gehören nicht zum Thema der Dämonologie.',
      themeShadow:
        'Hexenmeister werden vor allem wegen ihrer Bösartigkeit und Grausamkeit gefürchtet und beschwören furchteinflößende Dämonen; Dämonologie führt dieselbe verbotene Macht mit Schattenblitz, doch ihre Dämonen stehen im Vordergrund.',
      threatControl:
        'Zwei Bedrohungswerkzeuge im eigenen Baum: ein Talent senkt die Bedrohung beim Heilen des Begleiters um bis zu 100 % (Verbesserte Lebenslinie), ein anderes lässt Sengender Schmerz weniger Bedrohung erzeugen (Dämonisches Brandmal).',
    },
    'warlock-destruction': {
      range:
        'Zaubert von jenseits der üblichen Zauberreichweite: ein Talent erhöht die Reichweite der Zauber der Zerstörung um bis zu 20 % (Zerstörerische Reichweite).',
      soloEndgame:
        'Hexenmeister brauchen den Schutz ihrer Dämonen, daher behält Zerstörung einen Dämon, der Gegner bindet; laut den Guides beenden Schattenbrand und Feuersbrunst Kämpfe schnell. Doch der Hexenmeister ist körperlich schwach, und Zerstörung-Talente bringen weder Entzug noch mehr effektive Gesundheit.',
      groundZones:
        'Hat einen Bodenzauber (Feuerregen), und als Zauber der Zerstörung profitiert er von den Talenten des Baums.',
      levelingDowntime:
        'Aderlass skaliert mit Willenskraft, Mana erzwingt also selten eine Pause; nötig wird sie gelegentlich wegen der Gesundheit, da Zerstörung diese weder über starke Entzugseffekte erhält noch Gegner auf ihren Begleiter lenkt.',
      themeFel:
        'Mit Hilfe von Dämonenblut sind Hexenmeister mächtig und auf den Schutz ihrer Dämonenbegleiter angewiesen; Zerstörung führt diese verbotene Macht als dämonisches Feuer und Schatten (Schattenbrand, Feuersbrunst, Höllenfeuer).',
      selfHeal:
        'Nur die grundlegenden Entzugszauber: Leben zu entziehen heilt (Blutsauger), und ein Horroreffekt heilt mit Abklingzeit (Todesmantel), während die Talente, die Entzugszauber verstärken, im Gebrechen-Baum liegen.',
      aoe: 'Starker Flächenschaden durch Höllenfeuer und Feuerregen, beides Zauber der Zerstörung, die von Talenten des Baums profitieren und kritisch treffen können; der Spaltschaden ist eine Schwachstelle, die ein Talent teilweise ausgleicht (Fluch der Verwüstung).',
      burst: 'Starker Burst durch Feuersbrunst und Schattenbrand.',
      complexity:
        'Eine einfache, sehr einsteigerfreundliche Rotation: DoTs aufrechthalten, die beiden Zauber mit Abklingzeit wirken, sobald sie bereit sind (Schattenbrand, Feuersbrunst), sonst mit Verbrennen füllen.',
      defKite:
        'Nur eine Verlangsamung, und nur, wenn Feuersbrunst gewirkt wird: ein Talent gibt ihr eine Chance von bis zu 100 %, das Ziel zu lähmen und sein Bewegungstempo 5 Sek. lang um 50 % zu verringern (Nachspiel).',
      defStand:
        'Rüstungszauber (Dämonenhaut, Dämonenrüstung), und ein Talent senkt allen erlittenen Schaden um bis zu 10 % (Geschmolzene Haut).',
      dotDamage:
        'DoTs bleiben durchgehend aktiv, weil die Hauptzauber auf einem Feuer-DoT aufbauen (Feuerbrand): er versorgt Feuersbrunst und lässt Verbrennen 25 % mehr Schaden verursachen. Direkte Zauber tragen den Großteil des Schadens, und es gibt keine Boni auf Schattenschaden für DoTs.',
      eliteSolo: 'Wenig Selbsterhalt in langen Kämpfen gegen Elite-Gegner.',
      execute:
        'Ein sofortiger Schattenzauber mit kurzer Abklingzeit dient als Finisher, und sein Seelensplitter wird erstattet, wenn das Ziel stirbt (Schattenbrand); kein Zauber der Zerstörung verursacht mehr Schaden gegen angeschlagene Gegner.',
      pet: 'Auf den Schutz der Dämonenbegleiter angewiesen, und laut den Guides bestimmt der beschworene Dämon die Spielweise.',
      petControl:
        'Die Fähigkeiten des Dämons sind so sehr Teil des Werkzeugkastens wie das Zauberbuch und gehören auf eigene Tasten. Die Talente, die den Dämon verstärken, liegen im Dämonologie-Baum, und der meiste Schaden von Zerstörung kommt aus den eigenen Zaubern.',
      procs:
        'Nichts in der Rotation wartet auf einen Zufallsauslöser: ein Talent (Schatten und Flamme) löst verlässlich durch die beiden Zauber mit Abklingzeit aus (Feuersbrunst, Schattenbrand), die laut den Guides in einer einfachen Rotation eingesetzt werden, sobald sie bereit sind.',
      singleTarget:
        'Hexenmeister verursachen Schaden, der mit jedem anderen Zauberwirker mithält; laut den Guides hat Zerstörung starken Einzelziel-Schaden, mit Verbrennen als Füller und Schattenbrand und Feuersbrunst, sobald bereit.',
      slow: 'Ein Talent lässt Feuersbrunst das Ziel um 50 % verlangsamen (Nachspiel).',
      soloLeveling: 'Setzt auf Schaden statt auf Selbsterhalt.',
      stun: 'Eine Betäubung nach Zufall durch ein Zerstörung-Talent (Pyroklasmus): Seelenfeuer erhält eine Chance von 26 %, das Ziel 3 Sek. lang zu betäuben, und die beiden Feuer-Flächenzauber über ihre Dauer eine Chance von 26 %, getroffene Ziele 3 Sek. lang zu betäuben.',
      survivability:
        'Körperlich schwach mit wenig Selbsterhalt; Geschmolzene Haut senkt sämtlichen erlittenen Schaden um bis zu 10 %.',
      themeElements:
        'Feuer ist die Hälfte des Werkzeugkastens von Zerstörung (Feuerbrand, Feuersbrunst, Verbrennen), doch als verbotene Macht, bewusst mit Schatten gemischt, statt der Elemente als Verbündete, damit Zerstörung mehr ist als eine weitere Spielart des Feuermagiers.',
      themeShadow:
        'Zerstörung mischt bewusst Schattenzauber wie Schattenbrand in ihr Feuer, wobei ein Talent beides verbindet (Schatten und Flamme); verbotene Macht, doch die Hälfte des Werkzeugkastens ist Feuer.',
      threatControl:
        'Keine Bedrohungswerkzeuge im eigenen Baum; das Gebrechen-Talent, das die Bedrohung um bis zu 20 % senkt, ist für die meisten PvE-Specs zentral (Unterdrückung).',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof WARLOCK_SPECS>>;
