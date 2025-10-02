// components/Header.js (ФИНАЛЬНАЯ ВЕРСИЯ С DICEBEAR)

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Icon from './Icon';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { setLanguageCookie } from '@/utils/cookies';

export default function Header({ t, lang, setLang, activeSection }) {
    const { data: session } = useSession();
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    const langSwitcherRef = useRef(null);
    const langGlobeBtnRef = useRef(null);
    const router = useRouter();
    const { locale } = router;
    const navMenuRef = useRef(null);
    
    // === НАЧАЛО ИЗМЕНЕНИЙ ===
    // Компонент для отображения либо кнопки входа, либо профиля с аватаром
    const UserProfile = () => {
        if (!session) {
            return (
                <button className="btn btn-auth" onClick={() => router.push(`/${locale}/auth/signin`)}>
                    {t.signInButton || "Войти"}
                </button>
            );
        }

        // Генерируем URL для аватара из DiceBear в стиле bottts-neutral
        const avatarUrl = `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${session.user.id}`;

        return (
            <Link href="/account" className="user-profile-link">
                <div className="avatar-placeholder-small">
                     {/* Вместо Icon, используем Image с URL от DiceBear */}
                     <Image 
                        src={avatarUrl} 
                        alt="User Avatar" 
                        width={36} 
                        height={36} 
                        style={{ borderRadius: '50%', background: 'var(--color-surface)' }} 
                     />
                </div>
            </Link>
        );
    };
    // === КОНЕЦ ИЗМЕНЕНИЙ ===


    const handleLanguageSelect = (newLang) => {
        setLanguageCookie(newLang);
        setLang(newLang);
        setLangMenuOpen(false);
    };

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
    }, [router.pathname]);

    // Эффекты для управления скроллом, меню и т.д.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!langMenuOpen) return;
            const focusableElements = langSwitcherRef.current?.querySelectorAll('button.lang-btn');
            if (!focusableElements || focusableElements.length === 0) return;
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (e.key === 'Escape') setLangMenuOpen(false);
            if (e.key === 'ArrowDown') { e.preventDefault(); const currentIndex = Array.from(focusableElements).indexOf(document.activeElement); (focusableElements[currentIndex + 1] || firstElement).focus(); }
            if (e.key === 'ArrowUp') { e.preventDefault(); const currentIndex = Array.from(focusableElements).indexOf(document.activeElement); (focusableElements[currentIndex - 1] || lastElement).focus(); }
        };
        document.addEventListener('keydown', handleKeyDown);
        if (langMenuOpen) langSwitcherRef.current?.querySelector('button.lang-btn.active')?.focus();
        else langGlobeBtnRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [langMenuOpen]);
    
    useEffect(() => {
        const id = requestAnimationFrame(updateUnderline);
        return () => cancelAnimationFrame(id);
    }, [activeSection, lang, mobileMenuOpen, router.pathname, updateUnderline]);
    
    useEffect(() => {
        const onResize = () => updateUnderline();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [updateUnderline]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
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
    
    // Улучшенная логика для навигационных ссылок
    const navLinks = [
        { href: "/", key: "home", text: t.navHome, isPage: true },
        { href: "/blog/page/1", key: "blog", text: t.navBlog, isPage: true },
        { href: "/resources", key: "resources", text: t.navResources, isPage: true },
        { href: "/tools", key: "tools", text: t.navTools, isPage: true },
        { href: "/#services", key: "services", text: t.navServices, isSection: true },
        { href: "/#about", key: "about", text: t.navAbout, isSection: true },
        { href: "/#contact", key: "contact", text: t.navContact, isSection: true },
    ];

    return (
        <>
            <style jsx global>{`
                .user-profile-link {
                    display: flex; align-items: center; gap: var(--space-md);
                    text-decoration: none; padding: var(--space-sm);
                    border-radius: var(--radius-md); transition: background-color 0.2s ease;
                    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;
                }
                .user-profile-link:hover { background-color: var(--color-surface); }
                .user-profile-link span { font-weight: 500; color: var(--color-text-primary); }
                .avatar-placeholder-small {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: var(--color-bg); border: 1px solid var(--color-border);
                    display: flex; align-items: center; justify-content: center;
                    color: var(--color-primary); flex-shrink: 0;
                }
                .avatar-placeholder-small :global(svg) { width: 20px; height: 20px; }
                .auth-controls-mobile .user-profile-link {
                    width: 100%; justify-content: center; padding: var(--space-md);
                    border: 1px solid var(--color-border);
                }
            `}</style>
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container navbar">
                    <Link href="/" legacyBehavior><a className="logo">
                        <Image src="/leo-icon.svg" alt="Логотип Sarkhan.dev" className="logo-svg" width={50} height={50} />
                        <span>Sarkhan.dev</span>
                    </a></Link>

                    <div className="nav-right-cluster">
                        <nav>
                            <ul id="nav-menu" ref={navMenuRef} className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
                                {navLinks.map(link => {
                                    const href = (router.pathname !== '/' && link.isSection) ? `/${link.href}` : link.href;
                                    return (
                                        <li key={link.key}>
                                            <Link href={href} legacyBehavior>
                                                <a className={`nav-link ${activeSection === link.key ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                                                    {link.text}
                                                </a>
                                            </Link>
                                        </li>
                                    );
                                })}
                                <li className="header-controls">
                                    <div className="lang-switcher-container" ref={langSwitcherRef}>
                                        <button ref={langGlobeBtnRef} className="lang-globe-btn" onClick={() => setLangMenuOpen(v => !v)} aria-label={t.langToggle}>
                                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                        </button>
                                        <div className={`lang-options ${langMenuOpen ? 'active' : ''}`}>
                                            <button className={`lang-btn ${lang === 'az' ? 'active' : ''}`} onClick={() => handleLanguageSelect('az')}>AZ</button>
                                            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => handleLanguageSelect('en')}>EN</button>
                                            <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => handleLanguageSelect('ru')}>RU</button>
                                        </div>
                                    </div>
                                    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="theme-toggle" aria-label={t.themeToggle}><Icon name="theme" /></button>
                                </li>
                                <li className="auth-controls-mobile"><UserProfile /></li>
                            </ul>
                        </nav>
                        <div className="auth-controls-desktop"><UserProfile /></div>
                        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-controls="nav-menu" aria-label="Меню">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}