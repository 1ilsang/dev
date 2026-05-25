import { sendGAEvent } from '@next/third-parties/google';

export const infoLog = (message: string) => {
  console.info(`\x1b[36m ✓ ${message} \x1b[0m`);
};

export type GaActionType =
  | 'linkClick'
  | 'categoryClick'
  | 'tocClick'
  | 'sponsorClick'
  | 'homeClick'
  | 'tagClick'
  | 'codeCopy'
  | 'postReadComplete'
  | 'postEngaged'
  | 'postNavigation'
  | 'aboutVisit'
  | 'printPost'
  | 'returnVisit'
  | 'sessionDepth'
  | 'scrollMilestone'
  | 'codeBlockView'
  | 'imageZoom'
  | 'headingAnchorClick'
  | 'readingTime'
  | 'textCopy'
  | 'referrerType'
  | 'scrollReversal';
type ValueKey = 'type' | 'value';
export const ga = (
  actionType: GaActionType,
  value: Record<ValueKey, string>,
) => {
  sendGAEvent('event', actionType, value);
};
