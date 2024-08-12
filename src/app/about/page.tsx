'use client';

import type { NextPage } from 'next';
import AboutContainer from '~/about/Container';
import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import ImageModal from '~/shared/components/modal/ImageModal';
import Navbar from '~/shared/components/nav/Navbar';
import usePrint from '~/shared/hooks/usePrint';
import { Portal } from '~/shared/portal/Container';

const About: NextPage = () => {
  const { print } = usePrint();
  return (
    <MainLayout>
      {!print && <Navbar />}
      <AboutContainer />
      {!print && <Footer />}
      <Portal>
        <ImageModal />
      </Portal>
    </MainLayout>
  );
};

export default About;
