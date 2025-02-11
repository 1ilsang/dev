import type { NextPage } from 'next';

import { Navbar } from '~/shared/components/nav/Navbar';
import { Footer } from '~/shared/components/Footer';
import { TagDetailContainer } from '~/tags/detail/Container';
import { MainLayout } from '~/shared/components/MainLayout';
import { getAllPost, getAllTag } from '~/shared/helpers/mdx/getPost';

interface TagsDetailProps {
  params: Promise<{
    tag: string;
  }>;
}

const Tags: NextPage<TagsDetailProps> = async ({ params }) => {
  const { tag } = await params;

  const posts = (await getAllPost()).filter((post) =>
    post.frontmatter.tags.includes(decodeURIComponent(tag)),
  );

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
  const tags = await getAllTag();
  const paths = tags.map((tag) => ({ tag }));
  return paths;
}

export const dynamicParams = false;
