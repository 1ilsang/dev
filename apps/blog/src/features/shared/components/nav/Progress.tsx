import { FunctionComponent, useEffect, useState } from 'react';

const NavProgress: FunctionComponent = () => {
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(1);

  useEffect(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const documentMax = scrollHeight - clientHeight;
    setMax(documentMax);

    const handleScroll = () => {
      setProgress(window.scrollY % documentMax);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="nav-progress">
      <progress value={progress} max={max}></progress>
    </div>
  );
};

export default NavProgress;
