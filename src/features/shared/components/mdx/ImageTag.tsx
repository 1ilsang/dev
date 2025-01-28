import classNames from 'classnames';

const Img = ({ src, alt }: ImageTagProps) => (
  <img
    className="w-full h-full cursor-zoom-in object-contain max-h-[550px]"
    alt={alt}
    src={src}
  />
);

export type ImageTagProps = {
  src: string;
  alt: string;
  size?: 'cover' | 'l' | 's';
  horizon?: boolean;
};
/**
 * MDX 주입 img 컴포넌트(ImageHorizonWrap)와 rehype 주입 img 컴포넌트(img-container) 공통화
 */
export const ImageTag = ({ size, horizon = false, ...rest }: ImageTagProps) => {
  if (horizon) return <Img {...rest} />;
  return (
    <div
      className={classNames(
        'flex justify-center min-h-[200px] mt-3 mb-3 w-full',
        {
          'h-[600px] object-contain bg-transparent mt-10': size === 'cover',
          'min-[790px]:w-[40%]': size === 's',
          'min-[790px]:w-[70%]': !size,
        },
      )}
    >
      <Img {...rest} />
    </div>
  );
};
