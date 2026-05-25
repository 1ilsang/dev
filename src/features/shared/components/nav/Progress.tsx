'use client';

import classNames from 'classnames';
import type { FunctionComponent } from 'react';

import useProgress, { INIT_MAX } from './useProgress';
import { useBindZoomableImages } from './useBindZoomableImages';

export const NavProgress: FunctionComponent = () => {
  const { progress, max } = useProgress();
  useBindZoomableImages();

  return (
    <progress
      id="nav-progress"
      className={classNames(
        '[&::-webkit-progress-bar]:bg-sub-blue fixed top-0 left-0 z-10 w-full h-[3px] appearance-none',
        [
          max === INIT_MAX
            ? '[&::-webkit-progress-value]:bg-base-og'
            : '[&::-webkit-progress-value]:progress-wheel',
        ],
      )}
      aria-label="페이지 읽기 진행률"
      suppressHydrationWarning
      value={progress}
      max={max}
    />
  );
};
