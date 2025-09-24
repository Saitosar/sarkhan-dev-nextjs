// pages/tools/srd-generator.js

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import { getSession } from 'next-auth/react';

// Эта функция будет выполняться на сервере перед загрузкой страницы
export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { locale, query } = context; 
    
   
    // Если пользователь не вошел, отправляем его на страницу логина
    if (!session) {
        const callbackUrl = `/${locale}/tools/srd-generator`;
        return {
            redirect: {
                destination: `/${locale}/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
                permanent: false,
            },
        };
    }

    // Формируем полный URL к нашему API
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host;
    const absoluteUrl = `${protocol}://${host}/api/srd/check-quota`;

    // Делаем запрос к нашему "Охраннику" от имени пользователя
    let quota;
    try {
        const res = await fetch(absoluteUrl, {
            headers: { cookie: context.req.headers.cookie },
        });

        if (!res.ok) {
            throw new Error('Quota check failed');
        }
        quota = await res.json();
    } catch (error) {
        // В случае ошибки проверки квоты, все равно передаем initialPrompt
        return { 
            props: { 
                quota: { hasQuota: false, error: "Could not verify quota." }, 
                initialPrompt 
            } 
        };
    }
    
    // В случае успеха передаем и квоту, и initialPrompt
    return { props: { quota, initialPrompt } };
}



// Это компонент вашей страницы
export default function SrdGeneratorPage({ quota }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const [userInput, setUserInput] = useState(initialPrompt);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLanguageChange = (newLang) => {
        router.push('/tools/srd-generator', '/tools/srd-generator', { locale: newLang });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/srd/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promptText: userInput, locale: locale }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Server responded with an error' }));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();
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
                <title>{`${t.toolsGeneratorSrdTitle} | Sarkhan.dev`}</title>
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

                            {/* Условие: показываем форму ИЛИ сообщение о лимите */}
                            {quota.hasQuota ? (
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
                                            {isLoading ? t.toolsGeneratorButtonLoading : t.toolsGeneratorSrdButton}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)' }}>
                                    <h3 style={{ color: 'var(--color-secondary)' }}>Monthly Limit Reached</h3>
                                    <p>You have used {quota.used} of {quota.limit} SRD generations for this month on the '{quota.plan}' plan.</p>
                                    <p>Please upgrade your plan to continue or wait until next month.</p>
                                </div>
                            )}

                            {error && <p className="form-error" style={{textAlign: 'center', marginTop: '1rem'}}>{error}</p>}

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}