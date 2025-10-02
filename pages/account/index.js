// pages/account/index.js (ВЕРСИЯ С ПАНЕЛЬЮ УПРАВЛЕНИЯ)

import { getSession, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import Icon from '@/components/Icon';
import Link from 'next/link';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: `/${context.locale}/auth/signin?callbackUrl=/${context.locale}/account`,
                permanent: false,
            },
        };
    }
    return { props: { userSession: session } };
}

export default function AccountPage({ userSession }) {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];
    const { data: session } = useSession();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [documents, setDocuments] = useState([]);
    const [quota, setQuota] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchAccountData = async () => {
            setIsLoading(true);
            try {
                const [accountRes, quotaRes] = await Promise.all([
                    fetch('/api/account'),
                    fetch('/api/srd/check-quota')
                ]);

                if (!accountRes.ok || !quotaRes.ok) throw new Error('Failed to fetch data');
                
                const accountData = await accountRes.json();
                const quotaData = await quotaRes.json();
                
                setName(accountData.user.name || '');
                setEmail(accountData.user.email || '');
                setDocuments(accountData.documents || []);
                setQuota(quotaData);
            } catch (err) {
                setError(t.accountLoadError);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccountData();
    }, [t.accountLoadError]);
    
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError('');
        try {
            const response = await fetch('/api/account', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) throw new Error('Failed to update profile');
            setSuccessMessage(t.profileSaveSuccess);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(t.profileSaveError);
        }
    };

    const getAvatarIcon = () => {
        if (!session?.user?.id) return "user";
        const icons = ["userStory", "srd", "methodology", "specialization", "tools"];
        const hash = session.user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return icons[hash % icons.length];
    };

    const handleLanguageChange = (newLang) => {
        router.push('/account', '/account', { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{`${t.accountTitle} | Sarkhan.dev`}</title>
                <style jsx>{`
                    /* === НАЧАЛО ИЗМЕНЕНИЙ: СТИЛИ ДЛЯ ПАНЕЛИ === */
                    .dashboard-panel {
                        background: var(--color-surface);
                        border: 1px solid var(--color-border);
                        border-radius: var(--radius-md);
                        padding: var(--space-xl);
                        box-shadow: var(--shadow-md);
                    }
                    .dashboard-title {
                        text-align: center;
                        margin-top: 0;
                        margin-bottom: var(--space-xxl);
                    }
                    @media (min-width: 768px) {
                        .dashboard-panel {
                            padding: var(--space-xxl);
                        }
                    }
                    /* === КОНЕЦ ИЗМЕНЕНИЙ === */

                    .account-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-xxl); }
                    @media (min-width: 992px) { .account-grid { grid-template-columns: 350px 1fr; align-items: start; } }
                    .card { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-xl); }
                    .profile-card, .documents-card, .plan-card { height: 100%; }
                    .profile-card { display: flex; flex-direction: column; align-items: center; gap: var(--space-lg); }
                    .avatar-placeholder { width: 100px; height: 100px; border-radius: 50%; background: var(--color-bg); border: 2px solid var(--color-primary); display: flex; align-items: center; justify-content: center; color: var(--color-primary); }
                    .avatar-placeholder :global(svg) { width: 50px; height: 50px; }
                    .profile-form { width: 100%; display: flex; flex-direction: column; gap: var(--space-lg); }
                    .form-group { display: flex; flex-direction: column; }
                    label { margin-bottom: var(--space-sm); font-weight: 500; color: var(--color-text-secondary); }
                    input { padding: var(--space-md); background: var(--color-bg); border: 1px solid var(--color-border); color: var(--color-text-primary); border-radius: var(--radius-sm); }
                    input[disabled] { opacity: 0.7; }
                    .form-message { text-align: center; margin-top: var(--space-md); }
                    .form-message.success { color: var(--color-primary); }
                    .form-message.error { color: var(--color-secondary); }
                    .documents-card h3, .plan-card h3 { margin-top: 0; margin-bottom: var(--space-lg); color: var(--color-primary); }
                    .document-list { list-style: none; padding: 0; margin: 0; }
                    .document-item { display: flex; justify-content: space-between; align-items: center; padding: var(--space-md) 0; border-bottom: 1px solid var(--color-border); }
                    .document-item:last-child { border-bottom: none; }
                    .document-item a { color: var(--color-text-primary); text-decoration: none; font-weight: 500; }
                    .document-item a:hover { color: var(--color-primary); }
                    .document-date { font-size: 0.9rem; color: var(--color-text-secondary); }
                    .no-documents { text-align: center; color: var(--color-text-secondary); padding: var(--space-xl); }
                    .plan-info { text-align: center; }
                    .plan-info p { margin: 0 0 var(--space-sm) 0; color: var(--color-text-secondary); }
                    .plan-name { font-size: 1.2rem; font-weight: bold; color: var(--color-heading); text-transform: capitalize; }
                    .usage-bar { width: 100%; background-color: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm); height: 20px; margin: var(--space-md) 0; overflow: hidden; }
                    .usage-bar-fill { height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-secondary)); transition: width 0.5s ease-in-out; }
                    .usage-text { font-weight: 500; }
                `}</style>
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="account" />
            <main className="account-page-main" style={{ padding: 'var(--space-xxl) 0' }}>
                <section id="account-dashboard">
                    <div className="container">
                        {/* === НАЧАЛО ИЗМЕНЕНИЙ: Новый контейнер-панель === */}
                        <div className="dashboard-panel">
                            <h2 className="dashboard-title">{t.accountTitle}</h2>
                            {isLoading ? ( <p style={{ textAlign: 'center' }}>{t.aiSummaryLoading}</p> ) 
                            : error ? ( <p style={{ textAlign: 'center' }} className="form-message error">{error}</p> ) 
                            : (
                                <div className="account-grid">
                                    <div className="profile-and-plan-stack" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxl)'}}>
                                        <div className="card profile-card">
                                            <div className="avatar-placeholder"><Icon name={getAvatarIcon()} /></div>
                                            <form className="profile-form" onSubmit={handleSaveProfile}>
                                                <div className="form-group"><label htmlFor="email">Email</label><input id="email" type="email" value={email} disabled /></div>
                                                <div className="form-group"><label htmlFor="name">{t.profileNameLabel}</label><input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.profileNamePlaceholder} /></div>
                                                <button type="submit" className="btn">{t.profileSaveButton}</button>
                                                {successMessage && <p className="form-message success">{successMessage}</p>}
                                            </form>
                                            <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                                {t.signOutButton}
                                            </button>
                                        </div>
                                        {quota && (
                                            <div className="card plan-card">
                                                <h3>{t.planCardTitle}</h3>
                                                <div className="plan-info">
                                                    <p>{t.planCurrent}</p>
                                                    <p className="plan-name">{quota.plan}</p>
                                                    <p className="usage-text">{t.planUsage.replace('{used}', quota.used).replace('{limit}', quota.limit)}</p>
                                                    <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${(quota.used / quota.limit) * 100}%` }}></div></div>
                                                    <button className="btn btn-secondary" disabled>{t.planChangeButton}</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card documents-card">
                                        <h3>{t.documentsCardTitle}</h3>
                                        {documents.length > 0 ? (
                                            <ul className="document-list">
                                                {documents.map(doc => (
                                                    <li key={doc.id} className="document-item">
                                                        <Link href={`/tools/srd/${doc.id}`}>{doc.title}</Link>
                                                        <span className="document-date">{new Date(doc.createdAt).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="no-documents">
                                                <p>{t.documentsNone}</p>
                                                <Link href="/tools/srd-generator" className="btn">{t.documentsCreateNew}</Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* === КОНЕЦ ИЗМЕНЕНИЙ === */}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}