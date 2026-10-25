import type { Faction } from '../domain/catalog';
import type { Percent } from '../domain/scoring';
import { t } from './t';

/** Percentage display for scores in [0, 100]. */
export const pct = (score: Percent): string => t('percent', { n: Math.round(score) });

/** Surfaces from the stylesheet (`styles/base.css`: `--surface-1`, `--surface-2`, background of the top card); a test keeps them in sync. */
export const RANKING_SURFACE = '#11141a';
export const SHEET_SURFACE = '#151920';
export const TOP_CARD_BASE = '#171a24';
/** Strongest tint of the top card (start of the gradient); contrast is tightest there. */
export const TOP_CARD_TINT = 0.16;
const TEXT_MIN_CONTRAST = 4.5;
const WHITE = '#ffffff';
/** The last step is pure white. */
const LIGHTENING_STEPS = 100;

/** Red, green and blue of a color `#rrggbb`, each 0 to 255. */
const channels = (hex: string): [number, number, number] =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];

/** Linear light of a channel (0 to 255) per WCAG 2. */
function linearChannel(value: number): number {
  const c = value / 255;
  // Stryker disable next-line EqualityOperator: Channel values are multiples of 1/255, none lies exactly on 0.03928.
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance per WCAG 2. */
function luminance(hex: string): number {
  const [r, g, b] = channels(hex).map(linearChannel) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio per WCAG 2 for colors in the format `#rrggbb`. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const toHexByte = (value: number): string => Math.round(value).toString(16).padStart(2, '0');

/** Mixes the `fraction` of `color` over `base`, like `color-mix(in srgb, …)` on an opaque background. */
export function tint(base: string, color: string, fraction: number): string {
  const c = channels(color);
  return (
    '#' +
    channels(base)
      .map((v, i) => toHexByte(v * (1 - fraction) + c[i]! * fraction))
      .join('')
  );
}

export const topCardSurface = (classColor: string): string => tint(TOP_CARD_BASE, classColor, TOP_CARD_TINT);

/**
 * Official class color as text as long as it reaches 4.5:1 on `surface`, otherwise the class color lightened toward
 * white just enough to reach it, at most to white. Diamond, ring and bar keep the official color.
 */
export function nameColor(classColor: string, surface: string = RANKING_SURFACE): string {
  for (let step = 0; ; step++) {
    const color = step === 0 ? classColor : tint(classColor, WHITE, step / LIGHTENING_STEPS);
    // Stryker disable next-line EqualityOperator: Checked exhaustively (every color #rrggbb on the ranking, the sheet and each class's top-card surface): no contrast is exactly 4.5.
    const readable = contrastRatio(color, surface) >= TEXT_MIN_CONTRAST;
    if (readable || step === LIGHTENING_STEPS) return color;
  }
}

/** Text color on a class color: dark or white, whichever has more contrast. */
export const textColorOn = (background: string): string =>
  // Stryker disable next-line EqualityOperator: Checked exhaustively (every color #rrggbb): none has exactly the same contrast to both text colors.
  contrastRatio('#12122a', background) >= contrastRatio(WHITE, background) ? '#12122a' : WHITE;

/** Name of a faction ("Horde", "Alliance"). */
export const factionLabel = (faction: Faction): string => t(`faction_${faction}`);

/** CSS class list from fixed and conditional names; `false` and `undefined` are left out. */
export const classNames = (...names: (string | false | undefined)[]): string => names.filter(Boolean).join(' ');

/** CSS modifier for a camelCase value, e.g. `dontCare` → `dont-care`. */
export const cssModifier = (value: string): string => value.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
