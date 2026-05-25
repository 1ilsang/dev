import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';

export const Avatar: FunctionComponent<{ nav?: boolean }> = memo(
  ({ nav = false }) => {
    return (
      <Link
        href="/about"
        aria-label="About 페이지로 이동"
        className={classNames('mr-2 block', [
          nav ? 'w-8 h-8 mt-2' : 'w-9 h-9 md:w-12 md:h-12',
        ])}
      >
        <img
          className={classNames(
            'border border-solid rounded-full w-full h-full',
            [nav ? 'border-white-blue' : 'border-sub-blue'],
          )}
          src={MyProfile.personal.imageSrc}
          alt={MyProfile.personal.alt}
        />
      </Link>
    );
  },
);
Avatar.displayName = 'Avatar';
