import { wordsRaw } from './words';
import { sentencesRaw } from './sentences';
import { articlesRaw } from './articles';

// 解析单词：每行一个，过滤空行
export const UY_WORDS = wordsRaw
  .split('\n')
  .map(w => w.trim())
  .filter(w => w.length > 0);

// 解析句子：每行一个，过滤空行
export const UY_SENTENCES = sentencesRaw
  .split('\n')
  .map(s => s.trim())
  .filter(s => s.length > 0);

// 解析文章：使用 ### 分割
export const UY_ARTICLES = articlesRaw
  .split('###')
  .map(a => a.trim())
  .filter(a => a.length > 0);
