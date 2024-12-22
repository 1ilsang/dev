import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const magazine: Activity[] = [
  {
    name: 'Turborepo로 모노레포 개발 경험 향상하기',
    url: 'https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo',
    startDate: 1649948400000,
    endDate: 1649948400000,
  },
].map((activity) => ({ ...activity, type: ActivityType.magazine }));
