import { SHARED_NOTES as DE } from '../../i18n/de/evidence/shared';
import { confirmed, withSharedGerman } from './helpers';

/** Evidence entries that apply in several places and therefore share a note; translation in `src/i18n/de/evidence/shared.ts`. */
const SHARED_EVIDENCE_EN = {
  /** Applies to both factions of the Skyborne. */
  skyborneNovelty: confirmed(
    ['skyborne', 'p1', 'p3'],
    'A new race with its own starting zone, Zephras Isle, for levels 1–12; classic-style (SD) models for it are announced for early 2027.',
    { p1: '10:19', p3: '2:15' },
  ),
  /** Combination that already existed in Classic, listed in the article's race and class tables. */
  classicCombo: confirmed(['hero'], 'This race can play this class.'),
  newCombo: confirmed(['deep-dive-panel', 'hero'], 'This race and class combination is new in Forever.'),
};

/** IDs of the shared evidence entries; the German texts bind to them (`SHARED_NOTES`). */
export type SharedEvidenceId = keyof typeof SHARED_EVIDENCE_EN;

export const SHARED_EVIDENCE = withSharedGerman(SHARED_EVIDENCE_EN, DE);
