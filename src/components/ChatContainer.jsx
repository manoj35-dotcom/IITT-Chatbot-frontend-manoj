import React from 'react';

function ChatContainer({ messages, loading, language, chatEndRef }) {
  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <div className="welcome-message">
          <h2>Welcome to Institute ChatBot! 👋</h2>
          <p>
            {language === 'en' && 'Ask me anything about the institute'}
            {language === 'es' && 'Pregúntame cualquier cosa sobre el instituto'}
            {language === 'fr' && 'Posez-moi toute question sur l\'institut'}
            {language === 'de' && 'Fragen Sie mich alles über das Institut'}
            {language === 'hi' && 'संस्थान के बारे में मुझसे कोई भी सवाल पूछें'}
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">
              {message.text}
              <div className="message-time">{message.timestamp}</div>
            </div>
          </div>
        ))
      )}
      
      {loading && (
        <div className="message bot">
          <div className="loading-bubble">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}
      
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatContainer;
