import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

const HomeContainer: FunctionComponent = () => {
  const router = useRouter();

  const handleContainerClick = () => {
    router.push('/posts');
  };
  return (
    <div className="home-container" onClick={handleContainerClick}>
      <video
        className="video"
        src="/assets/open.mp4"
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
