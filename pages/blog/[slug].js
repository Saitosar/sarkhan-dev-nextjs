// pages/blog/[slug].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostContent from '@/components/PostContent';
import { getProcessedPosts } from '@/lib/strapi';

export default function PostPage({ post }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    if (!post) {
        return <div>Post not found.</div>
    }

    const handleLanguageChange = (newLang) => {
        router.push(`/blog/${post.slug}`, `/blog/${post.slug}`, { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{post.title} | Sarkhan.dev</title>
                <meta name="description" content={post.excerpt} />
                <link rel="icon" href="/leo-icon.svg" type="image/svg+xml" />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="blog" pathname={router.pathname} />
            <main className="blog-page-main">
                <PostContent post={post} t={t} locale={locale} />
            </main>
            <Footer />
        </>
    );
}

// --- НАЧАЛО ИСПРАВЛЕНИЙ ---
async function fetchAllPostsForPaths(locale) {
    let allPosts = [];
    let page = 1;
    let totalPages = 1;
    const pageSize = 100; // Запрашиваем по 100 за раз для эффективности

    while (page <= totalPages) {
        const { posts, pagination } = await getProcessedPosts({ locale, page, pageSize });
        if (posts && posts.length > 0) {
            allPosts = allPosts.concat(posts);
            totalPages = pagination.pageCount || 1;
        }
        page++;
    }
    return allPosts;
}

export async function getStaticPaths({ locales }) {
    const paths = [];

    for (const locale of locales) {
        const posts = await fetchAllPostsForPaths(locale);
        posts.forEach(post => {
            if (post && post.slug) { // Добавлена проверка на наличие slug
                paths.push({
                    params: { slug: post.slug },
                    locale: locale,
                });
            }
        });
    }

    return { paths, fallback: 'blocking' };
}
// --- КОНЕЦ ИСПРАВЛЕНИЙ ---

export async function getStaticProps(context) {
    const { locale, params } = context;
    // Нам нужна функция, которая найдет один пост по slug
    const { posts } = await getProcessedPosts({ locale, pageSize: 200 }); // Увеличим лимит для поиска
    const post = posts.find(p => p.slug === params.slug) || null;

    if (!post) {
        return { notFound: true };
    }

    return { 
        props: { post },
        revalidate: 60,
    };
}