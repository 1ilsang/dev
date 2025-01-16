'use client';

import { type FunctionComponent } from 'react';
import { TOC_DEPTH, type PostType } from '~/posts/models';
import { FloatingItem } from './Item';
import useFloatingIndex from './useFloatingIndex';

type FloatingIndexProps = {
  toc: PostType['toc'];
};

export const FloatingIndexContainer: FunctionComponent<FloatingIndexProps> = ({
  toc,
}) => {
  const { activeId, handleIndexClick, targetActiveId } = useFloatingIndex({
    toc,
  });

  return (
    <aside
      className="absolute top-0 inline-block h-full break-words left-full max-xl:hidden"
      aria-label="index"
    >
      <ul className="ml-9 sticky pl-4 top-32 w-[calc(50vw-35vw)] border-l-2 border-l-base min-[1320px]:ml-20 min-[1320px]:top-48">
        {toc.map((item, index) => {
          const lastSubList =
            index < toc.length - 1 &&
            toc[index + 1].depth === TOC_DEPTH.H2 &&
            item.depth === TOC_DEPTH.H3;
          return (
            <FloatingItem
              key={item.id}
              item={item}
              targetActive={targetActiveId === item.id}
              active={activeId === item.id}
              handleIndexClick={handleIndexClick}
              lastSubList={lastSubList}
            />
          );
        })}
      </ul>
    </aside>
  );
};
