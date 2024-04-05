import { NextPage } from 'next';

import AboutContainer from '~/about/Container';
import Footer from '~/shared/components/Footer';
import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/nav/Navbar';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';
import usePrint from '~/shared/hooks/usePrint';

const About: NextPage = () => {
  const { print } = usePrint();
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="about-layout">
        {!print && <Navbar />}
        <AboutContainer />
        {!print && <Footer />}
      </main>
    </>
  );
};

export default About;
