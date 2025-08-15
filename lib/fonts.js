import { Tektur, Jura } from 'next/font/google';
export const tektur = Tektur({ 
  subsets:['latin','latin-ext','cyrillic'],
  weight:['400','700'],
  variable:'--font-heading',
  display:'swap'
});
export const jura   = Jura   ({ 
  subsets:['latin','latin-ext','cyrillic'], 
  weight:['400','500','700'], 
  variable:'--font-body',    
  display:'swap' 
});
