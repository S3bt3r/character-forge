import { describe, it, expect } from 'vitest';
import { STORAGE_ERROR_MESSAGE } from '../../src/ui/storageMessages';

describe('Storage error messages', () => {
  it('each storage error has its own message', () => {
    expect(STORAGE_ERROR_MESSAGE).toEqual({
      unavailable: 'storageUnavailable',
      corrupt: 'storageCorrupt',
      'write-failed': 'storageWriteFailed',
    });
  });
});
