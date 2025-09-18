// pages/auth/signin.js
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react'; // <-- 1. Импортируем useState

export default function SignIn() {
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale] || translations['az'];
  const [error, setError] = useState(''); // <-- 2. Добавляем состояние для ошибок

  const handleLanguageChange = (newLang) => {
    router.push('/auth/signin', '/auth/signin', { locale: newLang });
  };

  // ↓↓↓ 3. ПОЛНОСТЬЮ ЗАМЕНЯЕМ ФУНКЦИЮ handleSubmit ↓↓↓
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Сбрасываем ошибку
    const email = event.currentTarget.email.value;

    // Отправляем письмо, НО отключаем автоматический редирект
    const result = await signIn("email", { email, redirect: false, callbackUrl: '/' });

    // Если next-auth вернул URL (значит, всё хорошо), делаем редирект вручную
    if (result.ok && result.url) {
      router.push('/auth/verify-request');
    } else {
      // Если возникла ошибка, показываем её
      setError(result.error || "Произошла неизвестная ошибка.");
    }
  };

  return (
    <>
        <Header t={t} lang={locale} setLang={handleLanguageChange} />
        <main>
            <section style={{ textAlign: 'center', paddingTop: '100px', minHeight: 'calc(100vh - 200px)' }}>
                <div className="container">
                    <h1>{t.signInTitle || "Sign In"}</h1>
                    <p style={{ maxWidth: '400px', margin: '0 auto 2rem auto', color: 'var(--color-text-secondary)' }}>
                        {t.signInSubtitle}
                    </p>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
                        <div className="form-group">
                            <label htmlFor="email-input" style={{ display: 'none' }}>Email</label>
                            <input
                                id="email-input"
                                name="email"
                                type="email"
                                placeholder={t.formEmailPlaceholder || "Your email"}
                                required
                                style={{ width: '100%', padding: '1rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                            />
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%' }}>
                            {t.signInButton || "Send Magic Link"}
                        </button>
                        {/* 4. Отображаем ошибку, если она есть */}
                        {error && <p style={{color: 'var(--color-secondary)', marginTop: '1rem'}}>{error}</p>}
                    </form>
                </div>
            </section>
        </main>
        <Footer />
    </>
  );
}