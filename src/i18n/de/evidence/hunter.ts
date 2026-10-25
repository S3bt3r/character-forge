import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { HUNTER_SPECS } from '../../../data/specs/hunter';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Hunter, translation of the English notes in `src/data/specs/hunter.ts`. */
export const HUNTER_NOTES = {
  shared: {
    singleTarget:
      'Jäger gelten nicht als Hybride, daher gibt es keinen Schadensabzug für Hybride; laut den Guides hängt ein Raidplatz allein an hohem Grundschaden.',
    aoe: 'Flächenschaden durch zwei Schüsse: Mehrfachschuss trifft 3 Ziele, teilt sich aber die Abklingzeit mit Gezieltem Schuss, und Salve hat keine Abklingzeit; ein Treffsicherheit-Talent erhöht den Schaden beider.',
    armor: 'Leder, ab Level 40 Kette.',
    combatReset:
      'Kann im PvE den Kampf beenden, indem man sich tot stellt (Totstellen), was aber fehlschlagen kann; das Talent, das es verlässlicher macht, ist ein Überleben-Talent.',
    complexity:
      'Jäger sind leicht zu erlernen. Bei Tierherrschaft kommt es vor allem darauf an, zwei beschworene Falken aufrechtzuerhalten, ohne zu früh zu erneuern; Treffsicherheit verlangt etwas mehr, ist aber keine schwere Spec.',
    deadZone: 'Fernkampfangriffe sind auf unter 8 m Abstand zum Gegner nicht nutzbar (tote Zone).',
    defAbsorb: 'Kaum Schilde; ein Tierherrschaft-Talent erhöht die Ausweichchance (Aspekt des Affen).',
    defKite:
      'Jäger sollen Gegner auf Distanz halten: Fallen lassen sich auch im Kampf legen, Autoschuss braucht aber 0,5 Sek. Stillstand.',
    defStand: 'Leder, ab Level 40 Kette, kein Schild.',
    dungeonUtility: 'Kann weder Flüche, Gifte oder Krankheiten entfernen noch Gefallene wiederbeleben.',
    execute: 'Kein Bonusschaden gegen angeschlagene Gegner.',
    gearDependency: 'Begleiter erhalten Werte aus der Ausrüstung des Jägers.',
    groundZones:
      'Fallen legt man zu den eigenen Füßen, auch im Kampf (30 Sek. Abklingzeit), je eine Feuer- und Eisfalle gleichzeitig, und Salve trifft ohne Abklingzeit einen gewählten Bereich; ein Treffsicherheit-Talent erhöht den Schaden von Salve.',
    groupDemand:
      'Jäger bringen keine nützlichen Buffs für Gruppe oder Raid und bekommen in ambitionierten Gruppen einen Platz daher nur über hohen Schaden.',
    healAbsorb: 'Keine Fähigkeit heilt andere.',
    healDirect: 'Keine Fähigkeit heilt andere.',
    healGroup: 'Keine Fähigkeit heilt andere.',
    healHot: 'Keine Fähigkeit heilt andere.',
    healingReduction:
      'Nur mit einem Krokilisk-Begleiter: Zerstückelung verringert die erhaltene Heilung 6 Sek. lang um 25 % bei 15 Sek. Abklingzeit und wirkt so nur in einem Teil des Kampfes.',
    hybridFlex: 'Schaden ist die einzige Rolle des Jägers; Jäger gelten nicht als Hybride.',
    hybridTax: 'Jäger gelten nicht als Hybride, daher gibt es keinen Schadensabzug für Hybride.',
    interrupt: 'Keine Betäubung und keine Unterbrechung.',
    levelingDowntime:
      'Jeder Talentbaum hat ein Talent für Manaregeneration, das laut den Guides die Pausen kurz hält, und der Begleiter fängt Treffer ab.',
    positional: 'Keine Fähigkeit verlangt eine Position.',
    pvpBattleground:
      'Auf große Distanz sehr stark; Gegner besiegen Jäger, indem sie nah herangehen, wo die Schüsse nicht gehen.',
    pvpWorld:
      'Auf große Distanz sehr stark; Gegner besiegen Jäger, indem sie nah herangehen, wo die Schüsse nicht gehen.',
    reagentDependency:
      'Schüsse verbrauchen Munition, und ein Köcher oder Munitionsbeutel belegt einen Taschenplatz; Tierherrschaft und Treffsicherheit schießen ständig, daher reißt der Bedarf nie ab.',
    resEnergy: 'Jäger nutzen keine Energie.',
    resMana: 'Mana ist die einzige Ressource und bezahlt Schüsse, Gifte und Fallen; Talente senken die Kosten.',
    resRage: 'Jäger nutzen keine Wut.',
    roleHealer: 'Reine Schadensklasse.',
    roleTank: 'Schadensklasse; nur der Begleiter tankt.',
    selfCleanse: 'Keine Fähigkeit entfernt Magie, Flüche, Gifte oder Krankheiten.',
    selfHeal: 'Keine Eigenheilung außer Erster Hilfe.',
    services: 'Keine Summons, Portale oder herbeigezaubertes Essen und Wasser.',
    shapeshift: 'Kein Gestaltwandel.',
    slow: 'Mehrere Verlangsamungen (Erschütternder Schuss, Zurechtstutzen, Frostfalle); Fallen lassen sich auch im Kampf legen (30 Sek. Abklingzeit), und auch zwei Begleiterfamilien verlangsamen.',
    soloEndgame:
      'Der Begleiter kann im Solospiel tanken, und laut den Guides ist das Kiten des Jägers stark, solange Gegner keine Fernkampf-Kontrolle oder Lückenschließer haben. Überleben spielt mit oder ohne Begleiter und hat Nahkampfoptionen für die tote Zone unter 8 m.',
    soloLeveling:
      'Der Begleiter kann solo tanken, und laut den Guides sind alle drei Specs in Solo-Inhalten sehr stark.',
    stealth: 'Keine eigene Verstohlenheit.',
    stun: 'Keine eigene Betäubung; ein Treffsicherheit-Talent gibt eine Chance zu betäuben, und mit einem Tierherrschaft-Talent betäubt der Begleiter 3 Sek. lang (Verbesserter erschütternder Schuss, Einschüchterung).',
    tabTargetTank: 'Keine Tank-Klasse.',
    themeArcane:
      'Jeder Jäger nutzt zwei Schüsse, die Arkanschaden verursachen (Arkaner Schuss, Salve), doch die Klasse ist ein Fernkämpfer mit einem treuen Begleiter statt ein Wirker roher Magie, daher bleibt das Thema klein.',
    themeElements: 'Die Elemente gehören nicht zum Thema des Jägers.',
    themeFel: 'Dämonen gehören nicht zum Thema des Jägers.',
    themeLight: 'Das Licht gehört nicht zum Thema des Jägers.',
    themeMartial:
      'Bogen, Schusswaffe und Nahkampfwaffen gehören zum Klassenthema. Treffsicherheit meistert den Bogen und belohnt den Kampf ohne Begleiter (Einsamer Wolf); Tierherrschaft lässt Begleiter und beschworene Falken einen großen Teil des Kampfes tragen.',
    themeNature: 'Jäger haben die Gabe, wilde Tiere zu zähmen.',
    themeShadow: 'Schattenmagie gehört nicht zum Thema des Jägers.',
    threatControl:
      'Mehrere Wege, Bedrohung loszuwerden: Rückzug senkt sie, Totstellen beendet im PvE den Kampf, und der Begleiter kann mit einer seiner Fähigkeiten viel Bedrohung auf sich ziehen.',
    totems: 'Keine Totems.',

    weaponCaster:
      'Jäger kämpfen mit Bogen oder Schusswaffe, Nahkampfwaffen und einem treuen Begleiter statt mit Zaubern.',
    weaponDual:
      'Tierherrschaft und Treffsicherheit kämpfen im Fernkampf mit Bogen oder Schusswaffe; nichts in ihren Talenten belohnt eine zweite Nahkampfwaffe.',
    weaponRanged:
      'Tierherrschaft und Treffsicherheit kämpfen im Fernkampf mit Bogen oder Schusswaffe, mit der größten Reichweite aller Klassen.',
    weaponShield: 'Jäger können keinen Schild benutzen.',
    weaponTwoHand:
      'Tierherrschaft und Treffsicherheit kämpfen im Fernkampf mit Bogen oder Schusswaffe; ihre Nahkampfwaffe, unter Umständen eine Zweihandwaffe, dient nur für kurze Schläge im Nahkampf.',
  },
  specs: {
    'hunter-beast-mastery': {
      healingReduction:
        'Nur mit einem Krokilisk-Begleiter: Zerstückelung verringert die erhaltene Heilung 6 Sek. lang um 25 % bei 15 Sek. Abklingzeit; laut den Guides drückt das im PvP die Heilung stark.',
      deadZone:
        'Fernkampfangriffe sind auf unter 8 m Abstand nicht nutzbar (tote Zone), was laut den Guides Tierherrschaft schadet, doch der Begleiter macht auch aus der Nähe weiter Schaden.',
      soloEndgame:
        'Der Begleiter fängt die Treffer ab, während der Jäger aus der größten Reichweite aller Klassen angreift, laut den Guides ist das Kiten stark, und Elite-Gegner in der offenen Welt und Farmen brauchen keine Gruppe.',
      themeNature:
        'Jäger freunden sich mit wilden Tieren an und zähmen sie als Begleiter; Tierherrschaft richtet ihre Talente auf den Begleiter aus und macht das Band zu den Tieren zu ihrem Kern.',
      gearDependency:
        'Begleiter erhalten Werte aus der Ausrüstung des Jägers, aber die Talente erhöhen den Schaden des Begleiters und beschworener Falken, sodass Begleiter und Talente einen großen Teil des Schadens tragen.',
      groundZones:
        'Fallen legt man zu den eigenen Füßen, auch im Kampf (30 Sek. Abklingzeit), je eine Feuer- und Eisfalle gleichzeitig, und Salve trifft einen gewählten Bereich; laut den Guides legt Tierherrschaft nur gelegentlich eine Falle.',
      survivability: 'Der Begleiter kann solo tanken, und ein Talent erhöht die Ausweichchance (Aspekt des Affen).',
      aoe: 'Flächenschaden durch Mehrfachschuss, der 3 Ziele trifft, sich aber die Abklingzeit mit Gezieltem Schuss teilt, und durch Salve ohne Abklingzeit; manche Begleiterfamilien bringen Flächenangriffe mit.',
      burst:
        'Laut den Guides hoher Burst, solange Zorn des Wildtiers aktiv ist; zwei beschworene Falken zusammen mit dem Begleiter darunter können womöglich tödlich sein.',
      cc: 'Die Eiskältefalle friert ein einzelnes Ziel 20 Sek. lang ein, Fallen lassen sich auch im Kampf legen (30 Sek. Abklingzeit), und mit einem Tierherrschaft-Talent betäubt der Begleiter 3 Sek. lang (Einschüchterung); von sich aus können Jäger weder betäuben noch unterbrechen.',
      dotDamage:
        'Ein Gift mit Schaden über Zeit, das leicht mit Angriffskraft skaliert (Schlangengift); mehrere Begleiterfamilien bringen Blutungen oder Gifte mit.',
      eliteSolo: 'Der Begleiter kann solo und in kleinen Gruppen tanken.',
      escape:
        'Viele Werkzeuge, um Gegner auf Distanz zu halten (Aspekt des Geparden, Totstellen, Erschütternder Schuss), dazu Fallen im Kampf; laut den Guides ist das Kiten des Jägers stark, solange Gegner keine Fernkampf-Kontrolle und keine Lückenschließer haben.',
      pet: 'Der Begleiter kann solo und in kleinen Gruppen tanken.',
      petControl:
        'Die Talente stützen das Spiel mit dem Begleiter, und jede Begleiterfamilie bringt eigene Fähigkeiten mit.',
      raidUtility:
        'Wenig Raid-Utility: Mal des Jägers und ein Wolfsgeheul, das nur die Nahkampfangriffskraft der Gruppe stärkt (Wutgeheul); laut den Guides keine Raidbuffs, höchstens etwas Rüstungsreduzierung über eine Begleiterfähigkeit.',
      range: 'Größte Reichweite aller Klassen.',
      rangeWeave:
        'Fernkampfangriffe sind auf unter 8 m Abstand nicht nutzbar (tote Zone), und laut den Guides setzt Tierherrschaft gelegentlich eine Nahkampffähigkeit ein; das Einweben von Nahkampf braucht Überleben-Talente.',
      roleMeleeDps:
        'Melee-Weaving braucht Talente, und laut den Guides setzt Tierherrschaft nur gelegentlich eine Nahkampffähigkeit ein.',
      roleRangedDps: 'Starke Fernkampffähigkeiten.',
      stun: 'Jäger können von sich aus nicht betäuben, doch mit einem Tierherrschaft-Talent betäubt der Begleiter das Ziel bei seinem nächsten erfolgreichen Angriff 3 Sek. lang (Einschüchterung).',
      autoAttack: 'Autoschuss läuft während des Gezielten Schusses weiter; er braucht 0,5 Sek. Stillstand.',
    },
    'hunter-marksmanship': {
      themeArcane:
        'Ein Talent verkürzt die Abklingzeit von Arkaner Schuss, daher kommen die beiden Arkanschüsse oft zum Einsatz (Arkaner Schuss, Salve); dennoch ein Schütze statt ein Wirker roher Magie.',
      soloEndgame:
        'Macht nur ohne aktiven Begleiter 20 % mehr Schaden (Einsamer Wolf), daher spielt Treffsicherheit allein vermutlich ohne den tankenden Begleiter. Kiten und Reichweite bleiben stark, doch laut den Guides trifft die tote Zone unter 8 m besonders hart.',
      themeNature:
        'Jäger kennen Orte der Welt, die auf keiner Karte stehen, und werden Meister im Fährtenlesen, doch Einsamer Wolf belohnt den Kampf ohne Begleiter, daher ist das Band zu den Tieren optional.',
      threatControl:
        'Kann die Bedrohung senken (Rückzug) und im PvE den Kampf beenden, indem man sich tot stellt (Totstellen), doch ohne Begleiter unter Einsamer Wolf zieht nichts Bedrohung vom Jäger ab.',
      apm: 'Ein ruhigeres Tempo mit Zauberzeiten: Heckenschützenschuss braucht 4 Sek. Zauberzeit bei 15 Sek. Abklingzeit, auch Gezielter Schuss wird gewirkt, und Autoschuss feuert erst nach 0,5 Sek. ohne Bewegung.',
      levelingDowntime:
        'Ein Talent gibt beim Zaubern Manaregeneration, nachdem Schlangengift getroffen hat, was laut den Guides die Pausen kurz hält; Treffsicherheit levelt aber vermutlich für den Bonusschaden von Einsamer Wolf ohne Begleiter, daher fängt niemand Treffer ab, und sie pausiert oft.',
      stun: 'Keine eigene Betäubung; ein Treffsicherheit-Talent kann kurz betäuben (Verbesserter erschütternder Schuss).',
      survivability:
        'Wegen Einsamer Wolf in Dungeons und Raids meist ohne Begleiter, daher fängt oft kein Begleiter die Treffer ab.',
      soloLeveling:
        'Der Begleiter kann solo tanken, doch die Talente von Treffsicherheit belohnen den Kampf ohne ihn (Einsamer Wolf); laut den Guides sind alle drei Specs in Solo-Inhalten sehr stark.',
      singleTarget:
        'Hoher Schaden: Einsamer Wolf gibt 20 % mehr ohne aktiven Begleiter, und Heckenschützenschuss trifft noch härter als Gezielter Schuss; laut den Guides hängt ein Gruppenplatz an ernsthaftem Schaden.',
      pvpBattleground:
        'Auf große Distanz sehr stark, doch Gegner besiegen Jäger, indem sie nah herangehen, wo die Schüsse nicht gehen. Laut den Guides lassen sich die langen Zauberzeiten im PvP schwer durchbringen, ein Treffsicherheit-Jäger, den man in Ruhe lässt, ist aber äußerst tödlich.',
      gearDependency:
        'Der Schaden kommt aus den eigenen Schüssen und der Distanzwaffe des Jägers: Alle Angriffe machen 20 % mehr Schaden, solange kein Begleiter aktiv ist (Einsamer Wolf), und ein Talent erhöht die Angriffskraft um bis zu 100 % der Intelligenz.',
      burst:
        'Laut den Guides bringen die langen Zauberzeiten hohen Burst; Heckenschützenschuss trifft noch härter als Gezielter Schuss.',
      cc: 'Die Eiskältefalle friert ein einzelnes Ziel 20 Sek. lang ein, und Fallen lassen sich auch im Kampf legen (30 Sek. Abklingzeit); von sich aus können Jäger weder betäuben noch unterbrechen, ein Treffsicherheit-Talent kann aber kurz betäuben.',
      dotDamage:
        'Ein Gift mit Schaden über Zeit (Schlangengift), und ein Treffsicherheit-Talent erhöht seinen Schaden um 20 %.',
      eliteSolo:
        'Dank Begleitersteuerung schaffen Jäger auch sehr harte Gegner allein, doch Treffsicherheit verzichtet für Einsamer Wolf, das 20 % mehr Schaden nur ohne aktiven Begleiter gibt, vermutlich auf den tankenden Begleiter.',
      escape:
        'Viele Werkzeuge, um Gegner auf Distanz zu halten (Aspekt des Geparden, Totstellen, Erschütternder Schuss), dazu Fallen im Kampf; laut den Guides ist das Kiten des Jägers stark, solange Gegner keine Fernkampf-Kontrolle und keine Lückenschließer haben.',
      groupDemand:
        'Ohne Begleiter und mit einer Aura, die dem Nahkampf nichts bringt, nehmen Gruppen die Spec nur für hohen Schaden mit.',
      pet: 'Kann einen Begleiter haben, doch Einsamer Wolf gibt ohne ihn 20 % mehr Schaden.',
      petControl:
        'Macht mit allen Angriffen 20 % mehr Schaden, solange kein Begleiter aktiv ist (Einsamer Wolf), und laut den Guides spielt Treffsicherheit in Dungeons und Raids höchstwahrscheinlich ohne Begleiter.',
      raidUtility:
        'Ein raidweiter Buff, der einzige der Jäger, der nur die Distanzangriffskraft erhöht (Aura des Volltreffers).',
      range: 'Größte Reichweite aller Klassen.',
      rangeWeave:
        'Fernkampfangriffe sind auf unter 8 m Abstand nicht nutzbar (tote Zone), was laut den Guides Treffsicherheit besonders hart trifft, und Heckenschützenschuss hat eine Grundreichweite von 45 m; das Einweben von Nahkampf braucht Überleben-Talente.',
      roleMeleeDps: 'Nahkampf wird bewusst aus Treffsicherheit herausgehalten.',
      roleRangedDps: 'Starke Fernkampffähigkeiten.',
      autoAttack: 'Autoschuss läuft während des Gezielten Schusses weiter; er braucht 0,5 Sek. Stillstand.',
    },
    'hunter-survival': {
      positional:
        'Kämpft im Nahkampf, wo keine Fähigkeit eine Position verlangt, doch wer hinter dem Ziel steht, umgeht dessen Parieren und Blocken.',
      weaponRanged:
        'Eine Nahkampf-Spec mit Fallen, deren Talente sie zwischen Fernkampf und Nahkampf hin und her wechseln lassen, daher nutzt ihr Arsenal beides.',
      weaponDual:
        'Kämpft im Nahkampf, und ein Talent erhöht den Schaden der Schildhand, wenn man zwei Waffen führt (Vorteil des Raubtiers), was die Guides sehr stark nennen; Überleben schießt aber auch und kann eine Zweihandwaffe führen.',
      weaponTwoHand:
        'Eine Zweihandwaffe funktioniert, aber ein Talent erhöht den Schaden der Schildhand, wenn man zwei Waffen führt (Vorteil des Raubtiers), was zwei Waffen zum stärkeren Aufbau macht; Überleben konkurriert mit Kriegern, Schurken und möglicherweise Paladinen um Waffen.',
      themeElements:
        'Feuer- und Frostfallen sind die einzige Verbindung des Jägers zu den Elementen, und Überleben ist der Fallen-Build, mit Talenten, die Fallen zuverlässiger treffen lassen (Überlebenstaktik) und ihre Abklingzeit verkürzen; im Kern eine Waffenfantasie, daher bleibt das Thema schwach.',
      slow: 'Mehrere Verlangsamungen (Erschütternder Schuss, Zurechtstutzen, Frostfalle); die Frostfalle verlangsamt jeden Gegner in ihrem Bereich um 60 %, und ein Überleben-Talent senkt die Abklingzeit von Fallen um 40 %.',
      reagentDependency:
        'Schüsse verbrauchen Munition, und ein Köcher oder Munitionsbeutel belegt einen Taschenplatz; Überleben kann aber im Nahkampf bleiben, und eine Option wechselt automatisch zwischen Autoangriff und Autoschuss, daher kämpft es oft im Nahkampf, statt zu schießen.',
      levelingDowntime:
        'Ein Talent regeneriert Mana (Einfallsreichtum), aber laut den Guides lässt sich Überleben wohl mit oder ohne Begleiter spielen, daher fängt nicht immer ein Begleiter die Treffer ab.',
      combatReset:
        'Kann im PvE den Kampf beenden, indem man sich tot stellt (Totstellen), und ein Überleben-Talent lässt es verlässlicher treffen, wenn auch nicht immer (Überlebenstaktik).',
      groupDemand:
        'Jäger bringen keine nützlichen Buffs für Gruppe oder Raid, und Überleben konkurriert mit Kriegern, Schurken und möglicherweise Paladinen um Waffen.',
      soloLeveling:
        'Der Begleiter kann solo tanken, doch die Talente von Überleben bauen nicht auf ihn; laut den Guides ist Überleben in Solo-Inhalten sehr stark und wohl mit oder ohne Begleiter spielbar.',
      aoe: 'Flächenschaden durch Mehrfachschuss, der 3 Ziele trifft, sich aber die Abklingzeit mit einem anderen Schuss teilt, und durch Salve ohne Abklingzeit; ein Überleben-Talent senkt die Abklingzeit von Fallen um 40 %, die Feuerfalle kommt also öfter.',
      apm: 'Fast immer eine Taste zu drücken, mit Nahkampffähigkeiten und Fallen.',
      procs:
        'Reagiert auf Zufallseffekte (Procs): Angriffe auf das markierte Ziel können Mungobiss für 10 Sek. freischalten (Beute aufspüren, Mal des Jägers), und Überleben läuft hinein, um ihn einzusetzen, was Mungobiss zum Teil der Rotation macht.',
      pvpBattleground:
        'Überleben kämpft auch im Nahkampf, daher wirkt das Herangehen, sonst das Mittel gegen Jäger, gegen ihn weniger.',
      pvpWorld:
        'Überleben kämpft auch im Nahkampf, daher wirkt das Herangehen, sonst das Mittel gegen Jäger, gegen ihn weniger.',
      singleTarget:
        'Laut den Guides starker Dauerschaden, weil fast immer eine Taste zu drücken ist; der Großteil des Schadens kommt aus direkten Nah- und Fernkampfangriffen.',
      themeMartial:
        'Klinge und Bogen: Nahkampftalente lassen den Jäger zwischen Fernkampf und Nahkampf hin und her wechseln (Vorteil des Raubtiers, Streichertritt, Mungobiss).',
      complexity:
        'Zwei Spielweisen: Im Nahkampf zu bleiben ist fauler, aber einfach; beim Melee-Weaving greift man aus der Distanz an, läuft hinein, sobald Mungobiss aktiv wird, setzt Nahkampfangriffe und eine Falle ein und tritt wieder zurück.',
      cc: 'Kontrolle durch Fallen: Die Eiskältefalle friert ein Ziel 20 Sek. lang ein, Einfangen löst bei jeder Falle aus (bei der Frostfalle nur beim ersten Auslösen und bei Wiederholung schwächer), und ein Überleben-Talent senkt die Abklingzeit von Fallen um 40 %.',
      deadZone:
        'Eine Nahkampf-Spec mit Fallen, die direkt am Gegner kämpft, daher fallen nur die Schüsse innerhalb von 8 m aus; Überleben ist die Antwort der Entwickler für alle, die die tote Zone hassen.',
      dotDamage:
        'Wenig Schaden über Zeit: Schlangengift und mit einem Talent eine Blutung über 21 Sek. durch Mungobiss; der Großteil des Schadens kommt aus direkten Nah- und Fernkampfangriffen.',
      eliteSolo: 'Der Begleiter kann solo und in kleinen Gruppen tanken.',
      escape:
        'Viele Werkzeuge, um Gegner fernzuhalten (Aspekt des Geparden, Totstellen, Erschütternder Schuss), dazu ein Nahkampfschlag, der kurz schneller macht; Talente verkürzen Verlangsamungen und die Abklingzeit von Fallen, und laut den Guides ist das Kiten des Jägers stark.',
      groundZones:
        'Fallen legt man zu den eigenen Füßen, auch im Kampf (30 Sek. Abklingzeit), je eine Feuer- und Eisfalle gleichzeitig, und ein Überleben-Talent senkt die Abklingzeit von Fallen um 40 %.',
      pet: 'Der Begleiter kann solo und in kleinen Gruppen tanken, doch laut den Guides lässt sich Überleben wohl mit oder ohne Begleiter spielen.',
      petControl:
        'Jede Begleiterfamilie hat eine eigene Fähigkeit, und der Begleiter kann solo und in kleinen Gruppen tanken, doch Überleben baut auf Fallen und Nahkampf, und laut den Guides lässt es sich wohl mit oder ohne Begleiter spielen.',
      raidUtility:
        'Wenig Raid-Utility: Mal des Jägers und ein Wolfsgeheul, das nur die Nahkampfangriffskraft der Gruppe stärkt (Wutgeheul); laut den Guides keine Raidbuffs, höchstens ein Debuff, den eine andere Klasse ohnehin setzt, und Überleben lässt sich wohl ohne Begleiter spielen.',
      range:
        'Kämpft nah mit etwas Distanz: Die Entwickler lassen offen, ob Überleben im Nahkampf bleibt oder auf Distanz steht und für Mungobiss heranläuft, und der Guide zur Beta nennt es eine Nahkampf-Spec mit Fallen.',
      rangeWeave:
        'Wechselt zwischen Fern- und Nahkampf: Talente unterstützen das, eine Option wechselt automatisch zwischen Autoangriff und Autoschuss, und man läuft für Mungobiss, eine Falle und Streichertritt heran und tritt wieder zurück; im Nahkampf zu bleiben ist eine andere Spielweise.',
      roleMeleeDps:
        'Vor allem eine Nahkampf-Rolle, aber keine reine Nahkampf-Spec: Die Entwickler lassen offen, ob Überleben mit Mungobiss, Streichertritt und Fallen im Nahkampf bleibt oder auf Distanz steht und heranläuft, und der Guide zur Beta nennt es eine Nahkampf-Spec mit Fallen.',
      roleRangedDps:
        'Eine teilweise Fernkampf-Rolle: jeder Jäger hat Gezielten Schuss, und in einer der beiden Spielweisen, die die Entwickler skizzieren, schießt Überleben, bis Mungobiss aktiv wird; der Guide zur Beta nennt es eine Nahkampf-Spec mit Fallen.',
      autoAttack: 'Streichertritt als Waffenschadenangriff; Nahkampf-Talente für Überleben.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof HUNTER_SPECS>>;
