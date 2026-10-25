// @vitest-environment happy-dom
/* The character sheet: dialog behavior, content, provenance for races and professions, factions, specialization tabs and tags. */
import { describe, it, expect, vi } from 'vitest';
import { act } from 'preact/test-utils';
import { within } from '@testing-library/preact';
import { render } from 'preact';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { CLASSES } from '../../src/data/classes';
import { dualSpec, bestSpec, type SpecResult } from '../../src/domain/class-scoring';
import { FactorList } from '../../src/ui/FactorList';
import { PROFESSIONS } from '../../src/data/professions';
import { RACES } from '../../src/data/races';
import { recommend, recommendForClass } from '../../src/app/recommendation';
import { LEGACY_PERKS } from '../../src/data/legacy';
import type { Evidence } from '../../src/data/display';
import {
  root,
  setupAppDom,
  mount,
  button,
  click,
  option,
  esc,
  pressTab,
  waitUntil,
  draft,
  ranking,
  sheet,
  openSheetButton,
  openClass,
  key,
  answerMany,
  mobileBar,
} from '../support/ui-helpers';
import { evaluate } from '../../src/domain/evaluation';
import { answersOf, pick } from '../support/fixtures';
import { classId, specId } from '../../src/domain/ids';
import { LEGACY_POINTS_PER_CHARACTER, specById } from '../../src/ui/catalog';

setupAppDom();

describe('Character sheet as a dialog', () => {
  it('is a modal dialog: focus moves in, rest locked, focus trap, Esc closes, focus returns', async () => {
    await mount();
    const cta = openSheetButton();
    await click(cta);
    const dialog = sheet()!;
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(root.querySelector(`#${dialog.getAttribute('aria-labelledby')}`)).toBe(
      within(dialog).getByRole('heading', { level: 2 }),
    );
    const close = button(EN.closeSheet, dialog);
    expect(close.getAttribute('aria-label')).toBe(EN.closeSheet);
    expect(document.activeElement).toBe(close);
    for (const sel of ['.app-head', '.questions-col', '.sidebar', 'footer.app-foot', 'button.mobile-bar']) {
      expect(root.querySelector(sel)!.hasAttribute('inert'), sel).toBe(true);
    }
    expect(document.body.style.overflow).toBe('hidden');
    // Focus trap: Tab from the last element jumps to the first, Shift+Tab from the first to the last.
    const focusables = [...dialog.querySelectorAll<HTMLElement>('button, summary, a[href]')];
    const last = focusables[focusables.length - 1]!;
    last.focus();
    const ev = await pressTab();
    expect(ev.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(focusables[0]);
    const back = await pressTab(true);
    expect(back.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(last);
    // Esc in two steps, regardless of which element comes last in the sheet: an open tooltip closes first.
    const badge = dialog.querySelector<HTMLButtonElement>('button.provenance-badge')!;
    await act(() => {
      badge.focus();
    });
    const tip = root.querySelector(`#${badge.getAttribute('aria-describedby')}`)!;
    expect(tip.hasAttribute('hidden')).toBe(false);
    await act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(tip.hasAttribute('hidden')).toBe(true);
    expect(sheet()).not.toBeNull();
    await act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(sheet()).toBeNull();
    expect(document.activeElement).toBe(openSheetButton());
    expect(root.querySelector('.app-head')!.hasAttribute('inert')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('closes via ✕ and a click on the overlay, not via a click inside the dialog; focus returns to the button in the widget', async () => {
    await mount();
    await click(ranking()[3]!.querySelector<HTMLButtonElement>('button.ranking-head')!);
    const row = button(EN.openSheet, ranking()[3] as HTMLElement);
    await click(row);
    await click(within(sheet()!).getByRole('heading', { level: 2 }));
    expect(sheet()).not.toBeNull();
    await click(root.querySelector<HTMLElement>('.sheet-overlay')!);
    expect(sheet()).toBeNull();
    expect(document.activeElement).toBe(row);
    await click(row);
    await click(button(EN.closeSheet, sheet()!));
    expect(sheet()).toBeNull();
    expect(document.activeElement).toBe(row);
  });

  it('on mobile the sheet opens above the drawer; Esc closes only the sheet', async () => {
    await mount();
    await click(mobileBar());
    await click(openSheetButton());
    expect(sheet()).not.toBeNull();
    await act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(sheet()).toBeNull();
    expect(root.querySelector('.sidebar')!.getAttribute('role')).toBe('dialog');
  });

  it('with the sheet open, also locks the beta line, notices and save panel', async () => {
    history.replaceState(null, '', '/#s=broken');
    await mount();
    await waitUntil(() => expect(root.querySelector('.app > .notice')).not.toBeNull());
    await click(button(EN.saveTitle));
    await click(openSheetButton());
    for (const sel of ['.beta', '.app > .notice', '.save-panel']) expect(root.querySelector(sel), sel).not.toBeNull();
    for (const sel of ['.beta', '.app > .notice', '.save-panel'])
      expect(root.querySelector(sel)!.hasAttribute('inert'), sel).toBe(true);
  });

  it('Esc on a tooltip first closes only the tooltip', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(openSheetButton());
    const badge = sheet()!.querySelector<HTMLButtonElement>('button.provenance-badge')!;
    const tip = root.querySelector<HTMLElement>(`#${badge.getAttribute('aria-describedby')}`)!;
    badge.focus();
    await act(() => {
      badge.dispatchEvent(new FocusEvent('focus'));
    });
    expect(tip.hidden).toBe(false);
    await esc(badge);
    expect(tip.hidden).toBe(true);
    expect(sheet()).not.toBeNull();
    await esc(badge);
    expect(sheet()).toBeNull();
  });

  it('scroll lock: above the drawer it remains after the sheet and ends with the drawer', async () => {
    await mount();
    await click(mobileBar());
    await click(openSheetButton());
    await esc();
    expect(sheet()).toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
    await esc();
    expect(root.querySelector('.sidebar')!.getAttribute('role')).toBe('complementary');
    expect(document.body.style.overflow).toBe('');
  });

  it('scroll lock does not get stuck when the drawer under the sheet closes at desktop width', async () => {
    const listeners: ((e: { matches: boolean }) => void)[] = [];
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: (_: string, l: (e: { matches: boolean }) => void) => listeners.push(l),
      removeEventListener: () => undefined,
    }));
    await mount();
    await click(mobileBar());
    await click(openSheetButton());
    await act(() => listeners.forEach((l) => l({ matches: true })));
    expect(sheet()).not.toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
    await esc();
    expect(document.body.style.overflow).toBe('');
  });

  it('Esc with a tooltip opened by hover in the sheet closes only the tooltip', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(openSheetButton());
    const badge = sheet()!.querySelector<HTMLButtonElement>('button.provenance-badge')!;
    const tip = root.querySelector<HTMLElement>(`#${badge.getAttribute('aria-describedby')}`)!;
    await act(() => {
      badge.closest('.tip')!.dispatchEvent(new MouseEvent('mouseenter'));
    });
    expect(tip.hidden).toBe(false);
    await act(() => {
      button(EN.closeSheet, sheet()!).dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    expect(tip.hidden).toBe(true);
    expect(sheet()).not.toBeNull();
  });
});

describe('Content of the character sheet', () => {
  it('without Legacy answers, points out that the perks are not personalized', async () => {
    await mount();
    await click(openSheetButton());
    expect(sheet()!.textContent).toContain(EN.noLegacyPreference);
  });

  it('has every section of the sheet', async () => {
    await mount();
    await click(option('role', 'tank'));
    const top = ranking()[0]!;
    const name = top.querySelector('.class-name')!.textContent!;
    await click(openSheetButton());
    const dialog = sheet()!;
    expect(dialog.querySelector('.sheet-label')!.textContent).toBe(EN.sheetLabel);
    expect(within(dialog).getByRole('heading', { level: 2 }).textContent).toBe(name);
    expect(dialog.querySelector('.sheet-score')!.textContent).toBe(top.querySelector('.score-value')!.textContent);
    expect(dialog.querySelector('.spec-card.main')).not.toBeNull();
    expect(dialog.querySelector('.spec-card.dual .eyebrow')!.textContent).toBe(EN.dualSpec);
    expect(dialog.querySelector('.factors.good')).not.toBeNull();
    const races = dialog.querySelectorAll('.race-list > li');
    expect(races.length).toBeGreaterThan(0);
    expect(races.length).toBeLessThanOrEqual(3);
    const headings = within(dialog)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    for (const h of [EN.topRaces, EN.professionsPair, EN.professionsSecondary, EN.legacyTitle])
      expect(headings, h).toContain(h);
    expect(dialog.querySelector('.professions details > summary')!.textContent).toBe(EN.alternatives);
    expect(dialog.querySelectorAll('.perks > li').length).toBeGreaterThan(0);
  });

  it('shows what the application recommends for the class, in its order', async () => {
    await mount();
    await click(option('role', 'ranged'));
    await click(option('culture', 'arcane'));
    const mageRow = ranking().find((i) => i.querySelector('.class-name')!.textContent === 'Mage')!;
    await click(mageRow.querySelector<HTMLButtonElement>('button.ranking-head')!);
    await click(
      button(
        EN.openSheet,
        ranking().find((i) => i.querySelector('.class-name')!.textContent === 'Mage') as HTMLElement,
      ),
    );
    const dialog = sheet()!;
    const a = draft();
    const mage = recommend(a).ranking.find((r) => r.classId === 'mage')!;
    const specName = (id: string) => specById.get(specId(id))!.name.en;
    expect(dialog.querySelector('.spec-card.main strong')!.textContent).toBe(specName(bestSpec(mage).specId));
    expect(dialog.querySelector('.spec-card.dual strong')!.textContent).toBe(specName(dualSpec(mage)!.specId));
    expect(dialog.querySelector('.sheet-summary .class-summary')!.textContent).toBe(
      CLASSES.find((c) => c.id === 'mage')!.summary.en,
    );
    // The sheet shows what the application recommends for the class, in that order.
    const details = recommendForClass(evaluate(QUESTIONS, a), classId('mage'));
    const scores = [...dialog.querySelectorAll('.race-list > li')].map((li) =>
      Number(li.querySelector('.race-score')!.textContent!.replace(/\D/g, '')),
    );
    expect(scores).toEqual(details.races.map((r) => Math.round(r.score)));
    expect(dialog.querySelector('.sheet-races .help')).toBeNull();
    const pairs = [details.professionPairs!.best, ...details.professionPairs!.alternatives];
    const nameOf = (id: string) => PROFESSIONS.find((p) => p.id === id)!.name.en;
    const shownPairs = [...dialog.querySelectorAll('.professions .pair-head strong')].map((e) => e.textContent);
    expect(shownPairs).toEqual(pairs.map((p) => p.professionIds.map(nameOf).join(' + ')));
    expect(dialog.querySelectorAll('.professions details .pair')).toHaveLength(
      details.professionPairs!.alternatives.length,
    );
    expect(dialog.querySelectorAll('.perks > li')).toHaveLength(details.legacyPerks.length);
  });

  it('the profession pairs with their scores are those the application recommends for the leading race', async () => {
    await mount();
    await click(option('role', 'ranged'));
    await click(option('culture', 'honor'));
    const a = draft();
    const top = recommend(a).ranking[0]!;
    const details = recommendForClass(evaluate(QUESTIONS, a), top.classId);
    // A leading race, so the shown pairs carry its synergies (the rule itself is tested in tests/app).
    expect(details.topRaceId).toBeDefined();
    const nameOf = (id: string) => PROFESSIONS.find((p) => p.id === id)!.name.en;
    const expected = [details.professionPairs!.best, ...details.professionPairs!.alternatives].map(
      (p) => `${p.professionIds.map(nameOf).join(' + ')} ${Math.round(p.score)}`,
    );
    await click(openSheetButton());
    const shown = [...sheet()!.querySelectorAll('.professions .pair-head')].map(
      (e) =>
        `${e.querySelector('strong')!.textContent} ${e.querySelector('.pair-score')!.textContent!.replace(/\D/g, '')}`,
    );
    expect(shown).toEqual(expected);
  });

  it('without race answers the sheet points out equivalent races', async () => {
    await mount();
    await click(openSheetButton());
    expect(sheet()!.querySelector('.sheet-races .help')!.textContent).toBe(EN.noRacePreference);
  });

  it('the sheet speaks of "Legacy perks" (official term)', async () => {
    await mount();
    await click(openSheetButton());
    expect(sheet()!.textContent).toContain(EN.legacyTitle);
    expect(sheet()!.textContent).not.toContain('Perk');
  });

  it('the sheet explains the provenance badges in its own legend', async () => {
    await mount();
    await click(openSheetButton());
    const legend = sheet()!.querySelector('.legend')!;
    expect(legend).not.toBeNull();
    expect(within(legend as HTMLElement).getByRole('heading', { level: 3 }).textContent).toBe(EN.legendTitle);
    for (const cls of ['confirmed', 'classic', 'unconfirmed', 'estimate', 'community'])
      expect(legend.querySelector(`.provenance-badge-${cls}`), cls).not.toBeNull();
    expect(legend.querySelector('.penalty-badge')).not.toBeNull();
    // The sheet's legend is in addition to the one below the ranking.
    expect(root.querySelector('.sidebar .legend')).not.toBeNull();
  });
});

describe('Provenance for races and professions', () => {
  const evidenceCount = (x: { evidence?: object }) => Object.keys(x.evidence ?? {}).length;
  const checkList = (container: Element, expected: number, where: string) => {
    const items = container.querySelectorAll(':scope > .evidence-list > li');
    expect(items.length, where).toBe(expected);
    for (const li of items) {
      expect(li.querySelector('.evidence-trait')?.textContent?.trim().length ?? 0, where).toBeGreaterThan(0);
      expect(li.querySelector('.provenance-badge'), where).not.toBeNull();
      expect(within(li as HTMLElement).queryByRole('tooltip', { hidden: true }), where).not.toBeNull();
    }
  };

  it('expanded races show trait name, note and badge with tooltip for each trait with an entry', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(openSheetButton());
    let withEvidence = 0;
    for (const li of sheet()!.querySelectorAll('.race-list > li')) {
      const name = li.querySelector('.race-head')!.childNodes[0]!.textContent!.trim();
      const race = RACES.find((r) => r.name.en === name)!;
      expect(race, name).toBeDefined();
      checkList(li.querySelector('details')!, evidenceCount(race), name);
      for (const e of Object.values((race.evidence ?? {}) as Record<string, Evidence>))
        if (e.note) expect(li.textContent, name).toContain(e.note.en);
      withEvidence += evidenceCount(race) > 0 ? 1 : 0;
    }
    expect(withEvidence).toBeGreaterThan(0);
  });

  it('recommended professions show their evidence entries, source links included', async () => {
    await mount();
    await click(openSheetButton());
    let withEvidence = 0;
    for (const block of sheet()!.querySelectorAll('.profession-evidence')) {
      const name = block.getAttribute('data-profession')!;
      const prof = PROFESSIONS.find((p) => p.id === name)!;
      expect(prof, name).toBeDefined();
      checkList(block, evidenceCount(prof), name);
      withEvidence += evidenceCount(prof) > 0 ? 1 : 0;
    }
    expect(withEvidence).toBeGreaterThan(0);
    const sourceLinks = [...sheet()!.querySelectorAll<HTMLElement>('.profession-evidence')].flatMap((block) =>
      within(block).queryAllByRole('link'),
    );
    expect(sourceLinks.length).toBeGreaterThan(0);
  });

  it('provenance appears for primary and secondary professions, with a note and without a duplicate note in the tooltip', async () => {
    await mount();
    await click(openSheetButton());
    for (const sel of ['.professions .pair .profession-evidence', '.professions-secondary .profession-evidence']) {
      const blocks = [...sheet()!.querySelectorAll(sel)];
      expect(blocks.length, sel).toBeGreaterThan(0);
      for (const block of blocks) {
        const prof = PROFESSIONS.find((p) => p.id === block.getAttribute('data-profession'))!;
        const items = [...block.querySelectorAll('.evidence-list > li')];
        expect(items, `${sel} ${prof.id}`).toHaveLength(Object.keys(prof.evidence ?? {}).length);
        for (const [i, [, e]] of Object.entries(prof.evidence ?? {}).entries()) {
          const li = items[i]!;
          if (e?.note) {
            expect(li.textContent, prof.id).toContain(e.note.en);
            const badge = li.querySelector('.provenance-badge')!;
            expect(
              root.querySelector(`#${badge.getAttribute('aria-describedby')}`)!.textContent,
              prof.id,
            ).not.toContain(e.note.en);
          }
        }
      }
    }
  });
});

describe('Faction of the races in the sheet', () => {
  it('every recommended race names its faction', async () => {
    await mount();
    await click(openSheetButton());
    const items = [...sheet()!.querySelectorAll('.race-list > li')];
    expect(items.length).toBeGreaterThan(0);
    for (const li of items) {
      const name = li.querySelector('.race-head')!.childNodes[0]!.textContent!.trim();
      const race = RACES.find((r) => r.name.en === name)!;
      expect(li.querySelector('.faction')!.textContent, name).toBe(
        race.faction === 'horde' ? EN.faction_horde : EN.faction_alliance,
      );
    }
  });
});

describe('All specializations in the sheet', () => {
  const tabs = () => within(sheet()!).getAllByRole<HTMLButtonElement>('tab');
  const panel = () => within(sheet()!).getByRole('tabpanel');
  const selected = () => tabs().filter((t) => t.getAttribute('aria-selected') === 'true');
  const factorsText = (el: Element) => [...el.querySelectorAll('.factors li')].map((li) => li.textContent);
  /** Text and provenance badge of every point on one side, so notes and provenance count, not just the labels. */
  const side = (el: Element, tone: 'good' | 'bad') =>
    [...el.querySelectorAll(`.factors.${tone} li`)].map(
      (li) => `${li.textContent}|${li.querySelector('.provenance-badge')?.className ?? ''}`,
    );
  /** The factor list as rendered on its own for a spec's results, with the evidence of `specId`. */
  function reference(spec: SpecResult, specId = spec.specId) {
    const host = document.createElement('div');
    render(
      <FactorList matches={spec.matches} conflicts={spec.conflicts} penalties={spec.penalties} specId={specId} />,
      host,
    );
    return host;
  }

  /** Opens the sheet of the class whose specializations differ in their deal-breaker deductions. */
  async function openWithPenalty() {
    await mount();
    await answerMany();
    await click(option('deal-breakers', 'weak-solo'));
    const result = recommend(draft()).ranking.find(
      (c) => c.specs.some((s, i) => i > 0 && s.penalties.length > 0) && bestSpec(c).penalties.length === 0,
    )!;
    expect(result, 'a class whose best spec has no deduction but another one has').toBeDefined();
    await openClass(result.classId);
    await click(openSheetButton());
    return result;
  }

  it('every specialization appears as a tab in score order with name, percentage and label by position', async () => {
    const result = await openWithPenalty();
    const specName = (id: string) => specById.get(specId(id))!.name.en;
    expect(sheet()!.querySelector('.spec-cards')!.getAttribute('role')).toBe('tablist');
    expect(tabs()).toHaveLength(result.specs.length);
    expect(tabs().map((t) => t.querySelector('strong')!.textContent)).toEqual(
      result.specs.map((s) => specName(s.specId)),
    );
    expect(tabs().map((t) => t.querySelector('.spec-score')!.textContent)).toEqual(
      result.specs.map((s) => `${Math.round(s.score)}%`),
    );
    expect(tabs().map((t) => t.querySelector('.eyebrow')?.textContent ?? null)).toEqual(
      result.specs.map((_, i) => [EN.mainSpec, EN.dualSpec][i] ?? null),
    );
    expect(tabs().map((t) => ['main', 'dual', 'other'].find((c) => t.classList.contains(c)))).toEqual(
      result.specs.map((_, i) => ['main', 'dual'][i] ?? 'other'),
    );
  });

  it('the best specialization is selected first; selecting another shows its factors and deductions', async () => {
    const result = await openWithPenalty();
    expect(selected()).toEqual([tabs()[0]]);
    expect(tabs().map((t) => t.classList.contains('selected'))).toEqual(tabs().map((_, i) => i === 0));
    const ids = [panel().id, ...tabs().map((t) => t.id)];
    expect(ids.every((id) => id.length > 0)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    expect(panel().getAttribute('aria-labelledby')).toBe(tabs()[0]!.id);
    for (const t of tabs()) expect(t.getAttribute('aria-controls')).toBe(panel().id);
    expect(panel().querySelector('li.penalty')).toBeNull();
    const before = factorsText(panel());
    const index = result.specs.findIndex((s) => s.penalties.length > 0);
    await click(tabs()[index]!);
    expect(selected()).toEqual([tabs()[index]]);
    expect(panel().getAttribute('aria-labelledby')).toBe(tabs()[index]!.id);
    expect(panel().querySelectorAll('li.penalty')).toHaveLength(result.specs[index]!.penalties.length);
    expect(factorsText(panel())).not.toEqual(before);
    // Pros, cons and deductions with notes and provenance are exactly those of the selected spec.
    const chosen = result.specs[index]!;
    const expected = reference(chosen);
    for (const tone of ['good', 'bad'] as const) {
      expect(side(expected, tone), `${tone} differs from the best spec, so the comparison can fail`).not.toEqual(
        side(reference(bestSpec(result)), tone),
      );
      expect(side(panel(), tone)).toEqual(side(expected, tone));
    }
    expect(
      side(reference(chosen, bestSpec(result).specId), 'bad'),
      'the evidence of the best spec reads differently',
    ).not.toEqual(side(expected, 'bad'));
    // The class description belongs to all specializations: it stays, outside the panel of the selected one.
    expect(sheet()!.querySelector('.sheet-summary .class-summary')!.textContent).toBe(
      CLASSES.find((c) => c.id === result.classId)!.summary.en,
    );
    expect(panel().querySelector('.class-summary')).toBeNull();
  });

  it('arrow keys move to the neighboring tab and select it, wrapping around; only the selected tab is in the tab order', async () => {
    await openWithPenalty();
    const count = tabs().length;
    expect(tabs().map((t) => t.tabIndex)).toEqual(tabs().map((_, i) => (i === 0 ? 0 : -1)));
    await act(() => tabs()[0]!.focus());
    const arrow = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    await act(() => {
      tabs()[0]!.dispatchEvent(arrow);
    });
    // The arrow moves between tabs and does not scroll the dialog.
    expect(arrow.defaultPrevented).toBe(true);
    expect(selected()).toEqual([tabs()[1]]);
    expect(document.activeElement).toBe(tabs()[1]);
    expect(tabs().map((t) => t.tabIndex)).toEqual(tabs().map((_, i) => (i === 1 ? 0 : -1)));
    await key(tabs()[1]!, 'ArrowLeft');
    await key(tabs()[0]!, 'ArrowLeft');
    expect(selected()).toEqual([tabs()[count - 1]]);
    expect(document.activeElement).toBe(tabs()[count - 1]);
    await key(tabs()[count - 1]!, 'ArrowRight');
    expect(selected()).toEqual([tabs()[0]]);
    expect(document.activeElement).toBe(tabs()[0]);
    await key(tabs()[0]!, 'ArrowLeft');
    // With a modifier the arrow belongs to the browser.
    await act(() => {
      tabs()[count - 1]!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', altKey: true, bubbles: true }),
      );
    });
    expect(selected()).toEqual([tabs()[count - 1]]);
  });

  it('for every class the tabs follow the score order of its specializations', async () => {
    await mount();
    await answerMany();
    const results = recommend(draft()).ranking;
    const specName = (id: string) => specById.get(specId(id))!.name.en;
    // Not trivially alphabetical: at least one class orders its specs differently from their names.
    expect(
      results.some(
        (r) =>
          r.specs.map((s) => s.specId).join() !==
          [...r.specs]
            .map((s) => s.specId)
            .sort()
            .join(),
      ),
    ).toBe(true);
    for (const result of results) {
      await openClass(result.classId);
      await click(openSheetButton());
      const scores = result.specs.map((s) => s.score);
      expect(scores, result.classId).toEqual([...scores].sort((a, b) => b - a));
      expect(
        tabs().map((t) => t.querySelector('strong')!.textContent),
        result.classId,
      ).toEqual(result.specs.map((s) => specName(s.specId)));
      await esc();
    }
  });
});

describe('Tags in the character sheet', () => {
  /** Opens the sheet of a class for answers given as a saved draft. */
  async function sheetFor(cls: string, answers: Record<string, unknown>) {
    localStorage.setItem('wfc.draft.v1', JSON.stringify(answers));
    await mount();
    await openClass(cls);
    await click(openSheetButton());
    return sheet()!;
  }
  const professionName = (id: string) => PROFESSIONS.find((p) => p.id === id)!.name.en;

  it('every shown profession pair lists its synergies, each kind with its own label', async () => {
    const answers = answersOf({ size: pick('large'), faction: pick('horde') });
    const expected = recommendForClass(evaluate(QUESTIONS, answers), classId('druid')).professionPairs!;
    const shown = [expected.best, ...expected.alternatives];
    const label = { partner: EN.synergyPartner, class: EN.synergyClass, race: EN.synergyRace };
    const tags = shown.map((pair) =>
      pair.synergies.map((s) =>
        s.kind === 'partner' ? label.partner : `${label[s.kind]}: ${professionName(s.professionId)}`,
      ),
    );
    // These answers must bring every kind, or the test would prove less than its name says.
    expect(new Set(shown.flatMap((p) => p.synergies.map((s) => s.kind)))).toEqual(
      new Set(['partner', 'class', 'race']),
    );
    const dialog = await sheetFor('druid', answers);
    const rendered = [...dialog.querySelectorAll('.pair')].map((pair) =>
      [...pair.querySelectorAll('.tags .tag')].map((t) => t.textContent),
    );
    expect(rendered).toEqual(tags);
  });

  it('races that are new combinations in Forever carry the tag; perks name their tree; the Legacy hint names the points', async () => {
    const answers = answersOf({ novelty: pick('skyborne') });
    const expected = recommendForClass(evaluate(QUESTIONS, answers), classId('druid'));
    expect(expected.races.some((r) => r.isNew)).toBe(true);
    const dialog = await sheetFor('druid', answers);
    const raceItems = [...dialog.querySelectorAll('.race-list > li')];
    expect(raceItems.map((li) => li.querySelector('.tag.new')?.textContent ?? null)).toEqual(
      expected.races.map((r) => (r.isNew ? EN.newCombo : null)),
    );
    const trees = {
      professions: EN.legacyTree_professions,
      adventure: EN.legacyTree_adventure,
      resourcefulness: EN.legacyTree_resourcefulness,
    };
    expect([...dialog.querySelectorAll('.perk-head .tag')].map((t) => t.textContent)).toEqual(
      expected.legacyPerks.map((p) => trees[LEGACY_PERKS.find((perk) => perk.id === p.perkId)!.tree]),
    );
    expect(dialog.textContent).toContain(EN.legacyHint.replace('{points}', String(LEGACY_POINTS_PER_CHARACTER)));
  });
});
