import type { NextPage } from 'next';

import Navbar from '~/shared/components/nav/Navbar';
import { Footer } from '~/shared/components/Footer';
import { getAllPosts } from '~/shared/helpers/post';
import TagDetailContainer from '~/tags/detail/Container';
import { MainLayout } from '~/shared/components/MainLayout';

interface TagsDetailProps {
  params: {
    tag: string;
  };
}

const Tags: NextPage<TagsDetailProps> = ({ params: { tag } }) => {
  const posts = getAllPosts([
    'tags',
    'title',
    'url',
    'slug',
    'coverImage',
    'description',
  ]).filter((item) => item.tags.includes(decodeURIComponent(tag)));

  return (
    <MainLayout>
      <Navbar />
      <TagDetailContainer posts={posts} />
      <Footer />
    </MainLayout>
  );
};

export default Tags;

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const allTags = getAllPosts(['tags'])
    .map((item) => item.tags)
    .flatMap((tags) => tags);
  const tags = [...new Set(allTags)];
  const paths = tags.map((tag) => {
    return { tag };
  });

  return paths;
}

export const dynamicParams = false;
