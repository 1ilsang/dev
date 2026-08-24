'use client';

import { type FunctionComponent } from 'react';
import { TOC_DEPTH, type PostType } from '~/posts/models';
import { TocItem } from './Item';
import { useToc } from './useToc';

type TocContainerProps = {
  toc: PostType['toc'];
};

export const TocContainer: FunctionComponent<TocContainerProps> = ({ toc }) => {
  const { activeId, handleIndexClick, targetActiveId } = useToc({
    toc,
  });

  return (
    <aside
      className="absolute top-0 inline-block h-full break-words left-full max-xl:hidden"
      aria-label="목차"
    >
      <div className="sticky top-32 ml-9 w-[216px] min-[1320px]:top-48 min-[1320px]:ml-20">
        <p className="mb-2 px-3 text-[10px] tracking-[0.18em] text-dark uppercase">
          On this page
        </p>
        <ul>
          {toc.map((item, index) => {
            const lastSubList =
              item.depth === TOC_DEPTH.H3 &&
              (index === toc.length - 1 ||
                toc[index + 1].depth === TOC_DEPTH.H2);
            return (
              <TocItem
                key={item.id}
                item={item}
                targetActive={
                  activeId === undefined && targetActiveId === item.id
                }
                active={activeId === item.id}
                handleIndexClick={handleIndexClick}
                lastSubList={lastSubList}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
