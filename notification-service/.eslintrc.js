module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'standard-with-typescript',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    overrides: [],
  
    rules: {
      '@typescript-eslint/dot-notation': 'error',
      'no-console': 'warn',
    },
  };
  