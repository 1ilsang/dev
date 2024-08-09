import type { NextPage } from 'next';

import PostListContainer from '~/posts/Container';
import { type PostType } from '~/posts/models';
import Footer from '~/shared/components/Footer';
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
    <main className="post-layout">
      <Navbar />
      <PostListContainer posts={posts} />
      <Footer />
    </main>
  );
};

export default PostHome;
