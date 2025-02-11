import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import { LDS_CALENDAR, LPC, OAL, OAP, PLACE, UVP, VLC } from './projects';

export const LINE: Company = {
  company: CompanyName.LINE,
  companyHref: 'https://www.linkedin.com/company/line-messenger/',
  companyLogoUrl: '/images/logo/line.webp',
  position: JobPosition.FE,
  workStartDate: 1596985200000, // 2020.08.10
  workEndDate: 1721638800000, // 2024.07.22
  projectList: [LPC, UVP, VLC, OAL, LDS_CALENDAR, PLACE, OAP],
};
