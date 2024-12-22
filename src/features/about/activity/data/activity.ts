import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

const award: Activity[] = [
  {
    type: ActivityType.award,
    name: '오픈소스 컨트리뷰션 Node.js - 과학기술정보통신부 장관상',
    url: 'https://www.oss.kr/notice/show/b6c4ed79-6435-444b-b4b0-debbb041354f',
    startDate: 1731596400000,
    endDate: 1731596400000,
  },
  {
    type: ActivityType.award,
    name: '산업융합 아이디어 경진대회 - 산업통상자원부 장관상',
    url: 'https://blog.naver.com/1ilsang/221169478287',
    startDate: 1505660400000,
    endDate: 1513868400000,
  },
];

const conference: Activity[] = [
  {
    type: ActivityType.conference,
    name: '개발자를 위한 친절한 UI 컴포넌트 라이브러리 만들기',
    url: 'https://engineering.linecorp.com/ko/blog/ui-component-library-for-developers-with-typescript-storybook',
    startDate: 1636556400000,
    endDate: 1636556400000,
  },
];

const seminar: Activity[] = [
  {
    type: ActivityType.seminar,
    name: '모여봐요 오픈소스의 숲',
    url: '/posts/geultto8-open-source-seminar',
    startDate: 1693567800000,
    endDate: 1693567800000,
  },
];

const magazine: Activity[] = [
  {
    type: ActivityType.magazine,
    name: 'Turborepo로 모노레포 개발 경험 향상하기',
    url: 'https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo',
    startDate: 1649948400000,
    endDate: 1649948400000,
  },
];

const hackathon: Activity[] = [
  {
    type: ActivityType.hackathon,
    name: 'NAVER Campus Hackday',
    url: 'https://blog.naver.com/1ilsang/221133223562',
    startDate: 1511362800000,
    endDate: 1511449200000,
  },
  {
    type: ActivityType.hackathon,
    name: 'UNITHON 6th',
    url: 'https://blog.naver.com/1ilsang/221196038518',
    startDate: 1516892400000,
    endDate: 1517065200000,
  },
  {
    type: ActivityType.hackathon,
    name: 'AWS Amathon',
    url: 'https://blog.naver.com/1ilsang/221325485852',
    startDate: 1532012400000,
    endDate: 1532098800000,
  },
  {
    type: ActivityType.hackathon,
    name: 'Spoqa 무쓸모톤',
    url: 'https://blog.naver.com/1ilsang/221542063457',
    startDate: 1558105200000,
    endDate: 1558191600000,
  },
  {
    type: ActivityType.hackathon,
    name: 'Junction Asia 2023',
    url: '/posts/junction2023',
    startDate: 1692284400000,
    endDate: 1692457200000,
  },
];

const club: Activity[] = [
  {
    type: ActivityType.club,
    name: 'WFK ICT Volunteer - 네팔 고등학교 홈페이지 제작',
    url: 'https://blog.naver.com/1ilsang/221080023998',
    startDate: 1501513200000,
    endDate: 1504018800000,
  },
  {
    type: ActivityType.club,
    name: 'Depromeet 3rd',
    url: 'https://medium.com/depromeet/%EB%94%94%ED%94%84%EB%A7%8C-4%EA%B8%B0-%EB%94%94%ED%94%84%EB%A7%8C-x-%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81-%EC%84%B8%EB%AF%B8%EB%82%98-89700bfc072b',
    startDate: 1504710000000,
    endDate: 1527778800000,
  },
  {
    type: ActivityType.club,
    name: 'Server Dev Camp 3rd',
    url: 'https://blog.naver.com/1ilsang/221226071204',
    startDate: 1514818800000,
    endDate: 1519138800000,
  },
  {
    type: ActivityType.club,
    name: 'Samsung Software Academy For Youth(SSAFY) 1st',
    url: 'https://blog.naver.com/1ilsang/221546695268',
    startDate: 1544367600000,
    endDate: 1558796400000,
  },
  {
    type: ActivityType.club,
    name: 'Nexters 20th',
    url: 'https://teamnexters.com/',
    startDate: 1641394800000,
    endDate: 1683730800000,
  },
  {
    type: ActivityType.club,
    name: 'Geultto 5th',
    url: 'https://geultto.github.io/docs/intro',
    startDate: 1604156400000,
  },
];

const openSource: Activity[] = [
  {
    type: ActivityType.openSource,
    name: 'Mozilla Developer Network(MDN) @mdn/yari-content-ko 팀 합류',
    url: '/posts/mdn-ko-organizer',
    startDate: 1709113159904,
  },
  {
    type: ActivityType.openSource,
    name: 'Road of CODEr - Maintainer',
    url: 'https://github.com/Road-of-CODEr',
    startDate: 1590937200000,
  },
  {
    type: ActivityType.openSource,
    name: 'Webpack.kr',
    url: 'https://blog.naver.com/1ilsang/222517766844',
    startDate: 1624374000000,
  },
  {
    type: ActivityType.openSource,
    name: 'MDN Web Docs',
    url: 'https://github.com/mdn/translated-content/pulls?q=is%3Apr+is%3Aclosed+author%3A1ilsang',
    startDate: 1678374000000,
  },
  {
    type: ActivityType.openSource,
    name: 'React.dev',
    url: 'https://github.com/reactjs/ko.react.dev/pulls?q=is%3Apr+is%3Aclosed+author%3A1ilsang',
    startDate: 1682866800000,
  },
];

const SNS: Activity[] = [
  {
    type: ActivityType.sns,
    name: '재택 근무하며 회사에서 친구 만들기(feat. 라인 프런트엔드 개발자)',
    url: 'https://www.youtube.com/watch?v=zr3WPa_aIcU&ab_channel=%EB%9D%BC%EC%9D%B8%EA%B0%9C%EB%B0%9C%EC%8B%A4%EB%A1%9D',
    startDate: 1648047600000,
    endDate: 1648047600000,
  },
  {
    type: ActivityType.sns,
    name: '프런트엔드 밸런스 게임',
    url: 'https://www.youtube.com/watch?v=mjeW7BUaU1c&t=312s&ab_channel=%EB%9D%BC%EC%9D%B8%EA%B0%9C%EB%B0%9C%EC%8B%A4%EB%A1%9D',
    startDate: 1684422000000,
    endDate: 1684422000000,
  },
];

export const activityData: Activity[] = [
  ...award,
  ...conference,
  ...magazine,
  ...hackathon,
  ...club,
  ...openSource,
  ...SNS,
  ...seminar,
];
