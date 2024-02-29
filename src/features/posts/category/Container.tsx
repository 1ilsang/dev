import classNames from 'classnames';
import { FunctionComponent, MouseEventHandler } from 'react';

import { CATEGORY_LIST } from '../constants';

type CategoryContainerProps = {
  categoryFilter: string;
  onClearClick: () => void;
  onCategoryClick: MouseEventHandler<HTMLSpanElement>;
};

const CategoryContainer: FunctionComponent<CategoryContainerProps> = ({
  onClearClick,
  categoryFilter,
  onCategoryClick,
}) => {
  return (
    <div className="category-bar">
      <span className="item x" onClick={onClearClick} />
      {CATEGORY_LIST.map((category) => (
        <span
          className={classNames('item', {
            selected: categoryFilter.includes(category),
          })}
          key={category}
          onClick={onCategoryClick}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default CategoryContainer;
