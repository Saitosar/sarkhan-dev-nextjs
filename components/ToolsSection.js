// components/ToolsSection.js
import Link from 'next/link';
import Icon from './Icon';
import { useSession, signIn } from 'next-auth/react'; // <-- Импортируем хуки для сессии
import { useRouter } from 'next/router'; // <-- Импортируем роутер

const ToolsSection = ({ t }) => {
  const { data: session, status } = useSession(); // Получаем статус сессии
  const router = useRouter(); // Получаем доступ к роутеру

  // Функция для обработки клика на карточку SRD
  const handleSrdCardClick = (e) => {
    // Если пользователь не авторизован
    if (status !== 'authenticated') {
      e.preventDefault(); // Отменяем стандартный переход по ссылке
      signIn(null, { callbackUrl: '/tools/srd-generator' }); // Отправляем на страницу входа
    }
    // Если пользователь авторизован, ничего не делаем, и Link сработает как обычно
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

          {/* Карточка 2: Генератор SRD (с новой логикой) */}
          <Link href="/tools/srd-generator" passHref legacyBehavior>
            <a className="tool-card-promo" onClick={handleSrdCardClick}>
              <div className="tool-card-promo-icon">
                <Icon name="srd" />
              </div>
              <h3>{t.toolsGeneratorSrdTitle}</h3>
              <p>{t.toolsGeneratorSrdDescription}</p>
              <div className="view-all-container">
                <span className="btn">{t.toolsGeneratorButton}</span>
              </div>
            </a>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default ToolsSection;