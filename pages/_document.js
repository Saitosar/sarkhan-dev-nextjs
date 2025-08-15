// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document'

// ВАЖНО: Удалите ручные <link> для Google Fonts отсюда.
// Next.js/font позаботится об этом автоматически и более эффективно.

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
