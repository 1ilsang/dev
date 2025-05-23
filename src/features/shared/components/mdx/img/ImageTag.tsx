import classNames from 'classnames';

export type ImageTagProps = {
  src: string;
  alt: string;
  // · · · · · · · · · · · · · For AdditionalSize
  size?: 'cover' | 'l' | 's' | (string & {});
  horizon?: boolean;
};
/**
 * MDX 주입 img 컴포넌트(ImageHorizonWrap)와 rehype 주입 img 컴포넌트(img-container) 공통화
 */
export const ImageTag = ({
  size: rawSize = '',
  horizon = false,
  ...rest
}: ImageTagProps) => {
  if (horizon) return <Img {...rest} />;
  const { border, size } = parseSize(rawSize);
  return (
    <div
      className={classNames(
        'flex justify-center min-h-[200px] mt-3 mb-3 w-full',
        {
          'h-[600px] object-contain bg-transparent mt-10': size === 'cover',
          'min-[790px]:min-h-[150px] min-[790px]:w-[25%]': size === 'ss',
          'min-[790px]:w-[40%]': size === 's',
          'min-[790px]:w-[70%]': !size,
          'border rounded': border,
        },
      )}
    >
      <Img {...rest} />
    </div>
  );
};

const parseSize = (
  rawSize: ImageTagProps['size'],
): { border: boolean; size: ImageTagProps['size'] } => {
  const border = rawSize.includes(AdditionalSize.border);
  return { border, size: rawSize.replace(/b/g, '') };
};

const Img = ({ src, alt }: ImageTagProps) => (
  <img
    className="w-full h-full cursor-zoom-in object-contain max-h-[550px]"
    alt={alt}
    src={src}
  />
);

const AdditionalSize = {
  border: 'b',
};
