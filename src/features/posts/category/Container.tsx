import classNames from 'classnames';
import type { FunctionComponent, MouseEventHandler } from 'react';

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
  const itemClass =
    'inline-block cursor-pointer select-none py-0.5 px-1.5 my-1 mx-3.5 hover:category-shadow';

  return (
    <div className="flex flex-wrap justify-center mb-4 border-b border-sub-blue">
      <span
        className={`${itemClass} after:content-['𒅄'] hover:animate-slow-spin`}
        onClick={onClearClick}
      />
      {CATEGORY_LIST.map((category) => (
        <span
          className={classNames(itemClass, {
            'text-highlight': categoryFilter.includes(category),
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
