import type { FunctionComponent, KeyboardEventHandler } from 'react';
import { useId, useState } from 'react';
import classNames from 'classnames';

import {
  DETAIL_VISIBILITY_CLASS,
  toggleDetailVisibility,
  type DetailVisibility,
} from './detailVisibility';
import { Tags } from './Tags';
import { ProjectDate } from './ProjectDate';
import ProjectDetail from './ProjectDetail';
import type { CompanyContentProjectProps } from './types';

export const CompanyContentProject: FunctionComponent<
  CompanyContentProjectProps
> = ({
  name,
  tags,
  startDate,
  endDate,
  format,
  print,
  summary,
  body,
  img,
  url,
}) => {
  const [visibility, setVisibility] = useState<DetailVisibility>('idle');
  const detailId = useId();

  const handleToggle = () => {
    setVisibility(toggleDetailVisibility);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    handleToggle();
  };

  const fold = 'before:rotate-0';
  const unfold =
    'before:rotate-90 text-highlight print:text-black print:before:text-black';

  const isExpanded = print || visibility === 'open';
  const openClassName = print
    ? 'animate-show'
    : DETAIL_VISIBILITY_CLASS[visibility];
  const foldState = isExpanded ? unfold : fold;

  return (
    <div
      className={classNames(
        'mb-4 pr-1 pl-[0.7rem] border-dark border-l-[0.24rem] border-b-[0.01rem] border-b-dotted print:border-black',
      )}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={detailId}
        className="flex flex-col duration-300 cursor-pointer select-none group hover:text-highlight"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between w-full">
          <div
            className={classNames(
              'text-xl before:mr-2 before:text-sub-blue group-hover:before:text-highlight before:inline-block before:duration-300 before:content-["▶"]',
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
      <ProjectDetail
        id={detailId}
        summary={summary}
        body={body}
        img={img}
        url={url}
        print={print}
        openClassName={openClassName}
      />
    </div>
  );
};
