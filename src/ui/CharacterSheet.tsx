import { useId, useMemo, useRef, useState } from 'preact/hooks';
import { recommendForClass } from '../app/recommendation';
import type { SpecId } from '../domain/ids';
import type { Evaluation } from '../domain/evaluation';
import { bestSpec, classScore, dualSpec, type ClassResult, type SpecResult } from '../domain/class-scoring';
import type { LegacyTree } from '../domain/catalog';
import type { MessageKey } from './texts';
import { loc, t } from './t';
import { classById, LEGACY_POINTS_PER_CHARACTER, perkById, RACE_TRAITS, raceById, specById } from './catalog';
import { EvidenceList } from './EvidenceList';
import { FactorList } from './FactorList';
import { Icon } from './Icon';
import { arrowStep, neighbor } from './keyboard';
import { Legend } from './Legend';
import { classNames, factionLabel, nameColor, pct, SHEET_SURFACE } from './format';
import { PrimaryProfessions, SecondaryProfessions } from './ProfessionResults';
import { useModal } from './useModal';

const TREE_LABEL: Record<LegacyTree, MessageKey> = {
  professions: 'legacyTree_professions',
  adventure: 'legacyTree_adventure',
  resourcefulness: 'legacyTree_resourcefulness',
};

interface Props {
  result: ClassResult;
  evaluation: Evaluation;
  onClose: () => void;
}

type SpecPosition = 'main' | 'dual';
const POSITION_LABEL: Record<SpecPosition, MessageKey> = { main: 'mainSpec', dual: 'dualSpec' };

/** Main spec, suggestion for the Dual Specialization (from level 40), or neither; the domain decides which is which. */
function positionOf(result: ClassResult, spec: SpecResult): SpecPosition | undefined {
  if (spec.specId === bestSpec(result).specId) return 'main';
  if (spec.specId === dualSpec(result)?.specId) return 'dual';
  return undefined;
}

interface SpecTabsProps {
  result: ClassResult;
  selected: SpecResult;
  onSelect: (specId: SpecId) => void;
  idOf: (specId: SpecId) => string;
  panelId: string;
}

/** All specializations of the class as tabs (WAI-ARIA tabs pattern, selection follows focus). */
function SpecTabs({ result, selected, onSelect, idOf, panelId }: SpecTabsProps) {
  const { specs } = result;
  const onKeyDown = (e: KeyboardEvent) => {
    const step = arrowStep(e);
    if (step === 0) return;
    e.preventDefault();
    const next = neighbor(
      specs.map((s) => s.specId),
      selected.specId,
      step,
    );
    onSelect(next);
    (e.currentTarget as HTMLElement).querySelector<HTMLButtonElement>(`[data-spec="${next}"]`)?.focus();
  };
  return (
    <div class="spec-cards" role="tablist" onKeyDown={onKeyDown}>
      {specs.map((spec) => {
        const position = positionOf(result, spec);
        const isSelected = spec.specId === selected.specId;
        return (
          <button
            key={spec.specId}
            data-spec={spec.specId}
            type="button"
            role="tab"
            id={idOf(spec.specId)}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            class={classNames('spec-card', position ?? 'other', isSelected && 'selected')}
            onClick={() => onSelect(spec.specId)}
          >
            {position && <span class="eyebrow">{t(POSITION_LABEL[position])}</span>}
            <strong>{loc(specById.get(spec.specId)!.name)}</strong>
            <span class="spec-score">{pct(spec.score)}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Character sheet as a modal dialog above the page. */
export function CharacterSheet({ result, evaluation, onClose }: Props) {
  const titleId = useId();
  const tabsId = useId();
  const [selectedSpecId, setSelectedSpecId] = useState(bestSpec(result).specId);
  // After new answers the chosen spec stays selected; the best one takes over only if it is gone.
  const selectedSpec = result.specs.find((s) => s.specId === selectedSpecId) ?? bestSpec(result);
  const tabIdOf = (specId: string) => `${tabsId}-${specId}`;
  const panelId = `${tabsId}-panel`;
  const { dialogRef, closeRef, onKeyDown } = useModal(onClose);
  // undefined: no mousedown seen (e.g. keyboard or test); then only the click target counts.
  const pressedOnOverlay = useRef<boolean | undefined>(undefined);
  const cls = classById.get(result.classId)!;
  const details = useMemo(() => recommendForClass(evaluation, result.classId), [evaluation, result.classId]);
  const noRacePreference = !details.racesRated;
  const noLegacyPreference = !details.legacyRated;

  return (
    <div
      class="sheet-overlay"
      // Only a click that also started on the overlay closes, not the release after selecting text in the dialog.
      onMouseDown={(e) => (pressedOnOverlay.current = e.target === e.currentTarget)}
      onClick={(e) => {
        if (e.target === e.currentTarget && pressedOnOverlay.current !== false) onClose();
        pressedOnOverlay.current = undefined;
      }}
    >
      <div
        ref={dialogRef}
        class="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        style={{ '--class-color': cls.color }}
      >
        <header class="sheet-head">
          <span class="class-diamond" style={{ backgroundColor: cls.color }} />
          <div class="sheet-title">
            <span class="sheet-label">{t('sheetLabel')}</span>
            <h2 id={titleId} style={{ color: nameColor(cls.color, SHEET_SURFACE) }}>
              {loc(cls.name)}
            </h2>
          </div>
          <span class="sheet-score">{pct(classScore(result))}</span>
          <button ref={closeRef} type="button" class="sheet-close" aria-label={t('closeSheet')} onClick={onClose}>
            <Icon name="close" size={18} stroke={2} />
          </button>
        </header>

        <SpecTabs
          result={result}
          selected={selectedSpec}
          onSelect={setSelectedSpecId}
          idOf={tabIdOf}
          panelId={panelId}
        />

        <div class="sheet-summary">
          {/* The description applies to the whole class, so it stays outside the panel of the selected spec. */}
          <p class="class-summary">{loc(cls.summary)}</p>
          {/* Focusable so the panel text is reachable by keyboard even without badges (WAI-ARIA tabs pattern). */}
          <div
            class="spec-panel"
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabIdOf(selectedSpec.specId)}
            tabIndex={0}
          >
            {/* The key resets tooltip and badge state of the list when another spec is selected. */}
            <FactorList
              key={selectedSpec.specId}
              matches={selectedSpec.matches}
              conflicts={selectedSpec.conflicts}
              penalties={selectedSpec.penalties}
              specId={selectedSpec.specId}
            />
          </div>
        </div>

        <section class="sheet-races">
          <h3>{t('topRaces')}</h3>
          {noRacePreference && <p class="help">{t('noRacePreference')}</p>}
          <ul class="race-list">
            {details.races.map((r) => {
              const race = raceById.get(r.raceId)!;
              return (
                <li key={r.raceId}>
                  <details>
                    <summary>
                      <span class="race-head">
                        {loc(race.name)}{' '}
                        <span class={`faction faction-${race.faction}`}>{factionLabel(race.faction)}</span>
                        {r.isNew && <span class="tag new">{t('newCombo')}</span>}
                      </span>
                      {!noRacePreference && <span class="race-score">{pct(r.score)}</span>}
                    </summary>
                    <p>{loc(race.lore)}</p>
                    <p class="racials">{loc(race.racials)}</p>
                    <EvidenceList evidence={race.evidence} traits={RACE_TRAITS} />
                  </details>
                  {!noRacePreference && (
                    <span class="race-meter" aria-hidden="true">
                      <span style={{ width: `${r.score}%` }} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <PrimaryProfessions pairs={details.professionPairs} />
        <SecondaryProfessions professions={details.secondaryProfessions} />

        <section>
          <h3>{t('legacyTitle')}</h3>
          <div class="info-box">
            <p>{t('legacyHint', { points: LEGACY_POINTS_PER_CHARACTER })}</p>
            {noLegacyPreference && <p>{t('noLegacyPreference')}</p>}
          </div>
          <ul class="perks">
            {details.legacyPerks.map((p) => {
              const perk = perkById.get(p.perkId)!;
              return (
                <li key={p.perkId}>
                  <span class="perk-head">
                    <strong>{loc(perk.name)}</strong> <span class="tag">{t(TREE_LABEL[perk.tree])}</span>
                  </span>
                  <span class="help">{loc(perk.summary)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <Legend />
      </div>
    </div>
  );
}
