import { TypingModeConfig, InputMethod } from '../types';
import { UY_WORDS, UY_SENTENCES, UY_ARTICLES } from '../data/typingData';
import { EN_WORDS, EN_SENTENCES, EN_ARTICLES } from '../data/english/typingData';
import { PY_WORDS, PY_SENTENCES, PY_ARTICLES } from '../data/pinyin/typingData';
import { getRandomWubi } from '../data/wubi/typingData';

export const MODES: Record<InputMethod, TypingModeConfig> = {
  uyghur: {
    id: 'uyghur',
    route: '/uyghur',
    direction: 'rtl',
    fontFamily: "'Noto Sans Arabic', serif",
    getData: (category) => {
      if (category === 'word') return UY_WORDS;
      if (category === 'article') return UY_ARTICLES;
      return UY_SENTENCES;
    },
  },
  pinyin: {
    id: 'pinyin',
    route: '/pinyin',
    direction: 'ltr',
    fontFamily: "'Inter', sans-serif",
    getData: (category) => {
      if (category === 'word') return PY_WORDS;
      if (category === 'article') return PY_ARTICLES;
      return PY_SENTENCES;
    },
  },
  wubi: {
    id: 'wubi',
    route: '/wubi',
    direction: 'ltr',
    fontFamily: "'Inter', monospace",
    getData: (_category) => {
      // 五笔模式由 getRandomWubi 处理，这里返回空数组作为占位
      // 实际获取在 TypingPractice 中特殊处理
      return [];
    },
  },
  english: {
    id: 'english',
    route: '/english',
    direction: 'ltr',
    fontFamily: "'Inter', sans-serif",
    getData: (category) => {
      if (category === 'word') return EN_WORDS;
      if (category === 'article') return EN_ARTICLES;
      return EN_SENTENCES;
    },
  },
};

export const ALL_MODES: TypingModeConfig[] = Object.values(MODES);

export { getRandomWubi };
