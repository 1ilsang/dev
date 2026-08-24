'use client';

import classNames from 'classnames';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

import { CATEGORY_LIST, getCategoryPath } from '../constants';
import type { Category } from '../models';
import { ga } from '~/shared/helpers/logger';

type CategoryContainerProps = {
  activeCategory?: Category;
};

export const CategoryContainer: FunctionComponent<CategoryContainerProps> = ({
  activeCategory,
}) => {
  const itemClass =
    'inline-block cursor-pointer select-none my-1.5 mx-5 hover:category-shadow border-none bg-transparent font-inherit p-0';

  return (
    <div className="flex flex-wrap justify-center mb-4 border-b border-sub-blue">
      <Link
        className={classNames(
          `${itemClass} after:content-['𒅄'] hover:animate-slow-spin`,
          {
            'text-highlight': !activeCategory,
            'text-inherit': activeCategory,
          },
        )}
        href="/posts"
        aria-current={!activeCategory ? 'page' : undefined}
        aria-label="카테고리 필터 초기화"
        onClick={() => ga('categoryClick', { type: 'clear', value: 'all' })}
      />
      {CATEGORY_LIST.map((category) => (
        <Link
          className={classNames(itemClass, {
            'text-highlight': activeCategory === category,
            'text-inherit': activeCategory !== category,
          })}
          key={category}
          href={getCategoryPath(category)}
          aria-current={activeCategory === category ? 'page' : undefined}
          onClick={() => ga('categoryClick', { type: 'add', value: category })}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};
