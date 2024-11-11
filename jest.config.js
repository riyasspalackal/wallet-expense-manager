/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  preset: "ts-jest",
  testMatch: ["**/tests/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/database/**", // Exclude database-related files
    "!src/config/**", // Exclude configuration files
    "!src/index.ts", // Exclude entry point
    "!src/**/*.d.ts", // Exclude type declaration files
    "!**/tests/**", // Exclude test files
    "!src/**/__mocks__/**", // Exclude mock files
  ],
  coverageDirectory: "coverage", // Output directory for coverage reports
  coverageReporters: ["text", "lcov", "html"],
};
