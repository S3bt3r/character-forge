import { useEffect, useRef, useState } from 'preact/hooks';
import { lockScroll } from './scrollLock';

/** Must match the breakpoint in `styles/layout.css`: from there on, the sidebar is a fixed column instead of a drawer. */
const DESKTOP_QUERY = '(width >= 900px)';

/**
 * State and behavior of the mobile ranking drawer: focus in and back, Escape, scroll lock,
 * and automatic closing when the view switches to desktop width (e.g. rotating a tablet).
 */
export function useDrawer(escapePaused: boolean) {
  const [open, setOpen] = useState(false);
  // If a dialog lies above the drawer (character sheet), Escape belongs to that dialog.
  const paused = useRef(escapePaused);
  paused.current = escapePaused;
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) closeRef.current?.focus();
    else if (wasOpen.current) triggerRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !paused.current) setOpen(false);
    };
    const media = typeof window.matchMedia === 'function' ? window.matchMedia(DESKTOP_QUERY) : undefined;
    const onMedia = (e: { matches: boolean }) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    media?.addEventListener('change', onMedia);
    const unlock = lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      media?.removeEventListener('change', onMedia);
      unlock();
    };
  }, [open]);

  return { open, setOpen, closeRef, triggerRef };
}
