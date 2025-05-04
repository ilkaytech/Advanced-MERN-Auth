/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/src"],
  verbose: true,
  clearMocks: true,
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
