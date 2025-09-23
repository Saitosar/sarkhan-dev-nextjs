// pages/tools/srd/[docId].js (ФИНАЛЬНАЯ ВЕРСИЯ С КНОПКАМИ)

import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon'; // Убедитесь, что Icon импортирован
import { translations } from '@/utils/translations';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';
import { promises as fs } from 'fs';
import path from 'path';
import { useState } from 'react'; // Импортируем useState

// Импорты для генерации PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function getServerSideProps(context) {
    // ... (Ваша функция getServerSideProps остается без изменений)
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
    const { locale } = router;
    const t = translations[locale] || translations['az'];
    const [copyStatus, setCopyStatus] = useState('Копировать Markdown');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleLanguageChange = (newLang) => {
        const { docId } = router.query;
        router.push(`/tools/srd/${docId}`, `/tools/srd/${docId}`, { locale: newLang });
    };

    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(document.content_md).then(() => {
            setCopyStatus('Скопировано!');
            setTimeout(() => setCopyStatus('Копировать Markdown'), 2000);
        });
    };

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        const contentElement = document.getElementById('srd-content');
        if (contentElement) {
            const canvas = await html2canvas(contentElement, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${document.title.replace(/ /g, '_')}.pdf`);
        }
        setIsDownloading(false);
    };

    return (
        <>
            <Head>
                <title>{`${document.title} | Sarkhan.dev`}</title>
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="post-content-wrapper" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    {/* Контейнер для кнопок действий */}
                    <div className="srd-actions">
                        <button onClick={handleCopyMarkdown} className="btn btn-secondary">
                           {copyStatus}
                        </button>
                        <button onClick={handleDownloadPdf} className="btn" disabled={isDownloading}>
                            {isDownloading ? 'Генерация...' : 'Скачать PDF'}
                        </button>
                    </div>

                    {/* Контейнер-документ */}
                    <div id="srd-content" className="srd-document-view"> 
                        <div dangerouslySetInnerHTML={{ __html: document.content_html }} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}