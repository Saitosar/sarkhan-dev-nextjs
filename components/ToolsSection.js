// components/ToolsSection.js (ФИНАЛЬНАЯ ИСПРАВЛЕННАЯ ВЕРСИЯ)
import Link from 'next/link';
import Icon from './Icon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ToolsSection = ({ t }) => {
  const { status } = useSession();
  const router = useRouter();
  const { locale } = router; // Получаем текущий язык из роутера

  // Единый обработчик клика для карточки SRD
  const handleSrdCardClick = (e) => {
    e.preventDefault();
    const targetUrl = `/${locale}/tools/srd-generator`;

    // Если пользователь авторизован, просто переходим на страницу генератора
    if (status === 'authenticated') {
      router.push(targetUrl);
    } else {
      // Если не авторизован, перенаправляем на страницу входа,
      // сохраняя язык и адрес для возврата
      router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <section id="tools">
      <div className="container">
        <h2>{t.toolsSectionTitle}</h2>
        <div className="tools-grid">

          {/* Карточка 1: Генератор User Story (остается без изменений) */}
          <Link href="/tools/story-generator" passHref legacyBehavior>
            <a className="tool-card-promo">
              <div className="tool-card-promo-icon">
                <Icon name="userStory" />
              </div>
              <h3>{t.toolsGeneratorTitle}</h3>
              <p>{t.toolsGeneratorDescription}</p>
              <div className="view-all-container">
                  <span className="btn">{t.toolsGeneratorButton}</span>
              </div>
            </a>
          </Link>

          {/* Карточка 2: Генератор SRD (с новой, надежной логикой) */}
          {/* Убрали Link, используем простой a тег с onClick */}
          <a href={`/${locale}/tools/srd-generator`} onClick={handleSrdCardClick} className="tool-card-promo">
            <div className="tool-card-promo-icon">
              <Icon name="srd" />
            </div>
            <h3>{t.toolsGeneratorSrdTitle}</h3>
            <p>{t.toolsGeneratorSrdDescription}</p>
            <div className="view-all-container">
              <span className="btn">{t.toolsGeneratorButton}</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ToolsSection;