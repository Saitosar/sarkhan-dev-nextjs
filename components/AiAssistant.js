import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import Image from 'next/image';

const AiAssistant = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cpuLoad, setCpuLoad] = useState(25); // Для HUD
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);

  // Эффект "нагрузки" на CPU во время ответа
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCpuLoad(Math.floor(Math.random() * (95 - 60 + 1) + 60));
      }, 500);
    } else {
      setCpuLoad(Math.floor(Math.random() * (35 - 15 + 1) + 15));
    }
    return () => clearInterval(interval);
  }, [isLoading]);


  useEffect(() => {
    const conversationLength = messages.filter(m => m.role === 'user' || m.role === 'model').length;
    if (conversationLength > 3 && !isExpanded) {
      setIsExpanded(true);
    }
  }, [messages, isExpanded]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: 'model', parts: [{ text: t.aiAssistantWelcome || "Здравствуйте! Чем могу помочь вам сегодня?" }] }
      ]);
    }
  }, [isOpen, messages.length, t.aiAssistantWelcome]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  
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
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    const newMessagesForUI = [...messages, userMessage];
    
    setMessages(newMessagesForUI);
    setUserInput('');
    setIsLoading(true);

    try {
      const historyForAPI = newMessagesForUI.slice();
      if (historyForAPI.length > 0 && historyForAPI[0].role === 'model') {
          historyForAPI.shift();
      }
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
      <button className={`chat-fab ${isOpen ? 'hidden' : ''}`} onClick={toggleChat} title="AI Assistant">
        <img src="/assets/itbai-core.png" alt="Open AI Assistant" />
      </button>

      <div className={`chat-overlay ${isExpanded && isOpen ? 'expanded' : ''}`} onClick={toggleExpand}></div>

      <div className={`chat-window ${!isOpen ? 'closed' : ''} ${isExpanded ? 'expanded' : 'compact'}`}>
        <div className="chat-header">
          <div className="chat-header-title">
            <img 
                src="/assets/itbai-core.png" 
                alt="ITBAI AI Core" 
                className={`chat-header-avatar ${isLoading ? 'thinking' : ''}`} 
            />
            <h3>ITBAI Assistant</h3>
          </div>

          <div className="chat-status-indicators">
            <span><span className="status-light"></span>ACTIVE</span>
            <span>CPU: {cpuLoad}%</span>
          </div>

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
            placeholder={t.aiAssistantPlaceholder || "Введите команду..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()}>
            {t.aiAssistantSend || "Enter"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AiAssistant;
