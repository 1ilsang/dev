import { atom } from 'jotai';

export const imageSrcAtom = atom('');
export const imageAltAtom = atom('');
export const imageSizeAtom = atom<'' | 'small'>('');
