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
  const { categoryFilter, handleCategoryClick, handleClearClick } =
    usePostListContainer();

  return (
    <MainContainer className="md:py-[4.8rem]">
      <CategoryContainer
        categoryFilter={categoryFilter}
        onClearClick={handleClearClick}
        onCategoryClick={handleCategoryClick}
      />
      <ul className="pb-24 md:pb-56">
        {posts.map((post) => (
          <PostItem
            key={post.frontmatter.title}
            categoryFilter={categoryFilter}
            post={post}
          />
        ))}
      </ul>
    </MainContainer>
  );
};
