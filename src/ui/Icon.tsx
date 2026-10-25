/** Line icons (24-unit grid, `currentColor`), maintained in one place. Illustrations such as the logo and crests do not belong here. */
const ICONS = {
  check: 'M5 12.5 L10 17.5 L19 7',
  checkDouble: 'M2 12.5 L6 16.5 L13 8 M10 15.5 L11 16.5 L22 7',
  unrated: 'M12 3 A9 9 0 1 0 12.01 3 M5.5 18.5 L18.5 5.5',
  dontCare: 'M5 12 H19',
  filter: 'M3 5 H21 L14 13 V19 L10 21 V13 Z',
  locked: 'M7 11 V8 A5 5 0 0 1 17 8 V11 M5 11 H19 V21 H5 Z',
  warning: 'M12 3 L22 20 H2 Z M12 9.5 V14 M12 17 L12 17.01',
  link: 'M14 4 H20 V10 M20 4 L11 13 M18 14 V20 H4 V6 H10',
  close: 'M6 6 L18 18 M18 6 L6 18',
  // Provenance icons have their own names even if the shape appears elsewhere: they can change independently.
  confirmed: 'M5 12.5 L10 17.5 L19 7',
  classic: 'M19 12 A7 7 0 1 1 15.5 6 M15 2.5 L16 6.5 L12 7.5',
  unconfirmed: 'M9 9 A3 3 0 1 1 13.5 11.6 C12.5 12.2 12 13 12 14 M12 18 L12 18.01',
  estimate: 'M5 9.5 C8 7.5 10 11.5 12 9.5 S16 7.5 19 9.5 M5 15.5 C8 13.5 10 17.5 12 15.5 S16 13.5 19 15.5',
  community:
    'M12 8 A3 3 0 1 1 6 8 A3 3 0 1 1 12 8 M3 20 C3 15.5 15 15.5 15 20 M15.5 5.6 A2.5 2.5 0 1 1 16.5 11.4 M17 14.5 C19.5 15 21 17 21 20',
} as const;
export type IconName = keyof typeof ICONS;

/** Decorative icon; the surrounding element carries the accessible name. */
export function Icon({ name, size = 16, stroke = 2.4 }: { name: IconName; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={ICONS[name]}
        fill="none"
        stroke="currentColor"
        stroke-width={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
