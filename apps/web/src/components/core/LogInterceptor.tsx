'use client';
import { useEffect } from 'react';
import { clientLogger } from '@/lib/client-logger';

export function LogInterceptor({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {
      clientLogger.info(args.join(' '));
      originalLog(...args);
    };
    
    console.warn = (...args) => {
      clientLogger.warn(args.join(' '));
      originalWarn(...args);
    };

    console.error = (...args) => {
      clientLogger.error(args.join(' '));
      originalError(...args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);

  return <>{children}</>;
}
