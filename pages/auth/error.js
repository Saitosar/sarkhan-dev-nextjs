// pages/auth/error.js
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';

export default function AuthErrorPage() {
    const { locale, query } = useRouter();
    const t = translations[locale] || translations['az'];

    // Простое сообщение об ошибке
    const errorMessages = {
        Configuration: "Проблема с конфигурацией сервера.",
        AccessDenied: "Доступ запрещен.",
        Verification: "Токен для входа недействителен или истек.",
        Default: "Произошла ошибка при попытке входа."
    };

    const error = query.error;
    const message = error && errorMessages[error] ? errorMessages[error] : errorMessages.Default;

    return (
        <>
            <Header t={t} lang={locale} setLang={() => {}} />
            <main>
                <section style={{ textAlign: 'center', paddingTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
                    <div className="container">
                        <h1>Ошибка входа</h1>
                        <p style={{color: 'var(--color-secondary)'}}>{message}</p>
                        <p>Пожалуйста, попробуйте запросить новую ссылку для входа.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}