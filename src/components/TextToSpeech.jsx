import React, { useState, useRef } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const speechRef = useRef(null);

  const languages = [
    { code: 'en-US', name: '🇺🇸 English (US)' },
    { code: 'en-GB', name: '🇬🇧 English (UK)' },
    { code: 'es-ES', name: '🇪🇸 Spanish' },
    { code: 'fr-FR', name: '🇫🇷 French' },
    { code: 'de-DE', name: '🇩🇪 German' },
    { code: 'hi-IN', name: '🇮🇳 Hindi' },
    { code: 'ja-JP', name: '🇯🇵 Japanese' },
    { code: 'zh-CN', name: '🇨🇳 Chinese (Simplified)' }
  ];

  const handleSpeak = () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = speed;
    utterance.pitch = pitch;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handlePause = () => {
    speechSynthesis.pause();
  };

  const handleResume = () => {
    speechSynthesis.resume();
  };

  const handleClear = () => {
    setText('');
    handleStop();
  };

  const sampleTexts = [
    'Welcome to the Institute Chatbot. We are here to help you with all your queries.',
    'This is a text to speech translator. You can convert any text into spoken words.',
    'Select your preferred language and adjust the speed and pitch for better experience.'
  ];

  return (
    <div className="feature-box tts-box">
      <h2>🔊 Text to Speech Translator</h2>

      <div className="tts-container">
        <div className="tts-controls">
          <div className="control-group">
            <label htmlFor="language">Language:</label>
            <select 
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="tts-select"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="speed">
              Speed: <span className="speed-value">{speed.toFixed(1)}x</span>
            </label>
            <input 
              id="speed"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="tts-slider"
            />
          </div>

          <div className="control-group">
            <label htmlFor="pitch">
              Pitch: <span className="pitch-value">{pitch.toFixed(1)}</span>
            </label>
            <input 
              id="pitch"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              className="tts-slider"
            />
          </div>
        </div>

        <div className="tts-input-area">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here... You can paste any text and it will be converted to speech."
            className="tts-textarea"
            rows="5"
          />
          <p className="char-count">Characters: {text.length}</p>
        </div>

        <div className="tts-buttons">
          <button 
            onClick={handleSpeak}
            className="speak-btn"
            disabled={!text.trim() || isSpeaking}
          >
            ▶️ Speak
          </button>
          {isSpeaking && (
            <>
              <button 
                onClick={handlePause}
                className="pause-btn"
              >
                ⏸️ Pause
              </button>
              <button 
                onClick={handleResume}
                className="resume-btn"
              >
                ▶️ Resume
              </button>
              <button 
                onClick={handleStop}
                className="stop-btn"
              >
                ⏹️ Stop
              </button>
            </>
          )}
          <button 
            onClick={handleClear}
            className="clear-btn"
          >
            🗑️ Clear
          </button>
        </div>

        <div className="sample-texts">
          <h4>Sample Texts:</h4>
          <div className="samples-list">
            {sampleTexts.map((sample, idx) => (
              <button 
                key={idx}
                onClick={() => setText(sample)}
                className="sample-btn"
              >
                {sample.substring(0, 50)}...
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
