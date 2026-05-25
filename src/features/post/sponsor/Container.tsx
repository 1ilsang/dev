'use client';

import { useEffect, useRef, type FunctionComponent } from 'react';
import classNames from 'classnames';
import { ga } from '~/shared/helpers/logger';

const SponsorContainer: FunctionComponent = () => {
  const payIconClass = 'cursor-pointer object-contain hover:animate-bouncing';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement === iframeRef.current) {
        ga('sponsorClick', { type: 'sponsor', value: 'github-sponsors' });
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  return (
    <div className="flex items-center mt-4 mb-56">
      <iframe
        ref={iframeRef}
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
