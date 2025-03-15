import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { ga } from '~/shared/helpers/logger';

const usePostListContainer = () => {
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set());

  const handleCategoryClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    const selectedCategory = e.currentTarget.textContent;
    setCategoryFilter((prev) => {
      const exist = prev.has(selectedCategory);
      const next = new Set(prev);
      ga('categoryClick', {
        type: exist ? 'remove' : 'add',
        value: selectedCategory,
      });
      next[exist ? 'delete' : 'add'](selectedCategory);
      return next;
    });
  };

  const handleClearClick = () =>
    setCategoryFilter(() => {
      ga('categoryClick', { type: 'clear', value: 'all' });
      return new Set();
    });

  return {
    categoryFilter,
    handleCategoryClick,
    handleClearClick,
  };
};

export default usePostListContainer;
