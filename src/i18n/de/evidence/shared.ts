import type { SharedEvidenceId } from '../../../data/evidence/shared';

/** Notes that apply in several places (Skyborne, race and class combinations). */
export const SHARED_NOTES = {
  skyborneNovelty:
    'Ein neues Volk mit eigenem Startgebiet, der Insel Zephras, für Level 1–12; Modelle im klassischen Stil (SD) sind für Anfang 2027 angekündigt.',
  classicCombo: 'Dieses Volk kann diese Klasse spielen.',
  newCombo: 'Diese Kombination aus Volk und Klasse ist neu in Forever.',
} satisfies Record<SharedEvidenceId, string>;
