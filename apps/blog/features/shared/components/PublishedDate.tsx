import { FunctionComponent } from "react";

import DateFormatter from "./DateFormatter";

interface PublishedDateProps {
  date: string;
}

const PublishedDate: FunctionComponent<PublishedDateProps> = ({ date }) => {
  return (
    <div className="date-published">
      <DateFormatter type="iso" date={date} /> published
    </div>
  );
};

export default PublishedDate;
