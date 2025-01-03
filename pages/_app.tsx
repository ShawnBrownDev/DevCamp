import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { useProfileSync } from '@/lib/auth/hooks/useProfileSync';
import { useAuthProvider } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps) {
  const { user } = useAuthProvider();
  useProfileSync(user);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;