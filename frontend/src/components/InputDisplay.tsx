import React from 'react';
import { CharacterInfo } from '../types';
import { normalizeText } from '../utils';

interface InputDisplayProps {
  targetText: string;
  userInput: string;
  characters: CharacterInfo[];
}

const InputDisplay: React.FC<InputDisplayProps> = ({ 
  targetText, 
  userInput, 
  characters 
}) => {
  const normalizedTarget = normalizeText(targetText);
  const normalizedInput = normalizeText(userInput);

  // 渲染用户输入，带有错误高亮
  const renderUserInput = () => {
    if (!normalizedInput) {
      return <span className="placeholder-text">开始输入...</span>;
    }

    return normalizedInput.split('').map((inputChar, index) => {
      const targetChar = normalizedTarget[index];
      const isCorrect = inputChar === targetChar;
      
      return (
        <span
          key={index}
          className={`input-char ${isCorrect ? 'input-correct' : 'input-incorrect'}`}
        >
          {inputChar}
        </span>
      );
    });
  };

  return (
    <div className="input-display-container">
      <div className="input-display uyghur-text">
        {renderUserInput()}
        <span className="input-cursor">|</span>
      </div>
    </div>
  );
};

export default InputDisplay;
