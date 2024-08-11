import { ConfigService } from "@nestjs/config"
import { NestFactory, Reflector } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import * as cookeParser from "cookie-parser"
import { Logger } from "nestjs-pino"

import { AppModule } from "./app.module"
import { JwtAuthGuard } from "./common/guard/jwt-auth.guard"
import { SWAGGER_CONFIG, SWAGGER_OPTIONS } from "./config/docs"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useLogger(app.get(Logger))
  const reflector = new Reflector()
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.use(cookeParser())
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: [
      "http://localhost:3005",
      // "https://yourdomain.com"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG, SWAGGER_OPTIONS)
  SwaggerModule.setup("api-docs", app, document, {
    jsonDocumentUrl: "swagger.json",
  })

  app.use("/swagger-json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Content-Disposition", "attachment; filename=swagger.json")
    res.send(JSON.stringify(document))
  })

  await app.listen(configService.get("PORT"), "0.0.0.0")
}
bootstrap()
