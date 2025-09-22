// pages/srd/create.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

export default function CreateSrdPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];
    const { data: session, status } = useSession();

    const [promptText, setPromptText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLanguageChange = (newLang) => {
        router.push('/srd/create', '/srd/create', { locale: newLang });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!promptText.trim() || isLoading) return;

        // Если пользователь не авторизован, отправляем его на страницу входа
        if (status !== 'authenticated') {
            signIn(); // Функция NextAuth для редиректа на страницу логина
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/srd/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promptText }), // Отправляем текст на наш API
            });

            const data = await response.json();

            if (!response.ok) {
                // Если API вернул ошибку (например, превышен лимит), показываем ее
                throw new Error(data.error || 'Failed to generate document.');
            }

            // При успехе, перенаправляем пользователя на страницу свежесозданного документа
            router.push(`/srd/${data.docId}`);

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    // Показываем заглушку, пока проверяется статус сессии
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>{`Create SRD | ${t.docTitle}`}</title>
                <meta name="description" content="Generate a new Software Requirements Document." />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} pathname={router.pathname} />
            <main className="tools-page-main">
                <section>
                    <div className="container">
                        <div className="tool-card">
                            <div className="tool-card-header">
                                <h2>Lean SRD Generator</h2>
                                <p>Describe your feature or context, and the AI will generate a structured SRD document.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    placeholder="Example: The user should be able to reset their password via a link sent to their email..."
                                    disabled={isLoading}
                                    style={{ minHeight: '200px' }} // Увеличим высоту поля
                                />
                                <div className="view-all-container">
                                    <button type="submit" className="btn" disabled={isLoading || !promptText.trim()}>
                                        {isLoading ? 'Generating...' : (status === 'authenticated' ? 'Generate Document' : 'Sign In to Generate')}
                                    </button>
                                </div>
                            </form>
                            {error && <p className="form-error" style={{ textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}