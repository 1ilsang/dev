import { FunctionComponent, useEffect, useMemo, useState } from "react";

import { Company } from "../models";

import CompanyLogo from "./Logo";
import CompanyContentHeadline from "./content/Headline";
import CompanyContentProject from "./content/Project";

export type WorkCardContainerProps = Company & {
  toggleOpenAll: boolean;
};

const DATE_FORMAT = "yyyy.MM";

const WorkCardContainer: FunctionComponent<WorkCardContainerProps> = (
  props,
) => {
  const {
    workStartDate,
    workEndDate,
    projectList,
    toggleOpenAll,
    position = "Software Engineer",
  } = props;

  const [open, setOpen] = useState(true);
  const handleHeadlineClick = () => setOpen(!open);

  const totalPeriod = useMemo(() => {
    const end = workEndDate ?? Number(new Date());
    return end - workStartDate;
  }, [workStartDate, workEndDate]);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setOpen(toggleOpenAll);
  }, [toggleOpenAll]);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return <div className="about-work-card skeleton" />;
  }

  return (
    <div className="about-work-card">
      <CompanyLogo {...props} />
      <div className="content">
        <CompanyContentHeadline
          {...props}
          format={DATE_FORMAT}
          onClick={handleHeadlineClick}
        />
        <div className="position">{position}</div>
        <div className={`${open ? `show` : `hide`}`}>
          {projectList.map((project) => (
            <CompanyContentProject
              key={project.name}
              {...project}
              format={DATE_FORMAT}
              totalPeriod={totalPeriod}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkCardContainer;
