import type { FunctionComponent } from 'react';

import DateFormatter from '../../shared/components/DateFormatter';

interface PublishedDateProps {
  date: string;
}

export const PublishedDate: FunctionComponent<PublishedDateProps> = ({
  date,
}) => {
  return (
    <div className="inline text-date-gray">
      Published <DateFormatter type="iso" date={date} />
    </div>
  );
};
