import { FunctionComponent, useState } from 'react';

type DynamicImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: boolean;
  width?: number;
  height?: number;
};

const DynamicImage: FunctionComponent<DynamicImageProps> = ({
  width,
  height,
  className,
  src,
  alt,
  loading = true,
}) => {
  const [min, setMin] = useState(true);
  const handleMinClick = () => setMin(!min);

  return (
    <div
      className={`${className} dynamic-image ${loading ? 'loading' : ''} ${
        min ? '' : 'min'
      }`}
      style={{ width, height }}
    >
      <button className={min ? 'min' : 'max'} onClick={handleMinClick} />
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default DynamicImage;
