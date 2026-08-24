import type { NextPage } from 'next';

import { Navbar } from '~/shared/components/nav/Navbar';
import { Footer } from '~/shared/components/Footer';
import { TagDetailContainer } from '~/tags/detail/Container';
import { MainLayout } from '~/shared/components/MainLayout';
import { getAllPost, getAllTag } from '~/shared/helpers/mdx/getPost';
import { getTagSummaries } from '~/tags/tagList';

interface TagsDetailProps {
  params: Promise<{
    tag: string;
  }>;
}

const Tags: NextPage<TagsDetailProps> = async ({ params }) => {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getAllPost();

  const posts = allPosts.filter((post) =>
    post.frontmatter.tags.includes(decodedTag),
  );
  const relatedTags =
    getTagSummaries(allPosts).find(({ name }) => name === decodedTag)
      ?.relatedTags ?? [];

  return (
    <MainLayout>
      <Navbar />
      <TagDetailContainer
        posts={posts}
        tag={decodedTag}
        relatedTags={relatedTags}
      />
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
