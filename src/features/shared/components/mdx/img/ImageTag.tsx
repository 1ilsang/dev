import classNames from 'classnames';
import ExternalLink from '~/shared/components/ExternalLink';

export type ImageTagProps = {
  src: string;
  alt: string;
  // · · · · · · · · · · · · · For AdditionalSize
  size?: 'cover' | 'l' | 's' | (string & {});
  horizon?: boolean;
  origin?: string;
  fit?: boolean;
  description?: string;
};
/**
 * MDX 주입 img 컴포넌트(ImageHorizonWrap)와 rehype 주입 img 컴포넌트(img-container) 공통화
 */
export const ImageTag = ({
  size: rawSize = '',
  horizon = false,
  fit = false,
  origin,
  description,
  ...rest
}: ImageTagProps) => {
  if (horizon) return <Img {...rest} />;
  const { border, size } = parseSize(rawSize);
  return (
    <div
      className={classNames('flex justify-center mt-3 mb-3 w-full flex-col', {
        'h-[600px] object-contain bg-transparent mt-10': size === 'cover',
        'min-[790px]:min-h-[150px] min-[790px]:w-[25%]': size === 'ss',
        'min-[790px]:w-[40%]': size === 's',
        'min-[790px]:w-[70%]': !size,
        'border rounded': border,
        'min-h-[200px]': !fit,
        '!min-h-0': fit,
      })}
    >
      <Img {...rest} />
      {origin && <Copyright origin={origin} />}
      {description && <Description description={description} />}
    </div>
  );
};

const Copyright = ({ origin }: { origin: string }) => {
  const { host, pathname } = new URL(origin);
  const lastPathname = pathname.split('/').pop();

  return (
    <ExternalLink
      disableDefaultCSSTransition
      className="underline-highlight-fade text-center mt-1"
      href={origin}
      label={`ⓒ ${host}, 출처 ${lastPathname}`}
    />
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <div className="mt-1 text-center text-sm text-gray-500">{description}</div>
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
