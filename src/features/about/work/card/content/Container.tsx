import { FunctionComponent, MouseEventHandler, useState } from 'react';

import { Project } from '../../models';

import Tags from './Tags';
import ProjectDate from './ProjectDate';
import ProjectDetail from './ProjectDetail';

import ExternalLink from '~/shared/components/ExternalLink';

export type CompanyContentProjectProps = Project & {
  format?: string;
};

const CompanyContentProject: FunctionComponent<CompanyContentProjectProps> = (
  props,
) => {
  const {
    name,
    url,
    tags,
    startDate,
    endDate,
    summary,
    format = 'yyyy.MM',
  } = props;
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
        <ProjectDetail {...props} />
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
