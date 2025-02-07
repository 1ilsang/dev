import type { FunctionComponent } from 'react';
import { memo } from 'react';

import { formatDate, parseISO } from '../helpers/date';

type DateType = 'iso' | 'default';

interface DateFormatterProps {
  date: Date | number | string;
  before?: string;
  type?: DateType;
  format?: string;
  className?: string;
}

const DateFormatter: FunctionComponent<DateFormatterProps> = memo(
  ({ date, type = 'default', format, className, before }) => {
    const dateTime =
      type === 'iso' ? parseISO(String(date)) : formatDate(date, format);

    return (
      <>
        {before && <span className="mr-1">{before}</span>}
        <time
          className={className}
          dateTime={dateTime}
          suppressHydrationWarning
        >
          {dateTime}
        </time>
      </>
    );
  },
);
DateFormatter.displayName = 'DateFormatter';

export default DateFormatter;
