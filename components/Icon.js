// components/Icon.js
import React from 'react';

// Хранилище SVG-путей для всех иконок
const icons = {
  methodology: (
    <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
  ),
  // === НАЧАЛО ИЗМЕНЕНИЙ: НОВАЯ ИКОНКА ===
  blog: (
    <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  resources: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  about: (
    <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  contact: (
    <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
   tools: (
    <>
      <path d="M12 8V4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="4" y="12" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 12v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="16" r="1" fill="currentColor"/>
      <circle cx="16" cy="16" r="1" fill="currentColor"/>
    </>
  ),
  services: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // === КОНЕЦ ИЗМЕНЕНИЙ ===
  specialization: ( 
    <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  ),
  theme: (
    <>
      {/* Иконка Солнца для светлой темы */}
      <g className="sun" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <path className="moon" fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </>
  ),
  'ai-sparkle': (
    // Финальная версия: "Цифровая Сфера"
    <>
      <defs>
        <radialGradient id="sphere-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4dc3ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10142c" stopOpacity="0.3" />
        </radialGradient>
         <filter id="sphere-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.7" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#sphere-glow)">
        {/* Задний фон сферы */}
        <circle cx="12" cy="12" r="10" fill="url(#sphere-gradient)" />

        {/* Основная сетка */}
        <g stroke="#c1e9ff" strokeWidth="0.5" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <ellipse cx="12" cy="12" rx="10" ry="8" />
          <ellipse cx="12" cy="12" rx="4" ry="10" />
          <ellipse cx="12" cy="12" rx="6" ry="10" />
          <ellipse cx="12" cy="12" rx="8" ry="10" />
        </g>
        
        {/* Дополнительные хаотичные линии для техно-эффекта */}
        <g stroke="#ffffff" strokeWidth="0.3" strokeOpacity="0.7" fill="none">
            <path d="M 3 10 Q 8 6, 12 10 T 21 14" />
            <path d="M 21 10 Q 16 18, 12 14 T 3 10" />
        </g>

         {/* Внешний контур */}
        <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="0.2" fill="none" />
      </g>
    </>
  ),
  'expand': (
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
  ),
  'minimize': (
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h3a2 2 0 002-2v-3m0-10V3a2 2 0 00-2-2h-3M3 8v3a2 2 0 002 2h3m10 0h3a2 2 0 002-2V8" />
  )
};

const Icon = ({ name, className }) => {
  const SvgPath = icons[name];
  if (!SvgPath) {
    return null;
  }
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
    >
      {SvgPath}
    </svg>
  );
};

export default Icon;

