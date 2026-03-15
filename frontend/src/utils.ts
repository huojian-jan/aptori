import { CharacterInfo, TypingStats } from './types';

// 内部空格占位符字符（选择一个极少出现的控制符）
export const INTERNAL_SPACE = '\u241F'; // SYMBOL FOR UNIT SEPARATOR (visual debug-friendly)

export function externalToInternalSpaces(text: string): string {
  if (!text) return '';
  return text.replace(/ /g, INTERNAL_SPACE);
}

export function internalToExternalSpaces(text: string): string {
  if (!text) return '';
  return text.replace(new RegExp(INTERNAL_SPACE, 'g'), ' ');
}

import { UY_WORDS, UY_SENTENCES, UY_ARTICLES } from './data/typingData';
export { UY_WORDS, UY_SENTENCES, UY_ARTICLES };

// 随机获取练习文本
export function getRandomText(category: 'word' | 'sentence' | 'article' = 'sentence'): string {
  let pool: string[] = UY_SENTENCES;
  if (category === 'word') pool = UY_WORDS;
  else if (category === 'article') pool = UY_ARTICLES;
  
  // 对于单词，只随机抽取一个词
  if (category === 'word') {
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  return pool[Math.floor(Math.random() * pool.length)];
}

// 规范化Unicode文本
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFC')
    // 去除零宽字符 (ZWSP,ZWNJ,ZWJ,BOM)
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
    // 各类 unicode 空格统一成普通空格
  .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
}

// 计算字符状态数组
export function calculateCharacterStates(
  targetText: string,
  userInput: string,
  currentIndex: number
): CharacterInfo[] {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);
  
  return normalizedTarget.split('').map((char, index) => {
    let status: CharacterInfo['status'] = 'pending';
    
    if (index < normalizedInput.length) {
      // 已输入的字符
      status = normalizedInput[index] === char ? 'correct' : 'incorrect';
    } else if (index === currentIndex) {
      // 当前需要输入的字符
      status = 'current';
    }
    
    return {
      char: char === INTERNAL_SPACE ? ' ' : char,
      status,
      index
    };
  });
}

// 计算打字统计信息
export function calculateStats(
  targetText: string,
  userInput: string,
  startTime: Date | null,
  endTime: Date | null
): TypingStats {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);
  
  const totalCharacters = normalizedTarget.length;
  let correctCharacters = 0;
  
  // 计算正确字符数
  for (let i = 0; i < Math.min(normalizedTarget.length, normalizedInput.length); i++) {
    if (normalizedTarget[i] === normalizedInput[i]) {
      correctCharacters++;
    }
  }
  
  const incorrectCharacters = normalizedInput.length - correctCharacters;
  const accuracy = totalCharacters > 0 ? (correctCharacters / totalCharacters) * 100 : 0;
  
  // 计算WPM (假设平均每个词5个字符)
  let wpm = 0;
  if (startTime && endTime) {
    const timeInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    if (timeInMinutes > 0) {
      const wordsTyped = correctCharacters / 5; // 平均每个词5个字符
      wpm = Math.round(wordsTyped / timeInMinutes);
    }
  }
  
  return {
    totalCharacters,
    correctCharacters,
    incorrectCharacters,
    accuracy: Math.round(accuracy * 100) / 100,
    wpm,
    startTime,
    endTime
  };
}

// 检查是否完成输入
export function isInputComplete(targetText: string, userInput: string): boolean {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);
  return normalizedInput === normalizedTarget;
}
