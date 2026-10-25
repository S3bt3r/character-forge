import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { DE } from '../../src/i18n/de';

/*
 * Reads the source code instead of checking behavior. Under Stryker, the files there are instrumented, which is why
 * this file is excluded from the mutation run (vitest.stryker.config.ts); it could not detect a mutant anyway.
 */
describe('UI keys in the code', () => {
  it('every UI key in the catalogs is used in the code', () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) walk(path);
        else if (/\.tsx?$/.test(name)) files.push(path);
      }
    };
    walk(new URL('../../src', import.meta.url).pathname);
    // The catalogs themselves name every key; only the code that uses them counts.
    const isCatalog = (f: string) => f.includes('/i18n/') || f.endsWith('/ui/texts.ts');
    const code = files
      .filter((f) => !isCatalog(f))
      .map((f) => readFileSync(f, 'utf-8'))
      .join('\n');
    // Used: directly in t('…'), as a literal in files that work with MessageKey (tables, return values),
    // or composed. Limitation: an orphaned key named like another literal there goes unnoticed.
    const direct = [...code.matchAll(/\bt\('(\w+)'/g)].map((m) => m[1]!);
    const tables = files
      .filter((f) => !isCatalog(f) && readFileSync(f, 'utf-8').includes('MessageKey'))
      .flatMap((f) => [...readFileSync(f, 'utf-8').matchAll(/'(\w+)'/g)].map((m) => m[1]!));
    // Composed keys with their possible values; a new pattern in the code must be added here.
    const composed: Record<string, readonly string[]> = {
      influence_: ['1', '2', '3', '4'],
      weight_: ['dontCare', 'normal', 'high', 'count'],
      faction_: ['horde', 'alliance'],
    };
    expect([...new Set([...code.matchAll(/\bt\(`(\w+_)\$\{/g)].map((m) => m[1]!))].sort()).toEqual(
      Object.keys(composed).sort(),
    );
    const used = new Set([
      ...direct,
      ...tables,
      ...Object.entries(composed).flatMap(([p, vs]) => vs.map((v) => p + v)),
    ]);
    expect(Object.keys(DE).filter((key) => !used.has(key))).toEqual([]);
    for (const key of used)
      if (Object.keys(composed).some((p) => key.startsWith(p))) expect(DE, key).toHaveProperty(key);
  });
});
