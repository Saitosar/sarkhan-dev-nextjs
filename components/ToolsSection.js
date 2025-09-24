// components/ToolsSection.js (ФИНАЛЬНАЯ ВЕРСИЯ С ЕДИНЫМ ДИЗАЙНОМ)
import Link from 'next/link';
import Icon from './Icon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ToolsSection = ({ t }) => {
  const { status } = useSession();
  const router = useRouter();
  const { locale } = router;

  // Единый обработчик клика для карточки SRD
  const handleSrdCardClick = (e) => {
    e.preventDefault();
    const targetUrl = `/${locale}/tools/srd-generator`;

    if (status === 'authenticated') {
      router.push(targetUrl);
    } else {
      router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <section id="tools">
      <div className="container">
        <h2>{t.toolsSectionTitle}</h2>
        <div className="tools-grid">

          {/* Карточка 1: Генератор User Story */}
          <Link href="/tools/story-generator" passHref legacyBehavior>
            <a className="resource-card"> {/* Используем тот же класс, что и на странице /tools */}
              <div className="resource-icon-wrapper">
                <Icon name="userStory" />
              </div>
              <h3>{t.toolsGeneratorTitle}</h3>
              <hr className="resource-divider" />
              <p style={{flexGrow: 1}}>{t.toolsGeneratorDescription}</p>
              <div className="view-all-container" style={{marginTop: 'auto'}}>
                  <span className="btn">{t.toolsGeneratorButton}</span>
              </div>
            </a>
          </Link>

          {/* Карточка 2: Генератор SRD */}
          <a href={`/${locale}/tools/srd-generator`} onClick={handleSrdCardClick} className="resource-card">
            <div className="resource-icon-wrapper">
              <Icon name="srd" />
            </div>
            <h3>{t.toolsGeneratorSrdTitle}</h3>
            <hr className="resource-divider" />
            <p style={{flexGrow: 1}}>{t.toolsGeneratorSrdDescription}</p>
            <div className="view-all-container" style={{marginTop: 'auto'}}>
              <span className="btn">{t.toolsGeneratorButton}</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ToolsSection;