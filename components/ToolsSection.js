// components/ToolsSection.js (ОБНОВЛЕННЫЙ ФАЙЛ)
import Link from 'next/link';
import Icon from './Icon'; // <-- ДОБАВЛЕН ИМПОРТ Icon

const ToolsSection = ({ t }) => {
  return (
    <section id="tools">
      <div className="container">
        <h2>{t.toolsSectionTitle}</h2>
        <div className="blog-manifest">
          <h3>{t.toolsManifestTitle}</h3>
          <p>{t.toolsManifestText}</p>
          {/* === НАЧАЛО ИЗМЕНЕНИЙ: ДОБАВЛЕНА ИКОНКА === */}
         <div className="tools-manifest-icon"> {/* <-- ИСПОЛЬЗУЕМ НОВЫЙ КЛАСС */}
            <Icon name="tools" /> 
          </div>
          {/* === КОНЕЦ ИЗМЕНЕНИЙ === */}
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