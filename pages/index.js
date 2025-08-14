import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';
import { useTheme } from 'next-themes';
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
        aboutSectionTitle: "Haqqımda", aboutName: "Sərxan",
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
    // ... English and Russian translations
};

// --- КОМПОНЕНТЫ ---

const Header = ({ t, lang, setLang, activeSection }) => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langSwitcherRef = useRef(null);

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
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                    <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Sarkhan.dev</span>
                </a>
                <div className="nav-right-cluster">
                    <nav>
                        <ul id="nav-menu" className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
                            {navLinks.map(link => (
                                <li key={link.key}>
                                    <a 
                                        href={link.href} 
                                        className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="lang-switcher-container" ref={langSwitcherRef}>
                        <button className="lang-globe-btn" onClick={() => setLangMenuOpen(v => !v)} aria-label={t.langToggle}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        </button>
                        <div className={`lang-options ${langMenuOpen ? 'active' : ''}`}>
                            <button className={`lang-btn ${lang === 'az' ? 'active' : ''}`} onClick={() => { setLang('az'); setLangMenuOpen(false); }}>AZ</button>
                            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => { setLang('en'); setLangMenuOpen(false); }}>EN</button>
                            <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => { setLang('ru'); setLangMenuOpen(false); }}>RU</button>
                        </div>
                    </div>
                    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="theme-toggle" aria-label={t.themeToggle}>🌓</button>
                    <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-controls="nav-menu">☰</button>
                </div>
            </div>
        </header>
    );
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

const BlogSection = ({ t, articles }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const triggerRef = useRef(null);
    const markdownConverter = useMemo(() => new showdown.Converter(), []);

    const openModal = (article, e) => {
        triggerRef.current = e.currentTarget;
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
        triggerRef.current?.focus();
    };

    return (
        <>
            <section id="blog">
                <div className="container">
                    <h2>{t.blogSectionTitle}</h2>
                    <div className="blog-grid">
                        {Array.isArray(articles) && articles.map(article => (
                            article && article.attributes ? (
                                <div key={article.id} className="blog-card" onClick={(e) => openModal(article, e)} tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && openModal(article, e)}>
                                    <h3>{article.attributes.title}</h3>
                                    <p>{article.attributes.description}</p>
                                    <span className="btn">{t.readMore}</span>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            </section>

            {selectedArticle && (
                <FocusTrap active={!!selectedArticle} focusTrapOptions={{ onDeactivate: closeModal, initialFocus: false }}>
                    <div className="modal-overlay active" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                            <h3 id="modal-title">{selectedArticle.attributes.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: selectedArticle.attributes.sanitizedBody }} />
                            <br />
                            <button className="btn" onClick={closeModal}>{t.closeButton}</button>
                        </div>
                    </div>
                </FocusTrap>
            )}
        </>
    );
};

const ResourcesSection = ({ t }) => (
    <section id="resources">
        <div className="container">
            <h2>{t.resourcesSectionTitle}</h2>
            <div className="resources-grid">
                 <div className="resource-card">
                    <h3>{t.res1Title}</h3>
                    <p>{t.res1Desc}</p>
                    <a href="#" className="btn">{t.viewButton}</a>
                </div>
            </div>
        </div>
    </section>
);

const AboutSection = ({ t }) => {
    const [isAboutModalOpen, setAboutModalOpen] = useState(false);
    const triggerRef = useRef(null);

    const openModal = (e) => {
        triggerRef.current = e.currentTarget;
        setAboutModalOpen(true);
    };

    const closeModal = () => {
        setAboutModalOpen(false);
        triggerRef.current?.focus();
    };

    return (
     <>
        <section id="about">
            <div className="container">
                <h2>{t.aboutSectionTitle}</h2>
                <div className="about-content">
                    <div className="about-card" onClick={openModal}>
                         <Image src="https://placehold.co/400x500/010413/4dc3ff?text=Sarkhan" alt="Sarkhan" width={400} height={500} loading="lazy" />
                    </div>
                    <div className="about-text">
                        <h3>{t.aboutName}</h3>
                        <p>{t.aboutShortBio}</p>
                        <button className="btn" onClick={openModal}>{t.readMore}</button>
                    </div>
                </div>
            </div>
        </section>

        {isAboutModalOpen && (
            <FocusTrap active={isAboutModalOpen} focusTrapOptions={{ onDeactivate: closeModal, initialFocus: false }}>
                <div className="fullscreen-overlay active" onClick={closeModal}>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                        <h3>{t.aboutName}</h3>
                        <p>{t.aboutLongBio}</p>

                        <div className="skills-section">
                            <h4>{t.skillsTitle}</h4>
                            <ul className="skills-list">
                                {t.skillsList.map(skill => <li key={skill}>{skill}</li>)}
                            </ul>
                        </div>

                        <div className="career-map">
                            <h4>{t.careerMapTitle}</h4>
                            <div className="timeline">
                                <div className="timeline-item right">
                                    <div className="timeline-content">
                                        <h5>{t.career1Title}</h5>
                                        <p className="date">{t.career1Date}</p>
                                        <p>{t.career1Desc}</p>
                                    </div>
                                </div>
                                <div className="timeline-item left">
                                    <div className="timeline-content">
                                        <h5>{t.career2Title}</h5>
                                        <p className="date">{t.career2Date}</p>
                                        <p>{t.career2Desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FocusTrap>
        )}
     </>
    );
};

const ContactSection = ({ t }) => {
    const formSchema = z.object({
        name: z.string().min(1, { message: t.validation.nameRequired }),
        email: z.string().email({ message: t.validation.emailInvalid }).min(1, { message: t.validation.emailRequired }),
        message: z.string().min(10, { message: t.validation.messageMin }),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data) => {
        console.log("Form submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Thank you for your message!");
        reset();
    };

    return (
        <section id="contact">
            <div className="container">
                <h2>{t.contactSectionTitle}</h2>
                <div className="contact-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-group">
                            <label htmlFor="name-input">{t.formNamePlaceholder}</label>
                            <input id="name-input" {...register("name")} type="text" placeholder={t.formNamePlaceholder} />
                            {errors.name && <p className="form-error">{errors.name.message}</p>}
                        </div>
                        <div className="form-group">
                             <label htmlFor="email-input">{t.formEmailPlaceholder}</label>
                            <input id="email-input" {...register("email")} type="email" placeholder={t.formEmailPlaceholder} />
                            {errors.email && <p className="form-error">{errors.email.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-input">{t.formMessagePlaceholder}</label>
                            <textarea id="message-input" {...register("message")} placeholder={t.formMessagePlaceholder}></textarea>
                            {errors.message && <p className="form-error">{errors.message.message}</p>}
                        </div>
                        <div className="form-footer">
                            <button type="submit" className="btn" disabled={isSubmitting}>{isSubmitting ? t.formSubmitting : t.formSubmitButton}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

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
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
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
                <ResourcesSection t={t} />
                <AboutSection t={t} />
                <ContactSection t={t} />
            </main>

            <Footer />
        </>
    );
}

// --- ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ---

export async function getServerSideProps(context) {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const initialLang = getLanguageFromCookies(context);

    try {
        const res = await fetch(`${strapiUrl}/api/articles?populate=*`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const response = await res.json();

        const markdownConverter = new showdown.Converter();

        const articles = (response.data || []).map(article => {
            if (article.attributes && article.attributes.body) {
                const rawHtml = markdownConverter.makeHtml(article.attributes.body);
                article.attributes.sanitizedBody = DOMPurify.sanitize(rawHtml);
            }
            return article;
        });

        return {
            props: {
                articles,
                initialLang,
                siteUrl,
            },
        };
    } catch (error) {
        console.error("Failed to fetch articles from Strapi:", error);
        return { 
            props: { 
                articles: [],
                initialLang,
                siteUrl,
            } 
        };
    }
}