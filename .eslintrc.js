module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['**/*.spec.{j,t}s'],
      env: {
        jest: true,
      },
    },
  ],
};
