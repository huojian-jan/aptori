import { normalizeText, calculateCharacterStates, INTERNAL_SPACE, externalToInternalSpaces } from '../utils';

export interface ActiveCharContext {
  targetText: string;
  userInput: string;
}

/**
 * 根据目标文本与当前用户输入，返回应该高亮（提示）的下一个字符。
 * 逻辑：
 * 1. 构造字符状态数组（与现有组件一致）
 * 2. 找到第一个 status !== 'correct' 的位置
 * 3. 若该位置为已经正确输入的连续空格之后的空格，则向后寻找非空格
 */
// 调试逻辑已移除

export function computeActiveChar(ctx: ActiveCharContext): string {
  // 先标准化，再将外部空格替换为内部占位符
  const normalizedTarget = externalToInternalSpaces(normalizeText(ctx.targetText));
  const normalizedInput = externalToInternalSpaces(normalizeText(ctx.userInput));
  const states = calculateCharacterStates(normalizedTarget, normalizedInput, normalizedInput.length);
  let idx = states.findIndex(s => s.status !== 'correct');
  if (idx === -1) return ''; // 完成
  // 如果当前位置是空格且它本身已经正确（一般不会进入，因为correct被过滤），或需要跳过已完成空格
  if (normalizedTarget[idx] === INTERNAL_SPACE && normalizedInput.length > idx) {
    let i = idx;
    while (i < normalizedTarget.length && normalizedTarget[i] === INTERNAL_SPACE && i < normalizedInput.length) i++;
    if (i < normalizedTarget.length) return normalizedTarget[i];
  }
  const activeChar = normalizedTarget[idx];
  // 调试代码已删除
  return activeChar === INTERNAL_SPACE ? ' ' : activeChar;
}

/** 方便测试：逐步模拟输入，返回每一步期望的 active char */
export function simulateSteps(target: string): Array<{ step: number; userInput: string; active: string }> {
  const result: Array<{ step: number; userInput: string; active: string }> = [];
  let userInput = '';
  result.push({ step: 0, userInput, active: computeActiveChar({ targetText: target, userInput }) });
  for (let i = 0; i < target.length; i++) {
    userInput += target[i];
    const active = computeActiveChar({ targetText: target, userInput });
    result.push({ step: i + 1, userInput, active });
  }
  return result;
}
