import { FunctionComponent, useEffect, useState } from 'react';

import { Company } from '../models';

import LeftSide from './content/LeftSide';
import ContentHeadline from './content/Headline';
import CompanyContentProject from './content/Container';

export type WorkCardContainerProps = Company & {
  toggleOpenAll: boolean;
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

  const [open, setOpen] = useState(false);
  const handleHeadlineClick = () => setOpen(!open);

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
        <div className={`${open ? `show` : `hide`}`}>
          {projectList.map((project) => (
            <CompanyContentProject key={project.name} {...project} />
          ))}
        </div>
      </div>
    </article>
  );
};

export default WorkCardContainer;
