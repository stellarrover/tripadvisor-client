import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    globals: true,
    environment: 'node',
    coverage: {
      include: ['src/**/*.ts'],
      enabled: true,
      thresholds: {
        lines: 85,
        statements: 85,
        functions: 85,
        branches: 85,
      },
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        'examples/**',
        'src/index.ts',
        'src/types/index.ts',
      ],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
