import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));
const prettierConfig = JSON.parse(
  fs.readFileSync(join(__dirname, '.prettierrc'), 'utf8')
);

export default [
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Production code
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      globals: { ...globals.node },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/require-await': 'warn',
      'prettier/prettier': ['error', prettierConfig],
      'max-len': ['warn', { code: 120 }],
    },
  },

  // Tests/specs
  {
    files: ['**/*.spec.ts', 'test/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      globals: { ...globals.node, ...globals.jest },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/require-await': 'off',
      'prettier/prettier': ['error', prettierConfig],
      'max-len': ['warn', { code: 120 }],
    },
  },
];