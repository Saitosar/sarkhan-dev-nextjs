// pages/blog.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';

// Импортируем знакомые компоненты
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Предполагая, что Footer можно импортировать
import { translations } from '@/utils/translations'; // Путь к вашим переводам

// Компонент для отображения одной карточки статьи
const ArticleCard = ({ article, t }) => {
    // Здесь мы можем использовать модальное окно, как на главной,
    // или просто сделать карточку ссылкой на будущую страницу статьи
    return (
        <div className="blog-card">
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            {/* Пока что модальное окно отключено для простоты */}
            <span className="btn-static">{t.readMore}</span>
        </div>
    );
};


export default function BlogPage({ articles, pagination, t, locale }) {
    const router = useRouter();

    const handleLanguageChange = (newLang) => {
        router.push(`/blog?page=${pagination.page}`, `/blog?page=${pagination.page}`, { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{t.navBlog} | Sarkhan.dev</title>
                <meta name="description" content={t.docDesc} />
                <link rel="icon" href="/leo-icon.svg" type="image/svg+xml" />
            </Head>

            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="blog" />

            <main className="blog-page-main">
                <section id="blog-archive">
                    <div className="container">
                        <h2>{t.blogSectionTitle}</h2>
                        <div className="blog-grid">
                            {articles.map(article => (
                                <ArticleCard key={article.id} article={article} t={t} />
                            ))}
                        </div>

                        {/* Пагинация */}
                        <div className="pagination">
                            {pagination.page > 1 && (
                                <button onClick={() => router.push(`/blog?page=${pagination.page - 1}`)} className="btn">
                                    &larr; Предыдущая
                                </button>
                            )}
                            {pagination.page < pagination.pageCount && (
                                <button onClick={() => router.push(`/blog?page=${pagination.page + 1}`)} className="btn">
                                    Следующая &rarr;
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
    const page = query.page || 1; // Получаем номер страницы из URL
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    try {
        // Загружаем 9 статей на страницу
        const res = await fetch(`${strapiUrl}/api/posts?locale=${locale}&populate=cover&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=9`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

        const response = await res.json();
        const articles = response.data || [];
        const pagination = response.meta.pagination;

        // Обработка markdown, если нужно
        const markdownConverter = new showdown.Converter();
        const sanitizedArticles = articles.map((post) => {
            if (post.content) {
                const rawHtml = markdownConverter.makeHtml(post.content);
                post.sanitizedBody = DOMPurify.sanitize(rawHtml);
            }
            return post;
        });

        // Загружаем переводы
        const t = translations[locale] || translations['az'];

        return { props: { articles: sanitizedArticles, pagination, t, locale } };
    } catch (error) {
        console.error("Failed to fetch articles from Strapi:", error);
        return { props: { articles: [], pagination: {}, t: translations[locale] || translations['az'], locale } };
    }
}