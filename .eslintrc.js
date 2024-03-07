module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
  },
};
