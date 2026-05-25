import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { imageAltAtom, imageSizeAtom, imageSrcAtom } from './atoms';

export const useImageModal = () => {
  const [imageSrc, setImageSrc] = useAtom(imageSrcAtom);
  const [imageAlt, setImageAlt] = useAtom(imageAltAtom);
  const [imageSize, setImageSize] = useAtom(imageSizeAtom);
  const imageRef = useRef<HTMLImageElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDialogClick = () => {
    setImageSrc('');
    setImageAlt('');
    setLoading(true);
    setImageSize('');
  };

  const load = async () => {
    new Promise((resolve) => {
      imageRef.current!.onload = resolve;
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

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.documentElement.style.setProperty('--scroll-lock', `10px`);
    document.body.style.overflow = 'hidden';

    const handleESC = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      handleDialogClick();
    };

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      dialogRef.current?.focus();
    };

    setLoading(true);
    load();
    dialogRef.current?.focus();
    window.addEventListener('keydown', handleESC);
    window.addEventListener('keydown', handleTab);

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.setProperty('--scroll-lock', '');
      window.removeEventListener('keydown', handleESC);
      window.removeEventListener('keydown', handleTab);
      previousFocusRef.current?.focus();
    };
  }, [imageSrc]);

  return {
    loading,
    handleDialogClick,
    imageSrc,
    imageAlt,
    imageRef,
    imageSize,
    dialogRef,
  };
};
