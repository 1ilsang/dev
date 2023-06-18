import { FunctionComponent } from "react";

import { CompanyContentProjectProps } from "./Project";

import DateFormatter from "~/shared/components/DateFormatter";

type ProjectDateProps = Pick<
  CompanyContentProjectProps,
  "startDate" | "endDate" | "format"
>;

const ProjectDate: FunctionComponent<ProjectDateProps> = ({
  format,
  startDate,
  endDate,
}) => {
  return (
    <div className="date">
      (
      <DateFormatter date={startDate} format={format} /> ~{" "}
      {endDate ? <DateFormatter date={endDate} format={format} /> : "Present"})
    </div>
  );
};

export default ProjectDate;
