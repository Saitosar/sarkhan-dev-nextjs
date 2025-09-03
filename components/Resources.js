// components/Resources.js (НОВАЯ ВЕРСИЯ)
import Link from 'next/link';

const ResourcesSection = ({ t }) => {
  return (
    <section id="resources">
      <div className="container">
        <h2>{t.resourcesSectionTitle}</h2>
        <div className="blog-manifest"> {/* Используем тот же стиль, что и в блоге */}
          <h3>{t.resourcesManifestTitle}</h3>
          <p>{t.resourcesManifestText}</p>
          <div className="view-all-container">
            <Link href="/resources" legacyBehavior>
              <a className="btn">{t.resourcesManifestButton}</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;