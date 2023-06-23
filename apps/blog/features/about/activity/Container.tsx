import { FunctionComponent, useMemo } from "react";

import ActivityCardContainer from "./Card";
import { Activity } from "./models";

import { activityData } from "~data/activity";

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
    <section className="about-activity">
      <div className="label">ACTIVITY</div>
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
