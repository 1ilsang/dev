'use client';

import type { FunctionComponent } from 'react';

import usePrint from '~/shared/hooks/usePrint';
import { profileLinks } from './data/profile';
import ProfileLogo from './profile/Logo';

export const HeadlineContainer: FunctionComponent = () => {
  const { print } = usePrint();
  const title = print ? '이상철' : '!ILSANG';

  return (
    <header className="flex flex-col justify-between items-normal print:flex-row md:flex-row md:items-end print:mt-16">
      <div className="flex justify-start bg-jumbo bg-clip-text text-transparent text-8xl drop-shadow-[2px_4px_1px_black] tracking-[1px] md:text-9xl font-bold print:text-black print:font-normal print:bg-none print:filter-none">
        {title}
      </div>
      <div className="flex flex-col">
        {profileLinks.map((link) => (
          <ProfileLogo key={link.label} {...link} />
        ))}
      </div>
    </header>
  );
};
