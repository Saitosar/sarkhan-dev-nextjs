// components/SrdPrintLayout.js
import React from 'react';
import showdown from 'showdown';
import DOMPurify from 'isomorphic-dompurify';

// Эта функция будет рендерить Markdown в HTML внутри нашего компонента
const MarkdownRenderer = ({ markdown }) => {
    if (!markdown) {
        return null;
    }
    const converter = new showdown.Converter({ tables: true });
    const rawHtml = converter.makeHtml(markdown);
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);

    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};


const SrdPrintLayout = ({ document }) => {
    // Встроенные стили для PDF. Это самый надежный способ, так как внешние CSS-файлы не будут загружаться.
    const styles = `
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            color: #333;
        }
        h1, h2 {
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
        }
        h1 {
            font-size: 24px;
            text-align: center;
            margin-bottom: 5px;
        }
        h2 {
            font-size: 16px;
            margin-top: 25px;
            margin-bottom: 15px;
            color: #1a1a1a;
        }
        p {
            margin-bottom: 10px;
        }
        ul, ol {
            padding-left: 20px;
            margin-bottom: 10px;
        }
        li {
            margin-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f9f9f9;
        }
        code {
            font-family: "Courier New", Courier, monospace;
            background-color: #f1f1f1;
            padding: 2px 4px;
            border-radius: 4px;
            font-size: 11px;
        }
        pre {
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 4px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        pre code {
            padding: 0;
            background-color: transparent;
        }
    `;

    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>{document.title || 'SRD Document'}</title>
                <style>{styles}</style>
            </head>
            <body>
                <MarkdownRenderer markdown={document.content_md} />
            </body>
        </html>
    );
};

export default SrdPrintLayout;