
// =====================================
// CORRECTED pages/_app.js
// =====================================
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';
import { tektur, jura } from '@/lib/fonts';

function ErrorFallback({ error }) {
  return (
    <div role="alert" style={{ padding: 20, color: 'red' }}>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider defaultTheme="system" attribute="data-theme">
        {/* Wrap the entire app with font variables to ensure they're available everywhere */}
        <div className={`${tektur.variable} ${jura.variable}`}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
