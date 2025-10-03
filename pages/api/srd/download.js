// pages/api/srd/download.js (ВЕРСИЯ 4.0 - С ФИРМЕННЫМ КОЛОНТИТУЛОМ)

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { renderToStaticMarkup } from 'react-dom/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { promises as fs } from 'fs';
import path from 'path';
import SrdPrintLayout from '../../../components/SrdPrintLayout';

export const runtime = 'nodejs';
export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    },
};

async function getDb() {
    const certPath = path.resolve(process.cwd(), 'certs', 'supabase.crt');
    const caCert = await fs.readFile(certPath, 'utf-8');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true,
            ca: caCert,
        },
    });
    return drizzle(pool, { schema });
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { docId } = req.query;
    if (!docId) {
        return res.status(400).json({ error: 'docId is required' });
    }

    let browser = null;

    try {
        const db = await getDb();
        const document = await db.query.documents.findFirst({
            where: eq(schema.documents.id, docId),
        });

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const printHtml = renderToStaticMarkup(
            <SrdPrintLayout document={document} />
        );

        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });
        
        const page = await browser.newPage();
        await page.setContent(printHtml, { waitUntil: 'networkidle0' });

        // --- НАЧАЛО ИЗМЕНЕНИЙ ---
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true, // Включаем отображение колонтитулов
            footerTemplate: `
              <div style="width: 100%; font-size: 9px; padding: 0 20px; color: #888; opacity: 0.7; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <span>Generated with ITBAI on sarkhan.dev</span>
                </div>
                <div>
                  <span class="pageNumber"></span> / <span class="totalPages"></span>
                </div>
              </div>
            `,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '40px', // Увеличили нижний отступ для колонтитула
                left: '20px',
            },
        });
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---
        
        const safeFileName = (document.title || 'srd-document').replace(/[^a-z0-9]/gi, '_').toLowerCase();
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}.pdf"`);
        
        res.status(200).end(pdfBuffer);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate PDF.', details: error.message });
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
}