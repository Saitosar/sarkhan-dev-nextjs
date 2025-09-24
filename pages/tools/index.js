// pages/tools/index.js (ФИНАЛЬНАЯ ИСПРАВЛЕННАЯ ВЕРСИЯ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import Icon from '@/components/Icon';
import { useSession } from 'next-auth/react'; // Импортируем useSession

export default function ToolsHubPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];
    const { status } = useSession(); // Получаем статус сессии

    const handleSrdCardClick = (e) => {
        if (status !== 'authenticated') {
            e.preventDefault();
            const targetUrl = `/${locale}/tools/srd-generator`;
            router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(targetUrl)}`);
        }
    };

    const tools = [
        {
            title: t.toolsGeneratorTitle,
            description: t.toolsGeneratorDescription,
            url: `/tools/story-generator`,
            iconName: "userStory",
            buttonText: t.toolsGeneratorButton,
            handler: (e) => router.push(`/${locale}/tools/story-generator`), // Простой переход
        },
        {
            title: t.toolsGeneratorSrdTitle,
            description: t.toolsGeneratorSrdDescription,
            url: `/tools/srd-generator`,
            iconName: "srd",
            buttonText: t.toolsGeneratorButton, // Используем тот же текст кнопки
            handler: handleSrdCardClick, // Используем наш "умный" обработчик
        }
    ];

    return (
        <>
            <Head>
                <title>{`${t.navTools} | Sarkhan.dev`}</title>
                <meta name="description" content={t.toolsManifestText} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={(newLang) => router.push('/tools', '/tools', { locale: newLang })} activeSection="tools" pathname={router.pathname} />
            <main className="resources-page-main">
                <section id="tools-archive">
                    <div className="container">
                        <h2>{t.toolsSectionTitle}</h2>
                        <div className="resources-grid">
                            {tools.map((tool) => (
                                <a key={tool.title} href={tool.url} onClick={tool.handler} className="resource-card" style={{height: '100%'}}>
                                    <div className="resource-icon-wrapper">
                                        <Icon name={tool.iconName} />
                                    </div>
                                    <h3>{tool.title}</h3>
                                    <hr className="resource-divider" />
                                    <p style={{flexGrow: 1}}>{tool.description}</p>
                                    <div className="view-all-container" style={{marginTop: 'auto'}}>
                                        <span className="btn">{tool.buttonText}</span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="view-all-container">
                            <Link href="/" legacyBehavior>
                              <a className="btn">{t.backToHome}</a>
                            </Link>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}