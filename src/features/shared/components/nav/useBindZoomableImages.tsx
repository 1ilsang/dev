'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { imageAltAtom, imageSrcAtom } from '../modal/atoms';
import { POST_BODY_ID } from './constants';

const bindZoomableImage = (
  img: HTMLImageElement,
  setImageSrc: (src: string) => void,
  setImageAlt: (alt: string) => void,
) => {
  if (
    img.dataset.zoomable === 'true' ||
    img.closest('[data-zoomable="true"]')
  ) {
    return;
  }

  const open = () => {
    setImageSrc(img.src);
    setImageAlt(img.alt || '');
  };

  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  if (img.alt) {
    img.setAttribute('aria-label', `${img.alt} 확대`);
  }

  img.addEventListener('click', open);
  img.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    open();
  });
};

export const useBindZoomableImages = () => {
  const setImageSrc = useSetAtom(imageSrcAtom);
  const setImageAlt = useSetAtom(imageAltAtom);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/posts')) return;
    const postBodyContainer = document.querySelector(POST_BODY_ID);
    if (!postBodyContainer) return;

    const postBodyImages = postBodyContainer.querySelectorAll('img');
    Array.from(postBodyImages).forEach((img) => {
      bindZoomableImage(img, setImageSrc, setImageAlt);
    });
  }, [pathname, setImageSrc, setImageAlt]);
};
