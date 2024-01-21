import type { OpenAPIObject } from "@nestjs/swagger"
import swaggerUiDistPackJson from "swagger-ui-dist/package.json"
import { html } from "@/constants"

const swaggerUiDistVersion = swaggerUiDistPackJson.version

type GenerateHTMLOptions = {
  doc: OpenAPIObject
  swaggerUiDistVersion?: string
}

export const generateHTML = (options: GenerateHTMLOptions) => {
  const _options = {
    swaggerDoc: options.doc
  }

  const uiVersion = options.swaggerUiDistVersion ?? swaggerUiDistVersion

  return html
    .replace("{{options}}", `const options = ${JSON.stringify(_options)}`)
    .replace("{{swaggerUiVersion}}", uiVersion)
    .replace("{{title}}", options.doc.info.title)
}
