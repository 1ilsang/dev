'use client';

import { useRouter } from 'next/navigation';
import type { FunctionComponent } from 'react';
import { ga } from '~/shared/helpers/logger';

export const HomeContainer: FunctionComponent = () => {
  const router = useRouter();

  const handleContainerClick = () => {
    ga('videoClick', { type: 'router-push', value: '/posts' });
    router.push('/posts');
  };

  return (
    <div
      className="cursor-pointer"
      title="Click to read the article!"
      onClick={handleContainerClick}
    >
      <video
        className="object-cover w-full h-screen max-w-none"
        src="/open.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="fixed top-0 w-full h-full bg-home contrast-200 mix-blend-overlay" />
    </div>
  );
};
