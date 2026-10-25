import { useEffect, useRef } from 'preact/hooks';
import { lockScroll } from './scrollLock';

const FOCUSABLE =
  'button:not(:disabled), summary, a[href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/**
 * Behavior of a modal dialog while the component is mounted: focus on `closeRef`,
 * focus trap (Tab/Shift+Tab), Escape closes, body scroll locked.
 * Locking the rest of the content (`inert`) and returning focus are up to the caller: only once `inert`
 * has been removed again can the trigger be focused.
 */
export function useModal(onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close.current();
    };
    document.addEventListener('keydown', onKey);
    const unlock = lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
    };
  }, []);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const items = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return { dialogRef, closeRef, onKeyDown };
}
