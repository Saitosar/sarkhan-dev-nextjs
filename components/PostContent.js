// components/PostContent.js (НОВЫЙ ФАЙЛ)
import { useState, useEffect } from 'react';
import Icon from './Icon';
import Link from 'next/link';

const PostContent = ({ post, t, locale }) => {
    const [summary, setSummary] = useState('');
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);

    useEffect(() => { setSummary(''); }, [post]);

    const handleGetSummary = async () => {
        if (!post || !post.content) return;
        setIsLoadingSummary(true);
        setSummary('');
        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articleText: post.content, locale: locale }),
            });
            if (!response.ok) throw new Error('Failed to fetch summary');
            const data = await response.json();
            setSummary(data.summary);
        } catch (error) {
            console.error(error);
            setSummary(t.aiSummaryError || "Не удалось получить краткое содержание. Попробуйте позже.");
        } finally {
            setIsLoadingSummary(false);
        }
    };

    if (!post) return null;

    return (
        <div className="container">
            <div className="post-content-wrapper">
                <h1 className="post-title">{post.title}</h1>

                <div className="ai-summary-container">
                    <button className="btn-ai-summary" onClick={handleGetSummary} disabled={isLoadingSummary} title={t.aiSummaryButton}>
                        <Icon name="ai-sparkle" />
                        <span>{isLoadingSummary ? t.aiSummaryLoading : t.aiSummaryButton}</span>
                    </button>
                </div>

                {summary && (
                    <div className="summary-result">
                        <p>{summary}</p>
                    </div>
                )}

                <div className="post-body" dangerouslySetInnerHTML={{ __html: post.sanitizedBody || '' }} />

                <div className="view-all-container">
                    <Link href="/blog/page/1" legacyBehavior>
                      <a className="btn">{t.backToBlog}</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostContent;