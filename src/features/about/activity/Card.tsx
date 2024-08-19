import type { FunctionComponent } from 'react';

import type { Activity } from './models';

import ExternalLink from '~/shared/components/ExternalLink';

type ActivityCardContainerProps = {
  year: string;
  list: Activity[];
};

const ActivityCardContainer: FunctionComponent<ActivityCardContainerProps> = ({
  year,
  list,
}) => {
  return (
    <article className="about-activity-card">
      <div className="year">
        <div>{year}</div>
      </div>
      <div className="content">
        <ul className="left-line">
          {list.map((activity) => (
            <li key={activity.name}>
              <span className="category">{activity.type}</span>
              <div className="link-wrap">
                <ExternalLink
                  className="link"
                  href={activity.url}
                  label={activity.name}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ActivityCardContainer;
