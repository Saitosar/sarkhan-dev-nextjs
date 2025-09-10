// components/Comments.js
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

export default function Comments() {
  const ref = useRef(null);
  const { resolvedTheme } = useTheme();
  
  // Динамически выбираем тему для Giscus в зависимости от темы вашего сайта
  const theme = resolvedTheme === 'dark' ? 'transparent_dark' : 'light';

  useEffect(() => {
    // Если элемент <section> пуст, добавляем скрипт
    if (!ref.current.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-loading', 'lazy'); // Добавили ленивую загрузку

      // ↓↓↓ ВАШИ УНИКАЛЬНЫЕ ДАННЫЕ УЖЕ ЗДЕСЬ ↓↓↓
      script.setAttribute('data-repo', 'saitosar/sarkhan-dev-nextjs');
      script.setAttribute('data-repo-id', 'R_kgDOPeMLsw'); // <-- Ваше значение
      script.setAttribute('data-category', 'Announcements');
      script.setAttribute('data-category-id', 'DIC_kwDOPeMLs84CvRC0'); // <-- Ваше значение
      // ↑↑↑ ВАШИ УНИКАЛЬНЫЕ ДАННЫЕ УЖЕ ЗДЕСЬ ↑↑↑
      
      script.setAttribute('data-mapping', 'title');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'top');
      script.setAttribute('data-lang', 'ru');
      script.setAttribute('data-theme', theme); // Используем динамическую тему

      ref.current.appendChild(script);
    }
  }, []); // Запускаем один раз при монтировании

  // Этот эффект будет МЕНЯТЬ тему Giscus, если пользователь переключает тему на сайте
  useEffect(() => {
    const iframe = ref.current.querySelector('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      );
    }
  }, [theme]);


  return <section ref={ref} id="comments" />;
}