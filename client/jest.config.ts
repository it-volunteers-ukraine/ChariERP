import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', '.husky', 'public'],
  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ['text-summary'],
  preset: 'ts-jest',
  testEnvironment: 'node',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  errorOnDeprecated: false,
};

export default createJestConfig(config);