import type { FunctionComponent } from 'react';
import { memo } from 'react';

import type { CompanyContentProjectProps } from './Container';

import DateFormatter from '~/shared/components/DateFormatter';

type ProjectDateProps = Pick<
  CompanyContentProjectProps,
  'startDate' | 'endDate' | 'format'
>;

const ProjectDate: FunctionComponent<ProjectDateProps> = memo(
  ({ format, startDate, endDate }) => {
    return (
      <div className="date">
        <DateFormatter date={startDate} format={format} /> -{' '}
        {endDate ? <DateFormatter date={endDate} format={format} /> : 'Present'}
      </div>
    );
  },
);
ProjectDate.displayName = 'ProjectDate';

export default ProjectDate;
