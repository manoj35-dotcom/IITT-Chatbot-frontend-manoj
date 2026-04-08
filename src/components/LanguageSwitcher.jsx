import React from 'react';

function LanguageSwitcher({ language, onLanguageChange }) {
  return (
    <div className="language-switcher">
      <label htmlFor="language-select">🌐 Language:</label>
      <select 
        id="language-select"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
