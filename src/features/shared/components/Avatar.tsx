import classNames from 'classnames';
import Link from 'next/link';
import { FunctionComponent, memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';

export const Avatar: FunctionComponent<{ nav?: boolean }> = memo(
  ({ nav = false }) => {
    return (
      <div className={classNames('avatar', [nav ? 'on-nav' : 'on-post'])}>
        <Link href="/about">
          <img src={MyProfile.personal.imageSrc} alt={MyProfile.personal.alt} />
        </Link>
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';
