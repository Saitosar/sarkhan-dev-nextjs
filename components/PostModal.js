// components/PostModal.js
import { useState, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import Icon from './Icon';

const PostModal = ({ post, onClose, t }) => {
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
        body: JSON.stringify({ articleText: post.content }),
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
    <FocusTrap active={!!post} focusTrapOptions={{ onDeactivate: onClose, initialFocus: false }}>
      <div className="modal-overlay active" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close-btn" onClick={onClose}>&times;</button>

          <div className="modal-header">
            <h3 id="modal-title">{post.title}</h3>
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

          <div dangerouslySetInnerHTML={{ __html: post.sanitizedBody || '' }} />
          <br />
          <button className="btn" onClick={onClose}>{t.closeButton}</button>
        </div>
      </div>
    </FocusTrap>
  );
};

export default PostModal;