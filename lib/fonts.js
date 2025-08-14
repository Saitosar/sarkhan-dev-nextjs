import { Exo_2, Chakra_Petch } from 'next/font/google';

export const exo2 = Exo_2({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const chakraPetch = Chakra_Petch({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});
