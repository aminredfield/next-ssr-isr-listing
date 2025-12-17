import { defineConfig } from 'vitest/config';

// Vitest configuration for unit tests. Running `npm test` will execute
// tests defined in the `tests/` directory. We use the node environment
// because the functions under test do not rely on the DOM.
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});