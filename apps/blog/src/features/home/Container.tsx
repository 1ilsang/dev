import { FunctionComponent } from 'react';

const HomeContainer: FunctionComponent = () => {
  return (
    <div className="home-container">
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
