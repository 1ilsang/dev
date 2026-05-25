import classNames from 'classnames';
import type { FunctionComponent, MouseEventHandler } from 'react';

import { CATEGORY_LIST } from '../constants';

type CategoryContainerProps = {
  categoryFilter: Set<string>;
  onClearClick: () => void;
  onCategoryClick: MouseEventHandler<HTMLButtonElement>;
};

export const CategoryContainer: FunctionComponent<CategoryContainerProps> = ({
  onClearClick,
  categoryFilter,
  onCategoryClick,
}) => {
  const itemClass =
    'inline-block cursor-pointer select-none my-1.5 mx-5 hover:category-shadow border-none bg-transparent font-inherit p-0';

  return (
    <div className="flex flex-wrap justify-center mb-4 border-b border-sub-blue">
      <button
        type="button"
        className={`${itemClass} text-inherit after:content-['𒅄'] hover:animate-slow-spin`}
        aria-label="카테고리 필터 초기화"
        onClick={onClearClick}
      />
      {CATEGORY_LIST.map((category) => (
        <button
          type="button"
          className={classNames(itemClass, {
            'text-highlight': categoryFilter.has(category),
            'text-inherit': !categoryFilter.has(category),
          })}
          key={category}
          value={category}
          aria-pressed={categoryFilter.has(category)}
          onClick={onCategoryClick}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
