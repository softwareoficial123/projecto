import { BaseIntegration } from "@repo/core";

export class WhatsappAdapter implements BaseIntegration {
  readonly id = "whatsapp";

  async initialize(): Promise<void> {
    // Inicializar cliente
  }

  async healthcheck(): Promise<{ status: "healthy" | "unhealthy" }> {
    return { status: "healthy" };
  }
}
