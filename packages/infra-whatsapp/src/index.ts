import { BaseModule, ModuleConfig } from "@repo/core";
import { Logger } from "pino";

// Nota: Deberías crear un archivo module.config.ts para este módulo
const config: ModuleConfig = {
  metadata: {
    name: 'whatsapp',
    version: '1.0.0',
    description: 'Adaptador de WhatsApp',
    goals: ['Mensajería'],
  },
  dependencies: { modules: [] },
  settings: { enabled: true },
};

export class WhatsappAdapter implements BaseModule<unknown, Logger> {
  readonly id = "whatsapp";
  readonly config = config;
  private logger?: Logger;

  async initialize(context: { logger: Logger }): Promise<void> {
    this.logger = context.logger;
    this.logger.info("WhatsApp inicializado");
  }

  async healthcheck(): Promise<{ status: "healthy" | "unhealthy" }> {
    return { status: "healthy" };
  }
}
