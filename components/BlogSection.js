// components/BlogSection.js (НОВАЯ ВЕРСЯ)
import Link from 'next/link';

const BlogSection = ({ t }) => {
  return (
    <section id="blog">
      <div className="container">
        <h2>{t.blogSectionTitle}</h2>
        <div className="blog-manifest">
          <h3>{t.blogManifestTitle}</h3>
          <p>{t.blogManifestText}</p>
          <div className="blog-manifest-tags">
            {t.blogManifestTags && t.blogManifestTags.map(tag => (
              <span key={tag} className="skill-tag">{tag}</span>
            ))}
          </div>
          <div className="view-all-container">
            <Link href="/blog/page/1" legacyBehavior>
              <a className="btn">{t.blogManifestButton}</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;