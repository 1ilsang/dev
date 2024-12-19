'use client';

import type { FunctionComponent } from 'react';
import classNames from 'classnames';

const SponsorContainer: FunctionComponent = () => {
  const payIconClass = 'cursor-pointer object-contain hover:animate-bouncing';

  return (
    <div className="flex items-center mt-4 mb-56">
      <iframe
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
