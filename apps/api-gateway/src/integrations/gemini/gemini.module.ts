import { Module } from "@nestjs/common";
import { GeminiService } from "./gemini.service";
import { ConfigService } from "../../common/config/config.service";

@Module({
  providers: [GeminiService, ConfigService],
  exports: [GeminiService],
})
export class GeminiModule {}
