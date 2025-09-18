// pages/auth/verify-request.js
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VerifyRequest() {
    const { locale } = useRouter();
    const t = translations[locale] || translations['az'];

    return (
        <>
            <Header t={t} lang={locale} setLang={() => {}} />
            <main>
                <section style={{ textAlign: 'center', paddingTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
                    <div className="container">
                        <h1>{t.verifyTitle || "Check your email"}</h1>
                        <p>{t.verifySubtitle || "A sign in link has been sent to your email address."}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}