import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
  // Relative base so the static build runs in any subpath (e.g. GitHub Pages).
  base: './',
  plugins: [preact()],
  build: {
    // The bundle is almost entirely evidence notes in two languages, not code; the 500 kB default targets code-heavy
    // bundles. Raise this only when the data grows, not to hide new dependencies.
    chunkSizeWarningLimit: 800,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/support/setup.ts'],
    // UI tests mount the whole app; under CPU load (parallel runs, mutation testing) they can exceed the 5 s default.
    testTimeout: 15000,
  },
});
