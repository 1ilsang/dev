import { FunctionComponent, ReactNode, useState } from 'react';

interface ImageModalProps {
  children: ReactNode;
}

const ImageModal: FunctionComponent<ImageModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`image-modal ${isOpen ? 'open' : ''}`}
      onClick={handleModalClick}
    >
      {children}
    </div>
  );
};

export default ImageModal;
