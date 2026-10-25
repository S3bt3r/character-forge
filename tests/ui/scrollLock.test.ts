// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { lockScroll } from '../../src/ui/scrollLock';

describe('Scroll lock', () => {
  it('counts locks, releases each only once and restores the original value', () => {
    document.body.style.overflow = 'scroll';
    try {
      const a = lockScroll();
      const b = lockScroll();
      expect(document.body.style.overflow).toBe('hidden');
      a();
      a();
      expect(document.body.style.overflow).toBe('hidden');
      b();
      expect(document.body.style.overflow).toBe('scroll');
    } finally {
      document.body.style.overflow = '';
    }
  });
});
