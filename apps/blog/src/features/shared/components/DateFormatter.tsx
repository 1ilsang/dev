import { FunctionComponent, useEffect, useState } from 'react';

import { formatDate, parseISO } from '../helpers/date';

type DateType = 'iso' | 'default';

interface DateFormatterProps {
  date: Date | number | string;
  type?: DateType;
  format?: string;
}

const DateFormatter: FunctionComponent<DateFormatterProps> = ({
  date,
  type = 'default',
  format,
}) => {
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    const time =
      type === 'iso' ? parseISO(String(date)) : formatDate(date, format);
    setDateTime(time);
  }, []);

  return (
    <time className="date-format" dateTime={dateTime}>
      {dateTime}
    </time>
  );
};

export default DateFormatter;
