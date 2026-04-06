import { InputMethod } from '../types';

export interface KeyboardHintAlgorithm {
  getHighlightedKeys(currentChar: string): string[];
  isKeyActive(keyValue: string, currentChar: string): boolean;
}

// ── 维吾尔语 ──────────────────────────────────────────────
class UyghurKeyboardHint implements KeyboardHintAlgorithm {
  private readonly map: Record<string, string> = {
    'چ': 'q', 'ۋ': 'w', 'ې': 'e', 'ر': 'r', 'ت': 't', 'ي': 'y', 'ۇ': 'u', 'ڭ': 'i', 'و': 'o', 'پ': 'p',
    'ھ': 'a', 'س': 's', 'د': 'd', 'ژ': 'd', 'ا': 'f', 'ف': 'f', 'ە': 'g', 'گ': 'g', 'ى': 'h', 'خ': 'h',
    'ق': 'j', 'ج': 'j', 'ك': 'k', 'ۆ': 'k', 'ل': 'l', 'ز': 'z', 'ش': 'x', 'غ': 'c', 'ۈ': 'v', 'ب': 'b',
    'ن': 'n', 'م': 'm', 'ئ': '/', 'ئ‍': '/',
  };
  private readonly shiftVariants: Record<string, string> = {
    'ژ': 'd', 'ف': 'f', 'گ': 'g', 'خ': 'h', 'ج': 'j', 'ۆ': 'k',
  };

  getHighlightedKeys(currentChar: string): string[] {
    if (currentChar === ' ') return ['Space'];
    const base = this.map[currentChar];
    if (base) {
      return this.shiftVariants[currentChar] ? [base, 'ShiftLeft'] : [base];
    }
    return [currentChar.toLowerCase()];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    if (keyValue === 'Space') return currentChar === ' ';
    const base = this.map[currentChar];
    if (base) {
      if (keyValue === 'ShiftLeft') return !!this.shiftVariants[currentChar];
      if (keyValue === 'ShiftRight') return false;
      return keyValue.toLowerCase() === base.toLowerCase();
    }
    if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') return false;
    return currentChar.toLowerCase() === keyValue.toLowerCase();
  }
}

// ── 英文 & 拼音（逻辑相同，字符即键位）────────────────────
class LatinKeyboardHint implements KeyboardHintAlgorithm {
  getHighlightedKeys(currentChar: string): string[] {
    if (currentChar === ' ') return ['Space'];
    return [currentChar.toLowerCase()];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    if (keyValue === 'Space') return currentChar === ' ';
    if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') return false;
    return keyValue.toLowerCase() === currentChar.toLowerCase();
  }
}

// ── 五笔（与拉丁字母相同，编码由数据层保证为小写字母）───────
class WubiKeyboardHint extends LatinKeyboardHint {}

// ── 注册表 ──────────────────────────────────────────────
const algorithms: Record<InputMethod, KeyboardHintAlgorithm> = {
  uyghur: new UyghurKeyboardHint(),
  pinyin: new LatinKeyboardHint(),
  english: new LatinKeyboardHint(),
  wubi: new WubiKeyboardHint(),
};

export function isKeyActive(inputMethod: InputMethod, keyValue: string, currentChar: string): boolean {
  return algorithms[inputMethod].isKeyActive(keyValue, currentChar);
}

export function getHighlightedKeys(inputMethod: InputMethod, currentChar: string): string[] {
  return algorithms[inputMethod].getHighlightedKeys(currentChar);
}
