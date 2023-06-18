import { NextPage } from "next";

import AboutContainer from "~/about/Container";
import Footer from "~/shared/components/Footer";
import MetaHeader from "~/shared/components/MetaHeader";
import Navbar from "~/shared/components/Navbar";
import {
  ImageUrl,
  MetaDescription,
  MetaTitle,
} from "~/shared/helpers/constant";

const About: NextPage = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="about-layout">
        <Navbar />
        <AboutContainer />
        <Footer />
      </main>
    </>
  );
};

export default About;
