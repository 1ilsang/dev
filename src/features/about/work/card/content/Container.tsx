import type { FunctionComponent, MouseEventHandler } from 'react';
import { useState } from 'react';
import classNames from 'classnames';

import type { Project } from '../../models';

import Tags from './Tags';
import ProjectDate from './ProjectDate';
import ProjectDetail from './ProjectDetail';

import ExternalLink from '~/shared/components/ExternalLink';
import usePrint from '~/shared/hooks/usePrint';

export type CompanyContentProjectProps = Project & {
  format?: string;
};

const CompanyContentProject: FunctionComponent<CompanyContentProjectProps> = (
  props,
) => {
  const { name, url, tags, startDate, endDate, format = 'yyyy.MM' } = props;
  const [open, setOpen] = useState<boolean>(undefined);
  const { print } = usePrint();

  const handleDetailClick: MouseEventHandler<HTMLDivElement> = () => {
    setOpen(!open);
  };

  const openClassName = (() => {
    if (print) return 'show';
    if (open === undefined) return 'invisible opacity-0	max-h-0';
    return open ? 'show' : 'hide';
  })();
  const foldState = (() => {
    if (print) return 'unfold';
    return open ? 'unfold' : 'fold';
  })();
  const externalLink = (() => {
    if (print) return undefined;
    return open !== undefined && url && openClassName !== 'hide';
  })();

  return (
    <div className="project">
      <div className="headline" onClick={handleDetailClick}>
        <div className="title-wrap">
          <div className={classNames('title', [foldState])}>{name}</div>
          <ProjectDate
            startDate={startDate}
            endDate={endDate}
            format={format}
          />
        </div>
        <Tags tags={tags} />
      </div>
      <div className={classNames(`description`, [openClassName])}>
        <ProjectDetail {...props} />
      </div>
      {externalLink && (
        <ExternalLink
          classNames={classNames(['pt', openClassName])}
          href={url}
          label={`> 서비스 링크`}
        />
      )}
    </div>
  );
};

export default CompanyContentProject;
