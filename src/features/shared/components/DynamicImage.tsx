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
      className={classNames('relative mt-4 text-amber-600', [className], {
        'animate-skeleton': loading,
        'max-w-[1.5rem] max-h-[1.5rem]': !min,
      })}
      style={{ width, height }}
    >
      <button
        className={classNames(
          'absolute top-[-3rem] left-[-0.5rem] hover:text-amber-400 hover:duration-150 opacity-70 before:text-[5rem]',
          min
            ? 'before:content-["⎗"] before:text-[6rem]'
            : 'before:content-["⎘"]',
        )}
        title="Toggle image size"
        onClick={handleMinClick}
      />
      <img
        className={onClick ? 'cursor-zoom-in' : undefined}
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
