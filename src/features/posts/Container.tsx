import type { FunctionComponent } from 'react';

import type { ServerPost } from '~/app/posts/page';
import type { Category } from './models';
import { MainContainer } from '~/shared/components/MainContainer';
import { CategoryContainer } from './category/Container';
import { PostItem } from './components/Item';

type PostListContainerProps = {
  posts: ServerPost[];
  activeCategory?: Category;
};

export const PostListContainer: FunctionComponent<PostListContainerProps> = ({
  posts,
  activeCategory,
}) => {
  return (
    <MainContainer className="min-h-dvh md:py-[4.8rem] xl:!min-h-0 xl:flex-1">
      <h1 className="sr-only">Posts</h1>
      <CategoryContainer activeCategory={activeCategory} />
      <ul className="pb-24 md:pb-56">
        {posts.map((post) => (
          <PostItem key={post.frontmatter.title} post={post} />
        ))}
      </ul>
    </MainContainer>
  );
};
