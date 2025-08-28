import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const AiAssistant = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Новое состояние для режима окна
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);

  // Автоматическое расширение окна после 3 сообщений
  useEffect(() => {
    if (messages.length > 3 && !isExpanded) {
      setIsExpanded(true);
    }
  }, [messages, isExpanded]);

  // Приветственное сообщение при первом открытии
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: 'model', parts: [{ text: t.aiAssistantWelcome || "Здравствуйте! Чем могу помочь вам сегодня?" }] }
      ]);
    }
  }, [isOpen, messages.length, t.aiAssistantWelcome]);

  // Авто-прокрутка
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Фокус и авто-изменение размера textarea
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isOpen, userInput]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    const newMessagesForUI = [...messages, userMessage];
    
    setMessages(newMessagesForUI);
    setUserInput('');
    setIsLoading(true);

    try {
      // --- НАДЕЖНОЕ ИСПРАВЛЕНИЕ ЗДЕСЬ ---
      // Создаем чистую историю для API.
      // Просто отбрасываем самое первое сообщение, если оно от модели.
      const historyForAPI = newMessagesForUI.slice(); // Копируем массив
      if (historyForAPI.length > 0 && historyForAPI[0].role === 'model') {
          historyForAPI.shift(); // Удаляем первый элемент
      }
      
      // Если после фильтрации история пуста (например, только что отправили первое сообщение),
      // то отправляем массив только с этим сообщением.
      const payloadHistory = historyForAPI.length > 0 ? historyForAPI : [userMessage];

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: payloadHistory, locale: t.locale }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.response }] }]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: t.aiSummaryError || "Произошла ошибка. Попробуйте позже." }] }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button className="chat-fab" onClick={toggleChat} title="AI Assistant">
        <Icon name="ai-sparkle" />
      </button>

      <div className={`chat-window ${!isOpen ? 'closed' : ''}`}>
        <div className="chat-header">
          <h3>ITBAI Assistant</h3>
          <button className="chat-close-btn" onClick={toggleChat}>&times;</button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role === 'model' ? 'assistant-message' : 'user-message'}`}>
              <p>{msg.parts[0].text}</p>
            </div>
          ))}
           {isLoading && (
            <div className="message assistant-message">
              <p>...</p>
            </div>
          )}
        </div>
        <form className="chat-footer" onSubmit={handleSendMessage}>
          <textarea
            ref={textareaRef}
            placeholder={t.aiAssistantPlaceholder || "Спросите что-нибудь..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()}>
            {t.aiAssistantSend || "Отправить"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AiAssistant;
