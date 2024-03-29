import { FunctionComponent } from 'react';

import WorkContainer from './work/Container';
import HeadlineContainer from './headline/Container';
import ActivityContainer from './activity/Container';
import EducationContainer from './education/Container';
import IntroductionContainer from './introduction/Container';

const DATE_FORMAT = 'yyyy.MM';

const AboutContainer: FunctionComponent = () => {
  return (
    <section className="about-container">
      <HeadlineContainer />
      <IntroductionContainer />
      <WorkContainer format={DATE_FORMAT} />
      <ActivityContainer />
      <EducationContainer format={DATE_FORMAT} />
    </section>
  );
};

export default AboutContainer;
