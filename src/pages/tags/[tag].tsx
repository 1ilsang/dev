import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/nav/Navbar';
import Footer from '~/shared/components/Footer';
import { getAllPosts } from '~/shared/helpers/post';
import { PostType } from '~/posts/models';
import TagDetailContainer from '~/tags/detail/Container';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';

export interface TagsDetailProps {
  posts: Pick<
    PostType,
    'tags' | 'title' | 'slug' | 'coverImage' | 'description' | 'date' | 'url'
  >[];
}

const Tags: NextPage<TagsDetailProps> = ({ posts }) => {
  const router = useRouter();
  if (!router.isFallback && posts.length === 0) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="tag-layout">
        <Navbar />
        <TagDetailContainer posts={posts} />
        <Footer />
      </main>
    </>
  );
};

export default Tags;

interface GetStaticPropsParams {
  params: {
    tag: string;
  };
}

export async function getStaticProps({
  params: { tag },
}: GetStaticPropsParams) {
  const posts = getAllPosts([
    'tags',
    'title',
    'url',
    'slug',
    'coverImage',
    'description',
  ]).filter((item) => item.tags.includes(tag));

  return {
    props: {
      posts,
    },
  };
}

export async function getStaticPaths() {
  const allTags = getAllPosts(['tags'])
    .map((item) => item.tags)
    .flatMap((tags) => tags);
  const tags = [...new Set(allTags)];
  const paths = tags.map((tag) => {
    return {
      params: {
        tag,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
