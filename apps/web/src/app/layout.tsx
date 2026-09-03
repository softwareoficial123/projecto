import './globals.css';
import { ThemeProvider } from '@/components/core/ThemeProvider';
import { LogInterceptor } from '@/components/core/LogInterceptor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <LogInterceptor>
            {children}
          </LogInterceptor>
        </ThemeProvider>
      </body>
    </html>
  );
}
