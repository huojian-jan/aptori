/**
 * 键盘提示算法服务
 * 为维吾尔语输入法提供当前字符的键盘高亮提示
 */

export interface KeyboardHintAlgorithm {
  getHighlightedKeys(currentChar: string): string[];
  isKeyActive(keyValue: string, currentChar: string): boolean;
}

/**
 * 维吾尔语键盘提示算法
 */
class UyghurKeyboardHint implements KeyboardHintAlgorithm {
  private readonly map: Record<string, string> = {
    'چ': 'q', 'ۋ': 'w', 'ې': 'e', 'ر': 'r', 'ت': 't', 'ي': 'y', 'ۇ': 'u', 'ڭ': 'i', 'و': 'o', 'پ': 'p',
    'ھ': 'a', 'س': 's', 'د': 'd', 'ژ': 'd', 'ا': 'f', 'ف': 'f', 'ە': 'g', 'گ': 'g', 'ى': 'h', 'خ': 'h',
    'ق': 'j', 'ج': 'j', 'ك': 'k', 'ۆ': 'k', 'ل': 'l', 'ز': 'z', 'ش': 'x', 'غ': 'c', 'ۈ': 'v', 'ب': 'b',
    'ن': 'n', 'م': 'm', 'ئ': '/', 'ئ‍': '/'
  };
  // 需要 Shift 的变体字符
  private readonly shiftVariants: Record<string, string> = {
    'ژ': 'd', 'ف': 'f', 'گ': 'g', 'خ': 'h', 'ج': 'j', 'ۆ': 'k'
  };

  getHighlightedKeys(currentChar: string): string[] {
    if (currentChar === ' ') return ['Space'];
    const base = this.map[currentChar];
    if (base) {
      if (this.shiftVariants[currentChar]) {
        return [base, 'ShiftLeft', 'ShiftRight'];
      }
      return [base];
    }
    return [currentChar.toLowerCase()];
  }

  isKeyActive(keyValue: string, currentChar: string): boolean {
    if (keyValue === 'Space') return currentChar === ' ';
    const base = this.map[currentChar];
    if (base) {
      if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') {
        return !!this.shiftVariants[currentChar];
      }
      return keyValue.toLowerCase() === base.toLowerCase();
    }
    if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') return false;
    return currentChar.toLowerCase() === keyValue.toLowerCase();
  }
}

const algorithm = new UyghurKeyboardHint();

/**
 * 便捷函数：检查键位是否应该高亮
 * @param keyValue 键位值
 * @param currentChar 当前字符
 * @returns 是否应该高亮
 */
export function isKeyActive(_inputMethod: any, keyValue: string, currentChar: string): boolean {
  return algorithm.isKeyActive(keyValue, currentChar);
}
