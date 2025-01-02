import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SupabaseProvider } from '@/lib/supabase/provider';
import { AuthProvider } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseProvider>
        <AuthProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      </SupabaseProvider>
    </ThemeProvider>
  );
}