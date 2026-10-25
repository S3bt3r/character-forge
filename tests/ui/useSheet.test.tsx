// @vitest-environment happy-dom
/* State of the character sheet, through a minimal component instead of the whole app. */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from 'preact';
import { act } from 'preact/test-utils';
import { useSheet } from '../../src/ui/useSheet';
import type { ClassResult } from '../../src/domain/class-scoring';
import { classId } from '../../src/domain/ids';

// useSheet reads only the class ID of a result.
const result = (id: string) => ({ classId: classId(id) }) as ClassResult;

let host: HTMLElement;
let sheet: ReturnType<typeof useSheet>;
function Harness({ ranking }: { ranking: ClassResult[] }) {
  sheet = useSheet(ranking);
  return null;
}
const show = (ranking: ClassResult[]) => act(() => render(<Harness ranking={ranking} />, host));

beforeEach(() => {
  host = document.body.appendChild(document.createElement('div'));
});
afterEach(() => {
  render(null, host);
  document.body.innerHTML = '';
});

describe('Character sheet state', () => {
  it('shows the opened class and closes on its own when the class drops out of the ranking', async () => {
    const trigger = document.body.appendChild(document.createElement('button'));
    await show([result('mage'), result('rogue')]);
    await act(() => sheet.open(classId('rogue'), trigger));
    expect(sheet.result?.classId).toBe('rogue');
    await show([result('mage')]);
    expect(sheet.requested).toBe(false);
    expect(sheet.result).toBeUndefined();
  });

  it('closing returns the focus to the button that opened the sheet, unless it is gone from the page', async () => {
    const trigger = document.body.appendChild(document.createElement('button'));
    await show([result('mage')]);
    await act(() => sheet.open(classId('mage'), trigger));
    await act(() => sheet.close());
    expect(document.activeElement).toBe(trigger);

    const gone = document.body.appendChild(document.createElement('button'));
    const other = document.body.appendChild(document.createElement('button'));
    other.focus();
    await act(() => sheet.open(classId('mage'), gone));
    gone.remove();
    await act(() => sheet.close());
    expect(document.activeElement).toBe(other);
  });
});
