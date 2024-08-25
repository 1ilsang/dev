import type { FunctionComponent } from 'react';
import { memo } from 'react';

import type { CompanyContentProjectProps } from './Container';

import DateFormatter from '~/shared/components/DateFormatter';
import classNames from 'classnames';

type ProjectDateProps = Pick<
  CompanyContentProjectProps,
  'startDate' | 'endDate' | 'format'
> & { className?: string };

export const ProjectDate: FunctionComponent<ProjectDateProps> = memo(
  ({ format, startDate, endDate, className }) => {
    return (
      <div
        className={classNames('select-none min-w-[119px] mr-2', [className])}
      >
        <DateFormatter date={startDate} format={format} /> -{' '}
        {endDate ? <DateFormatter date={endDate} format={format} /> : 'Present'}
      </div>
    );
  },
);
ProjectDate.displayName = 'ProjectDate';
