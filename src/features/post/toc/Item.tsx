import classNames from 'classnames';
import type { FunctionComponent, MouseEventHandler } from 'react';
import type { TOC } from '~/posts/models';
import { TOC_DEPTH } from '~/posts/models';

type TocItemProps = {
  item: TOC;
  active: boolean;
  targetActive: boolean;
  lastSubList: boolean;
  handleIndexClick: MouseEventHandler<HTMLAnchorElement>;
};

export const TocItem: FunctionComponent<TocItemProps> = ({
  item,
  active,
  targetActive,
  lastSubList,
  handleIndexClick,
}) => {
  const subItem = item.depth === TOC_DEPTH.H3;
  const selected = active || targetActive;

  return (
    <li
      key={item.id}
      className={classNames('relative select-none', {
        'before:absolute before:left-3 before:top-0 before:w-px before:bg-base/50 after:absolute after:left-3 after:top-1/2 after:h-px after:w-3 after:bg-base/50':
          subItem,
        'before:h-full': subItem && !lastSubList,
        'before:h-1/2': subItem && lastSubList,
      })}
    >
      <a
        id={item.id}
        href={`#${item.id}`}
        className={classNames(
          'group flex w-full cursor-pointer items-start border text-left leading-snug transition-colors',
          {
            'gap-2 px-3 py-2 text-[13px]': !subItem,
            'py-1.5 pr-3 pl-8 text-xs': subItem,
            'border-base/60 bg-base/20': selected,
            'border-transparent text-sub-blue hover:border-base/40 hover:bg-base/10 hover:text-white':
              !selected,
          },
        )}
        onClick={handleIndexClick}
      >
        {!subItem && (
          <span aria-hidden="true" className="flex-none text-dark">
            #
          </span>
        )}
        <span
          className={classNames(
            'line-clamp-2 origin-left transition-[color,scale] duration-300 ease-out motion-reduce:transition-none',
            {
              'scale-102 text-highlight': selected,
              'scale-100': !selected,
            },
          )}
        >
          {item.value}
        </span>
      </a>
    </li>
  );
};
