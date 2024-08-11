import type { NextPage } from 'next';

import HomeContainer from '~/home/Container';
import { MainLayout } from '~/shared/components/MainLayout';
import Navbar from '~/shared/components/nav/Navbar';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Navbar />
      <HomeContainer />
    </MainLayout>
  );
};

export default Home;
