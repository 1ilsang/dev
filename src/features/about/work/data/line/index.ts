import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import { LDS_CALENDAR, LPC, OAL, OAP, PLACE, UVP, VLC } from './projects';

const LINE: Company = {
  company: CompanyName.LINE,
  companyHref: 'https://www.linkedin.com/company/line-messenger/',
  companyLogoUrl:
    'https://github.com/1ilsang/dev/assets/23524849/81800e67-b54f-41e8-a232-520c99f465c8',
  position: JobPosition.FE,
  workStartDate: 1596985200000,
  workEndDate: 1721638800000,
  projectList: [LPC, UVP, VLC, OAL, LDS_CALENDAR, PLACE, OAP],
};

export default LINE;
