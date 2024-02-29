import { NextPage } from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

import PostContainer from '~/post/Container';
import { PostType } from '~/posts/models';
import Footer from '~/shared/components/Footer';
import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/nav/Navbar';
import NavProgress from '~/shared/components/nav/Progress';
import { MetaTitle } from '~/shared/constants/blog';
import markdownToHtml from '~/shared/helpers/markdown';
import { getAllPosts, getPostBySlug } from '~/shared/helpers/post';

export interface PostsProps {
  post: PostType;
  preview?: boolean;
}

const Posts: NextPage<PostsProps> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaHeader
        title={`${post.title} - ${MetaTitle.HOME}`}
        ogImageUrl={post.ogImage.url}
        description={post.description}
      />
      <main className="post-layout">
        <NavProgress />
        <Navbar />
        <PostContainer post={post} />
        <Footer />
      </main>
    </>
  );
};

export default Posts;

interface GetStaticPropsParams {
  params: {
    slug: string[];
  };
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
  const post = getPostBySlug(params.slug.join('/'), [
    'title',
    'date',
    'slug',
    'content',
    'description',
    'tags',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug.split('/'),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
