// apps/web/src/lib/client-logger.ts

export const clientLogger = {
  log: (level: 'info' | 'warn' | 'error', message: string, context?: any) => {
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
  
  info: (msg: string, context?: any) => {
    clientLogger.log('info', msg, context);
    console.info(msg, context);
  },
  warn: (msg: string, context?: any) => {
    clientLogger.log('warn', msg, context);
    console.warn(msg, context);
  },
  error: (msg: string, context?: any) => {
    clientLogger.log('error', msg, context);
    console.error(msg, context);
  }
};
