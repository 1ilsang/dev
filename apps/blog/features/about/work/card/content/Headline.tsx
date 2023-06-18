import { FunctionComponent, MouseEventHandler } from "react";

import { WorkCardContainerProps } from "../Container";

import DateFormatter from "~/shared/components/DateFormatter";

type CompanyContentHeadlineProps = Pick<
  WorkCardContainerProps,
  "company" | "workStartDate" | "workEndDate"
> & { format?: string; onClick: MouseEventHandler<HTMLDivElement> };

const CompanyContentHeadline: FunctionComponent<
  CompanyContentHeadlineProps
> = ({ company, workStartDate, workEndDate, format = "yyyy.MM", onClick }) => {
  return (
    <div className="headline">
      <div className="title" onClick={onClick}>
        {company}
      </div>
      <div className="date">
        (<DateFormatter date={workStartDate} format={format} /> ~{" "}
        {workEndDate ? (
          <DateFormatter date={workEndDate} format={format} />
        ) : (
          "Present"
        )}
        )
      </div>
    </div>
  );
};

export default CompanyContentHeadline;
