import classNames from 'classnames';
import { type FunctionComponent, type MouseEventHandler } from 'react';
import type { TOC } from '~/posts/models';
import { TOC_DEPTH } from '~/posts/models';

type FloatingItemProps = {
  item: TOC;
  active: boolean;
  lastSubList: boolean;
  handleIndexClick: MouseEventHandler<HTMLLIElement>;
};

export const FloatingItem: FunctionComponent<FloatingItemProps> = ({
  item,
  active,
  lastSubList,
  handleIndexClick,
}) => {
  return (
    <li
      key={item.id}
      id={item.id}
      className={classNames([
        'pt-0.5 text-base select-none cursor-pointer hover:text-sub-blue',
        {
          'mb-0.5': item.depth === TOC_DEPTH.H2,
          'animate-floating-index': active,
          "before:content-['-'] before:mr-1 ml-2.5":
            item.depth === TOC_DEPTH.H3,
          'mb-1.5': lastSubList,
        },
      ])}
      onClick={handleIndexClick}
    >
      {item.value}
    </li>
  );
};
