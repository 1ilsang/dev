import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const magazine: Activity[] = [
  {
    name: 'Vite에서 CSS 우선순위를 지키는 법: 우아한공방의 문제 해결기',
    url: 'https://techblog.woowa.in/23866',
    startDate: 1763046000000,
    endDate: 1763132400000,
  },
  {
    name: 'Turborepo로 모노레포 개발 경험 향상하기',
    url: 'https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo',
    startDate: 1649948400000,
    endDate: 1649948400000,
  },
].map((activity) => ({ ...activity, type: ActivityType.magazine }));
