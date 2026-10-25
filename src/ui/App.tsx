import { useId, useMemo, useState } from 'preact/hooks';
import { recommend } from '../app/recommendation';
import { classScore } from '../domain/class-scoring';
import { availableLanguages, type Lang } from '../i18n/lang';
import { activeLanguage, loc, t } from './t';
import { saveLanguage } from '../persistence/language';
import { browserStorage } from '../persistence/storage';
import { CharacterSheet } from './CharacterSheet';
import { ErrorBoundary } from './ErrorBoundary';
import { classById, DATA_VERSION } from './catalog';
import { pct } from './format';
import { GitHubMark } from './GitHubMark';
import { LanguageSwitch } from './LanguageSwitch';
import { Legend } from './Legend';
import { Logo } from './Logo';
import { ProfilesPanel } from './ProfilesPanel';
import { Questionnaire } from './Questionnaire';
import { Ranking } from './Ranking';
import { REPOSITORY_URL } from './repository';
import { Ring } from './Ring';
import { doneCount, PROGRESS_QUESTIONS } from './selectors';
import { SharePanel } from './SharePanel';
import { useAnswers } from './useAnswers';
import { useDrawer } from './useDrawer';
import { useProfiles } from './useProfiles';
import { useShareImport } from './useShareImport';
import { useSheet } from './useSheet';

/** Purely visual; the text next to it (`.progress-text`) carries the information for screen readers. */
function ProgressRing({ fraction }: { fraction: number }) {
  const size = 56;
  return (
    <Ring class="progress-ring" size={size} radius={22} fraction={fraction} color="var(--gold)">
      {/* Center of the ring; +5 sets the baseline so that the digits appear optically centered. */}
      <text x={size / 2} y={size / 2 + 5} text-anchor="middle">
        {Math.round(fraction * 100)}%
      </text>
    </Ring>
  );
}

export function App() {
  const { store, answers, setAnswers, setAnswer } = useAnswers();
  const [notices, setNotices] = useState<string[]>([]);
  const profiles = useProfiles(store, setAnswers, setNotices);
  const [savePanelOpen, setSavePanelOpen] = useState(false);

  const { evaluation, ranking, notice, faction } = useMemo(() => recommend(answers), [answers]);
  const sheet = useSheet(ranking);
  const drawer = useDrawer(sheet.requested);
  const sheetOpen = sheet.result !== undefined;
  const answeredCount = doneCount(PROGRESS_QUESTIONS, answers, evaluation);
  const progressFraction = PROGRESS_QUESTIONS.length ? answeredCount / PROGRESS_QUESTIONS.length : 0;
  const noRating = notice === 'noRating';
  // With the drawer open (mobile only) or the character sheet open, everything outside the dialog is unreachable.
  const inert = drawer.open || sheetOpen || undefined;
  const top = ranking[0];
  const mobileTop = ranking.slice(0, 3);
  const mobileId = useId();

  const importCode = useShareImport(answers, setAnswers, setNotices);

  // Reload instead of switching: this way, texts computed at load time follow the language as well.
  // Without a stored choice, the old language would come back after the reload, so only show a notice then.
  function chooseLanguage(lang: Lang) {
    if (!saveLanguage(browserStorage(), lang)) {
      setNotices([t('languageNotSaved')]);
      return;
    }
    location.reload();
  }

  function restart() {
    if (!confirm(t('restartConfirm'))) return;
    setAnswers({});
    window.scrollTo?.({ top: 0 });
    setNotices([]);
    sheet.close();
  }

  return (
    <div class="app">
      <header class="app-head" inert={inert}>
        <div class="brand">
          <Logo />
          <div class="brand-text">
            <span class="eyebrow-label">{t('appEyebrow')}</span>
            <h1>{t('appTitle')}</h1>
            <p class="tagline">{t('appTagline')}</p>
          </div>
        </div>
        <div class="head-actions">
          <div class="progress">
            <ProgressRing fraction={progressFraction} />
            <span class="progress-text">
              <strong>{t('progressCount', { answered: answeredCount, total: PROGRESS_QUESTIONS.length })}</strong>{' '}
              <span>{t('progressLabel')}</span>
            </span>
          </div>
          <button
            type="button"
            class="primary"
            aria-expanded={savePanelOpen}
            onClick={() => setSavePanelOpen(!savePanelOpen)}
          >
            {t('saveTitle')}
          </button>
          <button type="button" onClick={restart}>
            {t('restart')}
          </button>
          <LanguageSwitch available={availableLanguages()} current={activeLanguage()} onChoose={chooseLanguage} />
        </div>
      </header>

      <p class="beta" inert={inert}>
        <span class="beta-badge">{t('betaBadge')}</span> {t('betaNotice', { version: DATA_VERSION })}
      </p>

      {/* Outside the sidebar so the announcement also arrives on mobile (sidebar hidden). Rank 1 only, otherwise every click would read everything aloud. */}
      <p class="visually-hidden ranking-status" role="status">
        {top && t('rankingTop', { name: loc(classById.get(top.classId)!.name), score: pct(classScore(top)) })}
      </p>

      {notices.length > 0 && (
        <div class="notice" role="status" inert={inert}>
          {notices.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      )}

      {savePanelOpen && (
        <div class="save-panel" inert={inert}>
          <SharePanel answers={answers} store={store} onSaved={profiles.refresh} onImport={importCode} />
          <ProfilesPanel
            profiles={profiles.list}
            onLoad={profiles.load}
            onDelete={profiles.remove}
            onReset={profiles.reset}
          />
        </div>
      )}

      <main class="layout">
        <div class="questions-col" inert={inert}>
          <Questionnaire answers={answers} evaluation={evaluation} onAnswer={setAnswer} />
        </div>
        <section
          id="ranking-drawer"
          class={`sidebar${drawer.open ? ' drawer-open' : ''}`}
          aria-label={t('rankingTitle')}
          role={drawer.open ? 'dialog' : 'complementary'}
          aria-modal={drawer.open ? 'true' : undefined}
          inert={sheetOpen || undefined}
        >
          <button ref={drawer.closeRef} type="button" class="drawer-close" onClick={() => drawer.setOpen(false)}>
            {t('closeRanking')}
          </button>
          <ErrorBoundary>
            <Ranking ranking={ranking} faction={faction} notice={notice} onOpenSheet={sheet.open} />
          </ErrorBoundary>
          <Legend />
        </section>
      </main>

      {/* Mobile: the ranking stays visible as a bar and opens as a drawer. */}
      <button
        ref={drawer.triggerRef}
        type="button"
        class="mobile-bar"
        inert={inert}
        aria-expanded={drawer.open}
        aria-controls="ranking-drawer"
        // A fixed name; the hint and the top three change with every answer and follow as the description. Each part
        // is referenced on its own, since a wrapper would change the flex layout of the bar.
        aria-label={t('showRanking')}
        aria-describedby={[
          ...(noRating ? [`${mobileId}-hint`] : []),
          ...mobileTop.map((r) => `${mobileId}-${r.classId}`),
        ].join(' ')}
        onClick={() => drawer.setOpen(true)}
      >
        <span class="mobile-label">{t('showRanking')}</span>
        {noRating && (
          <span id={`${mobileId}-hint`} class="mobile-hint">
            {t('noRatingShort')}
          </span>
        )}
        {mobileTop.map((r) => (
          <span key={r.classId} id={`${mobileId}-${r.classId}`} class="mobile-entry">
            <span class="class-diamond" style={{ backgroundColor: classById.get(r.classId)!.color }} />
            {loc(classById.get(r.classId)!.name)} {pct(classScore(r))}
          </span>
        ))}
      </button>

      {/* The sheet makes the rest of the page inert, so its fallback must close it rather than retry. */}
      {sheet.result && (
        <ErrorBoundary recover={{ label: t('closeSheet'), onRecover: sheet.close }}>
          <CharacterSheet result={sheet.result} evaluation={evaluation} onClose={sheet.close} />
        </ErrorBoundary>
      )}

      <footer class="app-foot" inert={inert}>
        <p>{t('footer')}</p>
        <p>
          {t('copyright')} ·{' '}
          <a class="repo-link" href={REPOSITORY_URL} aria-label={t('sourceCode')}>
            <GitHubMark />
          </a>
        </p>
      </footer>
    </div>
  );
}
