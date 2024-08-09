import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import { Bleet, MyBiskit, Blind } from './projects';

const BLIND: Company = {
  company: CompanyName.Blind,
  companyHref: 'https://www.linkedin.com/company/teamblind/',
  companyLogoUrl:
    'https://github.com/1ilsang/dev/assets/23524849/abdc15c8-571c-430c-a3c3-f2473aedd201',
  position: JobPosition.FULL_STACK,
  workStartDate: 1564930800000, // 2019.08.05
  workEndDate: 1596726000000, // 2020.08.07
  projectList: [Bleet, MyBiskit, Blind],
};

export default BLIND;
