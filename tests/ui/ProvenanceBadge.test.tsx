// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from 'preact';
import { within } from '@testing-library/preact';
import { ProvenanceBadge } from '../../src/ui/ProvenanceBadge';
import { Icon, type IconName } from '../../src/ui/Icon';
import { Legend } from '../../src/ui/Legend';
import { EN_UI as EN } from '../../src/ui/texts';
import { EvidenceList } from '../../src/ui/EvidenceList';
import { RACES } from '../../src/data/races';
import { RACE_TRAITS } from '../../src/data/traits';
import { PROFESSIONS, PROFESSION_TRAITS } from '../../src/data/professions';
import { SOURCES, sourceUrl, type SourceId } from '../../src/data/sources';
import { setLanguage } from '../../src/ui/t';
import type { Evidence, TraitDefinition } from '../../src/data/display';

// An additional source with an http address to check the https filter; the real sources are kept.
vi.mock('../../src/data/sources', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../src/data/sources')>();
  return {
    ...original,
    SOURCES: {
      ...original.SOURCES,
      httpOnly: { title: { en: 'Insecure source', de: 'Unsichere Quelle' }, url: { en: 'http://example.org/' } },
    },
  };
});

let root: HTMLDivElement;
beforeEach(() => {
  root = document.createElement('div');
  document.body.append(root);
});
afterEach(() => {
  render(null, root);
  root.remove();
});

// Tests start in English (tests/support/setup.ts), so the English address and title apply.
const urlOf = (id: SourceId) => sourceUrl(SOURCES[id], 'en');
const titleOf = (id: SourceId) => SOURCES[id].title.en;
const withUrl = (Object.keys(SOURCES) as SourceId[]).filter((id) => urlOf(id)?.startsWith('https://'));
const links = () => within(root).queryAllByRole<HTMLAnchorElement>('link');
/** The badge's tooltip; it stays in the DOM while closed, so hidden elements count. */
const tooltip = () => within(root).getByRole('tooltip', { hidden: true });
const show = (evidence: Evidence) => render(<ProvenanceBadge evidence={evidence} />, root);

describe('Source links on the provenance badge', () => {
  it('every https source of a confirmed entry gets a link, in the order of the sources, after the badge', () => {
    const ids = withUrl.slice(0, 3);
    expect(ids).toHaveLength(3);
    show({ provenance: 'confirmed', sources: ids, note: { en: 'Note.', de: 'Notiz.' } });
    expect(links().map((a) => a.getAttribute('href'))).toEqual(ids.map(urlOf));
    const children = [...root.querySelector('.provenance-badge-with-links')!.children];
    const badgeIndex = children.findIndex(
      (el) => el.querySelector('.provenance-badge-confirmed') || el.classList.contains('provenance-badge-confirmed'),
    );
    expect(badgeIndex).toBeGreaterThanOrEqual(0);
    for (const a of links()) expect(children.indexOf(a)).toBeGreaterThan(badgeIndex);
  });

  it('"tentative" (unconfirmed) and "community" also link their sources', () => {
    for (const provenance of ['unconfirmed', 'community'] as const) {
      show({ provenance, sources: [withUrl[0]!], note: { en: 'Note.', de: 'Notiz.' } });
      expect(links(), provenance).toHaveLength(1);
    }
  });

  it('"from Classic" and "estimate" get no link, even if a source with a web address is listed', () => {
    for (const provenance of ['classic', 'estimate'] as const) {
      show({ provenance, sources: [withUrl[0]!], note: { en: 'Note.', de: 'Notiz.' } });
      expect(links(), provenance).toHaveLength(0);
    }
  });

  it('sources without an https address are not linked', () => {
    show({
      provenance: 'confirmed',
      sources: ['httpOnly' as SourceId, withUrl[0]!],
      note: { en: 'Note.', de: 'Notiz.' },
    });
    expect(links().map((a) => a.getAttribute('href'))).toEqual([urlOf(withUrl[0]!)]);
  });
});

describe('Source links per language', () => {
  it('the badge links the version in the active language, otherwise the available one', () => {
    const both = withUrl.find((id) => SOURCES[id].url?.de && SOURCES[id].url?.en)!;
    const enOnly = withUrl.find((id) => !SOURCES[id].url?.de && SOURCES[id].url?.en)!;
    expect(both).toBeDefined();
    expect(enOnly).toBeDefined();
    for (const lang of ['de', 'en'] as const) {
      setLanguage(lang);
      show({ provenance: 'confirmed', sources: [both, enOnly], note: { en: 'Note.', de: 'Notiz.' } });
      expect(
        links().map((a) => a.getAttribute('href')),
        lang,
      ).toEqual([SOURCES[both].url![lang], SOURCES[enOnly].url!.en]);
    }
  });
});

describe('Tooltip text on the provenance badge', () => {
  it('note and sources are joined without a dash', () => {
    show({ provenance: 'confirmed', sources: [withUrl[0]!], note: { en: 'A note.', de: 'Eine Notiz.' } });
    const text = tooltip().textContent!;
    expect(text).toContain('A note.');
    expect(text).toContain(titleOf(withUrl[0]!));
    expect(text).not.toMatch(/\s[–—]\s/);
  });
});

describe('Timestamps on podcast sources', () => {
  const p2 = { title: titleOf('p2'), url: urlOf('p2')! };
  const priestWarrior = { title: titleOf('deep-dive-priest-warrior'), url: urlOf('deep-dive-priest-warrior')! };

  it('link jumps to the timestamp, other sources stay unchanged', () => {
    show({
      provenance: 'confirmed',
      sources: ['p2', 'deep-dive-priest-warrior'],
      at: { p2: '1:01:13' },
      note: { en: 'Note.', de: 'Notiz.' },
    });
    expect(links().map((a) => a.getAttribute('href'))).toEqual([`${p2.url}&t=3673s`, priestWarrior.url]);
  });

  it('minute timestamps are converted to seconds', () => {
    show({ provenance: 'unconfirmed', sources: ['p2'], at: { p2: '9:28' }, note: { en: 'Note.', de: 'Notiz.' } });
    expect(links()[0]!.getAttribute('href')).toBe(`${p2.url}&t=568s`);
  });

  it('tooltip names the timestamp after the title', () => {
    show({
      provenance: 'confirmed',
      sources: ['p2', 'deep-dive-priest-warrior'],
      at: { p2: '18:01' },
      note: { en: 'Note.', de: 'Notiz.' },
    });
    const text = tooltip().textContent!;
    expect(text).toContain(`${p2.title} at 18:01`);
    expect(text).toContain(priestWarrior.title);
    expect(text).not.toContain(`${priestWarrior.title} at`);
  });
});

describe('Provenance list for races and professions', () => {
  it('shows for every race and every profession exactly the traits with an entry, with name and badge', () => {
    const cases = [
      ...RACES.map((r) => ({ id: r.id, evidence: r.evidence, traits: RACE_TRAITS as Record<string, TraitDefinition> })),
      ...PROFESSIONS.map((p) => ({
        id: p.id,
        evidence: p.evidence,
        traits: PROFESSION_TRAITS as Record<string, TraitDefinition>,
      })),
    ];
    for (const c of cases) {
      render(<EvidenceList evidence={c.evidence} traits={c.traits} />, root);
      const keys = Object.keys(c.evidence ?? {});
      const items = [...root.querySelectorAll('.evidence-list > li')];
      expect(
        items.map((li) => li.querySelector('.evidence-trait')!.textContent),
        c.id,
      ).toEqual(keys.map((k) => `${c.traits[k]!.label.en}:`));
      for (const li of items) expect(li.querySelector('.provenance-badge'), c.id).not.toBeNull();
      if (keys.length === 0) expect(root.querySelector('.evidence-list'), c.id).toBeNull();
      render(null, root);
    }
  });
});

describe('Provenance as an icon', () => {
  const NAMES = {
    confirmed: EN.provenance_confirmed,
    classic: EN.provenance_classic,
    unconfirmed: EN.provenance_unconfirmed,
    estimate: EN.provenance_estimate,
    community: EN.provenance_community,
  } as const;
  const kinds = Object.keys(NAMES) as (keyof typeof NAMES)[];
  const symbolOf = (el: Element) => [...el.querySelectorAll('svg path, svg circle')].map((p) => p.outerHTML).join('');

  it('badge without visible text, name on the icon and in the tooltip (also without note and sources)', () => {
    for (const provenance of kinds) {
      show({ provenance, sources: [withUrl[0]!], note: { en: 'Note.', de: 'Notiz.' } });
      const badge = root.querySelector(`.provenance-badge-${provenance}`)!;
      expect(badge.textContent!.trim(), provenance).toBe('');
      expect(badge.querySelector('svg'), provenance).not.toBeNull();
      expect(badge.getAttribute('aria-label'), provenance).toBe(NAMES[provenance]);
      expect(tooltip().textContent, provenance).toContain(NAMES[provenance]);
      render(<ProvenanceBadge evidence={{ provenance }} />, root);
      const bare = root.querySelector(`.provenance-badge-${provenance}`)!;
      expect(bare.textContent!.trim(), provenance).toBe('');
      expect(bare.getAttribute('aria-label'), provenance).toBe(NAMES[provenance]);
      expect(tooltip().textContent, provenance).toBe(NAMES[provenance]);
      render(null, root);
    }
  });

  it('five distinguishable icons', () => {
    const symbols = kinds.map((provenance) => {
      render(<ProvenanceBadge evidence={{ provenance }} />, root);
      const symbol = symbolOf(root.querySelector('.provenance-badge')!);
      render(null, root);
      return symbol;
    });
    expect(symbols.every((x) => x.length > 0)).toBe(true);
    expect(new Set(symbols).size).toBe(5);
    // An empty path renders an invisible icon although the element exists.
    for (const provenance of kinds) {
      render(<ProvenanceBadge evidence={{ provenance }} />, root);
      const shapes = [...root.querySelectorAll('.provenance-badge svg path')].map(
        (p) => p.getAttribute('d')?.trim() ?? '',
      );
      expect(shapes.length, provenance).toBeGreaterThan(0);
      expect(
        shapes.every((d) => d.length > 0),
        provenance,
      ).toBe(true);
      render(null, root);
    }
  });

  it('fixed mapping: confirmed check mark, from Classic circular arrow, tentative question mark, estimate wavy lines, community two people', () => {
    const expected = {
      confirmed: 'check',
      classic: 'classic',
      unconfirmed: 'unconfirmed',
      estimate: 'estimate',
      community: 'community',
    } as const satisfies Record<(typeof kinds)[number], IconName>;
    // Only the shape counts; the badge itself sets size and stroke width.
    const shapeOf = (el: Element) => [...el.querySelectorAll('svg path')].map((p) => p.getAttribute('d'));
    for (const provenance of kinds) {
      render(<Icon name={expected[provenance]} />, root);
      const icon = shapeOf(root);
      render(<ProvenanceBadge evidence={{ provenance }} />, root);
      expect(icon.length, provenance).toBeGreaterThan(0);
      expect(shapeOf(root.querySelector('.provenance-badge')!), provenance).toEqual(icon);
      render(null, root);
    }
  });

  it('the legend shows every icon with its name', () => {
    render(<Legend />, root);
    for (const provenance of kinds) {
      const badge = root.querySelector(`.legend .provenance-badge-${provenance}`)!;
      expect(badge, provenance).not.toBeNull();
      expect(badge.querySelector('svg'), provenance).not.toBeNull();
      expect(badge.closest('li')!.textContent, provenance).toContain(NAMES[provenance]);
    }
  });
});
