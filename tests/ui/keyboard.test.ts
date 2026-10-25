import { describe, it, expect } from 'vitest';
import { arrowStep, neighbor } from '../../src/ui/keyboard';

const key = (k: string, mods: Partial<Record<'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey', boolean>> = {}) =>
  ({ key: k, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...mods }) as KeyboardEvent;

describe('Arrow keys in radio groups', () => {
  it('only arrow keys move the selection, other keys and arrows with a modifier do not', () => {
    expect(['ArrowRight', 'ArrowDown'].map((k) => arrowStep(key(k)))).toEqual([1, 1]);
    expect(['ArrowLeft', 'ArrowUp'].map((k) => arrowStep(key(k)))).toEqual([-1, -1]);
    for (const k of ['Enter', ' ', 'a', 'Tab', 'Home']) expect(arrowStep(key(k)), k).toBe(0);
    for (const mod of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'] as const)
      expect(arrowStep(key('ArrowRight', { [mod]: true })), mod).toBe(0);
  });
});

describe('Neighbor in radio groups', () => {
  it('steps with wrap-around; an unknown or missing current item counts as the first', () => {
    const items = ['a', 'b', 'c'];
    expect(neighbor(items, 'b', 1)).toBe('c');
    expect(neighbor(items, 'c', 1)).toBe('a');
    expect(neighbor(items, 'a', -1)).toBe('c');
    expect(neighbor(items, undefined, 1)).toBe('b');
    expect(neighbor(items, 'x', -1)).toBe('c');
  });
});
