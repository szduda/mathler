/** @type {import('ts-jest').JestConfigWithTsJest} */

const baseConfig = {
  preset: "ts-jest",
  moduleNameMapper: { "@/(.+)": ["<rootDir>/src/$1"] },
  modulePaths: ["<rootDir>"],
  transform: {
    "^.+\\.tsx$": ["babel-jest", { presets: ["next/babel"] }],
  },
};

module.exports = {
  ...baseConfig,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  projects: [
    {
      ...baseConfig,
      testEnvironment: "jsdom",
      displayName: "client",
      testMatch: ["<rootDir>/src/**/*.test.tsx"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/testingLibraryConfig.ts"],
    },
    {
      ...baseConfig,
      testEnvironment: "node",
      displayName: "server",
      testMatch: ["<rootDir>/src/app/**/*.test.ts"],
      testEnvironment: "node",
    },
  ],
};
