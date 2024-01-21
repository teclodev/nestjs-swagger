import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger"
import { INestApplication } from "@nestjs/common"
import * as path from "path"
import * as jsYaml from "js-yaml"
import { removeTrailingSlash } from "./utils"
import { generateHTML } from "./generateHTML"
import { getSwaggerUiDistVersion } from "./getSwaggerUiDistVersion"

type AttachSwaggerMiddlewareOptions = {
  /**
   * Base path for rendering swagger UI.
   */
  path: string
  /**
   * Generated NestJS application.
   */
  app: INestApplication
  /**
   * Base swagger document.
   */
  doc: DocumentBuilder
  /**
   * Custom swagger document options.
   */
  docOptions?: SwaggerDocumentOptions
  /**
   * Custom @nestjs/swagger document options.
   */
  customOptions?: SwaggerCustomOptions
  /**
   * swagger-ui-dist version, will default to the currently installed version.
   */
  swaggerUiDistVersion?: string
}

// cache
let content

/**
 * Generates swagger UI html template and to `path`.
 * @param options
 */
export const attachSwaggerMiddleware = (options: AttachSwaggerMiddlewareOptions) => {
  const { app, doc } = options

  const _path = removeTrailingSlash(options.path)

  const getContent = () => {
    if (content) return content
    const tmp = generateHTML({
      doc: SwaggerModule.createDocument(app, doc.build(), options.docOptions),
      swaggerUiDistVersion: getSwaggerUiDistVersion(options.swaggerUiDistVersion),
      customOptions: options.customOptions,
      path: _path
    })
    content = tmp
    return tmp
  }

  const adapter = app.getHttpAdapter()

  adapter.useStaticAssets(path.join(__dirname, "public"), { prefix: _path })

  adapter.get(_path, (req, res) => res.set("Content-Type", "text/html").send(getContent()))
  adapter.get(`${_path}-json`, (req, res) => res.set("Content-Type", "application/json").send(doc))
  adapter.get(`${_path}-yaml`, (req, res) =>
    res.set("Content-Type", "text/yaml").send(
      jsYaml.dump(doc, {
        skipInvalid: true,
        noRefs: true
      })
    )
  )
}
