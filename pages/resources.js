// pages/resources.js (ФИНАЛЬНАЯ ВЕРСИЯ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link'; // <-- Убедитесь, что Link импортирован
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import { resourcesData } from '@/lib/resourcesData';
import Icon from '@/components/Icon';

export default function ResourcesPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const handleLanguageChange = (newLang) => {
        router.push('/resources', '/resources', { locale: newLang });
    };
    
    const currentResources = resourcesData[locale] || resourcesData['en'];

    return (
        <>
            <Head>
                <title>{`${t.navResources} | Sarkhan.dev`}</title>
                <meta name="description" content={t.docDesc} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="resources" pathname={router.pathname} />
            <main className="resources-page-main">
                <section id="resources-archive">
                    <div className="container">
                        <h2>{t.resourcesSectionTitle}</h2>
                        <div className="resources-grid">
                          {currentResources.map(resource => {
                            const isDownloadLink = resource.url.startsWith('/');
                
                            return (
                              <div className="resource-card" key={resource.id}>
                                {resource.category && (
                                  <span className="resource-category-tag">{resource.category}</span>
                                )}
                                <div className="resource-icon-wrapper">
                                  <Icon name={resource.iconName} />
                                </div>
                                <h3>{resource.title}</h3>
                                <hr className="resource-divider" />
                                <p>{resource.description}</p>
                                <div className="resource-card-footer">
                                  <a 
                                    href={resource.url} 
                                    className="btn" 
                                    download={isDownloadLink ? true : undefined}
                                    target={isDownloadLink ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                  >
                                    {isDownloadLink ? t.downloadButton : t.viewButton}
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* === НАЧАЛО ИЗМЕНЕНИЙ: ДОБАВЛЕНА КНОПКА === */}
                        <div className="view-all-container">
                            <Link href="/" legacyBehavior>
                              <a className="btn">{t.backToHome}</a>
                            </Link>
                        </div>
                        {/* === КОНЕЦ ИЗМЕНЕНИЙ === */}

                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}