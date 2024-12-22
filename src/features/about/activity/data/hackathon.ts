import type { Activity } from '~/about/activity/models';
import { ActivityType } from '~/about/activity/models';

export const hackathon: Activity[] = [
  {
    name: 'NAVER Campus Hackday',
    url: 'https://blog.naver.com/1ilsang/221133223562',
    startDate: 1511362800000,
    endDate: 1511449200000,
  },
  {
    name: 'UNITHON 6th',
    url: 'https://blog.naver.com/1ilsang/221196038518',
    startDate: 1516892400000,
    endDate: 1517065200000,
  },
  {
    name: 'AWS Amathon',
    url: 'https://blog.naver.com/1ilsang/221325485852',
    startDate: 1532012400000,
    endDate: 1532098800000,
  },
  {
    name: 'Spoqa 무쓸모톤',
    url: 'https://blog.naver.com/1ilsang/221542063457',
    startDate: 1558105200000,
    endDate: 1558191600000,
  },
  {
    name: 'Junction Asia 2023',
    url: '/posts/junction2023',
    startDate: 1692284400000,
    endDate: 1692457200000,
  },
].map((activity) => ({ ...activity, type: ActivityType.hackathon }));
