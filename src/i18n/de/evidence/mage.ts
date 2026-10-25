import type { GermanClassNotes } from '../../../data/evidence/helpers';
import type { MAGE_SPECS } from '../../../data/specs/mage';
import type { EvidenceView } from '../../../data/rated';

/** German provenance notes for the Mage, translation of the English notes in `src/data/specs/mage.ts`. */
export const MAGE_NOTES = {
  shared: {
    armor: 'Stoffrüstung.',
    deadZone: 'Kein Mindestabstand: Jeder Zauber funktioniert auch aus nächster Nähe.',
    defStand:
      'Trägt Stoff und kann nicht blocken; nur die eigenen Rüstungszauber geben etwas Rüstung (Frostrüstung, Eisrüstung).',
    dungeonUtility:
      'Kann Flüche von der Gruppe entfernen (Geringen Fluch aufheben), aber keine Gifte oder Krankheiten entfernen und keine Gefallenen wiederbeleben.',
    execute: 'Kein Bonusschaden gegen angeschlagene Gegner.',
    gearDependency:
      'Der Zauberschaden ist auf typische grüne Quest-Ausrüstung abgestimmt. Der wichtigste Schadensbonus von Frost braucht keine kritischen Treffer (Eislanze trifft eingefrorene Ziele viel härter), und laut den Guides braucht ein Build mit Frost-Talenten früh weniger Ausrüstung.',
    groundZones:
      'Flächenzauber treffen einen gewählten Bereich am Boden (Blizzard, Flammenstoß); ein Frost-Talent lässt Blizzard um höchstens 40 % verlangsamen (Verbesserter Blizzard), und laut den Guides stapelt Flammenstoß nicht mit eigenen Rängen.',
    groupDemand:
      'Für Raid und Gruppe immer nützlich durch Buffs, Essen und Wasser, Kontrolle und Schaden, besetzt aber nur einen Schadensplatz.',
    healAbsorb: 'Keine Fähigkeit heilt andere.',
    healDirect: 'Keine Fähigkeit heilt andere.',
    healGroup: 'Keine Fähigkeit heilt andere.',
    healHot: 'Keine Fähigkeit heilt andere.',
    healingReduction: 'Keine Heilungsreduktion.',
    hybridFlex: 'Schaden ist die einzige Rolle des Magiers; Magier gelten ausdrücklich nicht als Hybride.',
    hybridTax: 'Magier gelten nicht als Hybride, daher gibt es keinen Schadensabzug für Hybride.',
    interrupt:
      'Kann einen gegnerischen Zauber unterbrechen (Gegenzauber); ein Punkt in einem Talent gibt immer eine kurze Stille dazu (Verbesserter Gegenzauber).',
    levelingDowntime:
      'Stellt Essen und Wasser selbst her, aber der Magier muss beim Leveln zwischen den Kämpfen Mana auffüllen, und Feuer verzichtet auf die Frost-Talente, deren Verlangsamungen Kiten ohne Gesundheitsverlust erlauben.',
    pet: 'Kein Begleiter.',
    petControl: 'Kein Begleiter.',
    positional: 'Keine Fähigkeit verlangt eine Position.',
    raidUtility:
      'Bringt einzigartige Buffs wie Arkane Intelligenz, aber keinen raidweiten Debuff: Verbessertes Versengen und Winterkälte nutzen nur dem wirkenden Magier.',
    range: 'Magier kämpfen bevorzugt aus der Ferne.',
    rangeWeave: 'Zaubert aus fester Zauber-Distanz und wechselt nie in den Nahkampf.',
    reagentDependency: 'Teleports und Portale verbrauchen Runen, Gruppenbuffs verbrauchen Pulver.',
    resEnergy: 'Magier nutzen keine Energie.',
    resMana: 'Mana ist die einzige Ressource; Arkan verbraucht Mana gezielt für Schaden.',
    resRage: 'Magier nutzen keine Wut.',
    roleHealer: 'Keine Heilzauber.',
    roleMeleeDps: 'Zauberwirker ohne Nahkampf-Rolle.',
    roleRangedDps: 'Eine der mächtigsten Schadensklassen, die aus der Ferne zaubert.',
    roleTank: 'Reine Schadensklasse ohne Tank-Werkzeuge.',
    selfCleanse: 'Kann Flüche entfernen (Geringen Fluch aufheben), aber keine Magie, Gifte oder Krankheiten.',
    selfHeal: 'Keine Eigenheilung.',
    services:
      'Stellt Essen und Wasser für die Gruppe her, und die Entwickler erwähnen Portale der Magier; Teleports werden angenommen.',
    shapeshift: 'Kein Gestaltwandel.',
    slow: 'Mehrere Grundzauber verlangsamen Gegner: einer ab Level 24 um 40 % (Frostschlag), ein weiterer ab Level 40 (Frostfeuerblitz) und andere wie Kältekegel; Arkan und Feuer haben keine Talente, die sie verstärken.',
    soloEndgame:
      'Magier sind extrem verwundbar und sterben schnell im Nahkampf. Feuer beendet Kämpfe mit schweren kritischen Treffern, aber ohne die Kontrolle der Frost-Talente, und ist laut den Guides ausrüstungsabhängig, fällt also beim Ausrüsten zurück.',
    stealth: 'Keine Verstohlenheit.',
    stun: 'Keine eigene Betäubung; das Talent, das eine Chance zu betäuben gibt, gehört zum Feuer-Baum (Einschlag).',
    tabTargetTank: 'Keine Tank-Klasse.',
    themeArcane:
      'Arkane Macht verstärkt die übrigen Werkzeuge des Magiers; für Arkan ist sie der Kern. Feuer und Frost bauen auf ihre eigene Schule, doch ein Arkan-Talent lässt ihre Blitze Arkane Geschosse auslösen (Geschosssalve), und laut den Guides erreicht tiefes Feuer gute arkane Unterstützungstalente.',
    themeElements:
      'Magier schleudern mächtige Frost- und Flammenblitze; Arkan baut auf Arkanzauber und wirkt daneben Feuerball und Frostblitz, die beide Geschosssalve auslösen können.',
    themeFel: 'Dämonen gehören nicht zum Thema des Magiers.',
    themeLight: 'Das Licht gehört nicht zum Thema des Magiers.',
    themeMartial: 'Waffenkunst gehört nicht zum Thema des Magiers.',
    themeNature: 'Die Natur gehört nicht zum Thema des Magiers.',
    themeShadow: 'Schattenmagie gehört nicht zum Thema des Magiers.',
    totems: 'Keine Totems.',
    autoAttack:
      'Der Schaden kommt aus Zaubern, nicht aus Waffen. Der Zauberstab ist beim Leveln wie für jeden Zauberwirker sehr relevant, doch Zauberstäbe skalieren nicht mit Zauberschaden und brauchen 0,5 Sek. Stillstand.',

    weaponCaster:
      'Arkan, Feuer und Frost kämpfen alle mit Zaubern, von Arkanschlag bis Feuerball und Frostblitz, und Waffen für Zauberwirker gewähren Zauberschaden.',
    weaponDual: 'Magier gehen selten in den Nahkampf und kämpfen mit Zaubern, nicht mit Waffen.',
    weaponRanged: 'Magier greifen aus der Distanz mit Zaubern an, nicht mit Bogen oder Schusswaffe.',
    weaponShield: 'Magier gehen selten in den Nahkampf und kämpfen mit Zaubern, nicht mit Waffen.',
    weaponTwoHand:
      'Magier gehen selten in den Nahkampf und kämpfen mit Zaubern, nicht mit Waffen; ein Stab dient ihren Zaubern, nicht wuchtigen Schlägen.',
  },
  specs: {
    'mage-arcane': {
      soloEndgame:
        'Magier sind extrem verwundbar und sterben schnell im Nahkampf. Arkan verbraucht Mana für mehr Schaden, und laut den Guides ist leeres Mana eine Schwäche, was lange Farm-Sitzungen bremst.',
      groundZones:
        'Kann Bodenzauber wie Blizzard platzieren, doch in Dungeons glänzt Arkan vor allem mit Flächenschaden durch Arkane Explosion, die es dank eines Talents so oft nutzen kann wie gewünscht, ohne viel auf Bedrohung zu achten (Arkanes Feingefühl).',
      levelingDowntime:
        'Stellt Essen und Wasser selbst her und muss beim Leveln zwischen den Kämpfen Mana auffüllen; gute Talente zur Manaversorgung und kostenlose Zauber geben mehr Zeit im Kampf, weitere Optimierung dient dann vor allem dazu, Trinkpausen zu vermeiden.',
      aoe: 'Magier sind Meister des Fernkampf-Flächenschadens, stärker und vielseitiger als bei jeder anderen Klasse, und laut den Guides ist der AoE in Dungeons der Höhepunkt von Arkan.',
      apm: 'Das Tempo geben Zauberzeiten vor: Arkanschlag braucht 1,5 Sek. Zauberzeit und seine Stapel halten 15 Sek., Arkaner Zorn braucht 3,5 Sek. Zauberzeit alle 6 Sek., dazu kommen Geschosssalve-Procs.',
      burst:
        'Baut auf eine Burst-Phase hin: Arkanschlag stapelt bis zu 4-mal Zauberschaden; die Guides raten, schnell 4 Stapel aufzubauen und dann Cooldowns zu nutzen. Arkan-Talente erhöhen den kritischen Schaden, und die Guides erwarten im Endgame großen Burst durch Arkane Macht.',
      cc: 'Hat einen der besten CC-Zauber (Verwandlung).',
      combatReset:
        'Zum Lösen hat Arkan nur Blinzeln und Frostnova; Eisblock liegt tief im Frost-Talentbaum, Arkan hat ihn also nicht.',
      complexity:
        'Ein stapelnder Zauber und zwei Talente bringen Tasten dazu (Arkanschlag, Arkaner Zorn, Geschosssalve). Laut den Guides ist die Rotation anfangs einfach, später eine unintuitive Prioritätenliste, die ohne externe Hilfen schwer zu durchschauen ist.',
      defAbsorb:
        'Eine Manabarriere fängt Schaden ab (Manaschild), durch ein Arkan-Talent günstiger (Arkane Abschirmung), dazu ein Zauberschutz gegen Feuer oder Frost; Arkan hat keinen Eisblock, ein tiefes Frost-Talent.',
      defKite:
        'Hält Gegner mit Grundzaubern auf Distanz: Frostschlag verlangsamt ab Level 24 um 40 %, Frostfeuerblitz verlangsamt ebenfalls, und auch Frostnova hilft; kein Arkan-Talent verbessert sie.',
      dotDamage: 'Schaden über Zeit nur als kleiner Anteil, über Frostfeuerblitz ab Level 40.',
      eliteSolo:
        'Extrem verwundbar im Nahkampf und ohne die Frost-Talente, die Verlangsamungen zum Kiten verstärken; ein Arkan-Talent macht die Manabarriere günstiger (Arkane Abschirmung, Manaschild).',
      escape: 'Blinzeln und Frostnova.',
      gearDependency:
        'Die Zauber sind auf die Zaubermacht der Ausrüstung abgestimmt, und Arkanschlag macht zusätzlich Intelligenz zu Zauberschaden.',
      procs:
        'Ein Proc, auf den man reagiert: Treffer mehrerer Zauber können das nächste Arkane Geschosse doppelt so schnell und ohne Manakosten kanalisieren lassen (Geschosssalve, ein Talent der ersten Reihe), Arkanschlag löst es doppelt so oft aus. Die Stapel von Arkanschlag selbst sind planbar, nicht zufällig.',
      pvpBattleground:
        'Arkan hat keinen Eisblock, ein tiefes Frost-Talent, und laut einem Podcast-Gast ist ein Magier ohne ihn im PvP kaum siegfähig; die Entwickler planen derzeit nicht, Eisblock jedem Magier zu geben.',
      pvpWorld:
        'Laut den Guides bringen Arkane Macht und Talente für kritischen Arkanschaden großen Burst, aber Magier sind im Nahkampf extrem verwundbar, und Arkan hat keinen Eisblock, ein tiefes Frost-Talent; laut einem Podcast-Gast ist ein Magier ohne ihn im PvP kaum siegfähig.',
      singleTarget:
        'Der Schaden wächst mit Intelligenz und maximalem Mana: Arkanschlag stapelt Zauberschaden aus Intelligenz, und Arkaner Zorn trifft umso härter, je mehr maximales Mana der Magier hat. Laut den Guides hängt der Schaden an Kampflänge und Mana.',
      soloLeveling:
        'Talente zur Manaversorgung und eine frühe Verbesserung des Zauberstabs machen das frühe Leveln großartig.',
      survivability:
        'Extrem verwundbar, stirbt schnell im Nahkampf; ein Arkan-Talent macht die Manabarriere günstiger (Arkane Abschirmung, Manaschild), aber Arkan hat keinen Eisblock, ein tiefes Frost-Talent.',
      threatControl:
        'Kann Flächenschaden ohne große Sorge um Bedrohung austeilen: Ein Arkan-Talent senkt die Bedrohung von Arkanzaubern (Arkanes Feingefühl), und laut den Guides kann Arkan damit Arkane Explosion so oft nutzen wie gewünscht; Arkan hat keinen Eisblock, ein tiefes Frost-Talent.',
    },
    'mage-fire': {
      stun: 'Kann per Zufall statt auf Knopfdruck betäuben: Ein Feuer-Talent gibt Feuerzaubern eine Chance zu betäuben (Einschlag); Zauber niedriger Ränge lösen es seltener aus, und der periodische Schaden von Flammenstoß löst es nicht aus.',
      themeElements: 'Magier schleudern mächtige Frost- und Flammenblitze; Feuer setzt auf Feuerzauber.',
      aoe: 'Meister des Fernkampf-Flächenschadens, stärker und vielseitiger als bei jeder anderen Klasse.',
      apm: 'Ein ruhiges Tempo mit überwiegend langen Zaubern und wenigen zusätzlichen Eingaben: Feuerball macht den Großteil des Zauberns aus, und Feuerschlag gibt nach seiner Abklingzeit immer eine Aufladung für einen schnelleren Pyroschlag.',
      burst:
        'Landet verheerend schwere Treffer und kritischen Schaden: Mit 3 Stapeln Aufwärmen braucht Pyroschlag nur 1,5 Sek. Zauberzeit, und Verbrennung hat 3 Aufladungen.',
      cc: 'Hat einen der besten CC-Zauber (Verwandlung); Feuer selbst bringt nur ein Talent dazu, das zufällig betäubt und bei Zaubern niedriger Ränge seltener auslöst (Einschlag).',
      combatReset:
        'Zum Lösen hat Feuer nur Blinzeln und Frostnova; Eisblock liegt tief im Frost-Talentbaum, Feuer hat ihn also nicht.',
      complexity:
        'Laut den Guides ist Feuer anfangs sehr einfach und beim Leveln etwas komplizierter, sobald Aufwärmen ins Spiel kommt: Feuerschlag gibt immer eine Aufladung für einen schnelleren Pyroschlag.',
      defAbsorb:
        'Eine Manabarriere und ein Zauberschutz gegen Feuer oder Frost (Feuerzauberschutz, Frostzauberschutz), aber ohne das Arkan-Talent, das die Barriere günstiger macht, und ohne Eisblock, ein tiefes Frost-Talent; Magier sind im Nahkampf extrem verwundbar.',
      defKite:
        'Hält Gegner mit grundlegenden Verlangsamungen auf Distanz: Frostschlag verlangsamt ab Level 24 um 40 %, und ein Feuer-Talent verkürzt auch die Zauberzeit des verlangsamenden Frostfeuerblitzes (Verbesserter Feuerball).',
      dotDamage:
        'Vor allem schwere Direkttreffer, Schaden über Zeit nebenbei: Kritische Treffer lassen das Ziel für einen Teil des Schadens brennen (Entzünden), Frostfeuerblitz bringt etwas dazu, und ein Feuer-Talent erhöht den Feuerschaden je Feuereffekt auf dem Ziel.',
      eliteSolo:
        'Extrem verwundbar im Nahkampf und ohne die Frost-Talente, die Verlangsamungen zum Kiten verstärken; Feuer hat außerdem weder die günstigere Manabarriere aus dem Arkan-Baum (Arkane Abschirmung) noch Eisblock, ein tiefes Frost-Talent, daher sind lange Kämpfe gegen einen Elite-Gegner schwer.',
      escape: 'Blinzeln und Frostnova.',
      gearDependency:
        'Feuer braucht ziemlich viel Ausrüstung, um zu skalieren: Entzünden braucht halbwegs beständige kritische Treffer, und auch Aufwärmen entsteht aus kritischen Treffern. Feuer ist auf sehr starke Endgame-Ausrüstung ausgelegt und fällt beim Ausrüsten leicht zurück.',
      procs:
        'Belohnt kritische Treffer und Timing: Krits der wichtigsten Feuerzauber stapeln Aufwärmen, das den nächsten Pyroschlag verkürzt, und laut den Guides hängt die Spec etwas vom Zufall ab, auch wenn Feuerschlag immer eine Aufladung gibt.',
      pvpBattleground:
        'Magier sind Meister des Fernkampf-Flächenschadens, und kritische Treffer wirken im PvP ohne Abzug; aber sie sind im Nahkampf extrem verwundbar, und laut einem Podcast-Gast tut sich ein Feuer-Magier im PvP gegen alles schwer.',
      pvpWorld:
        'Laut einem Podcast-Gast tut sich Feuer im PvP gegen alles schwer; laut den Entwicklern ist nicht jede Spec für PvP gebaut.',
      singleTarget: 'Skaliert stark mit kritischen Treffern und macht in Endgame-Ausrüstung großen Schaden.',
      soloLeveling: 'Der Magier muss beim Leveln zwischen den Kämpfen Mana auffüllen.',
      survivability:
        'Extrem verwundbar, stirbt schnell im Nahkampf; Feuer hat weder die günstigere Manabarriere aus dem Arkan-Baum (Arkane Abschirmung) noch Eisblock, ein tiefes Frost-Talent.',
      threatControl:
        'Bedrohungssenkung nur über Talente wie Brennende Seele (3 Punkte); Entzünden ist pro Magier getrennt, was Bedrohungsprobleme vermeidet.',
    },
    'mage-frost': {
      soloEndgame:
        'Frost bietet Kampfkontrolle wie keine andere Klasse; laut den Guides der Inbegriff des sicheren Zauberwirkers (Verlangsamungen, Barriere, Eisblock). Gegen große Gruppen sind die Verlangsamungen bewusst begrenzt, damit Magier nicht 20 Gegner allein besiegen.',
      slow: 'Kontrolle ist die Stärke von Frost: Mehrere Zauber verlangsamen (Frostblitz, Kältekegel), Frost-Talente fügen Blizzard eine Verlangsamung von höchstens 40 % hinzu und verlängern alle Kälteeffekte um bis zu 33 %, und laut den Guides ist Frost der Meister der Fernkampf-Verlangsamung.',
      themeElements: 'Magier schleudern mächtige Frost- und Flammenblitze; Frost setzt auf Frostzauber.',
      levelingDowntime:
        'Stellt Essen und Wasser selbst her, aber der Magier muss beim Leveln zwischen den Kämpfen Mana auffüllen, und laut den Guides kann Frost sich schlecht selbst versorgen. Seine Verlangsamungen erlauben Kiten ohne eigenes Risiko, das spart Gesundheit.',
      aoe: 'Magier sind Meister des Fernkampf-Flächenschadens; Blizzard und Kältekegel sind gegen Goldfarming eingeschränkt.',
      apm: 'Ein mittleres Tempo: Frostblitz als Füller und Eislanze bei Procs von Eisige Finger; laut den Guides einfach, aber mit schnellen Reaktionen.',
      burst:
        'Laut den Guides hat Frost keinen Burst-Cooldown; Eislanze macht gegen eingefrorene Ziele 200 % mehr Schaden, und Eisige Finger behandelt Ziele als eingefroren.',
      cc: 'Hat einen der besten CC-Zauber (Verwandlung), und Frost bringt Kontrolle dazu, die keine andere Klasse erreicht.',
      combatReset:
        'Kommt mit Eisblock, einem Frost-Talent, und Kälteeinbruch, einem tieferen Frost-Talent mit 10 Min. Abklingzeit, aus brenzligen Lagen. Laut den Entwicklern wäre Eisblock für jeden Magier vielleicht in Ordnung, würde aber die Frost-Fantasie verwässern; derzeit gibt es keine Pläne dafür.',
      complexity:
        'Eine sehr einfache Rotation, die nur schnelle Reaktionen auf Procs verlangt: ein Füllzauber, Eislanze bei Procs von Eisige Finger und eine kleine Kombo aus Stapeln, die Kältekegel verstärken.',
      defAbsorb: 'Kann ein defensives Talent tief im eigenen Baum nehmen (Eisblock, 16 Punkte).',
      defKite: 'Frost bietet ein Maß an Kontrolle, das keine andere Klasse hat.',
      dotDamage: 'Schaden über Zeit nur als kleiner Anteil, über Frostfeuerblitz ab Level 40.',
      eliteSolo:
        'Der klassische Sicherheits-Zauberwirker, dessen Verlangsamungen Kiten ohne eigenes Risiko erlauben. Frost kann sich aber schlecht selbst versorgen und im Kampf nicht richtig Gesundheit zurückgewinnen, daher bleiben lange Kämpfe gegen einen Elite-Gegner fordernd.',
      escape:
        'Mehrere Auswege: Blinzeln und Frostnova, dazu zwei tiefe Frost-Talente, Eisblock (16 Punkte) und ein zweites mit 10 Min. Abklingzeit (21 Punkte).',
      procs:
        'Reaktionen auf Procs sind der Kern: Procs von Eisige Finger bestimmen, wann Eislanze gewirkt wird, die gegen eingefrorene Ziele 200 % mehr Schaden macht. Die Entwickler nennen das als ihr Beispiel für eine Proc-Rotation, und die Guides warnen Spieler, denen Reaktionen auf Procs schwerfallen.',
      pvpBattleground:
        'Magier sind Meister des Fernkampf-Flächenschadens, und Frost bietet Kontrolle, die keine andere Klasse erreicht; laut einem Podcast-Gast ist Frost der PvP-Build.',
      pvpWorld:
        'Frost bietet Kontrolle, die keine andere Klasse erreicht; laut einem Podcast-Gast ist Frost derzeit der PvP-Build.',
      singleTarget:
        'Schaden durch Frostblitz und Eislanze, die gegen eingefrorene Ziele 200 % mehr Schaden macht; Frost ist gegen Einzelziele so effektiv wie im AoE.',
      soloLeveling: 'Der klassische Sicherheits-Zauberwirker, der risikoarm kitet, aber mit schwachem Selbsterhalt.',
      survivability:
        'Magier sind extrem verwundbar, und die Wahl der Spezialisierung ist ihre Antwort: Laut den Guides ist Frost dank Verlangsamungen, Eisbarriere und Eisblock schwerer zu töten.',
      threatControl:
        'Kann die Bedrohung im Griff behalten: Ein Talent senkt die Bedrohung des Magiers (Frostkanalisierung), und Eisblock, ein tiefes Frost-Talent, lässt den Magier einen Moment gezogener Aggro überstehen.',
    },
  },
} satisfies GermanClassNotes<EvidenceView<typeof MAGE_SPECS>>;
