import { FunctionComponent } from "react";

import { formatDate, parseISO } from "../helpers/date";

type DateType = "iso" | "default";

interface DateFormatterProps {
  date: Date | number | string;
  type?: DateType;
  format?: string;
}

const DateFormatter: FunctionComponent<DateFormatterProps> = ({
  date,
  type = "default",
  format,
}) => {
  const dateTime =
    type === "iso" ? parseISO(String(date)) : formatDate(date, format);

  return (
    <time className="date-format" dateTime={dateTime}>
      {dateTime}
    </time>
  );
};

export default DateFormatter;
