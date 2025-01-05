'use client';

import type { FunctionComponent } from 'react';

import { MainContainer } from '~/shared/components/MainContainer';
import CategoryContainer from './category/Container';
import { PostItem } from './components/Item';
import usePostListContainer from './hooks/usePostListContainer';
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
    <MainContainer className="md:py-[4.8rem]">
      <CategoryContainer
        categoryFilter={categoryFilter}
        onClearClick={handleClearClick}
        onCategoryClick={handleCategoryClick}
      />
      <ul className="pb-24 md:pb-56">
        {filteredList.map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </ul>
    </MainContainer>
  );
};

export default PostListContainer;
