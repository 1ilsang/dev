import { FunctionComponent, memo, useState } from 'react';

import { formatDate, parseISO } from '../helpers/date';

type DateType = 'iso' | 'default';

interface DateFormatterProps {
  date: Date | number | string;
  type?: DateType;
  format?: string;
}

const DateFormatter: FunctionComponent<DateFormatterProps> = memo(
  ({ date, type = 'default', format }) => {
    const dateTime =
      type === 'iso' ? parseISO(String(date)) : formatDate(date, format);

    return (
      <time
        className="date-format"
        dateTime={dateTime}
        suppressHydrationWarning
      >
        {dateTime}
      </time>
    );
  },
);
DateFormatter.displayName = 'DateFormatter';

export default DateFormatter;
