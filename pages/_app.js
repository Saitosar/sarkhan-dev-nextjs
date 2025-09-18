import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';
import { Jura, Tektur } from 'next/font/google';
import AiAssistant from '@/components/AiAssistant';
import { translations } from '@/utils/translations';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from "next-auth/react"; // <-- 1. ИМПОРТИРУЕМ ПРОВАЙДЕР

const jura = Jura({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
});

const tektur = Tektur({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-heading',
});

function ErrorFallback({ error }) {
  return <div role="alert" style={{ padding: 20, color: 'red' }}>
    <p>Something went wrong:</p><pre>{error?.message}</pre>
  </div>;
}

// 2. ОБНОВЛЯЕМ КОМПОНЕНТ APP
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const { locale } = useRouter();
  const t = translations[locale] || translations['az'];
  return (
    <SessionProvider session={session}> {/* <-- 3. ОБЕРАЧИВАЕМ ВСЕ */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider defaultTheme="system" attribute="data-theme">
          <main className={`${jura.className} ${tektur.variable}`}>
            <Component {...pageProps} />
            <Analytics />
            <AiAssistant t={t} />
          </main>
        </ThemeProvider>
      </ErrorBoundary>
    </SessionProvider>
  );
}