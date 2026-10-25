import type { Question } from '../domain/questions';
import type { Answer, Answers } from '../domain/answers';
import { isIdList, isValidId, sanitizeAnswers, type RawChoice } from './answers-sanitizer';
import { parseJson } from './json';

/*
 * Format: "1." + base64url(deflate-raw(JSON)), JSON = { v: 1, d: dataVersion, a: entries }; an entry is
 * [questionId] for "Don't care", [questionId, [optionIds]] or, for an important question, [questionId, [optionIds], 1].
 * Compact enough for a URL fragment; the prefix version allows later format changes.
 * A code holds answers, not results: decoded today, it is rated against today's values. Questions and options that no
 * longer exist are left out, new questions stay unanswered; `d` only records the data state it was made with.
 */
const CODE_PREFIX = '1.';
const FORMAT_VERSION = 1;
export const MAX_CODE_LENGTH = 2000;
/** Protection against decompression bombs: the full catalog needs only a few KB. */
const MAX_JSON_BYTES = 32 * 1024;

type DecodeResult = { ok: true; answers: Answers } | { ok: false; error: 'invalid' | 'too-long' | 'unsupported' };

type CodeEntry = [string] | [string, string[]] | [string, string[], 1];
interface Payload {
  v: typeof FORMAT_VERSION;
  d: string;
  a: CodeEntry[];
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  // Base64 pads only at the end, so removing every equals sign removes exactly the padding.
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromBase64Url(text: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]*$/.test(text)) return null;
  try {
    const bin = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

async function compress(text: string): Promise<Uint8Array> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Returns null for invalid data, 'too-long' when the limit is exceeded. */
async function decompressLimited(bytes: Uint8Array): Promise<string | null | 'too-long'> {
  let reader: ReadableStreamDefaultReader<Uint8Array>;
  try {
    reader = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
  } catch {
    return null;
  }
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_JSON_BYTES) {
        await reader.cancel().catch(() => undefined);
        return 'too-long';
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }
  return decodeUtf8(concatBytes(chunks, total));
}

function concatBytes(chunks: Uint8Array[], total: number): Uint8Array {
  const joined = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    joined.set(c, offset);
    offset += c.byteLength;
  }
  return joined;
}

/** Null for invalid UTF-8 instead of replacement characters. */
function decodeUtf8(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

/** Whether this browser can create share codes; without it, `encodeShareCode` throws. */
export const canCreateShareCodes = (): boolean => typeof CompressionStream !== 'undefined';

/** `dataVersion` travels with the code. Requires `canCreateShareCodes`; any other failure is a bug and is thrown. */
export async function encodeShareCode(answers: Answers, dataVersion: string): Promise<string> {
  const entries = Object.entries(answers).flatMap(([id, answer]) => (answer ? [toEntry(id, answer)] : []));
  const json = JSON.stringify({ v: FORMAT_VERSION, d: dataVersion, a: entries });
  return CODE_PREFIX + toBase64Url(await compress(json));
}

function toEntry(id: string, answer: Answer): CodeEntry {
  if (answer.kind === 'dontCare') return [id];
  return answer.importance === 'high' ? [id, answer.optionIds, 1] : [id, answer.optionIds];
}

function isEntry(e: unknown): e is CodeEntry {
  // An empty entry fails at the ID.
  if (!Array.isArray(e) || e.length > 3) return false;
  const [id, options, high] = e as unknown[];
  return isValidId(id) && (e.length === 1 || isIdList(options)) && (e.length < 3 || high === 1);
}

function choiceOf([, options, high]: CodeEntry): RawChoice {
  return options === undefined ? 'dontCare' : { optionIds: options, high: high === 1 };
}

function isPayload(p: unknown): p is Payload {
  // Rejects undefined and null, which cannot be destructured; other primitives fail at the version check.
  if (!p) return false;
  const { v, d, a } = p as { v?: unknown; d?: unknown; a?: unknown };
  return v === FORMAT_VERSION && isValidId(d) && Array.isArray(a) && a.every(isEntry);
}

/** The answers of a code, checked against `questions`; the data version it records is checked for form only. */
export async function decodeShareCode(code: string, questions: Question[]): Promise<DecodeResult> {
  const trimmed = code.trim();
  if (trimmed.length > MAX_CODE_LENGTH) return { ok: false, error: 'too-long' };
  if (!trimmed.startsWith(CODE_PREFIX)) return { ok: false, error: 'invalid' };

  // Feature detection before decoding, so that a valid code is not wrongly treated as "invalid".
  if (typeof DecompressionStream === 'undefined') return { ok: false, error: 'unsupported' };

  const bytes = fromBase64Url(trimmed.slice(CODE_PREFIX.length));
  // An empty code needs no check of its own: its stream fails to decompress and ends as "invalid" below.
  if (!bytes) return { ok: false, error: 'invalid' };

  const json = await decompressLimited(bytes);
  if (json === 'too-long') return { ok: false, error: 'too-long' };
  if (json === null) return { ok: false, error: 'invalid' };

  const payload = parseJson(json);
  if (!isPayload(payload)) return { ok: false, error: 'invalid' };
  const answers = sanitizeAnswers(
    payload.a.map((entry) => [entry[0], choiceOf(entry)]),
    questions,
  );
  return { ok: true, answers };
}

/** Prefix of the URL fragment that carries a share code (`#s=<code>`); a fragment never reaches the server. */
const SHARE_HASH_PREFIX = '#s=';

/** Share link for `code` on the page at `pageUrl` (origin and path, without fragment). */
export const shareLinkFor = (pageUrl: string, code: string): string => `${pageUrl}${SHARE_HASH_PREFIX}${code}`;

/**
 * Share code from a URL fragment, or undefined if the fragment is no share link. The code alphabet is URL-safe,
 * so no decodeURIComponent, which would throw on broken encoding.
 */
export const codeFromHash = (hash: string): string | undefined =>
  hash.startsWith(SHARE_HASH_PREFIX) ? hash.slice(SHARE_HASH_PREFIX.length) : undefined;
