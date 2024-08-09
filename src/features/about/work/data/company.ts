import type { Company } from '../models';

import LINE from './line';
import BLIND from './blind';
import SmileGate from './smileGate';
import WoowaBros from './woowabros';

export const companyData: Company[] = [
  { ...WoowaBros },
  { ...LINE },
  { ...BLIND },
  { ...SmileGate },
];
