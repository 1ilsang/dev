import { Activity, ActivityType } from "~/about/activity/models";

const award: Activity[] = [
  {
    type: ActivityType.award,
    name: "산업융합 아이디어 경진대회 장관상",
    url: "https://blog.naver.com/1ilsang/221169478287",
    startDate: 1505660400000,
    endDate: 1513868400000,
  },
];

const sideProject: Activity[] = [
  {
    type: ActivityType.sideProject,
    name: "자바 MVC 채팅",
    url: "https://github.com/1ilsang/java-mvc-chatting",
    startDate: 1548428400000,
    endDate: 1549292400000,
  },
  {
    type: ActivityType.sideProject,
    name: "블라인드 앱 클론",
    url: "https://github.com/1ilsang/java-mvc-chatting",
    startDate: 1559055600000,
    endDate: 1562598000000,
  },
  {
    type: ActivityType.sideProject,
    name: "인터렉션 페이지",
    url: "https://github.com/Nexters/who-really-wants-to-play",
    startDate: 1673535600000,
    endDate: 1683730800000,
  },
  {
    type: ActivityType.sideProject,
    name: "Linkit - 링크 저장 앱",
    url: "https://github.com/1ilsang/linkit",
    startDate: 1670166000000,
  },
];

const conference: Activity[] = [
  {
    type: ActivityType.conference,
    name: "개발자를 위한 친절한 UI 컴포넌트 라이브러리 만들기",
    url: "https://engineering.linecorp.com/ko/blog/ui-component-library-for-developers-with-typescript-storybook",
    startDate: 1636556400000,
    endDate: 1636556400000,
  },
];

const magazine: Activity[] = [
  {
    type: ActivityType.magazine,
    name: "Turborepo로 모노레포 개발 경험 향상하기",
    url: "https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo",
    startDate: 1649948400000,
    endDate: 1649948400000,
  },
];

const hackathon: Activity[] = [
  {
    type: ActivityType.hackathon,
    name: "NAVER Campus Hackday",
    url: "https://blog.naver.com/1ilsang/221133223562",
    startDate: 1511362800000,
    endDate: 1511449200000,
  },
  {
    type: ActivityType.hackathon,
    name: "유니톤: 우수상",
    url: "https://blog.naver.com/1ilsang/221196038518",
    startDate: 1516892400000,
    endDate: 1517065200000,
  },
  {
    type: ActivityType.hackathon,
    name: "AWS Amathon",
    url: "https://blog.naver.com/1ilsang/221325485852",
    startDate: 1532012400000,
    endDate: 1532098800000,
  },
  {
    type: ActivityType.hackathon,
    name: "스포카 무쓸모톤",
    url: "https://blog.naver.com/1ilsang/221542063457",
    startDate: 1558105200000,
    endDate: 1558191600000,
  },
];

const club: Activity[] = [
  {
    type: ActivityType.club,
    name: "WFK ICT 봉사단: 네팔 고등학교 홈페이지 제작",
    url: "https://blog.naver.com/1ilsang/221080023998",
    startDate: 1501513200000,
    endDate: 1504018800000,
  },
  {
    type: ActivityType.club,
    name: "디자이너와 프로그래머가 만났을 때 3기",
    url: "https://medium.com/depromeet/%EB%94%94%ED%94%84%EB%A7%8C-4%EA%B8%B0-%EB%94%94%ED%94%84%EB%A7%8C-x-%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81-%EC%84%B8%EB%AF%B8%EB%82%98-89700bfc072b",
    startDate: 1504710000000,
    endDate: 1527778800000,
  },
  {
    type: ActivityType.club,
    name: "Smilegate - Server Dev Camp",
    url: "https://blog.naver.com/1ilsang/221226071204",
    startDate: 1514818800000,
    endDate: 1519138800000,
  },
  {
    type: ActivityType.club,
    name: "삼성청년SW아카데미(SSAFY) 1기",
    url: "https://blog.naver.com/1ilsang/221409756139",
    startDate: 1544367600000,
    endDate: 1558796400000,
  },
  {
    type: ActivityType.club,
    name: "넥스터즈",
    url: "https://teamnexters.com/",
    startDate: 1641394800000,
    endDate: 1683730800000,
  },
];

const openSource: Activity[] = [
  {
    type: ActivityType.openSource,
    name: "[번역] Webpack.kr",
    url: "https://blog.naver.com/1ilsang/222517766844",
    startDate: 1624374000000,
  },
  {
    type: ActivityType.openSource,
    name: "[번역] MDN Web Docs",
    url: "https://github.com/mdn/translated-content/pulls?q=is%3Apr+is%3Aclosed+author%3A1ilsang",
    startDate: 1678374000000,
  },
  {
    type: ActivityType.openSource,
    name: "[번역] React.dev",
    url: "https://github.com/reactjs/ko.react.dev/pulls?q=is%3Apr+is%3Aclosed+author%3A1ilsang",
    startDate: 1682866800000,
  },
];

export const activityData: Activity[] = [
  ...award,
  ...sideProject,
  ...conference,
  ...magazine,
  ...hackathon,
  ...club,
  ...openSource,
];
