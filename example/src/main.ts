import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { attachSwaggerMiddleware } from "@teclo/nestjs-swagger-ui"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const builder = new DocumentBuilder()
  attachSwaggerMiddleware({
    path: "/docs",
    app: app,
    doc: builder
  })

  // SwaggerModule.setup("/docs", app, SwaggerModule.createDocument(app, builder.build()))
  await app.listen(3000)
}

bootstrap()
