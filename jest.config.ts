import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
  projects: ["<rootDir>/jest.unit.config.ts"]
}
export default jestConfig
