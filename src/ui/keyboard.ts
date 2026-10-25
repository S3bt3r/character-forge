const hasModifier = (e: KeyboardEvent): boolean => e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

/** Step for arrow keys in radio groups (tiles, weight); 0 means: do not handle the key. */
export function arrowStep(e: KeyboardEvent): -1 | 0 | 1 {
  // With a modifier, arrows belong to the browser (e.g. Alt+← = back) or should not change a selection.
  if (hasModifier(e)) return 0;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') return 1;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') return -1;
  return 0;
}

/** Item `step` places away from `current` in `items`, wrapping around; an unknown `current` counts as the first item. */
export function neighbor<T>(items: readonly T[], current: T | undefined, step: -1 | 1): T {
  const index = current === undefined ? 0 : Math.max(0, items.indexOf(current));
  return items[(index + step + items.length) % items.length]!;
}
