// components/BlogSection.js
import { useState, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import Link from 'next/link'; // <<< 1. ИМПОРТИРУЕМ LINK

const BlogSection = ({ t, articles }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const triggerRef = useRef(null);

  const openModal = (article, e) => {
    triggerRef.current = e.currentTarget;
    setSelectedArticle(article);
  };
  const closeModal = () => {
    setSelectedArticle(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <section id="blog">
        <div className="container">
          <h2>{t.blogSectionTitle}</h2>
          <div className="blog-grid">
            {Array.isArray(articles) && articles.map(article => (
              article ? (
                <div
                  key={article.id}
                  className="blog-card"
                  onClick={(e) => openModal(article, e)}
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && openModal(article, e)}
                >
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="btn">{t.readMore}</span>
                </div>
              ) : null
            ))}
            {(!articles || articles.length === 0) && <p>Hələ yazı yoxdur.</p>}
          </div>

          {/* ===== 2. НАЧАЛО ИЗМЕНЕНИЙ: ДОБАВЛЯЕМ КНОПКУ ===== */}
          <div className="view-all-container">
            <Link href="/blog" legacyBehavior>
              <a className="btn">{t.viewAllArticles}</a>
            </Link>
          </div>
          {/* ===== КОНЕЦ ИЗМЕНЕНИЙ ===== */}

        </div>
      </section>

      {selectedArticle && (
        <FocusTrap active={!!selectedArticle} focusTrapOptions={{ onDeactivate: closeModal, initialFocus: false }}>
          <div className="modal-overlay active" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
              <h3 id="modal-title">{selectedArticle.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.sanitizedBody || '' }} />
              <br />
              <button className="btn" onClick={closeModal}>{t.closeButton}</button>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
};

export default BlogSection;