import { wordsRaw } from './words';
import { sentencesRaw } from './sentences';
import { articlesRaw } from './articles';

export const PY_WORDS = wordsRaw
  .split('\n')
  .map(w => w.trim())
  .filter(w => w.length > 0);

export const PY_SENTENCES = sentencesRaw
  .split('###')
  .map(s => s.trim())
  .filter(s => s.length > 0);

export const PY_ARTICLES = articlesRaw
  .split('###')
  .map(a => a.trim())
  .filter(a => a.length > 0);
