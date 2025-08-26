// pages/blog.js (ФИНАЛЬНАЯ ВЕРСИЯ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import PostModal from '@/components/PostModal';
import ClientOnly from '@/components/ClientOnly';
import { getProcessedPosts } from '@/lib/strapi'; // <-- 1. Импортируем нашу новую функцию

export default function BlogPage({ articles, pagination }) { // `articles` - это теперь наши обработанные посты
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];
    const [selectedPost, setSelectedPost] = useState(null);
    const triggerRef = useRef(null);

    const openModal = (post, e) => {
        triggerRef.current = e.currentTarget;
        setSelectedPost(post);
    };
    const closeModal = () => {
        setSelectedPost(null);
        triggerRef.current?.focus();
    };

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
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="blog" pathname={router.pathname} />
            <main className="blog-page-main">
                <section id="blog-archive">
                    <div className="container">
                        <h2>{t.blogSectionTitle}</h2>
                        <div className="blog-grid">
                            {Array.isArray(articles) && articles.map(post => (
                                 <div
                                    key={post.id}
                                    className="blog-card"
                                    onClick={(e) => openModal(post, e)}
                                    tabIndex="0"
                                    onKeyDown={(e) => e.key === 'Enter' && openModal(post, e)}
                                >
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
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
            <ClientOnly>
                <PostModal post={selectedPost} onClose={closeModal} t={t} locale={locale} />
            </ClientOnly>
            <Footer />
        </>
    );
}

// 2. Радикально упрощенная getServerSideProps
export async function getServerSideProps(context) {
  const { locale, query } = context;
  const page = query.page || 1;

  // Просто вызываем нашу централизованную функцию
  const { posts, pagination } = await getProcessedPosts({ locale, page, pageSize: 9 });

  // Передаем посты в пропс `articles`, как и ожидает компонент BlogPage
  return { props: { articles: posts, pagination } };
}