import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const AiAssistant = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);

  // --- УЛУЧШЕННАЯ ЛОГИКА ЭФФЕКТОВ ---

  // Эффект, который срабатывает только при открытии/закрытии чата
  useEffect(() => {
    if (isOpen) {
      // Устанавливаем приветственное сообщение, только если чат пуст
      if (messages.length === 0) {
        setMessages([
          { role: 'model', parts: [{ text: t?.aiAssistantWelcome || "Здравствуйте! Чем могу помочь?" }] }
        ]);
      }
      // Фокусируемся на поле ввода
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Эффект для авто-прокрутки при появлении новых сообщений
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Эффект для авто-изменения размера поля ввода
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  // Эффект для автоматического расширения окна
  useEffect(() => {
    // Считаем только реальные сообщения (не приветствие)
    const realMessagesCount = messages.filter(m => !(m.role === 'model' && messages.indexOf(m) === 0)).length;
    if (realMessagesCount >= 2 && !isExpanded) {
      setIsExpanded(true);
    }
  }, [messages, isExpanded]);


  const toggleChat = () => setIsOpen(!isOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const historyForAPI = updatedMessages.slice();
      if (historyForAPI.length > 0 && historyForAPI[0].role === 'model') {
          historyForAPI.shift();
      }
      
      const payloadHistory = historyForAPI.length > 0 ? historyForAPI : [userMessage];

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: payloadHistory, locale: t?.locale }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.response }] }]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: t?.aiSummaryError || "Произошла ошибка. Попробуйте позже." }] }]);
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
      <button className={`chat-fab ${isOpen ? 'hidden' : ''}`} onClick={toggleChat} title="AI Assistant">
        <Icon name="ai-sparkle" />
      </button>

      <div className={`chat-overlay ${isExpanded && isOpen ? 'expanded' : ''}`} onClick={toggleExpand}></div>

      <div className={`chat-window ${!isOpen ? 'closed' : ''} ${isExpanded ? 'expanded' : 'compact'}`}>
        <div className="chat-header">
          <h3>ITBAI Assistant</h3>
          <div className="header-controls">
            <button className="chat-control-btn" onClick={toggleExpand} title={isExpanded ? 'Свернуть' : 'Развернуть'}>
                <Icon name={isExpanded ? 'minimize' : 'expand'} />
            </button>
            <button className="chat-control-btn chat-close-btn" onClick={toggleChat} title="Закрыть">&times;</button>
          </div>
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
            placeholder={t?.aiAssistantPlaceholder || "Спросите что-нибудь..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()}>
            {t?.aiAssistantSend || "Отправить"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AiAssistant;
