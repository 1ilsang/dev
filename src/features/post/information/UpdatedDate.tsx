import { FunctionComponent } from 'react';

import DateFormatter from '../../shared/components/DateFormatter';

interface PublishedDateProps {
  date: string;
}

export const UpdatedDate: FunctionComponent<PublishedDateProps> = ({
  date,
}) => {
  return (
    <div className="text-date-gray inline before:content-['|'] before:mx-2">
      Updated <DateFormatter type="iso" date={date} />
    </div>
  );
};
