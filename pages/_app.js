import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { exo2, chakraPetch } from '@/lib/fonts';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div role="alert" style={{ padding: '20px', color: 'red' }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider defaultTheme="system" attribute="data-theme">
        <div className={`${exo2.variable} ${chakraPetch.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
