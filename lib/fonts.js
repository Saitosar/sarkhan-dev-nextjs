// =====================================
// CORRECTED lib/fonts.js
// =====================================
import { Tektur, Jura } from 'next/font/google';

// The key improvement here is adding comprehensive fallback fonts
// that will display while the Google Fonts load, and serve as backups
// if the Google Fonts fail to load for any reason
export const tektur = Tektur({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-heading', // This creates the CSS custom property
  display: 'swap', // Important for performance - shows fallback first
  // Adding proper fallback fonts that match the character of Tektur
  fallback: [
    'ui-monospace', // Modern system monospace
    'SFMono-Regular', // macOS monospace
    'Consolas', // Windows monospace
    '"Liberation Mono"', // Linux monospace
    'Menlo', // Older macOS
    'Monaco', // Older macOS
    'monospace' // Generic fallback
  ],
});

export const jura = Jura({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-body', // This creates the CSS custom property
  display: 'swap',
  // Adding proper fallback fonts that match the character of Jura
  fallback: [
    'ui-sans-serif', // Modern system sans-serif
    'system-ui', // System UI font
    '-apple-system', // Apple system font
    'BlinkMacSystemFont', // Chrome on macOS
    '"Segoe UI"', // Windows
    'Roboto', // Android
    '"Helvetica Neue"', // macOS
    'Arial', // Universal fallback
    'sans-serif' // Generic fallback
  ],
});