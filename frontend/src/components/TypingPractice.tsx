import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Button, Segmented } from 'antd';
import { TypingState, CharacterInfo } from '../types';
import {
  getRandomText,
  calculateCharacterStates,
  calculateStats,
  isInputComplete,
  normalizeText,
  externalToInternalSpaces,
  internalToExternalSpaces,
  INTERNAL_SPACE
} from '../utils';
import { computeActiveChar } from '../services/activeChar';
import { KeyOutlined, ReloadOutlined } from '@ant-design/icons';
import UyghurKeyboard from './UyghurKeyboard';



interface TypingPracticeProps {
  testType?: 'uyghur' | 'pinyin' | 'english';
}

const TypingPractice: React.FC<TypingPracticeProps> = ({ testType: _testType = 'uyghur' }) => {
  const [category, setCategory] = useState<'word' | 'sentence' | 'article'>('sentence');
  const [showKeyboard, setShowKeyboard] = useState(true);
  
  const [typingState, setTypingState] = useState<TypingState>(() => {
    const raw = getRandomText('sentence');
    const targetText = externalToInternalSpaces(raw);
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
        endTime: null
      }
    };
  });

  const handleRefresh = useCallback(() => {
    const raw = getRandomText(category);
    const targetText = externalToInternalSpaces(raw);
    setTypingState({
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
        endTime: null
      }
    });
  }, [category]);

  useEffect(() => {
    handleRefresh();
  }, [category, handleRefresh]);

  const updateStats = useCallback(() => {
    const stats = calculateStats(
      typingState.targetText,
      typingState.userInput,
      typingState.stats.startTime,
      typingState.isCompleted ? new Date() : null
    );
    
    setTypingState((prev: TypingState) => ({
      ...prev,
      stats
    }));
  }, [typingState.targetText, typingState.userInput, typingState.stats.startTime, typingState.isCompleted]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = event.target.value;
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
          stats: {
            ...prev.stats,
            startTime,
            endTime: completed ? new Date() : null
          }
        };
      });
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

  // 当完成且正确输入时，延迟自动跳转
  useEffect(() => {
    if (typingState.isCompleted) {
      const timer = setTimeout(() => {
        handleRefresh();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [typingState.isCompleted, handleRefresh]);

  const renderTargetText = () => {
    return (
      <div className="practice-target uyghur-text">
        {typingState.characters.map((charInfo: CharacterInfo) => (
          <span key={charInfo.index} className={`char ${charInfo.status}`}>
            {charInfo.char === INTERNAL_SPACE ? ' ' : charInfo.char}
          </span>
        ))}
      </div>
    );
  };

  const currentChar = computeActiveChar({
    targetText: typingState.targetText,
    userInput: typingState.userInput
  });

  return (
    <div className="home-container">
      {/* Top Feature Bar */}
      <div className="top-bar">
        <div className="logo-row">
          <div className="logo-section">
            <KeyOutlined className="logo-icon" />
            <span className="brand-logo">HatHat</span>
          </div>
        </div>

        <div className="actions-row">
          <div className="feature-actions">
            <Segmented
              options={[
                { label: '单词', value: 'word' },
                { label: '句子', value: 'sentence' },
                { label: '文章', value: 'article' }
              ]}
              value={category}
              onChange={(value) => setCategory(value as any)}
              className="category-selector"
            />
            <div className="keyboard-toggle-inline">
              <span className="toggle-label">显示键盘</span>
              <Switch 
                checked={showKeyboard} 
                onChange={setShowKeyboard}
                size="small"
              />
            </div>

          </div>
        </div>
      </div>

      <div className="practice-wrapper">
        {showKeyboard && (
          <div className="keyboard-wrapper">
            <UyghurKeyboard currentChar={currentChar} />
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
              换一批
            </Button>
          </div>
          {renderTargetText()}
          <textarea
            className="practice-input"
            value={internalToExternalSpaces(typingState.userInput)}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="بۇ يەرگە كىرگۈزۈڭ..."
            disabled={typingState.isCompleted}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
