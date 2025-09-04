// components/ToolsSection.js (НОВЫЙ ФАЙЛ)
import Link from 'next/link';

const ToolsSection = ({ t }) => {
  return (
    <section id="tools">
      <div className="container">
        <h2>{t.toolsSectionTitle}</h2>
        <div className="blog-manifest"> {/* Используем тот же стиль для консистентности */}
          <h3>{t.toolsManifestTitle}</h3>
          <p>{t.toolsManifestText}</p>
          <div className="view-all-container">
            <Link href="/tools" legacyBehavior>
              <a className="btn">{t.toolsManifestButton}</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;