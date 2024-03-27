import { FunctionComponent } from 'react';

import LeftSide from '../work/card/content/LeftSide';
import ContentHeadline from '../work/card/content/Headline';

import { Catholic } from '~data/education';

type EducationContainerProps = {
  format: string;
};

const EducationContainer: FunctionComponent<EducationContainerProps> = ({
  format,
}) => {
  return (
    <section className="about-education">
      <div className="label">EDUCATION</div>
      <div className="about-work-card">
        <LeftSide
          href={Catholic.url}
          logoUrl={Catholic.logoUrl}
          alt={Catholic.name}
          workStartDate={Catholic.startDate}
          workEndDate={Catholic.endDate}
          format={format}
        />
        <div className="content">
          <ContentHeadline hover={false} name={Catholic.name} />
          <div className="education-position">{Catholic.major}</div>
        </div>
      </div>
    </section>
  );
};

export default EducationContainer;
