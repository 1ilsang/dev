import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { MyProfile } from '~/about/headline/data/profile';
import { Avatar } from '~/shared/components/Avatar';

export const ProfileSection: FunctionComponent = () => {
  return (
    <section className="flex items-center mt-4">
      <Avatar />
      <div>
        <Link className="text-lg" href="/about">
          {MyProfile.personal.label}
        </Link>
        <div className="text-sub-blue text-sm">
          {MyProfile.personal.description}
        </div>
      </div>
    </section>
  );
};
