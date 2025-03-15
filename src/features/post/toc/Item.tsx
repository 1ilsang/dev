import classNames from 'classnames';
import { type FunctionComponent, type MouseEventHandler } from 'react';
import type { TOC } from '~/posts/models';
import { TOC_DEPTH } from '~/posts/models';

type TocItemProps = {
  item: TOC;
  active: boolean;
  targetActive: boolean;
  lastSubList: boolean;
  handleIndexClick: MouseEventHandler<HTMLLIElement>;
};

export const TocItem: FunctionComponent<TocItemProps> = ({
  item,
  active,
  targetActive,
  lastSubList,
  handleIndexClick,
}) => {
  return (
    <li
      key={item.id}
      id={item.id}
      className={classNames([
        'pt-0.5 text-base select-none cursor-pointer',
        {
          'mb-0.5': item.depth === TOC_DEPTH.H2,
          'animate-toc-index': active,
          "before:content-['-'] before:mr-1 ml-2.5":
            item.depth === TOC_DEPTH.H3,
          'mb-1.5': lastSubList,
          'hover:text-sub-blue': !targetActive,
          'text-orange-300 hover:text-orange-300': targetActive,
        },
      ])}
      onClick={handleIndexClick}
    >
      {item.value}
    </li>
  );
};
