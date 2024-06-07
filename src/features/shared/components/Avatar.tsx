import classNames from 'classnames';
import Link from 'next/link';
import { FunctionComponent, memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';

export const AvatarImage: FunctionComponent<{ nav?: boolean }> = memo(
  ({ nav = false }) => {
    return (
      <div
        className={classNames('rounded-full mr-2 relative', [
          nav ? 'nav-avatar' : 'avatar-image',
        ])}
      >
        <Link href="/about">
          <img src={MyProfile.personal.imageSrc} alt={MyProfile.personal.alt} />
        </Link>
      </div>
    );
  },
);
AvatarImage.displayName = 'AvatarImage';

const Avatar = () => {
  return (
    <div className="flex items-center">
      <AvatarImage />
      <div>
        <Link className="avatar-name" href="/about">
          {MyProfile.personal.label}
        </Link>
        <div className="avatar-description">
          {MyProfile.personal.description}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
