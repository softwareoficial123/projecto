export interface BaseIntegration {
  readonly id: string;
  healthcheck(): Promise<{
    status: "healthy" | "unhealthy";
    details?: unknown;
  }>;
  initialize(): Promise<void>;
}
