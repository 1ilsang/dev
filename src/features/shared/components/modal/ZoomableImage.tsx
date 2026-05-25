'use client';

import { useSetAtom } from 'jotai';
import type { FunctionComponent } from 'react';

import { imageAltAtom, imageSrcAtom } from './atoms';
import { ga } from '../../helpers/logger';

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
};

export const ZoomableImage: FunctionComponent<ZoomableImageProps> = ({
  src,
  alt,
  className,
  loading = 'lazy',
  width,
  height,
}) => {
  const setImageSrc = useSetAtom(imageSrcAtom);
  const setImageAlt = useSetAtom(imageAltAtom);

  const openModal = () => {
    setImageSrc(src);
    setImageAlt(alt);
    ga('imageZoom', { type: 'zoom', value: alt || src });
  };

  return (
    <button
      type="button"
      className="block w-full border-none bg-transparent p-0 cursor-zoom-in"
      aria-label={`${alt} 확대`}
      data-zoomable="true"
      onClick={openModal}
    >
      <img
        className={className}
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
      />
    </button>
  );
};
