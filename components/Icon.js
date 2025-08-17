// components/Icon.js
import React from 'react';

// Хранилище SVG-путей для всех иконок
const icons = {
  methodology: (
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
  ),
  specialization: ( // <-- НОВАЯ ИКОНКА
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  ),
  // Старую иконку standards можно удалить или оставить для будущего
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
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      {SvgPath}
    </svg>
  );
};

export default Icon;