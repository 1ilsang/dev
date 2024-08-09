import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import { Stove } from './projects';

const SmileGate: Company = {
  company: CompanyName.Smilegate,
  companyHref: 'https://www.linkedin.com/company/smilegate/',
  companyLogoUrl: '/assets/logo/smilegate.webp',
  workStartDate: 1520780400000, // 2018.03.12
  workEndDate: 1530230400000, // 2018.06.29
  position: `${JobPosition.FE}(intern)`,
  projectList: [Stove],
};

export default SmileGate;
