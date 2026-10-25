// @vitest-environment happy-dom
/* The score ring and the progress ring. */
import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../../src/data/questions';
import { EN_UI as EN } from '../../src/ui/texts';
import { classScore } from '../../src/domain/class-scoring';
import { recommend } from '../../src/app/recommendation';
import { render } from 'preact';
import { Ring } from '../../src/ui/Ring';
import {
  root,
  setupAppDom,
  mount,
  button,
  click,
  option,
  draft,
  ranking,
  sheet,
  openSheetButton,
  openClass,
  answerMany,
} from '../support/ui-helpers';
import { rated } from '../support/fixtures';

setupAppDom();

describe('Ring and faction name', () => {
  it('the ring shows a partial value as a matching arc, starting at the top', () => {
    render(<Ring class="score-ring" size={66} radius={27} fraction={0.25} color="red" />, root);
    const [track, arc] = [...root.querySelectorAll('circle')];
    const length = 2 * Math.PI * 27;
    expect(track!.getAttribute('r')).toBe('27');
    expect(track!.getAttribute('cx')).toBe('33');
    const [dash, total] = arc!.getAttribute('stroke-dasharray')!.split(' ').map(Number);
    expect(dash).toBeCloseTo(length * 0.25, 6);
    expect(total).toBeCloseTo(length, 6);
    expect(arc!.getAttribute('transform')).toBe('rotate(-90 33 33)');
    expect(arc!.getAttribute('stroke')).toBe('red');
    render(<Ring class="score-ring" size={66} radius={27} fraction={0} color="red" />, root);
    expect(root.querySelectorAll('circle')).toHaveLength(1);
  });

  it('in the ranking the arc matches a rank 1 value below 100%', async () => {
    await mount();
    await answerMany();
    const top = recommend(draft()).ranking[0]!;
    expect(classScore(top)).toBeLessThan(100);
    const arc = ranking()[0]!.querySelectorAll('svg.score-ring circle')[1]!;
    const [dash, total] = arc.getAttribute('stroke-dasharray')!.split(' ').map(Number);
    expect(dash! / total!).toBeCloseTo(classScore(top) / 100, 5);
  });

  it('the progress ring shows the rounded share of completed questions, centered in the ring', async () => {
    await mount();
    // Keep answering until rounding and truncating would differ (e.g. 2/37 = 5.4% vs. 3/37 = 8.1%).
    const counted = () =>
      root
        .querySelector('.progress-text strong')!
        .textContent!.match(/(\d+) of (\d+)/)!
        .slice(1)
        .map(Number) as [number, number];
    for (const q of rated(QUESTIONS)) {
      const [done, total] = counted();
      if (done > 0 && Math.round((done / total) * 100) !== Math.floor((done / total) * 100)) break;
      await click(option(q.id, q.options[0]!.id));
    }
    const [done, total] = counted();
    expect(Math.round((done / total) * 100)).not.toBe(Math.floor((done / total) * 100));
    const ring = root.querySelector('svg.progress-ring')!;
    const text = ring.querySelector('text')!;
    expect(text.textContent).toBe(`${Math.round((done / total) * 100)}%`);
    expect([text.getAttribute('x'), text.getAttribute('y')]).toEqual(['28', '33']);
    const [dash, length] = ring.querySelectorAll('circle')[1]!.getAttribute('stroke-dasharray')!.split(' ').map(Number);
    expect(dash! / length!).toBeCloseTo(done / total, 6);
  });

  it('all graphics are hidden from screen readers; warning, link and close icons are different', async () => {
    await mount();
    await click(option('deal-breakers', 'reagents'));
    await openClass('warlock');
    await click(openSheetButton());
    const svgs = [...root.querySelectorAll('svg')];
    expect(svgs.length).toBeGreaterThan(10);
    for (const svg of svgs) expect(svg.getAttribute('aria-hidden'), svg.outerHTML.slice(0, 80)).toBe('true');
    const pathOf = (sel: string) => sheet()!.querySelector(`${sel} svg path`)!.getAttribute('d')!;
    const pathIn = (el: Element) => el.querySelector('svg path')!.getAttribute('d')!;
    const paths = [
      pathOf('.factors.bad li.penalty .factor-line'),
      pathOf('a.source-link'),
      pathIn(button(EN.closeSheet, sheet()!)),
    ];
    for (const d of paths) expect(d.length).toBeGreaterThan(10);
    expect(new Set(paths).size).toBe(3);
  });

  it('the faction badge names Alliance and Horde', async () => {
    await mount();
    await click(option('faction', 'alliance'));
    expect(root.querySelector('.faction-badge')!.textContent).toBe(EN.faction_alliance);
    await click(option('faction', 'horde'));
    expect(root.querySelector('.faction-badge')!.textContent).toBe(EN.faction_horde);
  });
});
