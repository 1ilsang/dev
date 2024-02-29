import { NextPage } from 'next';

import PostListContainer from '~/posts/Container';
import { PostType } from '~/posts/models';
import Footer from '~/shared/components/Footer';
import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/nav/Navbar';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';
import { getAllPosts } from '~/shared/helpers/post';

export interface PostHomeProps {
  posts: PostType[];
  preview?: boolean;
}

const PostHome: NextPage<PostHomeProps> = ({ posts }) => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="post-layout">
        <Navbar />
        <PostListContainer posts={posts} />
        <Footer />
      </main>
    </>
  );
};

export default PostHome;

export async function getStaticProps() {
  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'tags',
    'category',
    'description',
    'coverImage',
  ]);

  return {
    props: {
      posts,
    },
  };
}
