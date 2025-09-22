// components/ToolsSection.js
import Link from 'next/link';
import Icon from './Icon';

const ToolsSection = ({ t }) => {
  return (
    <section id="tools">
      <div className="container">
        <h2>{t.toolsSectionTitle}</h2>

        {/* Новый контейнер для двух карточек */}
        <div className="tools-grid">

          {/* Карточка 1: Генератор User Story */}
          <div className="tool-card-promo">
            <div className="tool-card-promo-icon">
              <Icon name="userStory" />
            </div>
            <h3>{t.toolsGeneratorTitle}</h3>
            <p>{t.toolsGeneratorDescription}</p>
            <div className="view-all-container">
              <Link href="/tools/story-generator" legacyBehavior>
                <a className="btn">{t.toolsGeneratorButton}</a>
              </Link>
            </div>
          </div>

          {/* Карточка 2: Генератор SRD */}
          <div className="tool-card-promo">
            <div className="tool-card-promo-icon">
              <Icon name="srd" />
            </div>
            <h3>{t.toolsGeneratorSrdTitle}</h3>
            <p>{t.toolsGeneratorSrdDescription}</p>
            <div className="view-all-container">
              <Link href="/tools/srd-generator" legacyBehavior>
                <a className="btn">{t.toolsGeneratorSrdButton}</a>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ToolsSection;