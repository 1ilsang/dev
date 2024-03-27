import { FunctionComponent, MouseEventHandler } from 'react';

import { WorkCardContainerProps } from '../Container';

import DateFormatter from '~/shared/components/DateFormatter';

type ContentHeadlineProps = Pick<
  WorkCardContainerProps,
  'workStartDate' | 'workEndDate'
> & {
  name: string;
  format?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  hover?: boolean;
};

const ContentHeadline: FunctionComponent<ContentHeadlineProps> = ({
  name,
  workStartDate,
  workEndDate,
  format = 'yyyy.MM',
  onClick,
  hover = true,
}) => {
  return (
    <div className="headline">
      <div
        id={name}
        onClick={onClick}
        className={`title${hover ? ' hover' : ''}`}
      >
        {name}
      </div>
      <div className="date">
        (<DateFormatter date={workStartDate} format={format} /> ~{' '}
        {workEndDate ? (
          <DateFormatter date={workEndDate} format={format} />
        ) : (
          'Present'
        )}
        )
      </div>
    </div>
  );
};

export default ContentHeadline;
