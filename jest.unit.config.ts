import type { JestConfigWithTsJest } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  displayName: "unit",
  testEnvironment: "node",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}

export default jestConfig
