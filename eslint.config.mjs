import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Get rules from eslint-plugin-prettier
const { rules: prettierRules } = eslintPluginPrettier;

const eslintConfig = [
  // ✅ Load Next.js + TS rules
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // ✅ Disable ESLint rules that conflict with Prettier
  ...compat.extends('prettier'),

  // ✅ Enable prettier plugin and its rules
  {
    plugins: {
      prettier: {
        rules: prettierRules,
      },
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-undef': 'error', // or 'error'
    },
  },
];

export default eslintConfig;
