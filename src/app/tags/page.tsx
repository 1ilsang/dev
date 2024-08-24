import { type NextPage } from 'next';

import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import Navbar from '~/shared/components/nav/Navbar';
import { getAllTags } from '~/shared/helpers/post';
import TagListContainer from '~/tags/tagList/Container';

const Tags: NextPage = () => {
  const tags = getAllTags();

  return (
    <MainLayout>
      <Navbar />
      <TagListContainer tags={tags} />
      <Footer />
    </MainLayout>
  );
};

export default Tags;
