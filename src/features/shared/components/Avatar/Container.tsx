import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { memo } from 'react';
import { MyProfile } from '~/about/headline/data/profile';

export const Avatar: FunctionComponent<{ nav?: boolean }> = memo(
  ({ nav = false }) => {
    return (
      <div
        className={classNames('mr-2', [
          nav ? 'w-8 h-8 mt-2' : 'w-9 h-9 md:w-12 md:h-12',
        ])}
        role="img"
        aria-label="1ilsang character"
      >
        <Link href="/about">
          <img
            className={classNames('border border-solid rounded-full', [
              nav ? 'border-white-blue' : 'border-sub-blue',
            ])}
            src={MyProfile.personal.imageSrc}
            alt={MyProfile.personal.alt}
          />
        </Link>
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';
