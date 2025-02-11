import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const club: Activity[] = [
  {
    name: 'WFK ICT Volunteer - 네팔 고등학교 홈페이지 제작',
    url: 'https://blog.naver.com/1ilsang/221080023998',
    startDate: 1501513200000,
    endDate: 1504018800000,
  },
  {
    name: 'Depromeet 3rd',
    url: 'https://medium.com/depromeet/%EB%94%94%ED%94%84%EB%A7%8C-4%EA%B8%B0-%EB%94%94%ED%94%84%EB%A7%8C-x-%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81-%EC%84%B8%EB%AF%B8%EB%82%98-89700bfc072b',
    startDate: 1504710000000,
    endDate: 1527778800000,
  },
  {
    name: 'Smilegate Server Dev Camp 3rd',
    url: 'https://blog.naver.com/1ilsang/221226071204',
    startDate: 1514818800000,
    endDate: 1519138800000,
  },
  {
    name: 'Samsung Software Academy For Youth(SSAFY) 1st',
    url: 'https://blog.naver.com/1ilsang/221546695268',
    startDate: 1544367600000,
    endDate: 1558796400000,
  },
  {
    name: 'Nexters 20th',
    url: 'https://teamnexters.com/',
    startDate: 1641394800000,
    endDate: 1683730800000,
  },
  {
    name: 'Geultto 5th',
    url: 'https://geultto.github.io/docs/intro',
    startDate: 1604156400000,
  },
].map((activity) => ({ ...activity, type: ActivityType.club }));
