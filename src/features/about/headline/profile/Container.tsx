import type { FunctionComponent } from 'react';

import ProfileLogo from './Logo';

import { profileLinks } from '~/about/headline/data/profile';
import usePrint from '~/shared/hooks/usePrint';

const ProfileContainer: FunctionComponent = () => {
  const { print } = usePrint();
  const title = print ? '이상철' : '!ILSANG';

  return (
    <>
      <div className="jumbotron">{title}</div>
      <div className="logo-container">
        {profileLinks.map((link) => (
          <ProfileLogo key={link.label} {...link} />
        ))}
      </div>
    </>
  );
};

export default ProfileContainer;
