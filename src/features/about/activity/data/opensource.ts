import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const openSource: Activity[] = [
  {
    name: 'Node.js Triager 합류',
    url: 'https://github.com/nodejs/node?tab=readme-ov-file#triagers',
    startDate: 1740871800000,
  },
  {
    name: 'Mozilla Developer Network(MDN) @mdn/yari-content-ko 팀 합류',
    url: '/posts/mdn-ko-organizer',
    startDate: 1709113159904,
  },
  {
    name: 'Road of CODEr - Maintainer',
    url: 'https://github.com/Road-of-CODEr',
    startDate: 1590937200000,
  },
  {
    name: 'Webpack.kr',
    url: 'https://blog.naver.com/1ilsang/222517766844',
    startDate: 1624374000000,
  },
  {
    name: 'MDN Web Docs',
    url: 'https://github.com/mdn/translated-content/pulls?q=is%3Apr+is%3Aclosed+author%3A1ilsang+created%3A%3C2024-01-01+',
    startDate: 1678374000000,
  },
  {
    name: 'React.dev',
    url: 'https://github.com/reactjs/ko.react.dev/pulls?q=is%3Apr+is%3Aclosed+author%3A1ilsang',
    startDate: 1682866800000,
  },
].map((activity) => ({ ...activity, type: ActivityType.openSource }));
