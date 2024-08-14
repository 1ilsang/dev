'use client';

import type { FunctionComponent } from 'react';

import CategoryContainer from './category/Container';
import usePostListContainer from './hooks/usePostListContainer';
import { MemoedPostItem } from './components/Item';
import { type PostType } from './models';
import { MainContainer } from '~/shared/components/MainContainer';

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
    <MainContainer className="md:py-[4.8rem]">
      <CategoryContainer
        categoryFilter={categoryFilter}
        onClearClick={handleClearClick}
        onCategoryClick={handleCategoryClick}
      />
      <ul className="pb-24 md:pb-56">
        {filteredList.map((post) => (
          <MemoedPostItem key={post.title} post={post} />
        ))}
      </ul>
    </MainContainer>
  );
};

export default PostListContainer;
