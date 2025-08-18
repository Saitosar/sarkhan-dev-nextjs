import Header from '@/components/Header';
import ResourcesSection from '@/components/Resources';
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

İllər keçdikcə mən front-ofis əməliyyatlarından bank texnologiyasının özəyinə keçdim. Karyeramın ən yaddaqalan məqamlarından biri, memarlıq və məhsul məntiqindən tutmuş məlumatların miqrasiyası və inteqrasiyasına qədər fərdi Əsas Bank Sistemini sıfırdan qurmaqda iştirakım oldu. Bu praktiki təcrübə, əsas bankçılığın transformasiyası, normativ uyğunluq və real vaxt rejimində əməliyyatlar kimi yüksək riskli mühitlərdə texniki həlləri biznes məqsədləri ilə uyğunlaşdırmaq bacarığımı gücləndirdi.

Mən həm kəşfiyyat, həm də icra mərhələlərində çalışaraq mürəkkəbliyi aydınlığa çevirmiş, həm yerli, həm də paylanmış komandalarla əməkdaşlıq etmişəm. Həmçinin Məhsul Sahibi, Agile Kouçu və Proses Sahibi kimi vəzifələrdə çalışmışam — proqram təminatının həyat dövrünü (PDLC) təkmilləşdirmiş, kross-funksional komandalara təlimlər keçmiş, Jira və Confluence ekosistemlərini idarə etmiş və müəssisə miqyasında Agile tətbiqinə (300+ nəfər) rəhbərlik etmişəm.

Həmkarlarım məni tez-tez xaosu nizama salan bir sistem düşüncəli insan kimi təsvir edirlər. İstər köhnə sistemləri anlamaq, istər universal məntiq dizayn etmək, istərsə də dəqiq sənədlər hazırlamaq olsun — məni maraq, aydınlıq və mənalı həllər axtarışı idarə edir.

Texniki biliklərimi və insana yönümlü düşüncə tərzimi transformasiya təşəbbüslərinə töhfə verə biləcəyim beynəlxalq komandalarla uzaqdan və ya hibrid iş imkanlarına açığam.`,
        skillsTitle: "Əsas Bacarıqlar",
        skillsListShort: ["Oracle Flexcube 12", "System Integration (API)", "Process Mapping (BPMN/UML)", "Agile & PDLC"],
        skillsList: [
    "Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", 
    "API design & integration (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", 
    "BRD", "SRS", "Process Mapping (BPMN/UML)", "API Specifications", "User Story writing", "Acceptance Criteria", 
    "UAT planning & execution", "Functional testing", "Integration testing", "Stakeholder management", 
    "Coaching/mentoring", "Facilitation", "Training", "System thinking", "Problem solving"
],
        careerMapTitle: "Karyera Xəritəsi",
        careerHistory: [
    {
        title: "Baş IT BA - Əsas Bankçılıq və İnteqrasiyalar",
        company: "Kapital Bank",
        date: "2024 - Hazırda",
        desc: "Zeus, Processing, CRM, BPM və xarici sistemlər arasında API-əsaslı kommunikasiya üçün inteqrasiya sahibi."
    },
    {
        title: "Proses Sahibi - Agile PDLC Optimizasiyası",
        company: "Kapital Bank",
        date: "2023-2024",
        desc: "80+ komanda üzrə PDLC və Agile idarəetməsinin yenidən dizaynına rəhbərlik."
    },
    {
        title: "Agile Kouç - Məhsul və Çatdırılma Transformasiyası",
        company: "Kapital Bank",
        date: "2021-2023",
        desc: "10+ Agile komandasına mentorluq və rəhbərliyə məhsul və çatdırılma mükəmməlliyi üzrə təlimlər."
    },
    {
        title: "Aparıcı IT BA - Əsas Bankçılıq Transformasiyası",
        company: "Kapital Bank",
        date: "2016-2019",
        desc: "Flexcube və Processing-i əvəz edən Zeus ABS-nin sıfırdan dizaynı, sənədləşdirilməsi və test edilməsi."
    },
    {
        title: "Baş IT Biznes Analitik - Əsas Bankçılıq Sistemləri",
        company: "Bank of Baku",
        date: "2014-2016",
        desc: "Flexcube və kart prosessinq platformaları üçün yeni funksionallıqların çatdırılması."
    }
],
        
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
skillsList: [
    "Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", 
    "API design & integration (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", 
    "BRD", "SRS", "Process Mapping (BPMN/UML)", "API Specifications", "User Story writing", "Acceptance Criteria", 
    "UAT planning & execution", "Functional testing", "Integration testing", "Stakeholder management", 
    "Coaching/mentoring", "Facilitation", "Training", "System thinking", "Problem solving"
],
careerMapTitle: "Career Map",
careerHistory: [
    {
      title: "Senior IT BA - Core Banking & Integrations",
      company: "Kapital Bank",
      date: "2024 - Present",
      desc: "Act as integration owner for API-based communication between Zeus, Processing, CRM, BPM and external systems."
    },
    {
      title: "Process Owner - Agile PDLC Optimization",
      company: "Kapital Bank",
      date: "2023-2024",
      desc: "Led re-design of PDLC and Agile governance across 80+ teams."
    },
    {
      title: "Agile Coach - Product & Delivery Transformation",
      company: "Kapital Bank",
      date: "2021-2023",
      desc: "Mentored 10+ Agile teams and coached leadership on product and delivery excellence."
    },
    {
      title: "Lead IT BA - Core Banking Transformation",
      company: "Kapital Bank",
      date: "2016-2019",
      desc: "Designed, documented, and tested Zeus ABS from scratch, replacing Flexcube & Processing modules."
    },
    {
      title: "Senior IT Business Analyst - Core Banking Systems",
      company: "Bank of Baku",
      date: "2014-2016",
      desc: "Delivered new features for Flexcube and card processing platforms."
    }
],
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
skillsList: [
    "Oracle Flexcube 12", "Zeus (in house)", "Processing (CMS/TWO)", "ELMA BPM", "Mobile bank app", 
    "Проектирование и интеграция API (REST/JSON/XML)", "SQL (Oracle)", "Swagger/Postman", "Jira/Confluence", "Canva/Draw.io", 
    "BRD", "SRS", "Моделирование процессов (BPMN/UML)", "Спецификации API", "Написание User Story", "Критерии приемки", 
    "Планирование и проведение UAT", "Функциональное тестирование", "Интеграционное тестирование", "Управление стейкхолдерами", 
    "Коучинг/менторство", "Фасилитация", "Проведение тренингов", "Системное мышление", "Решение проблем"
],
careerMapTitle: "Карта карьеры",
careerHistory: [
    {
      title: "Ведущий IT БА - Core Banking и Интеграции",
      company: "Kapital Bank",
      date: "2024 - настоящее время",
      desc: "Владелец интеграции для API-взаимодействия между Zeus, процессингом, CRM, BPM и внешними системами."
    },
    {
      title: "Владелец Процесса - Оптимизация Agile PDLC",
      company: "Kapital Bank",
      date: "2023-2024",
      desc: "Руководил редизайном PDLC и Agile-управления в 80+ командах."
    },
    {
      title: "Agile-коуч - Трансформация Продукта и Поставок",
      company: "Kapital Bank",
      date: "2021-2023",
      desc: "Менторил более 10 Agile-команд и обучал руководство продуктовому и исполнительскому мастерству."
    },
    {
      title: "Ведущий IT БА - Трансформация Core Banking",
      company: "Kapital Bank",
      date: "2016-2019",
      desc: "Проектировал, документировал и тестировал АБС Zeus с нуля, заменяя модули Flexcube и Процессинга."
    },
    {
      title: "Старший IT-бизнес-аналитик - Core Banking Системы",
      company: "Bank of Baku",
      date: "2014-2016",
      desc: "Отвечал за поставку нового функционала для платформ Flexcube и карточного процессинга."
    }
],
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

// --- КОМПОНЕНТЫ ---
/*
const Header = ({ t, lang, setLang, activeSection }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langSwitcherRef = useRef(null);

  // >>> добавлено для magic line
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
  // <<< добавлено для magic line

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
          <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Sarkhan.dev</span>
        </a>

        <div className="nav-right-cluster">
          <nav>
            <ul
              id="nav-menu"
              ref={navMenuRef}  // <<< важный ref для линии
              className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}
            >
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

          <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="theme-toggle" aria-label={t.themeToggle}>🌓</button>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(v => !v)} aria-expanded={mobileMenuOpen} aria-controls="nav-menu">☰</button>
        </div>
      </div>
    </header>
  );
};
*/
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
              article ? (
                <div
                  key={article.id}
                  className="blog-card"
                  onClick={(e) => openModal(article, e)}
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && openModal(article, e)}
                >
                  {/* Картинка, если нужна: article.cover?.url */}
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="btn">{t.readMore}</span>
                </div>
              ) : null
            ))}
            {(!articles || articles.length === 0) && <p>Hələ yazı yoxdur.</p>}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <FocusTrap active={!!selectedArticle} focusTrapOptions={{ onDeactivate: closeModal, initialFocus: false }}>
          <div className="modal-overlay active" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
              <h3 id="modal-title">{selectedArticle.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.sanitizedBody || '' }} />
              <br />
              <button className="btn" onClick={closeModal}>{t.closeButton}</button>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
};

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
    useEffect(() => {
      const saved = getLanguageFromCookies();
      if (saved && saved !== lang) setLang(saved);
    }, []);
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
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

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