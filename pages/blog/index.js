// pages/blog.js (ОБНОВЛЕННАЯ ВЕРСЯ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Импортируем Link
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import { getProcessedPosts } from '@/lib/strapi';

export default function BlogPage({ articles, pagination }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

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
                                <Link key={post.id} href={`/blog/${post.slug}`} legacyBehavior>
                                    <a className="blog-card">
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                        <span className="btn">{t.readMore}</span>
                                    </a>
                                </Link>
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
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const { locale, query } = context;
    const page = query.page || 1;
    const { posts, pagination } = await getProcessedPosts({ locale, page, pageSize: 9 });

    return { props: { articles: posts, pagination } };
}