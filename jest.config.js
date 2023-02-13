/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  setupFilesAfterEnv: [
    'jest-extended/all'
  ]
};