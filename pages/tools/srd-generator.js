// pages/tools/srd-generator.js
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
    const [result, setResult] = useState(null);

    const handleLanguageChange = (newLang) => {
        router.push('/tools/srd-generator', '/tools/srd-generator', { locale: newLang });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        setIsLoading(true);
setError(null);
setResult(null);

try {
const response = await fetch('/api/srd/generate', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ promptText: userInput }),
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.error || 'An unknown server error occurred.');
}

setResult(data);

} catch (err) {
setError(err.message);
} finally {
setIsLoading(false);
}
    };

    return (
        <>
            <Head>
                <title>{`${t.toolsGeneratorSrdTitle} | Sarkhan.dev`}</title>
                <meta name="description" content={t.toolsGeneratorSrdDescription} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="tools-page-main">
                <section id="tools-archive">
                    <div className="container">
                        <div className="tool-card">
                            <div className="tool-card-header">
                                <h2>{t.toolsGeneratorSrdTitle}</h2>
                                <p>{t.toolsGeneratorSrdDescription}</p>
                            </div>
                            <form onSubmit={handleGenerate}>
                                <textarea
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder={t.toolsGeneratorPlaceholder}
                                    disabled={isLoading}
                                    rows={5}
                                />
                                <div className="view-all-container">
                                     <button type="submit" className="btn" disabled={isLoading || !userInput.trim()}>
                                        {isLoading ? t.toolsGeneratorButtonLoading : t.toolsGeneratorButton}
                                    </button>
                                </div>
                            </form>
                            
                            {error && <p className="form-error" style={{textAlign: 'center', marginTop: '1rem'}}>{error}</p>}

                            {result && (
                                <div className="tool-results-container">
                                    <div className="tool-result-card">
                                        <div className="tool-result-header">
                                            <h3>Документ успешно создан!</h3>
                                        </div>
                                        <p>SRD был успешно сгенерирован и сохранен в вашей учетной записи.</p>
                                        <p><strong>ID Документа:</strong> {result.docId}</p>
                                        <p><strong>Использование квоты в этом месяце:</strong> {result.usage}</p>
                                    </div>
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