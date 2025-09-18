// components/Header.js (ИСПРАВЛЕННАЯ ВЕРСИЯ)
import { useEffect, useRef, useState, useCallback } from 'react'; // 1. Добавлен useCallback
import { useTheme } from 'next-themes';
import Icon from './Icon';
import Image from 'next/image'; // 2. Импортирован Image
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";


export default function Header({ t, lang, setLang, activeSection }) {
  const { data: session } = useSession();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langSwitcherRef = useRef(null);
  const langGlobeBtnRef = useRef(null);
  const router = useRouter(); 
  const navMenuRef = useRef(null);

  // 3. Оборачиваем updateUnderline в useCallback
  const updateUnderline = useCallback(() => {
    if (router.pathname !== '/') return; 
    const el = navMenuRef.current;
    if (!el) return;
    const active = el.querySelector('.nav-link.active');
    if (!active) {
        el.style.setProperty('--underline-width', `0px`);
        return;
    };
    const parentRect = el.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    el.style.setProperty('--underline-left', `${rect.left - parentRect.left}px`);
    el.style.setProperty('--underline-width', `${rect.width}px`);
  }, [router.pathname]); // Зависимость - путь

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
    if (langMenuOpen) {
      const activeLangButton = langSwitcherRef.current?.querySelector('button.lang-btn.active');
      activeLangButton?.focus();
    } else {
      langGlobeBtnRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langMenuOpen]);

  
  useEffect(() => {
    const id = requestAnimationFrame(updateUnderline);
    return () => cancelAnimationFrame(id);
    // 4. Добавляем updateUnderline в зависимости
  }, [activeSection, lang, mobileMenuOpen, router.pathname, updateUnderline]); 
  
  useEffect(() => {
    const onResize = () => updateUnderline();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // 5. И здесь тоже
  }, [updateUnderline]);

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
    { href: "#tools", key: "navTools", text: t.navTools }, // <-- ДОБАВЛЕНО
    { href: "#services", key: "navServices", text: t.navServices }, // <-- ДОБАВЛЕНО
    { href: "#about", key: "navAbout", text: t.navAbout },
    { href: "#contact", key: "navContact", text: t.navContact },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar">
        <Link href="/" legacyBehavior>
            <a className="logo">
                {/* 6. Заменяем img на Image */}
                <Image src="/leo-icon.svg" alt="Логотип Sarkhan.dev" className="logo-svg" width={50} height={50} />
                <span>Sarkhan.dev</span>
            </a>
        </Link>

        <div className="nav-right-cluster">
          <nav>
            <ul
              id="nav-menu"
              ref={navMenuRef}
              className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}
            >
              {navLinks.map(link => (
                <li key={link.key}>
                  <Link href={router.pathname === '/' ? link.href : `/${link.href}`} legacyBehavior>
                    <a
                      className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.text}
                    </a>
                  </Link>
                </li>
              ))}
              <li className="header-controls">
                <div className="lang-switcher-container" ref={langSwitcherRef}>
                  <button ref={langGlobeBtnRef} className="lang-globe-btn" onClick={() => setLangMenuOpen(v => !v)} aria-label={t.langToggle}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </button>
                  <div className={`lang-options ${langMenuOpen ? 'active' : ''}`}>
                    <button className={`lang-btn ${lang === 'az' ? 'active' : ''}`} onClick={() => { setLang('az'); setLangMenuOpen(false); }}>AZ</button>
                    <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => { setLang('en'); setLangMenuOpen(false); }}>EN</button>
                    <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => { setLang('ru'); setLangMenuOpen(false); }}>RU</button>
                  </div>
                </div>
                <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="theme-toggle" aria-label={t.themeToggle}><Icon name="theme" /></button>
              </li>
            </ul>
          </nav>
          <div className="auth-controls" style={{ marginLeft: '1rem' }}>
            {session ? (
                <button className="btn btn-secondary" onClick={() => signOut()}>
                    {t.signOutButton || "Sign Out"}
                </button>
            ) : (
                <button className="btn" onClick={() => signIn()}>
                    {t.signInButton || "Sign In"}
                </button>
            )}
          </div>
          
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-controls="nav-menu" aria-label={t.navToggle}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}