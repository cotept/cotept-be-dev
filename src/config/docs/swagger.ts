import { DocumentBuilder, SwaggerDocumentOptions } from "@nestjs/swagger"

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle("CotePT API")
  .setDescription(
    `The cotePT API description
      <br><a href="swagger.json" target="_blank" download="swagger.json">Download Swagger JSON</a>`,
  )
  .setVersion("1.0")
  .addServer("http://localhost:3005/", "Local environment")
  // .addServer("https://staging.yourapi.com/", "Staging")
  // .addServer("https://production.yourapi.com/", "Production")
  .addTag("Authentication")
  .addTag("Users")
  // .addTag("Reservations")
  // .addTag("Payments")
  .build()

export const SWAGGER_OPTIONS: SwaggerDocumentOptions = {
  deepScanRoutes: true,
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
}
