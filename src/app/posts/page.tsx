import type { NextPage } from 'next';

import { PostListContainer } from '~/posts/Container';
import { type PostType } from '~/posts/models';
import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import { Navbar } from '~/shared/components/nav/Navbar';
import { getAllPost } from '~/shared/helpers/mdx/getPost';

export type ServerPost = Omit<PostType, 'MDX'>;

const PostHome: NextPage = async () => {
  const posts: Omit<PostType, 'MDX'>[] = (await getAllPost()).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ MDX, ...rest }) => ({
      ...rest,
    }),
  );

  return (
    <MainLayout>
      <Navbar showPrint />
      <PostListContainer posts={posts} />
      <Footer showPrint />
    </MainLayout>
  );
};

export default PostHome;
