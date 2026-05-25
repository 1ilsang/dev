import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export const INIT_MAX = 1;
const LOADING_DURATION = 1300;
const INTERVAL_MS = 45;

type Phase = 'loading' | 'ready';

const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(INIT_MAX);
  const phaseRef = useRef<Phase>('loading');
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_E2E) return;

    phaseRef.current = 'loading';
    setMax(INIT_MAX);
    setProgress(0);

    // 로딩 애니메이션
    const intervalId = setInterval(() => {
      setProgress((prev) => (prev + 0.02) % INIT_MAX);
    }, INTERVAL_MS);

    // 이미지 로딩 대기
    const pendingImages = Array.from(document.images)
      .filter((img) => !img.complete && img.loading !== 'lazy')
      .map(
        (img) =>
          new Promise<void>((resolve) => {
            img.onload = img.onerror = () => resolve();
          }),
      );

    let scrollHandler: (() => void) | null = null;

    Promise.all(pendingImages).then(() => {
      clearInterval(intervalId);
      setProgress(INIT_MAX);

      setTimeout(() => {
        phaseRef.current = 'ready';
        const newMax = document.body.scrollHeight - document.body.clientHeight;
        setMax(newMax);
        setProgress(document.body.scrollTop);

        scrollHandler = () => {
          const el = document.getElementById(
            'nav-progress',
          ) as HTMLProgressElement;
          if (el) el.value = document.body.scrollTop;
        };
        document.body.addEventListener('scroll', scrollHandler, {
          passive: true,
        });
      }, LOADING_DURATION);
    });

    return () => {
      clearInterval(intervalId);
      if (scrollHandler) {
        document.body.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [pathname]);

  return { max, progress };
};

export default useProgress;
