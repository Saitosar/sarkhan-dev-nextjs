// pages/tools/srd/[docId].js (ФИНАЛЬНАЯ ВЕРСИЯ С СЕРВЕРНОЙ ВЫГРУЗКОЙ)

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
import { promises as fs } from 'fs';
import path from 'path';
import { useState } from 'react';
import Link from 'next/link';

export async function getServerSideProps(context) {
    const { docId } = context.params;
    try {
        const certPath = path.resolve(process.cwd(), 'certs', 'supabase.crt');
        const caCert = await fs.readFile(certPath, 'utf-8');
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: true, ca: caCert }
        });
        const db = drizzle(pool, { schema });
        const document = await db.query.documents.findFirst({
            where: eq(schema.documents.id, docId),
            columns: {
                id: true,
                title: true,
                content_md: true,
                promptText: true
            }
        });
        if (!document) { return { notFound: true }; }

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

export default function SrdDocumentPage({ document }) {
    const router = useRouter();
    const { locale, query } = router;
    const t = translations[locale] || translations['az'];
    const [copyStatus, setCopyStatus] = useState(t.srdCopyMarkdown);

    const handleLanguageChange = (newLang) => {
        const { docId } = router.query;
        router.push(`/tools/srd/${docId}`, `/tools/srd/${docId}`, { locale: newLang });
    };

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(document.content_md).then(() => {
            setCopyStatus(t.srdCopySuccess);
            setTimeout(() => setCopyStatus(t.srdCopyMarkdown), 2000);
        });
    };

    return (
    <>
        <Head>
            <title>{`${document.title} | Sarkhan.dev`}</title>
        </Head>
        <div id="background-animation"></div>
        <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
        
        <main style={{ paddingTop: '2rem' }}>
            <div className="container">
                <div id="srd-content" className="srd-document-view"> 
                    <div dangerouslySetInnerHTML={{ __html: document.content_html }} />
                </div>

                <div className="srd-actions" style={{marginTop: '2rem', borderTop: '1px dashed var(--color-border)', borderBottom: 'none'}}>
                    <Link href={{
                        pathname: '/tools/srd-generator',
                        query: { prompt: document.promptText }
                    }} passHref legacyBehavior>
                        <a className="btn btn-secondary">{t.srdImproveQuery}</a>
                    </Link>
                    <button onClick={handleCopyMarkdown} className="btn btn-secondary">
                        {copyStatus}
                    </button>
                    <a 
                        href={`/api/srd/download?docId=${query.docId}`} 
                        className="btn"
                        download={`${document.title.replace(/ /g, '_')}.pdf`}
                    >
                        {t.srdDownloadPdf}
                    </a>
                </div>
            </div>
        </main>
        
        <Footer />
    </>
    );
}