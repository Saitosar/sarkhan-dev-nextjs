// pages/index.js (ФИНАЛЬНАЯ ВЕРСИЯ)

import Header from '@/components/Header';
import Head from 'next/head';
import BlogSection from '@/components/BlogSection';
import ResourcesSection from '@/components/Resources';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Footer from '@/components/Footer';
import { getProcessedPosts } from '@/lib/strapi'; // <-- 1. Импортируем нашу новую функцию

const Hero = ({ t }) => (
    <section id="home">
        <div className="container hero-content">
            <h1 className="hero-title">
                <span className="t-span-1">{t.heroTitlePart1}</span>
                <span className="t-span-2">{t.heroTitlePart2}</span>
                <span className="t-span-3">{t.heroTitlePart3}</span>
            </h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-cta-buttons">
                <a href="#resources" className="btn">{t.ctaPrimary}</a>
                <a href="#blog" className="btn btn-secondary">{t.ctaSecondary}</a>
            </div>
             <div className="hero-panels">
                <a href="#blog" className="panel">
                    <svg className="panel-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h3 className="panel-title">{t.panelBlog}</h3>
                </a>
                <a href="#resources" className="panel">
                    <svg className="panel-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h3 className="panel-title">{t.panelResources}</h3>
                </a>
                <a href="#about" className="panel">
                    <svg className="panel-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h3 className="panel-title">{t.panelAbout}</h3>
                </a>
                <a href="#contact" className="panel">
                    <svg className="panel-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h3 className="panel-title">{t.panelContact}</h3>
                </a>
            </div>
        </div>
    </section>
);

export default function HomePage({ articles, siteUrl }) { // `articles` - это теперь наши обработанные посты
    const router = useRouter();
    const { locale } = router;
    const [activeSection, setActiveSection] = useState('home');
    const t = translations[locale] || translations['az'];
    const scrollPosition = useRef(0);
    const isInitialLoad = useRef(true);

    const handleLanguageChange = (newLang) => {
        isInitialLoad.current = true;
        scrollPosition.current = window.scrollY;
        router.push(router.pathname, router.asPath, { locale: newLang, scroll: false });
    };

    useEffect(() => {
        if (scrollPosition.current > 0) {
            window.scrollTo({ top: scrollPosition.current, behavior: 'instant' });
        }
    }, [locale]);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const dir = window.scrollY > lastY ? 'scrolling-down' : 'scrolling-up';
            document.documentElement.classList.toggle('scrolling-down', dir === 'scrolling-down');
            document.documentElement.classList.toggle('scrolling-up', dir === 'scrolling-up');
            lastY = window.scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isInitialLoad.current) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.5 }
        );
        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));
        const timeoutId = setTimeout(() => { isInitialLoad.current = false; }, 500);
        return () => {
            window.removeEventListener('scroll', onScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, [locale]);

    return (
        <>
            <Head>
                <title>{t.docTitle}</title>
                <meta name="description" content={t.docDesc} />
                <link rel="icon" href="/leo-icon.svg" type="image/svg+xml" />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection={activeSection} pathname={router.pathname} />
            <main>
                <Hero t={t} />
                <BlogSection t={t} articles={articles} locale={locale} />
                <ResourcesSection t={t} lang={locale} />
                <AboutSection t={t} />
                <ContactSection t={t} />
            </main>
            <Footer />
        </>
    );
}

// 2. Радикально упрощенная getServerSideProps
export async function getServerSideProps(context) {
  const { locale } = context;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  // Просто вызываем нашу централизованную функцию
  const { posts } = await getProcessedPosts({ locale, pageSize: 3 });

  // Передаем посты в пропс `articles`, как и ожидает компонент HomePage
  return { props: { articles: posts, siteUrl } };
}