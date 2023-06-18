import { FunctionComponent } from "react";

import WorkContainer from "./work/Container";
import HeadlineContainer from "./headline/Container";
import ActivityContainer from "./activity/Container";
import SkillContainer from "./skills/Container";

const AboutContainer: FunctionComponent = () => {
  return (
    <div className="about-container">
      <HeadlineContainer />
      <SkillContainer />
      <WorkContainer />
      <ActivityContainer />
      <div>Side Project</div>
    </div>
  );
};

export default AboutContainer;
