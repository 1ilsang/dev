module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'at-rule-no-unknown': null,
    'color-function-notation': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
  },
};
