import classNames from 'classnames';
import { type FunctionComponent, type MouseEventHandler } from 'react';

type FloatingItemProps = {
  item: Element;
  active: boolean;
  handleIndexClick: MouseEventHandler<HTMLLIElement>;
};

const FloatingItem: FunctionComponent<FloatingItemProps> = ({
  item,
  active,
  handleIndexClick,
}) => {
  return (
    <li
      data-id={item.id}
      className={classNames([
        'pt-0.5 text-base select-none cursor-pointer hover:text-sub-blue',
        {
          'animate-floating-index': active,
          "before:content-['-'] before:mr-1": item.tagName === 'H3',
        },
      ])}
      onClick={handleIndexClick}
    >
      {item.textContent}
    </li>
  );
};

export default FloatingItem;
