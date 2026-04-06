import { normalizeText, calculateCharacterStates, INTERNAL_SPACE, externalToInternalSpaces } from '../utils';

export interface ActiveCharContext {
  targetText: string;
  userInput: string;
  isRTL?: boolean;
}

export function computeActiveChar(ctx: ActiveCharContext): string {
  const isRTL = ctx.isRTL ?? true;

  let normalizedTarget: string;
  let normalizedInput: string;

  if (isRTL) {
    normalizedTarget = externalToInternalSpaces(normalizeText(ctx.targetText));
    normalizedInput = externalToInternalSpaces(normalizeText(ctx.userInput));
  } else {
    normalizedTarget = normalizeText(ctx.targetText);
    normalizedInput = normalizeText(ctx.userInput);
  }

  const states = calculateCharacterStates(normalizedTarget, normalizedInput, normalizedInput.length);
  const idx = states.findIndex(s => s.status !== 'correct');
  if (idx === -1) return '';

  if (isRTL && normalizedTarget[idx] === INTERNAL_SPACE && normalizedInput.length > idx) {
    let i = idx;
    while (i < normalizedTarget.length && normalizedTarget[i] === INTERNAL_SPACE && i < normalizedInput.length) i++;
    if (i < normalizedTarget.length) return normalizedTarget[i];
  }

  const activeChar = normalizedTarget[idx];
  return activeChar === INTERNAL_SPACE ? ' ' : activeChar;
}

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
