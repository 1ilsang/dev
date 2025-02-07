import { type FunctionComponent } from 'react';

import DateFormatter from '../../shared/components/DateFormatter';

interface PublishedDateProps {
  date: string;
  updatedDate?: string;
}

export const PublishedDate: FunctionComponent<PublishedDateProps> = ({
  date,
  updatedDate,
}) => {
  return (
    <div className="inline text-date-gray">
      <DateFormatter type="iso" date={date} before="Published" />
      {updatedDate && (
        <>
          <span className="mx-1">·</span>
          <DateFormatter type="iso" date={updatedDate} before="Updated" />
        </>
      )}
    </div>
  );
};
