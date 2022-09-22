import type { Config } from "jest";

const config: Config = {
  modulePathIgnorePatterns: [
    "<rootDir>/client/",
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
