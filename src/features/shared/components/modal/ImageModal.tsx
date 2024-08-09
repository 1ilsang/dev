'use client';

import type { FunctionComponent, ReactNode } from 'react';
import { useImageModal } from './useImageModal';
import classNames from 'classnames';

interface ImageModalProps {
  children?: ReactNode;
}

const ImageModal: FunctionComponent<ImageModalProps> = () => {
  const { loading, handleDialogClick, imageSrc, imageRef, imageSize } =
    useImageModal();

  if (!imageSrc) return null;
  return (
    <div className="image-modal" onClick={handleDialogClick}>
      <div className="background" />
      <div className="image-section">
        {loading && (
          <div className="loading-section">
            <div className="loading-bar loading" />
          </div>
        )}
        <img
          className={classNames(
            {
              hidden: loading,
              'fade-in': !loading,
            },
            [imageSize],
          )}
          src={imageSrc}
          ref={imageRef}
        />
      </div>
    </div>
  );
};

export default ImageModal;
