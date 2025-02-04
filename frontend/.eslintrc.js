module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['next/babel'],
    },
  },
  plugins: ['@next/eslint-plugin-next'],
  extends: ['plugin:@next/next/recommended'],
  rules: {
    // Add any custom rules here
  },
};
