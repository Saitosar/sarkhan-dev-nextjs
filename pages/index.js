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
import Link from 'next/link';
import Icon from '@/components/Icon';
import ServicesSection from '@/components/ServicesSection';
import ToolsSection from '@/components/ToolsSection';

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
    <a href="#tools" className="btn btn-primary-cta">
        Попробовать ITB<span className="cta-highlight">AI</span>
    </a>
    <a href="#services" className="btn btn-secondary">{t.ctaSecondary}</a>
</div>
             <div className="hero-panels">
    <a href="#blog" className="panel">
        <Icon name="blog" className="panel-icon" />
        <h3 className="panel-title">{t.panelBlog}</h3>
    </a>
    <Link href="/resources" legacyBehavior>
        <a className="panel">
            <Icon name="resources" className="panel-icon" />
            <h3 className="panel-title">{t.panelResources}</h3>
        </a>
    </Link>
    <a href="#tools" className="panel">
        <Icon name="tools" className="panel-icon" />
        <h3 className="panel-title">{t.navTools}</h3>
    </a>
    <a href="#services" className="panel">
        <Icon name="services" className="panel-icon" />
        <h3 className="panel-title">{t.navServices}</h3>
    </a>
</div>
            </div>
    </section>
);

export default function HomePage({ siteUrl }) { 
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
                <BlogSection t={t} />
                <ResourcesSection t={t} lang={locale} />
                <ToolsSection t={t} /> {/* <-- ДОБАВЛЕНО */}
                <ServicesSection t={t} /> {/* <-- ДОБАВЛЕНО */}
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


  // Передаем посты в пропс `articles`, как и ожидает компонент HomePage
  return { props: { siteUrl } };
}