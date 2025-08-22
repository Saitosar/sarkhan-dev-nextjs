// pages/blog.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';
import FocusTrap from 'focus-trap-react';

// Импортируем компоненты
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

export default function BlogPage({ articles, pagination }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    // --- ЛОГИКА МОДАЛЬНОГО ОКНА (как на главной) ---
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
    // --- КОНЕЦ ЛОГИКИ МОДАЛЬНОГО ОКНА ---

    const handleLanguageChange = (newLang) => {
        const { page } = router.query;
        const newPath = page ? `/blog?page=${page}` : '/blog';
        router.push(newPath, newPath, { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{t.navBlog} | Sarkhan.dev</title>
                <meta name="description" content={t.docDesc} />
                <link rel="icon" href="/leo-icon.svg" type="image/svg+xml" />
            </Head>

            <div id="background-animation"></div>
            {/* Передаем router.pathname в Header */}
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="blog" pathname={router.pathname} />

            <main className="blog-page-main">
                <section id="blog-archive">
                    <div className="container">
                        <h2>{t.blogSectionTitle}</h2>
                        <div className="blog-grid">
                            {articles.map(article => (
                                 <div
                                    key={article.id}
                                    className="blog-card"
                                    onClick={(e) => openModal(article, e)}
                                    tabIndex="0"
                                    onKeyDown={(e) => e.key === 'Enter' && openModal(article, e)}
                                >
                                    <h3>{article.title}</h3>
                                    <p>{article.excerpt}</p>
                                    {/* ИСПОЛЬЗУЕМ СТАНДАРТНЫЙ КЛАСС "btn" */}
                                    <span className="btn">{t.readMore}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pagination">
                            {pagination.page > 1 && (
                                <button onClick={() => router.push(`/blog?page=${pagination.page - 1}`)} className="btn">
                                    &larr; {t.prevButton || 'Previous'}
                                </button>
                            )}
                            {pagination.page < pagination.pageCount && (
                                <button onClick={() => router.push(`/blog?page=${pagination.page + 1}`)} className="btn">
                                    {t.nextButton || 'Next'} &rarr;
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* МОДАЛЬНОЕ ОКНО ДЛЯ СТАТЕЙ */}
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

            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const { locale, query } = context;
    const page = query.page || 1;
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    try {
        const res = await fetch(`${strapiUrl}/api/posts?locale=${locale}&populate=cover&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=9`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

        const response = await res.json();
        const articles = response.data || [];
        const pagination = response.meta.pagination || {};

        const markdownConverter = new showdown.Converter();
        const sanitizedArticles = articles.map((post) => {
            const excerpt = post.content ? post.content.substring(0, 150) + '...' : '';
            const rawHtml = post.content ? markdownConverter.makeHtml(post.content) : '';
            return {
                ...post,
                excerpt,
                sanitizedBody: DOMPurify.sanitize(rawHtml),
            };
        });

        return { props: { articles: sanitizedArticles, pagination } };
    } catch (error) {
        console.error("Failed to fetch articles from Strapi:", error);
        return { props: { articles: [], pagination: {} } };
    }
}