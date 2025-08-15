import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return <div role="alert" style={{ padding: 20, color: 'red' }}>
    <p>Something went wrong:</p><pre>{error?.message}</pre>
  </div>;
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider defaultTheme="system" attribute="data-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
