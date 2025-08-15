import { parseCookies, setCookie } from 'nookies';

export const getLanguageFromCookies = (ctx = null) => {
  const cookies = parseCookies(ctx);
  return cookies.lang || 'az'; // 'az' по умолчанию
};

export const setLanguageCookie = (lang) => {
  setCookie(null, 'lang', lang, {
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    path: '/',
    sameSite: 'strict',
  });
};