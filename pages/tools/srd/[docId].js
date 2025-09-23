// pages/tools/srd/[docId].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';

// Этот код выполняется на сервере для загрузки данных документа
export async function getServerSideProps(context) {
  const { docId } = context.params;

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    const db = drizzle(pool, { schema });

    const document = await db.query.documents.findFirst({
      where: eq(schema.documents.id, docId),
    });

    if (!document) {
      return { notFound: true };
    }

    // Преобразуем Markdown в HTML на сервере
    const converter = new showdown.Converter({ tables: true });
    const rawHtml = converter.makeHtml(document.content_md || '');
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);

    const docWithHtml = { ...document, content_html: sanitizedHtml };

    return { props: { document: JSON.parse(JSON.stringify(docWithHtml)) } };

  } catch (error) {
    console.error("Failed to fetch document:", error);
    return { notFound: true };
  }
}

// Это компонент, который отображает страницу
export default function SrdDocumentPage({ document }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const handleLanguageChange = (newLang) => {
        const { docId } = router.query;
        router.push(`/tools/srd/${docId}`, `/tools/srd/${docId}`, { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{`${document.title} | Sarkhan.dev`}</title>
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="post-content-wrapper" style={{ paddingTop: '2rem' }}>
                <div className="container post-body"> 
                    {/* Используем dangerouslySetInnerHTML для отображения HTML */}
                    <div dangerouslySetInnerHTML={{ __html: document.content_html }} />
                </div>
            </main>
            <Footer />
        </>
    );
}