import type { FunctionComponent } from 'react';
import { ImageTag } from './ImageTag';

export type ImageHorizonWrapProps = {
  slug: string;
  list: ({ src: string; ext?: string } | string)[];
};

export const ImageHorizonWrap: FunctionComponent<ImageHorizonWrapProps> = ({
  slug,
  list,
}) => {
  return (
    <div className="mt-3 mb-3 flex items-center w-full custom-horizon-scrollbar min-h-[100px] min-[790px]:min-h-[200px]">
      {list.map((item) => {
        const { src, ext = 'webp' } =
          typeof item === 'string' ? { src: item } : item;
        const source = `/posts/${slug}/${src}.${ext}`;
        return <ImageTag key={src} alt={src} src={source} horizon />;
      })}
    </div>
  );
};
