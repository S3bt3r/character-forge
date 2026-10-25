import { defineConfig, mergeConfig } from 'vitest/config';
import base from './vite.config';

// A test that reads text keys from the source would see Stryker's instrumented files and fail.
export default mergeConfig(base, defineConfig({ test: { exclude: ['node_modules/**', 'tests/ui/keys.test.ts'] } }));
