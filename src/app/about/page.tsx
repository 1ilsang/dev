'use client';

import { NextPage } from 'next';

import AboutContainer from '~/about/Container';
import Footer from '~/shared/components/Footer';
import ImageModal from '~/shared/components/modal/ImageModal';
import Navbar from '~/shared/components/nav/Navbar';
import usePrint from '~/shared/hooks/usePrint';
import { Portal } from '~/shared/portal/Container';

const About: NextPage = () => {
  const { print } = usePrint();
  return (
    <main className="about-layout">
      {!print && <Navbar />}
      <AboutContainer />
      {!print && <Footer />}
      <Portal>
        <ImageModal />
      </Portal>
    </main>
  );
};

export default About;
