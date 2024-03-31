import classNames from 'classnames';
import Link from 'next/link';
import { FunctionComponent, memo } from 'react';

import profile from '~data/1ilsang.json';

export const AvatarImage: FunctionComponent<{ nav?: boolean }> = memo(
  ({ nav = false }) => {
    return (
      <div
        className={classNames('rounded-full mr-2 relative', [
          nav ? 'nav-avatar' : 'avatar-image',
        ])}
      >
        <Link href="/about">
          <img src={profile.profileImage} alt={profile.name} />
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
          {profile.name}
        </Link>
        <div className="avatar-description">{profile.description}</div>
      </div>
    </div>
  );
};

export default Avatar;
