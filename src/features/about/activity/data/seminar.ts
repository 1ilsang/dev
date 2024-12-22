import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const seminar: Activity[] = [
  {
    name: '모여봐요 오픈소스의 숲',
    url: '/posts/geultto8-open-source-seminar',
    startDate: 1693567800000,
    endDate: 1693567800000,
  },
].map((activity) => ({ ...activity, type: ActivityType.seminar }));
