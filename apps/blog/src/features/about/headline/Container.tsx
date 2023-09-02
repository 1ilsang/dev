import { FunctionComponent } from 'react';

import ProfileContainer from './profile/Container';

const HeadlineContainer: FunctionComponent = () => {
  return (
    <header>
      <ProfileContainer />
    </header>
  );
};

export default HeadlineContainer;
