import { Html, Head, Main, NextScript } from 'next/document';
import { tektur, jura } from '@/lib/fonts';

export default function Document() {
  return (
    <Html
      lang="az"
      className={`${tektur.variable} ${jura.variable}`}
    >
      <Head>
        {/* 
          Только preconnect для улучшения производительности.
          Next.js автоматически управляет загрузкой шрифтов,
          поэтому ручные preload ссылки создают конфликт.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        {/* 
          УБРАНО: preload ссылки, которые вызывали предупреждения
          Next.js сам оптимально загружает шрифты
        */}
      </Head>
      <body className={jura.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}