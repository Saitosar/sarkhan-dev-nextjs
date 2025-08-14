import { parseCookies, setCookie } from 'nookies';

export const getLanguageFromCookies = (ctx = null) => {
  const cookies = parseCookies(ctx);
  return cookies.language || 'az'; // 'az' as default
};

export const setLanguageCookie = (lang) => {
  setCookie(null, 'language', lang, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
    sameSite: 'strict',
  });
};
