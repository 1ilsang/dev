import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import type { Company } from '../models';

import { CompanyContentProject } from './content/CompanyContentProject';
import ContentHeadline from './content/Headline';
import LeftSide from './content/LeftSide';
import { RightSide } from './content/RightSide';

import { usePrint } from '~/shared/hooks/usePrint';
import { toggleAccordion } from './content/toggleAccordion';
import { ga } from '~/shared/helpers/logger';

export type WorkCardContainerProps = Company & {
  toggleOpenAll?: boolean;
  format: string;
};

export const WorkCardContainer: FunctionComponent<WorkCardContainerProps> = (
  props,
) => {
  const {
    projectList,
    toggleOpenAll,
    companyHref,
    companyLogoUrl,
    company,
    position = 'Software Engineer',
    format,
  } = props;

  const [open, setOpen] = useState<boolean>(undefined);
  const { print } = usePrint();

  const handleHeadlineClick = () => {
    setOpen((prev) => {
      const next = toggleAccordion(prev, true);
      ga('aboutCompanyToggle', {
        type: next ? 'open' : 'close',
        value: company,
      });
      return next;
    });
  };

  useEffect(() => {
    if (toggleOpenAll === undefined) return;
    setOpen(toggleOpenAll);
  }, [toggleOpenAll]);

  const openClassName =
    open === undefined
      ? 'max-h-[8000px]'
      : open
        ? 'animate-show'
        : 'animate-hide';

  return (
    <article className="flex flex-col py-3 mt-4 print:flex-row md:flex-row">
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
          ariaExpanded={open}
          controlsId={`${props.company}-projects`}
        />
        <div id={`${props.company}-projects`} className={openClassName}>
          {projectList.map((project) => (
            <CompanyContentProject
              key={project.name}
              {...project}
              format={format}
              print={print}
            />
          ))}
        </div>
      </RightSide>
    </article>
  );
};
