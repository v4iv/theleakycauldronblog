module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-trailing-commas',
    'standard-react',
  ],
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
