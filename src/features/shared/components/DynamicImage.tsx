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
  onClick?: MouseEventHandler<HTMLButtonElement>;
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

  const image = (
    <img
      className={onClick ? 'cursor-zoom-in w-full' : 'w-full'}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );

  return (
    <div
      className={classNames('relative mt-4 text-amber-600', [className], {
        'animate-skeleton': loading,
        'max-w-[1.5rem] max-h-[1.5rem]': !min,
      })}
      style={{ width, height }}
    >
      <button
        type="button"
        className={classNames(
          'absolute top-[-3rem] left-[-0.5rem] hover:text-amber-400 hover:duration-150 opacity-70 before:text-[5rem] cursor-pointer border-none bg-transparent p-0',
          min
            ? 'before:content-["⎗"] before:text-[6rem]'
            : 'before:content-["⎘"]',
        )}
        aria-label={min ? '이미지 크기 확대' : '이미지 크기 축소'}
        onClick={handleMinClick}
      />
      {onClick ? (
        <button
          type="button"
          className="block w-full border-none bg-transparent p-0 cursor-zoom-in"
          aria-label={`${alt} 확대`}
          onClick={onClick}
        >
          {image}
        </button>
      ) : (
        image
      )}
    </div>
  );
};

export default DynamicImage;
