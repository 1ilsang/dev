import { sendGAEvent } from '@next/third-parties/google';

export const infoLog = (message: string) => {
  console.info(`\n\x1b[36m ✓ ${message} \x1b[0m`);
};

export type GaActionType =
  | 'buttonClick'
  | 'linkClick'
  | 'categoryClick'
  | 'videoClick';
type ValueKey = 'type' | 'value';
export const ga = (
  actionType: GaActionType,
  value: Record<ValueKey, string>,
) => {
  sendGAEvent('event', actionType, value);
};
