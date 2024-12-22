import { ActivityType, type Activity } from '../models';

export const award: Activity[] = [
  {
    name: '오픈소스 컨트리뷰션 Node.js - 과학기술정보통신부 장관상',
    url: 'https://www.oss.kr/notice/show/b6c4ed79-6435-444b-b4b0-debbb041354f',
    startDate: 1731596400000,
    endDate: 1731596400000,
  },
  {
    name: '산업융합 아이디어 경진대회 - 산업통상자원부 장관상',
    url: 'https://blog.naver.com/1ilsang/221169478287',
    startDate: 1505660400000,
    endDate: 1513868400000,
  },
].map((activity) => ({ ...activity, type: ActivityType.award }));
