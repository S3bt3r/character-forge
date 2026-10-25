import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** The complete stylesheet in cascade order: `src/ui/styles/index.css` with all imported partial files. */
export function readStyles(): string {
  // Node paths instead of URL objects, because the DOM environment of the UI tests replaces the global URL.
  const dir = join(dirname(fileURLToPath(import.meta.url)), '../../src/ui/styles');
  const index = readFileSync(join(dir, 'index.css'), 'utf-8');
  return [...index.matchAll(/@import '\.\/([\w-]+\.css)';/g)]
    .map((m) => readFileSync(join(dir, m[1]!), 'utf-8'))
    .join('');
}
