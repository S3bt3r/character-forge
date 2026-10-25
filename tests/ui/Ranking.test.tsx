// @vitest-environment happy-dom
/* The ranking: live updates, the notice above it, the accordion, rendering and the provenance of the data. */
import { describe, it, expect } from 'vitest';
import { within } from '@testing-library/preact';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { CLASSES } from '../../src/data/classes';
import { nameColor, textColorOn, SHEET_SURFACE, topCardSurface } from '../../src/ui/format';
import { SEVERITY_PENALTY } from '../../src/domain/scoring';
import { classScore } from '../../src/domain/class-scoring';
import { recommend } from '../../src/app/recommendation';
import { SOURCES, sourceUrl } from '../../src/data/sources';
import {
  root,
  setupAppDom,
  mount,
  button,
  click,
  option,
  esc,
  draft,
  ranking,
  sheet,
  openSheetButton,
  classItem,
  scoreOf,
  mobileBar,
} from '../support/ui-helpers';
import { answersOf, pick } from '../support/fixtures';

setupAppDom();

/** Compares colors regardless of whether the DOM environment returns hex or rgb(). */
function cssColor(value: string): string {
  if (!value.startsWith('#')) return value.replace(/\s/g, '');
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
  return `rgb(${r},${g},${b})`;
}

describe('Ranking', () => {
  it('ranking is visible next to the questions, reacts live; a click opens the class widget, the sheet only via the button', async () => {
    await mount();
    expect(root.querySelector('fieldset')).not.toBeNull();
    expect(ranking()).toHaveLength(9);
    expect(scoreOf('Warrior')).toBe(50);

    await click(option('role', 'tank'));
    expect(scoreOf('Warrior')).toBe(100);
    expect(scoreOf('Mage')).toBeLessThan(50);

    const mage = () => classItem('Mage');
    expect(sheet()).toBeNull();
    await click(mage().querySelector<HTMLButtonElement>('button.ranking-head')!);
    // The click only opens the class widget, not the sheet.
    expect(sheet()).toBeNull();
    expect(mage().classList.contains('open')).toBe(true);
    await click(button(EN.openSheet, mage() as HTMLElement));
    expect(within(sheet()!).getByRole('heading', { level: 2 }).textContent).toContain('Mage');
  });

  it('announces only rank 1 as status, not the whole ranking', async () => {
    await mount();
    expect(root.querySelector('.ranking[aria-live]')).toBeNull();
    await click(option('role', 'tank'));
    expect(within(root).getByRole('status').textContent).toMatch(/Rank 1: .+ at \d+%/);
  });

  it('shows deal-breaker deductions in the ranking widget; "View character sheet" opens the sheet of number 1', async () => {
    await mount();
    await click(option('deal-breakers', 'totems'));
    const shaman = classItem('Shaman');
    await click(shaman.querySelector<HTMLButtonElement>('button.ranking-head')!);
    expect(root.querySelector('.ranking-item.open .factors.bad .penalty-cost')?.textContent).toContain('25');
    await click(ranking()[0]!.querySelector<HTMLButtonElement>('button.ranking-head')!);
    const top = ranking()[0]!.querySelector('.class-name')!.textContent!.trim();
    await click(openSheetButton());
    expect(within(sheet()!).getByRole('heading', { level: 2 }).textContent).toContain(top);
  });

  it('the result list is called "Ranking"', async () => {
    await mount();
    const sidebar = within(root).getByRole('complementary', { name: EN.rankingTitle });
    expect(within(sidebar).getByRole('heading', { level: 2 }).textContent).toBe(EN.rankingTitle);
  });

  it('no separate notice that the ranking updates', async () => {
    await mount();
    expect(root.querySelector('.ranking-header')!.textContent).not.toMatch(/updat/i);
  });
});

describe('Notice above the ranking', () => {
  const notice = () => root.querySelector('.ranking .notice')?.textContent;
  const mobileBarText = () => mobileBar().textContent!;

  it('answers that only concern race, professions or Legacy keep "No rating yet"', async () => {
    localStorage.setItem(
      'wfc.draft.v1',
      JSON.stringify(
        answersOf({
          culture: pick('honor'),
          size: pick('small'),
          aesthetic: pick('elegant'),
          novelty: pick('skyborne'),
          'racial-focus': pick('pvp'),
          'racial-escape': pick('stun'),
          'prof-time': pick('low'),
          'legacy-focus': pick('gold'),
        }),
      ),
    );
    await mount();
    expect(notice()).toBe(EN.noRating);
  });

  it('without playstyle answers: "no rating yet", also in the mobile bar', async () => {
    await mount();
    expect(notice()).toBe(EN.noRating);
    expect(mobileBarText()).toContain(EN.noRatingShort);
    // A deal-breaker alone only shifts deductions; it does not rate the playstyle.
    await click(option('deal-breakers', 'pet'));
    expect(notice()).toBe(EN.noRating);
  });

  it('with first playstyle answers: "only a few answers"', async () => {
    await mount();
    await click(option('role', 'tank'));
    expect(notice()).toBe(EN.fewAnswers);
    expect(mobileBarText()).not.toContain(EN.noRatingShort);
  });

  it('no notice once there are enough class-relevant answers', async () => {
    const specQuestions = QUESTIONS.filter(
      (q) =>
        (q.chapter === 'foundation' || q.chapter === 'combat-feel') &&
        q.options[0]!.effects.some((e) => e.kind === 'pref' && e.scope === 'spec'),
    );
    expect(specQuestions.length).toBeGreaterThanOrEqual(8);
    localStorage.setItem(
      'wfc.draft.v1',
      JSON.stringify(Object.fromEntries(specQuestions.map((q) => [q.id, pick(q.options[0]!.id)]))),
    );
    await mount();
    expect(notice()).not.toBe(EN.noRating);
    expect(notice()).not.toBe(EN.fewAnswers);
    expect(mobileBarText()).not.toContain(EN.noRatingShort);
  });
});

describe('Accordion', () => {
  const openItems = () => ranking().filter((i) => i.classList.contains('open'));

  it('without a choice of your own, rank 1 is open as a widget, the other ranks are compact', async () => {
    await mount();
    await click(option('role', 'tank'));
    const items = ranking();
    // Without a choice of your own, rank 1 is open, all others are compact.
    expect(items[0]!.classList.contains('open')).toBe(true);
    expect(items.slice(1).every((i) => !i.classList.contains('open'))).toBe(true);
    const top = items[0]!;
    const cls = CLASSES.find((c) => c.name.en === top.querySelector('.class-name')!.textContent)!;
    expect(top.querySelector('svg.score-ring')).not.toBeNull();
    expect(top.querySelector('.class-summary')!.textContent).toBe(cls.summary.en);
    const column = (tone: 'good' | 'bad') => within(top.querySelector<HTMLElement>(`.factors.${tone}`)!);
    expect(column('good').getByRole('heading', { level: 3 }).textContent).toBe(EN.whyGood);
    expect(column('bad').getByRole('heading', { level: 3 }).textContent).toBe(EN.whyBad);
    expect(button(EN.openSheet, top as HTMLElement).textContent!.trim()).toBe(EN.openSheet);
    items.forEach((item, i) => {
      expect(item.querySelector('.rank')!.textContent, String(i)).toBe(String(i + 1));
      expect(item.querySelector('.class-diamond'), String(i)).not.toBeNull();
      expect(item.querySelector('.score-value')!.textContent, String(i)).toMatch(/^\d+%$/);
    });
    for (const row of items.slice(1)) {
      expect(row.querySelector('button.ranking-head')).not.toBeNull();
      expect(row.querySelector('.class-summary')).toBeNull();
      expect(within(row as HTMLElement).queryByRole('button', { name: EN.openSheet })).toBeNull();
    }
  });

  it('the ring shows the percentage; rows are accordion headers, only the button opens a dialog', async () => {
    await mount();
    await click(option('role', 'tank'));
    const [top, ...rows] = ranking();
    const score = Number(top!.querySelector('.score-value')!.textContent!.replace(/\D/g, ''));
    const arc = top!.querySelectorAll('svg.score-ring circle')[1]!;
    const [dash, total] = arc.getAttribute('stroke-dasharray')!.split(' ').map(Number);
    expect(dash! / total!).toBeCloseTo(classScore(recommend(draft()).ranking[0]!) / 100, 5);
    expect(Math.round((dash! / total!) * 100)).toBe(score);
    expect(button(EN.openSheet, top as HTMLElement).getAttribute('aria-haspopup')).toBe('dialog');
    for (const row of rows) {
      expect(row.querySelector('button.ranking-head')!.getAttribute('aria-expanded')).toBe('false');
      expect(row.querySelector('button.ranking-head')!.hasAttribute('aria-haspopup')).toBe(false);
    }
    expect(top!.querySelector('button.ranking-head')!.getAttribute('aria-expanded')).toBe('true');
    await click(rows[1]!.querySelector<HTMLButtonElement>('button.ranking-head')!);
    expect(ranking()[2]!.querySelector('button.ranking-head')!.getAttribute('aria-expanded')).toBe('true');
    expect(ranking()[0]!.querySelector('button.ranking-head')!.getAttribute('aria-expanded')).toBe('false');
  });

  it('exactly one widget is open; a click switches it, the focus stays on the header', async () => {
    await mount();
    await click(option('role', 'tank'));
    const third = ranking()[2]!;
    const name = third.querySelector('.class-name')!.textContent!;
    const head = third.querySelector<HTMLButtonElement>('button.ranking-head')!;
    head.focus();
    await click(head);
    expect(openItems()).toHaveLength(1);
    expect(classItem(name).classList.contains('open')).toBe(true);
    expect(ranking()[0]!.classList.contains('open')).toBe(false);
    expect(document.activeElement).toBe(classItem(name).querySelector('button.ranking-head'));
    // Compact: only rank, class/spec and percentage; no bar, no description.
    for (const row of ranking().filter((i) => !i.classList.contains('open'))) {
      expect(row.querySelector('.meter')).toBeNull();
      expect(row.querySelector('.class-summary')).toBeNull();
      expect(row.querySelector('.spec-name')).not.toBeNull();
      expect(row.querySelector('.score-value')).not.toBeNull();
    }
    // A click on the open widget leaves it open.
    await click(classItem(name).querySelector<HTMLButtonElement>('button.ranking-head')!);
    expect(classItem(name).classList.contains('open')).toBe(true);
    expect(openItems()).toHaveLength(1);
  });

  it('the chosen class stays open, even if new answers change its rank', async () => {
    await mount();
    await click(option('role', 'tank'));
    const last = ranking()[ranking().length - 1]!;
    const name = last.querySelector('.class-name')!.textContent!;
    await click(last.querySelector<HTMLButtonElement>('button.ranking-head')!);
    await click(option('distance', 'max'));
    expect(classItem(name).classList.contains('open')).toBe(true);
    expect(openItems()).toHaveLength(1);
  });

  it('without a choice of your own, the open widget follows the current rank 1', async () => {
    await mount();
    await click(option('role', 'tank'));
    const firstBefore = ranking()[0]!.querySelector('.class-name')!.textContent;
    await click(option('role', 'tank'));
    await click(option('role', 'healer'));
    const first = ranking()[0]!;
    expect(first.classList.contains('open')).toBe(true);
    expect(first.querySelector('.class-name')!.textContent).not.toBe(firstBefore);
  });
});

describe('Rendering', () => {
  it('shows the faction badge of the picked faction', async () => {
    await mount();
    expect(root.querySelector('.faction-badge')!.textContent).toBe(EN.factionAny);
    expect(root.querySelector('.faction-badge')!.classList.contains('faction-any')).toBe(true);
    await click(option('faction', 'horde'));
    expect(root.querySelector('.faction-badge')!.textContent).toBe(EN.faction_horde);
    expect(root.querySelector('.faction-badge')!.classList.contains('faction-horde')).toBe(true);
    await click(option('faction', 'alliance'));
    expect(root.querySelector('.faction-badge')!.classList.contains('faction-alliance')).toBe(true);
  });

  it('class names in a readable class color, button text matching the class color', async () => {
    await mount();
    for (const item of ranking()) {
      const cls = CLASSES.find((c) => c.name.en === item.querySelector('.class-name')!.textContent)!;
      const name = item.querySelector<HTMLElement>('.class-name')!;
      expect(cssColor(name.style.color), cls.id).toBe(cssColor(nameColor(cls.color)));
    }
    const top = ranking()[0]!;
    const cls = CLASSES.find((c) => c.name.en === top.querySelector('.class-name')!.textContent)!;
    const cta = button(EN.openSheet, top as HTMLElement);
    expect(cssColor(cta.style.color)).toBe(cssColor(textColorOn(cls.color)));
  });

  it('provenance legend and no title attributes', async () => {
    await mount();
    await click(option('role', 'tank'));
    const legend = root.querySelector('.legend')!;
    expect(within(legend as HTMLElement).getByRole('heading', { level: 3 }).textContent).toBe(EN.legendTitle);
    for (const cls of ['confirmed', 'classic', 'unconfirmed', 'estimate', 'community'])
      expect(legend.querySelector(`.provenance-badge-${cls}`), cls).not.toBeNull();
    expect(legend.querySelector('.penalty-badge')).not.toBeNull();
    expect(root.querySelectorAll('[title]').length).toBe(0);
  });

  it('provenance on the factors: badges are tooltip buttons without a duplicate note, in the ranking as in the sheet', async () => {
    await mount();
    await click(option('role', 'tank'));
    const inRanking = [...root.querySelectorAll<HTMLElement>('.ranking-item.open .factors .provenance-badge')];
    expect(inRanking.length).toBeGreaterThan(0);
    for (const b of inRanking) {
      expect(b.tagName).toBe('BUTTON');
      expect(root.querySelector(`#${b.getAttribute('aria-describedby')}`)!.getAttribute('role')).toBe('tooltip');
    }
    await click(openSheetButton());
    const badges = [...sheet()!.querySelectorAll<HTMLElement>('.factors .provenance-badge')];
    expect(badges.length).toBeGreaterThan(0);
    let withNote = 0;
    for (const b of badges) {
      if (b.tagName === 'BUTTON') {
        const tip = root.querySelector(`#${b.getAttribute('aria-describedby')}`)!;
        expect(tip.getAttribute('role')).toBe('tooltip');
        expect(tip.textContent!.length).toBeGreaterThan(0);
        const note = b.closest('li')!.querySelector('.note')?.textContent;
        if (note) {
          withNote++;
          expect(tip.textContent).not.toContain(note);
        }
      } else {
        expect(b.hasAttribute('aria-describedby')).toBe(false);
      }
    }
    expect(withNote).toBeGreaterThan(0);
  });

  it('no title attributes, also in the character sheet and in the drawer', async () => {
    await mount();
    await click(option('mechanics', 'totems'));
    await click(mobileBar());
    await click(openSheetButton());
    expect(root.querySelectorAll('[title]').length).toBe(0);
  });

  it('names on the rank 1 card and in the sheet title use the readability rule of their surface', async () => {
    await mount();
    for (const [question, opt] of [
      ['mechanics', 'totems'],
      ['power-theme', 'fel'],
    ] as const) {
      await click(option(question, opt));
      const top = ranking()[0]!;
      const cls = CLASSES.find((c) => c.name.en === top.querySelector('.class-name')!.textContent)!;
      expect(cssColor(top.querySelector<HTMLElement>('.class-name')!.style.color), cls.id).toBe(
        cssColor(nameColor(cls.color, topCardSurface(cls.color))),
      );
      await click(openSheetButton());
      expect(cssColor(within(sheet()!).getByRole('heading', { level: 2 }).style.color), cls.id).toBe(
        cssColor(nameColor(cls.color, SHEET_SURFACE)),
      );
      await esc();
      await click(option(question, opt));
    }
  });

  it('factors name the question by its short name before the answer', async () => {
    await mount();
    await click(option('defense', 'stand'));
    const goods = [...root.querySelectorAll('.ranking-item.open .factors.good li')];
    expect(goods.length).toBeGreaterThan(0);
    for (const li of goods) {
      const line = li.querySelector('.factor-line')!.textContent!;
      expect(
        QUESTIONS.some((q) => q.options.some((o) => line.includes(`${q.short.en}: ${o.label.en}`))),
        line,
      ).toBe(true);
    }
    const defense = QUESTIONS.find((q) => q.id === 'defense')!;
    expect(root.querySelector('.ranking-item.open .factors')!.textContent).toContain(
      `${defense.short.en}: Take the hits`,
    );
  });

  it('legend names the cost of both deduction levels', async () => {
    await mount();
    const legend = root.querySelector('.legend')!;
    // cost as "N%", without a struck-through value.
    expect(legend.textContent).toContain(`${SEVERITY_PENALTY.light}%`);
    expect(legend.textContent).toContain(`${SEVERITY_PENALTY.heavy}%`);
    expect(legend.textContent).toContain(`${SEVERITY_PENALTY.light}% or ${SEVERITY_PENALTY.heavy}%`);
    expect(legend.textContent).not.toMatch(/struck/i);
    expect(legend.querySelector('s, del')).toBeNull();
    expect(legend.querySelector('.penalty-badge svg')).not.toBeNull();
  });
});

describe('Provenance of the data', () => {
  it('in the sheet every source with a web address has a link icon right after the badge', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(openSheetButton());
    const links = [...sheet()!.querySelectorAll<HTMLAnchorElement>('.factors a.source-link')];
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      // Podcast links may carry a timestamp; the source follows from the address without it.
      const href = a.getAttribute('href')!.replace(/&t=\d+s$/, '');
      const source = Object.values(SOURCES).find((src) => sourceUrl(src, 'en') === href);
      expect(source, a.getAttribute('href')!).toBeDefined();
      expect(a.getAttribute('href')!.startsWith('https://')).toBe(true);
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
      expect(a.getAttribute('aria-label')).toBe(EN.openSource.replace('{title}', source!.title.en));
      // Appears next to a confirmed, tentative or community badge, never in the tooltip.
      expect(a.closest('[role="tooltip"]')).toBeNull();
      const badge = a.parentElement!.querySelector('.provenance-badge');
      expect(badge?.className).toMatch(/provenance-badge-(confirmed|unconfirmed|community)/);
    }
    const factors = [...sheet()!.querySelectorAll('.sheet-summary .factors li')];
    expect(factors.length).toBeGreaterThan(0);
    for (const li of factors) {
      if (li.querySelector('.provenance-badge-classic, .provenance-badge-estimate'))
        expect(li.querySelector('a.source-link')).toBeNull();
    }
  });

  it('the source links also appear in the ranking', async () => {
    await mount();
    await click(option('role', 'tank'));
    const links = [...root.querySelectorAll<HTMLAnchorElement>('.ranking-item.open .factors a.source-link')];
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.closest('[role="tooltip"]')).toBeNull();
    }
  });

  it('the same points have the same provenance tooltips and links in the ranking and in the sheet', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(option('deal-breakers', 'reagents'));
    const provenanceSummary = (scope: Element) =>
      [...scope.querySelectorAll('.factors li')].slice(0, 3).map((li) => {
        const badge = li.querySelector('.provenance-badge');
        const tip = badge && root.querySelector(`#${badge.getAttribute('aria-describedby')}`);
        return {
          tag: badge?.tagName,
          tip: tip?.textContent,
          links: [...li.querySelectorAll('a.source-link')].map((a) => a.getAttribute('href')),
        };
      });
    const inRanking = provenanceSummary(root.querySelector('.ranking-item.open')!);
    await click(openSheetButton());
    expect(provenanceSummary(sheet()!)).toEqual(inRanking);
    expect(inRanking.some((x) => x.tag === 'BUTTON')).toBe(true);
  });

  it('the legend explains every provenance icon', async () => {
    await mount();
    const legend = root.querySelector('.legend')!;
    for (const [cls, text] of [
      ['confirmed', EN.legend_confirmed],
      ['classic', EN.legend_classic],
      ['unconfirmed', EN.legend_unconfirmed],
      ['estimate', EN.legend_estimate],
      ['community', EN.legend_community],
    ] as const) {
      expect(legend.querySelector(`.provenance-badge-${cls}`)!.closest('li')!.textContent, cls).toContain(text);
    }
  });
});
