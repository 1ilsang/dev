'use client';

import { useRouter } from 'next/navigation';
import type { FunctionComponent } from 'react';

const HomeContainer: FunctionComponent = () => {
  const router = useRouter();

  const handleContainerClick = () => {
    router.push('/posts');
  };

  return (
    <div className="home-container" onClick={handleContainerClick}>
      <video
        className="video"
        src="/open.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="wrap" />
    </div>
  );
};

export default HomeContainer;
