import { useAtom } from 'jotai';
import { imageSrcAtom } from './atoms';
import { useEffect, useRef, useState } from 'react';

export const useImageModal = () => {
  const [imageSrc, setImageSrc] = useAtom(imageSrcAtom);
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);

  const handleDialogClick = () => {
    setImageSrc('');
    setLoading(true);
  };

  const load = async () => {
    new Promise((resolve) => {
      imageRef.current.onload = resolve;
    }).then(() => {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  };

  useEffect(() => {
    return () => {
      setImageSrc('');
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = imageSrc ? 'hidden' : 'auto';

    if (imageSrc) {
      setLoading(true);
      load();
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [imageSrc]);

  return {
    loading,
    handleDialogClick,
    imageSrc,
    imageRef,
  };
};
