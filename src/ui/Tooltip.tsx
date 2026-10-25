import type { ComponentChildren } from 'preact';
import { useId, useLayoutEffect, useRef, useState } from 'preact/hooks';

interface Props {
  /** Text of the tooltip; also the description of the trigger for screen readers. */
  text: string;
  class: string;
  /** Accessible name if the visible content has no text (e.g. diamonds). */
  label?: string;
  /** Additional data attributes on the trigger (e.g. `{ status: 'dontCare' }` → `data-status`). */
  dataAttributes?: Record<string, string>;
  children: ComponentChildren;
}

/** Hover and focus open immediately; a click right after counts as the same gesture (a tap triggers both). */
const SAME_GESTURE_MS = 400;

/** Closes the currently open tooltip; at most one is open, so that Esc is unambiguous. */
let closeOpenTooltip: (() => void) | undefined;

/**
 * Own tooltip element instead of `title`: appears on hover (also over the tooltip itself), focus and tap.
 * While it is open, Esc and a tap/click elsewhere close it, even without focus.
 */
export function Tooltip({ text, class: className, label, dataAttributes, children }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const openedAt = useRef(0);
  const wrapRef = useRef<HTMLSpanElement>(null);

  // Stable reference: this is how the module recognizes which tooltip is open.
  const hide = useRef(() => {
    openedAt.current = 0;
    setOpen(false);
    if (closeOpenTooltip === hide) closeOpenTooltip = undefined;
  }).current;

  function openExclusively() {
    if (closeOpenTooltip && closeOpenTooltip !== hide) closeOpenTooltip();
    closeOpenTooltip = hide;
    setOpen(true);
  }

  /** Hover and focus: a click right after belongs to the same gesture and does not close. */
  function show() {
    openedAt.current = Date.now();
    openExclusively();
  }

  function toggle() {
    if (!open) openExclusively();
    else if (Date.now() - openedAt.current > SAME_GESTURE_MS) hide();
  }

  // Layout effect: the Esc listener must be active immediately after opening, not only after the next frame.
  useLayoutEffect(() => {
    if (!open) return;
    // Capture phase: Esc belongs to the tooltip first, not to a surrounding dialog (character sheet, drawer).
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopImmediatePropagation();
      hide();
    };
    const onDown = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) hide();
    };
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, hide]);
  useLayoutEffect(
    () => () => {
      if (closeOpenTooltip === hide) closeOpenTooltip = undefined;
    },
    [hide],
  );

  return (
    <span class="tip" ref={wrapRef} onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        class={className}
        aria-label={label}
        aria-describedby={id}
        onFocus={show}
        onBlur={hide}
        onClick={toggle}
        {...Object.fromEntries(Object.entries(dataAttributes ?? {}).map(([k, v]) => [`data-${k}`, v]))}
      >
        {children}
      </button>
      <span role="tooltip" id={id} class="tip-body" hidden={!open}>
        {text}
      </span>
    </span>
  );
}
