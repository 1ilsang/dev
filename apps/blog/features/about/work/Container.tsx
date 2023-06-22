import { FunctionComponent, useState } from "react";

import WorkCardContainer from "./card/Container";

import { companyData } from "~data/company";

type WorkContainerProps = {
  format: string;
};

const WorkContainer: FunctionComponent<WorkContainerProps> = ({ format }) => {
  const [toggleOpenAll, setToggleOpenAll] = useState(true);

  const handleTitleClick = () => setToggleOpenAll(!toggleOpenAll);

  return (
    <div className="about-work">
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
    </div>
  );
};

export default WorkContainer;
