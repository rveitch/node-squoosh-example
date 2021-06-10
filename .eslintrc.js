module.exports = {
  plugins: [],

  extends: [
    'airbnb-base',
  ],

  rules: {
    'max-len': [
      'error',
      180,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    'arrow-parens': [
      'error',
      'always',
    ],

    'no-use-before-define': [
      'error',
      {
        'functions': false,
      },
    ],
  },
};
