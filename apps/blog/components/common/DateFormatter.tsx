import { FunctionComponent } from "react";
import { parseISO } from "../../helpers/date";

interface DateFormatterProps {
  iso: string;
}

const DateFormatter: FunctionComponent<DateFormatterProps> = ({ iso }) => {
  return (
    <time className="date-format" dateTime={iso}>
      {parseISO(iso)}
    </time>
  );
};

export default DateFormatter;
