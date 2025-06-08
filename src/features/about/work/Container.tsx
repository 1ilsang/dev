'use client';

import type { FunctionComponent } from 'react';
import { useState } from 'react';

import { WorkCardContainer } from './card/Container';

import { companyData } from '~/about/work/data/company';
import { Label } from '../shared/Label';

type WorkContainerProps = {
  format: string;
};

export const WorkContainer: FunctionComponent<WorkContainerProps> = ({
  format,
}) => {
  const [toggleOpenAll, setToggleOpenAll] = useState<boolean>(undefined);

  const handleTitleClick = () =>
    setToggleOpenAll(toggleOpenAll === undefined ? false : !toggleOpenAll);

  return (
    <section className="flex flex-col pb-8">
      <Label label="WORK EXPERIENCE" onClick={handleTitleClick} />
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
