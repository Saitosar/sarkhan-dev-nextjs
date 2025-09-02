// pages/blog/page/[page].js (НОВЫЙ ФАЙЛ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import { getProcessedPosts } from '@/lib/strapi';

export default function BlogPaginatedPage({ articles, pagination }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const handleLanguageChange = (newLang) => {
        const { page } = router.query;
        router.push(`/blog/page/${page}`, `/blog/page/${page}`, { locale: newLang });
    };

    const currentPage = parseInt(pagination?.page || 1);
    const totalPages = parseInt(pagination?.pageCount || 1);

    return (
        <>
            <Head>
                <title>{`${t.navBlog} | Sarkhan.dev`}</title>
                <meta name="description" content={t.docDesc} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="blog" pathname={router.pathname} />
            <main className="blog-page-main">
                <section id="blog-archive">
                    <div className="container">
                        <h2>{t.blogSectionTitle}</h2>
                        <div className="blog-grid">
                            {articles.map(post => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <span className="btn">{t.readMore}</span>
                                </Link>
                            ))}
                        </div>

                        <div className="pagination">
                            {currentPage > 1 && (
                                <Link href={`/blog/page/${currentPage - 1}`} className="btn">
                                    &larr; {t.prevButton}
                                </Link>
                            )}
                            {currentPage < totalPages && (
                                <Link href={`/blog/page/${currentPage + 1}`} className="btn">
                                    {t.nextButton} &rarr;
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export async function getStaticPaths({ locales }) {
    const paths = [];
    for (const locale of locales) {
        const { pagination } = await getProcessedPosts({ locale, pageSize: 9 });
        const totalPages = pagination?.pageCount || 1;
        for (let i = 1; i <= totalPages; i++) {
            paths.push({ params: { page: String(i) }, locale });
        }
    }
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
    const { locale, params } = context;
    const page = parseInt(params.page || 1);

    const { posts, pagination } = await getProcessedPosts({ locale, page, pageSize: 9 });

    if (!posts || posts.length === 0) {
        return { notFound: true };
    }

    return { 
        props: { articles: posts, pagination },
        revalidate: 60,
    };
}