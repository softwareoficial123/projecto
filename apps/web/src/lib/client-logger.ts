// apps/web/src/lib/client-logger.ts

export const clientLogger = {
  log: (
    level: "info" | "warn" | "error",
    message: string,
    context?: Record<string, unknown>,
  ) => {
    // Send to backend API via Next.js proxy rewrite
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
        message,
        platform: "frontend",
        context,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("Failed to send log to server", err));
  },

  info: (msg: string, context?: Record<string, unknown>) => {
    clientLogger.log("info", msg, context);
    console.info(msg, context);
  },
  warn: (msg: string, context?: Record<string, unknown>) => {
    clientLogger.log("warn", msg, context);
    console.warn(msg, context);
  },
  error: (msg: string, context?: Record<string, unknown>) => {
    clientLogger.log("error", msg, context);
    console.error(msg, context);
  },
};

// Función para inicializar la captura global de logs del navegador
export const initConsoleCapture = () => {
  if (typeof window === "undefined") return;

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };

  console.log = (...args) => {
    originalConsole.log(...args);
    clientLogger.info("console.log", { args: JSON.stringify(args) });
  };

  console.warn = (...args) => {
    originalConsole.warn(...args);
    clientLogger.warn("console.warn", { args: JSON.stringify(args) });
  };

  console.error = (...args) => {
    originalConsole.error(...args);
    clientLogger.error("console.error", { args: JSON.stringify(args) });
  };

  window.addEventListener("error", (event) => {
    clientLogger.error("uncaught exception", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
};
