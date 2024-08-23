// @ts-check

import eslintConfigPrettier from 'eslint-config-prettier';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  eslintConfigPrettier,
  { ignores: ['.next', 'playwright-report', 'out', '*.cjs', 'test-results'] },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  ...tseslint.configs.recommended,
);
