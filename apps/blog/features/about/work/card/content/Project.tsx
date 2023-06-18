import { FunctionComponent, MouseEventHandler, useMemo, useState } from "react";

import { Project, ProjectName } from "../../models";
import ProgressBar from "../../../../shared/components/ProgressBar";

import UVP from "./description/UVP";
import OAL from "./description/OAL";
import LdsCalendar from "./description/LdsCalendar";
import Place from "./description/Place";
import OAP from "./description/OAP";
import Bleet from "./description/Bleet";
import MyBiskit from "./description/MyBiskit";
import Blind from "./description/Blind";
import Stove from "./description/Stove";
import Tags from "./Tags";
import ProjectDate from "./ProjectDate";

import ExternalLink from "~/shared/components/ExternalLink";

export type CompanyContentProjectProps = Project & {
  totalPeriod: number;
  format?: string;
};

const CompanyContentProject: FunctionComponent<CompanyContentProjectProps> = ({
  name,
  url,
  tags,
  startDate,
  endDate,
  totalPeriod,
  format = "yyyy.MM",
}) => {
  const [open, setOpen] = useState(name === ProjectName.UVP);

  const value = useMemo(
    () => (endDate ?? Number(new Date())) - startDate,
    [startDate, endDate],
  );

  const handleDetailClick: MouseEventHandler<HTMLDivElement> = () => {
    setOpen(!open);
  };

  const openClassName = open ? "show" : "hide";
  const privateProject = [ProjectName.VLC];
  if (privateProject.includes(name)) {
    return null;
  }

  return (
    <div className="project">
      <div className="headline">
        <div className="title" onClick={handleDetailClick}>
          {name}
        </div>
        {open && (
          <ProjectDate
            startDate={startDate}
            endDate={endDate}
            format={format}
          />
        )}
        <ProgressBar value={value} total={totalPeriod} />
      </div>
      <Tags show={openClassName} tags={tags} />
      <div className={`description ${openClassName}`}>
        {name === ProjectName.OAL && <OAL />}
        {name === ProjectName.LDS_CALENDAR && <LdsCalendar />}
        {name === ProjectName.UVP && <UVP />}
        {name === ProjectName.PLACE && <Place />}
        {name === ProjectName.OAP && <OAP />}
        {name === ProjectName.Bleet && <Bleet />}
        {name === ProjectName.MyBiskit && <MyBiskit />}
        {name === ProjectName.Blind && <Blind />}
        {name === ProjectName.Stove && <Stove />}
      </div>
      {url && openClassName !== "hide" && (
        <ExternalLink
          classNames={openClassName}
          href={url}
          label={`> 서비스 구경하기`}
        />
      )}
    </div>
  );
};

export default CompanyContentProject;
