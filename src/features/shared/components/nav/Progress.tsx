'use client';

import classNames from 'classnames';
import { FunctionComponent } from 'react';

import useProgress from './useProgress';

const NavProgress: FunctionComponent = () => {
  const { progress, max } = useProgress();

  return (
    <div className={classNames([max === 1 ? 'nav-loading' : 'nav-progress'])}>
      <progress value={progress} max={max}></progress>
    </div>
  );
};

export default NavProgress;
