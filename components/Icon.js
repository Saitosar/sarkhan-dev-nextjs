// components/Icon.js
import React from 'react';

// Хранилище SVG-путей для всех иконок
const icons = {
  methodology: (
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
  ),
  specialization: ( 
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  ),
  // --- ИСПРАВЛЕННЫЙ КОД ИКОНКИ ТЕМЫ ---
  theme: (
    <>
      {/* Иконка Солнца для светлой темы */}
      <g className="sun">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </g>
      {/* Иконка Луны для темной темы */}
      <path className="moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </>
  ),
  'ai-sparkle': (
    <path d="M12 3L14.5 9L21 11.5L14.5 14L12 20L9.5 14L3 11.5L9.5 9L12 3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  )
};

const Icon = ({ name, className }) => {
  const SvgPath = icons[name];
  if (!SvgPath) {
    return null; // Если иконка не найдена, ничего не показываем
  }

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" /* <-- Убедитесь, что здесь 'none' */
      stroke="currentColor" /* <-- А здесь 'currentColor' */
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      {SvgPath}
    </svg>
  );
};

export default Icon;