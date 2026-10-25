let locks = 0;
let saved = '';

/**
 * Counting scroll lock: drawer and character sheet may overlap and close in any order.
 * Returns the release; calling it multiple times releases only once.
 */
export function lockScroll(): () => void {
  if (locks++ === 0) {
    saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.body.style.overflow = saved;
  };
}

// Dev mode: when the module is replaced (HMR), the counter would otherwise restart and leave a lock hanging.
import.meta.hot?.dispose(() => {
  if (locks > 0) document.body.style.overflow = saved;
});
