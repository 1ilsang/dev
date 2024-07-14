import { FunctionComponent } from 'react';
import classNames from 'classnames';

import { Profile } from '../models';

import usePrint from '~/shared/hooks/usePrint';
import { MyProfile } from '../data/profile';

type ProfileLogoProps = Profile;

const ProfileLogo: FunctionComponent<ProfileLogoProps> = ({
  label,
  href,
  imageSrc,
  imageSrcBlack,
  alt,
}) => {
  const { print } = usePrint();
  return (
    <div className="about-profile-logo">
      <a
        className="hashtag"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
      >
        {label}
        <img
          className={classNames({ gmail: label === MyProfile.gmail.label })}
          src={print ? (imageSrcBlack ?? imageSrc) : imageSrc}
          alt={alt}
        />
      </a>
    </div>
  );
};

export default ProfileLogo;
