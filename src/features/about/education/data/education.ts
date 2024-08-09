import type { Education } from '~/about/education/models';
import { UniversityName } from '~/about/education/models';

export const Catholic: Education = {
  name: UniversityName.catholic,
  url: 'https://catholic.ac.kr',
  major: '미디어공학, 컴퓨터정보공학 전공',
  logoUrl: '/assets/logo/catholic.webp',
  startDate: 1330527600000,
  endDate: 1534345200000,
};
