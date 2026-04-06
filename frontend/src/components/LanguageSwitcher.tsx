import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ug', label: 'ئۇيغۇرچە' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.split('-')[0] || 'zh';

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="lang-switcher">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${current === lang.code ? 'active' : ''}`}
          onClick={() => handleChange(lang.code)}
          aria-label={lang.label}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
