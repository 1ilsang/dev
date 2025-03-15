'use client';

import type { FunctionComponent } from 'react';
import classNames from 'classnames';
import type { GaActionType } from '~/shared/helpers/logger';
import { ga } from '~/shared/helpers/logger';

const SponsorContainer: FunctionComponent = () => {
  const payIconClass = 'cursor-pointer object-contain hover:animate-bouncing';

  const gaFire = (action: GaActionType) => () => {
    ga(action, { type: 'github-sponsor', value: '1ilsang' });
  };

  return (
    <div className="flex items-center mt-4 mb-56">
      <iframe
        onClick={gaFire('buttonClick')}
        className={classNames('border-0 rounded-md', payIconClass)}
        src="https://github.com/sponsors/1ilsang/button"
        title="Sponsor 1ilsang"
        height="32"
        width="114"
      />
    </div>
  );
};

export { SponsorContainer };
