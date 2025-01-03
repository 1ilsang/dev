import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const SNS: Activity[] = [
  {
    name: '재택 근무하며 회사에서 친구 만들기(feat. 라인 프런트엔드 개발자)',
    url: 'https://www.youtube.com/watch?v=zr3WPa_aIcU&ab_channel=%EB%9D%BC%EC%9D%B8%EA%B0%9C%EB%B0%9C%EC%8B%A4%EB%A1%9D',
    startDate: 1648047600000,
    endDate: 1648047600000,
  },
  {
    name: '프런트엔드 밸런스 게임',
    url: 'https://www.youtube.com/watch?v=mjeW7BUaU1c&t=312s&ab_channel=%EB%9D%BC%EC%9D%B8%EA%B0%9C%EB%B0%9C%EC%8B%A4%EB%A1%9D',
    startDate: 1684422000000,
    endDate: 1684422000000,
  },
].map((activity) => ({ ...activity, type: ActivityType.sns }));
