// utils/cookies.js (ОБНОВЛЕННАЯ ВЕРСИЯ)
import { setCookie } from 'nookies';

// Эта функция будет устанавливать cookie, который Next.js понимает по умолчанию
export const setLanguageCookie = (lang, ctx = null) => {
  setCookie(ctx, 'NEXT_LOCALE', lang, {
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    path: '/',
    sameSite: 'lax', // 'lax' лучше подходит для редиректов после логина
  });
};