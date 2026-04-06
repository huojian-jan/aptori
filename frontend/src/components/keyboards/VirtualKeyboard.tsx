import React from 'react';
import { InputMethod } from '../../types';
import { isKeyActive } from '../../services/keyboardHint';
import { uyghurLayout } from './layouts/uyghurLayout';
import { qwertyLayout } from './layouts/qwertyLayout';
import { wubiLayout, WubiKeyDefinition } from './layouts/wubiLayout';

interface VirtualKeyboardProps {
  mode: InputMethod;
  currentChar: string;
}

function getLayout(mode: InputMethod) {
  if (mode === 'uyghur') return uyghurLayout;
  if (mode === 'wubi') return wubiLayout;
  return qwertyLayout;
}

function getKeyWidthClass(width: number): string {
  if (width === 1) return '';
  if (width === 1.25) return 'key-ctrl';
  if (width === 1.5) return 'key-tab';
  if (width === 1.75) return 'key-caps';
  if (width === 2) return 'key-double';
  if (width === 2.25) return 'key-shift-left';
  if (width === 2.75) return 'key-shift-right';
  if (width >= 5) return 'key-space';
  return '';
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ mode, currentChar }) => {
  const layout = getLayout(mode);

  const isHighlighted = (keyInfo: any): boolean => {
    if (!currentChar) return false;
    if (keyInfo.type === 'special') {
      if (keyInfo.key === 'Space') return isKeyActive(mode, 'Space', currentChar);
      if (keyInfo.en === 'ShiftLeft' || keyInfo.en === 'ShiftRight') {
        return isKeyActive(mode, keyInfo.en, currentChar);
      }
      return false;
    }
    return isKeyActive(mode, keyInfo.en, currentChar);
  };

  const renderKeyContent = (keyInfo: any) => {
    if (keyInfo.type === 'special') {
      return (
        <div className="key-content">
          <div className="key-main-char">
            {keyInfo.key === 'Space' ? 'SPACE' : (keyInfo.en || keyInfo.key)}
          </div>
        </div>
      );
    }

    // 维吾尔语：显示维语字符 + 英文键位
    if (mode === 'uyghur') {
      const isUyMainTarget = keyInfo.uy === currentChar;
      const isUyShiftTarget = keyInfo.uyShift === currentChar;
      const isEnTarget = keyInfo.en.toUpperCase() === currentChar || keyInfo.en === currentChar || keyInfo.shift === currentChar;
      return (
        <div className="key-content">
          {keyInfo.uy ? (
            <div className={`key-uyghur-main ${isUyMainTarget ? 'target' : ''}`}>{keyInfo.uy}</div>
          ) : (
            <div className={`key-main-char ${isEnTarget ? 'target' : ''}`}>{keyInfo.en.toUpperCase()}</div>
          )}
          {keyInfo.uy && (
            <div className="key-english-small">{keyInfo.en.toUpperCase()}</div>
          )}
          {keyInfo.uyShift && keyInfo.uyShift !== keyInfo.uy && (
            <div className={`key-uyghur-shift ${isUyShiftTarget ? 'target' : ''}`}>{keyInfo.uyShift}</div>
          )}
          {!keyInfo.uy && keyInfo.shift && (
            <div className={`key-shift-symbol ${isEnTarget && keyInfo.shift === currentChar ? 'target' : ''}`}>{keyInfo.shift}</div>
          )}
        </div>
      );
    }

    // 五笔：显示字根 + 英文字母
    if (mode === 'wubi') {
      const wbKey = keyInfo as WubiKeyDefinition;
      const isTarget = keyInfo.en.toLowerCase() === currentChar.toLowerCase();
      return (
        <div className="key-content">
          {wbKey.wb ? (
            <div className={`key-wubi-root ${isTarget ? 'target' : ''}`}>{wbKey.wb}</div>
          ) : (
            <div className={`key-main-char ${isTarget ? 'target' : ''}`}>{keyInfo.en.toUpperCase()}</div>
          )}
          {wbKey.wb && (
            <div className="key-english-small">{keyInfo.en.toUpperCase()}</div>
          )}
          {!wbKey.wb && keyInfo.shift && (
            <div className="key-shift-symbol">{keyInfo.shift}</div>
          )}
        </div>
      );
    }

    // 英文 & 拼音：标准 QWERTY 显示
    const isTarget = keyInfo.en.toLowerCase() === currentChar.toLowerCase();
    return (
      <div className="key-content">
        <div className={`key-main-char key-latin ${isTarget ? 'target' : ''}`}>
          {keyInfo.en.toUpperCase()}
        </div>
        {keyInfo.shift && (
          <div className="key-shift-symbol">{keyInfo.shift}</div>
        )}
      </div>
    );
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((keyInfo, keyIndex) => (
              <div
                key={keyIndex}
                className={`keyboard-key ${getKeyWidthClass(keyInfo.width)} ${
                  isHighlighted(keyInfo) ? 'active' : ''
                } ${keyInfo.type === 'special' ? 'special-key' : ''}`}
              >
                {renderKeyContent(keyInfo)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
