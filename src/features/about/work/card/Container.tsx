import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import type { Company } from '../models';

import LeftSide from './content/LeftSide';
import ContentHeadline from './content/Headline';
import CompanyContentProject from './content/Container';

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
    open === undefined ? 'mh-100vh' : open ? 'show' : 'hide';

  return (
    <article className="about-work-card">
      <LeftSide
        {...props}
        href={companyHref}
        logoUrl={companyLogoUrl}
        alt={company}
      />
      <div className="content">
        <ContentHeadline
          {...props}
          name={props.company}
          onClick={handleHeadlineClick}
        />
        <div className="position">{position}</div>
        <div className={openClassName}>
          {projectList.map((project) => (
            <CompanyContentProject key={project.name} {...project} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default WorkCardContainer;
