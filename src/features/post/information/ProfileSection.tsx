import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { MyProfile } from '~/about/headline/data/profile';
import { Avatar } from '~/shared/components/Avatar';

export const ProfileSection: FunctionComponent = () => {
  return (
    <section className="post-profile-container">
      <Avatar />
      <div>
        <Link className="name" href="/about">
          {MyProfile.personal.label}
        </Link>
        <div className="description">{MyProfile.personal.description}</div>
      </div>
    </section>
  );
};
