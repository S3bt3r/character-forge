import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/preact';
import { setLanguage } from '../../src/ui/t';

/*
 * English is the reference and start language, and the tests check the interface in English. Every test starts in
 * English, so a test that switches to German does not leak into the next one.
 */
beforeEach(() => setLanguage('en'));

// Testing Library unmounts what its `render` mounted; without Vitest's globals it does not hook in on its own.
afterEach(() => cleanup());
