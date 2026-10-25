import type { Evaluation } from './evaluation';
import { byScoreThenId, isRated, scoreProfile, type ScoredProfile, type ScoringInput } from './scoring';
import { traitValue, type ComboProfile, type Faction, type RaceProfile } from './catalog';
import type { ClassId, RaceId } from './ids';

export interface RaceResult extends ScoredProfile {
  raceId: RaceId;
  isNew: boolean;
}

/**
 * The unambiguously best race or undefined; on a tie or without race answers the top spot would be
 * determined only alphabetically and must not, e.g., trigger a profession synergy bonus.
 */
export function uniqueTopRaceId(races: RaceResult[]): RaceId | undefined {
  const [first, second] = races;
  if (!first || !isRated(first.match)) return undefined;
  if (second && second.score >= first.score) return undefined;
  return first.raceId;
}

/** No chosen faction allows every faction. */
const isAllowed = (faction: Faction, chosen: ReadonlySet<Faction>): boolean => chosen.size === 0 || chosen.has(faction);

/** A race that can play the class, with the combination that allows it. */
interface PlayableRace {
  race: RaceProfile;
  combo: ComboProfile;
}

/** Races that can play the class, with their combination, limited to the chosen factions. */
export function playableRacesFor(
  input: ScoringInput,
  racesById: Map<RaceId, RaceProfile>,
  classId: ClassId,
  factions: ReadonlySet<Faction>,
): PlayableRace[] {
  return input.combos
    .filter((combo) => combo.classId === classId)
    .flatMap((combo) => {
      const race = racesById.get(combo.raceId);
      return race && isAllowed(race.faction, factions) ? [{ race, combo }] : [];
    });
}

/** Race ranking for a class: only valid combinations, filtered by the chosen faction. */
export function rankRaces(input: ScoringInput, { counted, factions }: Evaluation, classId: ClassId): RaceResult[] {
  const racesById = new Map(input.races.map((r) => [r.id, r]));
  return playableRacesFor(input, racesById, classId, factions)
    .map(({ race, combo }) => {
      // `newCombo` is a property of the combination, not of the race, hence added only here.
      const traits = { ...race.traits, newCombo: traitValue(combo.isNew ? 1 : 0) };
      return { raceId: race.id, isNew: combo.isNew, ...scoreProfile(traits, counted, 'race') };
    })
    .sort(byScoreThenId((r) => r.raceId));
}
