import { FunctionComponent } from "react";

import DateFormatter from "./DateFormatter";

interface PublishedDateProps {
  date: string;
}

const PublishedDate: FunctionComponent<PublishedDateProps> = ({ date }) => {
  return (
    <div className="date-published">
      <DateFormatter iso={date} /> published
    </div>
  );
};

export default PublishedDate;
