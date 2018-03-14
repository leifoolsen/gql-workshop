/* eslint max-len: 0 */

module.exports = {
  name: 'unit-tests',
  displayName: 'unit-tests',
  rootDir: process.cwd(),
  testMatch: [
    '<rootDir>**/__tests__/**/*.unit.(spec|test).js?(x)',
    '<rootDir>**/?(*.unit.)(spec|test).js?(x)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tools/jest/file.mock.js',
    '\\.(css|scss|less)$': '<rootDir>/tools/jest/style.mock.js'
  }
};
