import type { FunctionComponent } from 'react';

import type { Activity } from './models';

import { RightSide } from '../work/card/content/RightSide';
import { CardItem } from './CardItem';

type ActivityCardContainerProps = {
  year: string;
  list: Activity[];
};

const ActivityCardContainer: FunctionComponent<ActivityCardContainerProps> = ({
  year,
  list,
}) => {
  return (
    <article className="flex flex-col mt-4 print:flex-row md:flex-row leading-7">
      <div className="w-48 select-none min-w-20 mt-4 mb-1 md:mt-0 md:mb-0 text-xl hover:drop-shadow-[2px_2px_2px_lightgray] hover:invert-[2%]">
        {year}
      </div>
      <RightSide>
        <ul className="pl-4 border-l-[0.24rem] border-dark">
          {list.map((activity) => (
            <CardItem activity={activity} key={activity.name} />
          ))}
        </ul>
      </RightSide>
    </article>
  );
};

export default ActivityCardContainer;
