import type { StorageLike } from '../../src/persistence/storage';

/* Helpers for the persistence tests: share codes with arbitrary content and a storage in memory. */

/** Builds a share code from arbitrary JSON text (valid encoding, arbitrary content), for tests of tampered codes. */
export async function rawCode(payload: string): Promise<string> {
  return rawCodeFromBytes(new TextEncoder().encode(payload));
}

/** Like `rawCode`, but from raw bytes (e.g. invalid UTF-8); `trailing` is appended after the deflate stream. */
export async function rawCodeFromBytes(payload: Uint8Array, trailing: number[] = []): Promise<string> {
  const stream = new Blob([payload as BlobPart]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  const bytes = new Uint8Array([...new Uint8Array(await new Response(stream).arrayBuffer()), ...trailing]);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return '1.' + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Storage in memory for the persistence tests; `data` gives direct access to the stored values. */
export class MemoryStorage implements StorageLike {
  data = new Map<string, string>();
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, value);
  }
  removeItem(key: string) {
    this.data.delete(key);
  }
}
