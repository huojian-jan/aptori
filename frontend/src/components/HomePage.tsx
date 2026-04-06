import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BorderOutlined,
  FontColorsOutlined,
  GlobalOutlined,
  KeyOutlined,
  RightOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { ALL_MODES } from '../config/modes';
import LanguageSwitcher from './LanguageSwitcher';
import AdSlot from './AdSlot';

const MODE_ICONS: Record<string, React.ReactNode> = {
  uyghur: <FontColorsOutlined />,
  pinyin: <TranslationOutlined />,
  wubi: <BorderOutlined />,
  english: <GlobalOutlined />,
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const featureKeys = ['home.feature1', 'home.feature2', 'home.feature3', 'home.feature4'];
  const practiceLevels = ['word', 'sentence', 'article'] as const;

  useEffect(() => {
    document.title = t('seo.home.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('seo.home.description'));
    }
  }, [t]);

  return (
    <div className="home-page">
      {/* 导航栏 */}
      <header className="home-header">
        <div className="home-header-brand">
          <KeyOutlined className="logo-icon" />
          <span className="brand-logo">HatHat</span>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="home-main">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="hero-kicker">HatHat</span>
            <h1 className="hero-title">{t('home.title')}</h1>
            <p className="hero-subtitle">{t('home.subtitle')}</p>
            <p className="hero-tagline">{t('home.tagline')}</p>

            <div className="hero-actions">
              <Link to={ALL_MODES[0].route} className="hero-primary-action">
                <span>{t('home.startPractice')}</span>
                <RightOutlined />
              </Link>
            </div>

            <ul className="hero-feature-list">
              {featureKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>

          <div className="hero-board" id="practice-modes">
            <div className="hero-board-head">
              <div>
                <p className="hero-board-kicker">{t('home.startPractice')}</p>
                <h2 className="hero-board-title">{t('home.feature1')}</h2>
              </div>
              <div className="hero-board-count">{ALL_MODES.length}</div>
            </div>

            <div className="modes-grid">
              {ALL_MODES.map((mode, index) => (
                <Link
                  key={mode.id}
                  to={mode.route}
                  className={`mode-card mode-card-${mode.id}`}
                  aria-label={t(`modes.${mode.id}.label`)}
                >
                  <div className="mode-card-topline">
                    <span className="mode-card-index">{String(index + 1).padStart(2, '0')}</span>
                    <div className="mode-card-icon">{MODE_ICONS[mode.id]}</div>
                  </div>
                  <h2 className="mode-card-title">{t(`modes.${mode.id}.label`)}</h2>
                  <p className="mode-card-desc">{t(`modes.${mode.id}.description`)}</p>
                  <span className="mode-card-cta">
                    {t('home.startPractice')}
                    <RightOutlined />
                  </span>
                </Link>
              ))}
            </div>

            <div className="hero-stage-strip" aria-hidden="true">
              {practiceLevels.map((level) => (
                <span key={level} className="hero-stage-chip">
                  {t(`practice.${level}`)}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="home-content-grid">
          <section className="seo-section">
            <h2 className="seo-title">{t('home.whyHathat')}</h2>
            <ul className="feature-list">
              <li>{t('home.feature1')}</li>
              <li>{t('home.feature2')}</li>
              <li>{t('home.feature3')}</li>
              <li>{t('home.feature4')}</li>
            </ul>
          </section>

          <aside className="home-side-stack">
            <section className="practice-flow-card">
              <h2 className="seo-title">{t('home.startPractice')}</h2>
              <div className="practice-flow-list">
                {practiceLevels.map((level, index) => (
                  <div key={level} className="practice-flow-item">
                    <span className="practice-flow-step">{index + 1}</span>
                    <div>
                      <p className="practice-flow-label">{t(`practice.${level}`)}</p>
                      <p className="practice-flow-desc">{t('home.subtitle')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <AdSlot position="sidebar" className="home-ad-panel" />
          </aside>
        </section>

        <section className="faq-section">
          <h2 className="seo-title">{t('home.faqTitle')}</h2>
          <div className="faq-list">
            {[1, 2, 3].map((n) => (
              <details key={n} className="faq-item">
                <summary className="faq-q">{t(`home.faq${n}Q`)}</summary>
                <p className="faq-a">{t(`home.faq${n}A`)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>{t('footer.copyright')}</p>
        <a href="/privacy" className="footer-link">{t('footer.privacy')}</a>
      </footer>
    </div>
  );
};

export default HomePage;
