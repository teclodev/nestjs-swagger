let version: string

export const getSwaggerUiDistVersion = (provided?: string) => {
  if (version) return version
  if (provided) {
    version = provided
    return provided
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const tmp = require("swagger-ui-dist/package.json").version
  version = tmp
  return tmp
}
