import { describe, it, expect } from 'vitest';
import {
  classNames,
  cssModifier,
  pct,
  tint,
  contrastRatio,
  nameColor,
  textColorOn,
  RANKING_SURFACE,
  SHEET_SURFACE,
  TOP_CARD_BASE,
  TOP_CARD_TINT,
  topCardSurface,
} from '../../src/ui/format';
import { readStyles } from '../support/styles';
import fc from 'fast-check';
import { CLASSES } from '../../src/data/classes';
import { clampScore } from '../../src/domain/scoring';
import { setLanguage } from '../../src/ui/t';

const hex = fc
  .tuple(fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }))
  .map((rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join(''));

describe('Percentages', () => {
  it('are rounded and written the way the active language writes them', () => {
    expect(pct(clampScore(49.6))).toBe('50%');
    expect(pct(clampScore(49.4))).toBe('49%');
    setLanguage('de');
    expect(pct(clampScore(49.6))).toBe('50 %');
  });
});

describe('Mixing colors', () => {
  it('tint mixes each channel proportionally and writes two-digit hex values', () => {
    expect(tint('#204060', '#a0c0e0', 0.25)).toBe('#406080');
    expect(tint('#000000', '#0a0a0a', 0.5)).toBe('#050505');
    expect(tint('#123456', '#abcdef', 0)).toBe('#123456');
    expect(tint('#123456', '#abcdef', 1)).toBe('#abcdef');
    expect(tint('#000000', '#ffffff', 0.5)).toBe('#808080');
  });
});

describe('CSS classes', () => {
  it('modifiers turn camelCase values into kebab-case and leave lowercase values as they are', () => {
    expect(cssModifier('gateDontCare')).toBe('gate-dont-care');
    expect(cssModifier('answered')).toBe('answered');
  });

  it('a class list leaves out false and undefined and keeps the order', () => {
    expect(classNames('chip', false, 'current', undefined, 'complete')).toBe('chip current complete');
    expect(classNames('chip', false, undefined)).toBe('chip');
  });
});

describe('Class colors in the ranking', () => {
  it('WCAG contrast ratio: symmetric, between 1 and 21', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    fc.assert(
      fc.property(hex, hex, (a, b) => {
        const r = contrastRatio(a, b);
        expect(r).toBeGreaterThanOrEqual(1);
        expect(r).toBeLessThanOrEqual(21);
        expect(contrastRatio(b, a)).toBeCloseTo(r, 9);
      }),
    );
  });

  it('class names stay readable and use the official color where it suffices', () => {
    for (const c of CLASSES) {
      expect(contrastRatio(nameColor(c.color), RANKING_SURFACE), c.id).toBeGreaterThanOrEqual(4.5);
      if (contrastRatio(c.color, RANKING_SURFACE) >= 4.5) expect(nameColor(c.color), c.id).toBe(c.color);
    }
    fc.assert(fc.property(hex, (color) => contrastRatio(nameColor(color), RANKING_SURFACE) >= 4.5));
  });

  it('a class color too dark to read is lightened toward white only as far as needed, so its hue stays', () => {
    const surfaces = [RANKING_SURFACE, SHEET_SURFACE, ...CLASSES.map((c) => topCardSurface(c.color))];
    fc.assert(
      fc.property(hex, fc.constantFrom(...surfaces), (color, surface) => {
        if (contrastRatio(color, surface) >= 4.5) return;
        const lightened = nameColor(color, surface);
        // Some share of white over the color, and the smallest step that reaches the threshold.
        const shares = Array.from({ length: 101 }, (_, i) => i / 100);
        const share = shares.find((f) => tint(color, '#ffffff', f) === lightened);
        expect(share, `${color} on ${surface}`).toBeDefined();
        expect(contrastRatio(lightened, surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(tint(color, '#ffffff', share! - 0.01), surface)).toBeLessThan(4.5);
      }),
    );
  });

  it('on a surface where no lightened color reaches 4.5:1, a class name is at most white', () => {
    expect(nameColor('#c69b6d', '#ffffff')).toBe('#ffffff');
  });

  it('text on class color ("View character sheet" button) reaches 4.5:1', () => {
    for (const c of CLASSES) expect(contrastRatio(textColorOn(c.color), c.color), c.id).toBeGreaterThanOrEqual(4.5);
  });
});

describe('Contrast references and surfaces', () => {
  it('WCAG reference values (channels, weights, gamma)', () => {
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 2);
    expect(contrastRatio('#ff0000', '#ffffff')).toBeCloseTo(4.0, 2);
    expect(contrastRatio('#0000ff', '#ffffff')).toBeCloseTo(8.59, 2);
    expect(contrastRatio('#00ff00', '#000000')).toBeCloseTo(15.3, 1);
    expect(contrastRatio('#080808', '#000000')).toBeCloseTo(1.049, 3);
  });

  it('threshold is exactly 4.5:1', () => {
    const grays = Array.from({ length: 256 }, (_, v) => '#' + v.toString(16).padStart(2, '0').repeat(3));
    const below = grays.find(
      (g) => contrastRatio(g, RANKING_SURFACE) >= 4.4 && contrastRatio(g, RANKING_SURFACE) < 4.5,
    )!;
    const above = grays.find((g) => contrastRatio(g, RANKING_SURFACE) >= 4.5)!;
    expect(nameColor(below)).not.toBe(below);
    expect(nameColor(above)).toBe(above);
  });

  it('class names also stay readable on the tinted rank 1 card and in the sheet', () => {
    for (const c of CLASSES) {
      const top = topCardSurface(c.color);
      expect(contrastRatio(nameColor(c.color, top), top), c.id).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(nameColor(c.color, SHEET_SURFACE), SHEET_SURFACE), c.id).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('the surfaces in format.ts match the tokens in the stylesheet', () => {
    const css = readStyles();
    expect(css).toMatch(new RegExp(`--surface-1:\\s*${RANKING_SURFACE}`, 'i'));
    expect(css).toMatch(new RegExp(`--surface-2:\\s*${SHEET_SURFACE}`, 'i'));
    const top = css.slice(css.indexOf('.ranking-item.open {'), css.indexOf('}', css.indexOf('.ranking-item.open {')));
    expect(top).toContain(TOP_CARD_BASE);
    expect(top).toContain(`${Math.round(TOP_CARD_TINT * 100)}%`);
    expect(TOP_CARD_TINT).toBeGreaterThan(0);
    for (const c of CLASSES) expect(topCardSurface(c.color), c.id).toBe(tint(TOP_CARD_BASE, c.color, TOP_CARD_TINT));
  });
});
