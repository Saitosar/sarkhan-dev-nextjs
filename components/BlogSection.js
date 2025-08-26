// components/BlogSection.js (ФИНАЛЬНАЯ ВЕРСИЯ)
import { useState, useRef } from 'react';
import Link from 'next/link';
import PostModal from './PostModal';
import ClientOnly from './ClientOnly';

const BlogSection = ({ t, articles }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const triggerRef = useRef(null);

  const openModal = (post, e) => {
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
            {Array.isArray(articles) && articles.map(post => (
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
      <ClientOnly>
        <PostModal post={selectedPost} onClose={closeModal} t={t} />
      </ClientOnly>
    </>
  );
};

export default BlogSection;