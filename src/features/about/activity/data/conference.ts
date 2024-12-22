import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const conference: Activity[] = [
  {
    name: '개발자를 위한 친절한 UI 컴포넌트 라이브러리 만들기',
    url: 'https://engineering.linecorp.com/ko/blog/ui-component-library-for-developers-with-typescript-storybook',
    startDate: 1636556400000,
    endDate: 1636556400000,
  },
].map((activity) => ({ ...activity, type: ActivityType.conference }));
