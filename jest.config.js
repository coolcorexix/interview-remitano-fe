export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  modulePaths: ['<rootDir>'],
  testMatch: ["<rootDir>/src/**/*.spec.(ts|tsx)"],
  transform: {
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "jest-preview/transforms/file",
  },
};
