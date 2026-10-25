// Only rules the strict TypeScript settings do not cover already; formatting is Prettier's job, not ESLint's.
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import boundaries from 'eslint-plugin-boundaries';

/*
 * The layers of src and the directions their imports may take. A type-only import binds no code at runtime; the German
 * catalogs use it to bind their texts to the originals. main.tsx and language-init.ts are the entry points and wire
 * everything together.
 */
const LAYERS = ['domain', 'data', 'i18n', 'persistence', 'app', 'ui'];
const ALLOWED = {
  domain: { runtime: [], types: [] },
  data: { runtime: ['domain', 'i18n'], types: ['domain', 'i18n'] },
  i18n: { runtime: [], types: ['domain', 'data'] },
  persistence: { runtime: ['domain'], types: ['domain'] },
  app: { runtime: ['domain', 'data'], types: ['domain', 'data'] },
  ui: { runtime: ['domain', 'app', 'persistence', 'i18n'], types: ['domain', 'app', 'persistence', 'i18n'] },
};
const layer = (type) => ({ element: { type } });
const directions = LAYERS.flatMap((from) => [
  { from: layer(from), allow: { to: layer(from) } },
  ...ALLOWED[from].runtime.map((to) => ({ from: layer(from), allow: { to: layer(to) } })),
  ...ALLOWED[from].types.map((to) => ({ from: layer(from), allow: { to: layer(to), dependency: { kind: 'type' } } })),
]);
const entry = { file: { categories: 'entry' } };

export default defineConfig(
  { ignores: ['dist/', 'reports/', '.stryker-tmp/', 'node_modules/'] },
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}', '*.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { '@typescript-eslint': tseslint.plugin, 'react-hooks': reactHooks },
    rules: {
      // A promise nobody awaits loses its errors; an intended fire-and-forget says so with `void`.
      '@typescript-eslint/no-floating-promises': 'error',
      // An async function where a plain callback is expected (event handlers, array callbacks) hides its result.
      '@typescript-eslint/no-misused-promises': 'error',
      // Hooks only at the top level of components and hooks (Preact follows React's rules here).
      'react-hooks/rules-of-hooks': 'error',
      // Every value an effect or memo reads belongs in its dependency list, or it works on stale values.
      'react-hooks/exhaustive-deps': 'error',
      // With verbatimModuleSyntax, `import { type A }` still loads the module at runtime; `import type` does not.
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': { node: { extensions: ['.ts', '.tsx'] } },
      'boundaries/elements': LAYERS.map((type) => ({ type, pattern: `src/${type}`, partialMatch: false })),
      'boundaries/files': [
        { pattern: 'src/{main.tsx,language-init.ts}', category: 'entry' },
        { pattern: 'src/ui/catalog.ts', category: 'uiDataGate' },
        { pattern: 'src/data/display.ts', category: 'displayTypes' },
        { pattern: 'src/ui/texts.ts', category: 'uiTexts' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkAllOrigins: true,
          checkUnknownLocals: true,
          policies: [
            ...directions,
            { from: entry, allow: { to: [...LAYERS.map(layer), entry] } },
            // The UI reads the data at runtime only through its catalog; elsewhere it imports display types only.
            { from: { element: { type: 'ui' }, file: { categories: 'uiDataGate' } }, allow: { to: layer('data') } },
            {
              from: layer('ui'),
              allow: { to: { file: { categories: 'displayTypes' } }, dependency: { kind: 'type' } },
            },
            // The German catalogs bind only to the English interface texts of the UI, nothing else there.
            { from: layer('i18n'), allow: { to: { file: { categories: 'uiTexts' } }, dependency: { kind: 'type' } } },
            // Only the UI and the entry points use outside packages: Preact, and the self-hosted fonts at the entry.
            { from: [layer('ui'), entry], allow: { to: { module: { origin: 'external', source: 'preact{,/**}' } } } },
            { from: entry, allow: { to: { module: { origin: 'external', source: '@fontsource/**' } } } },
          ],
        },
      ],
      // A computed path escapes the layer check.
      'no-restricted-syntax': [
        'error',
        { selector: "ImportExpression[source.type!='Literal']", message: 'Import paths must be literal.' },
      ],
    },
  },
);
