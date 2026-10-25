// @vitest-environment happy-dom
/* The whole app: answers and draft, landmarks, disclosure buttons, starting over, footer and the German texts. */
import { describe, it, expect, vi } from 'vitest';
import { screen, within } from '@testing-library/preact';
import { render } from 'preact';
import { answersOf, pick } from '../support/fixtures';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EN_UI as EN } from '../../src/ui/texts';
import { REPOSITORY_URL } from '../../src/ui/repository';
import {
  root,
  setupAppDom,
  mount,
  button,
  click,
  fieldset,
  option,
  isChecked,
  typeInto,
  ranking,
  scoreOf,
  draft,
  openSheetButton,
  openItem,
  sheet,
  mobileBar,
} from '../support/ui-helpers';
import { CLASSES } from '../../src/data/classes';
import { QUESTIONS } from '../../src/data/questions';
import { SPECS } from '../../src/data/specs';
import { DE } from '../../src/i18n/de';
import { setLanguage, t } from '../../src/ui/t';

setupAppDom();

describe('Answers and draft', () => {
  it('multiple choice keeps several options, single choice replaces, reset clears', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(option('role', 'healer'));
    expect(isChecked(option('role', 'tank'))).toBe(true);
    expect(isChecked(option('role', 'healer'))).toBe(true);

    await click(button(EN.reset, fieldset('role')));
    expect(isChecked(option('role', 'tank'))).toBe(false);

    await click(option('faction', 'horde'));
    await click(option('faction', 'alliance'));
    expect(isChecked(option('faction', 'horde'))).toBe(false);
    expect(isChecked(option('faction', 'alliance'))).toBe(true);
  });

  it('saves a profile and restores the draft after the page is loaded again', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(button(EN.saveTitle));
    await typeInto(screen.getByRole<HTMLInputElement>('textbox', { name: EN.profileName }), 'My tank');
    await click(button(EN.save));
    expect(root.textContent).toContain(EN.saved);
    expect(root.textContent).toContain('My tank');

    render(null, root);
    await mount();
    expect(isChecked(option('role', 'tank'))).toBe(true);
  });

  it('lets multiple and single choices be deselected again', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(option('role', 'tank'));
    expect(isChecked(option('role', 'tank'))).toBe(false);
    expect(scoreOf('Warrior')).toBe(50);
    await click(option('faction', 'alliance'));
    await click(option('faction', 'alliance'));
    expect(isChecked(option('faction', 'alliance'))).toBe(false);
  });

  it('deselecting the last option removes the answer from the draft', async () => {
    await mount();
    await click(option('role', 'tank'));
    await click(option('role', 'tank'));
    expect(JSON.parse(localStorage.getItem('wfc.draft.v1')!)).toEqual({});
  });
});

describe('Landmarks', () => {
  it('the page has its header as banner, one main area, the ranking as a named region, the chapters as navigation and one footer', async () => {
    await mount();
    // The app header is the banner. The chapter headers sit in <section> inside <main>, so by HTML-AAM they are none;
    // @testing-library/dom 8 lists them as banners anyway, hence no count here.
    expect(screen.getAllByRole('banner')).toContain(root.querySelector('header.app-head'));
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('complementary', { name: EN.rankingTitle })).toBe(root.querySelector('.sidebar'));
    expect(screen.getByRole('navigation', { name: EN.chaptersNav })).toBeTruthy();
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: EN.sourceCode })).toBeTruthy();
  });
});

describe('Disclosure buttons', () => {
  it('the save button tells whether its panel is open', async () => {
    await mount();
    const save = button(EN.saveTitle);
    expect(save.getAttribute('aria-expanded')).toBe('false');
    await click(save);
    expect(save.getAttribute('aria-expanded')).toBe('true');
    expect(root.querySelector('.save-panel')).not.toBeNull();
  });

  it('the mobile bar shows the first three classes of the ranking with their scores', async () => {
    await mount();
    await click(option('role', 'tank'));
    const top = ranking()
      .slice(0, 3)
      .map(
        (item) =>
          `${item.querySelector('.class-name')!.textContent!.trim()} ${item.querySelector('.score-value')!.textContent!.trim()}`,
      );
    const entries = [...mobileBar().querySelectorAll('.mobile-entry')].map((e) => e.textContent!.trim());
    expect(entries).toEqual(top);
  });

  it('the mobile bar keeps one name; the hint and the top three are its description', async () => {
    const description = () =>
      mobileBar()
        .getAttribute('aria-describedby')!
        .split(' ')
        .map((id) => document.getElementById(id)!.textContent!.trim());
    await mount();
    expect(mobileBar().getAttribute('aria-label')).toBe(EN.showRanking);
    expect(description()[0]).toBe(EN.noRatingShort);
    await click(option('role', 'tank'));
    expect(description()).toEqual([...mobileBar().querySelectorAll('.mobile-entry')].map((e) => e.textContent!.trim()));
    expect(description()).toHaveLength(3);
  });

  it('the mobile bar names the drawer it controls and tells whether it is open', async () => {
    await mount();
    const bar = mobileBar();
    expect(document.getElementById(bar.getAttribute('aria-controls')!)).toBe(
      screen.getByRole('complementary', { name: EN.rankingTitle }),
    );
    expect(bar.getAttribute('aria-expanded')).toBe('false');
    await click(bar);
    expect(bar.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('Starting over', () => {
  it('after confirming, the answers and notices are gone and an open sheet closes; declining changes nothing', async () => {
    const confirm = vi.fn(() => false);
    vi.stubGlobal('confirm', confirm);
    localStorage.setItem('wfc.draft.v1', JSON.stringify(answersOf({ role: pick('tank') })));
    await mount();
    await click(button(EN.restart));
    expect(confirm).toHaveBeenCalledWith(EN.restartConfirm);
    expect(isChecked(option('role', 'tank'))).toBe(true);

    confirm.mockReturnValue(true);
    await click(openSheetButton());
    expect(sheet()).not.toBeNull();
    // A user cannot reach the button while the sheet makes the header inert; restart still closes it so no sheet outlives the answers.
    await click(button(EN.restart));
    expect(isChecked(option('role', 'tank'))).toBe(false);
    expect(draft()).toEqual({});
    expect(sheet()).toBeNull();
    expect(root.querySelector('.app > .notice')).toBeNull();
  });
});

describe('Footer', () => {
  it('names the author and license and links the source code with the GitHub mark, named for screen readers', async () => {
    await mount();
    const foot = screen.getByRole('contentinfo');
    expect(foot.textContent).toContain(EN.footer);
    expect(foot.textContent).toContain(EN.copyright);
    const link = within(foot).getByRole<HTMLAnchorElement>('link', { name: EN.sourceCode });
    expect(link.getAttribute('href')).toBe(REPOSITORY_URL);
    expect(link.getAttribute('aria-label')).toBe(EN.sourceCode);
    expect(link.textContent!.trim()).toBe('');
    expect(link.querySelector('svg.github-mark')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('links the repository that package.json names', () => {
    const pkg = JSON.parse(
      readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../package.json'), 'utf8'),
    ) as { repository: { url: string } };
    expect(pkg.repository.url).toBe(`git+${REPOSITORY_URL}.git`);
  });
});

describe('App in German', () => {
  it('ranking, class widget, character sheet and questions show the German texts', async () => {
    // tests/support/setup.ts starts every test in English; this one checks the German path.
    setLanguage('de');
    await mount();
    const names = ranking().map((i) => i.querySelector('.class-name')?.textContent?.trim());
    expect([...names].sort()).toEqual(CLASSES.map((c) => c.name.de!).sort());

    const top = openItem();
    const cls = CLASSES.find((c) => c.name.de === top.querySelector('.class-name')?.textContent?.trim())!;
    expect(top.textContent).toContain(cls.summary.de!);
    expect(top.textContent).not.toContain(cls.summary.en);
    expect(openSheetButton().textContent!.trim()).toBe(DE.openSheet);

    await click(openSheetButton());
    const specs = SPECS.filter((s) => s.classId === cls.id);
    const text = sheet()!.textContent!;
    expect(specs.some((s) => text.includes(s.name.de!))).toBe(true);
    for (const s of specs) if (s.name.de !== s.name.en) expect(text, s.id).not.toContain(s.name.en);

    const role = QUESTIONS.find((q) => q.id === 'role')!;
    expect(root.textContent).toContain(role.text.de!);
    expect(root.textContent).not.toContain(role.text.en);
    expect(screen.getByRole('link', { name: t('sourceCode') }).getAttribute('aria-label')).toBe(DE.sourceCode);
  });
});
