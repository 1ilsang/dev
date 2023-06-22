import { FunctionComponent } from "react";

import WorkContainer from "./work/Container";
import HeadlineContainer from "./headline/Container";
import ActivityContainer from "./activity/Container";
import SkillContainer from "./skills/Container";
import EducationContainer from "./education/Container";

const DATE_FORMAT = "yyyy.MM";

const AboutContainer: FunctionComponent = () => {
  return (
    <div className="about-container">
      <HeadlineContainer />
      <SkillContainer />
      <WorkContainer format={DATE_FORMAT} />
      <ActivityContainer />
      <EducationContainer format={DATE_FORMAT} />
      <div>Side Project</div>
    </div>
  );
};

export default AboutContainer;
