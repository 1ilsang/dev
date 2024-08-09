import { FunctionComponent } from 'react';

import DateFormatter from '../../shared/components/DateFormatter';

interface PublishedDateProps {
  date: string;
}

export const PublishedDate: FunctionComponent<PublishedDateProps> = ({
  date,
}) => {
  return (
    <div className="text-date-gray inline">
      Published <DateFormatter type="iso" date={date} />
    </div>
  );
};
