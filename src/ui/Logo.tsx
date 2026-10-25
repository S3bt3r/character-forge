/** Diamond with an upright blade: our own mark, not a Blizzard graphic. */
export function Logo() {
  return (
    <svg class="logo" width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
      <path d="M30 3 L57 30 L30 57 L3 30 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
      <path d="M30 11 L49 30 L30 49 L11 30 Z" fill="none" stroke="currentColor" stroke-opacity="0.45" />
      <path
        d="M30 18 L30 42 M22 26 L30 18 L38 26 M24 36 L36 36"
        fill="none"
        stroke="var(--gold-light)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle cx="30" cy="3" r="2" fill="currentColor" />
      <circle cx="57" cy="30" r="2" fill="currentColor" />
      <circle cx="30" cy="57" r="2" fill="currentColor" />
      <circle cx="3" cy="30" r="2" fill="currentColor" />
    </svg>
  );
}
