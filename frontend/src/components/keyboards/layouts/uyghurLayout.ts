export interface KeyDefinition {
  key: string;
  en: string;
  shift?: string;
  uy?: string;
  uyShift?: string;
  type: 'normal' | 'special';
  width: number;
}

export const uyghurLayout: KeyDefinition[][] = [
  [
    { key: '`', en: '`', shift: '~', type: 'normal', width: 1 },
    { key: '1', en: '1', shift: '!', type: 'normal', width: 1 },
    { key: '2', en: '2', shift: '@', type: 'normal', width: 1 },
    { key: '3', en: '3', shift: '#', type: 'normal', width: 1 },
    { key: '4', en: '4', shift: '$', type: 'normal', width: 1 },
    { key: '5', en: '5', shift: '%', type: 'normal', width: 1 },
    { key: '6', en: '6', shift: '^', type: 'normal', width: 1 },
    { key: '7', en: '7', shift: '&', type: 'normal', width: 1 },
    { key: '8', en: '8', shift: '*', type: 'normal', width: 1 },
    { key: '9', en: '9', shift: '(', type: 'normal', width: 1 },
    { key: '0', en: '0', shift: ')', type: 'normal', width: 1 },
    { key: '-', en: '-', shift: '_', type: 'normal', width: 1 },
    { key: '=', en: '=', shift: '+', type: 'normal', width: 1 },
    { key: 'Backspace', en: 'Backspace', type: 'special', width: 2 },
  ],
  [
    { key: 'Tab', en: 'Tab', type: 'special', width: 1.5 },
    { key: 'q', en: 'q', shift: 'Q', uy: 'چ', type: 'normal', width: 1 },
    { key: 'w', en: 'w', shift: 'W', uy: 'ۋ', type: 'normal', width: 1 },
    { key: 'e', en: 'e', shift: 'E', uy: 'ې', type: 'normal', width: 1 },
    { key: 'r', en: 'r', shift: 'R', uy: 'ر', type: 'normal', width: 1 },
    { key: 't', en: 't', shift: 'T', uy: 'ت', type: 'normal', width: 1 },
    { key: 'y', en: 'y', shift: 'Y', uy: 'ي', type: 'normal', width: 1 },
    { key: 'u', en: 'u', shift: 'U', uy: 'ۇ', type: 'normal', width: 1 },
    { key: 'i', en: 'i', shift: 'I', uy: 'ڭ', type: 'normal', width: 1 },
    { key: 'o', en: 'o', shift: 'O', uy: 'و', type: 'normal', width: 1 },
    { key: 'p', en: 'p', shift: 'P', uy: 'پ', type: 'normal', width: 1 },
    { key: '[', en: '[', shift: '{', type: 'normal', width: 1 },
    { key: ']', en: ']', shift: '}', type: 'normal', width: 1 },
    { key: '\\', en: '\\', shift: '|', type: 'normal', width: 1.5 },
  ],
  [
    { key: 'CapsLock', en: 'CapsLock', type: 'special', width: 1.75 },
    { key: 'a', en: 'a', shift: 'A', uy: 'ھ', type: 'normal', width: 1 },
    { key: 's', en: 's', shift: 'S', uy: 'س', type: 'normal', width: 1 },
    { key: 'd', en: 'd', shift: 'D', uy: 'د', uyShift: 'ژ', type: 'normal', width: 1 },
    { key: 'f', en: 'f', shift: 'F', uy: 'ا', uyShift: 'ف', type: 'normal', width: 1 },
    { key: 'g', en: 'g', shift: 'G', uy: 'ە', uyShift: 'گ', type: 'normal', width: 1 },
    { key: 'h', en: 'h', shift: 'H', uy: 'ى', uyShift: 'خ', type: 'normal', width: 1 },
    { key: 'j', en: 'j', shift: 'J', uy: 'ق', uyShift: 'ج', type: 'normal', width: 1 },
    { key: 'k', en: 'k', shift: 'K', uy: 'ك', uyShift: 'ۆ', type: 'normal', width: 1 },
    { key: 'l', en: 'l', shift: 'L', uy: 'ل', uyShift: 'لا', type: 'normal', width: 1 },
    { key: ';', en: ';', shift: ':', type: 'normal', width: 1 },
    { key: "'", en: "'", shift: '"', type: 'normal', width: 1 },
    { key: 'Enter', en: 'Enter', type: 'special', width: 2.25 },
  ],
  [
    { key: 'Shift', en: 'ShiftLeft', type: 'special', width: 2.25 },
    { key: 'z', en: 'z', shift: 'Z', uy: 'ز', type: 'normal', width: 1 },
    { key: 'x', en: 'x', shift: 'X', uy: 'ش', type: 'normal', width: 1 },
    { key: 'c', en: 'c', shift: 'C', uy: 'غ', type: 'normal', width: 1 },
    { key: 'v', en: 'v', shift: 'V', uy: 'ۈ', type: 'normal', width: 1 },
    { key: 'b', en: 'b', shift: 'B', uy: 'ب', type: 'normal', width: 1 },
    { key: 'n', en: 'n', shift: 'N', uy: 'ن', type: 'normal', width: 1 },
    { key: 'm', en: 'm', shift: 'M', uy: 'م', type: 'normal', width: 1 },
    { key: ',', en: ',', shift: '<', type: 'normal', width: 1 },
    { key: '.', en: '.', shift: '>', type: 'normal', width: 1 },
    { key: '/', en: '/', shift: '?', uy: 'ئ‍', type: 'normal', width: 1 },
    { key: 'Shift', en: 'ShiftRight', type: 'special', width: 2.75 },
  ],
  [
    { key: 'ControlLeft', en: 'Ctrl', type: 'special', width: 1.25 },
    { key: 'MetaLeft', en: 'Win', type: 'special', width: 1.25 },
    { key: 'AltLeft', en: 'Alt', type: 'special', width: 1.25 },
    { key: 'Space', en: 'Space', type: 'special', width: 6 },
    { key: 'AltRight', en: 'Alt', type: 'special', width: 1.25 },
    { key: 'MetaRight', en: 'Win', type: 'special', width: 1.25 },
    { key: 'ContextMenu', en: 'Menu', type: 'special', width: 1.25 },
    { key: 'ControlRight', en: 'Ctrl', type: 'special', width: 1.25 },
  ],
];
