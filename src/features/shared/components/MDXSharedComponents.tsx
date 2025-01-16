import type { FunctionComponent } from 'react';
import { Avatar } from './Avatar';

const ImageHorizonWrap: FunctionComponent<{
  slug: string;
  list: ({ src: string; ext?: string } | string)[];
}> = ({ slug, list }) => {
  return (
    <div className="img-horizon-wrap">
      {list.map((item) => {
        const { src, ext = 'webp' } =
          typeof item === 'string' ? { src: item } : item;
        const source = `/posts/${slug}/${src}.${ext}`;

        return <img key={src} alt="img" src={source} />;
      })}
    </div>
  );
};

export const MDXSharedComponents = {
  Avatar,
  ImageHorizonWrap,
};
