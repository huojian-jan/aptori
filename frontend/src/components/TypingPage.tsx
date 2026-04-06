import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftOutlined, KeyOutlined } from '@ant-design/icons';
import { TypingModeConfig } from '../types';
import TypingPractice from './TypingPractice';
import LanguageSwitcher from './LanguageSwitcher';
import AdSlot from './AdSlot';

interface TypingPageProps {
  mode: TypingModeConfig;
}

const TypingPage: React.FC<TypingPageProps> = ({ mode }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(`seo.${mode.id}.title`);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t(`seo.${mode.id}.description`));
    }
  }, [mode.id, t]);

  return (
    <div className="typing-page">
      <header className="typing-header">
        <div className="typing-header-left">
          <Link to="/" className="back-link" aria-label={t('practice.backHome')}>
            <ArrowLeftOutlined />
          </Link>
          <div className="header-brand">
            <KeyOutlined className="logo-icon" />
            <span className="brand-logo">HatHat</span>
          </div>
          <span className="typing-header-mode">{t(`modes.${mode.id}.label`)}</span>
        </div>
        <div className="typing-header-right">
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <TypingPractice mode={mode} />
        <AdSlot position="bottom" />
      </main>
    </div>
  );
};

export default TypingPage;
