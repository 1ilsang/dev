import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { imageSrcAtom } from '../modal/atoms';
import { usePathname } from 'next/navigation';

const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(1);
  const [, setImageSrc] = useAtom(imageSrcAtom);
  const pathname = usePathname();

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
        setTimeout(() => resolve(documentMax), 1300);
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
  const bindImageClickEvent = () => {
    if (!pathname.startsWith('/posts')) return;
    const postBodyContainer = document.querySelector('.post-body-container');
    if (!postBodyContainer) return;

    const postBodyImages = postBodyContainer.querySelectorAll('img');
    Array.from(postBodyImages).map((img) => {
      img.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLImageElement)) return;
        setImageSrc(event.target.src);
      });
    });
  };

  useEffect(() => {
    // NOTE: For visual testing
    if (process.env.NEXT_PUBLIC_CI) return;

    let handleScroll: () => void;
    const intervalProgress = setInterval(handleInterval, 45);

    Promise.all(checkImages())
      .then(bindImageClickEvent)
      .then(handleLoadingProgress(intervalProgress))
      .then(handleProgress(handleScroll));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(intervalProgress);
    };
  }, []);

  return { max, progress };
};

export default useProgress;
