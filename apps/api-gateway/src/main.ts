import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { env } from "./env";
import { registry } from "./common/ModuleRegistry";
import { TestPlugModule } from "@repo/infra-test-plug";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }), // Fastify logger habilitado
  );

  // REGISTRO DE MÓDULOS PLUG-AND-PLAY
  const testModule = new TestPlugModule();
  await registry.register(testModule);

  // Seguridad CORS: Solo permitir el dominio del frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || ["http://localhost:3000", "http://localhost:3002"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // app.useLogger(app.get(Logger)); // Opcional si añades nestjs-pino

  try {
    await app.listen(parseInt(env.PORT), "0.0.0.0");
    console.log(`🚀 API Gateway corriendo en puerto ${env.PORT}`);
  } catch (err) {
    console.error("❌ Error crítico al arrancar el servidor:", err);
    process.exit(1);
  }
}
bootstrap();
