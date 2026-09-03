// apps/web/src/lib/client-logger.ts

export const clientLogger = {
  log: (level: 'info' | 'warn' | 'error', message: string, context?: Record<string, unknown>) => {
    // Send to backend API via Next.js proxy rewrite
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level,
        message,
        platform: 'frontend',
        context,
      }),
    }).catch(err => console.error('Failed to send log to server', err));
  },
  
  info: (msg: string, context?: Record<string, unknown>) => {
    clientLogger.log('info', msg, context);
    console.info(msg, context);
  },
  warn: (msg: string, context?: Record<string, unknown>) => {
    clientLogger.log('warn', msg, context);
    console.warn(msg, context);
  },
  error: (msg: string, context?: Record<string, unknown>) => {
    clientLogger.log('error', msg, context);
    console.error(msg, context);
  }
};
