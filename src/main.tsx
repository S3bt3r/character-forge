import './language-init';
import { render } from 'preact';
import { App } from './ui/App';
import { ErrorBoundary } from './ui/ErrorBoundary';
import { t } from './ui/t';
import '@fontsource/marcellus-sc/latin-400.css';
import '@fontsource/alegreya/latin-500.css';
import '@fontsource/alegreya/latin-700.css';
import '@fontsource/alegreya/latin-500-italic.css';
import '@fontsource/alegreya-sans/latin-400.css';
import '@fontsource/alegreya-sans/latin-500.css';
import '@fontsource/alegreya-sans/latin-700.css';
import './ui/styles/index.css';

// Last resort for errors outside the inner boundaries, such as in the recommendation itself: reloading starts again from the saved draft.
render(
  <ErrorBoundary recover={{ label: t('renderReload'), onRecover: () => location.reload() }}>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')!,
);
