// pages/account/index.js (ФИНАЛЬНАЯ ВЕРСИЯ С CSS-МОДУЛЕМ)

import { getSession, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/AccountPage.module.css'; // Наш импортированный CSS-модуль

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

    const avatarUrl = session?.user?.id 
        ? `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${session.user.id}`
        : '/default-avatar.svg';

    const handleLanguageChange = (newLang) => {
        router.push('/account', '/account', { locale: newLang });
    };

    return (
        <>
            <Head>
                <title>{`${t.accountTitle} | Sarkhan.dev`}</title>
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="account" />
            <main className="account-page-main" style={{ padding: 'var(--space-xxl) 0' }}>
                <section id="account-dashboard">
                    <div className="container">
                        {/* === НАЧАЛО ИЗМЕНЕНИЙ: Применяем классы из styles === */}
                        <div className={styles.dashboardPanel}>
                            <h2 className={styles.dashboardTitle}>{t.accountTitle}</h2>
                            {isLoading ? ( <p style={{ textAlign: 'center' }}>{t.aiSummaryLoading}</p> ) 
                            : error ? ( <p className={`${styles.formMessage} ${styles.error}`}>{error}</p> ) 
                            : (
                                <div className={styles.accountGrid}>
                                    <div className={styles.profileAndPlanStack}>
                                        <div className={styles.profileCard}>
                                            <div className={styles.avatarPlaceholder}>
                                                <Image 
                                                    src={avatarUrl}
                                                    alt="User Avatar"
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                            <form className={styles.profileForm} onSubmit={handleSaveProfile}>
                                                <div className={styles.formGroup}>
                                                    <label htmlFor="email">Email</label>
                                                    <input id="email" type="email" value={email} disabled />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <label htmlFor="name">{t.profileNameLabel}</label>
                                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.profileNamePlaceholder} />
                                                </div>
                                                <button type="submit" className="btn">{t.profileSaveButton}</button>
                                                {successMessage && <p className={`${styles.formMessage} ${styles.success}`}>{successMessage}</p>}
                                            </form>
                                            <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                                                {t.signOutButton}
                                            </button>
                                        </div>
                                        
                                        {quota && (
                                            <div className={styles.planCard}>
                                                <h3 className={styles.cardTitle}>{t.planCardTitle}</h3>
                                                <div className={styles.planInfo}>
                                                    <p>{t.planCurrent}</p>
                                                    <p className={styles.planName}>{quota.plan}</p>
                                                    <p className={styles.usageText}>{t.planUsage.replace('{used}', quota.used).replace('{limit}', quota.limit)}</p>
                                                    <div className={styles.usageBar}><div className={styles.usageBarFill} style={{ width: `${(quota.used / quota.limit) * 100}%` }}></div></div>
                                                    <button className="btn btn-secondary" disabled>{t.planChangeButton}</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.documentsCard}>
                                        <h3 className={styles.cardTitle}>{t.documentsCardTitle}</h3>
                                        {documents.length > 0 ? (
                                            <ul className={styles.documentList}>
                                                {documents.map(doc => (
                                                    <li key={doc.id} className={styles.documentItem}>
                                                        <Link href={`/tools/srd/${doc.id}`}>{doc.title}</Link>
                                                        <span className={styles.documentDate}>{new Date(doc.createdAt).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className={styles.noDocuments}>
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