import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

import { PostListContainer } from '~/posts/Container';
import { CATEGORY_LIST, getCategoryPath } from '~/posts/constants';
import type { Category, PostType } from '~/posts/models';
import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import { Navbar } from '~/shared/components/nav/Navbar';
import { getAllPost } from '~/shared/helpers/mdx/getPost';

type Props = {
  params: Promise<{ category: string }>;
};

const findCategory = (value: string): Category | undefined =>
  CATEGORY_LIST.find((category) => category.toLowerCase() === value);

const CategoryPosts: NextPage<Props> = async ({ params }) => {
  const { category: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) notFound();

  const posts: Omit<PostType, 'MDX'>[] = (await getAllPost())
    .filter((post) => post.category === category)
    .map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ MDX, ...rest }) => rest,
    );

  return (
    <MainLayout className="flex min-h-dvh flex-col">
      <Navbar showPrint />
      <PostListContainer activeCategory={category} posts={posts} />
      <Footer showPrint />
    </MainLayout>
  );
};

export default CategoryPosts;

export function generateStaticParams() {
  return CATEGORY_LIST.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = findCategory(categorySlug);
  if (!category) notFound();

  return {
    title: `1ilsang | ${category} Posts`,
    description: `${category} 카테고리의 기술 블로그 글 목록`,
    alternates: { canonical: getCategoryPath(category) },
  };
}

export const dynamicParams = false;
