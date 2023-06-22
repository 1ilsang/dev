import { FunctionComponent } from "react";

import { Activity } from "./models";

import ExternalLink from "~/shared/components/ExternalLink";

type ActivityCardContainerProps = {
  year: string;
  list: Activity[];
};

const ActivityCardContainer: FunctionComponent<ActivityCardContainerProps> = ({
  year,
  list,
}) => {
  return (
    <div className="about-work-card">
      <div className="logo year">
        <div>{year}</div>
      </div>
      <div className="content">
        <ul className="left-line">
          {list.map((activity) => (
            <li key={activity.name}>
              <span className="category">{activity.type}</span>
              <div className="link-wrap">
                <ExternalLink
                  classNames="link"
                  href={activity.url}
                  label={activity.name}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityCardContainer;
