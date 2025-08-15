import { Goldman, Chakra_Petch } from 'next/font/google';

export const goldman = Goldman({
  subsets: ['latin'],          // у Goldman нет кириллицы
  weight: ['400', '700'],
  variable: '--font-heading',  // делаем его основным для заголовков
  display: 'swap',
});

export const chakraPetch = Chakra_Petch({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});
