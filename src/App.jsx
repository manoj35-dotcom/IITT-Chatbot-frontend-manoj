import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ChatContainer from './components/ChatContainer';
import LanguageSwitcher from './components/LanguageSwitcher';
import HistoryModal from './components/HistoryModal';
import PYQsBox from './components/PYQsBox';
import TeacherFeedback from './components/TeacherFeedback';
import TextToSpeech from './components/TextToSpeech';
import { saveToLocalStorage, loadFromLocalStorage, deleteFromLocalStorage } from './utils/localStorage';
import { sendMessage } from './utils/api';

const languages = {
  en: { placeholder: 'Ask your question here...', welcome: 'Welcome to Institute ChatBot!', send: 'Send' },
  es: { placeholder: '¡Haz tu pregunta aquí!', welcome: '¡Bienvenido al Chatbot del Instituto!', send: 'Enviar' },
  fr: { placeholder: 'Posez votre question ici...', welcome: 'Bienvenue à Institut ChatBot!', send: 'Envoyer' },
  de: { placeholder: 'Stellen Sie Ihre Frage hier...', welcome: 'Willkommen bei Institut ChatBot!', send: 'Senden' },
  hi: { placeholder: 'अपना सवाल यहां पूछें...', welcome: 'Institute ChatBot में स्वागत है!', send: 'भेजें' }
};

function App() {
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('en');
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const chatEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = loadFromLocalStorage('chatMessages');
    const savedLanguage = loadFromLocalStorage('language');
    const savedHistory = loadFromLocalStorage('chatHistory');
    
    if (savedMessages) setMessages(savedMessages);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedHistory) setChatHistory(savedHistory);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage('chatMessages', messages);
  }, [messages]);

  // Save language to localStorage
  useEffect(() => {
    saveToLocalStorage('language', language);
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Add to history
    if (!chatHistory.includes(userMessage)) {
      setChatHistory(prev => [...prev, userMessage]);
      saveToLocalStorage('chatHistory', [...chatHistory, userMessage]);
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await sendMessage(userMessage, language);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I could not process your request. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    deleteFromLocalStorage('chatMessages');
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    deleteFromLocalStorage('chatHistory');
  };

  const handleExportHistory = () => {
    const historyText = chatHistory.join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(historyText));
    element.setAttribute('download', 'chat_history.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLoadFromHistory = (message) => {
    handleSendMessage(message);
    setShowHistory(false);
  };

  return (
    <div className="app">
      {/* Animated Background Bubbles */}
      <div className="bubble-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      <div className="chatbot-container">
        {/* Header */}
        <div className="header">
          <h1>Institute Portal</h1>
          <div className="header-controls">
            <LanguageSwitcher 
              language={language} 
              onLanguageChange={setLanguage}
            />
            {activeTab === 'chat' && (
              <>
                <button 
                  className="history-btn" 
                  onClick={() => setShowHistory(true)}
                  title="View Chat History"
                >
                  📜 History
                </button>
                <button 
                  className="clear-btn" 
                  onClick={handleClearChat}
                  title="Clear Chat"
                >
                  🗑️ Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 ChatBot
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pyqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('pyqs')}
          >
            📚 PYQs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            👨‍🏫 Teacher Feedback
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tts' ? 'active' : ''}`}
            onClick={() => setActiveTab('tts')}
          >
            🔊 Text to Speech
          </button>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'chat' && (
            <>
              {/* Chat Container */}
              <ChatContainer 
                messages={messages}
                loading={loading}
                language={language}
                chatEndRef={chatEndRef}
              />

              {/* Input Area */}
              <div className="input-area">
                <input 
                  type="text" 
                  id="user-input"
                  className="user-input" 
                  placeholder={languages[language].placeholder}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !loading) {
                      handleSendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  disabled={loading}
                />
                <button 
                  className="send-btn"
                  onClick={(e) => {
                    const input = document.getElementById('user-input');
                    if (!loading) {
                      handleSendMessage(input.value);
                      input.value = '';
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? '⏳' : '📤'} {languages[language].send}
                </button>
              </div>
            </>
          )}

          {activeTab === 'pyqs' && <PYQsBox />}
          {activeTab === 'feedback' && <TeacherFeedback />}
          {activeTab === 'tts' && <TextToSpeech />}
        </div>
      </div>

      {/* History Modal */}
      <HistoryModal 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={chatHistory}
        onLoadMessage={handleLoadFromHistory}
        onClearHistory={handleClearHistory}
        onExportHistory={handleExportHistory}
      />
    </div>
  );
}

export default App;
