import type { ComponentChildren } from 'preact';
import { useErrorBoundary } from 'preact/hooks';
import { t } from './t';

interface Props {
  children: ComponentChildren;
  /** The way out the fallback offers, with its button text; without one, the area is rendered again (a passing error may be gone). */
  recover?: { label: string; onRecover: () => void };
}

/**
 * Keeps an error while rendering in its area: the area shows a notice with a way out instead of taking the whole page
 * down. The data checks fail fast on purpose; this boundary only limits how far such a failure reaches. The error goes to
 * the console, so it stays visible to whoever debugs it.
 */
export function ErrorBoundary({ children, recover }: Props) {
  const [error, resetError] = useErrorBoundary((e: unknown) => console.error(e));
  if (!error) return <>{children}</>;
  const onClick = () => {
    resetError();
    recover?.onRecover();
  };
  return (
    <div class="notice render-error" role="alert">
      <p>{t('renderError')}</p>
      <button type="button" onClick={onClick}>
        {recover?.label ?? t('renderRetry')}
      </button>
    </div>
  );
}
