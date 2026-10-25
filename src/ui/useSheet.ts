import { useEffect, useRef, useState } from 'preact/hooks';
import type { ClassResult } from '../domain/class-scoring';
import type { ClassId } from '../domain/ids';

/**
 * State of the character sheet: which class it shows and who opened it.
 * Must be called in App: the focus return runs as an effect after its render, when `inert`
 * has already been removed from the rest of the page (in the sheet's cleanup, the trigger would still be locked).
 */
export function useSheet(ranking: ClassResult[]) {
  const [sheet, setSheet] = useState<{ classId: ClassId; trigger: HTMLElement } | undefined>(undefined);
  const result = sheet && ranking.find((r) => r.classId === sheet.classId);

  // If the class drops out of the ranking (e.g. an import arriving later), close the sheet instead of locking the page.
  useEffect(() => {
    if (sheet && !result) setSheet(undefined);
  }, [sheet, result]);

  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (sheet) trigger.current = sheet.trigger;
    else if (trigger.current) {
      if (trigger.current.isConnected) trigger.current.focus({ preventScroll: true });
      trigger.current = null;
    }
  }, [sheet]);

  return {
    /** A sheet was requested (even if the class is currently dropping out). */
    requested: sheet !== undefined,
    /** Result of the shown class; undefined as long as no sheet is open. */
    result,
    open: (classId: ClassId, from: HTMLElement) => setSheet({ classId, trigger: from }),
    close: () => setSheet(undefined),
  };
}
