import type { FunctionComponent } from 'react';

import WorkContainer from './work/Container';
import { HeadlineContainer } from './headline/Container';
import ActivityContainer from './activity/Container';
import EducationContainer from './education/Container';
import IntroductionContainer from './introduction/Container';
import { MainContainer } from '~/shared/components/MainContainer';

const DATE_FORMAT = 'yyyy.MM';

const AboutContainer: FunctionComponent = () => {
  return (
    <MainContainer>
      <HeadlineContainer />
      <IntroductionContainer />
      <WorkContainer format={DATE_FORMAT} />
      <ActivityContainer />
      <EducationContainer format={DATE_FORMAT} />
    </MainContainer>
  );
};

export default AboutContainer;
