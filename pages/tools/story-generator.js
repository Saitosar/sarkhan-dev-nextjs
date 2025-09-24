// pages/tools.js (YENİLƏNMİŞ VƏ BİRLƏŞDİRİLMİŞ KARTLARLA VERSİYA)
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react'; // Fragment-i sildik, çünki artıq lazım deyil
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import { translations } from '@/utils/translations';

export default function StoryGeneratorPage() {
    const router = useRouter();
    const { locale } = router;
    const t = translations[locale] || translations['az'];

    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [copySuccess, setCopySuccess] = useState('');
    const [introText, setIntroText] = useState(''); // <-- PROBLEM 3: Giriş mətni üçün yeni state

    const handleLanguageChange = (newLang) => {
    router.push('/tools/story-generator', '/tools/story-generator', { locale: newLang });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResult(null);
        setIntroText(''); // <-- Giriş mətnini təmizləyirik

        try {
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userInput, locale }),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            setResult(data);

            // === PROBLEM 3 HƏLLİ: Nəticəyə əsasən giriş mətnini təyin edirik ===
            if (data.stories && data.stories.length > 0) {
              if (data.stories.length === 1) {
                setIntroText(t.toolsGeneratorIntroSingle);
              } else {
                setIntroText(t.toolsGeneratorIntroMultiple.replace('{n}', data.stories.length));
              }
            }
            // ==========================================================

        } catch (err) {
            setError(t.toolsGeneratorError);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (textToCopy, index) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopySuccess(index);
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <>
            <Head>
                <title>{`${t.navTools} | Sarkhan.dev`}</title>
                <meta name="description" content={t.toolsManifestText} />
            </Head>
            <div id="background-animation"></div>
            <Header t={t} lang={locale} setLang={handleLanguageChange} activeSection="tools" pathname={router.pathname} />
            <main className="tools-page-main">
                <section id="tools-archive">
                    <div className="container">
                        <div className="tool-card">
                            <div className="tool-card-header">
                                <h2>{t.toolsGeneratorTitle}</h2>
                                <p>{t.toolsGeneratorDescription}</p>
                            </div>
                            <form onSubmit={handleGenerate}>
                                <textarea
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder={t.toolsGeneratorPlaceholder}
                                    disabled={isLoading}
                                />
                                <div className="view-all-container">
                                     <button type="submit" className="btn" disabled={isLoading || !userInput.trim()}>
                                        {isLoading ? t.toolsGeneratorButtonLoading : t.toolsGeneratorSrdButton}
                                    </button>
                                </div>
                            </form>
                            
                            {error && <p className="form-error" style={{textAlign: 'center', marginTop: '1rem'}}>{error}</p>}

                            {/* === PROBLEM 3 HƏLLİ: Giriş mətni burada göstərilir === */}
                            {introText && <p className="tool-intro-text">{introText}</p>}

                            {result && result.stories && (
                                <div className="tool-results-container">
                                
                                    {/* === PROBLEM 4 HƏLLİ: BİRLƏŞDİRİLMİŞ KART === */}
                                    {result.stories.map((story, index) => (
                                        <div key={index} className="tool-result-card combined-story-card">
                                            
                                            {/* Story Hissəsi */}
                                            <div className="tool-result-header">
                                                <h3>{`${t.toolsGeneratorUserStoryTitle} ${index + 1}`}</h3>
                                                 <button type="button" className="btn-copy" onClick={() => handleCopy(story.userStory, `us-${index}`)}>
                                                    <Icon name="contact" />
                                                    <span>{copySuccess === `us-${index}` ? t.toolsGeneratorCopySuccess : t.toolsGeneratorCopyButton}</span>
                                                </button>
                                            </div>
                                            {/* Yeni ".story-text" klassı əlavə edildi */}
                                            <p className="tool-result-content story-text">{story.userStory}</p>

                                            {/* Vizual ayırıcı */}
                                            <hr className="story-divider" />

                                            {/* AC Hissəsi */}
                                            <div className="tool-result-header">
                                                <h3>{t.toolsGeneratorACTitle}</h3>
                                                 <button type="button" className="btn-copy" onClick={() => handleCopy(story.acceptanceCriteria, `ac-${index}`)}>
                                                    <Icon name="contact" />
                                                    <span>{copySuccess === `ac-${index}` ? t.toolsGeneratorCopySuccess : t.toolsGeneratorCopyButton}</span>
                                                </button>
                                            </div>
                                            {/* Yeni ".criteria-pre" klassı əlavə edildi */}
                                            <pre className="tool-result-content criteria-pre">{story.acceptanceCriteria}</pre>
                                        </div>
                                    ))}
                                    {/* === DƏYİŞİKLİKLƏRİN SONU === */}

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