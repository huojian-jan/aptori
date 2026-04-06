import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Button, Segmented } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TypingState, CharacterInfo, TypingModeConfig } from '../types';
import {
  calculateCharacterStates,
  calculateStats,
  isInputComplete,
  normalizeText,
  externalToInternalSpaces,
  internalToExternalSpaces,
  INTERNAL_SPACE,
} from '../utils';
import { computeActiveChar } from '../services/activeChar';
import { getRandomText } from '../utils';
import { getRandomWubi } from '../config/modes';
import VirtualKeyboard from './keyboards/VirtualKeyboard';

interface TypingPracticeProps {
  mode: TypingModeConfig;
}

function buildInitialState(
  mode: TypingModeConfig,
  category: 'word' | 'sentence' | 'article'
): TypingState & { wubiDisplay?: string } {
  const isRTL = mode.direction === 'rtl';
  let rawText: string;
  let wubiDisplay: string | undefined;

  if (mode.id === 'wubi') {
    const { target, display } = getRandomWubi(category);
    rawText = target;
    wubiDisplay = display;
  } else {
    rawText = getRandomText(mode.id, category, mode.getData);
  }

  const targetText = isRTL ? externalToInternalSpaces(rawText) : rawText;

  return {
    targetText,
    userInput: '',
    currentIndex: 0,
    characters: calculateCharacterStates(targetText, '', 0),
    isCompleted: false,
    stats: {
      totalCharacters: 0,
      correctCharacters: 0,
      incorrectCharacters: 0,
      accuracy: 0,
      wpm: 0,
      startTime: null,
      endTime: null,
    },
    wubiDisplay,
  };
}

const TypingPractice: React.FC<TypingPracticeProps> = ({ mode }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState<'word' | 'sentence' | 'article'>('sentence');
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [wubiDisplay, setWubiDisplay] = useState<string | undefined>();
  const [typingState, setTypingState] = useState<TypingState>(() => {
    const init = buildInitialState(mode, 'sentence');
    setWubiDisplay(init.wubiDisplay);
    return init;
  });

  const isRTL = mode.direction === 'rtl';

  const handleRefresh = useCallback(() => {
    const init = buildInitialState(mode, category);
    setWubiDisplay(init.wubiDisplay);
    setTypingState(init);
  }, [mode, category]);

  useEffect(() => {
    handleRefresh();
  }, [category, handleRefresh]);

  // 模式切换时重置
  useEffect(() => {
    setCategory('sentence');
    const init = buildInitialState(mode, 'sentence');
    setWubiDisplay(init.wubiDisplay);
    setTypingState(init);
  }, [mode.id]);

  const updateStats = useCallback(() => {
    const stats = calculateStats(
      typingState.targetText,
      typingState.userInput,
      typingState.stats.startTime,
      typingState.isCompleted ? new Date() : null
    );
    setTypingState((prev: TypingState) => ({ ...prev, stats }));
  }, [typingState.targetText, typingState.userInput, typingState.stats.startTime, typingState.isCompleted]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.target.value;

    if (isRTL) {
      const normalizedTarget = externalToInternalSpaces(normalizeText(typingState.targetText));
      const normalizedInput = externalToInternalSpaces(normalizeText(newInput));

      setTypingState((prev: TypingState) => {
        const isFirstInput = prev.userInput === '' && newInput !== '';
        const startTime = isFirstInput ? new Date() : prev.stats.startTime;
        const currentIndex = Math.min(normalizedInput.length, normalizedTarget.length);
        const characters = calculateCharacterStates(normalizedTarget, normalizedInput, currentIndex);
        const completed = isInputComplete(normalizedTarget, normalizedInput);
        return {
          ...prev,
          userInput: externalToInternalSpaces(newInput),
          currentIndex,
          characters,
          isCompleted: completed,
          stats: { ...prev.stats, startTime, endTime: completed ? new Date() : null },
        };
      });
    } else {
      const normalizedTarget = normalizeText(typingState.targetText);
      const normalizedInput = normalizeText(newInput);

      setTypingState((prev: TypingState) => {
        const isFirstInput = prev.userInput === '' && newInput !== '';
        const startTime = isFirstInput ? new Date() : prev.stats.startTime;
        const currentIndex = Math.min(normalizedInput.length, normalizedTarget.length);
        const characters = calculateCharacterStates(normalizedTarget, normalizedInput, currentIndex);
        const completed = isInputComplete(normalizedTarget, normalizedInput);
        return {
          ...prev,
          userInput: newInput,
          currentIndex,
          characters,
          isCompleted: completed,
          stats: { ...prev.stats, startTime, endTime: completed ? new Date() : null },
        };
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      handleRefresh();
    }
  };

  useEffect(() => {
    updateStats();
  }, [updateStats]);

  useEffect(() => {
    if (typingState.isCompleted) {
      const timer = setTimeout(() => handleRefresh(), 800);
      return () => clearTimeout(timer);
    }
  }, [typingState.isCompleted, handleRefresh]);

  const renderTargetText = () => {
    const textClass = isRTL ? 'practice-target uyghur-text' : 'practice-target ltr-text';
    return (
      <div>
        {/* 五笔模式：顶部显示汉字提示 */}
        {mode.id === 'wubi' && wubiDisplay && (
          <div className="wubi-display-text">{wubiDisplay}</div>
        )}
        <div className={textClass} style={{ fontFamily: mode.fontFamily }}>
          {typingState.characters.map((charInfo: CharacterInfo) => (
            <span key={charInfo.index} className={`char ${charInfo.status}`}>
              {charInfo.char === INTERNAL_SPACE ? ' ' : charInfo.char}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const currentChar = computeActiveChar({
    targetText: typingState.targetText,
    userInput: isRTL ? typingState.userInput : typingState.userInput,
    isRTL,
  });

  const inputValue = isRTL
    ? internalToExternalSpaces(typingState.userInput)
    : typingState.userInput;

  const placeholder = t(`practice.placeholder.${mode.id}`);

  return (
    <div className="home-container">
      <div className="top-bar">
        <div className="actions-row">
          <div className="feature-actions">
            <Segmented
              options={[
                { label: t('practice.word'), value: 'word' },
                { label: t('practice.sentence'), value: 'sentence' },
                { label: t('practice.article'), value: 'article' },
              ]}
              value={category}
              onChange={(value) => setCategory(value as 'word' | 'sentence' | 'article')}
              className="category-selector"
            />
            <div className="keyboard-toggle-inline">
              <span className="toggle-label">{t('practice.showKeyboard')}</span>
              <Switch checked={showKeyboard} onChange={setShowKeyboard} size="small" />
            </div>
          </div>
          <div className="stats-bar">
            <span className="stat-item">
              <span className="stat-val">{typingState.stats.wpm}</span>
              <span className="stat-lbl">{t('practice.wpmUnit')}</span>
            </span>
            <span className="stat-item">
              <span className="stat-val">{typingState.stats.accuracy.toFixed(0)}%</span>
              <span className="stat-lbl">{t('practice.accuracy')}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="practice-wrapper">
        {showKeyboard && (
          <div className="keyboard-wrapper">
            <VirtualKeyboard mode={mode.id} currentChar={currentChar} />
          </div>
        )}

        <div className={`practice-main ${category === 'word' ? 'mode-word' : ''}`}>
          <div className="practice-controls">
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              className="refresh-btn-inline"
              type="text"
            >
              {t('practice.refresh')}
            </Button>
          </div>
          {renderTargetText()}
          <textarea
            className={`practice-input ${isRTL ? '' : 'ltr'}`}
            style={{ fontFamily: mode.fontFamily, direction: mode.direction }}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={typingState.isCompleted}
            autoFocus
          />
          <div className="tab-hint">{t('practice.tabHint')}</div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
