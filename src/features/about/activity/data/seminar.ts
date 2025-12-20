import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const seminar: Activity[] = [
  {
    name: '[우아콘] 당연해진 디자인시스템, 그다음 이야기: AST와 MCP로 여는 미래',
    url: 'https://2025.woowacon.com/sessions?sessionId=819',
    startDate: 1761634200000, // 2025.10.28 15:50
    endDate: 1761636600000, // 2025.10.28 16:30
  },
  {
    name: '우아콘 이그나이트 - 오픈소스 참여 경험',
    url: '/posts/2024-woowa-ignite',
    startDate: 1730214000000, // 2024.10.28 15:50
    endDate: 1730214000000, // 2024.10.28 16:30
  },
  {
    name: '모여봐요 오픈소스의 숲',
    url: '/posts/geultto8-open-source-seminar',
    startDate: 1693567800000, // 2023.09.01 15:50
    endDate: 1693567800000, // 2023.09.01 16:30
  },
].map((activity) => ({ ...activity, type: ActivityType.seminar }));
