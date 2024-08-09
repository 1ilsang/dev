'use client';

import type { FunctionComponent } from 'react';
import { useState } from 'react';

import WorkCardContainer from './card/Container';

import { companyData } from '~/about/work/data/company';

type WorkContainerProps = {
  format: string;
};

const WorkContainer: FunctionComponent<WorkContainerProps> = ({ format }) => {
  const [toggleOpenAll, setToggleOpenAll] = useState<boolean>(undefined);

  const handleTitleClick = () =>
    setToggleOpenAll(toggleOpenAll === undefined ? false : !toggleOpenAll);

  return (
    <section className="about-work">
      <div className="label" onClick={handleTitleClick}>
        WORK EXPERIENCE
      </div>
      <>
        {companyData.map((data) => (
          <WorkCardContainer
            key={data.company}
            {...data}
            toggleOpenAll={toggleOpenAll}
            format={format}
          />
        ))}
      </>
    </section>
  );
};

export default WorkContainer;
