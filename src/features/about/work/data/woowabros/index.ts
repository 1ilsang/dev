import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import { TBD } from './projects';

const WoowaBros: Company = {
  company: CompanyName.WoowaBros,
  companyHref: 'https://www.linkedin.com/company/woowa-bros-/',
  companyLogoUrl: '/assets/logo/woowa-bros.webp',
  workStartDate: 1724112000000,
  position: JobPosition.FE,
  projectList: [TBD],
};

export default WoowaBros;
