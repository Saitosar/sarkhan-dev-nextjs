// components/AiAssistant.js
import { useState } from 'react';
import Icon from './Icon';

const AiAssistant = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Плавающая кнопка для открытия чата */}
      <button className="chat-fab" onClick={toggleChat} title="AI Assistant">
        <Icon name="ai-sparkle" />
      </button>

      {/* Окно чата, которое появляется при isOpen === true */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>ITBAI Assistant</h3>
            <button className="chat-close-btn" onClick={toggleChat}>&times;</button>
          </div>
          <div className="chat-body">
            {/* Здесь будет история сообщений */}
            <div className="message assistant-message">
              <p>{t.aiAssistantWelcome || "Здравствуйте! Чем могу помочь вам сегодня?"}</p>
            </div>
          </div>
          <div className="chat-footer">
            <input type="text" placeholder={t.aiAssistantPlaceholder || "Спросите что-нибудь..."} />
            <button>{t.aiAssistantSend || "Отправить"}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;