import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zh from './locales/zh.json';
import en from './locales/en.json';
import ug from './locales/ug.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ug: { translation: ug },
    },
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en', 'ug'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'hathat-lang',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
