import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import type { Company } from '../models';

import LeftSide from './content/LeftSide';
import ContentHeadline from './content/Headline';
import CompanyContentProject from './content/Container';
import { RightSide } from './content/RightSide';

export type WorkCardContainerProps = Company & {
  toggleOpenAll?: boolean;
  format: string;
};

const WorkCardContainer: FunctionComponent<WorkCardContainerProps> = (
  props,
) => {
  const {
    projectList,
    toggleOpenAll,
    companyHref,
    companyLogoUrl,
    company,
    position = 'Software Engineer',
  } = props;

  const [open, setOpen] = useState<boolean>(undefined);
  const handleHeadlineClick = () => setOpen(open === undefined ? false : !open);

  useEffect(() => {
    if (toggleOpenAll === undefined) return;
    setOpen(toggleOpenAll);
  }, [toggleOpenAll]);

  const openClassName =
    open === undefined ? 'max-h-[8000px]' : open ? 'show' : 'hide';

  return (
    <article className="flex flex-col print:flex-row md:flex-row mt-4 py-3">
      <LeftSide
        {...props}
        href={companyHref}
        logoUrl={companyLogoUrl}
        alt={company}
      />
      <RightSide>
        <ContentHeadline
          {...props}
          name={props.company}
          onClick={handleHeadlineClick}
          description={position}
        />
        <div className={openClassName}>
          {projectList.map((project) => (
            <CompanyContentProject key={project.name} {...project} />
          ))}
        </div>
      </RightSide>
    </article>
  );
};

export default WorkCardContainer;
