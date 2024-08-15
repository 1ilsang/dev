'use client';

import { useRouter } from 'next/navigation';
import type { FunctionComponent } from 'react';

const HomeContainer: FunctionComponent = () => {
  const router = useRouter();

  const handleContainerClick = () => {
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
      <div className="bg-home fixed top-0 w-full h-full contrast-200 mix-blend-overlay" />
    </div>
  );
};

export default HomeContainer;
