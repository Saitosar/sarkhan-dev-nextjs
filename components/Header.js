// components/Header.js
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function Header({ t, lang, setLang, activeSection }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  // --- НАЧАЛО ИЗМЕНЕНИЙ ---
  const langSwitcherRef = useRef(null); // Ref для всего контейнера меню
  const langGlobeBtnRef = useRef(null); // Ref для кнопки-глобуса

  // Новый хук для управления клавиатурой
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!langMenuOpen) return;

      const focusableElements = langSwitcherRef.current?.querySelectorAll('button.lang-btn');
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Escape') {
        setLangMenuOpen(false);
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        const nextElement = focusableElements[currentIndex + 1] || firstElement;
        nextElement.focus();
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        const prevElement = focusableElements[currentIndex - 1] || lastElement;
        prevElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Управление фокусом при открытии/закрытии
    if (langMenuOpen) {
      // При открытии фокус переходит на активный язык
      const activeLangButton = langSwitcherRef.current?.querySelector('button.lang-btn.active');
      activeLangButton?.focus();
    } else {
      // При закрытии фокус возвращается на кнопку-глобус
      langGlobeBtnRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langMenuOpen]); // Зависимость от состояния меню
  // --- КОНЕЦ ИЗМЕНЕНИЙ ---
  
  // <<< Остальной код компонента остается без изменений >>>

  const navMenuRef = useRef(null);
  const updateUnderline = () => {
    const el = navMenuRef.current;
    if (!el) return;
    const active = el.querySelector('.nav-link.active');
    if (!active) return;
    const parentRect = el.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    el.style.setProperty('--underline-left', `${rect.left - parentRect.left}px`);
    el.style.setProperty('--underline-width', `${rect.width}px`);
  };
  useEffect(() => {
    const id = requestAnimationFrame(updateUnderline);
    return () => cancelAnimationFrame(id);
  }, [activeSection, lang, mobileMenuOpen]);
  useEffect(() => {
    const onResize = () => updateUnderline();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileMenuOpen);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langSwitcherRef.current && !langSwitcherRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langSwitcherRef]);

  const navLinks = [
    { href: "#home", key: "navHome", text: t.navHome },
    { href: "#blog", key: "navBlog", text: t.navBlog },
    { href: "#resources", key: "navResources", text: t.navResources },
    { href: "#about", key: "navAbout", text: t.navAbout },
    { href: "#contact", key: "navContact", text: t.navContact },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar">
        <a href="#home" className="logo">
          {/* ... SVG логотипа ... */}
          <span>Sarkhan.dev</span>
        </a>

        <div className="nav-right-cluster">
          <nav>
            <ul
              id="nav-menu"
              ref={navMenuRef}
              className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}
            >
              {/* ... navLinks.map ... */}
            </ul>
          </nav>

          <div className="lang-switcher-container" ref={langSwitcherRef}>
            {/* --- ИЗМЕНЕНИЕ: Добавили ref на кнопку --- */}
            <button ref={langGlobeBtnRef} className="lang-globe-btn" onClick={() => setLangMenuOpen(v => !v)} aria-label={t.langToggle}>
              {/* ... SVG глобуса ... */}
            </button>
            <div className={`lang-options ${langMenuOpen ? 'active' : ''}`}>
              <button className={`lang-btn ${lang === 'az' ? 'active' : ''}`} onClick={() => { setLang('az'); setLangMenuOpen(false); }}>AZ</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => { setLang('en'); setLangMenuOpen(false); }}>EN</button>
              <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => { setLang('ru'); setLangMenuOpen(false); }}>RU</button>
            </div>
          </div>

          <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="theme-toggle" aria-label={t.themeToggle}>🌓</button>
         
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-controls="nav-menu" aria-label={t.navToggle}>
            {/* ... SVG мобильного меню ... */}
          </button>
        </div>
      </div>
    </header>
  );
}