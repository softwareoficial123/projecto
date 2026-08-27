import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { GeminiModule } from "./integrations/gemini/gemini.module";
import { AppController } from "./app.controller";
import { LogsController } from "./logs/logs.controller";

@Module({
  imports: [GeminiModule, LoggerModule.forRoot()],
  controllers: [AppController, LogsController],
  providers: [],
})
export class AppModule {}
