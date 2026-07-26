/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  globalSetup: "<rootDir>/tests/integration/global-setup.ts",
  globalTeardown: "<rootDir>/tests/integration/global-teardown.ts",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/app/**",
    "!src/lib/auth.ts",
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 59,
      functions: 70,
      lines: 70,
    },
    "./src/domains/recommendations/": {
      statements: 85,
    },
    "./src/domains/roadmaps/": {
      statements: 80,
    },
    "./src/lib/auth.ts": {
      statements: 90,
      functions: 90,
      lines: 90,
    },
  },
  coverageDirectory: "coverage",
  verbose: true,
};

module.exports = config;
