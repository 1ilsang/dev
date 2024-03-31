import { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ProfileLabel } from '../models';

type ProfileLogoProps = {
  href: string;
  imageSrc: string;
  alt: string;
  label?: string;
};

const ProfileLogo: FunctionComponent<ProfileLogoProps> = ({
  label,
  href,
  imageSrc,
  alt,
}) => {
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
          className={classNames({ gmail: label === ProfileLabel.gmail })}
          src={imageSrc}
          alt={alt}
        />
      </a>
    </div>
  );
};

export default ProfileLogo;
