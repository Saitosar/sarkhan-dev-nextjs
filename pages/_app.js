import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';
import { Jura, Tektur } from 'next/font/google';

// body: Jura по умолчанию
const jura = Jura({
  subsets: ['latin', 'latin-ext', 'cyrillic'], // без weight
});

// headings: Tektur через CSS-переменную
const tektur = Tektur({
  subsets: ['latin', 'latin-ext', 'cyrillic'], // без weight
  variable: '--font-heading',
});

function ErrorFallback({ error }) {
  return <div role="alert" style={{ padding: 20, color: 'red' }}>
    <p>Something went wrong:</p><pre>{error?.message}</pre>
  </div>;
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider defaultTheme="system" attribute="data-theme">
        {/* Jura применяем классом, Tektur — переменной */}
        <main className={`${jura.className} ${tektur.variable}`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
