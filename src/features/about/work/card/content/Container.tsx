import type { FunctionComponent, MouseEventHandler } from 'react';
import { useState } from 'react';
import classNames from 'classnames';

import type { Project } from '../../models';

import { Tags } from './Tags';
import { ProjectDate } from './ProjectDate';
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

  const fold = 'before:content-["▶"] before:text-[0.9rem]';
  const unfold =
    'before:content-["▼"] text-highlight print:text-black print:before:text-black';

  const openClassName = (() => {
    if (print) return 'animate-show';
    if (open === undefined) return 'invisible opacity-0	max-h-0';
    return open ? 'animate-show' : 'animate-hide';
  })();
  const foldState = (() => {
    if (print) return unfold;
    return open ? unfold : fold;
  })();
  const externalLink = (() => {
    if (print) return undefined;
    return open !== undefined && url && openClassName !== 'animate-hide';
  })();

  return (
    <div className="mb-4 pr-1 pl-[0.7rem] pb-3 border-dark border-l-[0.24rem] border-b-[0.01rem] border-b-dotted print:border-black">
      <div
        className="group flex flex-col cursor-pointer duration-300 hover:text-highlight select-none"
        onClick={handleDetailClick}
      >
        <div className="flex justify-between items-center w-full">
          <div
            className={classNames(
              'text-xl before:mr-2 before:text-sub-blue before:group-hover:text-highlight before:duration-300',
              [foldState],
            )}
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
      <ProjectDetail {...props} openClassName={openClassName} />
      {externalLink && (
        <ExternalLink
          className={classNames(['mt-2', openClassName])}
          href={url}
          label={`> 서비스 링크`}
        />
      )}
    </div>
  );
};

export default CompanyContentProject;
