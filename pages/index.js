
// pages/index.js - правильные импорты

import Header from '@/components/Header';
import Head from 'next/head';
import BlogSection from '@/components/BlogSection';
import ResourcesSection from '@/components/Resources';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';
import FocusTrap from 'focus-trap-react';
import { getLanguageFromCookies, setLanguageCookie } from '@/utils/cookies';
import { useRouter } from 'next/router';



// --- ДАННЫЕ И КОНФИГУРАЦИЯ ---
// pages/index.js

// pages/index.js
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
        resourcesSectionTitle: "Faydalı Resurslar", viewButton: "Bax", downloadButton: "Yüklə",
        aboutSectionTitle: "Haqqımda", aboutName: "Sərxan Hacıyev",
        aboutShortBio: "10 ildən artıq bank sistemləri sahəsində təcrübəyə malik IT Biznes Analitik.",
        aboutLongBio: `Mən Oracle Flexcube, məlumatların miqrasiyası və sistem inteqrasiyaları ilə praktiki təcrübə də daxil olmaqla, rəqəmsal bankçılıq və korporativ sistemlər sahəsində on ildən artıq təcrübəyə malik Baş IT Biznes Analitikəm. Karyeram 2013-cü ildə bankın pərakəndə satış xəttində başlamışdır — kreditlərin verilməsi, müştəri ehtiyaclarını anlamaq və pozulmuş proseslərin real təsirini görməklə.

İllər keçdikcə mən front-ofis əməliyyatlarından bank texologiyasının özəyinə keçdim. Karyeramın ən yaddaqalan məqamlarından biri, memarlıq və məhsul məntiqindən tutmuş məlumatların miqrasiyası və inteqrasiyasına qədər fərdi Əsas Bank Sistemini sıfırdan qurmaqda iştirakım oldu. Bu praktiki təcrübə, əsas bankçılığın transformasiyası, normativ uyğunluq və real vaxt rejimində əməliyyatlar kimi yüksək riskli mühitlərdə texniki həlləri biznes məqsədləri ilə uyğunlaşdırmaq bacarığımı gücləndirdi.

Mən həm kəşfiyyat, həm də icra mərhələlərində çalışaraq mürəkkəbliyi aydınlığa çevirmiş, həm yerli, həm də paylanmış komandalarla əməkdaşlıq etmişəm. Həmçinin Məhsul Sahibi, Agile Kouçu və Proses Sahibi kimi vəzifələrdə çalışmışam — proqram təminatının həyat dövrünü (PDLC) təkmilləşdirmiş, kross-funksional komandalara təlimlər keçmiş, Jira və Confluence ekosistemlərini idarə etmiş və müəssisə miqyasında Agile tətbiqinə (300+ nəfər) rəhbərlik etmişəm.

Həmkarlarım məni tez-tez xaosu nizama salan bir sistem düşüncəli insan kimi təsvir edirlər. İstər köhnə sistemləri anlamaq, istər universal məntiq dizayn etmək, istərsə də dəqiq sənədlər hazırlamaq olsun — məni maraq, aydınlıq və mənalı həllər axtarışı idarə edir.

Texniki biliklərimi və insana yönümlü düşüncə tərzimi transformasiya təşəbbüslərinə töhfə verə biləcəyim beynəlxalq komandalarla uzaqdan və ya hibrid iş imkanlarına açığam.`,
        skillsTitle: "Əsas Bacarıqlar",
        skillsListShort: ["Oracle Flexcube 12", "System Integration (API)", "Process Mapping (BPMN/UML)", "Agile & PDLC"],
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "API design & integration", "SQL (Oracle)", "Jira/Confluence", "BRD/SRS", "Process Mapping (BPMN/UML)", "UAT planning", "Stakeholder management"],
        careerMapTitle: "Karyera Xəritəsi",
        careerHistory: [
            { title: "Baş IT BA - Əsas Bankçılıq və İnteqrasiyalar", company: "Kapital Bank", date: "2024 - Hazırda", desc: "Zeus, Processing, CRM, BPM və xarici sistemlər arasında API-əsaslı kommunikasiya üçün inteqrasiya sahibi." },
            { title: "Proses Sahibi - Agile PDLC Optimizasiyası", company: "Kapital Bank", date: "2023-2024", desc: "80+ komanda üzrə PDLC və Agile idarəetməsinin yenidən dizaynına rəhbərlik." },
            { title: "Agile Kouç - Məhsul və Çatdırılma Transformasiyası", company: "Kapital Bank", date: "2021-2023", desc: "10+ Agile komandasına mentorluq və rəhbərliyə məhsul və çatdırılma mükəmməlliyi üzrə təlimlər." },
            { title: "Aparıcı IT BA - Əsas Bankçılıq Transformasiyası", company: "Kapital Bank", date: "2016-2019", desc: "Flexcube və Processing-i əvəz edən Zeus ABS-nin sıfırdan dizaynı, sənədləşdirilməsi və test edilməsi." },
            { title: "Baş IT Biznes Analitik - Əsas Bankçılıq Sistemləri", company: "Bank of Baku", date: "2014-2016", desc: "Flexcube və kart prosessinq platformaları üçün yeni funksionallıqların çatdırılması." }
        ],
        contactSectionTitle: "Əlaqə", formNamePlaceholder: "Adınız", formEmailPlaceholder: "E-mail ünvanınız", formMessagePlaceholder: "Mesajınız...", formSubmitButton: "Göndər",
        formSubmitting: "Göndərilir...",
        themeToggle: "Temanı dəyişdir",
        langToggle: "Dili dəyişdir",
        validation: { nameRequired: "Ad tələb olunur", emailRequired: "E-mail tələb olunur", emailInvalid: "Yanlış e-mail formatı", messageRequired: "Mesaj tələb olunur", messageMin: "Mesaj ən azı 10 simvol olmalıdır" },
        contactInfoTitle: "Əlaqə saxlayın",
        contactInfoText: "Formadan istifadə edərək və ya sosial şəbəkələrdə mənimlə əlaqə saxlaya bilərsiniz."
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
        resourcesSectionTitle: "Useful Resources", viewButton: "View", downloadButton: "Download",
        aboutSectionTitle: "About", aboutName: "Sarkhan Hajiyev",
        aboutShortBio: "IT Business Analyst with over 10 years of experience in banking systems.",
        aboutLongBio: `I’m a Senior IT Business Analyst with over a decade of experience in digital banking and enterprise systems, including hands-on expertise with Oracle Flexcube, data migration, and system integrations. My career began in 2013, working on the retail frontlines of banking — issuing loans, understanding client needs, and seeing the real impact of broken processes.
Over the years, I moved from front-office operations to the core of banking technology. One of the highlights of my journey was co-building a custom Core Banking System from scratch — from architecture and product logic to data migration and integrations. This hands-on experience sharpened my ability to align technical solutions with business goals in high-stakes environments like core banking transformation, regulatory compliance, and real-time operations.
I’ve worked across discovery and delivery phases, turning complexity into clarity, and collaborating with both local and distributed teams. I’ve also served as Product Owner, Agile Coach, and Process Owner — improving development lifecycles (PDLC), coaching cross-functional teams, managing Jira & Confluence ecosystems, and leading enterprise-wide Agile adoption (300+ people).
My colleagues often describe me as a systems thinker who brings order to chaos. Whether it's untangling legacy systems, designing universal logic, or drafting precise documentation — I’m driven by curiosity, clarity, and the pursuit of meaningful solutions.
Open to remote or hybrid opportunities with international teams where I can contribute to transformation initiatives with both technical insight and human-centered thinking.`,
        skillsTitle: "Core Skills",
        skillsListShort: ["Oracle Flexcube 12", "System Integration (API)", "Process Mapping (BPMN/UML)", "Agile & PDLC"],
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "API design & integration (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", "BRD", "SRS", "Process Mapping (BPMN/UML)", "API Specifications", "User Story writing", "Acceptance Criteria", "UAT planning & execution", "Functional testing", "Integration testing", "Stakeholder management", "Coaching/mentoring", "Facilitation", "Training", "System thinking", "Problem solving"],
        careerMapTitle: "Career Map",
        careerHistory: [
            { title: "Senior IT BA - Core Banking & Integrations", company: "Kapital Bank", date: "2024 - Present", desc: "Act as integration owner for API-based communication between Zeus, Processing, CRM, BPM and external systems." },
            { title: "Process Owner - Agile PDLC Optimization", company: "Kapital Bank", date: "2023-2024", desc: "Led re-design of PDLC and Agile governance across 80+ teams." },
            { title: "Agile Coach - Product & Delivery Transformation", company: "Kapital Bank", date: "2021-2023", desc: "Mentored 10+ Agile teams and coached leadership on product and delivery excellence." },
            { title: "Lead IT BA - Core Banking Transformation", company: "Kapital Bank", date: "2016-2019", desc: "Designed, documented, and tested Zeus ABS from scratch, replacing Flexcube & Processing modules." },
            { title: "Senior IT Business Analyst - Core Banking Systems", company: "Bank of Baku", date: "2014-2016", desc: "Delivered new features for Flexcube and card processing platforms." }
        ],
        contactSectionTitle: "Contact", formNamePlaceholder: "Your name", formEmailPlaceholder: "Your email", formMessagePlaceholder: "Your message...", formSubmitButton: "Send",
        formSubmitting: "Sending...",
        themeToggle: "Toggle theme",
        langToggle: "Change language",
        validation: { nameRequired: "Name is required", emailRequired: "Email is required", emailInvalid: "Invalid email format", messageRequired: "Message is required", messageMin: "Message must be at least 10 characters long" },
        contactInfoTitle: "Get in Touch",
        contactInfoText: "Feel free to reach out using the form or connect with me on social media."
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
        resourcesSectionTitle: "Полезные ресурсы", viewButton: "Открыть", downloadButton: "Скачать",
        aboutSectionTitle: "Обо мне", aboutName: "Сархан Гаджиев",
        aboutShortBio: "IT бизнес-аналитик с более чем 10-летним опытом работы в банковских системах.",
        aboutLongBio: `Я — старший IT-бизнес-аналитик с более чем десятилетним опытом в сфере цифрового банкинга и корпоративных систем, включая практический опыт работы с Oracle Flexcube, миграцией данных и системными интеграциями. Моя карьера началась в 2013 году на передовой розничного банкинга — я выдавал кредиты, разбирался в потребностях клиентов и видел реальные последствия неэффективных процессов.
Со временем я перешел от фронт-офисных операций к ядру банковских технологий. Одним из ключевых моментов моего пути стало участие в создании кастомной Core Banking System с нуля — от архитектуры и продуктовой логики до миграции данных и интеграций. Этот практический опыт отточил мою способность приводить технические решения в соответствие с бизнес-целями в таких сложных областях, как трансформация основного банкинга, соблюдение нормативных требований и операции в реальном времени.
Я работал на всех этапах — от исследования до внедрения, превращая сложность в ясность и сотрудничая как с местными, так и с распределенными командами. Я также выполнял роли Владельца Продукта, Agile-коуча и Владельца Процесса — улучшал жизненный цикл разработки (PDLC), обучал кросс-функциональные команды, управлял экосистемами Jira и Confluence и руководил внедрением Agile в масштабах предприятия (более 300 человек).
Коллеги часто описывают меня как системно мыслящего человека, который наводит порядок в хаосе. Будь то распутывание унаследованных систем, проектирование универсальной логики или составление точной документации — мной движет любопытство, стремление к ясности и поиск значимых решений.
Открыт для удаленных или гибридных возможностей в международных командах, где я могу внести свой вклад в инициативы по трансформации, сочетая технические знания с человеко-ориентированным мышлением.`,
        skillsTitle: "Ключевые навыки",
        skillsListShort: ["Oracle Flexcube 12", "Системная интеграция (API)", "Моделирование процессов (BPMN/UML)", "Agile и PDLC"],
        skillsList: ["Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", "Проектирование и интеграция API (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", "BRD", "SRS", "Моделирование процессов (BPMN/UML)", "Спецификации API", "Написание User Story", "Критерии приемки", "Планирование и проведение UAT", "Функциональное тестирование", "Интеграционное тестирование", "Управление стейкхолдерами", "Коучинг/менторство", "Фасилитация", "Проведение тренингов", "Системное мышление", "Решение проблем"],
        careerMapTitle: "Карта карьеры",
        careerHistory: [
            { title: "Ведущий IT БА - Core Banking и Интеграции", company: "Kapital Bank", date: "2024 - настоящее время", desc: "Владелец интеграции для API-взаимодействия между Zeus, процессингом, CRM, BPM и внешними системами." },
            { title: "Владелец Процесса - Оптимизация Agile PDLC", company: "Kapital Bank", date: "2023-2024", desc: "Руководил редизайном PDLC и Agile-управления в 80+ командах." },
            { title: "Agile-коуч - Трансформация Продукта и Поставок", company: "Kapital Bank", date: "2021-2023", desc: "Менторил более 10 Agile-команд и обучал руководство продуктовому и исполнительскому мастерству." },
            { title: "Ведущий IT БА - Трансформация Core Banking", company: "Kapital Bank", date: "2016-2019", desc: "Проектировал, документировал и тестировал АБС Zeus с нуля, заменяя модули Flexcube и Процессинга." },
            { title: "Старший IT-бизнес-аналитик - Core Banking Системы", company: "Bank of Baku", date: "2014-2016", desc: "Отвечал за поставку нового функционала для платформ Flexcube и карточного процессинга." }
        ],
        contactSectionTitle: "Связь", formNamePlaceholder: "Ваше имя", formEmailPlaceholder: "Ваш email", formMessagePlaceholder: "Ваше сообщение...", formSubmitButton: "Отправить",
        formSubmitting: "Отправка...",
        themeToggle: "Сменить тему",
        langToggle: "Сменить язык",
        validation: { nameRequired: "Имя обязательно", emailRequired: "Email обязателен", emailInvalid: "Неверный формат email", messageRequired: "Сообщение обязательно", messageMin: "Сообщение должно содержать не менее 10 символов" },
        contactInfoTitle: "Свяжитесь со мной",
        contactInfoText: "Смело пишите мне через форму или свяжитесь со мной в социальных сетях."
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
            <p>Powered by Next.js.</p>
            <p>&copy; {new Date().getFullYear()} Sarkhan Hajiyev. All rights reserved.</p>
        </div>
    </footer>
);

// --- ГЛАВНАЯ СТРАНИЦА (ИСПРАВЛЕННАЯ ВЕРСИЯ) ---

export default function HomePage({ articles, siteUrl }) {
    const router = useRouter();
    const { locale } = router; // Получаем текущий язык напрямую из роутера

    const [activeSection, setActiveSection] = useState('home');
    const t = translations[locale] || translations['az'];
    const scrollPosition = useRef(0);
    const isInitialLoad = useRef(true);

    const handleLanguageChange = (newLang) => {
        scrollPosition.current = window.scrollY;
        // Эта команда теперь правильно сменит язык и перезапросит данные
        router.push(router.pathname, router.asPath, { locale: newLang, scroll: false });
    };

    // ... после функции handleLanguageChange

useEffect(() => {
    // Восстанавливаем позицию скролла после смены языка
    if (scrollPosition.current > 0) {
        window.scrollTo({
            top: scrollPosition.current,
            behavior: 'instant' // 'instant' для мгновенного перехода без анимации
        });
    }
}, [locale]); // Этот хук сработает только при изменении языка

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    useEffect(() => {
        // Этот хук остается без изменений
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
// Устанавливаем таймер, чтобы после первой загрузки observer начал работать в обычном режиме
        const timeoutId = setTimeout(() => {
        isInitialLoad.current = false;
    }, 500); // 500 мс - небольшая задержка

        return () => {
            window.removeEventListener('scroll', onScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, [locale]);

    const jsonLd = { /* ... ваш jsonLd объект ... */ };

    return (
        <>
            {/* ... ваша секция Head ... */}

            <div id="background-animation"></div>

            {/* Передаем `locale` вместо `lang` */}
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection={activeSection} />

            <main>
                <Hero t={t} />
                <BlogSection t={t} articles={articles} />
                {/* Передаем `locale` вместо `lang` */}
                <ResourcesSection t={t} lang={locale} />
                <AboutSection t={t} />
                <ContactSection t={t} />
            </main>

            <Footer />
        </>
    );
}

// --- ЗАГРУЗКА ДАННЫХ С СЕРВЕРА (ИСПРАВЛЕННАЯ ВЕРСИЯ) ---
export async function getServerSideProps(context) {
  const { locale } = context; // Получаем язык напрямую из контекста
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

try {
    const res = await fetch(`${strapiUrl}/api/posts?locale=${locale}&populate=cover&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    const response = await res.json();

    const markdownConverter = new showdown.Converter();
    const articles = (response.data || []).map((post) => {
      if (post.content) {
        const rawHtml = markdownConverter.makeHtml(post.content);
        post.sanitizedBody = DOMPurify.sanitize(rawHtml);
      }
      return post;
    });

    return { props: { articles, siteUrl } };
  } catch (error) {
    console.error("Failed to fetch articles from Strapi:", error);
    return { props: { articles: [], siteUrl } };
  }
}