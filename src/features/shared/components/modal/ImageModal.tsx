'use client';

import type { FunctionComponent, ReactNode } from 'react';
import { useImageModal } from './useImageModal';
import classNames from 'classnames';

interface ImageModalProps {
  children?: ReactNode;
}

export const ImageModal: FunctionComponent<ImageModalProps> = () => {
  const { loading, handleDialogClick, imageSrc, imageRef, imageSize } =
    useImageModal();

  if (!imageSrc) return null;
  return (
    <div
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen cursor-zoom-out"
      onClick={handleDialogClick}
    >
      <div className="w-full h-full bg-snazzy-bg opacity-90" />
      <div className="absolute w-[95vw] h-[90vh] max-w-[95vw] max-h-[90vh] md:w-[85vw] md:h-[85vh]">
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-2/6 h-2/6 animate-loading" />
          </div>
        )}
        <img
          className={classNames('m-auto w-full h-full object-contain', {
            invisible: loading,
            'animate-fade-in': !loading,
            '[&]:w-2/6': imageSize === 'small',
          })}
          src={imageSrc}
          ref={imageRef}
        />
      </div>
    </div>
  );
};
