import type { NextPage } from 'next';

import Navbar from '~/shared/components/nav/Navbar';
import { Footer } from '~/shared/components/Footer';
import { getAllPosts, getAllTags } from '~/shared/helpers/post';
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
  const tags = getAllTags();
  const paths = tags.map((tag) => ({ tag }));
  return paths;
}

export const dynamicParams = false;
