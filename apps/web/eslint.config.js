/**
 * TypeScript/JSX files are covered by `tsc --noEmit` (strict mode, noUncheckedIndexedAccess).
 * To enable ESLint on .ts/.tsx files, install:
 *   @typescript-eslint/parser @typescript-eslint/eslint-plugin
 * and update this config.
 */
export default [
  {
    ignores: ["dist/**", "src/**/*.{ts,tsx}"],
  },
];
