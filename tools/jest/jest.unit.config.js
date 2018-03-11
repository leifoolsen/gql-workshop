module.exports = {
  name: 'unit-tests',
  displayName: 'unit-tests',
  rootDir: process.cwd(),
  testMatch: [
    '<rootDir>**/__tests__/**/*.unit.(spec|test).js?(x)',
    '<rootDir>**/?(*.unit.)(spec|test).js?(x)'
  ]
};
