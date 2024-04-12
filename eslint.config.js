import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    plugins: typescriptEslint,
  },
  {
    // TODO: 아직 v9 지원 하지 않음.
    // https://github.com/import-js/eslint-plugin-import/pull/2996
    // plugins: eslint-plugin-import
  },
  { ignores: ['.next', 'out', '*.cjs'] },
  eslintConfigPrettier,
];
