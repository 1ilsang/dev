import { useAtom } from 'jotai';
import { imageSizeAtom, imageSrcAtom } from './atoms';
import { useEffect, useRef, useState } from 'react';

export const useImageModal = () => {
  const [imageSrc, setImageSrc] = useAtom(imageSrcAtom);
  const [imageSize, setImageSize] = useAtom(imageSizeAtom);
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);

  const handleDialogClick = () => {
    setImageSrc('');
    setLoading(true);
    setImageSize('');
  };

  const load = async () => {
    new Promise((resolve) => {
      imageRef.current.onload = resolve;
    }).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 150);
    });
  };

  useEffect(() => {
    return () => {
      handleDialogClick();
    };
  }, []);

  useEffect(() => {
    if (!imageSrc) return;

    document.documentElement.style.setProperty('--scroll-lock', `10px`);
    document.body.style.overflow = 'hidden';

    const handleESC = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      handleDialogClick();
    };

    setLoading(true);
    load();
    window.addEventListener('keydown', handleESC);

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.setProperty('--scroll-lock', '');
      window.removeEventListener('keydown', handleESC);
    };
  }, [imageSrc]);

  return {
    loading,
    handleDialogClick,
    imageSrc,
    imageRef,
    imageSize,
  };
};
