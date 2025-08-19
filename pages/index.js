
// pages/index.js - правильные импорты

import Header from '@/components/Header';
import BlogSection from '@/components/BlogSection';
import ResourcesSection from '@/components/Resources';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';
import FocusTrap from 'focus-trap-react';
import { getLanguageFromCookies, setLanguageCookie } from '@/utils/cookies';



// --- ДАННЫЕ И КОНФИГУРАЦИЯ ---
const translations = {
    az: {
        docTitle: "Sarkhan.dev | Analitik Düşüncə. Praktiki Alətlər.",
        docDesc: "IT Biznes Analitiklər üçün faydalı məqalələr, resurslar və alətlər toplusu.",
        navHome: "Əsas", navBlog: "Blog", navResources: "Resurslar", navAbout: "Haqqımda", navContact: "Əlaqə",
        heroTitlePart1: "Analitik düşüncə.", heroTitlePart2: "Praktiki alətlər.", heroTitlePart3: "Rəqəmsal gələcək.",
        heroSubtitle: "IT biznes analitiklər üçün faydalı",
        ctaPrimary: "Resurslara bax", ctaSecondary: "Bloga keç",
        panelBlog: "Blog", panelResources: "Resurslar", panelAbout: "Haqqımda", panelContact: "Əlaqə",
        blogSectionTitle: "Blog", readMore: "Daha çox oxu", closeButton: "Bağla",
        resourcesSectionTitle: "Faydalı Resurslar", viewButton: "Bax",
        res1Title: "BABOK Guide", res1Desc: "Biznes analiz biliklərinin əsas toplusu. Hər BA üçün masaüstü kitab.",
        aboutSectionTitle: "Haqqımda", aboutName: "Sərxan Hacıyev",
        aboutShortBio: "10 ildən artıq bank sistemləri sahəsində təcrübəyə malik IT Biznes Analitik.",
        aboutLongBio: "Mən, 10 ildən artıq korporativ bank sistemləri sahəsində təcrübəsi olan çoxşaxəli IT Biznes Analitiki Sərxan Hacıyev. Karyeram boyunca Flexcube və kart prosessinq platformalarında kritik funksionallıqların çatdırılmasında, eləcə də Azərbaycanın ən böyük bankı üçün sıfırdan daxili əsas bank sistemi olan Zeus-un layihələndirilməsində aparıcı rol oynamışam.",
        skillsTitle: "Əsas Bacarıqlar",
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "API design & integration", "SQL (Oracle)", "Jira/Confluence", "BRD/SRS", "Process Mapping (BPMN/UML)", "UAT planning", "Stakeholder management"],
        careerMapTitle: "Karyera Xəritəsi",
        career1Title: "Senior IT BA - Core Banking & Integrations", career1Date: "2025 - Hazırda", career1Desc: "Zeus, Processing, CRM, BPM və xarici sistemlər arasında API-əsaslı kommunikasiya üçün inteqrasiya sahibi.",
        career2Title: "Process Owner - Agile PDLC Optimization", career2Date: "2023-2025", career2Desc: "80+ komanda üzrə PDLC və Agile idarəetməsinin yenidən dizaynına rəhbərlik.",
        contactSectionTitle: "Əlaqə", formNamePlaceholder: "Adınız", formEmailPlaceholder: "E-mail ünvanınız", formMessagePlaceholder: "Mesajınız...", formSubmitButton: "Göndər",
        formSubmitting: "Göndərilir...",
        themeToggle: "Temanı dəyişdir",
        langToggle: "Dili dəyişdir",
        validation: {
            nameRequired: "Ad tələb olunur",
            emailRequired: "E-mail tələb olunur",
            emailInvalid: "Yanlış e-mail formatı",
            messageRequired: "Mesaj tələb olunur",
            messageMin: "Mesaj ən azı 10 simvol olmalıdır",
        }
    },
    en: {
        docTitle: "Sarkhan.dev | Analytical Thinking. Practical Tools.",
        docDesc: "A collection of useful articles, resources, and tools for IT Business Analysts.",
        navHome: "Home", navBlog: "Blog", navResources: "Resources", navAbout: "About", navContact: "Contact",
        heroTitlePart1: "Analytical thinking.", heroTitlePart2: "Practical tools.", heroTitlePart3: "Digital future.",
        heroSubtitle: "Useful for IT business analysts",
        ctaPrimary: "View resources", ctaSecondary: "Go to blog",
        panelBlog: "Blog", panelResources: "Resources", panelAbout: "About", panelContact: "Contact",
        blogSectionTitle: "Blog", readMore: "Read more", closeButton: "Close",
        resourcesSectionTitle: "Useful Resources", viewButton: "View",
        res1Title: "BABOK Guide", res1Desc: "The core body of knowledge for business analysis. A desktop book for every BA.",
        aboutSectionTitle: "About", aboutName: "Sarkhan Hajiyev",
        aboutShortBio: "IT Business Analyst with over 10 years of experience in banking systems.",
        aboutLongBio: "I am Sarkhan Hajiyev, a versatile IT Business Analyst with over 10 years of experience in corporate banking systems. Throughout my career, I have played a key role in delivering critical functionalities on Flexcube and card processing platforms, as well as leading the design of the Zeus in-house core banking system from scratch for Azerbaijan's largest bank.",
        skillsTitle: "Core Skills",
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "API design & integration", "SQL (Oracle)", "Jira/Confluence", "BRD/SRS", "Process Mapping (BPMN/UML)", "UAT planning", "Stakeholder management"],
        careerMapTitle: "Career Map",
        career1Title: "Senior IT BA - Core Banking & Integrations", career1Date: "2025 - Present", career1Desc: "Owner of API-based communication between Zeus, Processing, CRM, BPM, and external systems.",
        career2Title: "Process Owner - Agile PDLC Optimization", career2Date: "2023-2025", career2Desc: "Led the redesign of PDLC and Agile management across 80+ teams.",
        contactSectionTitle: "Contact", formNamePlaceholder: "Your name", formEmailPlaceholder: "Your email", formMessagePlaceholder: "Your message...", formSubmitButton: "Send",
        formSubmitting: "Sending...",
        themeToggle: "Toggle theme",
        langToggle: "Change language",
        validation: {
            nameRequired: "Name is required",
            emailRequired: "Email is required",
            emailInvalid: "Invalid email format",
            messageRequired: "Message is required",
            messageMin: "Message must be at least 10 characters long",
        }
    },
    ru: {
        docTitle: "Sarkhan.dev | Аналитическое мышление. Практичные инструменты.",
        docDesc: "Полезные статьи, ресурсы и инструменты для IT бизнес-аналитиков.",
        navHome: "Главная", navBlog: "Блог", navResources: "Ресурсы", navAbout: "Обо мне", navContact: "Связь",
        heroTitlePart1: "Аналитическое мышление.", heroTitlePart2: "Практичные инструменты.", heroTitlePart3: "Цифровое будущее.",
        heroSubtitle: "Полезно для IT бизнес-аналитиков",
        ctaPrimary: "К ресурсам", ctaSecondary: "В блог",
        panelBlog: "Блог", panelResources: "Ресурсы", panelAbout: "Обо мне", panelContact: "Связь",
        blogSectionTitle: "Блог", readMore: "Читать далее", closeButton: "Закрыть",
        resourcesSectionTitle: "Полезные ресурсы", viewButton: "Открыть",
        res1Title: "BABOK Guide", res1Desc: "Основное собрание знаний по бизнес-анализу. Настольная книга каждого BA.",
        aboutSectionTitle: "Обо мне", aboutName: "Сархан Гаджиев",
        aboutShortBio: "IT бизнес-аналитик с более чем 10-летним опытом работы в банковских системах.",
        aboutLongBio: "Я, Серхан Гаджиев, универсальный IT бизнес-аналитик с более чем 10-летним опытом работы в корпоративных банковских системах. За время карьеры принимал ключевую роль в реализации критически важных функций на платформах Flexcube и карт-процессинге, а также возглавлял проектирование внутренней банковской системы Zeus с нуля для крупнейшего банка Азербайджана.",
        skillsTitle: "Ключевые навыки",
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "Проектирование и интеграция API", "SQL (Oracle)", "Jira/Confluence", "BRD/SRS", "Моделирование процессов (BPMN/UML)", "Планирование UAT", "Управление стейкхолдерами"],
        careerMapTitle: "Карта карьеры",
        career1Title: "Senior IT BA - Core Banking & Integrations", career1Date: "2025 - Настоящее время", career1Desc: "Владелец API-взаимодействия между Zeus, Processing, CRM, BPM и внешними системами.",
        career2Title: "Process Owner - Agile PDLC Optimization", career2Date: "2023-2025", career2Desc: "Руководил редизайном PDLC и Agile-управления в 80+ командах.",
        contactSectionTitle: "Связь", formNamePlaceholder: "Ваше имя", formEmailPlaceholder: "Ваш email", formMessagePlaceholder: "Ваше сообщение...", formSubmitButton: "Отправить",
        formSubmitting: "Отправка...",
        themeToggle: "Сменить тему",
        langToggle: "Сменить язык",
        validation: {
            nameRequired: "Имя обязательно",
            emailRequired: "Email обязателен",
            emailInvalid: "Неверный формат email",
            messageRequired: "Сообщение обязательно",
            messageMin: "Сообщение должно содержать не менее 10 символов",
        }
    }
};


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


const Footer = () => (
    <footer>
        <div className="container">
            <p>&copy; {new Date().getFullYear()} Sarkhan.dev | V 1.33</p>
        </div>
    </footer>
);

// --- ГЛАВНАЯ СТРАНИЦА ---

export default function HomePage({ articles, initialLang, siteUrl }) {
    const [lang, setLang] = useState(initialLang);
    useEffect(() => {
      const saved = getLanguageFromCookies();
      if (saved && saved !== lang) setLang(saved);
    }, [lang]);
    const [activeSection, setActiveSection] = useState('home');
    const t = translations[lang] || translations['az'];

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
        setLanguageCookie(newLang);
    };

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        // 1. Следим за направлением скролла
        let lastY = window.scrollY;
        const onScroll = () => {
            const dir = window.scrollY > lastY ? 'scrolling-down' : 'scrolling-up';
            document.documentElement.classList.toggle('scrolling-down', dir === 'scrolling-down');
            document.documentElement.classList.toggle('scrolling-up', dir === 'scrolling-up');
            lastY = window.scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // 2. Следим за секциями для активного меню
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.5 }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        // Очистка при размонтировании
        return () => {
            window.removeEventListener('scroll', onScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': siteUrl,
        'name': t.docTitle,
        'description': t.docDesc,
    };

    return (
        <>
            <Head>
                <title>{t.docTitle}</title>
                <meta name="description" content={t.docDesc} />
                <link rel="canonical" href={siteUrl} />
                <link rel="alternate" hrefLang="x-default" href={siteUrl} />
                {Object.keys(translations).map(langCode => (
                    <link key={langCode} rel="alternate" hrefLang={langCode} href={`${siteUrl}?lang=${langCode}`} />
                ))}
                <meta property="og:title" content={t.docTitle} />
                <meta property="og:description" content={t.docDesc} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t.docTitle} />
                <meta name="twitter:description" content={t.docDesc} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>

            <div id="background-animation"></div>

            <Header t={t} lang={lang} setLang={handleLanguageChange} activeSection={activeSection} />

            <main>
                <Hero t={t} />
                <BlogSection t={t} articles={articles} />
                <ResourcesSection t={t} lang={lang} />
                <AboutSection t={t} />
                <ContactSection t={t} />
            </main>

            <Footer />
        </>
    );
}

// --- ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ---
    export async function getServerSideProps(context) {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL; // ВАЖНО: именно эта переменная
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // читаем язык из cookies через nookies-обёртку
      const initialLang = getLanguageFromCookies(context) || 'az';

try {
    const res = await fetch(`${strapiUrl}/api/posts?populate=cover&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    const response = await res.json();

    const markdownConverter = new showdown.Converter();
    const articles = (response.data || []).map((post) => {
      // Strapi v5 — поля ПЛОСКИЕ (нет post.attributes)
      if (post.content) {
        const rawHtml = markdownConverter.makeHtml(post.content);
        post.sanitizedBody = DOMPurify.sanitize(rawHtml);
      }
      return post;
    });

    return { props: { articles, initialLang, siteUrl } };
  } catch (error) {
    console.error("Failed to fetch articles from Strapi:", error);
    return { props: { articles: [], initialLang, siteUrl } };
  }
}