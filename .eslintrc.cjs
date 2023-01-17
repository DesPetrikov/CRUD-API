module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2015',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
