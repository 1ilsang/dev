import classNames from 'classnames';
import {
  type FunctionComponent,
  type MouseEventHandler,
  useState,
} from 'react';

type DynamicImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: boolean;
  width?: number;
  height?: number;
  onClick?: MouseEventHandler<HTMLImageElement>;
};

const DynamicImage: FunctionComponent<DynamicImageProps> = ({
  width,
  height,
  className,
  src,
  alt,
  loading = false,
  onClick,
}) => {
  const [min, setMin] = useState(true);
  const handleMinClick = () => setMin(!min);

  return (
    <div
      className={classNames('dynamic-image', [className], {
        loading,
        min: !min,
      })}
      style={{ width, height }}
    >
      <button className={min ? 'min' : 'max'} onClick={handleMinClick} />
      <img
        className={onClick ? 'zoom' : undefined}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={onClick}
      />
    </div>
  );
};

export default DynamicImage;
