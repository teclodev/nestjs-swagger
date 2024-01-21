import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  displayName: "unit",
  testEnvironment: "node",
  rootDir: "test"
}

export default jestConfig
