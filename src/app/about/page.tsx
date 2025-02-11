import type { NextPage } from 'next';
import { AboutContainer } from '~/about/Container';
import { Footer } from '~/shared/components/Footer';
import { MainLayout } from '~/shared/components/MainLayout';
import { ImageModal } from '~/shared/components/modal/ImageModal';
import { Navbar } from '~/shared/components/nav/Navbar';
import { Portal } from '~/shared/portal/Container';

const About: NextPage = () => {
  return (
    <MainLayout>
      <Navbar />
      <AboutContainer />
      <Footer />
      <Portal>
        <ImageModal />
      </Portal>
    </MainLayout>
  );
};

export default About;
