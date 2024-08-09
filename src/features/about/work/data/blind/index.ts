import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import { Bleet, MyBiskit, Blind } from './projects';

const BLIND: Company = {
  company: CompanyName.Blind,
  companyHref: 'https://www.linkedin.com/company/teamblind/',
  companyLogoUrl: '/images/logo/blind.webp',
  position: JobPosition.FULL_STACK,
  workStartDate: 1564930800000, // 2019.08.05
  workEndDate: 1596726000000, // 2020.08.07
  projectList: [Bleet, MyBiskit, Blind],
};

export default BLIND;
