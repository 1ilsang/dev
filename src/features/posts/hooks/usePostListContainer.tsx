import type { MouseEventHandler } from 'react';
import { useMemo, useState } from 'react';
import type { ServerPost } from '~/app/posts/page';
import { ga } from '~/shared/helpers/logger';

const usePostListContainer = (posts: ServerPost[]) => {
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set());

  const filteredList = useMemo(() => {
    if (categoryFilter.size === 0) return posts;
    return posts.filter((post) => categoryFilter.has(post.category));
  }, [posts, categoryFilter]);

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
    filteredList,
    handleClearClick,
  };
};

export default usePostListContainer;
