import { FunctionComponent } from 'react';

import ProfileContainer from './profile/Container';

const HeadlineContainer: FunctionComponent = () => {
  return (
    <header className="about-profile-container">
      <ProfileContainer />
    </header>
  );
};

export default HeadlineContainer;
