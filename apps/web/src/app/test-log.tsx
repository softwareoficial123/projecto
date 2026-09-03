'use client'; import { clientLogger } from '@/lib/client-logger'; export default function TestLog() { return <button onClick={() => clientLogger.info('TEST_LOG_MESSAGE')}>Send Test Log</button>; }
