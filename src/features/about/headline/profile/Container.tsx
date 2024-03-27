import { FunctionComponent } from 'react';

import ProfileLogo from './Logo';

import { profileLinks } from '~data/profile';

const ProfileContainer: FunctionComponent = () => {
  return (
    <>
      <div className="jumbotron">!ILSANG</div>
      <div className="logo-container">
        {profileLinks.map((link) => (
          <ProfileLogo key={link.label} {...link} />
        ))}
      </div>
    </>
  );
};

export default ProfileContainer;
