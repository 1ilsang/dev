import { Company } from '../models';

import LINE from './line';
import BLIND from './blind';
import SmileGate from './smileGate';

export const companyData: Company[] = [
  { ...LINE },
  { ...BLIND },
  { ...SmileGate },
];
