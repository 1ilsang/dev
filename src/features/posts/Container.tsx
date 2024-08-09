'use client';

import { FunctionComponent } from 'react';

import CategoryContainer from './category/Container';
import usePostListContainer from './hooks/usePostListContainer';
import { MemoedPostItem } from './components/Item';
import { type PostType } from './models';

type PostListContainerProps = {
  posts: PostType[];
};

const PostListContainer: FunctionComponent<PostListContainerProps> = ({
  posts,
}) => {
  const {
    categoryFilter,
    handleCategoryClick,
    filteredList,
    handleClearClick,
  } = usePostListContainer(posts);

  return (
    <div className="post-container">
      <CategoryContainer
        categoryFilter={categoryFilter}
        onClearClick={handleClearClick}
        onCategoryClick={handleCategoryClick}
      />
      <ul className="post-list">
        {filteredList.map((post) => (
          <MemoedPostItem key={post.title} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default PostListContainer;
