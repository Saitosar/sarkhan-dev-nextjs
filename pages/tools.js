// pages/tools.js (НОВЫЙ ФАЙЛ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

export default function ToolsPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const handleLanguageChange = (newLang) => {
        router.push('/tools', '/tools', { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{`${t.navTools} | Sarkhan.dev`}</title>
                <meta name="description" content={t.toolsManifestText} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="tools-page-main">
                <section id="tools-archive">
                    <div className="container" style={{ textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2>{t.toolsSectionTitle}</h2>
                        <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>{t.comingSoon}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}