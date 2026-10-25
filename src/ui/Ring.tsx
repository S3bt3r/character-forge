import type { ComponentChildren } from 'preact';

interface Props {
  class: string;
  /** Side length of the SVG in px; the ring sits centered. */
  size: number;
  radius: number;
  /** Filled fraction in [0, 1]. */
  fraction: number;
  color: string;
  /** Additional SVG content, e.g. a text in the center. */
  children?: ComponentChildren;
}

/** Progress or percentage ring, purely visual (the value is next to it as text for screen readers). */
export function Ring({ class: className, size, radius, fraction, color, children }: Props) {
  const center = size / 2;
  const length = 2 * Math.PI * radius;
  return (
    <svg class={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--track)" stroke-width="5" />
      {fraction > 0 && (
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray={`${length * fraction} ${length}`}
          transform={`rotate(-90 ${center} ${center})`}
        />
      )}
      {children}
    </svg>
  );
}
