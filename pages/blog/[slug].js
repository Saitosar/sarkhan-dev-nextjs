// pages/blog/[slug].js (НОВЫЙ ФАЙЛ)
import Head from 'next/head';
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostContent from '@/components/PostContent'; // Мы создадим этот компонент на следующем шаге
import { getProcessedPosts } from '@/lib/strapi';

export default function PostPage({ post }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    // Обработка случая, если пост не найден
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

export async function getStaticPaths({ locales }) {
    const paths = [];

    // Проходим по каждому языку, чтобы получить правильные сслыки для каждого
    for (const locale of locales) {
        const { posts } = await getProcessedPosts({ locale, pageSize: 100 }); // Запрашиваем посты для конкретного языка
        posts.forEach(post => {
            paths.push({
                params: { slug: post.slug },
                locale: locale, // Четко связываем ссылку с ее языком
            });
        });
    }

    return { paths, fallback: 'blocking' }; // fallback: 'blocking' лучше для SEO
}

export async function getStaticProps(context) {
    const { locale, params } = context;
    // Нам нужна функция, которая найдет один пост по slug
    const { posts } = await getProcessedPosts({ locale });
    const post = posts.find(p => p.slug === params.slug) || null;

    // Если пост не найден, возвращаем 404
    if (!post) {
        return { notFound: true };
    }

    return { 
        props: { post },
        revalidate: 60, // Пересобирать страницу раз в минуту, если контент изменился
    };
}