import { Company, CompanyName, JobPosition } from '../../models';

import { Stove } from './projects';

const SmileGate: Company = {
  company: CompanyName.Smilegate,
  companyHref: 'https://www.linkedin.com/company/smilegate/',
  companyLogoUrl:
    'https://github.com/1ilsang/dev/assets/23524849/932fade0-e7bf-4fdc-b7a8-c346fedbb76d',
  workStartDate: 1520780400000,
  workEndDate: 1530457200000,
  position: `${JobPosition.FE}(intern)`,
  projectList: [Stove],
};

export default SmileGate;
