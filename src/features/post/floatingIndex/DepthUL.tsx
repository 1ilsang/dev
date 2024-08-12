import { type FunctionComponent, type MouseEventHandler } from 'react';
import FloatingItem from './Item';

const FloatingDepthUL: FunctionComponent<{
  itemList: Element[];
  activeId: string;
  handleIndexClick: MouseEventHandler<HTMLLIElement>;
}> = ({ itemList, activeId, handleIndexClick }) => {
  return (
    <li>
      <ul className="ml-2.5 last:mb-2">
        {itemList.map((item) => {
          return (
            <FloatingItem
              key={item.textContent}
              item={item}
              active={item.id === activeId}
              handleIndexClick={handleIndexClick}
            />
          );
        })}
      </ul>
    </li>
  );
};

export default FloatingDepthUL;
