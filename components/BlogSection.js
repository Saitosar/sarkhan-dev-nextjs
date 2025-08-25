// components/BlogSection.js
import { useState, useRef } from 'react';
import Link from 'next/link';
import PostModal from './PostModal'; // <-- 1. ИМПОРТ ИЗМЕНЕН

const BlogSection = ({ t, articles }) => { // Оставим articles здесь, т.к. это пропс
  const [selectedPost, setSelectedPost] = useState(null); // <-- 2. ПЕРЕИМЕНОВАНО
  const triggerRef = useRef(null);

  const openModal = (post, e) => { // <-- 3. ПЕРЕИМЕНОВАНО
    triggerRef.current = e.currentTarget;
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <section id="blog">
        <div className="container">
          <h2>{t.blogSectionTitle}</h2>
          <div className="blog-grid">
            {Array.isArray(articles) && articles.map(post => ( // <-- 4. ПЕРЕИМЕНОВАНО
              post ? (
                <div
                  key={post.id}
                  className="blog-card"
                  onClick={(e) => openModal(post, e)}
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && openModal(post, e)}
                >
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="btn">{t.readMore}</span>
                </div>
              ) : null
            ))}
            {(!articles || articles.length === 0) && <p>Hələ yazı yoxdur.</p>}
          </div>

          <div className="view-all-container">
            <Link href="/blog" legacyBehavior>
              <a className="btn">{t.viewAllArticles}</a>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ИСПОЛЬЗУЕМ PostModal */}
      <PostModal post={selectedPost} onClose={closeModal} t={t} />
    </>
  );
};

export default BlogSection;