import { NextPage } from "next";
import Image from "next/image";

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
      <div className="about-layout">
        <Navbar />
        <main>
          <div className="about-container">
            <Image
              src="/assets/build.png"
              layout="fill"
              objectFit="contain"
              alt={"공사중"}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
