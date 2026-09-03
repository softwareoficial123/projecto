import pino, { Logger } from "pino";

const baseLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,
});

export const logger = baseLogger;

export function createScopedLogger(moduleId: string): Logger {
  return baseLogger.child({ module: moduleId });
}
