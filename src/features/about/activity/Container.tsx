import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import ActivityCardContainer from './Card';
import type { Activity } from './models';

import { activityData } from '~/about/activity/data/activity';
import { Label } from '../shared/Label';

const ActivityContainer: FunctionComponent = () => {
  const activityList = useMemo(() => {
    const sortedList = activityData.sort((a, b) =>
      a.startDate > b.startDate ? -1 : 1,
    );
    const years: Record<number, Activity[]> = {};
    sortedList.forEach((activity) => {
      const curYear = new Date(activity.startDate).getFullYear();
      if (!years[curYear]) {
        years[curYear] = [];
      }
      years[curYear].push(activity);
    });
    return Object.entries(years).sort((a, b) => (a[0] > b[0] ? -1 : 1));
  }, [activityData]);

  return (
    <section className="flex flex-col pb-16">
      <Label label="ACTIVITY" />
      {activityList.map((activity) => (
        <ActivityCardContainer
          key={activity[0]}
          year={activity[0]}
          list={activity[1]}
        />
      ))}
    </section>
  );
};

export default ActivityContainer;
