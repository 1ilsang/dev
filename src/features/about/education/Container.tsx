import type { FunctionComponent } from 'react';

import LeftSide from '../work/card/content/LeftSide';
import ContentHeadline from '../work/card/content/Headline';

import { Catholic } from '~/about/education/data/education';
import { Label } from '../shared/Label';
import { RightSide } from '../work/card/content/RightSide';

type EducationContainerProps = {
  format: string;
};

export const EducationContainer: FunctionComponent<EducationContainerProps> = ({
  format,
}) => {
  return (
    <section className="flex flex-col pb-8">
      <Label label="EDUCATION" />
      <div className="flex flex-col py-3 mt-2 print:flex-row md:flex-row">
        <LeftSide
          href={Catholic.url}
          logoUrl={Catholic.logoUrl}
          alt={Catholic.name}
          workStartDate={Catholic.startDate}
          workEndDate={Catholic.endDate}
          objectFit="fill"
          format={format}
        />
        <RightSide>
          <ContentHeadline
            hover={false}
            name={Catholic.name}
            description={Catholic.major}
            underline={false}
          />
        </RightSide>
      </div>
    </section>
  );
};
