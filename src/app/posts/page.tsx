import type { NextPage } from 'next';

import PostListContainer from '~/posts/Container';
import { type PostType } from '~/posts/models';
import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import Navbar from '~/shared/components/nav/Navbar';
import { getAllPosts } from '~/shared/helpers/post';

const PostHome: NextPage = () => {
  const posts: PostType[] = getAllPosts([
    'slug',
    'url',
    'title',
    'date',
    'tags',
    'category',
    'description',
    'coverImage',
  ]);

  return (
    <MainLayout>
      <Navbar />
      <PostListContainer posts={posts} />
      <Footer />
    </MainLayout>
  );
};

export default PostHome;
