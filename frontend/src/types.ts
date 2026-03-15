// 字符状态类型定义
export type CharacterStatus = 'pending' | 'correct' | 'incorrect' | 'current';

// 字符信息接口
export interface CharacterInfo {
  char: string;
  status: CharacterStatus;
  index: number;
}

// 打字统计接口
export interface TypingStats {
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  accuracy: number;
  wpm: number;
  startTime: Date | null;
  endTime: Date | null;
}

// 打字状态接口
export interface TypingState {
  targetText: string;
  userInput: string;
  currentIndex: number;
  characters: CharacterInfo[];
  isCompleted: boolean;
  stats: TypingStats;
}
