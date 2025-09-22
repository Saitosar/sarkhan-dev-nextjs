// pages/tools/index.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import Icon from '@/components/Icon';

export default function ToolsHubPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const handleLanguageChange = (newLang) => {
        router.push('/tools', '/tools', { locale: newLang });
    };

    // Опишем наши инструменты здесь
    const tools = [
        {
            title: t.toolsGeneratorTitle || "User Story & AC Generator",
            description: "A tool to create User Stories and Acceptance Criteria from a simple description.",
            url: "/tools/story-generator",
            iconName: "tools"
        },
        {
            title: "Lean SRD Generator", // Добавим перевод позже
            description: "Generate a full Software Requirements Document from a feature description.",
            url: "/tools/srd-generator",
            iconName: "resources" // Можно будет подобрать другую иконку
        }
        // В будущем вы просто будете добавлять новые инструменты сюда
    ];

    return (
        <>
            <Head>
                <title>{`${t.navTools} | Sarkhan.dev`}</title>
                <meta name="description" content={t.toolsManifestText} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="resources-page-main">
                <section id="tools-archive">
                    <div className="container">
                        <h2>{t.toolsSectionTitle}</h2>
                        {/* Мы используем тот же класс, что и для ресурсов, для красивой сетки */}
                        <div className="resources-grid">
                            {tools.map((tool) => (
                                <Link key={tool.title} href={tool.url} passHref legacyBehavior>
                                    <a className="resource-card">
                                        <div className="resource-icon-wrapper">
                                            <Icon name={tool.iconName} />
                                        </div>
                                        <h3>{tool.title}</h3>
                                        <hr className="resource-divider" />
                                        <p>{tool.description}</p>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}