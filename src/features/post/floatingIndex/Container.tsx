'use client';

import { type FunctionComponent } from 'react';
import { type PostType } from '~/posts/models';
import useFloatingIndex from './useFloatingIndex';
import FloatingItem from './Item';
import FloatingDepthUL from './DepthUL';

type FloatingIndexProps = {
  post: PostType;
};

export const FloatingIndexContainer: FunctionComponent<FloatingIndexProps> = ({
  post,
}) => {
  const { list, ...rest } = useFloatingIndex({ post });

  if (list.length === 0) {
    return null;
  }
  return (
    <aside
      className="absolute top-0 inline-block h-full break-words left-full max-xl:hidden"
      aria-label="index"
    >
      <ul className="ml-9 sticky pl-4 top-32 w-[calc(50vw-35vw)] border-l-2 border-l-base min-[1320px]:ml-20 min-[1320px]:top-48">
        {list.map((item, index) => {
          return Array.isArray(item) ? (
            <FloatingDepthUL key={index} itemList={item} {...rest} />
          ) : (
            <FloatingItem
              key={item.textContent}
              item={item}
              active={item.id === rest.activeId}
              {...rest}
            />
          );
        })}
      </ul>
    </aside>
  );
};
