import type { FunctionComponent } from 'react';

import { companyData } from '../work/data/company';
import { getCareerYear } from '../work/helpers/careerYear';

export const CareerYear: FunctionComponent = () => {
  return <span suppressHydrationWarning>{getCareerYear(companyData)}</span>;
};
