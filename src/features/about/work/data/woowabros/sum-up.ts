import type { Company } from '../../models';
import { CompanyName, JobPosition } from '../../models';

import {
  CommerceAdminPlatform,
  CommerceInternalServer,
  WoowaAtelier,
  WoowaBookstreet,
} from './projects';

export const WoowaBros: Company = {
  company: CompanyName.WoowaBros,
  companyHref: 'https://www.linkedin.com/company/woowa-bros-/',
  companyLogoUrl: '/images/logo/woowa-bros.webp',
  workStartDate: 1724112000000, // 24.08.20
  position: JobPosition.FE,
  projectList: [
    WoowaAtelier,
    WoowaBookstreet,
    CommerceInternalServer,
    CommerceAdminPlatform,
  ],
};
