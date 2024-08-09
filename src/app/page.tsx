import type { NextPage } from 'next';

import HomeContainer from '~/home/Container';
import Navbar from '~/shared/components/nav/Navbar';

const Home: NextPage = () => {
  return (
    <main className="home-layout">
      <Navbar />
      <HomeContainer />
    </main>
  );
};

export default Home;
