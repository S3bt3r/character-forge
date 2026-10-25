import { availableLanguages, pickLanguage } from './i18n/lang';
import { setLanguage, t } from './ui/t';
import { readStoredLanguage } from './persistence/language';
import { browserStorage } from './persistence/storage';

/*
 * Sets the language before all UI modules: main.tsx imports this file first because some modules
 * compute texts while loading (e.g. the date format of the profiles).
 */
const lang = pickLanguage(
  readStoredLanguage(browserStorage()),
  navigator.languages ?? [navigator.language],
  availableLanguages(),
);
setLanguage(lang);
document.documentElement.lang = lang;
// index.html carries the English title as the initial state; here it follows the chosen language.
document.title = `${t('appEyebrow')} ${t('appTitle')}`;
