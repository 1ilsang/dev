import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { imageSrcAtom } from '../modal/atoms';
import { usePathname } from 'next/navigation';
import { POST_BODY_ID } from './constants';

export const INIT_MAX = 1;

const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(INIT_MAX);
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
      clearTimeout(intervalProgress);
      setProgress(INIT_MAX);
      return new Promise((resolve) => {
        setTimeout(() => resolve(1), 1300);
      });
    };

  const handleProgress = (handleScroll: () => void) => () => {
    setMax(document.body.scrollHeight - document.body.clientHeight);
    setProgress(0);
    handleScroll = () => {
      setProgress(document.body.scrollTop);
    };
    document.body.addEventListener('scroll', handleScroll);
  };
  const handleInterval = () => {
    setProgress((prev) => (prev + 0.02) % max);
  };
  const bindImageClickEvent = () => {
    if (!pathname.startsWith('/posts')) return;
    const postBodyContainer = document.querySelector(POST_BODY_ID);
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
    if (process.env.NEXT_PUBLIC_E2E) return;

    let handleScroll: () => void;
    const intervalProgress = setInterval(handleInterval, 45);

    Promise.all(checkImages())
      .then(bindImageClickEvent)
      .then(handleLoadingProgress(intervalProgress))
      .then(handleProgress(handleScroll));
    return () => {
      document.body.removeEventListener('scroll', handleScroll);
      clearTimeout(intervalProgress);
    };
  }, []);

  return { max, progress };
};

export default useProgress;
