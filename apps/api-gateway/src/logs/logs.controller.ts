import { Controller, Post, Body } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { z } from "zod";

const LogSchema = z.object({
  level: z.enum(["info", "warn", "error"]),
  message: z.string(),
  platform: z.string(),
  version: z.string().optional(),
  context: z.record(z.any()).optional(),
});

@Controller("api")
export class LogsController {
  constructor(private readonly logger: PinoLogger) {}

  @Post("logs")
  receiveLog(@Body() logData: unknown) {
    const parsed = LogSchema.safeParse(logData);

    if (!parsed.success) {
      return { status: "error", errors: parsed.error.issues };
    }

    const { level, message, platform, ...rest } = parsed.data;

    // Usamos el logger estructurado
    this.logger.assign({ platform });
    this.logger[level](rest.context, `[${platform.toUpperCase()}] ${message}`);

    return { status: "ok" };
  }
}
