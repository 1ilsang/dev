import type { MouseEventHandler } from 'react';
import { useMemo, useState } from 'react';
import type { ServerPost } from '~/app/posts/page';

const usePostListContainer = (posts: ServerPost[]) => {
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredList = useMemo(() => {
    if (categoryFilter === '') return posts;
    return posts.filter((post) => categoryFilter.includes(post.category));
  }, [posts, categoryFilter]);

  const handleCategoryClick: MouseEventHandler<HTMLSpanElement> = (e) => {
    const selectedCategory = e.currentTarget.textContent;
    setCategoryFilter((prev) => {
      prev = prev.trim();
      if (prev.includes(selectedCategory)) {
        prev = prev.replace(selectedCategory, '');
      } else {
        prev += ` ${selectedCategory}`;
      }
      return prev;
    });
  };

  const handleClearClick = () => setCategoryFilter('');

  return {
    categoryFilter,
    handleCategoryClick,
    filteredList,
    handleClearClick,
  };
};

export default usePostListContainer;
