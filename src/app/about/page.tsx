'use client';

import { NextPage } from 'next';

import AboutContainer from '~/about/Container';
import Footer from '~/shared/components/Footer';
import Navbar from '~/shared/components/nav/Navbar';
import usePrint from '~/shared/hooks/usePrint';

const About: NextPage = () => {
  const { print } = usePrint();
  return (
    <main className="about-layout">
      {!print && <Navbar />}
      <AboutContainer />
      {!print && <Footer />}
    </main>
  );
};

export default About;
