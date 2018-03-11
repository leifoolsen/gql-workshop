module.exports = {
  name: 'integration-tests',
  displayName: 'integration-tests',
  rootDir: process.cwd(),
  testMatch: [
    '<rootDir>**/__tests__/**/*.integration.(spec|test).js?(x)',
    '<rootDir>**/?(*.integration.)(spec|test).js?(x)'
  ]
};
