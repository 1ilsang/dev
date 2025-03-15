'use client';

import type { FunctionComponent } from 'react';

import type { ServerPost } from '~/app/posts/page';
import { MainContainer } from '~/shared/components/MainContainer';
import { CategoryContainer } from './category/Container';
import { PostItem } from './components/Item';
import usePostListContainer from './hooks/usePostListContainer';

type PostListContainerProps = {
  posts: ServerPost[];
};

export const PostListContainer: FunctionComponent<PostListContainerProps> = ({
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
          <PostItem key={post.frontmatter.title} post={post} />
        ))}
      </ul>
    </MainContainer>
  );
};
