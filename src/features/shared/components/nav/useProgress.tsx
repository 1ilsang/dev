import { useEffect, useState } from 'react';

const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(1);

  const checkImages = () =>
    Array.from(document.images)
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.onload = img.onerror = resolve;
          }),
      );

  const handleLoadingProgress =
    (intervalProgress: NodeJS.Timeout) => async (): Promise<number> => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const documentMax = scrollHeight - clientHeight;
      clearTimeout(intervalProgress);
      setProgress(documentMax);
      return new Promise((resolve) => {
        setTimeout(() => resolve(documentMax), 2000);
      });
    };

  const handleProgress =
    (handleScroll: () => void) => (documentMax: number) => {
      setMax(documentMax);
      setProgress(window.scrollY);
      handleScroll = () => {
        setProgress(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
    };
  const handleInterval = () => {
    setProgress((prev) => (prev + 0.02) % max);
  };

  useEffect(() => {
    // NOTE: For visual testing
    if (process.env.NEXT_PUBLIC_CI) return;

    let handleScroll: () => void;
    const intervalProgress = setInterval(handleInterval, 45);
    Promise.all(checkImages())
      .then(handleLoadingProgress(intervalProgress))
      .then(handleProgress(handleScroll));
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { max, progress };
};

export default useProgress;
