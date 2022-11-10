module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  settings: {
    'import/resolver': 'typescript',
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: '.',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    curly: 2,
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        // vue: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'type',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: '@script/**',
            group: 'internal',
          },
          {
            pattern: '@script/types/**',
            group: 'type',
            position: 'before',
          },
          {
            pattern: '@img/**',
            group: 'object',
            position: 'before',
          },
          {
            pattern: '@style/**',
            group: 'object',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['/'],
      },
    ],
    'no-console': 1,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-plusplus': 0,
    'no-restricted-syntax': [
      2,
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-use-before-define': [
      2,
      {
        functions: false,
      },
    ],
    'no-unused-vars': [
      2,
      {
        vars: 'local',
        args: 'none',
      },
    ],
    camelcase: [0, { properties: 'never' }],
    'func-names': [2, 'never'],
    'consistent-return': [
      2,
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    'prefer-destructuring': [
      2,
      {
        object: true,
        array: false,
      },
    ],
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: ['vite.config.*'],
        optionalDependencies: false,
      },
    ],
    'no-new': 1,
    'import/no-cycle': [0],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        ignoreTypeReferences: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      2,
      {
        allowSingleExtends: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-bitwise': 0,
    '@typescript-eslint/no-inferrable-types': [
      2,
      {
        ignoreParameters: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/prefer-arrow-functions': 0,
    '@typescript-eslint/ter-prefer-arrow-callback': 0,
    '@typescript-eslint/object-literal-sort-keys': 0,
    '@typescript-eslint/prefer-template': 0,
    '@typescript-eslint/no-increment-decrement': 0,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: ['parameterProperty', 'typeProperty'],
        format: ['camelCase', 'PascalCase', 'snake_case'],
      },
    ],
  },
};
