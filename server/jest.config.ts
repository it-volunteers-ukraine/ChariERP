
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Collect coverage from these files
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',           // Exclude main.ts
    '!src/**/*.spec.ts',      // Exclude test files
    '!src/**/*.e2e-spec.ts',  // Exclude e2e test files
    '!src/**/*.interface.ts', // Exclude interface files (optional)
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testMatch: [
    '**/*.spec.ts',
    '**/*.e2e-spec.ts'
  ],
};