import type { MessageKey } from './texts';
import type { StorageError } from '../persistence/storage';

export const STORAGE_ERROR_MESSAGE: Record<StorageError, MessageKey> = {
  unavailable: 'storageUnavailable',
  corrupt: 'storageCorrupt',
  'write-failed': 'storageWriteFailed',
};
