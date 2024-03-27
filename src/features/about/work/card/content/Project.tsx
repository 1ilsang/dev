import { FunctionComponent, MouseEventHandler, useMemo, useState } from 'react';

import { Project, ProjectName } from '../../models';

import UVP from './description/UVP';
import OAL from './description/OAL';
import LdsCalendar from './description/LdsCalendar';
import Place from './description/Place';
import OAP from './description/OAP';
import Bleet from './description/Bleet';
import MyBiskit from './description/MyBiskit';
import Blind from './description/Blind';
import Stove from './description/Stove';
import Tags from './Tags';
import ProjectDate from './ProjectDate';

import ExternalLink from '~/shared/components/ExternalLink';

export type CompanyContentProjectProps = Project & {
  format?: string;
};

const CompanyContentProject: FunctionComponent<CompanyContentProjectProps> = ({
  name,
  url,
  tags,
  startDate,
  endDate,
  format = 'yyyy.MM',
}) => {
  const [open, setOpen] = useState(false);

  const handleDetailClick: MouseEventHandler<HTMLDivElement> = () => {
    setOpen(!open);
  };

  const openClassName = open ? 'show' : 'hide';

  return (
    <div className="project">
      <div className="headline">
        <div className="title-wrap">
          <div
            className={`title ${open ? 'unfold' : 'fold'}`}
            onClick={handleDetailClick}
          >
            {name}
          </div>
          <ProjectDate
            startDate={startDate}
            endDate={endDate}
            format={format}
          />
        </div>
        <Tags tags={tags} />
      </div>
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
      {url && openClassName !== 'hide' && (
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
