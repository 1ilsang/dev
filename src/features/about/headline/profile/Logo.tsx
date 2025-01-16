import type { FunctionComponent } from 'react';
import classNames from 'classnames';

import type { Profile } from '../models';

import { usePrint } from '~/shared/hooks/usePrint';
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
    <div className="flex justify-end pb-px h-7">
      <a
        className="flex items-center text-highlight print:text-black hover:underline"
        rel="noopener noreferrer"
        target="_blank"
        href={href}
      >
        {label}
        <img
          className={classNames('py-0.5 pl-1.5 w-7', {
            'h-6': label === MyProfile.gmail.label,
            'h-7': label !== MyProfile.gmail.label,
          })}
          src={print ? (imageSrcBlack ?? imageSrc) : imageSrc}
          alt={alt}
        />
      </a>
    </div>
  );
};

export default ProfileLogo;
