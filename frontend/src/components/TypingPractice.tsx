import React, { useState, useEffect, useCallback } from 'react';
import { Card, Typography, Switch, Space, Button } from 'antd';
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
import UyghurKeyboard from './UyghurKeyboard';

const { Text } = Typography;

const TypingPractice: React.FC = () => {
  // 键盘显示状态控制
  const [showKeyboard, setShowKeyboard] = useState(true);
  
  // 初始化状态
  const [typingState, setTypingState] = useState<TypingState>(() => {
    const raw = getRandomText();
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

  // 刷新练习
  const handleRefresh = useCallback(() => {
    const raw = getRandomText();
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
  }, []);

  // 更新统计信息
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

  // 处理用户输入
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

  // 处理键盘事件
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  };

  // 更新统计信息
  useEffect(() => {
    updateStats();
  }, [updateStats]);


  // 渲染目标文本，带有字符状态高亮
  const renderTargetText = () => {
    return (
      <div 
        className="target-text uyghur-text"
        style={{
          textAlign: 'right',
          direction: 'rtl'
        }}
      >
        {typingState.characters.map((charInfo: CharacterInfo) => (
          <span
            key={charInfo.index}
            className={`char ${charInfo.status}`}
          >
            {charInfo.char === INTERNAL_SPACE ? ' ' : charInfo.char}
          </span>
        ))}
      </div>
    );
  };


  // 当前需要高亮/提示的字符
  const currentChar = computeActiveChar({
    targetText: typingState.targetText,
    userInput: typingState.userInput
  });

  return (
    <div style={{ padding: '0', background: 'transparent' }}>
      {/* 键盘布局 */}
      {showKeyboard && (
        <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #e6f7ff' }}>
          <UyghurKeyboard currentChar={currentChar} />
        </Card>
      )}

      {/* 实时统计信息和控制 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Space size="large">
          <Text style={{ color: '#666', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>速度:</span> {typingState.stats.wpm} WPM
          </Text>
          <Text style={{ color: '#666', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>准确率:</span> {typingState.stats.accuracy}%
          </Text>
          <Text style={{ color: '#666', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>字符:</span> {typingState.stats.correctCharacters + typingState.stats.incorrectCharacters}
          </Text>
        </Space>

        <Space align="center" size="middle">
          <Button onClick={handleRefresh}>刷新文本</Button>
          <Space size="small">
            <Text style={{ color: '#1890ff', fontWeight: 'bold' }}>显示键盘:</Text>
            <Switch 
              checked={showKeyboard}
              onChange={setShowKeyboard}
              checkedChildren="开"
              unCheckedChildren="关"
              style={{ backgroundColor: showKeyboard ? '#1890ff' : '#d9d9d9' }}
            />
          </Space>
        </Space>
      </div>

      {/* 目标文本 */}
      <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #e6f7ff' }}>
        {renderTargetText()}
      </Card>
      
      {/* 输入区域 */}
      <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #e6f7ff' }}>
        <textarea
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            fontSize: '16px',
            fontFamily: 'Noto Sans Arabic, Arial, sans-serif',
            resize: 'vertical',
            outline: 'none',
            textAlign: 'right',
            direction: 'rtl'
          }}
          value={internalToExternalSpaces(typingState.userInput)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="...ئەم يەردە كىرگۈزۈڭ"
          disabled={typingState.isCompleted}
          autoFocus
        />
      </Card>
      
      {/* 完成提示 */}
      {typingState.isCompleted && (
        <Card style={{ marginBottom: '16px', borderRadius: '12px', border: '1px solid #52c41a', background: '#f6ffed' }}>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: '#52c41a', fontSize: '18px', fontWeight: 'bold' }}>🎉 练习完成！</Text>
            <br />
            <Text style={{ color: '#666', fontSize: '14px' }}>
              打字速度：{typingState.stats.wpm} WPM，准确率：{typingState.stats.accuracy}%
            </Text>
            <div style={{ marginTop: '12px' }}>
              <Button type="primary" onClick={handleRefresh}>再练一遍</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TypingPractice;
