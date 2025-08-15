import { Html, Head, Main, NextScript } from 'next/document';
import { tektur, jura } from '@/lib/fonts';

export default function Document() {
  return (
    <Html
      lang="az"
      className={`${jura.className} ${tektur.variable} ${jura.variable}`}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}