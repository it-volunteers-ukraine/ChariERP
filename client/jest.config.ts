/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: false,

  // The maximum number of workers used to run your tests. Can be specified as % or a number.
  // E.g., maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",
};

export default createJestConfig(config);
