'use client';

import classNames from 'classnames';
import type { FunctionComponent } from 'react';

import useProgress from './useProgress';

const NavProgress: FunctionComponent = () => {
  const { progress, max } = useProgress();

  return (
    <progress
      className={classNames(
        '[&::-webkit-progress-bar]:bg-sub-blue fixed top-0 left-0 z-10 w-full h-[3px]',
        [
          max === 1
            ? '[&::-webkit-progress-value]:bg-base-og'
            : '[&::-webkit-progress-value]:progress-wheel',
        ],
      )}
      value={progress}
      max={max}
    />
  );
};

export default NavProgress;
