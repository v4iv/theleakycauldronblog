module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'standard',
    'standard-trailing-commas',
    'standard-react',
  ],
  plugins: ['react'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    graphql: true,
    __PATH_PREFIX__: true,
    fetch: true,
    sessionStorage: true,
    localStorage: true,
    alert: true,
    gtag: true,
  },
  rules: {
    'no-unused-vars': 'off',
  },
}
