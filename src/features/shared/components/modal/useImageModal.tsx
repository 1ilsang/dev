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
    document.body.style.overflow = imageSrc ? 'hidden' : 'auto';

    const handleESC = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      handleDialogClick();
    };

    if (!imageSrc) return;

    setLoading(true);
    load();
    window.addEventListener('keydown', handleESC);

    return () => {
      document.body.style.overflow = 'auto';
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
