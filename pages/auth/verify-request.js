// pages/auth/verify-request.js
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VerifyRequest() {
    const router = useRouter(); // Добавляем router
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    // 1. ДОБАВЛЯЕМ ФУНКЦИЮ СМЕНЫ ЯЗЫКА
    const handleLanguageChange = (newLang) => {
        router.push('/auth/verify-request', '/auth/verify-request', { locale: newLang });
    };

    return (
        <>
            {/* 2. ПЕРЕДАЕМ НОВУЮ ФУНКЦИЮ В HEADER */}
            <Header t={t} lang={locale} setLang={handleLanguageChange} />
            <main>
                <section style={{ textAlign: 'center', paddingTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
                    <div className="container">
                        <h1>{t.verifyTitle || "Check your email"}</h1>
                        {/* 3. ДОБАВЛЯЕМ СТИЛЬ ДЛЯ ЦЕНТРИРОВАНИЯ ПАРАГРАФА */}
                        <p style={{ maxWidth: '450px', margin: '0 auto' }}>
                            {t.verifySubtitle || "A sign in link has been sent to your email address."}
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}