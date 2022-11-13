const rules = {
  'no-plusplus': 'off',
  'import/no-mutable-exports': 'off',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: true,
    },
  ],
};

module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  env: {
    es6: true,
    browser: true,
  },

  extends: ['airbnb-base'],

  plugins: ['svelte3'],

  settings: {
    'svelte3/typescript': true,
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },

  overrides: [
    // Typescript files
    {
      files: ['src/**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules,
    },

    // Svelte files
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'no-use-before-define': 'off',
      },
    },
  ],

  rules,

  ignorePatterns: ['node_modules/**', '**/dist/**'],
};
