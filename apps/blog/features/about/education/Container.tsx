import { FunctionComponent } from "react";

import Logo from "../work/card/content/Logo";
import ContentHeadline from "../work/card/content/Headline";

import { Catholic } from "~data/education";

type EducationContainerProps = {
  format: string;
};

const EducationContainer: FunctionComponent<EducationContainerProps> = ({
  format,
}) => {
  return (
    <div className="about-education">
      <div className="label">EDUCATION</div>
      <div className="about-work-card">
        <Logo
          href={Catholic.url}
          logoUrl={Catholic.logoUrl}
          alt={Catholic.name}
          border={false}
        />
        <div className="content">
          <ContentHeadline
            hover={false}
            name={Catholic.name}
            workStartDate={Catholic.startDate}
            workEndDate={Catholic.endDate}
            format={format}
          />
          <div className="position">{Catholic.major}</div>
        </div>
      </div>
    </div>
  );
};

export default EducationContainer;
