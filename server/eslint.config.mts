import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { FlatConfig } from 'typescript-eslint';

const prettierPlugin = prettier;
const prettierConfig = JSON.parse(readFileSync(resolve(import.meta.dirname, '.prettierrc'), 'utf-8'));

const config: FlatConfig.Config[] = [
  js.configs.recommended,
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
        tsconfigRootDir: import.meta.dirname,
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

export default config;
