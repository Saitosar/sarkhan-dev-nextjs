// pages/auth/signin.js
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import { translations } from '@/utils/translations';
import Header from '@/components/Header'; // Подключаем компоненты для единого стиля
import Footer from '@/components/Footer';

export default function SignIn() {
  const { locale, query } = useRouter();
  const t = translations[locale] || translations['az'];

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    signIn("resend", { email, redirect: true, callbackUrl: '/' });
  };

  return (
    <>
        <Header t={t} lang={locale} setLang={() => {}} />
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
                    </form>
                </div>
            </section>
        </main>
        <Footer />
    </>
  );
}