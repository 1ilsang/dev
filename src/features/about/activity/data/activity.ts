import type { Activity } from '~/about/activity/models';
import { award } from './award';
import { conference } from './conference';
import { club } from './club';
import { hackathon } from './hackathon';
import { magazine } from './magazine';
import { openSource } from './opensource';
import { seminar } from './seminar';
import { SNS } from './sns';

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
