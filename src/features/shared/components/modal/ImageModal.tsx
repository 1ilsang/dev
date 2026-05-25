'use client';

import type { FunctionComponent } from 'react';
import { useImageModal } from './useImageModal';
import classNames from 'classnames';

interface ImageModalProps {
  children?: React.ReactNode;
}

export const ImageModal: FunctionComponent<ImageModalProps> = () => {
  const {
    loading,
    handleDialogClick,
    imageSrc,
    imageAlt,
    imageRef,
    imageSize,
    dialogRef,
  } = useImageModal();

  if (!imageSrc) return null;
  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 확대 보기"
      tabIndex={-1}
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen outline-none"
    >
      <button
        type="button"
        aria-label="이미지 닫기"
        className="absolute inset-0 w-full h-full cursor-zoom-out border-none bg-transparent p-0"
        onClick={handleDialogClick}
      >
        <span className="block w-full h-full bg-snazzy-bg opacity-90" />
      </button>
      <div className="pointer-events-none absolute w-[95vw] h-[90vh] max-w-[95vw] max-h-[90vh] md:w-[85vw] md:h-[85vh]">
        {loading && (
          <div
            className="flex items-center justify-center w-full h-full"
            aria-hidden="true"
          >
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
          alt={imageAlt}
          ref={imageRef}
        />
      </div>
    </div>
  );
};
