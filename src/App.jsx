import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import { saveToLocalStorage, loadFromLocalStorage, deleteFromLocalStorage } from './utils/localStorage';
import { sendMessage } from './utils/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = loadFromLocalStorage('chatMessages');
    
    if (savedMessages) setMessages(savedMessages);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage('chatMessages', messages);
  }, [messages]);

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

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await sendMessage(userMessage);
      
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
          <h1>Institute ChatBot</h1>
          <div className="header-controls">
            <button 
              className="clear-btn" 
              onClick={handleClearChat}
              title="Clear Chat"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <ChatContainer 
          messages={messages}
          loading={loading}
          language="en"
          chatEndRef={chatEndRef}
        />

        {/* Input Area */}
        <div className="input-area">
          <input 
            type="text" 
            id="user-input"
            className="user-input" 
            placeholder="Ask your question here..."
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
            {loading ? '⏳' : '📤'} Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
