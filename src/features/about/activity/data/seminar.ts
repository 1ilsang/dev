import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const seminar: Activity[] = [
  {
    name: '우아콘 이그나이트 - 오픈소스 참여 경험',
    url: '/posts/2024-woowa-ignite',
    startDate: 1730214000000,
    endDate: 1730214000000,
  },
  {
    name: '모여봐요 오픈소스의 숲',
    url: '/posts/geultto8-open-source-seminar',
    startDate: 1693567800000,
    endDate: 1693567800000,
  },
].map((activity) => ({ ...activity, type: ActivityType.seminar }));
