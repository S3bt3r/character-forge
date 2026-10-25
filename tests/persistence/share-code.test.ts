import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  canCreateShareCodes,
  decodeShareCode,
  encodeShareCode,
  MAX_CODE_LENGTH,
  codeFromHash,
  shareLinkFor,
} from '../../src/persistence/share-code';
import { QUESTIONS } from '../../src/data/questions';
import type { Answers } from '../../src/domain/answers';
import { answersOf, pick, pickHigh, DONT_CARE } from '../support/fixtures';
import { rawCode, rawCodeFromBytes } from '../support/persistence';
import { isWeighable, isMultipleChoice } from '../../src/domain/questions';
import fc from 'fast-check';
import { DATA_VERSION } from '../../src/data/sources';

/** Generates valid answer sets against the real catalog. */
const answersArb = fc
  .subarray(QUESTIONS, { minLength: 0 })
  .chain((qs) =>
    fc.tuple(
      ...qs.map((q) =>
        fc.record({
          id: fc.constant(q.id),
          optionIds: isMultipleChoice(q)
            ? fc.subarray(
                q.options.map((o) => o.id),
                { minLength: 1 },
              )
            : fc.constantFrom(...q.options.map((o) => o.id)).map((id) => [id]),
          // Only the weight selection of a weightable question offers "Important".
          high: isWeighable(q) ? fc.boolean() : fc.constant(false),
          // Opening questions offer no "Don't care" (see the sanitizer).
          dontCare: q.kind === 'gate' ? fc.constant(false) : fc.boolean(),
        }),
      ),
    ),
  )
  .map((entries): Answers =>
    Object.fromEntries(
      entries.map((e) => [e.id, e.dontCare ? DONT_CARE : e.high ? pickHigh(...e.optionIds) : pick(...e.optionIds)]),
    ),
  );

describe('Share code input checks', () => {
  it('null payload, broken deflate stream, wrong prefix and non-string options are invalid', async () => {
    const valid = await encodeShareCode(answersOf({ role: pick('tank') }), DATA_VERSION);
    const bad = [
      await rawCode('null'),
      await rawCode('[]'),
      '1.AAAAAAAA',
      '1.____',
      '9.' + valid.slice(2),
      await rawCode('{"v":1,"d":"x","a":[["role",[5]]]}'),
      await rawCode(JSON.stringify({ v: 1, d: 'x'.repeat(65), a: [] })),
      await rawCode(JSON.stringify({ v: 1, d: 'x', a: [['r'.repeat(65), ['tank']]] })),
    ];
    for (const code of bad) {
      const result = await decodeShareCode(code, QUESTIONS);
      expect(result, code).toEqual({ ok: false, error: 'invalid' });
    }
  });

  it('exactly at the length limit is not rejected as too long, above it is', async () => {
    const atLimit = await decodeShareCode('1.' + 'A'.repeat(MAX_CODE_LENGTH - 2), QUESTIONS);
    expect(atLimit).not.toEqual({ ok: false, error: 'too-long' });
    expect(await decodeShareCode('1.' + 'A'.repeat(MAX_CODE_LENGTH - 1), QUESTIONS)).toEqual({
      ok: false,
      error: 'too-long',
    });
  });

  it('the fully answered catalog fits into one code', async () => {
    const all: Answers = Object.fromEntries(
      QUESTIONS.map((q) => {
        const ids = isMultipleChoice(q)
          ? q.options.filter((o) => o.effects.length).map((o) => o.id)
          : [q.options[0]!.id];
        return [q.id, isWeighable(q) ? pickHigh(...ids) : pick(...ids)];
      }),
    );
    const code = await encodeShareCode(all, DATA_VERSION);
    expect(code.length).toBeLessThanOrEqual(MAX_CODE_LENGTH);
    const decoded = await decodeShareCode(code, QUESTIONS);
    expect(decoded.ok && decoded.answers).toEqual(all);
  });
});

describe('ID limit at exactly 64 characters', () => {
  it('in the share code, 64 characters are valid for data version and answer ID, 65 are not', async () => {
    const at = 'x'.repeat(64);
    const over = 'x'.repeat(65);
    expect((await decodeShareCode(await rawCode(JSON.stringify({ v: 1, d: at, a: [] })), QUESTIONS)).ok).toBe(true);
    expect((await decodeShareCode(await rawCode(JSON.stringify({ v: 1, d: over, a: [] })), QUESTIONS)).ok).toBe(false);
    const withId = await decodeShareCode(
      await rawCode(JSON.stringify({ v: 1, d: 'x', a: [[at, ['tank']]] })),
      QUESTIONS,
    );
    expect(withId).toEqual({ ok: true, answers: {} });
    expect(
      (await decodeShareCode(await rawCode(JSON.stringify({ v: 1, d: 'x', a: [[over, ['tank']]] })), QUESTIONS)).ok,
    ).toBe(false);
  });
});

describe('Share code without compression streams', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('missing compression streams are reported as "not supported" on import', async () => {
    const code = await encodeShareCode(answersOf({ role: pick('tank') }), DATA_VERSION);
    vi.stubGlobal('DecompressionStream', undefined);
    expect(await decodeShareCode(code, QUESTIONS)).toEqual({ ok: false, error: 'unsupported' });
  });

  it('creating codes counts as supported exactly when the browser has CompressionStream', () => {
    expect(canCreateShareCodes()).toBe(true);
    vi.stubGlobal('CompressionStream', undefined);
    expect(canCreateShareCodes()).toBe(false);
  });
});

describe('Share code format', () => {
  const payload = (extra = '') => `{"v":1,"d":"x","a":[["role",["tank"]]]${extra}}`;

  it('whitespace around the code is allowed, inside the code it is not', async () => {
    const code = await rawCode(payload());
    expect((await decodeShareCode(`  ${code}\n`, QUESTIONS)).ok).toBe(true);
    const middle = Math.floor(code.length / 2);
    for (const gap of [' ', '\n', '\t']) {
      const broken = code.slice(0, middle) + gap + code.slice(middle);
      expect(await decodeShareCode(broken, QUESTIONS), JSON.stringify(gap)).toEqual({ ok: false, error: 'invalid' });
    }
  });

  it('exactly 32 KB unpacked is allowed, one byte more is too long', async () => {
    const exactly = (size: number) => {
      const base = '{"v":1,"d":"x","a":[]}';
      return base.slice(0, -1) + ' '.repeat(size - base.length) + '}';
    };
    const ok = await decodeShareCode(await rawCode(exactly(32 * 1024)), QUESTIONS);
    expect(ok).toMatchObject({ ok: true, answers: {} });
    expect(await decodeShareCode(await rawCode(exactly(32 * 1024 + 1)), QUESTIONS)).toEqual({
      ok: false,
      error: 'too-long',
    });
  });

  it('garbage after the compressed stream and invalid UTF-8 are invalid', async () => {
    const valid = new TextEncoder().encode(payload());
    expect(await decodeShareCode(await rawCodeFromBytes(valid, [1, 2, 3]), QUESTIONS)).toEqual({
      ok: false,
      error: 'invalid',
    });
    const brokenUtf8 = new Uint8Array([
      ...new TextEncoder().encode('{"v":1,"d":"'),
      0xff,
      ...new TextEncoder().encode('","a":[]}'),
    ]);
    expect(await decodeShareCode(await rawCodeFromBytes(brokenUtf8), QUESTIONS)).toEqual({
      ok: false,
      error: 'invalid',
    });
  });

  it('payloads that are not an object and malformed entries are invalid', async () => {
    for (const body of ['null', '5', '"x"', 'true']) {
      expect(await decodeShareCode(await rawCode(body), QUESTIONS), body).toEqual({ ok: false, error: 'invalid' });
    }
    const entries = [
      '"role"',
      '[]',
      '["role",["tank"],1,1]',
      '["role",["tank",5]]',
      '["role","tank"]',
      '["role",["tank"],2]',
    ];
    for (const entry of entries) {
      const code = await rawCode(`{"v":1,"d":"x","a":[${entry}]}`);
      expect(await decodeShareCode(code, QUESTIONS), entry).toEqual({ ok: false, error: 'invalid' });
    }
    expect((await decodeShareCode(await rawCode('{"v":1,"d":"x","a":[["role",["tank"],1]]}'), QUESTIONS)).ok).toBe(
      true,
    );
    const dontCare = await decodeShareCode(await rawCode('{"v":1,"d":"x","a":[["role"]]}'), QUESTIONS);
    expect(dontCare.ok && dontCare.answers).toEqual(answersOf({ role: DONT_CARE }));
  });

  it('entries that are neither a list nor text are rejected instead of throwing an exception', async () => {
    for (const entry of ['5', 'null', '{}', 'true', '{"length":2}']) {
      const code = await rawCode(`{"v":1,"d":"x","a":[${entry}]}`);
      await expect(decodeShareCode(code, QUESTIONS), entry).resolves.toEqual({ ok: false, error: 'invalid' });
    }
  });
});

describe('Share code', () => {
  it('a code records the data version it was made with', async () => {
    const code = await encodeShareCode(answersOf({ role: pick('tank') }), 'beta-old');
    const bytes = Uint8Array.from(atob(code.slice(2).replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
    const json = await new Response(
      new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')),
    ).text();
    expect((JSON.parse(json) as { d: string }).d).toBe('beta-old');
  });

  it('encode → decode yields the same answer set', async () => {
    await fc.assert(
      fc.asyncProperty(answersArb, async (answers) => {
        const code = await encodeShareCode(answers, DATA_VERSION);
        expect(code.length).toBeLessThanOrEqual(MAX_CODE_LENGTH);
        const result = await decodeShareCode(code, QUESTIONS);
        expect(result.ok).toBe(true);
        if (result.ok) {
          expect(result.answers).toEqual(answers);
        }
      }),
      { numRuns: 50 },
    );
  });

  it('broken or tampered codes yield a controlled error', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string({ maxLength: 300 }), async (garbage) => {
        const result = await decodeShareCode(garbage, QUESTIONS);
        if (!result.ok) expect(['invalid', 'too-long']).toContain(result.error);
      }),
    );
    const bad = [
      '',
      '1.',
      '2.abc',
      '1.!!!',
      await rawCode('not json'),
      await rawCode('{"v":2,"d":"x","a":[]}'),
      await rawCode('{"v":1,"d":5,"a":[]}'),
      await rawCode('{"v":1,"d":"x","a":{}}'),
      await rawCode('{"v":1,"d":"x","a":[["role",["tank"],"x"]]}'),
      await rawCode('{"v":1,"d":"x","a":[[1,["tank"]]]}'),
    ];
    for (const code of bad) {
      const result = await decodeShareCode(code, QUESTIONS);
      expect(result.ok, code).toBe(false);
      if (!result.ok) expect(result.error).toBe('invalid');
    }
  });

  it('a code without a data version is rejected like an invalid one', async () => {
    const code = await rawCode(JSON.stringify({ v: 1, d: '', a: [['role', ['tank']]] }));
    expect(await decodeShareCode(code, QUESTIONS)).toEqual({ ok: false, error: 'invalid' });
  });

  it('codes that are too long and decompression bombs are rejected', async () => {
    const long = await decodeShareCode('1.' + 'A'.repeat(MAX_CODE_LENGTH), QUESTIONS);
    expect(long).toEqual({ ok: false, error: 'too-long' });

    const bomb = await rawCode(JSON.stringify({ v: 1, d: 'x', a: [['role', ['tank']]], pad: ' '.repeat(1_000_000) }));
    expect(bomb.length).toBeLessThan(MAX_CODE_LENGTH);
    const result = await decodeShareCode(bomb, QUESTIONS);
    expect(result).toEqual({ ok: false, error: 'too-long' });
  });

  it('unknown IDs are dropped, known ones kept, whatever data version the code records', async () => {
    const code = await rawCode(
      JSON.stringify({
        v: 1,
        d: 'old-1999',
        a: [
          ['role', ['tank'], 1],
          ['does-not-exist', ['x']],
          ['resource', ['mana', 'unknown', 'rage']],
          ['distance', ['unknown']],
          ['faction', ['horde', 'alliance']],
        ],
      }),
    );
    const result = await decodeShareCode(code, QUESTIONS);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.answers).toEqual(
      answersOf({
        role: pickHigh('tank'),
        resource: pick('mana', 'rage'),
        faction: pick('horde'),
      }),
    );
  });
});

describe('Share links', () => {
  it('a share link carries the code unchanged in its fragment; other fragments are no share links', () => {
    fc.assert(
      fc.property(fc.stringMatching(/^[A-Za-z0-9._-]{1,40}$/), (code) => {
        const link = new URL(shareLinkFor('https://example.org/forge/', code));
        expect(link.pathname).toBe('/forge/');
        expect(codeFromHash(link.hash)).toBe(code);
      }),
    );
    expect(shareLinkFor('https://example.org/', 'abc')).toBe('https://example.org/#s=abc');
    expect(codeFromHash('#s=')).toBe('');
    for (const hash of ['', '#chapter-pvp', '#s', '#xs=abc', '#S=abc', 's=abc'])
      expect(codeFromHash(hash), hash).toBeUndefined();
  });
});
