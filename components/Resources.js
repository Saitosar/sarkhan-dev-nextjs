// components/Resources.js (ОБНОВЛЕННАЯ ВЕРСИЯ С ИКОНКОЙ)
import Link from 'next/link';
import Icon from './Icon'; // <-- Добавляем импорт Icon

const ResourcesSection = ({ t }) => {
  return (
    <section id="resources">
      <div className="container">
        <h2>{t.resourcesSectionTitle}</h2>
        <div className="blog-manifest"> 
          <h3>{t.resourcesManifestTitle}</h3>
          <p>{t.resourcesManifestText}</p>
          
          {/* === НАЧАЛО ИЗМЕНЕНИЙ: ДОБАВЛЕНА ИКОНКА === */}
          <div className="resource-manifest-icon">
            <Icon name="resources" /> {/* Используем иконку "file" или любую другую, которая больше нравится */}
          </div>
          {/* === КОНЕЦ ИЗМЕНЕНИЙ === */}

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