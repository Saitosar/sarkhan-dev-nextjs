// pages/tools/srd-generator.js (МАКСИМАЛЬНО УПРОЩЕННАЯ ВЕРСИЯ)

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

export default function SrdGeneratorPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resultText, setResultText] = useState(''); // Стейт для хранения результата

    const handleLanguageChange = (newLang) => {
        router.push('/tools/srd-generator', '/tools/srd-generator', { locale: newLang });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResultText('');

        try {
            const response = await fetch('/api/srd/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promptText: userInput }),
            });
            if (!response.ok) {
            // Если нет, получаем текст ошибки с сервера
            const errorData = await response.json();
            throw new Error(errorData.error || `Server responded with status ${response.status}`);
        }
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Server error: ${response.status}`);
            }

           router.push(`/tools/srd/${data.docId}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>{`${t.toolsGeneratorSrdTitle || 'SRD Generator'} | Sarkhan.dev`}</title>
                <meta name="description" content={t.toolsGeneratorSrdDescription || 'Generate SRD documents.'} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="tools-page-main">
                <section id="tools-archive">
                    <div className="container">
                        <div className="tool-card">
                            <div className="tool-card-header">
                                <h2>{t.toolsGeneratorSrdTitle || 'SRD Generator'}</h2>
                                <p>{t.toolsGeneratorSrdDescription || 'Describe your idea to generate a document.'}</p>
                            </div>
                            <form onSubmit={handleGenerate}>
                                <textarea
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder={t.toolsGeneratorPlaceholder || 'Example: A user should be able to reset their password...'}
                                    disabled={isLoading}
                                    rows={5}
                                />
                                <div className="view-all-container">
                                     <button type="submit" className="btn" disabled={isLoading || !userInput.trim()}>
                                        {isLoading ? 'Generating...' : 'Generate Document'}
                                    </button>
                                </div>
                            </form>

                            {error && <p className="form-error" style={{textAlign: 'center', marginTop: '1rem'}}>{error}</p>}

                            {/* Блок для отображения результата */}
                            {resultText && (
                                <div className="tool-results-container" style={{marginTop: '2rem'}}>
                                    <h3>Generated SRD:</h3>
                                    <pre style={{
                                        whiteSpace: 'pre-wrap',
                                        wordWrap: 'break-word',
                                        background: 'var(--color-bg)',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        {resultText}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}