import type { Company } from '../models';

import { LINE } from './line/sum-up';
import { BLIND } from './blind/sum-up';
import { SmileGate } from './smileGate/sum-up';
import { WoowaBros } from './woowabros/sum-up';

export const companyData: Company[] = [
  { ...WoowaBros },
  { ...LINE },
  { ...BLIND },
  { ...SmileGate },
];
