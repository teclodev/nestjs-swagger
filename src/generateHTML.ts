import { OpenAPIObject, SwaggerCustomOptions } from "@nestjs/swagger"
import { defaultSwaggerCustomOptions, favIconHtml, htmlTemplate } from "./constants"
import { jsStringifyOptions, toExternalScriptTag, toExternalStylesheetTag, toInlineScriptTag, toTags } from "./utils"

type SwaggerOptions = {
  spec: OpenAPIObject
  dom_id: string
  deepLinking: boolean
  presets: string[]
  plugins: string[]
  layout: string
}

type GenerateHTMLOptions = {
  doc: OpenAPIObject
  swaggerUiDistVersion: string
  customOptions?: SwaggerCustomOptions
  path: string
}

export const generateHTML = (options: GenerateHTMLOptions) => {
  const customOptions = options.customOptions ?? {}

  for (const [key] of Object.entries(defaultSwaggerCustomOptions)) {
    const prev = customOptions[key]
    if (prev === undefined) {
      customOptions[key] = defaultSwaggerCustomOptions[key]
    }
  }

  const swaggerOptions: SwaggerOptions = {
    spec: options.doc,
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: ["SwaggerUIBundle.presets.apis", "SwaggerUIStandalonePreset"],
    plugins: ["SwaggerUIBundle.plugins.DownloadUrl"],
    layout: "StandaloneLayout"
  }

  const uiVersion = options.swaggerUiDistVersion
  const title = options.doc.info.title ?? customOptions.customSiteTitle

  const explorerCss = customOptions.explorer ? "" : ".swagger-ui .topbar .download-url-wrapper { display: none }"

  const favIconStr = customOptions.customfavIcon
    ? `<link rel='icon' href='${customOptions.customfavIcon}' />`
    : favIconHtml.replaceAll("{{path}}", options.path)

  return htmlTemplate
    .replace("{{swaggerOptions}}", `const swaggerOptions = ${jsStringifyOptions(swaggerOptions)}`)
    .replace("{{customOptions}}", `const customOptions = ${jsStringifyOptions(customOptions)}`)
    .replace(/"SwaggerUIBundle.presets.apis"/, "SwaggerUIBundle.presets.apis")
    .replace(/"SwaggerUIStandalonePreset"/, "SwaggerUIStandalonePreset")
    .replace(/"SwaggerUIBundle.plugins.DownloadUrl"/, "SwaggerUIBundle.plugins.DownloadUrl")
    .replace("{{title}}", title)
    .replace("{{customJs}}", toTags(customOptions.customJs, toExternalScriptTag))
    .replace("{{customJsStr}}", toTags(customOptions.customJs, toInlineScriptTag))
    .replace("{{customCssUrl}}", toTags(customOptions.customJs, toExternalStylesheetTag))
    .replace("{{customCss}}", customOptions.customCss)
    .replace("{{explorerCss}}", explorerCss)
    .replaceAll("{{swaggerUiVersion}}", uiVersion)
    .replace("{{favIconStr}}", favIconStr)
}
