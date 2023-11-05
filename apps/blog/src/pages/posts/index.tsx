import { NextPage } from 'next';

import PostListContainer from '~/posts/ListContainer';
import { PostType } from '~/posts/models';
import Footer from '~/shared/components/Footer';
import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/nav/Navbar';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';
import { getAllPosts, getPostBySlug } from '~/shared/helpers/post';

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
  const rawPosts = getAllPosts(['slug']);
  const posts = rawPosts.map((rawPost) => {
    const data = getPostBySlug(rawPost.slug, [
      'title',
      'date',
      'tags',
      'slug',
      'description',
      'coverImage',
    ]);
    return data;
  });

  return {
    props: {
      posts,
    },
  };
}
