import type { Lang } from '../i18n/lang';
import { t } from './t';

interface Props {
  /** The offered languages, English first. */
  available: readonly Lang[];
  current: Lang;
  onChoose: (lang: Lang) => void;
}

/** Each language named in itself, as its `lang` attribute says how to pronounce it; like the codes, not in the catalog. */
const LANGUAGE_NAME: Record<Lang, string> = { en: 'English', de: 'Deutsch' };

/** Language codes stay the same in every language, hence not in the catalog. */
export function LanguageSwitch({ available, current, onChoose }: Props) {
  return (
    <div class="language-switch" role="group" aria-label={t('languageLabel')}>
      {available.map((lang) => (
        <button
          key={lang}
          type="button"
          lang={lang}
          aria-label={LANGUAGE_NAME[lang]}
          aria-pressed={lang === current}
          onClick={() => lang !== current && onChoose(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
