import { Module } from "@nestjs/common";
import { GeminiModule } from "./integrations/gemini/gemini.module";
import { AppController } from "./app.controller";

@Module({
  imports: [GeminiModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
