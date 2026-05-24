import { type Metadata, type NextPage } from 'next';

import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import { Navbar } from '~/shared/components/nav/Navbar';
import { getAllTag } from '~/shared/helpers/mdx/getPost';
import { TagListContainer } from '~/tags/tagList/Container';

export const metadata: Metadata = {
  title: '1ilsang | Tags',
  description: '태그별 글 모음',
  alternates: { canonical: '/tags' },
};

const Tags: NextPage = async () => {
  const tags = await getAllTag();

  return (
    <MainLayout>
      <Navbar />
      <TagListContainer tags={tags} />
      <Footer />
    </MainLayout>
  );
};

export default Tags;
