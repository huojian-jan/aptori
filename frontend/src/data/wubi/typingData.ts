import { wordsRaw } from './words';
import { sentencesRaw } from './sentences';
import { articlesRaw } from './articles';

// 五笔数据格式："汉字 编码"，用户需输入编码部分
// 解析出编码作为目标文本，汉字作为显示提示

export interface WubiItem {
  display: string;   // 显示给用户看的汉字
  code: string;      // 用户需要输入的五笔编码
}

function parseWubiLine(line: string): WubiItem | null {
  const parts = line.trim().split(' ');
  if (parts.length < 2) return null;
  const display = parts[0];
  const code = parts.slice(1).join('');
  return { display, code };
}

function parseWubiBlock(block: string): WubiItem[] {
  const parts = block.trim().split(' ');
  const items: WubiItem[] = [];
  let i = 0;
  while (i < parts.length - 1) {
    const char = parts[i];
    const code = parts[i + 1];
    if (char && code && /^[a-z]+$/.test(code)) {
      items.push({ display: char, code });
      i += 2;
    } else {
      i++;
    }
  }
  return items;
}

// 单词：每行一个汉字+编码
export const WB_WORDS: WubiItem[] = wordsRaw
  .split('\n')
  .map(line => parseWubiLine(line))
  .filter((item): item is WubiItem => item !== null);

// 句子：###分隔，每块多个汉字+编码
export const WB_SENTENCES: WubiItem[][] = sentencesRaw
  .split('###')
  .map(block => parseWubiBlock(block))
  .filter(items => items.length > 0);

// 文章：###分隔
export const WB_ARTICLES: WubiItem[][] = articlesRaw
  .split('###')
  .map(block => parseWubiBlock(block))
  .filter(items => items.length > 0);

// 返回供打字练习用的目标字符串：编码序列（空格分隔）
export function getWubiTargetText(items: WubiItem[]): string {
  return items.map(item => item.code).join(' ');
}

// 返回显示用的汉字序列
export function getWubiDisplayText(items: WubiItem[]): string {
  return items.map(item => item.display).join(' ');
}

// 获取随机五笔练习数据
export function getRandomWubi(category: 'word' | 'sentence' | 'article'): { target: string; display: string } {
  if (category === 'word') {
    const item = WB_WORDS[Math.floor(Math.random() * WB_WORDS.length)];
    return { target: item.code, display: item.display };
  }
  const pool = category === 'article' ? WB_ARTICLES : WB_SENTENCES;
  const items = pool[Math.floor(Math.random() * pool.length)];
  return {
    target: getWubiTargetText(items),
    display: getWubiDisplayText(items),
  };
}
