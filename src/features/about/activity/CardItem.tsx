import ExternalLink from '~/shared/components/ExternalLink';
import type { Activity } from './models';
import type { FunctionComponent } from 'react';

type Props = {
  activity: Activity;
};

export const CardItem: FunctionComponent<Props> = ({ activity }) => {
  return (
    <li className="flex">
      <span className="min-w-[120px] text-white-blue print:text-black">
        {activity.type}
      </span>
      <div className="w-full">
        <ExternalLink
          className="underline-highlight-fade-dark print:text-black print:underline print:decoration-2"
          href={activity.url}
          label={activity.name}
          disableDefaultCSSTransition
        />
      </div>
    </li>
  );
};
